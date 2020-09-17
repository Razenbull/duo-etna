<template>
  <div>

    <!-- Navigation -->
    <MainNav/>
    
    <!-- Main content -->
    <nuxt/>

  </div>
</template>

<script>
  import MainNav from '@/components/MainNav.vue'

  export default {
    components: {
      MainNav
    }
  }
</script>

<style>
</style>