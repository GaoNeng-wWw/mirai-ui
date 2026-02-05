import { program } from 'commander';
import startupCommand from './command';

const p = program;

p.name('mirai-ui');

startupCommand(p);

p.parse();
