<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info">
        <div class="task-color-title flex">商务合作</div>
        <!--<div class="s line-font"><span class="blod">合作电话：</span> 13212399922</div>-->
        <div class="s line-font"><span class="blod">微信号：</span> jiamianxk015</div>
        <div class="s line-font">非诚勿扰, 谢谢合作</div>
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
  .task-color-title{
    margin-bottom: 10px;
  }
  .line-font{
    height: 30px;
    user-select: text !important;
  }
  .blod {
    font-weight: 900;
  }
</style>
