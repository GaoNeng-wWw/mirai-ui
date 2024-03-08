import plugin from 'tailwindcss/plugin';
import { semanticColor } from './colors/semantic';
import { ConfigTheme } from './types';
import flatten from 'flat';
import Color from 'color';

interface Config {
  prefix?: string;
  themes?: Record<string, ConfigTheme>
}

interface Resoved{
  variants: {name: string; definition: string[]}[]
  utilities: Record<string, Record<string, any>>
  colors: Record<string, ({opacityValue, opacityVariable}: {opacityValue: string; opacityVariable: string}) => string>;
}

function removeDefaultKeys<T extends Object>(obj: T) {
  const newObj = {};

  for (const key in obj) {
    if (key.endsWith("-DEFAULT")) {
      // @ts-ignore
      newObj[key.replace("-DEFAULT", "")] = obj[key];
      continue;
    }
    // @ts-ignore
    newObj[key] = obj[key];
  }

  return newObj;
}
const flattenThemeObject = <TTarget>(obj: TTarget) =>
  removeDefaultKeys(
    flatten(obj, {
      safe: true,
      delimiter: "-",
    }) as Object,
);

const resolve = (
  themes: Record<string, ConfigTheme> = {},
  defaultTheme: 'light'|'dark',
  prefix: string='miraiui'
) => {
  const resolved:Resoved = {
    utilities: {},
    colors: {},
    variants: []
  }
  const parsedColorsCache:Record<string, any> = {}
  for (const [themeName, {colors, extend}] of Object.entries(themes)){
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`;
    const scheme = themeName === "light" || themeName === "dark" ? themeName : extend;
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    resolved.utilities[cssSelector] = scheme
      ? {
          "color-scheme": scheme,
        }
      : {};
    const flatColors = flattenThemeObject(colors) as Record<string, string>;
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    });
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) return;

      try {
        const parsedColor =
          parsedColorsCache[colorValue] || Color(colorValue).hsl().round().array();

        parsedColorsCache[colorValue] = parsedColor;

        const [h, s, l, defaultAlphaValue] = parsedColor;
        const colorVar = `--${prefix}-${colorName}`;
        const opacityVar = `--${prefix}-${colorName}-opacity`;

        
        resolved.utilities[cssSelector]![colorVar] = `${h} ${s}% ${l}%`;
        
        if (typeof defaultAlphaValue === "number") {
          resolved.utilities[cssSelector]![opacityVar] = defaultAlphaValue.toFixed(2);
        }
        
        resolved.colors[colorName] = ({opacityVariable, opacityValue}) => {

          if (!isNaN(+opacityValue)) {
            return `hsl(var(${colorVar}) / ${opacityValue})`;
          }

          if (opacityVariable) {
            return `hsl(var(${colorVar}) / var(${opacityVar}, var(${opacityVariable})))`;
          }

          return `hsl(var(${colorVar}) / var(${opacityVar}, 1))`;
        };
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log("error", error?.message);
      }
    }
  }
  return resolved;
}

const omit = (obj:Object, key: string[]) => {
  const newObj:Record<string, any> = {};
  for (const [k,v] of Object.entries(obj)){
    if (key.includes(k)){
      continue;
    }
    newObj[k] = v;
  }
  return newObj;
}

export const miraiUiPlugin = (
  config: Config={}
) => {
  const {prefix, themes} = config;
  const userLight = themes?.light ?? {};
  const userDark = themes?.dark ?? {};
  const otherTheme = omit(config.themes ?? {}, ['light', 'dark'])
  const light:ConfigTheme = {
    colors: {
      ...userLight.colors,
      ...semanticColor.light
    }
  }
  const dark:ConfigTheme = {
    colors: {
      ...userDark.colors,
      ...semanticColor.dark
    }
  }
  const theme = {
    light,
    dark,
    ...otherTheme
  }
  const resolved = resolve(theme, 'light', prefix)
  return plugin((api)=>{
    api.addUtilities({...resolved?.utilities});
    resolved?.variants.forEach((variant) => {
      api.addVariant(variant.name, variant.definition);
    })
  },{
    theme:{
      extend:{
        colors: {
          // ...semanticColor.light,
          ...resolved?.colors
        },
      }
    }
  })
}