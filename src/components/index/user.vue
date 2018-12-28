<template>
  <div>
    <div class="header">
      <userheader></userheader>
    </div>
  </div>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  export default {
    name: 'user',
    created() {

    },
    components: {
      userheader
    }
  }
</script>

<style scoped>
.header{
  width: 90%;
  height: 200px;
  margin: 10px auto;
}
</style>
