<template>
  <div>
    <!-- Section background -->
    <!-- add later when content is ready -->
    <!-- bg-section--with-nav -->
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
    <SubNav v-bind:items="sections" rootPath="/works" />

    <!-- Page content -->
    <div class="container mx-auto section-container">
      <!-- collaborations -->
      <div :id="'collaborations'" class="my-20">
        <h2 class="px-12 pb-6 text-4xl font-extrabold lg:px-0">
          Collaborations
        </h2>
        <div class="grid justify-between grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Work
            v-for="(work, index) in collaborations"
            v-bind:work="work"
            :key="`${work.name}_${index}`"
          />
        </div>
      </div>

      <!-- videos -->
      <div :id="'videos'" class="my-20">
        <h2 class="px-12 pb-6 text-4xl font-extrabold text-center lg:px-0 lg:text-left">
          Videos
        </h2>
        <div class="grid justify-between grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <WorkVideo
            v-for="(video, index) in videos"
            v-bind:video="video"
            :key="`${video.title}_${index}`"
          />
        </div>
      </div>

      <!-- repertory -->
      <div :id="'repertory'" class="my-20">
        <h2 class="px-12 pb-6 text-4xl font-extrabold text-center lg:px-0 lg:text-left">
          Repertory
        </h2>
        <div class="grid justify-between grid-cols-1 gap-16 sm:grid-cols-2">
          <div
            v-for="(work, i) in repertory[0].categories"
            :key="`work_repertory_${i}`"
            class="content"
          >
            <div v-html="work"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Prismic from 'prismic-javascript';
  import { initApi, generatePageData } from '@/prismic.config';
  import SocialList from '@/components/SocialList.vue';
  import SubNav from '@/components/SubNav.vue';
  import Work from '@/components/Work.vue';
  import WorkVideo from '@/components/WorkVideo.vue';

  export default {
    head: {
      title: 'Duo Etna | Projets, collaborations et vidéos',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Liste descriptive des projets réalisés seuls ou en collaboration par Duo Etna.',
        },
      ],
    },
    components: {
      SocialList,
      SubNav,
      Work,
      WorkVideo,
    },
    asyncData(context) {
      if (context.payload) {
        return generatePageData('workspage', context.payload.data);
      } else {
        return initApi().then(api => {
          return api
            .query(Prismic.Predicates.any('document.type', ['workspage', 'work', 'video']))
            .then(response => {
              return generatePageData('workspage', response.results);
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
