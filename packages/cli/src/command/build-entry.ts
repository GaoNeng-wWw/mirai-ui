import { Command } from 'commander';
import { COMPONENT_ROOT, CORE_ROOT, ROOT } from '../constant';
import { globSync } from 'glob';
import { readFileSync } from 'fs';
import { Lang, parse } from '@ast-grep/napi';
import { success } from '../log';
import { outputFileSync } from 'fs-extra';
import { join } from 'path';

export type ImportMap = {
  pkgName: string;
  exportComponent: string[];
};

export const buildEntry = () => {
  const root = COMPONENT_ROOT;
  const components = globSync('*/', {
    cwd: root,
    ignore: ['**/node_modules', 'node_modules/**'],
    absolute: true,
  });
  const importMaps: ImportMap[] = [];
  for (const component of components) {
    const code = readFileSync(`${component}/src/index.ts`);
    const pkg = JSON.parse(readFileSync(`${component}/package.json`).toString());
    const ast = parse(Lang.TypeScript, code.toString());
    const root = ast.root();
    const match = root.findAll({
      rule: {
        pattern: 'withInstall({$$$BEFORE,components: [$$$COMPONENTS],$$$AFTER})',
      },
    });
    if (!match) {
      continue;
    }
    const components = match.map((match) => {
      const arrayNode = match.find({
        rule: {
          kind: 'array',
          inside: {
            kind: 'pair',
            has: {
              field: 'key',
              regex: '^components$',
            },
          },
        },
      });

      if (arrayNode) {
        const elements = arrayNode.findAll({
          rule: { kind: 'identifier' },
        });
        const components = elements.map(e => e.text());
        return components;
      }
      return [];
    }).flat();
    importMaps.push({ pkgName: pkg.name, exportComponent: components });
  }
  const deps = buildPacakge(importMaps);
  success('Build Deps success');
  const entry = buildCoreEntry(importMaps);
  success('Build core entry success');

  const pkgPath = join(CORE_ROOT, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath).toString());
  pkg['dependencies'] = deps;
  outputFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  success('Write Deps successfully');

  const entryPath = join(CORE_ROOT, 'src/index.ts');
  outputFileSync(entryPath, entry);

  success('Write Deps successfully');
};

export default function (cmd: Command) {
  cmd
    .command('build')
    .option('--entry', 'build component entry')
    .action((args) => {
      if (args.entry) {
        return buildEntry();
      }
    });
};

function buildPacakge(
  maps: ImportMap[],
) {
  return maps.map((item) => {
    return {
      [item.pkgName]: 'workspace:*',
    };
  })
    .reduce((pre, cur) => {
      return {
        ...pre,
        ...cur,
      };
    });
}

function buildCoreEntry(
  maps: ImportMap[],
) {
  const imports: string[] = [];
  const componentRegister: string[] = [];
  const reExport: string[] = [];
  for (const item of maps) {
    imports.push(`import { ${item.exportComponent.join(',')} } from '${item.pkgName}';`);
    for (const name of item.exportComponent) {
      componentRegister.push(`app.component(${name}.name!, ${name});`);
    }
    reExport.push(
      `export * from '${item.pkgName}';`,
    );
  }
  return `// DO NOT REMOVE THIS FILE FROM .gitignore PLEASE!
${imports.join(';\n')}
import { Plugin } from 'vue';

export default {
  install(app) {
    ${componentRegister.join(';\n')}
  },
} as Plugin;

${reExport.join(';\n')}
`;
};
