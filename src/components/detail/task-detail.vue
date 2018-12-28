<template>
  <transition name="list">
    <div class="detail-body">
      <betterscroll class="wrapper" ref='wrapper'>
        <div class="height10"></div>
        <div class="task-header"></div>
      </betterscroll>
    </div>
  </transition>
</template>

<script>
  import betterscroll from 'base/better-scroll/better-scroll'

  export default {
    name: 'task-detail',
    components: {
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 65px;
    overflow: hidden;
  }

  .task-header {
    width: 96%;
    height: 200px;
    margin: 10px auto;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .1);
  }

  .task-header:after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(112, 21, 253, .5);
    background: linear-gradient(to bottom, rgba(112,21,253, .6) 0, rgba(112,21,253, .6) 30%, rgba(255,255,255,.45) 30.01%, rgba(255,255,255,.45) 100%);
    filter: drop-shadow(0 0 50px rgba(255, 255, 255, 1));
  }
</style>
