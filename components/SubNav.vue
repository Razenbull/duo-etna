<template>
  <scrollactive class="sub-nav sticky top-0 bg-white z-10" :offset="300" :duration="300" :scrollOffset="80">
    <ul class="flex flex-col md:flex-row md:justify-between container mx-auto">
      <li v-for="item in items" :key="item.title" class="px-4 font-bold capitalize cursor-pointer my-3 md:my-0"  >
        <a :href="`#${item.link}`" class="scrollactive-item">{{ item.title }}<span class="border--active"></span></a>
      </li>
    </ul>
  </scrollactive>
</template>

<script>
export default {
  props: {
    items: Array
  }
};
</script>