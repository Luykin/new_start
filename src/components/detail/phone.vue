<template>
  <transition name="list">
      <div class="detail-body">
        <back></back>
      </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  export default {
    name: 'phone',
    components: {
      back
    }
  }
</script>

<style scoped>

</style>
