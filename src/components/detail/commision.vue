<template>
  <transition name="list">
    <div>
      <back></back>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="task-info">
        <div class="task-color-title flex">我的团队</div>
      </div>
      <div class="task-info">
        <div class="task-color-title flex">收益明细</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  import back from 'base/back/back'
  export default {
    name: 'commision',
    created() {

    },
    components: {
      back,
      userheader
    }
  }
</script>

<style scoped>
  .header {
    width: 92%;
    height: 170px;
    margin: 10px auto 20px;
  }
</style>
