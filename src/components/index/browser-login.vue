<template>
  <transition name="list">
    <div class="detail-body">
      <!--请从微信扫码打开-->
      <div class="task-info flex">
        请从微信扫码后通过登录器登录
      </div>
      <div class="task-info flex">
        公告: 抖个赞开始外部浏览器内测啦~
      </div>
      <!--<div class="task-btn flex gre-btn" @click="_getCode">-->
        <!--获取我的二维码-->
      <!--</div>-->
      <poster ref="poster"></poster>
    </div>
  </transition>
</template>

<script>
  import poster from 'components/poster/poster'
  export default {
    name: 'browser-login',
    methods: {
      _getCode() {
        this.$refs.poster._showqr()
      },
    },
    components: {
      poster
    }
  }
</script>

<style scoped>
  .task-info{
    color: #999;
    align-content: center;
    align-items: center;
  }
  .gre-btn{
    background: #F74BCA;
  }
</style>
