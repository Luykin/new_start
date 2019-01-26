<template>
  <div class="detail-body">
    <back></back>
    <div class="task-info flex fw">
      <div class="task-info-header">
        <div class="tih-inner flex">
          <div class="flex js repulation-title">
            星赞信用
          </div>
          <div class="flex boom-num fw">
            <span class="flex">300</span>
            <span class="flex title">信用分</span>
          </div>
          <div class="flex record-num">
            <div class="record-num-item flex border-after js fw">
              <img src="../../assets/img/creditadd.png"/>
              <div class="rni-info">
                <span class="flex add-num">15</span>
                <span class="flex">已加信用</span>
              </div>
            </div>
            <div class="record-num-item flex js fw">
              <img src="../../assets/img/creditreduce.png"/>
              <div class="rni-info">
                <span class="flex add-num">15</span>
                <span class="flex">已扣信用</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex s line-font line-min-title">信用分数：</div>
      <div class="s line-font">2、信用极差：290</div>
      <div class="s line-font">1、信用极低：295</div>
      <div class="s line-font">3、信用良好：310</div>
      <div class="s line-font">4、信用优秀：380</div>
      <div class="s line-font">5、信用极好：450</div>
      <div class="s line-font line-min-title">信用分数限制：</div>

      <div class="s line-font">1、当你好友，完成并审核通过任务后，你将获得<i class="red-color">2%</i>奖励；</div>
      <div class="s line-font">2、当你好友的好友，完成并审核通过任务后，你将获得<i class="red-color">1%</i>奖励；</div>
      <div class="s line-font line-min-title">置顶奖励：</div>
      <div class="s line-font">1、当你好友发布任务并置顶后，你将获得<i class="red-color">20%</i>奖励；</div>
      <div class="s line-font">2、当你好友的好友发布任务并置顶后，你将获得<i class="red-color">10%</i>奖励；</div>
    </div>
  </div>
</template>

<script>
  import back from 'base/back/back'

  export default {
    name: 'reputation',
    components: {
      back
    },
  }
</script>

<style scoped>
  .task-info {
    /*background: ;*/
    background: #fff url("https://cdn.xingkwh.com/creditbd.png") no-repeat left top;
    background-size: 100% auto;
    min-height: 300px;
    position: relative;
    padding-top: 62%;
  }

  .task-info-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 54%;
  }

  .tih-inner {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    color: #fff;
    font-size: 15px;
    align-items: flex-start;
    align-content: flex-start;
  }

  .record-num {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 88%;
    height: 28%;
    padding: 10px 0;
    background: #fff;
    border-radius: 1000px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  }

  .boom-num {
    position: absolute;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 55%;
    border-radius: 1000px;
    color: #fff;
    font-size: 27px;
    font-weight: 600;
  }

  .boom-num .title {
    font-size: 14px;
    font-weight: 400;
    margin-top: 10%;
    margin-bottom: -10%;
  }

  .repulation-title {
    height: 40px;
    width: 90%;
    padding: 0 5%;
  }

  .record-num-item {
    box-sizing: border-box;
    height: 100%;
    width: 55%;
    padding: 0 0 0 5%;
    position: relative;
  }

  .record-num-item span {
    color: #999999;
    font-size: 12px;
  }

  .record-num-item img {
    width: 32%;
    height: auto;
    flex-shrink: 0;
  }

  .border-after:after {
    display: block;
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    height: 50%;
    width: 1px;
    transform: translate(0, -50%);
    background: #E3DEFF;
  }

  .rni-info {
    width: auto;
    flex-grow: 1;
    margin-right: 5%;
  }

  .record-num-item .add-num {
    color: #FF3939;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .border-after .add-num {
    color: #1BA02B;
  }

  .line-min-title {
    font-weight: 600;
  }
</style>
