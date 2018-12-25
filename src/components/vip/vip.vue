<template>
  <div>
    <popup ref="notice">
      <div class="flex proxy-warp fw">
        <img :src="vipBg"/>
        <div class="proxy-pay" @click="_wxbuy" :style="'bottom:' + payBootom + '%'"></div>
        <div class="proxy-commision" @click="_toCommision" :style="'bottom:' + comBootom + '%'"></div>
      </div>
      <img src="http://pd70b9zd0.bkt.clouddn.com/caclev.png"
           @click="_close" class="cancelimg">
    </popup>
    <interlayer ref="interlayer" @close="_close"></interlayer>
  </div>
</template>

<script>
  import popup from 'base/popup/popup'
  import interlayer from 'base/interlayer/interlayer'
  import {wechat_agent_order, wechat_agent_good, updateuserinfo} from 'api/index'

  export default {
    props: {
      vipBg: {
        type: [String],
        default: 'https://cdn.xingkwh.com/%E8%BF%98%E4%B8%8D%E6%98%AF%E5%90%88%E4%BC%99%E4%BA%BA%E5%BC%B9%E7%AA%97@3x.png'
      },
      payBootom: {
        type: [Number],
        default: 20
      },
      comBootom: {
        type: [Number],
        default: 15
      }
    },
    name: 'vip',
    data() {
      return {
        proxy_price: 48,
        proxy_good_id: null
      }
    },
    created() {
    },
    methods: {
      async _wechat_agent_good(id, callback) {
        const ret = await wechat_agent_good(id)
        if (ret.status === 200 && ret.data.code === 200) {
          console.log('获取商品')
          this.proxy_price = ret.data.data.score
          this.proxy_good_id = ret.data.data.good_id
          if (callback) {
            callback()
          }
        }
      },
      async _wxbuy() {
        if (!this.proxy_good_id && this.proxy_good_id !== 0) {
          if (!this.$root.user.user_id) {
            return false
          }
          this._wechat_agent_good(this.$root.user.user_id)
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
              setTimeout(async () => {
                const ret = await updateuserinfo(this.$root.user.user_id)
                if (ret.status === 200 && ret.data.code === 200) {
                  this.$root.user = ret.data.data
                  this.$root.eventHub.$emit('update')
                  this.$router.replace({
                    path: '/user'
                  })
                }
              }, 300)
              this.$root.eventHub.$emit('titps', '开通合伙人成功~')
              this._close()
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
      _toCommision() {
        this.$router.replace({
          path: '/commision'
        })
        this._close()
      },
      _show() {
        this.$refs.notice._showPopup()
        this.$refs.interlayer._showLayer()
      },
      _close() {
        this.$refs.notice._hiddenPopup()
        this.$refs.interlayer._hiddenLayer()
      },
    },
    components: {
      popup,
      interlayer
    }
  }
</script>

<style scoped>
  .proxy-warp {
    width: 82%;
    margin: 0 auto -12%;
    height: auto;
    min-height: 100px;
    position: relative;
  }

  .proxy-warp img {
    width: 100%;
    margin: 10px 10%;
    height: auto;
  }
  .proxy-pay{
    width: 100%;
    height: 10%;
    position: absolute;
    /*bottom: 20%;*/
  }
  .proxy-commision{
    width: 100%;
    position: absolute;
    /*bottom: 15%;*/
    height: 5%;
  }
</style>
