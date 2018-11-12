<template>
  <transition name="list">
    <div class="body">
      <back></back>
      <div class="header flex">
        <userheader></userheader>
      </div>
      <div class="mg30"></div>
      <div class="flex ll recharge-title">请输入提现金额<p class="ss" style="color:#727589;">(今日剩余提现次数<span
        style="color: #ffcd32;">{{$root.user.count ?  Math.abs(10 - $root.user.count) : 10}}</span> 次)</p></div>
      <div class="flex input-warp">
        <div class="recharge-img maxmaxmaxs">￥</div>
        <label>
          <input type="text" name="提现输入框" class="flex my-input" v-model="money" @keyup="_rectifyMoney">
        </label>
      </div>
      <div class="flex btn-buy lll" @click="_withdraw">提现</div>
      <div class="explain-warp flex js lll mg10">
        提现说明
      </div>
      <span class="flex s line-font">1.推广星空，代理金为199元，返100。</span>
      <span class="flex s line-font">2.好友在你的邀请注册新用户并付费，即可自动加入你的好友下单成功后，你也可从一级好友那里获得5%的现金奖励。</span>
      <span class="flex s line-font">3.一级团队好友的下级好友获得2%的现金奖励。</span>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import userheader from 'components/userheader/userheader'
  import {withdraw, updateuserinfo} from 'api/index'
  import back from 'base/back/back'

  export default {
    data() {
      return {
        money: ''
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {},
    methods: {
      async _withdraw() {
        if (!this.money || isNaN(this.money)) {
          this.$root.eventHub.$emit('titps', '请正确填写')
          this.money = ''
          return false
        }
        if (this.$root.user.score < this.money) {
          this.$root.eventHub.$emit('titps', '您的余额不足')
          return false
        }
        if (this.$root.user.count >= 10) {
          this.$root.eventHub.$emit('titps', '今日已超出提现次数上限')
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await withdraw(this.$root.user.username, this.money)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', '提现申请已提交')
          this.money = ''
          const ret = await updateuserinfo(this.$root.user.user_id)
          if (ret.status === 200 && ret.data.code === 200) {
            this.$root.user = ret.data.data
            this.$root.eventHub.$emit('update')
          }
        } else {
          if (parseInt(ret) === 438) {
            this.$root.eventHub.$emit('titps', '今日已超出提现次数上限')
            this.$root.eventHub.$emit('loading', null)
            return false
          }
          if (parseInt(ret) === 439) {
            this.$root.eventHub.$emit('titps', '奖励金需要进行一次交易才能提现')
            this.$root.eventHub.$emit('loading', null)
            return false
          }
          this.$root.eventHub.$emit('titps', '提交申请不通过')
          this.$root.eventHub.$emit('loading', null)
        }
      },
      _rectifyMoney() {
        if (isNaN(this.money) || this.money.indexOf('.') > -1 || this.money <= 0) {
          this.money = ''
        }
      },
    },
    components: {
      userheader,
      back
    }
  }
</script>
<style scoped>
  .header {
    height: 100px;
    background: #fff;
  }

  .body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background: #fff;
    overflow-y: scroll;
  }

  .recharge-img {
    width: 40px;
    height: auto;
  }

  .recharge-title {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    justify-content: flex-start;
  }

  .input-warp {
    height: 70px;
    width: 90%;
    margin: 10px auto;
    justify-content: flex-start;
    border-bottom: 2px solid #8284A0;
  }

  .btn-buy {
    width: 90%;
    margin: 20px auto;
    height: 50px;
    background: #524E4B;
    color: #fff;
    border-radius: 10px;
  }

  .my-input {
    color: #727589;
    font-size: 50px;
    border: none;
    height: 75%;
    text-indent: 20px;
    background: rgba(0, 0, 0, 0);
  }
</style>
