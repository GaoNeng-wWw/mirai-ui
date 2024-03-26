import { readdirSync, readFileSync, writeFile, writeFileSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import { buildMsg, debug, err, info, warn } from "./log";
import { Expression, JSDocTag, JSDocTagInfo, ObjectLiteralElementLike, Project, PropertyAssignment, SourceFile, Symbol, SyntaxKind, ts } from "ts-morph";
import dashify from "dashify";
import { parse, compileScript } from 'vue/compiler-sfc';
import {walkAST} from 'ast-kit';

type PropData = {
  name: string;
  type: {
    ref: boolean;
    name: string;
  };
  description: {
    zh: string;
    en: string;
  };
  deprecated:{
    zh: string;
    en: string;
  }
  demo: {
    zh: string;
    en: string;
  };
  default: string | null;
}

type PropsTableData = {
  propsName: string;
  props: PropData[]
}
type PropsTable = {
  [compName: string]: {
    tableData: PropsTableData[];
    typeAlias: string[];
  }
}
type RawPropData = {
  componentName: string;
  sourcefile: SourceFile |null;
  propsName: string;
}

const existsIndexFile = (path: string) => readdirSync(path).includes('index.ts');
const ignore = ['vue'];

const extractAllDependencyFile = (path: string) =>{
  const project = new Project();
  const sourcefile = project.addSourceFileAtPath(path);
  const tc = project.getTypeChecker();
  const dependencyGraph = sourcefile.getReferencedSourceFiles().filter((sf)=>{
    return !ignore.some((ignoreItem) => sf.getBaseName().includes(ignoreItem))
  })
  return dependencyGraph;
}

const extractAllRegisterComponent = (sourcefiles: SourceFile[]) => {  
  return sourcefiles.map((sf)=>sf.getExportAssignments())
          .flat()
          .map((exportAssign) => exportAssign.getSymbol())
          .map((symbol)=>symbol.getDeclarations())
          .flat()
          .filter((exportAssignLike)=>exportAssignLike.isKind(SyntaxKind.ExportAssignment))
          .map((assignment)=>assignment.getExpression())
          .filter(objLiteralExpLike=>objLiteralExpLike.isKind(SyntaxKind.ObjectLiteralExpression))
          .map(objectLiteralExp => objectLiteralExp.getProperties())
          .flat()
          .filter(p=>p.isKind(SyntaxKind.PropertyAssignment))
          .filter(assignment => assignment.getName() === 'install')
          .map(assignment=>assignment.getInitializer())
          .filter((node) => node.isKind(SyntaxKind.ArrowFunction))
          .map((f)=>f.getBody())
          .filter((bodyLike)=>bodyLike.isKind(SyntaxKind.Block))
          .map((block)=>block.getStatements())
          .flat(1)
          .filter((stmt) => stmt.isKind(SyntaxKind.ExpressionStatement))
          .map((expStmt) => expStmt.getExpression())
          .filter((callExprLike) => callExprLike.isKind(SyntaxKind.CallExpression))
          .map((callExpr) => {
            const [, objExpr] = callExpr.getArguments();
            return objExpr;
          })
          .filter((node) => node.isKind(SyntaxKind.Identifier))
          .map((identifier) => identifier.getText().trim());
}

const extractVueFilePath = (sourcefiles: SourceFile[]) => {
  return sourcefiles.map((sf)=>sf.getImportDeclarations())
          .flat()
          .map((decl)=>[decl.getImportClause(), decl.getChildrenOfKind(SyntaxKind.StringLiteral)] as const)
          .filter(([,literal])=> !ignore.includes(literal[0].getLiteralText()))
          .map(([clause, literal]) => {
            return [clause.getSymbol().getEscapedName(), literal.map((l)=>l.getLiteralText())] as const
          })
          .reduce((pre,cur) => {
            return {
              ...pre,
              [cur[0]]: cur[1]
            }
          }, {});
}

const extractJsDocObj = (text: string) => {
  const reg = /\{(?<lang>\w*)\}\ ?(?<content>.*)/gim;
  const {lang, content} = reg.exec(text).groups as {lang: string, content: string}
  return {
    [lang]: content
  }
}

const extractTableData = (propsName: string, sourcefile: SourceFile) => {
  debug(`Extract ${propsName}`)
  const datas:PropData[] = [];
  const varDecls = sourcefile.getVariableDeclarations().filter((decl) =>{
    return decl.getSymbol().getEscapedName() === propsName
  })
  let initializer:Expression<ts.Expression> |null = null;
  for (const varDecl of varDecls){
    if (!varDecl.isExported()){
      debug(`${varDecl.getName()} is not exported`);
      continue;
    }
    const symbol = varDecl.getSymbol();
    const decl = symbol.getValueDeclaration();
    if (!decl.isKind(SyntaxKind.VariableDeclaration)){
      continue;
    }
    initializer = decl.getInitializer()
  }
  if(!initializer){
    return datas;
  }
  const exp = initializer.isKind(SyntaxKind.AsExpression) ? initializer.getExpression() : initializer;
  if (!exp.isKind(SyntaxKind.ObjectLiteralExpression)){
    return datas;
  }
  const properties = exp.getProperties();
  const rawPropertiesData: {
    name:string;
    jsdocs: JSDocTagInfo[];
    property: PropertyAssignment;
    symbol: Symbol
  }[] = []
  for (const property of properties){
    if (!property.isKind(SyntaxKind.PropertyAssignment)){
      continue;
    }
    const name = property.getName();
    rawPropertiesData.push({name, jsdocs: property.getSymbol().getJsDocTags(), property, symbol: property.getSymbol()})
  }
  for (const {name, jsdocs, symbol} of rawPropertiesData){
    if (!jsdocs.length){
      debug(`${propsName} not any jsdocs`);
      datas.push({
        name,
        demo: {zh: '', en: ''},
        deprecated: {zh: '',en: ''},
        description: {zh: '',en:''},
        type: {ref: false,name: ''},
        default: null,
      })
      continue;
    }
    const obj:PropData = {
      name,
      type: {
        ref: false,
        name: ""
      },
      description: {
        zh: "",
        en: ""
      },
      deprecated: {
        zh: "",
        en: ""
      },
      demo: {
        zh: '',
        en: ''
      },
      default: null
    }
    for (const jsDoc of jsdocs){
      obj[jsDoc.getName()] = {
        ...obj[jsDoc.getName()],
        ...extractJsDocObj(jsDoc.getText()[0].text)
      }
    }
    const decl = symbol.getValueDeclaration();
    if (!decl.isKind(SyntaxKind.PropertyAssignment)){
      datas.push(obj);
      continue;
    }
    const expr = decl.getInitializer();
    if (!expr.isKind(SyntaxKind.ObjectLiteralExpression)){
      datas.push(obj);
      continue;
    }
    const typeRaw = expr.getProperty('type');
    if(!typeRaw.isKind(SyntaxKind.PropertyAssignment)){
      datas.push(obj);
      continue;
    }
    const initializer = typeRaw.getInitializer();
    let typeName = '';
    if (initializer.isKind(SyntaxKind.AsExpression)){
      const type = initializer.getType();
      typeName = type.getAliasTypeArguments()[0].getAliasSymbol().getEscapedName();
    } else {
      typeName = initializer.getText();
    }
    obj['type'] = {
      ref: initializer.isKind(SyntaxKind.AsExpression),
      name: typeName
    }
    const defaultProperty = expr.getProperty('default');
    if (!defaultProperty){
      datas.push(obj);
      continue;
    }
    const defaultValue = defaultProperty.getType().getText().replace(/\'|\"/gim, '');
    obj['default'] = defaultValue
    datas.push(obj);
  }
  return datas
}

const extractType = (sourcefile: SourceFile) => sourcefile.getTypeAliases().map((alias) => alias.getText())

const extractProps = (
  compNames: string[],
  vueFiles: {[compName:string]: string[]}, root: string
) => {
  const project = new Project();
  const propsFile: RawPropData[] = [];
  for (const compName of compNames){
    const vueComponentRoot = join(root,dashify(compName, {condense: true }))
    const path = join(vueComponentRoot, vueFiles[compName][0]);
    const {descriptor} = parse(readFileSync(path).toString())
    if (!descriptor.scriptSetup){
      warn(`${compName} not find setup script`)
      continue;
    }
    const {scriptSetupAst} = compileScript(descriptor, {babelParserPlugins: ['typescript'],id:compName});
    let propsName = '';
    let propsFileRelativePath = '';
    for (const stmt of scriptSetupAst){
      walkAST(stmt, {
        enter: (node)=>{
          if(node.type !== 'VariableDeclaration'){
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
              warn('inline props type define not ready yet.');
              continue;
            }
            propsName = decl.init.arguments[0].name;
          }
        }
      })
    }
    for (const stmt of scriptSetupAst){
      walkAST(stmt, {
        enter: (node)=>{
          if (node.type !== 'ImportDeclaration'){
            return;
          }
          const {specifiers, source} = node;
          for (const specifier of specifiers){
            if (specifier.local.name === propsName){
              propsFileRelativePath = source.value;
              return;
            }
          }
        }
      })
    }
    const componentFileRoot = dirname(path)
    const propsFilePath = join(componentFileRoot, propsFileRelativePath);
    propsFile.push({
      componentName:compName.toLowerCase(),
      propsName,
      sourcefile:project.addSourceFileAtPath(`${propsFilePath.endsWith('ts') ? propsFile : `${propsFilePath}.ts`}`)
    })
  }
  const tableData: PropsTable = {};
  for (const file of propsFile){
    const props = extractTableData(file.propsName,file.sourcefile);
    const typeAlias = extractType(file.sourcefile);
    if (!tableData[file.componentName]){
      tableData[file.componentName] = {
        tableData: [
          {
            props,
            propsName: file.propsName
          }
        ],
        typeAlias: Array.from(new Set(typeAlias)),
      }
      continue;
    }
    const table = tableData[file.componentName];
    const idx = table.tableData.findIndex((item) => item.propsName === file.propsName);
    if (idx > -1){
      continue;
    }
    table.tableData.push({
      props,
      propsName: file.propsName
    });
    table.typeAlias = Array.from(
      new Set(
        [
          ...Array.from(table.typeAlias),
          ...typeAlias,
        ]
      )
    )
  }
  return tableData;
}

export const buildPropsTableData = () => {
  const ROOT = resolve('packages');
  const vueComponentPath = join(ROOT, 'vue-components');
  if (!existsIndexFile(vueComponentPath)){
    err(`Can not find index.ts at ${vueComponentPath}`);
    return;
  }
  info('founded entry file')
  const entryFile = join(vueComponentPath, 'index.ts');
  const sourcefiles = extractAllDependencyFile(entryFile);
  const registedComponent = extractAllRegisterComponent(sourcefiles)
  const dependencyVueFile = extractVueFilePath(sourcefiles);
  const tableData = extractProps(registedComponent, dependencyVueFile, vueComponentPath);
  buildMsg('Table data generate success', true);
  writeFileSync('docs/.vitepress/props-table-data.json', JSON.stringify(tableData, null, 2));
  buildMsg('Build table data into docs/.vitepress/props-table-data.json', true)
}

buildPropsTableData()