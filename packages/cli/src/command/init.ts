import { Command } from 'commander';
import { COMPONENT_ROOT, COMPONENT_TEMPLATE, ROOT } from '../constant';
import inq from 'inquirer';
import { join } from 'path';
import { existsSync, realpath } from 'fs';
import { error } from '../log';
import { outputFileSync } from 'fs-extra';

export const initComponent = (name: string) => {
  const dummyPath = join(COMPONENT_ROOT, name, 'package.json');
  if (
    existsSync(dummyPath)
  ) {
    return error(`${name} exists`);
  }
  for (const [path, content] of Object.entries(COMPONENT_TEMPLATE(name))) {
    const realPath = join(COMPONENT_ROOT, name, path);
    outputFileSync(realPath, content);
  }
};

export default function (
  cmd: Command,
) {
  cmd
    .command('init [name]')
    .action((name) => {
      if (name) {
        initComponent(name);
        return;
      }
      inq.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'The name of the component you want to create:',
          required: true,
        },
      ])
        .then(({ name }) => {
          initComponent(name);
        });
    });
}
