import { existsSync, readdirSync, readFileSync, writeFile, writeFileSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import { buildMsg, debug, err, info, warn } from "./log";
import { Expression, JSDocTag, JSDocTagInfo, ObjectLiteralElementLike, Project, PropertyAssignment, SourceFile, Symbol, SyntaxKind, ts, TypeFormatFlags } from "ts-morph";
import dashify from "dashify";
import { parse, compileScript } from 'vue/compiler-sfc';
import {walkAST} from 'ast-kit';


const existsIndexFile = (path: string) => readdirSync(path).includes('index.ts');
const ignore = ['vue'];
const ignoreFold = ['node_modules','.vscode','shared']
type ImportMap = {name: string, relativePath: string, filePath: string, basePath: string}
type PropMap = {compName: string, compFoldPath: string, propsObjectName: string, propsPath: string};
type PropItemData = {
  name?: string;
  type?: string;
  description?: {
    zh: string;
    en: string;
  };
  deprecate?: {
    zh: string;
    en: string;
  };
  defaultValue?: string,
}
type PropItem = {
  [componentName: string]: PropItemData[]
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
const collectComponents = (path: string,compName: string, componentPath: string):ImportMap[] => {
  const entryFilePath = path;
  if (!existsSync(entryFilePath)) {
    return [];
  }
  const project = new Project();
  const sourcefile = project.addSourceFileAtPath(entryFilePath);
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
    filePath: join(componentPath, importMap[name]),
    basePath: dirname(join(componentPath, importMap[name]))
  })).filter(value => value.name);
  return paths;
}

const collectPropsName = (importMaps: ImportMap[]) => {
  const propMaps:PropMap[] = [];
  for (const m of importMaps){
    const code = readFileSync(m.filePath).toString();
    const {descriptor} = parse(code);
    const {scriptSetupAst} = compileScript(descriptor, {babelParserPlugins: ['typescript'],id:m.name})
    const propMap:PropMap = {
      compName: m.name,
      compFoldPath: m.basePath,
      propsObjectName: '',
      propsPath: '',
    }
    for (const stmt of scriptSetupAst){
      walkAST(stmt, {
        enter: (node) => {
          if (node.type !== 'VariableDeclaration'){
            return;
          }
          for (const decl of node.declarations){
            if(decl.init.type !== 'CallExpression' || decl.init.callee.type !== 'Identifier'){
              continue;
            }
            if (decl.init.callee.name !== 'defineProps'){
              continue;
            }
            if (decl.init.arguments[0].type !== 'Identifier'){
              return;
            }
            propMap.propsObjectName=decl.init.arguments[0].name
          }
        }
      })
    }
    for (const stmt of scriptSetupAst){
      walkAST(stmt, {
        enter: (node) => {
          if (node.type !== 'ImportDeclaration'){
            return;
          }
          const {specifiers, source} = node;
          for (const specifier of specifiers){
            if (specifier.local.name === propMap.propsObjectName){
              propMap.propsPath = source.value;
              return;
            }
          }
        }
      })
    }
    propMaps.push(propMap);
    buildMsg(`Collect ${m.name}`, true)
  }
  return propMaps;
}

type JSDocData = {
  [lang: string]: string;
}

const collectJSDocData = (jsDocTags: JSDocTagInfo[]) => {
  const jsDocDatas:{[x:string]: JSDocData} = {};
  for (const tag of jsDocTags){
    if (!tag){
      continue;
    }
    const regexp = /\{(?<lang>\w+)\}\s?(?<content>.*)/gim;
    const {
      lang = 'zh',
      content = ''
    } = regexp.exec(tag.compilerObject.text[0].text).groups as unknown as JSDocData;

    jsDocDatas[tag.getName()] = {
      ...jsDocDatas[tag.getName()],
      [lang]: content
    }
  }
  return jsDocDatas;
}

const collectPropsData = (sourcefile: SourceFile, propsName: string) => {
  const varibleStatement = sourcefile.getVariableDeclaration(propsName);
  const initializer = varibleStatement.getInitializer();
  const expression = initializer.isKind(SyntaxKind.AsExpression) ?
    initializer.getExpression() :
    initializer;
  if (!expression.isKind(SyntaxKind.ObjectLiteralExpression)){
    return null;
  }
  const properties = expression.getProperties();
  const props = [];
  for (const property of properties){
    if (!property.isKind(SyntaxKind.PropertyAssignment)){
      continue;
    }
    const propName = property.getName();
    let typeName = '';
    let defaultValue = '';
    const propObject = property.getInitializer()
    if (!propObject.isKind(SyntaxKind.ObjectLiteralExpression)){
      continue;
    }
    const typeMember = propObject.getProperty('type');
    const defaultValueObject = propObject.getProperty('default');
    if (!typeMember.isKind(SyntaxKind.PropertyAssignment)){
      continue;
    }
    const typeInitializer = typeMember.getInitializer();
    if (typeInitializer.isKind(SyntaxKind.AsExpression)){
      const type = typeInitializer.getType()
      const typeSymbol = type.getAliasSymbol();
      if (typeSymbol.getName() === 'PropType'){
        const [typeArgument] = type.getAliasTypeArguments();
        if (!typeArgument.isArray()){
          typeName = typeArgument.getText(typeMember)
        } else {
          const elementType = typeArgument.getArrayElementType();
          if (!elementType.isUnion()){
            typeName = typeArgument.getText(typeMember)
          } else {
            typeName = elementType.getText(typeMember, TypeFormatFlags.None);
          }
        }
      } else {
        typeName = typeSymbol.getName();
      }
    } else {
      typeName = typeInitializer.getText();
    }
    const jsDocDatas = collectJSDocData(property.getSymbol().getJsDocTags());
    if (defaultValueObject && defaultValueObject.isKind(SyntaxKind.PropertyAssignment)){
      defaultValue = defaultValueObject.getInitializer().getText();
    } else {
      defaultValue = '-';
    }
    const obj = {
      name: propName,
      type: typeName,
      ...jsDocDatas,
      defaultValue: defaultValue
    } as const;
    props.push(obj);
  }
  return props;
}
const collectPropsItem = (propsMaps: PropMap[]) => {
  const propItem: PropItem = {}
  const project = new Project()
  for (const {compName, compFoldPath, propsPath, propsObjectName} of propsMaps){ 
    if (!propsPath){
      continue;
    }
    const propFilePath = join(compFoldPath, propsPath);
    propItem[compName] = [];
    const sourcefile = project.addSourceFileAtPath(`${propFilePath}.ts`);
    const propDatas = collectPropsData(sourcefile, propsObjectName);
    propItem[compName] = propDatas;
    buildMsg(`Collect ${compName}`, true)
  }
  return propItem;
}

export const buildPropsTableData = () => {
  const ROOT = resolve(__dirname, '../../packages');
  const vueComponentPath = join(ROOT, 'vue-components');
  if (!existsIndexFile(vueComponentPath)){
    err(`Can not find index.ts at ${vueComponentPath}`);
    return;
  }
  info('founded entry file')
  const components = readdirSync(vueComponentPath, {withFileTypes: true})
    .filter((dirent) => !dirent.isFile() && !ignoreFold.includes(dirent.name))
    .map((dirent) => dirent.name)
  info(`Component total: ${components.length}`)
  const entryFilePath = components.map((v)=>join(vueComponentPath, v, 'index.ts'))
  const componentPath = components.map((v) => join(vueComponentPath, v));
  const importMaps:ImportMap[] = [];
  for (let i=0;i<componentPath.length;i++){
    importMaps.push(...collectComponents(entryFilePath[i],components[i], componentPath[i]));
  }
  warn('Collect Props name')
  const propMaps = collectPropsName(importMaps);
  warn('Collect Props Item')
  const propItems = collectPropsItem(propMaps)
  writeFileSync(
    join(__dirname, '../../docs/.vitepress/props-table-data.json'),
    JSON.stringify(propItems, null, '  ')
  )
}

buildPropsTableData()