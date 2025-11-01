import createPlugin from 'tailwindcss/plugin.js';
import { DEFAULT_PREFIX, DEFAULT_THEME } from './const';
import { ColorObject, Config, Theme } from '../types';
import { flatColor } from './utils';

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

const plugin = (
  cfg: Partial<Config> = {},
) => {
  const resolveVariant = (
    theme: Theme,
  ) => {
    const variants: { name: string; variant: string[] }[] = [];
    for (const [name, value] of Object.entries(theme)) {
      variants.push({
        name,
        variant: [`&.${value}`, `&[data-theme=${value}]`],
      });
    }
    return variants;
  };
  const resolveTheme = (
    theme: Theme,
    prefix: string,
  ) => {
    const utils: Record<string, Record<string, string>> = {

    };
    for (const [themeName, themeValue] of Object.entries(theme)) {
      utils[`&.${themeName}`] = {} as Record<string, string>;
      for (const [colorName, colorValue] of Object.entries(flatColor<object, string>(themeValue))) {
        if (!colorValue) {
          continue;
        }
        utils[`&.${themeName}`][`--${prefix}-colors-${colorName}`] = colorValue;
      }
    }

    return utils;
  };
  const {
    theme = DEFAULT_THEME,
    prefix = DEFAULT_PREFIX,
  } = cfg;
  const variants = resolveVariant(theme);
  const colors = themeToCSSVar(prefix, theme.dark);
  const themes = resolveTheme(theme, prefix);
  return createPlugin(
    (api) => {
      variants.forEach(({ name, variant }) => {
        api.addVariant(name, variant);
      });
      api.addUtilities(themes);
    },
    {
      theme: {
        extend: {
          colors: colors,
        },
      },
    },
  );
};

export default plugin;
