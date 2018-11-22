<template>
  <div class="body">
    <back></back>
    <div class="header-warp">
      <div class="user-header mg10">
        <div class="user-header-inner-warp flex">
          <div class="flex uhiw-top">
            <div class="flex fw ut-name-warp">
              <span class="flex js user-nickname ell">{{$root.user.nickname}}</span>
              <span class="flex js user-id ell">ID:{{$root.user.id}}</span>
            </div>
            <img :src="$root.user.avatar" class="iconxx avater">
            <!--<span class="flex mg10 s" style="color: #A46E2D">{{$root.user.nickname || ''}}</span>-->
          </div>
          <div class="flex js uhiw-bottom ssss">
            <div class="flex uhiw-bitem fw">
              <span class="flex ubiw-name">今日收益</span>
              <span class="flex xx">{{$root.user.today_income || '0.00'}}</span>
            </div>
            <div class="flex uhiw-bitem fw">
              <span class="flex ubiw-name">总收益</span>
              <span class="flex xx">{{$root.user.sum_income || '0.00'}}</span>
            </div>
            <div class="flex uhiw-bitem fw">
              <span class="flex ubiw-name">团队人数</span>
              <span class="flex xx">{{$root.user.num_people || '0.00'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="team-level-body flex mg10 fw">
      <div class="explain-warp flex js lll ell">
        团队人數
        <div class="more flex" @click="$router.replace({path: '/team-detail'})">查看团队</div>
      </div>
      <div class="team-level-item flex ell" style="background: #3C3B5C">
        <span class="flex s">一级(人)</span>
        <div class="flex x mg10 ell">{{team_level[0] ? team_level[0].num_people : '0'}}</div>
      </div>
      <div class="team-level-item flex ell" style="background: #4B4A7F">
        <span class="flex s">二级(人)</span>
        <div class="flex x mg10 ell">{{team_level[1] ? team_level[1].num_people : '0'}}</div>
      </div>
      <div class="team-level-item flex ell" style="background: #525291">
        <span class="flex s">三级(人)</span>
        <div class="flex x mg10 ell">{{team_level[2] ? team_level[2].num_people : '0'}}</div>
      </div>
      <!--<div class="team-level-item flex ell">-->
      <!--<span class="flex s">三级(人)</span>-->
      <!--<div class="flex ll mg10">{{team_level[2] ? team_level[2].num_people : '0'}}</div>-->
      <!--</div>-->
    </div>
    <div class="explain-warp flex js lll mg10 ell">
      团队收益
    </div>
    <div class="transcat-header flex mg10">
      <span class="th-item flex ell mins">团队</span>
      <span class="th-item flex ell mins">今日订单收益</span>
      <span class="th-item flex ell mins">订单总收益</span>
      <span class="th-item flex ell mins">今日合伙人收益</span>
      <span class="th-item flex ell mins">合伙人总收益</span>
      <span class="th-item flex ell mins">总收益</span>
    </div>
    <div class="transcat-item flex" v-for="item in profit_details" v-if="profit_details.length">
      <div class="tran-line flex ell">{{item.level == 1 ? '一' : item.level == 2 ? '二' : '三'}}级</div>
      <div class="tran-line flex ell">{{item.today_count}}</div>
      <div class="tran-line flex ell">{{item.total_count}}</div>
      <div class="tran-line flex ell">{{item.today_income}}</div>
      <div class="tran-line flex ell">{{item.agent_income}}</div>
      <div class="tran-line flex ell">{{item.total_income}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {teams, updateuserinfo} from 'api/index'
  import back from 'base/back/back'

  export default {
    data() {
      return {
        team_level: [],
        profit_details: []
      }
    },
    created() {
      this._teams()
      this._updateuserinfo()
    },
    mounted() {
      let time = setTimeout(() => {
        this.$root.eventHub.$on('teams', () => {
          this._teams()
          this._updateuserinfo()
        })
        clearTimeout(time)
      }, 1000)
    },
    computed: {},
    methods: {
      async _teams() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await teams(this.$root.user.user_id)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.team_level = ret.data.data.team_level
          this.profit_details = ret.data.data.profit_details
        }
      },
      async _updateuserinfo() {
        const ret = await updateuserinfo(this.$root.user.user_id)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          this.$root.eventHub.$emit('update')
        }
      },
    },
    components: {
      back
    }
  }
</script>
<style scoped>
  .body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background: #31293D;
    background: linear-gradient(45deg, #253250, #34283A);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#34283A));
    overflow-y: scroll;
  }

  .user-header {
    background: url('https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83bgback@3x.png') no-repeat;
    background-size: 100% 100%;
    width: 92%;
    padding-top: 40%;
    border-radius: 8px;
    position: relative;
    color: #fff;
  }

  .user-header-inner-warp {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .uhiw-top {
    height: 60%;
  }

  .uhiw-bottom {
    height: 40%;
  }

  .avater {
    flex-shrink: 0;
    margin: 0px 5%;
    border-radius: 100%;
  }

  .uhiw-bitem {
    height: 30%;
    border-right: 1px solid #fff;
  }

  .uhiw-bitem:last-child {
    border: none;
  }

  .ubiw-name {
    color: #A8D0FF;
    margin-bottom: 5px;
  }

  .team-level-body {
    height: 180px;
    /*background: #fff;*/
    justify-content: flex-start;
  }

  .team-level-item {
    height: 90px;
    width: 26.5%;
    margin: 20px 0 20px 5%;
    /*background: #4D4947;*/
    color: #fff;
    flex-wrap: wrap;
    /*border-radius: 8px;*/
  }

  .team-level-item span {
    color: #8988CD;
  }

  .transcat-header {
    height: 50px;
    background: #3C3B5C;
  }

  .th-item {
    color: #B9B7DD;
    font-size: 10px;
    flex-grow: 1;
    height: 100%;
    margin: 0;
  }

  .th-item:nth-child(1) {
    width: 50%;
    flex-grow: 0.5;
  }

  .transcat-item {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #3C3B5C;
    font-size: 13px;
    color: #fff;
    justify-content: flex-start;
  }

  .tran-line {
    flex-wrap: wrap;
    flex-grow: 1;
    height: 100%;
    text-align: center;
    line-height: 20px;
  }

  .tran-line:nth-child(1) {
    width: 50%;
    flex-grow: 0.5;
  }

  .header-warp {
    /*background: #4D4947;*/
    padding-bottom: 10px;
    overflow: hidden;
  }

  .mins {
    transform: scale(.9, .9);
  }

  .more {
    justify-content: flex-end;
    padding-right: 20px;
    margin-right: 5px;
    color: #BFBDE3;
    height: 100%;
    position: relative;
  }

  .more:after {
    content: '>';
    position: absolute;
    right: 5px;
    top: 50%;
    display: block;
    color: #BFBDE3;
    transform: translate(0, -50%) scale(1, 1.5);
    font-size: 15px;
  }

  .user-nickname {
    font-size: 22px;
    text-indent: 20px;
    margin-bottom: 8px;
  }

  .user-id {
    font-size: 14px;
    text-indent: 20px;
  }

  .ut-name-warp {
    max-width: 70%;
  }
</style>
