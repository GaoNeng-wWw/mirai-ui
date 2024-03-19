import { readableColor } from 'color2k';
import { commonColor } from './common';

export type Colors = Partial<{
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    DEFAULT: string;
    foreground: string;
}>
export type BaseColors = {
  background: Colors;
  foreground: Colors;
  divider: Colors;
  overlay: Colors;
  focus: Colors;
  content1: Colors;
  content2: Colors;
  content3: Colors;
  content4: Colors;
};

export type ThemeColors = BaseColors & {
  default: Colors
  primary: Colors
  secondary: Colors
  success: Colors
  warning: Colors
  danger: Colors
};

export type SemanticBaseColors = {
  light: BaseColors;
  dark: BaseColors;
};

const colorReverse = <T extends Colors>(color:T) => {
  const res:Colors = {};
  const keys = Object.keys(color) as unknown as (keyof Colors)[];
  for (let i=0;i<keys.length/2;i++) {
    const [k1, k2] = [keys[i], keys[keys.length-1-i]];
    res[k1]=color[k2];
    res[k2]=color[k1];
  }
  if (keys.length % 2) {
    const mid = keys[Math.floor(keys.length/2)];
    res[mid] = color[mid];
  }
  return res;
};

const base: SemanticBaseColors = {
  light:{
    background:{
      DEFAULT: commonColor.white
    },
    foreground: {
      ...commonColor.zinc,
      DEFAULT: '#11181C'
    },
    divider: {
      DEFAULT: 'rgba(0,0,0,.3)'
    },
    focus:{
      DEFAULT: commonColor.blue[500]
    },
    overlay: {
      DEFAULT: commonColor.black
    },
    content1: {
      DEFAULT: commonColor.white,
      foreground: '#11181C'
    },
    content2: {
      DEFAULT: commonColor.zinc[100],
      foreground: commonColor.zinc[800]
    },
    content3: {
      DEFAULT: commonColor.zinc[200],
      foreground: commonColor.zinc[700]
    },
    content4: {
      DEFAULT: commonColor.zinc[300],
      foreground: commonColor.zinc[600]
    },
  },
  dark:{
    background:{
      DEFAULT: commonColor.black
    },
    foreground:{
      ...colorReverse(commonColor.zinc),
      DEFAULT: '#ECEDEE'
    },
    focus:{
      DEFAULT: commonColor.blue[500]
    },
    overlay:{
      DEFAULT: commonColor.black
    },
    divider:{
      DEFAULT: 'rgba(255,255,255,.3)'
    },
    content1: {
      DEFAULT: commonColor.zinc[900],
      foreground: commonColor.zinc[50],
    },
    content2: {
      DEFAULT: commonColor.zinc[800],
      foreground: commonColor.zinc[100],
    },
    content3: {
      DEFAULT: commonColor.zinc[700],
      foreground: commonColor.zinc[200],
    },
    content4: {
      DEFAULT: commonColor.zinc[600],
      foreground: commonColor.zinc[300],
    },
  }
};

const light:ThemeColors = {
  ...base.light,
  default:{
    ...commonColor.zinc,
    foreground: readableColor(commonColor.zinc[300]),
    DEFAULT: commonColor.zinc[300]
  },
  primary:{
    ...commonColor.blue,
    foreground: readableColor(commonColor.blue[600]),
    DEFAULT: commonColor.blue[600]
  },
  secondary:{
    ...commonColor.zinc,
    foreground: readableColor(commonColor.zinc[300]),
    DEFAULT: commonColor.zinc[300]
  },
  success:{
    ...commonColor.green,
    foreground: readableColor(commonColor.green[600]),
    DEFAULT: commonColor.green[600]
  },
  warning:{
    ...commonColor.orange,
    foreground: readableColor(commonColor.orange[600]),
    DEFAULT: commonColor.orange[600]
  },
  danger:{
    ...commonColor.red,
    foreground: readableColor(commonColor.red[500]),
    DEFAULT: commonColor.red[500]
  }
    
};

const dark:ThemeColors = {
  ...base.dark,
  default:{
    ...colorReverse(commonColor.zinc),
    foreground: readableColor(commonColor.zinc[700]),
    DEFAULT: commonColor.zinc[700]
  },
  primary:{
    ...colorReverse(commonColor.blue),
    foreground: readableColor(commonColor.blue[600]),
    DEFAULT: commonColor.blue[600]
  },
  secondary:{
    ...colorReverse(commonColor.zinc),
    foreground: readableColor(commonColor.zinc[400]),
    DEFAULT: commonColor.zinc[400]
  },
  success:{
    ...colorReverse(commonColor.zinc),
    foreground: readableColor(commonColor.green[500]),
    DEFAULT: commonColor.green[500]
  },
  warning:{
    ...colorReverse(commonColor.zinc),
    foreground: commonColor.white,
    DEFAULT: commonColor.orange[500]
  },
  danger:{
    ...colorReverse(commonColor.red),
    foreground: commonColor.white,
    DEFAULT: commonColor.red[500]
  }
};
export const semanticColor = {
  light,
  dark
};