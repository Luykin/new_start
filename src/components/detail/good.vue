<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <userheader></userheader>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import userheader from 'components/userheader/minUserHeader'
  export default {
    name: 'good',
    components: {
      back,
      userheader
    }
  }
</script>

<style scoped>

</style>
