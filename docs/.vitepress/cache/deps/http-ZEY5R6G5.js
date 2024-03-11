import {
  graphql
} from "./chunk-KCDA47CP.js";
import "./chunk-LFZIUUJJ.js";
import {
  shellscript
} from "./chunk-5QQLSLE2.js";
import "./chunk-MNP2HDZ5.js";
import {
  xml
} from "./chunk-4D62EOH4.js";
import "./chunk-OWJSYGJ7.js";
import {
  json
} from "./chunk-MCCNSCY4.js";
import "./chunk-SJJAB6IM.js";
import "./chunk-G5ALNE7Z.js";
import "./chunk-F3FYYIAV.js";

// ../node_modules/.pnpm/shiki@1.1.7/node_modules/shiki/dist/langs/http.mjs
var lang = Object.freeze({ "displayName": "HTTP", "fileTypes": ["http", "rest"], "name": "http", "patterns": [{ "begin": "^\\s*(?=curl)", "end": "^\\s*(\\#{3,}.*?)?\\s*$", "endCaptures": { "0": { "name": "comment.line.sharp.http" } }, "name": "http.request.curl", "patterns": [{ "include": "source.shell" }] }, { "begin": "\\s*(?=(\\[|{[^{]))", "end": "^\\s*(\\#{3,}.*?)?\\s*$", "endCaptures": { "0": { "name": "comment.line.sharp.http" } }, "name": "http.request.body.json", "patterns": [{ "include": "source.json" }] }, { "begin": "^\\s*(?=<\\S)", "end": "^\\s*(\\#{3,}.*?)?\\s*$", "endCaptures": { "0": { "name": "comment.line.sharp.http" } }, "name": "http.request.body.xml", "patterns": [{ "include": "text.xml" }] }, { "begin": "\\s*(?=(query|mutation))", "end": "^\\s*(\\#{3,}.*?)?\\s*$", "endCaptures": { "0": { "name": "comment.line.sharp.http" } }, "name": "http.request.body.graphql", "patterns": [{ "include": "source.graphql" }] }, { "begin": "\\s*(?=(query|mutation))", "end": "^\\{\\s*$", "name": "http.request.body.graphql", "patterns": [{ "include": "source.graphql" }] }, { "include": "#metadata" }, { "include": "#comments" }, { "captures": { "1": { "name": "keyword.other.http" }, "2": { "name": "variable.other.http" }, "3": { "name": "string.other.http" } }, "match": "^\\s*(@)([^\\s=]+)\\s*=\\s*(.*?)\\s*$", "name": "http.filevariable" }, { "captures": { "1": { "name": "keyword.operator.http" }, "2": { "name": "variable.other.http" }, "3": { "name": "string.other.http" } }, "match": "^\\s*(\\?|&)([^=\\s]+)=(.*)$", "name": "http.query" }, { "captures": { "1": { "name": "entity.name.tag.http" }, "2": { "name": "keyword.other.http" }, "3": { "name": "string.other.http" } }, "match": "^([\\w\\-]+)\\s*(\\:)\\s*([^/].*?)\\s*$", "name": "http.headers" }, { "include": "#request-line" }, { "include": "#response-line" }], "repository": { "comments": { "patterns": [{ "match": "^\\s*\\#{1,}.*$", "name": "comment.line.sharp.http" }, { "match": "^\\s*\\/{2,}.*$", "name": "comment.line.double-slash.http" }] }, "metadata": { "patterns": [{ "captures": { "1": { "name": "entity.other.attribute-name" }, "2": { "name": "punctuation.definition.block.tag.metadata" }, "3": { "name": "entity.name.type.http" } }, "match": "^\\s*\\#{1,}\\s+(?:((@)name)\\s+([^\\s\\.]+))$", "name": "comment.line.sharp.http" }, { "captures": { "1": { "name": "entity.other.attribute-name" }, "2": { "name": "punctuation.definition.block.tag.metadata" }, "3": { "name": "entity.name.type.http" } }, "match": "^\\s*\\/{2,}\\s+(?:((@)name)\\s+([^\\s\\.]+))$", "name": "comment.line.double-slash.http" }, { "captures": { "1": { "name": "entity.other.attribute-name" }, "2": { "name": "punctuation.definition.block.tag.metadata" } }, "match": "^\\s*\\#{1,}\\s+((@)note)\\s*$", "name": "comment.line.sharp.http" }, { "captures": { "1": { "name": "entity.other.attribute-name" }, "2": { "name": "punctuation.definition.block.tag.metadata" } }, "match": "^\\s*\\/{2,}\\s+((@)note)\\s*$", "name": "comment.line.double-slash.http" }, { "captures": { "1": { "name": "entity.other.attribute-name" }, "2": { "name": "punctuation.definition.block.tag.metadata" }, "3": { "name": "variable.other.http" }, "4": { "name": "string.other.http" } }, "match": "^\\s*\\#{1,}\\s+(?:((@)prompt)\\s+([^\\s]+)(?:\\s+(.*))?\\s*)$", "name": "comment.line.sharp.http" }, { "captures": { "1": { "name": "entity.other.attribute-name" }, "2": { "name": "punctuation.definition.block.tag.metadata" }, "3": { "name": "variable.other.http" }, "4": { "name": "string.other.http" } }, "match": "^\\s*\\/{2,}\\s+(?:((@)prompt)\\s+([^\\s]+)(?:\\s+(.*))?\\s*)$", "name": "comment.line.double-slash.http" }] }, "protocol": { "patterns": [{ "captures": { "1": { "name": "keyword.other.http" }, "2": { "name": "constant.numeric.http" } }, "match": "(HTTP)/(\\d+.\\d+)", "name": "http.version" }] }, "request-line": { "captures": { "1": { "name": "keyword.control.http" }, "2": { "name": "const.language.http" }, "3": { "patterns": [{ "include": "#protocol" }] } }, "match": "(?i)^(?:(get|post|put|delete|patch|head|options|connect|trace|lock|unlock|propfind|proppatch|copy|move|mkcol|mkcalendar|acl|search)\\s+)?\\s*(.+?)(?:\\s+(HTTP\\/\\S+))?$", "name": "http.requestline" }, "response-line": { "captures": { "1": { "patterns": [{ "include": "#protocol" }] }, "2": { "name": "constant.numeric.http" }, "3": { "name": "string.other.http" } }, "match": "(?i)^\\s*(HTTP\\/\\S+)\\s([1-5][0-9][0-9])\\s(.*)$", "name": "http.responseLine" } }, "scopeName": "source.http", "embeddedLangs": ["shellscript", "json", "xml", "graphql"] });
var http = [
  ...shellscript,
  ...json,
  ...xml,
  ...graphql,
  lang
];
export {
  http as default
};
//# sourceMappingURL=http-ZEY5R6G5.js.map
