<template>
  <transition name="tips">
    <div class="loading flex">
      正在全力报名中...
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'subJobLoading'
  }
</script>

<style scoped>
  .loading {
    width: 100%;
    height: 50px;
    background: rgba(0, 0, 0, .8);
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 99999999999;
  }

  .tips-enter-active, .tips-leave-active {
    transition: all .3s;
    transform: translate(0, 0);
  }

  .tips-enter, .tips-leave-to {
    transition: all .3s;
    transform: translate(0, -100%);
  }
</style>
