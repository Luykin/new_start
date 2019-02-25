<template>
  <transition name="pop">
    <div class="pop-body" @click.self="$router.back(-1)">
      <div class="task-info" @click.stop="">
        <img src="https://cdn.xingkwh.com/%E5%85%B3%E6%B3%A8%E5%85%AC%E4%BC%97%E5%8F%B7dsa.png"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'

  export default {
    components: {
      back
    }
  }
</script>

<style scoped>
  .pop-body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, .65);
    overflow: hidden;
    z-index: 9999;
  }

  .task-info {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    padding: 0;
    background: none;
    overflow: hidden;
  }

  .task-info img {
    display: block;
    width: 100%;
    margin: 0 auto;
    user-select: text;
  }

</style>
