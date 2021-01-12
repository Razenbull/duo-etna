<template>
  <div>
    <!-- Section background -->
    <section
      class="relative z-0 w-full overflow-hidden bg-center bg-no-repeat bg-cover bg-section bg-section--with-nav"
      :style="`background-image: url(${headerBackground})`"
    >
      <!-- black filter -->
      <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

      <!-- Main content -->
      <div class="container absolute z-20 top-center left-center">
        <!-- Left part with text -->
        <div class="mx-auto text-center md:mx-0 md:text-left">
          <!-- Title -->
          <h1
            class="max-w-sm mx-auto mb-5 text-6xl font-extrabold leading-tight md:mx-0 text-gradient"
          >
            {{ title }}
          </h1>

          <!-- Social list -->
          <SocialList />
        </div>
      </div>
    </section>

    <div class="concert-list">
      <Concert v-for="concert in concerts" :concert="concert" :key="concert.name" />
    </div>
  </div>
</template>

<script>
  import Prismic from 'prismic-javascript';
  import { initApi, generatePageData } from '@/prismic.config';
  import SocialList from '@/components/SocialList.vue';
  import Concert from '@/components/Concert.vue';
  export default {
    head: {
      title: 'Duo Etna | Agenda',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Liste des concerts passés et à venir.',
        },
      ],
    },
    components: {
      SocialList,
      Concert,
    },
    asyncData(context) {
      if (context.payload) {
        return generatePageData('concertspage', context.payload.data);
      } else {
        return initApi().then(api => {
          return api
            .query(Prismic.Predicates.any('document.type', ['concertspage', 'concert']), {
              orderings: '[concert.from desc]',
            })
            .then(response => {
              return generatePageData('concertspage', response.results);
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
