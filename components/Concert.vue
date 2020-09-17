<template>
  <div class="concert container mx-auto px-5 md:px-0 flex flex-col md:flex-row items-center py-8 border-gray-300 border-solid border-b-2 first:mt-6">
    
    <!-- date -->
    <div class="w-full md:w-1/3">
      <!-- day of the week -->
      <!-- <p class="text-sm -mb-1">{{ $moment(concert.date).format('dddd') }}</p> -->
      <p class="text-sm -mb-1">{{ $moment(concert.date).format('HH:mm') }}</p>
      <p class="font-medium">
          <!-- day of month and short month -->
          <span class="text-3xl">{{ $moment(concert.date).format('DD MMM') }}</span>
          <!-- year -->
          <span class="text-sm ml-2">{{ $moment(concert.date).format('YYYY') }}</span>
        </p>
    </div>

    <div class="md:ml-20 pr-6">
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