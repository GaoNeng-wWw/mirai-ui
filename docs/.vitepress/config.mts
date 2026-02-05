import { DefaultTheme, defineConfig } from 'vitepress';
import { readdirSync } from 'fs';
import { join } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { blockPlugin } from './plugins/demo-block';

function generateSideBar() {
  const hasMarkdownFile = (files: string[]) => files.some(file => file.includes('.md'));
  const root = process.cwd();
  const sideBars: DefaultTheme.SidebarItem[] = [];
  const components = readdirSync(join(root, 'components'));
  for (const comp of components) {
    const compPath = join(root, 'components', comp);
    const files = readdirSync(compPath);
    const shouldDrop = !(files.length > 0 && hasMarkdownFile(files));
    if (shouldDrop) {
      console.warn(`${comp} not have markdown file`);
      continue;
    }
    sideBars.push({
      text: `${comp[0].toUpperCase()}${comp.slice(1)}`,
      link: `/components/${comp}/`,
    });
  }
  return sideBars;
}

function generateComponentAlias() {
  const base = join(__dirname, '../../packages/components');
  const components = readdirSync(base);
  const obj = {};
  for (const comp of components) {
    obj[`@miraiui-org/vue-${comp}`] = join(base, comp, 'src/index.ts');
  }
  return obj;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Component',
        link: '/components',
      },
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          ...generateSideBar(),
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  vite: {
    ssr: {
      noExternal: ['@miraiui-org/theme', 'tailwind-variants'],
    },
    server: {
      fs: {
        allow: ['../../'],
      },
    },
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      exclude: [
        '@miraiui-org/theme',
        '@miraiui-org/core',
        '@miraiui-org/components',
      ],
    },
    resolve: {
      alias: {
        '@miraiui-org/theme': join(__dirname, '../../packages/theme/src/index.ts'),
        '@miraiui-org/vue-core': join(__dirname, '../../packages/core/src/index.ts'),
        '@miraiui-org/internal-utils': join(__dirname, '../../packages/utils/internal/src/index.ts'),
        ...generateComponentAlias(),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(
        (instance) => {
          instance.use(blockPlugin, {
            ssr: true,
          });
        },
      );
    },
  },
  head: [
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap',
      },
    ],
  ],
});
