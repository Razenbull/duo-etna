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

    <!-- main content -->
    <div class="container mx-auto px-5 md:px-0">
        <h2 class="text-3xl mt-24 mb-8">{{ collabWith }}</h2>
        <img :src="image.url" :alt="image.alt" class="max-w-full md:max-w-sm mb-8 mr-8 float-left">
        <div v-html="project_description" class="content float-none"></div>
        <div v-html="artiste_description" class="content"></div>
    </div>

  </div>
</template>

<script>
import Prismic from "prismic-javascript";
import { initApi, generatePageData } from "@/prismic.config";
import SocialList from "@/components/SocialList.vue";

export default {
  components: {
    SocialList,
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
};
</script>

<style>
</style>