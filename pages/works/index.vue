<template>
  <div>
    <!-- Section background -->
    <!-- add later when content is ready -->
    <!-- bg-section--with-nav -->
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

    <!-- Page secondary navigation -->
    <SubNav v-bind:items="sections" rootPath="/works" />

    <!-- Page content -->
    <div class="section-container container mx-auto">

      <!-- collaborations -->
      <div :id="'collaborations'" class="my-20">
        <h2 class="text-4xl font-extrabold px-12 lg:px-0 pb-6">Collaborations</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-between">
          <Work v-for="(work, index) in collaborations" v-bind:work="work" :key="`${work.name}_${index}`" />
        </div>
      </div>

      <!-- videos -->
      <div :id="'videos'" class="my-20">
        <h2 class="text-4xl font-extrabold px-12 lg:px-0 pb-6 text-center lg:text-left">Videos</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-between">
          <Work v-for="(work, index) in videos" v-bind:work="work" :key="`${work.name}_${index}`" />
        </div>
      </div>

      <!-- repertory -->
      <div :id="'repertory'" class="my-20">
        <h2 class="text-4xl font-extrabold px-12 lg:px-0 pb-6 text-center lg:text-left">Repertory</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-16 justify-between">
          <div v-for="(work, i) in repertory[0].categories" :key="`work_repertory_${i}`" class="content">
            <div v-html="work"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic.config'
import SocialList from '@/components/SocialList.vue'
import SubNav from '@/components/SubNav.vue'
import Work from '@/components/Work.vue'

export default {
  head: {
    title: 'Duo Etna | Projets, collaborations et vidéos',
    meta: [
      { hid: 'description', name: 'description', content: 'Liste descriptive des projets réalisés seuls ou en collaboration par Duo Etna.' },
    ],
  },
  components: {
    SocialList,
    SubNav,
    Work
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('workspage', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.any('document.type', ['workspage', 'work']))
          .then(response => {
            return generatePageData('workspage', response.results)
          })
      })
    }
  }
};
</script>

<style>
</style>