import { Command } from 'commander';
import startupInitCmd from './init';
import startupBuildCmd from './build-entry';

export default function (cmd: Command) {
  startupInitCmd(cmd);
  startupBuildCmd(cmd);
}
