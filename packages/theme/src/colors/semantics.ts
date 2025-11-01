import { SemanticsColor } from '../types';
import blue from './blue';
import green from './green';
import orange from './orange';
import red from './red';
import zinc from './zinc';

export const semantics = {
  primary: blue,
  secondary: zinc,
  default: zinc,
  success: green,
  warning: orange,
  danger: red,
  black: '#000',
  white: '#fff',
} satisfies SemanticsColor;
