<template>
  <section
    class="relative w-full overflow-hidden bg-center bg-no-repeat bg-cover bg-section bg-section--full"
    :style="`background-image: url(${background}`"
  >
    <!-- black filter -->
    <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

    <!-- Main content -->
    <div
      class="container absolute z-20 md:grid md:grid-cols-2 top-center left-center"
    >
      <!-- Left part with text -->
      <div class="mx-auto text-center md:mx-0 md:text-left">
        <!-- Title -->
        <h1
          class="max-w-sm mx-auto text-6xl font-extrabold leading-tight text-gradient md:mx-0"
        >
          {{ title }}
        </h1>

        <!-- Text -->
        <p class="max-w-md mx-auto mt-8 text-white md:mx-0">{{ intro }}</p>

        <!-- Call to action -->
        <nuxt-link
          to="/about"
          class="hidden px-6 py-3 mt-8 font-bold uppercase border-2 rounded md:inline-block border-green text-green"
        >
          Learn more
        </nuxt-link>
      </div>

      <!-- Right part with button -->
      <div class="relative">
        <!-- Position button on the right -->
        <div class="btn-play-position">
          <!-- Button -->
          <div class="border-2 btn btn-play" @click="playFullScreen"></div>
        </div>
      </div>
    </div>

    <video-player :options="videoOptions" ref="videoPlayer" />
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';
import { initApi, generatePageData } from '@/prismic.config';
import MainNav from '@/components/MainNav.vue';
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
  head: {
    title:
      'Duo Etna | Musiciennes créatives et originales | Musique classique, musique contemporaine, répétitive ou moderne.',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Découvrez Duo Etna deux musiciennes créatives et en perpétuelle recherche de nouveauté et d’originalité, Marie Havaux, pianiste et Camille Fisette, violoniste. Ces deux artistes apprécient s’associer à d’autres artistes, mélanger les arts et les savoir et s’enrichir de tout ce qui les entoure.',
      },
    ],
    script: [
      {
        src: 'https://vjs.zencdn.net/7.8.4/video.js',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://vjs.zencdn.net/7.8.4/video-js.css',
      },
    ],
  },
  components: {
    MainNav,
    VideoPlayer,
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('homepage', context.payload.data);
    } else {
      return initApi().then((api) => {
        return api
          .query(Prismic.Predicates.at('document.type', 'homepage'))
          .then((response) => {
            return generatePageData('homepage', response.results[0].data);
          });
      });
    }
  },
  methods: {
    playFullScreen() {
      this.$refs.videoPlayer.onPlayerPlay();
    },
  },
};
</script>

<style lang="scss">
.bg-section--full {
  .video-js {
    width: 100vw;
    height: 100vh;
    opacity: 0;
    position: relative;
    transition: opacity 1s ease-in-out;

    &.vjs-playing {
      @apply z-30;
      opacity: 1;
    }
  }
}
</style>
