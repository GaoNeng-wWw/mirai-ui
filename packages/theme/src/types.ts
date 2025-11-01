export type ArrayToUnion<T extends unknown[]> = T[number];
export type ColorStep = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 'DEFAULT', 'foreground'];
export type ColorObject = {
  [S in ArrayToUnion<ColorStep>]: string
};
export type Semantics = ['primary', 'secondary', 'DEFAULT', 'success', 'warning', 'danger'];
export type SemanticsColor = {
  [S in ArrayToUnion<Semantics>]: Omit<ColorObject, 'DEFAULT' | 'foreground'>;
} & {
  black: string;
  white: string;
};
export type DeepPartial<T> = {
  [k in keyof T]: T[k] extends object ? DeepPartial<T[k]> : T[k] | undefined
};
export type Optional<T> = {
  [k in keyof T]?: T[k]
}
export type ThemeMode = 'light' | 'dark';
export type Theme = {
  light: {
    [S in ArrayToUnion<Semantics>]: ColorObject
  };
  dark: {
    [S in ArrayToUnion<Semantics>]: ColorObject
  };
} & {
  [x: string]: Partial<{
    [S in ArrayToUnion<Semantics>]: ColorObject
  }>;
};
export type Config = {
  prefix: string;
  theme: Theme;
  extendsTheme: DeepPartial<Optional<Theme>>;
};
