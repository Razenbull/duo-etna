<template>
  <nuxt-link :to="{ name: 'videos-id', params: { id: video.id }}">
    <div class="max-w-sm mx-auto overflow-hidden">
      <img :src="video.imageThumbnail" :alt="video.title" class="object-cover w-full h-64" />
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold">{{video.title}}</div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      video: Object,
    },
  };
</script>
