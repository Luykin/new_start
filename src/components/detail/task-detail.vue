<template>
  <transition name="list">
    <div class="detail-body">
      <betterscroll class="wrapper" ref='wrapper'>
        <div>
          <div class="height10"></div>
          <div class="task-header">
            <div class="top flex fw">
              <div class="tht-title ell">悬赏标题:的撒大所大</div>
              <div class="tht-user ell">123456: 123456</div>
            </div>
            <div class="bottom flex fw">
              <div class="count-down flex">
                <div class="cd-left flex">抖音评论任务</div>
                任务时间:
                <span class="time">00:59:12</span>
              </div>
            </div>
          </div>
          <div class="task-info flex">
            <div class=""></div>
          </div>
        </div>
      </betterscroll>
    </div>
  </transition>
</template>

<script>
  import betterscroll from 'base/better-scroll/better-scroll'

  export default {
    name: 'task-detail',
    components: {
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 65px;
    overflow: hidden;
  }

  .task-header {
    width: 96%;
    height: 240px;
    margin: 10px auto;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .1);
  }

  .task-header:after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    /*background: rgba(112, 21, 253, .5);*/
    /*background: linear-gradient(to bottom, rgba(112, 21, 253, .6) 0, rgba(112, 21, 253, .6) 33%, rgba(255, 255, 255, .45) 33.01%, rgba(255, 255, 255, .45) 100%);*/
    /*filter: drop-shadow(0 0 50px rgba(255, 255, 255, 1));*/
    background: url("../../assets/img/reward.png") no-repeat;
    background-size: 100% 100%;
    opacity: .9;
  }

  .top {
    height: 33%;
  }

  .bottom {
    height: 67%;
    align-content: flex-start;
    align-items: flex-start;
  }

  .tht-title {
    width: 90%;
    margin: 0 auto 10px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  .tht-user {
    width: 90%;
    font-size: 12px;
    color: #fff;
  }

  .count-down {
    width: 90%;
    height: 26px;
    border-radius: 6px;
    background: #fff;
    color: #CCCCCC;
    font-size: 12px;
    margin: 16px auto;
    overflow: hidden;
    justify-content: flex-start;
  }

  .cd-left {
    width: 30%;
    height: 100%;
    background: #E3DEFF;
    color: #6B41E1;
    font-size: 12px;
  }

  .time {
    color: #FE5F91;
    font-weight: 600;
    font-size: 14px;
    text-indent: 10px;
  }

  .task-info{
    width: 96%;
    height: auto;
    min-height: 100px;
    border-radius: 10px;
    background: #fff;
    margin: 10px auto;
  }
</style>
