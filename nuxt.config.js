const Prismic = require('prismic-javascript');
import { initApi } from './prismic.config';

export default {
  mode: 'universal',

  /**
   * Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'fr',
    },
    title: 'Duo Etna | Musiciennes créatives et originales | Musique classique, musique contemporaine, répétitive ou moderne.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Découvrez Duo Etna deux musiciennes créatives et en perpétuelle recherche de nouveauté et d’originalité, Marie Havaux, pianiste et Camille Fisette, violoniste. Ces deux artistes apprécient s’associer à d’autres artistes, mélanger les arts et les savoir et s’enrichir de tout ce qui les entoure.' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-scrollactive'
  ],

  /**
   * Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',

    // https://github.com/nuxt-community/moment-module#readme
    '@nuxtjs/moment',
  ],

  /**
   * Moment
   * https://momentjs.com/docs/
   */
  moment: {
    defaultLocale: 'en',
    locales: ['fr'],
  },

  /**
   * Tailwind
   * https://tailwindcss.com/docs/installation
   */
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss',
  },

  /**
   * Nuxt.js modules
   */
  modules: [
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
        ],
      },
    ],
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  /**
   * Fetch content for each route
   */
  generate: {
    routes: function() {
      // Fetch content for the homepage
      const homepage = initApi().then((api) => {
        return api
          .query(Prismic.Predicates.at('document.type', 'homepage'))
          .then((response) => {
            return response.results.map((payload) => ({ route: '/', payload }));
          });
      });

      // Fetch content for about page
      const aboutPage = initApi().then((api) => {
        return api
          .query(Prismic.Predicates.at('document.type', 'aboutpage'))
          .then((response) => {
            return response.results.map((payload) => ({ route: '/', payload }));
          });
      });

      // Fetch content for concerts page
      const concertsPage = initApi().then((api) => {
        return api
          .query(
            Prismic.Predicates.any('document.type', ['concertspage', 'concert'])
          )
          .then((response) => {
            return response.results.map((payload) => ({ route: '/', payload }));
          });
      });

      // Fetch content for works page
      const worksPage = initApi().then((api) => {
        return api
          .query(Prismic.Predicates.at('document.type', 'workspage'))
          .then((response) => {
            return response.results.map((payload) => ({ route: '/', payload }));
          });
      });

      // Here I return an array of the results of each promise using the spread operator.
      // It will be passed to each page as the `payload` property of the `context` object,
      // which is used to generate the markup of the page.
      return Promise.all([
        homepage,
        aboutPage,
        concertsPage,
        worksPage,
      ]).then((values) => [...values[0]]);
    },
  },
};
