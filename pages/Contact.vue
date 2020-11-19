<template>
  <div class="pb-24">
    <!-- Section background -->
    <section
      class="relative z-0 w-full overflow-hidden bg-center bg-no-repeat bg-cover bg-section"
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

          <!-- <NewsLetterForm/> -->

          <SocialList class="mt-3" />
        </div>
      </div>
    </section>

    <!-- Page content -->
    <div
      class="container pb-20 mx-auto border-4 border-t-0 border-l-0 border-r-0 border-gray-200"
    >
      <h3 class="mt-20 text-3xl text-center uppercase">Concert booking</h3>
      <p class="mt-5 text-center">duoetna@gmail.com</p>
      <p class="mt-5 text-center">+32 (0)498 28 30 14</p>
    </div>

    <div class="container mx-auto">
      <h3 class="mt-20 text-3xl text-center uppercase">Photos et vidéo</h3>
      <p class="mt-5 text-center">Fabian De Backer</p>

      <h3 class="mt-20 text-3xl text-center uppercase">Captation</h3>
      <p class="mt-5 text-center">Piston</p>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import { initApi, generatePageData } from '@/prismic.config';
import SocialList from '@/components/SocialList.vue';
import NewsLetterForm from '@/components/NewsLetterForm.vue';

export default {
  head: {
    title: 'Duo Etna | Contact, Crédits, Booking, Download',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Informations de contact, crédits ou booking. Liens de téléchargement de dossiers presse.',
      },
    ],
  },
  components: {
    SocialList,
    NewsLetterForm,
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('contactpage', context.payload.data);
    } else {
      return initApi().then((api) => {
        return api
          .query(Prismic.Predicates.at('document.type', 'contactpage'))
          .then((response) => {
            return generatePageData('contactpage', response.results[0].data);
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

<style></style>
