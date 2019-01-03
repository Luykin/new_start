<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <userheader></userheader>
      <div class="task-info">
        <div class="normal-title flex">今日剩余提现次数5次</div>
        <div class="task-btn flex line-back">提现</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import userheader from 'components/userheader/minUserHeader'
  export default {
    name: 'withdrawal',
    components: {
      back,
      userheader
    }
  }
</script>

<style scoped>

</style>
