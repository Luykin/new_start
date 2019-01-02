<template>
  <transition name="list">
    <div class="detail-body">
      <back :path="'./index'"></back>
      <div class="main-box">
        <div class="success"></div>
        <div class="success-info">
          <span class="flex">您的任务已发布,任务信息如下</span>
          <div class="flex success-info-item">
            <div class="sii-left flex js">任务标题</div>
            <div class="sii-right flex js">{{$route.query.reward_title|| ''}}</div>
          </div>
          <div class="flex success-info-item">
            <div class="sii-left flex js">作品链接</div>
            <div class="sii-right flex js ell">{{$route.query.works_link|| ''}}</div>
          </div>
          <div class="flex success-info-item">
            <div class="sii-left flex js">任务数量</div>
            <div class="sii-right flex js">{{$route.query.reward_amount|| ''}}</div>
          </div>
          <div class="flex success-info-item">
            <div class="sii-left flex js">任务单价</div>
            <div class="sii-right flex js">{{$route.query.single_price || ''}}</div>
          </div>
        </div>
        <div class="task-btn flex line-back">查看发布任务情况</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'

  export default {
    name: 'success',
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
    background: url("../../assets/img/ok1.png") no-repeat;
    background-size: 100% auto;
  }

  .success-info {
    width: 96%;
    height: auto;
    min-height: 100px;
    background: #f8f8f8;
    border-radius: 8px;
    overflow: hidden;
    margin: 8px auto;
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
