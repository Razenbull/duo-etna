<template>
  <div class="work video">
    <!-- Section background -->
    <section
      class="relative z-0 w-full overflow-hidden bg-center bg-no-repeat bg-cover bg-section"
      :style="`background-image: url(${background}`"
    >
      <!-- black filter -->
      <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

      <!-- Main content -->
      <div class="container absolute z-20 top-center left-center">
        <!-- Left part with text -->
        <div class="mx-auto text-center md:mx-0 md:text-left">
          <!-- Title -->
          <h1
            class="max-w-md mx-auto mb-5 text-6xl font-extrabold leading-tight text-blue-400 md:mx-0 text-gradient"
          >
            {{ title }}
          </h1>

          <SocialList class="mt-3" />
        </div>
      </div>
    </section>

    <!-- main content video -->
    <div class="container px-5 py-24 mx-auto mt-12 md:px-0">
      <div v-for="video in videos" :key="video" class="mt-32 prose first:mt-0 max-w-none">
        <h3 v-if="video.title">{{video.title}}</h3>
        <p v-if="video.description">{{video.description}}</p>
        <iframe
          :src="video.video"
          title="vimeo-player"
          :width="videoWidth"
          :height="videoHeight"
          frameborder="0"
          allowfullscreen
          class="mx-auto mt-12 first:mt-0"
        ></iframe>
        <p v-if="video.caption" class="text-right">{{video.caption}}</p>
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
      title: 'Duo Etna | Détail Projet',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Détail, déscription, vidéo et images accompagnant un projet réalisé par Duo Etna seul ou en collaboration.',
        },
      ],
    },
    components: {
      SocialList,
    },
    data() {
      return {
        videoWidth: 1280,
        videoHeight: 654,
      };
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    asyncData(context) {
      if (context.payload) {
        return generatePageData('videos/:id', context.payload.data);
      } else {
        return initApi().then(api => {
          return api
            .query(Prismic.Predicates.at('document.id', context.route.params.id))
            .then(response => {
              console.log(response.results[0].data);
              return generatePageData('videos/:id', response.results[0].data);
            });
        });
      }
    },
    methods: {
      handleResize() {
        let dif = 50;
        if (window.innerWidth > 1080) return;
        if (window.width > 764) dif = 150;
        this.videoWidth = window.innerWidth - dif;
        this.videoHeight = Math.round(this.videoWidth / 1.957);
      },
    },
  };
</script>
