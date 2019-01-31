<template>
  <transition name="pop">
    <div class="pop-body" @click.self="_close">
      <div class="task-info" @click.self="_close">
        <div class="inner-notice" v-html="$root.notice">
          暂无公告
        </div>
        <!--<img src="https://cdn.xingkwh.com/%E5%85%B3%E6%B3%A8%E5%85%AC%E4%BC%97%E5%8F%B72@3x.png"/>-->
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    created() {
      if (!this.$root.notice) {
        this.$router.replace({
          path: '/index'
        })
      }
    },
    methods: {
      _close() {
        this.$root.noticeDown = true
        this.$router.replace({
          path: '/index'
        })
      },
    },
    components: {
    }
  }
</script>

<style scoped>
  .pop-body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, .65);
    overflow: hidden;
    z-index: 9999;
  }

  .task-info {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    max-width: 360px;
    padding: 0;
    background: #F73D64;
    background: linear-gradient(-45deg, #8B2DD6, #F73D64);
    background: -webkit-gradient(linear, right bottom, left top, from(#8B2DD6), to(#F73D64));
    border-radius: 9%;
    min-height: 100px;
    border: 2px solid rgba(173, 26, 106, 0.36);
  }

  .task-info:after{
    width: 136.4%;
    padding-top: 100%;
    content: '';
    position: absolute;
    left: -18.2%;
    top: 0;
    transform: translate(0, -23.8%);
    background: url("https://cdn.xingkwh.com/%E5%BC%B9%E7%AA%97@3x%281%29.png") no-repeat left top;
    background-size: 100% auto;
  }

  .inner-notice{
    width: 85%;
    padding: 3%;
    line-height: 24px;
    background: #FFFCF1;
    min-height: 120px;
    margin: 30% auto 5%;
    border-radius: 6%;
    color: #666;
    font-size: 13px;
  }

  .task-info:before{
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    width: 32px;
    height: 32px;
    transform: translate(-50%, 100%);
    background: url("https://cdn.xingkwh.com/close-.png") no-repeat left top;
    background-size: 100% 100%;
  }

</style>
