import chalk from 'chalk';
export const info = (msg: string) => console.log(chalk.bold.white(msg));
export const warn = (msg: string) => console.log(chalk.yellow(msg));
export const err = (msg: string) => console.log(chalk.red(msg));
export const buildMsg = (name: string, successed: boolean = false) => console.log(
  chalk.bold.blue('Build'), ' ', chalk.bold.white(name), successed ? chalk.bold.blue('success') : chalk.yellow('fail')
);
