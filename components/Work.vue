<template>
    <nuxt-link :to="{ name: 'works-id', params: { id: work.id }}">
      <div class="max-w-sm mx-auto overflow-hidden">
          <img :src="work.image" :alt="work.name" class="object-cover h-64 w-full" />
          <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{{work.name}}</div>
              <p class="text-gray-700 text-base">{{work.with}}</p>
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

<style>
</style>