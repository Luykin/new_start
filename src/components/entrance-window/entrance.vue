<template>
  <div class="entrance" @click="$router.push({name: 'entrance'})">
    <img src="https://cdn.xingkwh.com/%E5%85%B3%E6%B3%A8%E5%85%AC%E4%BC%97%E5%8F%B7dsa.png"/>
  </div>
</template>

<script>
  export default {
    name: 'entrance'
  }
</script>

<style scoped>
  .entrance {
    position: fixed;
    z-index: 990;
    bottom: 65px;
    right: 3%;
    width: 75px;
    height: auto;
  }

  .entrance img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
