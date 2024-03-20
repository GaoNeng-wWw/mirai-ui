import {Expression, Node,Symbol, Project, ts, PropertyAssignment, ObjectLiteralExpression, SyntaxKind} from 'ts-morph';
import {Content, Plugin} from 'vitepress';


type PropContentConfigure = {
  zh: string;
  en: string;
};

interface PropItem {
  name: string;
  label:PropContentConfigure;
  description: PropContentConfigure;
  deprecated: PropContentConfigure;
  defaultValue: string;
  demo: string;
  types: {
    ref:boolean;
    refName: string;
    name: string;
  }
};

const ignoreModule = ['theme', '.vitepress', 'node_modules'];

const extractPropTable = (id: string):{
  table: PropItem[],
  codes:string[]
} => {
  const project = new Project();
  const sourcefile = project.addSourceFileAtPath(id);
  const varStmts = sourcefile.getVariableStatements();
  const exportedStmts = varStmts.filter((stmt) => stmt.isExported())
  if (!exportedStmts.length){
    return {table: [], codes: []};
  }
  const variableDeclarationList = exportedStmts.map((stmt)=>{
    return stmt.getChildren();
  })
  .flat(1)
  .filter((child):child is Node<ts.VariableDeclarationList> => ts.isVariableDeclarationList(child.compilerNode))
  const decl = new Map<string, Expression<ts.Expression> | undefined>();
  for (const variable of variableDeclarationList){
    for (const varDecl of variable.getNodeProperty('declarations') ?? []){
      const name = varDecl.getName();
      const initializer = varDecl.getInitializer();
      if (initializer?.isKind(ts.SyntaxKind.AsExpression)){
        decl.set(name, initializer.getExpression());
        continue;
      }
      decl.set(name,initializer);
    }
  }
  const symbols = new Map<string, (Symbol|undefined)[]>();
  for (const [name, value] of decl.entries()){
    if(!value?.compilerNode){
      continue;
    }
    if (!value.isKind(ts.SyntaxKind.ObjectLiteralExpression)){
      continue;
    }
    if (value.isKind(ts.SyntaxKind.ObjectLiteralExpression)){
      symbols.set(name, value.getProperties().map((p) =>p.getSymbol()));
    }
  }
  const rawPropTable = new Map<string, {name: string, decl:Node<ts.Node>|undefined}>();
  const propsItems: PropItem[] = [];
  for (const [name, symbol] of symbols.entries()){
    for (const s of symbol){
      const typeName = s?.getEscapedName() ?? '';
      const value = s?.getValueDeclaration() as PropertyAssignment;
      const express = value.getInitializer() as ObjectLiteralExpression;
      const tags = s?.getJsDocTags();
      const propItem: PropItem = {
        name: typeName,
        label: {
          zh: '',
          en: ''
        },
        description: {
          zh: '',
          en: ''
        },
        deprecated: {
          zh: '',
          en: ''
        },
        defaultValue: '',
        demo: '',
        types: {
          ref: false,
          refName: '',
          name: ''
        }
      }
      tags?.forEach((tag)=>{
        const templateReg = /\{(?<lang>(\w*)-?\w*)\}\ ?(?<content>.*)/gm;
        const name = tag.getName() as Exclude<keyof PropItem, 'name'>;
        const text = tag.getText()[0].text;
        const groups = templateReg.exec(text.toString().trim())?.groups as {lang: 'zh'|'en', content: string};
        const {lang,content} = {
          lang: groups.lang ?? '',
          content: groups.content ?? '',
        }
        if (name === 'demo'){
          propItem.demo = content;
          return;
        }
        if (name === 'types'||name==='defaultValue'){
          return;
        }
        if (propItem[name] === undefined){
          propItem[name] = {
            zh: '',
            en: '',
          };
          propItem[name]![lang]=content;
        } else {
          propItem[name]![lang]=content;
        }
      })
      const typeValue = (express.getProperty('type') as PropertyAssignment).getInitializer();
      const defaultValue = (express.getProperty('default') as PropertyAssignment).getInitializer();
      const isRefType = typeValue?.isKind(ts.SyntaxKind.AsExpression)
      const defaultValueType = defaultValue?.getType()
      propItem.types.ref=isRefType ?? false
      if (isRefType){
        const node = typeValue.getType();
        const refName = node.getAliasTypeArguments()[0].getAliasSymbol()?.getName()
        if (!refName){
          continue;
        }
        propItem.types.refName = refName;
      }else {
        const node = typeValue?.getType();
        const typeName = node?.getText().replace('Constructor', '');
        if (defaultValueType?.isBooleanLiteral()){
          propItem.defaultValue=defaultValue?.getText(false) ?? '';
        } else {
          propItem.defaultValue=`${defaultValueType?.getLiteralValue()}`;
        }
        propItem.types.name = typeName ?? 'unknown';
      }
      propsItems.push(propItem);
      rawPropTable.set(name, {name: typeName, decl: value});
    }
  }
  const types = sourcefile.getTypeAliases()
  .map((node)=>node.getFullText().trim())
  return {
    table: propsItems,
    codes: types
  }
}

const tsExport = new Map<string, ReturnType<typeof extractPropTable>>();

export default {
  name: 'props-table',
  enforce: 'pre',
  transform(code:string, id:string) {
    if (!id.endsWith('vue') && !id.endsWith('ts')){
      return;
    }
    if (id.endsWith('ts')){
      if (ignoreModule.some((m) => id.includes(m))){
        return;
      }
      if (!tsExport.has(id)){
        tsExport.set(id, extractPropTable(id))
      }
    }
  },
  apply: 'serve'
} as Plugin