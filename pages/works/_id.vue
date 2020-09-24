<template>
  <div>
    
    <!-- Section background -->
    <section class="relative z-0 overflow-hidden w-full bg-section bg-cover bg-no-repeat bg-center" :style="`background-image: url(${background}`">

        <!-- black filter -->
        <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

        <!-- Main content -->
        <div class="container absolute z-20 top-center left-center">

            <!-- Left part with text -->
            <div class="mx-auto md:mx-0 text-center md:text-left">

                <!-- Title -->
                <h1 class="text-6xl font-extrabold max-w-sm leading-tight text-blue-400 mx-auto md:mx-0 text-gradient mb-5">{{ project }}</h1>

                <SocialList class="mt-3"/>

            </div>
        </div>

    </section>

    <!-- main content collab -->
    <div class="container mx-auto px-5 md:px-0" v-if="collabWith">
        <h2 class="text-3xl mt-24 mb-8">{{ collabWith }}</h2>
        <img :src="image.url" :alt="image.alt" class="max-w-full md:max-w-sm mb-8 mr-8 float-left">
        <div v-html="project_description" class="content float-none"></div>
        <div v-html="artiste_description" class="content"></div>
    </div>

    <!-- main content video -->
    <div class="container mx-auto px-5 md:px-0 mt-12 overflow-hidden" v-if="videoOptions.sources[0].src">
        <div class="relative">
          <img :src="videoOptions.poster" class="w-1/2 mx-auto mb-8">
          <div class="btn btn-play border-2" @click="playFullScreen"></div>
        </div>
        <video-player :options="videoOptions" ref="videoPlayer"/>
    </div>

  </div>
</template>

<script>
import Prismic from "prismic-javascript"
import { initApi, generatePageData } from "@/prismic.config"
import SocialList from "@/components/SocialList.vue"
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
    SocialList,
    VideoPlayer
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData("works/:id", context.payload.data);
    } else {
      return initApi().then((api) => {
        return api
          .query(Prismic.Predicates.at("document.id", context.route.params.id))
          .then((response) => {
            return generatePageData("works/:id", response.results[0].data);
          });
      });
    }
  },
  methods: {
    playFullScreen() {     
      this.$refs.videoPlayer.onPlayerPlay();
    }
  },
};
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
      @apply fixed;
      @apply w-full;
      @apply h-full;
      top: 0;
      left: 0;
      opacity: 1;
    }
  }

  .btn-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>