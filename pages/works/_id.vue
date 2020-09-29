<template>
  <div class="work">
    
    <!-- Section background -->
    <section class="relative z-0 overflow-hidden w-full bg-section bg-cover bg-no-repeat bg-center" :style="`background-image: url(${background}`">

        <!-- black filter -->
        <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

        <!-- Main content -->
        <div class="container absolute z-20 top-center left-center">

            <!-- Left part with text -->
            <div class="mx-auto md:mx-0 text-center md:text-left">

                <!-- Title -->
                <h1 class="text-6xl font-extrabold max-w-md leading-tight text-blue-400 mx-auto md:mx-0 text-gradient mb-5">{{ project }}</h1>

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
    <div class="container mx-auto px-5 md:px-0 py-24 mt-12 overflow-hidden" v-if="videoOptions.sources[0].src">
        <div class="relative">
          <video-player :options="videoOptions" ref="videoPlayer" class="mx-auto"/>
        </div>
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
    play(e) {     
      this.$refs.videoPlayer.onPlayerPlay();
      e.target.classList.add('playing');

      this.$refs.videoPlayer;
    }
  },
};
</script>

<style lang="scss">
  .work {
    .video-js {
      position: relative;
      @apply w-full;
    }

    .video-js .vjs-big-play-button {
      --btn-play-size: 100px;
      --blue: #00F9D7;

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: var(--btn-play-size);
      height: var(--btn-play-size);
      border-radius: 50%;
      border-color: var(--blue);
      overflow: hidden; /* hide a part of triangle that is overflowing */
      cursor: pointer;

      &:after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-15px, -50%);
          width: 80px;
          height: 50px;
          border: solid transparent;
          border-left-width: 40px;
          border-right-width: 40px;
          border-top-width: 25px;
          border-bottom-width: 25px;
          border-left-color: var(--blue);
          content: "";
      }
    }

    .vjs-has-started.vjs-paused .vjs-big-play-button {
      display: block;
    }

    .vjs-icon-placeholder {
      opacity: 0
    }
  }
</style>