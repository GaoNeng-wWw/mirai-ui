import { warn } from '../utils';
import { JSDoc } from 'ts-morph';

const VALIDE_JS_DOC_TAG = ['demo', 'zh', 'en'];

export const inferJsDoc = (
  node: JSDoc
) => {
  const ret: Record<string, string> = {};
  const tags = node.getTags();
  for (const tag of tags) {
    const name = tag.getTagName().slice(1,-1);
    if (!VALIDE_JS_DOC_TAG.includes(name)) {
      warn('unknown tag', name);
      continue;
    }
    const comment = tag.getCommentText() ?? '';
    ret[name] = comment.slice(1,-1);
  }
}