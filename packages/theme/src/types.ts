import { ThemeColors } from './colors/semantic';

export type ConfigTheme = {
    extend?: 'light' | 'dark';
    colors?: ThemeColors;
}