import {
  diff
} from "./chunk-FCJXHMFS.js";
import "./chunk-F3FYYIAV.js";

// ../node_modules/.pnpm/shiki@1.1.7/node_modules/shiki/dist/langs/git-commit.mjs
var lang = Object.freeze({ "displayName": "Git Commit Message", "name": "git-commit", "patterns": [{ "begin": "(?=^diff\\ \\-\\-git)", "comment": "diff presented at the end of the commit message when using commit -v.", "contentName": "source.diff", "end": "\\z", "name": "meta.embedded.diff.git-commit", "patterns": [{ "include": "source.diff" }] }, { "begin": "^(?!#)", "comment": "User supplied message", "end": "^(?=#)", "name": "meta.scope.message.git-commit", "patterns": [{ "captures": { "1": { "name": "invalid.deprecated.line-too-long.git-commit" }, "2": { "name": "invalid.illegal.line-too-long.git-commit" } }, "comment": "Mark > 50 lines as deprecated, > 72 as illegal", "match": "\\G.{0,50}(.{0,22}(.*))$", "name": "meta.scope.subject.git-commit" }] }, { "begin": "^(?=#)", "comment": "Git supplied metadata in a number of lines starting with #", "contentName": "comment.line.number-sign.git-commit", "end": "^(?!#)", "name": "meta.scope.metadata.git-commit", "patterns": [{ "captures": { "1": { "name": "markup.changed.git-commit" } }, "match": "^#\\t((modified|renamed):.*)$" }, { "captures": { "1": { "name": "markup.inserted.git-commit" } }, "match": "^#\\t(new file:.*)$" }, { "captures": { "1": { "name": "markup.deleted.git-commit" } }, "match": "^#\\t(deleted.*)$" }, { "captures": { "1": { "name": "keyword.other.file-type.git-commit" }, "2": { "name": "string.unquoted.filename.git-commit" } }, "comment": "Fallback for non-English git commit template", "match": "^#\\t([^:]+): *(.*)$" }] }], "scopeName": "text.git-commit", "embeddedLangs": ["diff"] });
var gitCommit = [
  ...diff,
  lang
];
export {
  gitCommit as default
};
//# sourceMappingURL=git-commit-Z4TW2HU7.js.map
