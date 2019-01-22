<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info">
        <img src="https://cdn.xingkwh.com/7%60_$5ZLM%5D4JIQ%5BZ0%60$~37EP.jpg"/>
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
    border-radius: 18px;
  }

</style>
