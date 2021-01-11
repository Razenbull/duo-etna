<template>
  <nuxt-link :to="{ name: 'works-id', params: { id: work.id }}">
    <div class="max-w-sm mx-auto overflow-hidden">
      <img :src="work.image" :alt="work.name" class="object-cover w-full h-64" />
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold">{{work.name}}</div>
        <p class="text-base text-gray-700">{{work.with}}</p>
        <p class="text-base text-gray-700" v-if="work.isVideo">{{work.description}}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      work: Object,
    },
  };
</script>

<style></style>
