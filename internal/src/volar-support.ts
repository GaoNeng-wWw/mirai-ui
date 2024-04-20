import { Expression, isCallExpression, isExpressionStatement, isIdentifier, isObjectExpression, isObjectProperty, isVariableDeclaration, isVariableDeclarator } from '@babel/types';
import { readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { ModuleDeclarationKind, Project, SourceFile, StructureKind, SyntaxKind, ts} from 'ts-morph';
import { compileScript, parse } from 'vue/compiler-sfc';
import { buildMsg, info, warn } from './log';


interface GlobalComponentMeta{
  componentName: string;
  rawName: string;
  path: string;
}

const collectEntryImport = (sourcefile: SourceFile): {[x:string]: string} => {
  const res:{[x:string]: string} = {}
  const importDecls = sourcefile.getImportDeclarations();
  importDecls.forEach((decl)=>{
    const [importClause, moduleSpecifier] = [decl.getImportClause(), decl.getModuleSpecifier()];
    let name: string;
    let path = moduleSpecifier.getLiteralText();
    if (importClause.isTypeOnly()){
      const namedBindings = importClause.getNamedBindings();
      if (namedBindings.isKind(SyntaxKind.NamedImports)){
        const elements = namedBindings.getElements();
        for (const el of elements){
          name = el.getName();
          res[name]=path;
        }
      }
    } else {
      const namedBindings = importClause.getNamedBindings();
      if (namedBindings){
        if (namedBindings.isKind(SyntaxKind.NamedImports)){
          const elements = namedBindings.getElements();
          for (const el of elements){
            name = el.getName();
            res[name]=path;
          }
        }
      } else {
        name = importClause.compilerNode.name.escapedText.toString();
      }
    }
    res[name] = path;
  })
  return res;
}

const collectName = (filePath: string) => {
  const code = readFileSync(filePath).toString();
  const {descriptor} = parse(code);
  const {scriptSetupAst} = compileScript(descriptor, {babelParserPlugins: ['typescript'], id: filePath})
  const symbolTable = new Map<string, Expression>();
  for (const stmt of scriptSetupAst){
    if (!isVariableDeclaration(stmt)){
      continue;
    }
    for (const node of stmt.declarations){
      if (!isVariableDeclarator(node)){
        continue;
      }
      if (!isIdentifier(node.id)){
        continue;
      }
      symbolTable.set(node.id.name, node.init)
    }
  }
  for (const stmt of scriptSetupAst){
    if (!isExpressionStatement(stmt)){
      continue;
    }
    const exp = stmt.expression;
    if (!isCallExpression(exp)){
      continue;
    }
    if (exp.callee.type !== 'Identifier'){
      continue;
    }
    if (exp.callee.name !== 'defineOptions'){
      continue;
    }
    const [arg] = exp.arguments;
    if (!isObjectExpression(arg)){
      continue;
    }
    const {properties} = arg;
    for (const p of properties){
      if (!isObjectProperty(p)){
        continue;
      }
      const {key,value} = p;
      if (isIdentifier(key) && key.name === 'name'){
        if (isIdentifier(value)){
          const literalLike = symbolTable.get(value.name);
          if (literalLike.type === 'StringLiteral'){
            return literalLike.value;
          }
        }
        if (value.type === 'StringLiteral'){
          return value.value;
        }
      }
    }
  }
  return '';
}

function main(){
  const project = new Project();
  const sourcefile = project.addSourceFileAtPath(resolve('packages/vue-components/index.ts'));
  const imports = sourcefile.getImportDeclarations()
  const paths:string[] = [];
  for (const importNode of imports){
    if (importNode.isTypeOnly()){
      continue;
    }
    paths.push(
      importNode.getModuleSpecifier().getText().replace(/"/gim, '')
    )
  }
  const componentPath = resolve('packages/vue-components');
  const record:{
      name: string;
      relativePath: string;
      filePath: string;
      basePath: string;
      pathName: string;
      componentName: string;
      rawName: string;
  }[] = [];
  warn('Collect component name')
  for (const p of paths){
    const sourcefile = project.addSourceFileAtPath(join(componentPath, p, 'index.ts'));
    const importMap = collectEntryImport(sourcefile);
    const exportSymbol = sourcefile.getDefaultExportSymbol();
    const decl = exportSymbol.getValueDeclaration();
    if (!decl.isKind(SyntaxKind.ExportAssignment)){
      return [];
    }
    const exp = decl.getExpression();
    if (!exp.isKind(SyntaxKind.ObjectLiteralExpression)){
      return [];
    }
    const installSymbol = exp.getSymbol().getMember('install');
    const valueDecl = installSymbol.getValueDeclaration();
    if (!valueDecl.isKind(SyntaxKind.PropertyAssignment)){
      return [];
    }
    const initializer = valueDecl.getInitializer();
    if (!initializer.isKind(SyntaxKind.ArrowFunction)){
      return [];
    }
    const fn = initializer.getBody();
    if (!fn.isKind(SyntaxKind.Block)){
      return [];
    }
    const stmts = fn.getStatements().map((stmt) => {
      if (!stmt.isKind(SyntaxKind.ExpressionStatement)){
        return false;
      }
      if (!stmt.getExpression().isKind(SyntaxKind.CallExpression)){
        return false;
      }
      const exp = stmt.getExpression();
      if (!exp.isKind(SyntaxKind.CallExpression)){
        return false;
      }
      const fArguments = exp.getArguments().filter((v) => v.isKind(SyntaxKind.Identifier));
      return fArguments
    })
    .filter(v => typeof v !== 'boolean')
    .flat()
    const registeredItem = stmts.map((s) => {
      const symbol = s.getSymbol();
      const valueDecl = symbol.getValueDeclaration();
      if (!valueDecl || !valueDecl.isKind(SyntaxKind.VariableDeclaration)){
        return s.getText();
      }
      const initializer = valueDecl.getInitializer();
      if (initializer.isKind(SyntaxKind.Identifier)){
        return initializer.compilerNode.escapedText.toString()
      }
      if (initializer.isKind(SyntaxKind.AsExpression)){
        const exp = initializer.getExpression();
        if (exp.isKind(SyntaxKind.Identifier)){
          return exp.compilerNode.escapedText.toString();
        }
      }
    });
    const paths = registeredItem.map(name => ({
      name,
      relativePath: importMap[name],
      filePath: join(componentPath, p, importMap[name]),
      basePath: dirname(join(componentPath, p, importMap[name])),
      pathName: p
    })).filter(value => value.name);
    record.push(
      ...paths.map(path => {
        info(`Collect ${path.name}`)
        const componentName = collectName(path.filePath);
        return {
          componentName,
          ...path,
          rawName: componentName.replace('M', '')
        };
      })
    )
  }
  info('Collect component name success')
  const dts = project.createSourceFile('packages/vue-components/dist/global.d.ts', {}, {overwrite: true})
  const m = dts.addModule({
    name: "'@vue/runtime-core'",
    declarationKind: ModuleDeclarationKind.Module,
    hasDeclareKeyword: true
  });
  m.insertInterface(0, {
    isExported: true,
    name: 'GlobalComponents',
    properties: [
      ...record.map((meta)=>{
        return {
          name: meta.componentName,
          type: `typeof import('${meta.pathName}')['${meta.rawName}']`
        }
      }),
    ],
  })
  dts.addExportDeclaration({})
  dts.saveSync()
}

main()