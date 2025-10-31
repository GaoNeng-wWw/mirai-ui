import { definePreset, Preset, Rule } from 'unocss';
import { Config, Theme } from '../types';
import { DEFAULT_PREFIX, DEFAULT_THEME } from './const';
import deepmerge from 'deepmerge';
import { omit } from '@miraiui-org/internal-utils';

const resolveConfig = (
  { prefix, theme, extendsTheme }: Config,
) => {
  const light = deepmerge(
    theme.light, extendsTheme.light ?? {},
  );
  const dark = deepmerge(
    theme.dark, extendsTheme.dark ?? {},
  );
  const resolvedTheme = {
    light,
    dark,
    ...omit(extendsTheme, ['light', 'dark']),
  };
  const buildCssVarByTheme = (
    theme: Theme[string],
  ) => {
    const cssVar: [string, string][] = [];
    for (const [colorName, colorObject] of Object.entries(theme)) {
      for (const [level, value] of Object.entries(colorObject)) {
        cssVar.push([
          `--colors-${colorName}-${level}`, value,
        ]);
      }
    }
    return cssVar.map(([k, v]) => {
      return {
        [k]: v,
      };
    })
      .reduce((pre, cur) => {
        return {
          ...pre,
          ...cur,
        };
      }, {});
  };
  const buildTheme = (
    _theme: Theme[string],
  ) => {
    const theme: Record<string, Record<string, any>> = {
      colors: {},
    };
    for (const [colorName, colorValue] of Object.entries(_theme)) {
      theme['colors'][colorName] = { };
      for (const [level] of Object.entries(colorValue)) {
        theme['colors'][colorName][level] = `var(--${colorName}-${level})`;
      }
    }
    return theme;
  };
  const createTheme = (themeName: string, theme: Theme[string]): Rule[] => {
    const cssVar = buildCssVarByTheme(theme);
    return [
      [
        `${themeName}`, cssVar,
      ],
      [
        `&[data-theme='${themeName}']`, cssVar,
      ],
    ];
  };
  const rules: Rule[] = [];
  // 这里真的传入了什么不重要, 因为这里只是构建 Rule
  // Rule 是 rulname -> cssvar 的一个映射而不是具体的值
  const unotheme = buildTheme(DEFAULT_THEME['light']);
  for (const [themeName, theme] of Object.entries(resolvedTheme)) {
    rules.push(
      ...createTheme(themeName, theme as Theme[string]),
    );
  }
  return {
    theme: unotheme,
    rules,
  };
};

export default (
  cfg: Partial<Config> = {},
): Preset => definePreset(() => {
  {
    const {
      prefix = DEFAULT_PREFIX,
      theme = DEFAULT_THEME,
      extendsTheme = {},
    } = cfg;
    const { rules, theme: unoTheme } = resolveConfig({ prefix, theme, extendsTheme });
    console.log(unoTheme);
    return {
      name: 'MiraiUi-Preset',
      theme: unoTheme,
      rules: rules,
    };
  }
});
