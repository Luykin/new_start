<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <userheader></userheader>
      <div class="task-info flex fw js">
        <div class="normal-title flex">选择充值的金额</div>
        <div class="good-item flex" v-for="item in goods_list" :class="{'active-good-item': activeId === item.id}"
             @click="_chose(item)">{{item.label}}
        </div>
        <div class="task-btn flex line-back" @click="_pay">支付</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import {goods, order} from 'api/index'
  import userheader from 'components/userheader/minUserHeader'

  export default {
    name: 'good',
    data() {
      return {
        goods_list: [],
        activeId: null,
        activeGood: null
      }
    },
    created() {
      this._init()
    },
    methods: {
      _init() {
        this._getGoods(0)
      },
      _chose(item) {
        this.activeId = item.id
        this.activeGood = item
      },
      async _pay() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await order(this.activeGood.id, this.$root.user.username,this.activeGood.price, this.activeGood.score)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this._afterpay(ret.data.data.pay_ret, () => {
            this.$root.eventHub.$emit('titps', `充值成功,如未到账,请刷新页面~`)
            this.$root.eventHub.$emit('updateUserInfo', 1000)
            this.$router.replace({
              path: '/user'
            })
          })
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
      async _getGoods() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await goods()
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          try {
            this.goods_list = ret.data.data
            if (ret.data.data.length) {
              this.activeId = ret.data.data[0].id
              this.activeGood = ret.data.data[0]
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
    },
    components: {
      back,
      userheader
    }
  }
</script>

<style scoped>
  .good-item {
    box-sizing: border-box;
    width: 44%;
    height: 80px;
    margin: 6px 0 10px 4%;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    color: #555555;
    font-size: 20px;
    font-weight: 600;
  }

  .active-good-item {
    background: #E3DEFF;
    border: 2px solid #6B41E1;
    color: #6B41E1;
  }
</style>
