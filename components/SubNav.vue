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

<style lang="scss">
$blue: #00F9D7;
$green: #5DFF81;
$gradient: 60deg, $green, $blue;
$sub-nav-height: 50px;

.scrollactive-item {
    &.is-active {
        position: relative;

        .border--active {
            position: absolute;
            top: 100%;
            left: 0;
            display: block;
            width: 100%;
            height: 3px;
            margin-top: 5px;
            background: linear-gradient($gradient);
        }
    }
}

@media (min-width: 768px) {
    .sub-nav {
        height: $sub-nav-height;
    
        li {
            line-height: $sub-nav-height;
        }
    }
}
</style>