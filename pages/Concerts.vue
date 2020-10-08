<template>
  <div>
    <!-- Section background -->
    <section
      class="relative z-0 overflow-hidden w-full bg-section bg-section--with-nav bg-cover bg-no-repeat bg-center"
      :style="`background-image: url(${background})`"
    >
      <!-- black filter -->
      <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

      <!-- Main content -->
      <div class="container absolute z-20 top-center left-center">
        <!-- Left part with text -->
        <div class="mx-auto md:mx-0 text-center md:text-left">
          <!-- Title -->
          <h1
            class="text-6xl font-extrabold max-w-sm leading-tight mx-auto md:mx-0 text-gradient mb-5"
          >{{ title }}</h1>

          <!-- Social list -->
          <SocialList />
        </div>
      </div>
    </section>

    <div class="concert-list">
      <Concert v-for="concert in concerts" :concert="concert" :key="concert.name"/>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic.config'
import SocialList from "@/components/SocialList.vue";
import Concert from "@/components/Concert.vue";
export default {
  head: {
    title: 'Duo Etna | Agenda',
    meta: [
      { hid: 'description', name: 'description', content: 'Liste des concerts passés et à venir.' },
    ],
  },
  components: {
    SocialList,
    Concert,
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('concertspage', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.any('document.type', ['concertspage', 'concert']))
          .then(response => {
            return generatePageData('concertspage', response.results)
          })
      })
    }
  }
};
</script>

<style>
</style>