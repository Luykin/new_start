<template>
  <transition name="list">
    <div>
      <div class="header-warp">
        <div class="user-header mg10">
          <div class="user-header-inner-warp flex">
            <span class="titps">收益自动累加进余额</span>
            <div class="flex js uhiw-top">
              <p class="flex s" style="margin-bottom: 10px">代理总收益</p>
              <span class="flex maxiiii">￥{{$root.user.sum_income || '0.00'}}</span>
            </div>
            <div class="flex js uhiw-bottom s">
              <div class="flex uhiwb-item ell" @click="_showqr()">
                <i class="icon-erweima iconfont xx"></i>
                生成推廣二維碼海報
              </div>
              <router-link tag='div' to='./details-commision' class="flex uhiwb-item ell">
                <i class="icon-qianbao iconfont xx"></i>
                我的傭金收益明細
              </router-link>
            </div>
          </div>
        </div>
        <div class="flex mg20"></div>
      </div>
      <div class="flex commision-item">
        <img src="https://cdn.xingkwh.com/%E5%9B%A2%E9%98%9F-%E4%BB%8A%E6%97%A5%E6%94%B6%E7%9B%8A.png" class="iconlll">
        <span class="flex s bc-title">今日收益</span>
        <div class="flex ci-num-warp-list">
          <span class="flex cnwl-span ell" style="color: #B17B13">+{{$root.user.today_income || 0}}BTC幣</span>
          <span class="flex cnwl-span">+{{$root.user.today_new_people || 0}}人</span>
        </div>
        <div class="flex btn-commision" @click="_showqr()">推广</div>
      </div>
      <div class="flex commision-item">
        <img src="https://cdn.xingkwh.com/%E5%9B%A2%E9%98%9F-%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9F.png" class="iconlll">
        <span class="flex s bc-title">我的团队</span>
        <div class="flex ci-num-warp-list">
          <span class="flex cnwl-span ell" style="color: #B17B13">目前下级人数</span>
          <span class="flex cnwl-span">{{$root.user.num_people}}人</span>
        </div>
        <router-link tag='div' to='./details-commision' class="flex btn-commision">
          查看
        </router-link>
      </div>
      <div class="explain-warp flex js lll mg10">
        说明
      </div>
      <span class="flex s line-font">1.推广星空，代理金为199元，返100。</span>
      <span class="flex s line-font">2.好友在你的邀请注册新用户并付费，即可自动加入你的好友下单成功后，你也可从一级好友那里获得5%的现金奖励。</span>
      <span class="flex s line-font">3.一级团队好友的下级好友获得2%的现金奖励。</span>
      <div class="footer-none"></div>
      <popup ref="popup">
        <div class="myqr">
          <img :src="myqrurl">
        </div>
        <img src="http://pd70b9zd0.bkt.clouddn.com/caclev.png" @click="_closeresult" class="cancelimg">
      </popup>
      <interlayer ref="interlayer" @close="_closeresult"></interlayer>
      <canvas ref="spread" width="600" height="970" class="spread hidek" style="width: 300px; height: 485px;"></canvas>
      <img src="../../assets/img/agent.png" class="spreadimg hidek">
      <img class="spreadqr hidek" ref="qrimg" @load="_setcanvas">
    </div>
  </transition>
</template>
<script type="text/javascript">
  import popup from 'base/popup/popup'
  import interlayer from 'base/interlayer/interlayer'
  import QRCode from 'qrcode'

  export default {
    data() {
      return {
        myqrurl: null
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
      _setcanvas() {
        try {
          let canvas = document.querySelector('.spread')
          let imgbg = document.querySelector('.spreadimg')
          let imgqr = document.querySelector('.spreadqr')
          canvas.getContext('2d').drawImage(imgbg, 0, 0, 600, 970)
          canvas.getContext('2d').drawImage(imgqr, 200, 370, 200, 200)
          this.myqrurl = canvas.toDataURL('image/png')
          this.$root.eventHub.$emit('loading', null)
          this.$refs.popup._showPopup()
          this.$refs.interlayer._showLayer()
        } catch (err) {
          this.$root.eventHub.$emit('loading', null)
          console.log(err)
        }
      },
      _showqr() {
        if (this.myqrurl) {
          this.$refs.popup._showPopup()
          this.$refs.interlayer._showLayer()
          return false
        }
        const opts = {
          type: 'image/jpeg'
        }
        this.$root.eventHub.$emit('loading', true)
        QRCode.toDataURL(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx023b60bde059ebd7&redirect_uri=http%3a%2f%2fmelone.galeblock.com%2f%23%2findex?username=${this.$root.user.username}&response_type=code&scope=snsapi_userinfo#wechat_redirect`, opts, (err, url) => {
          if (err) {
            this.$root.eventHub.$emit('titps', '二维码解析出错')
            console.error(err)
          } else {
            this.$refs.qrimg.src = url
          }
        })
      }
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
  .header-warp{
    padding-top: 10px;
    background: rgb(79, 74, 73);
    overflow: hidden;
  }
  .user-header {
    background: url('https://cdn.xingkwh.com/%E4%BB%A3%E7%90%86%E6%94%B6%E7%9B%8A%E6%98%8E%E7%BB%86-%E6%94%B6%E7%9B%8A%E6%A1%86%E8%83%8C%E6%99%AF.png') no-repeat;
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
    height: 56%;
    flex-wrap: wrap;
  }

  .uhiw-bottom {
    height: 44%;
  }

  .uhiwb-item {
    height: 30%;
    color: #fff;
  }

  .uhiwb-item:nth-child(1) {
    border-right: 1px solid #fff;
  }

  .uhiwb-item .iconfont {
    margin: 0 5px;
    transform: translate(0, 5%);
  }

  .commision-item {
    height: 84px;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .btn-commision {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    margin: 0 10px;
    flex-shrink: 0;
    background: #B17B13;
    color: #fff;
  }

  .ori {
    background: rgba(255, 128, 0, 1);
  }

  .lan {
    background: linear-gradient(153deg, rgba(130, 165, 255, 1) 0%, rgba(77, 81, 255, 1) 100%);
  }

  .bc-title {
    width: 100px;
    color: #555;
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

  .cancelimg {
    display: block;
    transform: translate(0px, 100%);
    margin: 0 auto;
  }

  .titps {
    position: absolute;
    right: 0;
    top: 5%;
    font-size: 12px;
    height: 20px;
    line-height: 22px;
    color: #fff;
    padding: 0 5px;
    border: 1px solid #fff;
    border-radius: 10px;
    margin: 0;
    transform: scale(.9, .9) translate(1%, 0);
  }
</style>
