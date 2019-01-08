<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info">
        <img src="https://cdn.xingkwh.com/%E6%8A%96%E4%B8%AA%E8%B5%9E%E5%AE%98%E6%96%B9%E7%BE%A4@3x.png"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'

  export default {
    name: 'group',
    components: {
      back
    }
  }
</script>

<style scoped>
  .task-info {
    padding: 0;
    background: none;
  }

  .task-info img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

</style>
