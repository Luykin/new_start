<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <userheader :showType="2"></userheader>
      <div class="task-info flex fw js">
        <div class="normal-title flex">今日剩余提现次数{{$root.user.with_draw_num}}次</div>
        <div class="good-item flex" v-for="item in goods" :class="{'active-good-item': activeId === item.id}"
             @click="_chose(item)">{{item.price}}
        </div>
        <div class="task-btn flex line-back" @click="_withdraw">提现</div>
        <div class="task-color-title flex">提现说明</div>
        <span class="flex s line-font">1.最低提现金额为1元。</span>
        <span class="flex s line-font">2.提现时间为5分钟之内到账。</span>
        <span class="flex s line-font">3.如出现5分钟之内未到账情况，请联系微信客服:zongjiexk016。</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import userheader from 'components/userheader/minUserHeader'
  import {withdraw_good, withdraw} from 'api/index'

  export default {
    name: 'withdrawal',
    data() {
      return{
        goods:[],
        activeId: null,
        activeGood: null
      }
    },
    created() {
      this._init()
    },
    methods: {
      _init() {
        this._getWiGoods()
      },
      async _getWiGoods() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await withdraw_good()
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.goods = ret.data.data
          if (ret.data.data.length) {
            this.activeId = ret.data.data[0].id
            this.activeGood = ret.data.data[0]
          }
        }
      },
      async _withdraw() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await withdraw(this.activeGood.id, this.$root.user.username, this.activeGood.price)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', `提现申请已提交~`)
          this.$root.eventHub.$emit('updateUserInfo')
          this.$router.replace({
            path: '/user'
          })
        }
        //422 价格错误 //未绑定手机 446 //余额不足 433 //提现次数 438
        if (ret === 422) {
          this.$root.eventHub.$emit('titps', `价格校验错误~`)
        }
        if (ret === 446) {
          this.$root.eventHub.$emit('titps', `未绑定手机~`)
          this.$router.push({
            path: '/phone'
          })
        }
        if (ret === 433) {
          this.$root.eventHub.$emit('titps', `收益余额不足~`)
        }
        if (ret === 438) {
          this.$root.eventHub.$emit('titps', `提现次数超出今日上限~`)
        }
      },
      _chose(item) {
        this.activeId = item.id
        this.activeGood = item
      },
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
