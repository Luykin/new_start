<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <userheader></userheader>
      <div class="task-info flex fw js">
        <div class="normal-title flex">选择充值的金额</div>
        <div class="good-item flex" v-for="item in goods_list" :class="{'active-good-item': activeId === item.id}"
             @click="_chose(item)">
          <img :src="item.description" v-if="item.description"/>
          {{item.label}}
        </div>
        <div class="task-btn flex line-back" @click="_pay" v-if="can_pay">支付</div>
        <router-link tag='div' to='/inlet' class="task-btn flex line-back" v-else>
          请先绑定微信号
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import {goods, order, notify_web} from 'api/index'
  import userheader from 'components/userheader/minUserHeader'
  import {isWx} from 'common/js/util'

  export default {
    name: 'good',
    data() {
      return {
        goods_list: [],
        activeId: null,
        activeGood: null,
        newPage: null,
        // timer: null
      }
    },
    computed: {
      can_pay() {
        if (isWx()) {
          return this.$root.user.can_withdraw
        } else {
          return true
        }
      },
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
        this.newPage = window.open('about:blank', "_blank")
        this.$root.eventHub.$emit('loading', true)
        const ret = await order(this.activeGood.id, this.$root.user.username,this.activeGood.price, this.activeGood.score, isWx()?1:2);
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          // 浏览器支付
          if (!isWx()) {
            this.newPage.location.href = ret.data.data.pay_ret
            return false
          }
          this._afterpay(ret.data.data.pay_ret, () => {
            this.$root.eventHub.$emit('titps', `充值成功,如未到账,请刷新页面~`)
            this.$root.eventHub.$emit('updateUserInfo', 1000)
            this.$router.replace({
              path: '/user'
            })
          })
        }
        if (ret === 448) {
          this.$root.eventHub.$emit('titps', `您有违规传图,账号已被冻结`)
          return false
        }
      },
      _afterpay(result, callback) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': result.appId,     //公众号名称，由商户传入
            'timeStamp': result.timeStamp,         //时间戳，自1970年以来的秒数
            'nonceStr': result.nonceStr, //随机串
            'package': result.package,
            'signType': 'MD5',         //微信签名方式：
            'paySign': result.paySign //微信签名
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
    position: relative;
  }

  .good-item img{
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    height: auto;
    z-index: 99;
  }

  .active-good-item {
    background: #E3DEFF;
    border: 2px solid #6B41E1;
    color: #6B41E1;
  }
</style>
