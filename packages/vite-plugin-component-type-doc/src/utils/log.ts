import chalk from 'chalk';
export const warn = (...msg: string[]) => {
  console.log(
    chalk.yellow(
      `WARN:`, ...msg
    )
  )
}