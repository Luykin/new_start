<template>
  <transition name="list">
    <div>
      <div class="user-header-dark">
        <div class="flex js uhiw-top">
          <div class="flex fw ut-name-warp">
            <p class="flex js user-nickname ell">{{$root.user.nickname}}
              <span class="ssss feidaili" :class="{'daili': $root.user.is_agent}" v-show="NOWCONFIG && NOWCONFIG.system === 1">{{$root.user.is_agent ? '(合伙人)' : '(非合伙人)'}}</span>
            </p>
            <span class="flex js user-id ell">ID:{{$root.user.id}}</span>
          </div>
          <img :src="$root.user.avatar" class="iconxx avater">
        </div>
        <div class="flex js uhiw-bottom">
          <span class="flex js user-nickname ell xxxx" v-show="NOWCONFIG && NOWCONFIG.system === 1">余额 : {{$root.user.score}}</span>
          <!--<div class="uhiw-btn flex llll">提现</div>-->
          <router-link tag='div' to='./withdraw' class="uhiw-btn flex llll" v-show="NOWCONFIG && NOWCONFIG.system === 1">
            提现
          </router-link>
        </div>
      </div>
      <div class="dark-router-user flex" v-show="NOWCONFIG && NOWCONFIG.system === 1">
        <router-link tag='div' :to='item.path' class="flex fw dru-item" v-for="item in user_route" :key='path'>
          <img :src="item.icon">
          <span class="flex mg10">{{item.name}}</span>
        </router-link>
      </div>
      <div v-if="NOWCONFIG && NOWCONFIG.system === 1">
        <div class="flex js user-click-item mg20" @click="_showVip" v-show="!$root.user.is_agent">
          <img src="https://cdn.xingkwh.com/%E6%88%90%E4%B8%BA%E5%90%88%E4%BC%99%E4%BA%BA@3x.png"/>
          成为合伙人
        </div>
        <div class="flex js user-click-item" @click="_showTeam" :class="{'mg20': $root.user.is_agent}">
          <img src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E5%8A%A0%E5%85%A5%E7%BE%A4icon@3x.png"/>
          加入合伙人群
        </div>
        <div class="flex js user-click-item" @click="toReward">
          <img
            src="https://cdn.xingkwh.com/%E8%B5%9A%E8%B5%8F%E9%87%91iocn.png"/>
          赚取赏金 (新)
        </div>
        <div @click="_toCkb" class="flex js user-click-item">
          <img
            src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E5%AE%9A%E4%BB%B7%E5%8F%82%E8%80%83icon@3x.png"/>
          定价参考
        </div>
        <div @click="_toResource" class="flex js user-click-item">
          <!--tag='div' to="./user/course?url=https://cdn.xingkwh.com/%E4%BB%B7%E6%A0%BC%E8%A1%A8.png"-->
          <img
            src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E6%8A%96%E9%9F%B3%E4%B8%8A%E7%83%AD%E9%97%A8icon@3x.png"/>
          抖音上热门技术
        </div>
        <router-link tag='div' to='./entrance' class="flex js user-click-item">
          <img
            src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83%20%E5%B9%B3%E5%8F%B0%E5%85%A5%E5%8F%A3@3x.png"/>
          平台入口
        </router-link>
        <div class="flex js user-click-item" @click="$root.eventHub.$emit('titps', '即将上线,尽请期待')">
          <img
            src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E7%94%9F%E6%88%90%E5%88%86%E7%AB%99icon@3x.png"/>
          生成我的分站
        </div>
      </div>
      <div v-else>
        <router-link tag='div' to='./order-record' class="flex js user-click-item">
          <img src="https://cdn.xingkwh.com/%E4%B8%8B%E5%8D%95%E8%AE%B0%E5%BD%95@3x.png"/>
          下单记录
        </router-link>
      </div>
      <div v-if="UAID" class="flex edition">版本号: v-{{UAID}}</div>
      <popup ref="popup">
        <div class="weqr">
          <img :src="NOWCONFIG.customer_url" v-if="NOWCONFIG"/>
        </div>
        <img src="http://pd70b9zd0.bkt.clouddn.com/caclev.png" @click="_closeresult" class="cancelimg">
      </popup>
      <popup ref="kefu">
        <div class="weqr">
          <span class="flex" style="height: 40px; margin-bottom: -10px; font-size: 15px; color: #222;">订单问题，添加客服</span>
          <img src="https://cdn.xingkwh.com/BC63B97B2D56E69E8F0C5514580D5D65.png"/>
          <span class="flex" style="height: 40px; margin-top: -10px">长按二维码添加客服</span>
        </div>
        <img src="http://pd70b9zd0.bkt.clouddn.com/caclev.png" @click="_closeresult" class="cancelimg">
      </popup>
      <interlayer ref="interlayer" @close="_closeresult"></interlayer>
      <vip ref="vip" :vipBg="'https://cdn.xingkwh.com/%E6%88%90%E4%B8%BA%E5%90%88%E4%BC%99%E4%BA%BA%E5%BC%B9%E7%AA%97@3x.png'" :payBootom="18" :comBootom="12"></vip>
      <div class="footer-none"></div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import {
    addtask,
    wechat_agent_good,
    wechat_agent_order
  } from 'api/index'
  import userheader from 'components/userheader/userheader'
  import popup from 'base/popup/popup'
  import interlayer from 'base/interlayer/interlayer'
  import {NOWCONFIG} from 'api/app_config'
  import {UAID} from 'api/config'
  import vip from 'components/vip/vip'

  export default {
    data() {
      return {
        user_route: [{
          icon: 'https://cdn.xingkwh.com/%E8%B4%AD%E4%B9%B0%E8%AE%B0%E5%BD%95@3x.png',
          path: './recharge-record?ativerecord=1',
          name: '购买记录'
        }, {
          icon: 'https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E8%AE%B0%E5%BD%95@3x.png',
          path: './recharge-record?ativerecord=2',
          name: '提现记录'
        }, {
          icon: 'https://cdn.xingkwh.com/%E4%B8%8B%E5%8D%95%E8%AE%B0%E5%BD%95@3x.png',
          path: './order-record',
          name: '下单记录'
        }],
        proxy_good_id: null,
        proxy_price: 48,
        NOWCONFIG: null,
        UAID: null
      }
    },
    created() {
      this.NOWCONFIG = NOWCONFIG
      this.UAID = UAID
      // if (!this.$root.user.user_id) {
      //   this.$router.replace({
      //     path: '/index'
      //   })
      //   return false
      // }
    },
    mounted() {
      if (!this.$root.user.is_agent) {
        this.$refs.vip._wechat_agent_good(this.$root.user.user_id);
      }
    },
    computed: {},
    methods: {
      _showTeam() {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人')
          return false
        }
        this.$refs.popup._showPopup()
        this.$refs.interlayer._showLayer()
      },
      _toResource() {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人,无法查看。')
          return false
        }
        this.$router.push({
          path: '/resource'
        })
      },
      _toCkb() {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人,无法查看。')
          return false
        }
        this.$router.push({
          path: '/user/course?url=https://cdn.xingkwh.com/%E4%BB%B7%E6%A0%BC%E8%A1%A8.png'
        })
      },
      toReward() {
        this.$router.replace({
          path: '/reward'
        })
      },
      _closeresult() {
        try {
          this.$refs.kefu._hiddenPopup()
          this.$refs.popup._hiddenPopup()
          this.$refs.interlayer._hiddenLayer()
        } catch (e) {
          console.log(e)
        }
      },
      _showVip() {
        this.$refs.vip._show();
      },
    },
    components: {
      interlayer,
      userheader,
      popup,
      vip
    },
    watch: {
      '$route'(to, from) {
        try {
          if (to.query.ativerecord) {
            this.$root.eventHub.$emit('ativerecord', to.query.ativerecord)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

</script>
<style type="text/css" scoped>
  .user-header {
    width: 100%;
    padding-top: 50%;
    /*border-radius: 8px;*/
    position: relative;
    background: #524E4B;
    overflow: hidden;
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

  .order-btn-list-warp {
    width: 95%;
    height: 100px;
    overflow: hidden;
    padding-left: 3%;
  }

  .oblw-item {
    height: 100%;
    margin-right: 3.3%;
    flex-grow: 1;
    background: #27283A;
    border-radius: 5px;
    flex-wrap: wrap;
  }

  .nw-item {
    height: 25px;
    color: #353535;
  }

  .uhiw-top {
    height: 61%;
  }

  .uhiw-bottom {
    height: 39%;
    color: #fff;
  }

  .uhiw-btn {
    width: 42%;
    margin-left: 5%;
    flex-grow: 0;
    height: 36px;
    border-radius: 6px;
    border: 1px solid #99691A;
    color: #99691A;
    font-weight: 600;
  }

  .oblw-title {
    color: #8284A0;
  }

  .user-list-item {
    height: 54px;
  }

  .uli-icon {
    margin: 0 20px;
    flex-shrink: 0;
    color: #F3A523;
  }

  .uli-title {
    height: 100%;
    flex-grow: 1;
    justify-content: flex-start;
  }

  .icon-img {
    width: 20px;
    height: auto;
    margin: 0 14px;
  }

  .user-other-item {
    width: 88%;
    padding-top: 16.5%;
    border-radius: 10px;
  }

  .proxy-team {
    background: url("https://cdn.xingkwh.com/%E6%88%91%E7%9A%84-%E4%BA%A4%E6%B5%81%E7%BE%A4.png") no-repeat;
    background-size: 100% 100%;
  }

  .weqr {
    width: 70%;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;
  }

  .weqr img {
    width: 100%;
    height: auto;
  }

  .user-click-item {
    height: 55px;
    color: #fff;
    position: relative;
  }

  .user-click-item:after {
    content: '>';
    position: absolute;
    right: 20px;
    top: 50%;
    display: block;
    color: #DFDFDF;
    transform: translate(0, -50%) scale(1, 2);
    font-size: 15px;
  }

  .user-click-item img {
    width: 22px;
    height: auto;
    margin: 0 10px 0 20px;
    transform: translate(0, -10%);
  }

  .user-header-dark {
    width: 96%;
    height: 150px;
    border-radius: 8px;
    margin: 10px auto;
    color: #fff;
    background: url("https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83bgback@3x.png") no-repeat;
    background-size: 100% 100%;
  }

  .ut-name-warp {
    max-width: 70%;
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

  .avater {
    flex-shrink: 0;
    margin: 0px 5%;
    border-radius: 100%;
  }

  .uhiw-btn {
    color: #fff;
    width: 40%;
    margin: 0 5%;
    border-radius: 6px;
    border: 1px solid #fff;
    height: 55%;
  }

  .dark-router-user {
    width: 96%;
    height: 108px;
    margin: 10px auto 0;
    border-radius: 6px;
    background: #3C3B5C;
    color: #fff;
  }

  .dru-item {
    width: 29%;
    margin: 2.165%;
    background: #4B4A7F;
    height: 80%;
    border-radius: 5px;
  }

  .dark-router-user img {
    max-width: 50px;
    width: 30%;
    height: auto;
  }

  .feidaili {
    text-indent: 5px;
    color: rgba(255, 255, 255, .5);
  }

  .daili {
    color: #ffe5b8;
  }
  .edition{
    color: rgba(255,255,255,.35);
    font-size: 10px;
    height: 30px;
    margin-top: 20px;
  }
</style>
