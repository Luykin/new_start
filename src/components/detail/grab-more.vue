<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info">
        <div class="grab-more flex js">
          多抢特权开通
        </div>
        <div class="s line-font line-min-title">
          一、开通规则
          <router-link tag='div' to='/user-commision' class="btn-invitation flex">去邀请>></router-link>
        </div>
        <div class="s line-font info-tips">*您当前能同时抢的任务个数为: <i class="blue-color">{{$root.user.enrol_num || 1}}个</i>
        </div>
        <div class="flex gm-table fw">
          <div class="flex header-table">
            <div class="flex header-table-item border-right">累计有效好友</div>
            <div class="flex header-table-item border-right">获得多抢数量</div>
            <div class="flex header-table-item">完成状态</div>
          </div>
          <div class="flex header-table header-body">
            <div class="flex header-table-item">5个</div>
            <div class="flex header-table-item">+1</div>
            <div class="flex header-table-item" :class="{'suc-cor': $root.user.enrol_num > 1}">{{$root.user.enrol_num >
              1 ? '已完成' : '未完成'}}
            </div>
          </div>
          <div class="flex header-table header-body">
            <div class="flex header-table-item">15个</div>
            <div class="flex header-table-item">+1</div>
            <div class="flex header-table-item" :class="{'suc-cor': $root.user.enrol_num > 2}">{{$root.user.enrol_num >
              2 ? '已完成' : '未完成'}}
            </div>
          </div>
          <div class="flex header-table header-body">
            <div class="flex header-table-item">40个</div>
            <div class="flex header-table-item">+1</div>
            <div class="flex header-table-item" :class="{'suc-cor': $root.user.enrol_num > 3}">{{$root.user.enrol_num >
              3 ? '已完成' : '未完成'}}
            </div>
          </div>
          <div class="flex header-table header-body">
            <div class="flex header-table-item">75个</div>
            <div class="flex header-table-item">+1</div>
            <div class="flex header-table-item" :class="{'suc-cor': $root.user.enrol_num > 4}">{{$root.user.enrol_num >
              4 ? '已完成' : '未完成'}}
            </div>
          </div>
        </div>
        <div class="s line-font line-min-title">
          二、多抢权限开通说明
          <router-link tag='div' to='/user-commision' class="btn-invitation flex">去邀请>></router-link>
        </div>
        <div class="s line-font">1、活动从2019年2月22日起生效。</div>
        <div class="s line-font">2、累计邀请的有效好友数量达到标准即可获得多抢奖励,多抢数量<i class="blue-color">最高为5个</i>。</div>
        <div class="s line-font">3、点击推广生成自己二维码，好友扫描你的二维码进入，做取一个任务<i class="blue-color">完成并获得赏金</i>,才算邀请成功。</div>
        <div class="s line-font">4、有效好友：好友完成任务并获得赏金后，计如邀请成功人 数，于<i class="blue-color">第二天00:00生效</i>,获得<i
          class="blue-color">多抢任务</i>数量。
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'

  export default {
    components: {
      back
    }
  }
</script>

<style scoped>
  .task-info {
    padding: 0 0 15px;
    overflow: hidden;
  }

  .grab-more {
    width: 90%;
    padding: 0 5%;
    height: 50px;
    background: #E8E4FF;
    color: #693EE1;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .line-min-title {
    color: #333;
    font-size: 15px;
    font-weight: 900;
    position: relative;
  }

  .blue-color {
    color: #693EE1;
  }

  .gm-table {
    box-sizing: content-box;
    width: 92%;
    margin: 10px auto;
    border-radius: 6px;
    overflow: hidden;
    height: auto;
    color: #A28458;
  }

  .header-table {
    background: #FFEFCE;
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #FFEDD3;
  }

  .header-body {
    background: #FFFAF2;
  }

  .header-table-item {
    color: #A28458;
    height: 100%;
    border-right: 1px solid #FFEDD3;
  }

  .header-table-item:last-child {
    border: none;
  }

  .border-right {
    border-right: 1px solid #F7DFBE;
  }

  .info-tips {
    margin-bottom: -5px;
    color: #777;
  }

  .suc-cor {
    color: #58b775;
  }

  .btn-invitation {
    width: auto;
    height: 100%;
    padding-left: 10px;
    position: absolute;
    right: 0;
    top: 0;
    font-weight: 400;
    color: #a28458;
    cursor: pointer;
  }
</style>
