<template>
  <div>
    <popup ref="notice">
      <div class="buy-explain flex fw">
        <h1 class="flex">课程购买说明</h1>
        <span class="flex js">1.该专栏课程费用为:<i style="color: #F8E71C"> {{price}}元</i> </span>
        <span class="flex js">2.购买课程专栏后,专栏课程任意听取。</span>
        <div class="buy-btn flex" @click="_close">取消</div>
        <div class="buy-btn flex" @click="_courseAddOrder">立即购买</div>
      </div>
    </popup>
    <interlayer ref="interlayer" @close="_close"></interlayer>
  </div>
</template>

<script>
  import popup from 'base/popup/popup'
  import interlayer from 'base/interlayer/interlayer'
  import {course_add_order} from 'api/index'

  export default {
    props: {
      course_id: {
        type: Number,
        default: -1
      },
      price: {
        type: Number,
        default: 0
      }
    },
    name: 'buy',
    methods: {
      _show() {
        this.$refs.notice._showPopup()
        this.$refs.interlayer._showLayer()
      },
      _close() {
        this.$refs.notice._hiddenPopup()
        this.$refs.interlayer._hiddenLayer()
      },
      async _courseAddOrder(){
        if (!window.WeixinJSBridge) {
          console.log('未在微信内')
        } else {
          this.$root.eventHub.$emit('loading', true)
          const ret = await course_add_order(this.course_id, this.$root.user.user_id, this.price)
          this.$root.eventHub.$emit('loading', null)
          if (ret.status === 200 && ret.data.code === 200 && ret.data.data.order_code) {
            this._afterpay(ret.data.data.pay_ret, () => {
              this.$root.eventHub.$emit('titps', '课程购买成功~');
              let time = setTimeout(() => {
                this.$emit('success');
                clearTimeout(time);
              }, 800);
              this._close();
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
      popup,
      interlayer
    }
  }
</script>

<style scoped>
  .buy-explain {
    width: 88%;
    height: auto;
    min-height: 150px;
    background: #3D3C5D;
    border-radius: 10px;
    margin: 0 auto;
    align-content: flex-start;
    align-items: flex-start;
  }

  .buy-explain h1 {
    font-size: 18px;
    height: 60px;
    color: #fff;
    font-weight: 600;
  }
  .buy-explain span {
    width: 80%;
    font-size: 15px;
    height: 30px;
    color: #fff;
    white-space: nowrap;
  }
  .buy-btn{
    width: 30%;
    height: 35px;
    font-size: 14px;
    color: #fff;
    margin: 10px 9% 20px;
    background: #7045F2;
    border-radius: 5px;
    background: linear-gradient(right, #7045F2, #9672F8);
    background: -webkit-gradient(linear, right top, left top, from(#7045F2), to(#9672F8));
  }
</style>
