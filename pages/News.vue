<template>
  <div>
    <!-- Section background -->
    <section
      class="relative z-0 w-full overflow-hidden bg-center bg-no-repeat bg-cover bg-section bg-section--with-nav"
      :style="`background-image: url(${headerBackground}`"
    >
      <!-- black filter -->
      <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

      <!-- Main content -->
      <div class="container absolute z-20 top-center left-center">
        <!-- Left part with text -->
        <div class="mx-auto text-center md:mx-0 md:text-left">
          <!-- Title -->
          <h1
            class="max-w-sm mx-auto mb-5 text-6xl font-extrabold leading-tight text-blue-400 md:mx-0 text-gradient"
          >
            {{ title }}
          </h1>

          <!-- Social list -->
          <SocialList />
        </div>
      </div>
    </section>

    <div class="container px-5 pb-24 mx-auto news-container md:px-0">
      <div
        class="pb-20 border-4 border-t-0 border-l-0 border-r-0 border-gray-200 news last:border-0"
        v-for="newsItem in news"
        :key="newsItem.title"
      >
        <h2 class="mt-24 mb-12 text-5xl font-extrabold">
          {{ newsItem.title }}
        </h2>
        <div v-html="newsItem.content" class="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import { initApi, generatePageData } from '@/prismic.config';
import SocialList from '@/components/SocialList.vue';

export default {
  head: {
    title: 'Duo Etna | News, collaborations.',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Partager la richesse artistique autour de récitals ou découvrir les dernières news et collaborations de Duo Etna.',
      },
    ],
  },
  components: {
    SocialList,
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('newspage', context.payload.data);
    } else {
      return initApi().then((api) => {
        return api
          .query(Prismic.Predicates.any('document.type', ['newspage', 'news']))
          .then((response) => {
            return generatePageData('newspage', response.results);
          });
      });
    }
  },
  data() {
    return {
      headerBackground: '',
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      if (this.backgroundMobile && window.innerWidth < 764) {
        this.headerBackground = this.backgroundMobile;
      } else {
        this.headerBackground = this.background;
      }
    },
  },
};
</script>
