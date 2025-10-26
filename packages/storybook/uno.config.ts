import { defineConfig, presetWind4 } from 'unocss';
import { miraiuiPreset } from '@miraiui-org/theme';

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    miraiuiPreset({}),
  ],
});
