<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <!--<div class="header">-->
        <!--<userheader></userheader>-->
      <!--</div>-->
      <div class="task-info flex fw js" v-if="profit_details.length">
        <div class="task-color-title flex">我的好友</div>
        <div class="flex team-com-item fw">
          <span class="flex team-num">{{profit_details[1] ? profit_details[1].num_people : 0}}</span>
          <span class="flex team-title">一友人数</span>
        </div>
        <div class="flex team-com-item fw">
          <span class="flex team-num">{{profit_details[2] ? profit_details[2].num_people : 0}}</span>
          <span class="flex team-title">二友人数</span>
        </div>
      </div>
      <div class="task-info">
        <div class="task-color-title flex">收益明细</div>
        <div class="transcat-header flex mg10">
          <span class="th-item flex ell mins">团队</span>
          <span class="th-item flex ell mins">人数</span>
          <span class="th-item flex ell mins">完成订单数</span>
          <span class="th-item flex ell mins">今日收益</span>
          <span class="th-item flex ell mins">总收益</span>
        </div>
        <div class="transcat-item flex" v-for="item in profit_details" v-if="profit_details.length">
          <div class="tran-line flex ell">{{item.level == 0 ? '我' : item.level == 1 ? '一友' : '二友'}}</div>
          <div class="tran-line flex ell">{{item.level == 0 ? '-' : item.num_people}}</div>
          <div class="tran-line flex ell">{{item.num_completed}}</div>
          <div class="tran-line flex ell">{{item.today_income}}</div>
          <div class="tran-line flex ell">{{item.total_income}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  import back from 'base/back/back'
  import {see_team} from 'api/index'

  export default {
    name: 'commision',
    data() {
      return {
        profit_details: []
      }
    },
    created() {
      if (!this.$root.user.username) {
        this.$router.back(-1)
        return false
      }
      this._getTeamInfo()
    },
    methods: {
      async _getTeamInfo() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await see_team(this.$root.user.username)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.profit_details = ret.data.data
        }
      },
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

  .team-com-item {
    width: 44%;
    height: 80px;
    margin: 10px 0 10px 4%;
    background: #E3DEFF;
    color: #9A80E4;
    border-radius: 10px;
  }

  .team-num {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 8px;
  }

  .team-title {
    color: #9A80E4;
    font-size: 12px;
  }

  .transcat-header {
    width: 88%;
    height: 50px;
    overflow: hidden;
    background: #E3DEFF;
    color: #9A80E4;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .th-item {
    color: #B9B7DD;
    font-size: 10px;
    flex-grow: 1;
    height: 100%;
    margin: 0;
  }

  .th-item:nth-child(1) {
    width: 70%;
    flex-grow: 0.8;
  }

  .transcat-item {
    height: 60px;
    width: 88%;
    border-bottom: 1px solid #EAEAEA;
    font-size: 13px;
    color: #6B41E1;
    background: #F8F8F8;
    justify-content: flex-start;
    margin: 0 auto;
  }

  .tran-line {
    flex-wrap: wrap;
    flex-grow: 1;
    height: 100%;
    text-align: center;
    line-height: 20px;
    border-right: 1px solid #EAEAEA;
    border-left: 1px solid #EAEAEA;
  }

  .tran-line:nth-child(1) {
    width: 70%;
    flex-grow: 0.8;
    color: #999;
  }

  .header-warp {
    /*background: #4D4947;*/
    padding-bottom: 10px;
    overflow: hidden;
  }
</style>
