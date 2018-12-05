<template>
  <transition name="list">
    <div class="body">
      <img src="https://cdn.xingkwh.com/%E5%85%A5%E5%8F%A3%E6%95%99%E7%A8%8B@3x.png"/>
      <back></back>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  export default {
    name: 'entrance',
    components: {
      back
    }
  }
</script>

<style scoped>
  .body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background: #31293D;
    background: linear-gradient(45deg, #253250, #34283A);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#34283A));
    overflow-y: scroll;
  }
  .body img{
    width: 100%;
    height: auto;
  }
</style>
