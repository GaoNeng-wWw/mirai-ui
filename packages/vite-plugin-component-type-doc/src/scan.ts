import fg from 'fast-glob';
import { readFileSync } from 'fs';
import { basename } from 'path';

export const scanComponents = (
  basePath: string,
  pattern: string
) => {
  return fg.sync([pattern], {
    cwd: basePath,
    absolute: true,
    ignore: ['node_modules/**']
  })
}
export const toCode = (path: string) => {
  return readFileSync(path).toString();
}
export const toName = (path: string) => {
  return basename(path);
}

