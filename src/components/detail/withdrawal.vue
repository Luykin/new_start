<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <userheader :showType="2"></userheader>
      <div class="task-info flex fw js">
        <div class="normal-title flex">今日剩余提现次数{{$root.user.with_draw_num}}次</div>
        <div class="good-item flex" v-for="item in goods" :class="{'active-good-item': activeId === item.id, 'disbale-agi': !item.can_cash}"
             @click="_chose(item)">{{item.price}}
        </div>
        <div class="task-btn flex line-back" v-if="$root.user.can_withdraw" @click="_withdraw">提现</div>
        <!--<div v-else class="task-btn flex line-back">请先绑定微信号</div>-->
        <router-link tag='div' to='/inlet' class="task-btn flex line-back" v-else>
          请先绑定微信号
        </router-link>
        <div class="task-color-title flex">提现说明</div>
        <span class="flex s line-font">1.新用户首次可提现1元, 最低提现金额为10元。</span>
        <span class="flex s line-font">2.提现时间为5分钟之内到账。</span>
        <span class="flex s line-font">4.如出现5分钟之内未到账情况，请联系微信客服:zongjiexk016。</span>
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
        const ret = await withdraw_good(this.$root.user.username)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.goods = this._format(ret.data.data)
          // if (ret.data.data.length) {
          //   this.activeId = ret.data.data[0].id
          //   this.activeGood = ret.data.data[0]
          // }
        }
      },
      _format(list) {
        if (!list || !list.length) {
          return []
        }
        for(let i =0;i<list.length;i++){
          if (list[i].can_cash){
            this.activeId = list[i].id
            this.activeGood = list[i]
            break;
          }
        }
        return list
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
        if (ret === 429) {
          this.$root.eventHub.$emit('titps', `没有权限~`)
        }
        if (ret === 448) {
          this.$root.eventHub.$emit('titps', `您的权限不足`)
          return false
        }
      },
      _chose(item) {
        if (!item.can_cash) {
          return false
        }
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

  .line-font{
    word-break: break-all;
  }
  .disbale-agi{
    background: #f8f8f8;
    color: #999;
  }
</style>
