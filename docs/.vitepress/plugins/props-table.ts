import {sep} from 'path';
import {Identifier, ImportDeclaration, Statement} from '@babel/types';
import {Expression, Node,Symbol, Project, ts, PropertyAssignment, ObjectLiteralExpression, SyntaxKind, ImportTypeNode} from 'ts-morph';
import {Plugin} from 'vitepress';
import {parse, compileScript} from '@vue/compiler-sfc';
import {walkAST} from 'ast-kit';


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
  table: {[x:string]: PropItem},
  codes:string[]
} => {
  const project = new Project();
  const sourcefile = project.addSourceFileAtPath(id);
  const varStmts = sourcefile.getVariableStatements();
  const exportedStmts = varStmts.filter((stmt) => stmt.isExported())
  if (!exportedStmts.length){
    return {table: {}, codes: []};
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
  const propsItems:Map<string, PropItem> = new Map();
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
      propsItems.set(name, propItem);
    }
  }
  const types = sourcefile.getTypeAliases()
  .map((node)=>node.getFullText().trim())
  return {
    table: Object.fromEntries(propsItems.entries()),
    codes: types
  }
}

export const tsExport = new Map<string, ReturnType<typeof extractPropTable>[]>();
const CONSTANT = 'defineProps';

export default {
  name: 'props-table',
  enforce: 'pre',
  transform(code:string, id:string) {
    if (!id.endsWith('vue') && !id.endsWith('ts') || ignoreModule.some((m) => id.includes(m))){
      return;
    }
    const pathArr = id.split('/');
    let idx = 0;
    for (;idx<pathArr.length;idx++){
      if (pathArr[idx].includes('components')){
        break;
      }
    }
    const componentName = pathArr[idx+1].toLowerCase();
    if (componentName === 'index.ts' || componentName.includes('_')){
      return;
    }
    if (id.endsWith('ts')){

      if (ignoreModule.some((m) => id.includes(m))){
        return;
      }
      const data = extractPropTable(id)
      const dataIsEmpty = Object.values(data).every((value) => Array.isArray(value) ? !value.length : !Object.values(value).length)
      if (dataIsEmpty){
        return;
      }
      if (!tsExport.has(componentName)){
        tsExport.set(componentName, [data])
      } else {
        tsExport.get(componentName)?.push(data)
      }
    }
  },
  apply: 'serve',
} as Plugin