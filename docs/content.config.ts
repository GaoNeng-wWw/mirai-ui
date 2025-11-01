import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    components: defineCollection({
      type: 'page',
      source: 'content/components/**/*.md',
    }),
  },
});
