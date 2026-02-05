import { ColorObject, LayoutItem, Layout, Theme } from '../types';
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
export const COMMON_LAYOUT_ITEM = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  rounded: {
    xs: '0.15rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  leading: {
    xs: '1rem',
    sm: '1.25rem',
    md: '1.5rem',
    lg: '1.75rem',
    xl: '2rem',
  },
  padding: {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  height: {
    xs: '1.75rem',
    sm: '2.25rem',
    md: '2.5rem',
    lg: '3rem',
    xl: '3.5rem',
  },

  // 通常用于最小宽度(min-width)或标准容器宽
  width: {
    auto: 'auto',
    full: '100%',
    xs: '4rem',
    sm: '6rem',
    md: '8rem',
    lg: '12rem',
    xl: '16rem',
  },

  margin: {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2.5rem',
  },
};

export const DEFAULT_LAYOUT: Layout = {
  light: {
    opacity: {
      hover: 0.8,
      disabled: 0.5,
    },
    ...COMMON_LAYOUT_ITEM,
  },
  dark: {
    ...COMMON_LAYOUT_ITEM,
    opacity: {
      hover: 0.9,
      disabled: 0.8,
    },
  },
};
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
