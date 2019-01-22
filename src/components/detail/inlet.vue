<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info">
        <img src="https://cdn.xingkwh.com/%E5%BE%AE%E4%BF%A1%E7%BB%91%E5%AE%9A%E6%B5%81%E7%A8%8B%E5%9B%BE@3x%281%29.png"/>
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
  .task-info {
    padding: 0;
    background: none;
    overflow: hidden;
  }

  .task-info img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

</style>
