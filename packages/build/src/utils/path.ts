import { join } from 'node:path';

export const cwd = () => process.cwd();
export const absCwd = (...path: string[]) => join(cwd(), ...path);