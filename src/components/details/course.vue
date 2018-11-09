<template>
  <transition name="list">
    <div class="course-body">
      123456
      <back></back>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  export default {
    name: 'course',
    components: {
      back
    }
  }
</script>

<style scoped>
  .course-body{
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    z-index: 99999;
    background: #fff;
  }
</style>
