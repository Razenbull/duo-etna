<template>
  <nav class="sub-nav sticky top-0 bg-white z-10">
    <ul class="flex flex-col md:flex-row md:justify-between container mx-auto">
      <li v-for="item in items" :key="item.title" class="px-4 font-bold capitalize cursor-pointer my-3 md:my-0"  >
        <span v-bind:data-target="item.link" @click="handleClick">{{ item.title }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    items: Array
  },
  methods: {
    handleScroll() {
      let listElements = document.querySelectorAll('.sub-nav li span');

      // loop through list
      listElements.forEach(function(element) {
        let attrTarget = element.getAttribute('data-target');
        let target = document.getElementById(attrTarget);
        let zoneActive = target.offsetHeight;

        if (target.getBoundingClientRect().top > -500 && target.getBoundingClientRect().top < -500 + zoneActive) {
          
          // remove active from all elements
          listElements.forEach(element => element.classList.remove('active'));

          // add active to current element
          element.classList.add('active');
        } else {

          // remove active when element is out of window
          element.classList.remove('active');
        }
      });
    },
    handleClick(e) {
        // scroll window
        let attrTarget = e.target.getAttribute('data-target');
        let target = document.getElementById(attrTarget);
        window.scroll(0, target.offsetTop);
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
</style>