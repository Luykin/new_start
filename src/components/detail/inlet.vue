<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info">
        <img src="https://cdn.xingkwh.com/%E5%85%B3%E6%B3%A8%E5%85%AC%E4%BC%97%E5%8F%B7@3x.png"/>
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
    position: fixed;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 78%;
    /*margin-top: 50px;*/
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
