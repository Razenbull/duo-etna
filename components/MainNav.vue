<template>
  <nav class="main-nav container flex items-center justify-between flex-wrap absolute absolute-x-center p-6 lg:px-0 z-30 w-full">

    <!-- logo -->
    <nuxt-link to="/">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <svg aria-hidden="true" 
          focusable="false"
          data-prefix="fas"
          data-icon="angle-double-up"
          class="svg-inline--fa fa-angle-double-up fa-w-10 fa-lg mr-3"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path fill="currentColor" d="M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"></path>
        </svg>
        <span class="font-semibold text-2xl tracking-tight">Duo Etna</span>
      </div>
    </nuxt-link>

    <!-- burger -->
    <div class="block lg:hidden">
      <button class="flex items-center text-white border-white focus:text-gray-300 focus:outline-none hover:text-gray-300" @click="toggleCollapse">
        <svg aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="bars"
          class="svg-inline--fa fa-bars fa-w-14 fa-2x"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
        </svg>
      </button>
    </div>

    <!-- menu -->
    <ul class="w-full hidden flex-grow lg:flex lg:w-auto text-sm justify-end navigation" ref="collapsibleMenu">
      <li class="px-4 pt-8 lg:pt-2 py-2 font-bold text-white"><nuxt-link to="/news">News<span class="border--active"></span></nuxt-link></li>
      <li class="px-4 py-2 font-bold text-white"><nuxt-link to="/about">About<span class="border--active"></span></nuxt-link></li>
      <li class="px-4 py-2 font-bold text-white"><nuxt-link to="/works">Works<span class="border--active"></span></nuxt-link></li>
      <li class="px-4 py-2 font-bold text-white"><nuxt-link to="/concerts">Concerts<span class="border--active"></span></nuxt-link></li>
      <li class="px-4 lg:pr-0 py-2 font-bold text-white"><nuxt-link to="/contact">Contact<span class="border--active"></span></nuxt-link></li>
    </ul>
  </nav>

  
</template>

<script>
import Router from 'vue-router';

export default {
  methods: {
    toggleCollapse() {
      const collapsibleMenu = this.$refs.collapsibleMenu;
      collapsibleMenu.classList.toggle('block');
      collapsibleMenu.classList.toggle('hidden');
    }
  }
}
</script>

<style>
</style>