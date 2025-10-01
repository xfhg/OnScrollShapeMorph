import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/base.css', 'splitting/dist/splitting.css'],
  app: {
    head: {
      title: 'On-Scroll Shape Morph',
      link: [
        { rel: 'stylesheet', href: 'https://use.typekit.net/eay5gla.css' }
      ],
      htmlAttrs: { lang: 'en', class: 'no-js' }
    }
  }
});
