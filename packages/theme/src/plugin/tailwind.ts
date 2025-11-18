import createPlugin from 'tailwindcss/plugin.js';
import { DEFAULT_LAYOUT, DEFAULT_PREFIX, DEFAULT_THEME } from './const';
import { ColorObject, Config, LayoutItem, Layout, Theme } from '../types';
import { flatColor, mapKeys, kebabCase, omit } from './utils';
import deepmerge from 'deepmerge';
import { utilities } from './utilities';

const themeToCSSVar = (prefix: string, theme: Theme[string]) => {
  const semanticObjectToCSSVar = (
    prefix: string,
    semanticName: string,
    colorObject: ColorObject,
  ) => {
    if (!theme) {
      return null;
    }
    const ret: Record<string, Record<string, string>> = {
      [semanticName]: {},
    };
    for (const [step] of Object.entries(colorObject)) {
      ret[semanticName][step] = `var(--${prefix}-colors-${semanticName}-${step})`;
    }
    return ret;
  };

  return Object.entries(theme)
    .map(([name, obj]) => {
      const vars = semanticObjectToCSSVar(prefix, name, obj);
      if (!vars) {
        return null;
      }
      return vars;
    })
    .filter(vars => vars !== null)
    .reduce((pre, cur) => {
      return {
        ...pre,
        ...cur,
      };
    }, {});
};
const resolveVariant = (
  theme: Theme,
) => {
  const variants: { name: string; variant: string[] }[] = [];
  for (const [name] of Object.entries(theme)) {
    variants.push({
      name,
      variant: [`&.${name}`, `&[data-theme=${name}]`],
    });
  }
  return variants;
};
export type ResolveTheme = {
  theme: Theme;
  layout: Layout;
  prefix: string;
};
export type Resolved = {
  utilities: Record<string, Record<string, any>>;
};

const visit = <T extends object>(
  object: T,
  accept: (key: string, value: unknown) => boolean,
) => {
  if (typeof object !== 'object') {
    return;
  }
  for (
    const [key, value] of Object.entries(object)
  ) {
    if (accept(key, value)) {
      return;
    }
    visit(value, accept);
  }
};

const resolveTheme = (
  { theme, layout, prefix }: ResolveTheme,
) => {
  const resolved: Resolved = {
    utilities: {},
  };
  for (const [themeName, themeColors] of Object.entries(theme)) {
    const selector = `&.${themeName}`;
    resolved.utilities[selector] = {};
    const flatedColor = flatColor(themeColors) as Record<string, string>;
    const cssBase = `--${prefix}-colors`;
    for (const [colorName, colorValue] of Object.entries(flatedColor)) {
      resolved.utilities[selector][`${cssBase}-${colorName}`] = colorValue;
    }
    const _layout = layout[themeName];
    if (!_layout) {
      continue;
    }
    for (const [key, value] of Object.entries(_layout)) {
      const layoutKey = `--${prefix}-layout`;
      if (typeof value === 'object') {
        const layoutTheme = Object.entries(value);
        for (const [nestKey, nestValue] of layoutTheme) {
          const cssVar = kebabCase(`${layoutKey}-${key}-${nestKey}`);
          resolved.utilities[selector][cssVar] = nestValue;
        }
        continue;
      }
      const cssVar = kebabCase(`${layoutKey}-${key}`);
      resolved.utilities[selector][cssVar] = value;
    }
  }
  return resolved;
};

const plugin = (
  cfg: Config = {
    layout: DEFAULT_LAYOUT,
    prefix: DEFAULT_PREFIX,
    theme: DEFAULT_THEME,
  },
) => {
  const {
    prefix = DEFAULT_PREFIX,
  } = cfg;
  const variants = resolveVariant(cfg.theme);
  const theme = {
    light: deepmerge(cfg.theme.light, DEFAULT_THEME.light),
    dark: deepmerge(cfg.theme.dark, DEFAULT_THEME.dark),
    ...omit(cfg.theme ?? {}, ['light', 'dark']),
  };
  const layout: Layout = {
    light: deepmerge(cfg.layout.light, DEFAULT_LAYOUT.light),
    dark: deepmerge(cfg.layout.dark, DEFAULT_LAYOUT.dark),
    ...omit(cfg.layout, ['light', 'dark']),
  };
  const colors = themeToCSSVar(prefix, theme.dark);
  const resolved = resolveTheme({ theme, layout, prefix });
  return createPlugin(
    (api) => {
      variants.forEach(({ name, variant }) => {
        api.addVariant(name, variant);
      });
      api.addUtilities({ ...resolved.utilities, ...utilities });
    },
    {
      theme: {
        extend: {
          colors: colors,
          fontFamily: {
            display: ['"Noto Sans SC"', '"sans-serif"'],
          },
          opacity: {
            hover: `var(--${prefix}-layout-opacity-hover)`,
            disabled: `var(--${prefix}-layout-opacity-disabled)`,
          },
          borderRadius: {
            xs: `var(--${prefix}-layout-rounded-xs)`,
            sm: `var(--${prefix}-layout-rounded-sm)`,
            md: `var(--${prefix}-layout-rounded-md)`,
            lg: `var(--${prefix}-layout-rounded-lg)`,
            xl: `var(--${prefix}-layout-rounded-xl)`,
          },
        },
      },
    },
  );
};

export default plugin;

// const resolveTheme = (
//   theme: Theme,
//   layouts: LayoutItem,
//   prefix: string,
// ) => {
//   const utils: Record<string, Record<string, string>> = {};
//   for (const [themeName, themeValue] of Object.entries(theme)) {
//     const selector = `&.${themeName}`;
//     utils[selector] = {} as Record<string, string>;
//     for (const [colorName, colorValue] of Object.entries(flatColor<object, string>(themeValue))) {
//       if (!colorValue) {
//         continue;
//       }
//       utils[selector][`--${prefix}-colors-${colorName}`] = colorValue;
//     }
//     const flatedLayout = mapKeys(
//       layouts,
//       (_, key) => kebabCase(key),
//     );
//     for (const [key, value] of Object.entries(flatedLayout)) {
//       if (!value) {
//         continue;
//       }
//       const cssKey = `--${prefix}-${key}`;
//       if (typeof value === 'object') {
//         for (const [size, sizeValue] of Object.entries(value)) {
//           utils[selector][`${cssKey}-${size}`] = sizeValue as string;
//         }
//       } else {
//         const formattedValue = cssKey.includes('opacity') && typeof value === 'number'
//           ? value.toString().replace(/^0\./, '.')
//           : value;

//         utils[selector]![cssKey] = formattedValue;
//       }
//     }
//   }
//   return utils;
// };
