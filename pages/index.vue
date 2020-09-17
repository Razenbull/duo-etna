<template>
  <section class="relative overflow-hidden w-full bg-section bg-section--full bg-cover bg-no-repeat bg-center" :style="`background-image: url(${background}`">
    
    <!-- black filter -->
    <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>
        
    <!-- Main content -->
    <div class="container md:grid md:grid-cols-2 absolute z-20 top-center left-center">

        <!-- Left part with text -->
        <div class="mx-auto md:mx-0 text-center md:text-left">

          <!-- Title -->
          <h1 class="text-6xl font-extrabold max-w-sm leading-tight text-gradient mx-auto md:mx-0">{{ title }}</h1>

          <!-- Text -->
          <p class="mt-8 text-white mx-auto md:mx-0 max-w-md">{{ intro }}</p>

          <!-- Call to action -->
          <nuxt-link to="/about" class="hidden md:inline-block mt-8 uppercase font-bold px-6 py-3 border-2 rounded border-green text-green">
            Learn more
          </nuxt-link>

        </div>

        <!-- Right part with button -->
        <div class="relative">

          <!-- Position button on the right -->
          <div class="btn-play-position">

            <!-- Button -->
            <div class="btn btn-play border-2" @click="playFullScreen"></div>

          </div>
        </div>
    </div>
  
    <video-player :options="videoOptions" ref="videoPlayer"/>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic.config'
import MainNav from '@/components/MainNav.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

export default {
  head: {
    script: [
      {
        src: 'https://vjs.zencdn.net/7.8.4/video.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://vjs.zencdn.net/7.8.4/video-js.css'
      }
    ]
  },
  components: {
    MainNav,
    VideoPlayer
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('homepage', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'homepage'))
          .then(response => {
            return generatePageData('homepage', response.results[0].data)
          })
      })
    }
  },
  methods: {
    playFullScreen() {     
      this.$refs.videoPlayer.onPlayerPlay();
    }
  },
}
</script>

<style lang="scss">
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
</style>
