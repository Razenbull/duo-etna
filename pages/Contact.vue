<template>
  
   <div class="pb-24">

      <!-- Section background -->
      <section class="relative z-0 overflow-hidden w-full bg-section bg-cover bg-no-repeat bg-center" :style="`background-image: url(${background}`">

        <!-- black filter -->
        <div class="absolute inset-0 z-10 bg-gray-900 opacity-25"></div>

        <!-- Main content -->
        <div class="container absolute z-20 top-center left-center">

            <!-- Left part with text -->
            <div class="mx-auto md:mx-0 text-center md:text-left">

                <!-- Title -->
                <h1 class="text-6xl font-extrabold max-w-sm leading-tight text-blue-400 mx-auto md:mx-0 text-gradient mb-5">{{ title }}</h1>

                <!-- <NewsLetterForm/> -->

                <SocialList class="mt-3"/>

            </div>
        </div>

      </section>

      <!-- Page content -->
      <div class="container mx-auto border-gray-200 pb-20 border-4 border-t-0 border-l-0 border-r-0">
        <h3 class="text-3xl mt-20 text-center uppercase">Concert booking</h3>
        <p class="mt-5 text-center">duoetna@gmail.com</p>
        <p class="mt-5 text-center">+32 (0)498 28 30 14</p>
      </div>

      <div class="container mx-auto">
        <h3 class="text-3xl mt-20 text-center uppercase">Photos et vidéo</h3>
        <p class="mt-5 text-center">Fabian De Backer</p>

        <h3 class="text-3xl mt-20 text-center uppercase">Captation</h3>
        <p class="mt-5 text-center">Piston</p>
      </div>

    </div>

</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic.config'
import SocialList from '@/components/SocialList.vue'
import NewsLetterForm from '@/components/NewsLetterForm.vue'


export default {
  head: {
    title: 'Duo Etna | Contact, Crédits, Booking, Download',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Informations de contact, crédits ou booking. Liens de téléchargement de dossiers presse.' },
    ],
  },
  components: {
    SocialList,
    NewsLetterForm
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('contactpage', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'contactpage'))
          .then(response => {
            return generatePageData('contactpage', response.results[0].data)
          })
      })
    }
  }
}
</script>

<style>

</style>