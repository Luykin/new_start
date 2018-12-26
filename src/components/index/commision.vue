<template>
  <transition name="list">
    <div>
      <div class="header-warp">
        <div class="user-header mg10">
          <div class="user-header-inner-warp flex">
            <span class="titps">收益自动累加进余额</span>
            <div class="flex js uhiw-top">
              <p class="flex s" style="margin-bottom: 10px">合伙人总收益</p>
              <span class="flex maxiiii">￥{{$root.user.sum_income || '0.00'}}</span>
            </div>
            <div class="flex js uhiw-bottom s">
              <!--<div class="flex uhiwb-item ell" @click="_showqr()">-->
                <!--<i class="icon-erweima iconfont xx"></i>-->
                <!--生成推广二维码海报-->
              <!--</div>-->
              <router-link tag='div' to='./spread' class="flex uhiwb-item ell">
                <i class="icon-erweima iconfont xx"></i>
                生成推广二维码海报
              </router-link>
              <router-link tag='div' to='./details-commision' class="flex uhiwb-item ell">
                <i class="icon-qianbao iconfont xx"></i>
                我的佣金收益明细
              </router-link>
            </div>
          </div>
        </div>
        <div class="flex mg20"></div>
      </div>
      <div class="dark-warp">
        <div class="flex commision-item show-ququ">
          <img src="https://cdn.xingkwh.com/%E4%BB%8A%E6%97%A5%E6%94%B6%E7%9B%8Aicondrak@3x.png"
               class="iconlll">
          <span class="flex s bc-title">今日收益</span>
          <div class="flex ci-num-warp-list">
            <span class="flex cnwl-span ell" style="color: #FED083">+{{$root.user.today_income || 0}}元</span>
            <span class="flex cnwl-span">+{{$root.user.today_new_people || 0}}人</span>
          </div>
          <!--<div class="flex btn-commision ori" @click="_showqr()">推广</div>-->
          <router-link tag='div' to='./spread' class="flex btn-commision ori">
            推广
          </router-link>
        </div>
        <div class="flex commision-item">
          <img src="https://cdn.xingkwh.com/%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9Ficondrak@3x.png"
               class="iconlll">
          <span class="flex s bc-title">我的团队</span>
          <div class="flex ci-num-warp-list">
            <span class="flex cnwl-span ell" style="color: #CBA1FF">目前下级人数</span>
            <span class="flex cnwl-span">{{$root.user.num_people}}人</span>
          </div>
          <router-link tag='div' to='./details-commision' class="flex btn-commision lan">
            查看
          </router-link>
        </div>
        <div class="explain-warp flex js lll mg10">
          说明
        </div>
        <span class="flex s line-font" style="color: #C8C5FF;">合伙人代理金:</span>
        <span class="flex s line-font">1.当他人成为你的一级合伙人并交纳代理金后，你将获得20元返佣。</span>
        <span class="flex s line-font">2.从二级合伙人处获得5元返佣。</span>
        <span class="flex s line-font">3.从三级合伙人处获得3元返佣。</span>
        <div class="line"></div>
        <span class="flex s line-font" style="color: #C8C5FF;">下单收益返佣:</span>
        <span class="flex s line-font">1.一级合伙人的每笔下单交易，可获得该交易10%的收益。</span>
        <span class="flex s line-font">2.二级合伙人的每笔下单交易，可获得该交易7%的收益。</span>
        <span class="flex s line-font">3.三级合伙人的每笔下单交易，可获得该交易3%的收益。</span>
        <div class="line"></div>
        <div class="explain-warp flex js lll mg10">
          推广方法:
        </div>
        <!--<span class="flex s line-font" style="color: #222;">推广方法:</span>-->
        <span class="flex s line-font">1.进入星空，点击团队，点击推广即可生成自己的二维码进行推广。</span>
        <span class="flex s line-font">2.发朋友圈进行推广。</span>
        <span class="flex s line-font">3.到各个微信、QQ群发二维码。</span>
        <span class="flex s line-font">4.贴吧、社区、网站进行发布二维码。</span>
        <span class="flex s line-font">5.再微信群里加人，购买加人软件分享自己的二维码。</span>
        <span class="flex s line-font">6.群发每个微信、QQ好友，给个红包示好，让好友帮忙转发。</span>
        <span class="flex s line-font">7.建立微信群让合伙人进群，一对一教学，直到学会。</span>
      </div>
      <div class="footer-none"></div>
      <interlayer ref="interlayer" @close="_closeresult"></interlayer>
      <!--<customer></customer>-->
    </div>
  </transition>
</template>
<script type="text/javascript">
  import popup from 'base/popup/popup'
  // import customer from 'base/customer/customer'
  import interlayer from 'base/interlayer/interlayer'
  import {NOWCONFIG} from 'api/app_config'
  import QRCode from 'qrcode'

  export default {
    data() {
      return {
        myqrurl: null,
        NOWCONFIG: null
      }
    },
    created() {
    },
    mounted() {
      this.NOWCONFIG = NOWCONFIG
    },
    computed: {},
    methods: {
      _closeresult() {
        this.$refs.popup._hiddenPopup()
        this.$refs.interlayer._hiddenLayer()
      },
    },
    components: {
      popup,
      interlayer
    },
    watch: {
      '$route'(to, from) {
        if (to.path == '/details-commision') {
          this.$root.eventHub.$emit('teams')
        }
      }
    }
  }

</script>
<style type="text/css" scoped>
  .header-warp {
    padding-top: 10px;
    /*background: rgb(79, 74, 73);*/
    background: none;
    overflow: hidden;
  }

  .user-header {
    background: url('https://cdn.xingkwh.com/%E5%90%88%E4%BC%99%E4%BA%BA%E6%94%B6%E7%9B%8Abg@3x.png') no-repeat;
    background-size: 100% 100%;
    width: 92%;
    padding-top: 40%;
    border-radius: 8px;
    position: relative;
  }

  .user-header-inner-warp {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    align-items: flex-start;
    flex-wrap: wrap;
    color: #fff;
  }

  .uhiw-top {
    height: 62%;
    flex-wrap: wrap;
  }

  .uhiw-bottom {
    height: 38%;
  }

  .uhiwb-item {
    height: 40%;
    color: #fff;
  }

  .uhiwb-item:nth-child(1) {
    padding-right: 5px;
    border-right: 1px solid #fff;
  }

  .uhiwb-item .iconfont {
    margin: 0 5px;
    transform: translate(0, 5%);
  }

  .commision-item {
    height: 75px;
    border-bottom: 1px dashed #626296;
  }

  .btn-commision {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    margin: 0 10px;
    flex-shrink: 0;
    /*background: #B17B13;*/
    /*color: #fff;*/
  }

  .ori {
    color: #FED083;
    border: 1px solid #FED083;
  }

  .lan {
    color: #CBA2FF;
    border: 1px solid #CBA2FF;
  }

  .bc-title {
    width: 100px;
    color: #fff;
    white-space: nowrap;
  }

  .commision-item .iconlll {
    margin: 0 4%;
    flex-shrink: 0;
  }

  .ci-num-warp-list {
    height: 100%;
    margin: 0px 4%;
    flex-wrap: wrap;
  }

  .cnwl-span {
    justify-content: flex-start;
    height: 20px;
    color: #fff;
  }

  .myqr {
    width: 300px;
    height: 485px;
    overflow: hidden;
    margin: 0 auto;
  }

  .myqr img {
    width: 100%;
    height: 100%;
  }

  .titps {
    position: absolute;
    right: 0;
    top: 5%;
    font-size: 12px;
    height: 20px;
    line-height: 22px;
    color: #F6E2FF;
    padding: 0 5px;
    /*border: 1px solid #fff;*/
    border-radius: 10px;
    margin: 0;
    transform: scale(.9, .9) translate(1%, 0);
  }

  .dark-warp {
    width: 96%;
    padding: 10px 0;
    margin: 0 auto;
    background: rgba(58, 57, 90, 1);
    background: linear-gradient(154deg, rgba(58, 57, 90, 1) 0%, rgba(66, 66, 98, 1) 100%);
    border-radius: 6px;
    overflow: hidden;
    color: #A2A2E8;
  }
  .show-ququ{
    position: relative;
  }
  .show-ququ:after, .show-ququ:before{
    position: absolute;
    bottom: 0;
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 100px;
    background: #2A2E47;
  }
  .show-ququ:after{
    right: 0;
    transform: translate(50%, 50%);
  }
  .show-ququ:before{
    left: 0;
    transform: translate(-50%, 50%);
  }
</style>
