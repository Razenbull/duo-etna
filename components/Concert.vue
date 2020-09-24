<template>
  <div class="concert container mx-auto px-5 md:px-0 flex flex-col md:flex-row items-center py-8 border-gray-300 border-solid border-b-2 first:mt-6">
    
    <!-- date from -->
    <div class="w-full md:w-1/6">
      <p class="font-medium">
        <!-- month -->
        <span class="text-3xl">{{ $moment(concert.from).format('MMM') }}</span>
        <!-- year -->
        <span class="text-sm ml-2">{{ $moment(concert.from).format('YYYY') }}</span>
      </p>
    </div>

    <!-- date to -->
    <div class="w-full md:w-1/6 relative">

      <div class="arrow-right" v-if="concert.to"></div>


      <p class="font-medium" v-if="concert.to">
        <!-- month -->
        <span class="text-3xl">{{ $moment(concert.to).format('MMM') }}</span>
        <!-- year -->
        <span class="text-sm ml-2">{{ $moment(concert.to).format('YYYY') }}</span>
      </p>
    </div>

    <div class="md:ml-12 pr-6">
      <h3 class="text-3xl">{{ concert.place }}</h3>
      <div v-html="concert.description" class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    concert: Object,
  },
};
</script>

<style>
  .line-height-1 {
    line-height: 1;
  }
</style>