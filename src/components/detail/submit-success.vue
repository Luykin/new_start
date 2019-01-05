<template>
  <transition name="list">
    <div class="detail-body">
      <back :path="'./index'"></back>
      <div class="main-box">
        <div class="success"></div>
        <div class="success-info">
          <span class="flex">您已成功提交任务完成信息!</span>
          待悬赏发起人24小时内审核通过后，任务赏金将打入您的收益内！
        </div>
        <div class="task-btn flex line-back">查看任务情况</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'

  export default {
    created() {
      // console.log(this.$route.query)
    },
    components: {
      back
    }
  }
</script>

<style scoped>
  .main-box {
    width: 96%;
    min-height: 300px;
    height: auto;
    margin: 20px auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
  }

  .success {
    width: 100%;
    height: 125px;
    background: url("https://cdn.xingkwh.com/ok2.png") no-repeat;
    background-size: 100% auto;
  }

  .success-info {
    width: 86%;
    padding: 3%;
    height: auto;
    min-height: 230px;
    background: #f8f8f8;
    border-radius: 8px;
    overflow: hidden;
    margin: 15px auto;
    line-height: 20px;
  }

  .success-info span {
    color: #B53FE2;
    margin: 20px auto;
    font-weight: 600;
  }

  .success-info-item {
    background: #fff;
    width: 96%;
    height: 45px;
    margin: 8px auto;
    border-radius: 8px;
  }

  .sii-left {
    width: 40%;
    height: 100%;
    color: #999;
    text-indent: 10px;
  }

  .sii-right {
    width: 60%;
    height: 100%;
    color: #333;
    text-indent: 20px;
  }
</style>
