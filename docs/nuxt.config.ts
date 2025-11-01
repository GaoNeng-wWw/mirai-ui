import tw from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxt/content'],
  vite: {
    plugins: [
      tw(),
    ],
  },
  content:{
    experimental: { sqliteConnector: 'native' }
  }
});
