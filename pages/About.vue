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

    <!-- Page secondary navigation -->
    <SubNav v-bind:items="aboutSections" rootPath="/about" />

    <!-- Page content -->
    <div class="section-container">
      <!-- Loop through about sections and change alignment for each repetition -->
      <div
        :id="section.link"
        v-for="(section, index) in aboutSections"
        :key="section.title"
        class="container mx-auto my-20"
      >
        <!-- image with title -->
        <div :class="index % 2 === 0 ? 'order-1' : 'order-2'" class="relative">
          <h2
            class="absolute px-12 text-4xl font-extrabold section-title lg:px-0"
          >
            {{ section.title }}
          </h2>
          <img
            :src="section.image"
            alt=""
            :class="
              index % 2 === 0
                ? 'lg:float-left lg:pr-12 lg:pl-0'
                : 'lg:float-right lg:pl-12 lg:pr-0'
            "
            class="w-full px-12 pb-12 lg:w-1/2"
          />
        </div>

        <!-- rich text -->
        <div
          :class="index % 2 === 0 ? 'order-2' : 'order-1'"
          class="px-4 mt-10 md:mt-0 rich-text lg:px-0"
          v-html="section.text"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import { initApi, generatePageData } from '@/prismic.config';
import SocialList from '@/components/SocialList.vue';
import SubNav from '@/components/SubNav.vue';

export default {
  head: {
    title: 'Duo Etna | A propos du duo',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Parcours de individuel Marie Havaux et Camille Fisette. Description de leur rencontre et formation du Duo Etna.',
      },
    ],
  },
  components: {
    SocialList,
    SubNav,
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('aboutpage', context.payload.data);
    } else {
      return initApi().then((api) => {
        return api
          .query(Prismic.Predicates.at('document.type', 'aboutpage'))
          .then((response) => {
            return generatePageData('aboutpage', response.results[0].data);
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
