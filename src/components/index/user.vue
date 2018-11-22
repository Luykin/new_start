<template>
  <transition name="list">
    <div>
      <!--<div class="user-header">-->
      <!--<div class="user-header-inner-warp flex">-->
      <!--<div class="flex js uhiw-top">-->
      <!--<userheader></userheader>-->
      <!--</div>-->
      <!--<div class="flex js uhiw-bottom s">-->
      <!--<router-link tag='div' :to='item.path' class="flex fw" v-for="item in user_route" :key='path'>-->
      <!--<img :src="item.icon" class="iconsss">-->
      <!--<span class="flex mg10">{{item.name}}</span>-->
      <!--</router-link>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="user-other-item proxy-team mg20" @click="$refs.popup._showPopup();$refs.interlayer._showLayer()">-->
      <!--$refs.popup._showPopup();$refs.interlayer._showLayer()-->
      <!--黑色改版user样式-->
      <div class="user-header-dark">
        <div class="flex js uhiw-top">
          <div class="flex fw ut-name-warp">
            <p class="flex js user-nickname ell">{{$root.user.nickname}}
              <span class="ssss feidaili" :class="{'daili': $root.user.is_agent}">{{$root.user.is_agent ? '(合伙人)' : '(非合伙人)'}}</span>
            </p>
            <span class="flex js user-id ell">ID:{{$root.user.id}}</span>
          </div>
          <img :src="$root.user.avatar" class="iconxx avater">
        </div>
        <div class="flex js uhiw-bottom">
          <span class="flex js user-nickname ell xxxx">余额 : {{$root.user.score}}</span>
          <!--<div class="uhiw-btn flex llll">提现</div>-->
          <router-link tag='div' to='./withdraw' class="uhiw-btn flex llll">
            提现
          </router-link>
        </div>
      </div>
      <div class="dark-router-user flex">
        <router-link tag='div' :to='item.path' class="flex fw dru-item" v-for="item in user_route" :key='path'>
          <img :src="item.icon">
          <span class="flex mg10">{{item.name}}</span>
        </router-link>
      </div>
      <div class="flex js user-click-item mg20" @click="_showproxy" v-show="!$root.user.is_agent">
        <img src="https://cdn.xingkwh.com/%E6%88%90%E4%B8%BA%E5%90%88%E4%BC%99%E4%BA%BA@3x.png"/>
        成为合伙人
      </div>
      <div class="flex js user-click-item" @click="_show_team" :class="{'mg20': $root.user.is_agent}">
        <img src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E5%8A%A0%E5%85%A5%E7%BE%A4icon@3x.png"/>
        加入合伙人群
      </div>
      <div @click="_to_ckb" class="flex js user-click-item">
        <!--tag='div' to="./user/course?url=https://cdn.xingkwh.com/%E4%BB%B7%E6%A0%BC%E8%A1%A8.png"-->
        <img
          src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E5%AE%9A%E4%BB%B7%E5%8F%82%E8%80%83icon@3x.png"/>
        定价参考
      </div>
      <div @click="_to_resource" class="flex js user-click-item">
        <!--tag='div' to="./user/course?url=https://cdn.xingkwh.com/%E4%BB%B7%E6%A0%BC%E8%A1%A8.png"-->
        <img
          src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E6%8A%96%E9%9F%B3%E4%B8%8A%E7%83%AD%E9%97%A8icon@3x.png"/>
        抖音上热门技术
      </div>
      <div class="flex js user-click-item" @click="$root.eventHub.$emit('titps', '即将上线,尽请期待')">
        <img
          src="https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E7%94%9F%E6%88%90%E5%88%86%E7%AB%99icon@3x.png"/>
        生成我的分站
      </div>
      <!--<div class="flex js user-click-item" @click="_to_kefu">-->
      <!--<img src="https://cdn.xingkwh.com/%E5%AE%A2%E6%9C%8D.png"/>-->
      <!--我的客服-->
      <!--</div>-->
      <div class="flex js user-click-item" @click="$refs.kefu._showPopup();$refs.interlayer._showLayer()">
        <img src="https://cdn.xingkwh.com/%E5%AE%A2%E6%9C%8D%E6%8A%95%E8%AF%89icon@3x.png"/>
        我要投诉
      </div>
      <popup ref="proxy">
        <div class="flex proxy-warp fw">
          <img src="https://cdn.xingkwh.com/%E4%BB%A3%E7%90%86%E6%9D%83%E9%99%90002.png"/>
          <span class="flex sss">1、抖音快手业务全网最低成本价。</span>
          <p class="flex sss">2、获得第四代抖音热门技术视频教程。</p>
          <span class="flex sss">3、加入星空抖音精英合伙人群。</span>
          <span class="flex sss">4、自主招收合伙人，收取合伙人金50%分成。</span>
          <span class="flex sss">5、搭建分站系统。</span>
          <p class="flex sss mg10" style="justify-content: center">支付<span style="color: #ff2966; white-space: nowrap;"
                                                                           class="xx">{{proxy_price}}元</span></p>
          <div class="proxy-btn-buy lll flex mg10" @click="_to_commision">去赚佣金</div>
          <div class="proxy-btn-buy lll flex mg10" @click="_wxbuy">立即支付</div>
        </div>
      </popup>
      <popup ref="popup">
        <div class="weqr">
          <span class="flex"
                style="height: 40px; margin-bottom: -10px; font-size: 15px; color: #222;">加入星空网红合伙人交流群</span>
          <img src="https://cdn.xingkwh.com/B32CCB63B90EAFB542F09AA2265EFC53.png"/>
          <span class="flex" style="height: 40px; margin-top: -10px">长按二维码加入交流群</span>
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
      <router-view></router-view>
      <customer></customer>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import {
    addtask,
    wechat_agent_good,
    wechat_agent_order,
    updateuserinfo
  } from 'api/index'
  import userheader from 'components/userheader/userheader'
  import popup from 'base/popup/popup'
  import customer from 'base/customer/customer'
  import interlayer from 'base/interlayer/interlayer'

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
        proxy_price: 128
      }
    },
    created() {
    },
    mounted() {
      if (this.$root.user.user_id) {
        this._wechat_agent_good(this.$root.user.user_id)
      }
    },
    computed: {},
    methods: {
      _show_team() {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人')
          return false
        }
        this.$refs.popup._showPopup()
        this.$refs.interlayer._showLayer()
      },
      _to_resource() {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人,无法查看。')
          return false
        }
        this.$router.push({
          path: '/resource'
        })
      },
      _to_ckb() {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人,无法查看。')
          return false
        }
        this.$router.push({
          path: '/user/course?url=https://cdn.xingkwh.com/%E4%BB%B7%E6%A0%BC%E8%A1%A8.png'
        })
      },
      _to_kefu() {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人,无法查看。')
          return false
        }
        this.$router.push({
          path: '/custom'
        })
      },
      _to_commision() {
        this.$router.replace({
          path: '/commision'
        })
        this._closeresult()
      },
      _closeresult() {
        this.$refs.proxy._hiddenPopup()
        this.$refs.kefu._hiddenPopup()
        this.$refs.popup._hiddenPopup()
        this.$refs.interlayer._hiddenLayer()
      },
      async _wechat_agent_good(id, callback) {
        const ret = await wechat_agent_good(id)
        if (ret.status === 200 && ret.data.code === 200) {
          this.proxy_price = ret.data.data.score
          this.proxy_good_id = ret.data.data.good_id
          if (callback) {
            callback()
          }
        }
      },
      _showproxy() {
        this.$refs.proxy._showPopup()
        this.$refs.interlayer._showLayer()
      },
      async _wxbuy() {
        if (!this.proxy_good_id && this.proxy_good_id !== 0) {
          return false
        }
        if (!window.WeixinJSBridge) {
          console.log('未在微信内')
        } else {
          this.$root.eventHub.$emit('loading', true)
          const ret = await wechat_agent_order(this.$root.user.user_id, this.proxy_price, this.proxy_good_id)
          this.$root.eventHub.$emit('loading', null)
          if (ret.status === 200 && ret.data.code === 200 && ret.data.data.order_code) {
            this._afterpay(ret.data.data.pay_ret, () => {
              this.$root.eventHub.$emit('titps', '开通合伙人成功~')
              this.$refs.proxy._hiddenPopup()
              this.$refs.interlayer._hiddenLayer()
              setTimeout(async () => {
                const ret = await updateuserinfo(this.$root.user.user_id)
                if (ret.status === 200 && ret.data.code === 200) {
                  this.$root.user = ret.data.data
                  this.$root.eventHub.$emit('update')
                }
              }, 300)
            })
          }
        }
      },
      _afterpay(reualt, callback) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': reualt.appId,     //公众号名称，由商户传入
            'timeStamp': reualt.timeStamp,         //时间戳，自1970年以来的秒数
            'nonceStr': reualt.nonceStr, //随机串
            'package': reualt.package,
            'signType': 'MD5',         //微信签名方式：
            'paySign': reualt.paySign //微信签名
          }, (res) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              if (callback) {
                callback()
              }
            }
          })
      },
    },
    components: {
      interlayer,
      userheader,
      customer,
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

  .proxy-warp {
    width: 78%;
    padding: 4%;
    margin: 0 auto;
    height: auto;
    min-height: 100px;
    background: #fff;
    border-radius: 10px;
  }

  .proxy-warp span, .proxy-warp p {
    min-height: 24px;
    line-height: 20px;
    justify-content: flex-start;
  }

  .proxy-warp img {
    width: 40%;
    margin: 10px 10%;
    height: auto;
  }

  .proxy-btn-buy {
    width: 40%;
    height: 40px;
    border-radius: 6px;
    background: #524E4B;
    color: #DBB868;
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
</style>
