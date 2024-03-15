import camelcase from 'camelcase';
import { join, resolve } from 'path';
import {ModuleDeclarationKind, Project, StructureKind, ts} from 'ts-morph';

interface GlobalComponentMeta{
  componentName: string;
  rawName: string;
  path: string;
}

function main(){
  const project = new Project();
  const sourcefile = project.addSourceFileAtPath(resolve('packages/vue-components/dist/types/index.d.ts'));
  const program = project.getProgram();
  const imports = sourcefile.getImportDeclarations()
  const globalComponentMetas:GlobalComponentMeta[] = [];
  for (const importNode of imports){
    const importSpecifieies = importNode.getNamedImports();
    const importComponent = [];
    importSpecifieies.forEach((specifier)=>{
      if (ts.isTypeOnlyImportDeclaration(specifier.compilerNode)){
        return;
      }
      importComponent.push(specifier.getName());
    })
    const path = importNode.compilerNode.getChildAt(3).getFullText().replace(/\'/gim, '').replace(/\.\//gim,'').trim();
    globalComponentMetas.push(
      ...importComponent.map((name) => ({
        componentName: `M${camelcase(name,{pascalCase: true})}`,
        path,
        rawName: name
      }))
    )
  }

  const dts = project.createSourceFile('packages/vue-components/dist/global.d.ts')
  const m = dts.addModule({
    name: "'@vue/runtime-core'",
    declarationKind: ModuleDeclarationKind.Module,
    hasDeclareKeyword: true
  });
  m.insertInterface(0, {
    isExported: true,
    name: 'GlobalComponents',
    properties: [
      ...globalComponentMetas.map((meta)=>{
        return {
          name: meta.componentName,
          type: `typeof import('./types/')['${meta.rawName}']`
        }
      }),
    ],
  })
  dts.addExportDeclaration({})
  dts.saveSync()
}

main()