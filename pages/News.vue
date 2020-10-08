<template>
  <div>
    <!-- Section background -->
    <section
      class="relative z-0 overflow-hidden w-full bg-section bg-section--with-nav bg-cover bg-no-repeat bg-center"
      :style="`background-image: url(${background}`"
    >
      <!-- black filter -->
      <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

      <!-- Main content -->
      <div class="container absolute z-20 top-center left-center">
        <!-- Left part with text -->
        <div class="mx-auto md:mx-0 text-center md:text-left">
          <!-- Title -->
          <h1
            class="text-6xl font-extrabold max-w-sm leading-tight text-blue-400 mx-auto md:mx-0 text-gradient mb-5"
          >{{ title }}</h1>

          <!-- Social list -->
          <SocialList />
        </div>
      </div>
    </section>

    <div class="news-container container mx-auto px-5 pb-24 md:px-0">

        <div class="news border-gray-200 pb-20 border-4 last:border-0 border-t-0 border-l-0 border-r-0" v-for="newsItem in news" :key="newsItem.title">
            <h2 class="text-5xl font-extrabold mt-24 mb-12">{{newsItem.title}}</h2>
            <div v-html="newsItem.content" class="content"></div>
        </div>

    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic.config'
import SocialList from '@/components/SocialList.vue'

export default {
  head: {
    title: 'Duo Etna | News, collaborations.',
    meta: [
      { hid: 'description', name: 'description', content: 'Partager la richesse artistique autour de récitals ou découvrir les dernières news et collaborations de Duo Etna.' },
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
          .then(response => {
            return generatePageData('newspage', response.results);
          });
      });
    }
  },
};
</script>
