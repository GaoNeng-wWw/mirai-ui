import { ColorObject, Theme } from '../types';
import { semantics } from '../colors/semantics';
import chroma from 'chroma-js';
import { readableColor } from 'color2k';

const reverseColor = (colors: Omit<ColorObject, 'DEFAULT' | 'foreground'>): Omit<ColorObject, 'DEFAULT' | 'foreground'> => {
  const swappedColors = {};
  const keys = Object.keys(colors);
  const length = keys.length;

  for (let i = 0; i < length / 2; i++) {
    const key1 = keys[i];
    const key2 = keys[length - 1 - i];

    // @ts-ignore
    swappedColors[key1] = colors[key2];
    // @ts-ignore
    swappedColors[key2] = colors[key1];
  }
  if (length % 2 !== 0) {
    const middleKey = keys[Math.floor(length / 2)];

    // @ts-ignore
    swappedColors[middleKey] = colors[middleKey];
  }

  return swappedColors as any;
};

export const DEFAULT_PREFIX = 'mirai-ui';
export const DEFAULT_THEME: Theme = {
  light: {
    primary: {
      ...semantics.primary,
      DEFAULT: semantics.primary[500],
      foreground: readableColor(chroma(semantics.primary[800]).hex()),
    },
    secondary: {
      ...semantics.secondary,
      DEFAULT: semantics.secondary[300],
      foreground: readableColor(chroma(semantics.secondary[300]).hex()),
    },
    DEFAULT: {
      ...semantics.default,
      DEFAULT: semantics.default[500],
      foreground: readableColor(chroma(semantics.default[500]).hex()),
    },
    success: {
      ...semantics.success,
      DEFAULT: semantics.success[500],
      foreground: readableColor(chroma(semantics.success[500]).hex()),
    },
    warning: {
      ...semantics.warning,
      DEFAULT: semantics.warning[500],
      foreground: readableColor(chroma(semantics.warning[500]).hex()),
    },
    danger: {
      ...semantics.danger,
      DEFAULT: semantics.danger[500],
      foreground: readableColor(chroma(semantics.danger[500]).hex()),
    },
  },
  dark: {
    primary: {
      ...reverseColor(semantics.primary),
      DEFAULT: semantics.primary[500],
      foreground: readableColor(chroma(semantics.primary[800]).hex()),
    },
    secondary: {
      ...reverseColor(semantics.secondary),
      DEFAULT: semantics.secondary[600],
      foreground: readableColor(chroma(semantics.secondary[800]).hex()),
    },
    DEFAULT: {
      ...reverseColor(semantics.default),
      DEFAULT: semantics.default[500],
      foreground: readableColor(chroma(semantics.default[800]).hex()),
    },
    success: {
      ...reverseColor(semantics.success),
      DEFAULT: semantics.success[500],
      foreground: readableColor(chroma(semantics.success[800]).hex()),
    },
    warning: {
      ...reverseColor(semantics.warning),
      DEFAULT: semantics.warning[500],
      foreground: readableColor(chroma(semantics.warning[800]).hex()),
    },
    danger: {
      ...reverseColor(semantics.danger),
      DEFAULT: semantics.danger[500],
      foreground: readableColor(chroma(semantics.danger[800]).hex()),
    },
  },
};
