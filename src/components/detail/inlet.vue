<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info">
        <img src="https://cdn.xingkwh.com/%E5%A4%A7%E8%90%A8%E8%BE%BE%E4%BB%8E.png"/>
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
