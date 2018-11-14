<template>
  <transition name="list">
    <div>
      <div class="user-header">
        <div class="user-header-inner-warp flex">
          <div class="flex js uhiw-top">
            <userheader></userheader>
          </div>
          <div class="flex js uhiw-bottom s">
            <router-link tag='div' :to='item.path' class="flex fw" v-for="item in user_route" :key='path'>
              <img :src="item.icon" class="iconsss">
              <span class="flex mg10">{{item.name}}</span>
            </router-link>
          </div>
        </div>
      </div>
      <!--<div class="user-other-item proxy-team mg20" @click="$refs.popup._showPopup();$refs.interlayer._showLayer()">-->
      <div class="flex js user-click-item mg20" @click="$refs.popup._showPopup();$refs.interlayer._showLayer()">
        <img src="https://cdn.xingkwh.com/%E5%90%88%E4%BC%99%E4%BA%BA%E7%BE%A4.png"/>
        专业合伙人群
      </div>
      <div class="flex js user-click-item" @click="$refs.popup._showPopup();$refs.interlayer._showLayer()">
        <img src="https://cdn.xingkwh.com/%E6%88%91%E8%A6%81%E6%8A%95%E8%AF%89.png"/>
        我要投诉
      </div>
      <div class="flex js user-click-item" @click="$root.eventHub.$emit('titps', '即将上线')">
        <img src="https://cdn.xingkwh.com/%E7%94%9F%E6%88%90%E5%88%86%E7%AB%99.png"/>
        生成分站
      </div>
      <!--</div>-->
      <popup ref="popup">
        <div class="weqr">
          <span class="flex" style="height: 40px; margin-bottom: -10px; font-size: 15px; color: #222;">加入星空网红合伙人交流群</span>
          <img src="https://cdn.xingkwh.com/B32CCB63B90EAFB542F09AA2265EFC53.png"/>
          <span class="flex" style="height: 40px; margin-top: -10px">长按二维码加入交流群</span>
        </div>
        <img src="http://pd70b9zd0.bkt.clouddn.com/caclev.png" @click="_closeresult" class="cancelimg">
      </popup>
      <interlayer ref="interlayer" @close="_closeresult"></interlayer>
      <!--<div class="order-btn-list-warp flex mg10">-->
      <!--<router-link tag='div' to='./recharge-record?ativerecord=1' class="oblw-item flex">-->
      <!--<i class="iconfont icon-chongzhijilu maxmaxmax"></i>-->
      <!--<span class="flex oblw-title s mg10">充值记录</span>-->
      <!--</router-link>-->
      <!--<router-link tag='div' to='./recharge-record?ativerecord=2' class="oblw-item flex">-->
      <!--<i class="iconfont icon-tixianjilu maxmax"></i>-->
      <!--<span class="flex oblw-title s" style="margin-top: 15px;">提现记录</span>-->
      <!--</router-link>-->
      <!--<router-link tag='div' to='./transaction-record' class="oblw-item flex">-->
      <!--<i class="iconfont icon-jiaoyijilu maxmaxmaxs" style="transform: translate(0, -5px);"></i>-->
      <!--<span class="flex oblw-title s" style="margin-top: 5px;">交易记录</span>-->
      <!--</router-link>-->
      <!--</div>-->
      <!--<div class="flex mg10"></div>-->
      <!--<router-link tag='div' to='./strategy' class="user-list-item flex">-->
      <!--<i class="iconfont icon-xinshoubangzhu uli-icon xx"></i>-->
      <!--<span class="uli-title flex">新手攻略</span>-->
      <!--<img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">-->
      <!--</router-link>-->
      <!--<router-link tag='div' to='./introduce' class="user-list-item flex">-->
      <!--<i class="iconfont icon-jieshao uli-icon xx"></i>-->
      <!--<span class="uli-title flex">平台介绍</span>-->
      <!--<img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">-->
      <!--</router-link>-->
      <!--<router-link tag='div' to='./skill' class="user-list-item flex">-->
      <!--<i class="iconfont icon-yongjin uli-icon xx"></i>-->
      <!--<span class="uli-title flex">传播技巧</span>-->
      <!--<img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">-->
      <!--</router-link>-->
      <!-- <router-link tag='div' to='./inlet' class="user-list-item flex">
        <i class="iconfont icon-rukou uli-icon xx"></i>
        <span class="uli-title flex">平台入口</span>
        <img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">
      </router-link> -->
      <!-- <img src="https://cdn.xingkwh.com/kefu2.png" class="kefu-img"> -->
      <div class="footer-none"></div>
    </div>
  </transition>
</template>
<script type="text/javascript">
  // import { mapGetters } from 'vuex'
  import userheader from 'components/userheader/userheader'
  import popup from 'base/popup/popup'
  import interlayer from 'base/interlayer/interlayer'

  export default {
    data() {
      return {
        user_route: [{
          icon: 'https://cdn.xingkwh.com/%E8%B4%AD%E4%B9%B0%E8%AE%B0%E5%BD%95.png',
          path: './recharge-record?ativerecord=1',
          name: '购买记录'
        }, {
          icon: 'https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E8%AE%B0%E5%BD%95.png',
          path: './recharge-record?ativerecord=2',
          name: '提现记录'
        }, {
          icon: 'https://cdn.xingkwh.com/%E4%B8%8B%E5%8D%95%E8%AE%B0%E5%BD%95.png',
          path: './order-record',
          name: '下单记录'
        }]
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {},
    methods: {
      _closeresult() {
        this.$refs.popup._hiddenPopup()
        this.$refs.interlayer._hiddenLayer()
      },
    },
    components: {
      interlayer,
      userheader,
      popup
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
    height: 60%;
  }

  .uhiw-bottom {
    height: 40%;
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
  .weqr{
    width: 70%;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;
  }
  .weqr img{
    width: 100%;
    height: auto;
  }
  .user-click-item{
    height: 55px;
    border-bottom: 1px solid #F2F2F2;
    background: #fff;
    color: #555555;
    position: relative;
  }
  .user-click-item:after{
    content: '>';
    position: absolute;
    right: 10px;
    top: 50%;
    display: block;
    color: #DFDFDF;
    transform: translate(0, -50%) scale(1, 1.5);
    font-size: 15px;
  }
  .user-click-item img{
    width: 22px;
    height: auto;
    margin: 0 10px;
    transform: translate(0, -10%);
  }
</style>
