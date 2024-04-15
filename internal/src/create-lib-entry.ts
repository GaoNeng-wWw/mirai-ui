import { Project, SyntaxKind, VariableDeclarationKind, ts } from 'ts-morph';
import fg from 'fast-glob';
import { join, relative } from 'path';
import { buildMsg, info } from './log';
import dashify from 'dashify';
import camelcase from 'camelcase';

type EntryExport = {
  exportDeclaration: string[];
  installName: string;
  componentName: string
}

const isSyntaxList = (node: ts.Node): node is ts.SyntaxList => {
  return node.kind === SyntaxKind.SyntaxList;
}

const buildEntry = (metas: EntryExport[]) => {
  const project = new Project();
  const sourcefile = project.createSourceFile('packages/vue-components/index.ts');
  const defaultImports: string[] = []
  sourcefile.addImportDeclaration({
    isTypeOnly: true,
    moduleSpecifier: 'vue',
    namedImports: ['App']
  })
  metas.forEach((meta)=>{
    const {componentName, installName, exportDeclaration} = meta;
    sourcefile.addImportDeclaration({
      isTypeOnly: false,
      moduleSpecifier: `./${dashify(componentName, {condense: true})}`,
      defaultImport: `${componentName}Default`
    });
    defaultImports.push(`${componentName}Default`);
    buildMsg(`${componentName}`, true)
  })
  metas.forEach(({componentName}) => {
    sourcefile.addExportDeclaration({
      moduleSpecifier: `./${dashify(componentName, {condense: true})}`
    })
  })

  sourcefile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'installs',
        initializer: `[${defaultImports.join(',')}]`,
      }
    ],
    
  })
  sourcefile.addExportAssignment({
    isExportEquals: false,
    expression: (writer)=>{
      writer.block(()=>{
        writer.setIndentationLevel(1)
        writer.writeLine(`name: 'Mirai-Ui',`);
        writer.writeLine('install: (app:App) => {')
        writer.setIndentationLevel(2)
        writer.writeLine(`installs.forEach((i) => app.use(i))`)
        writer.setIndentationLevel(1)
        writer.writeLine('}');
      })
    }
  })
  info('Save entry file');
  sourcefile.saveSync();
}

fg('**/index.ts', {
  ignore: ['**/node_modules'],
  absolute: true,
  cwd: join(__dirname, '../../packages/vue-components')
})
.then((rawPaths)=>{
  const paths = rawPaths.filter((path) => !path.includes('shared'));
  const project = new Project();
  const sourcefiles = paths.map((path) => project.addSourceFileAtPath(path));
  const entryExport: EntryExport[] = [];
  const installNames = new Set();
  for (const sourcefile of sourcefiles){
    const exportDeclaration = sourcefile.getExportDeclarations()
    const nameExports = exportDeclaration.map((exp) => exp.getNamedExports()).flat();
    const exportItem = nameExports.map((specifer) => {
      return specifer.getSymbol().getEscapedName();
    });
    const installName = `${camelcase(sourcefile.getFilePath().toString().split('/').at(-2))}Install`;
    entryExport.push({
      installName,
      exportDeclaration: exportItem,
      componentName: camelcase(sourcefile.getFilePath().toString().split('/').at(-2))
    })
  }
  console.log(entryExport)
  buildEntry(entryExport)
})