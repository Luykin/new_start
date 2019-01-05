<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="cachet flex js">
        <div class="cachet-item flex" v-for="item in btn_list" :class="{'active-cachet-item': item.id === activeId}"
             @click="_change(item.id)">{{item.name}}
        </div>
      </div>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list"
                    v-show="list.length">
        <div>
          <div class="order-item flex" v-for="item in list" v-if="activeId === 1">
            <img src="../../assets/img/user1.png"/>
            <span class="flex order-title">充值</span>
            <div class="flex fw">
              <span class="flex order-price">{{item.price}}</span>
              <span class="flex order-time">{{item.time}}</span>
            </div>
          </div>

          <div class="order-item flex" v-for="item in list" v-if="activeId === 2">
            <img src="../../assets/img/user3.png"/>
            <span class="flex order-title">提现<i style="color: #B53FE2; text-indent: 0;">{{item.money}}</i>元</span>
            <div class="flex fw">
              <span class="flex" :class="statusClass(item.status)">{{item.status === 1 ? '审核中' : '已完成'}}</span>
              <span class="flex order-time">{{item.time}}</span>
            </div>
          </div>
        </div>
      </betterscroll>
      <empyt v-show="!list.length" :padding="90"></empyt>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import empyt from 'base/empyt/empyt'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {orders, withdraw_list} from 'api/index'
  import {timeformat} from 'common/js/util'

  export default {
    name: 'recharge',
    data() {
      return {
        btn_list: [{
          id: 1,
          name: '充值记录'
        }, {
          id: 2,
          name: '提现记录'
        }],
        activeId: 1,
        list: [],
        num: 10,
        page: 0,
        total: 0,
        timer: null
      }
    },
    mounted() {
      // console.log(parseInt(this.$route.query.id))
      this.activeId = parseInt(this.$route.query.id)
      this.$refs.wrapper._initScroll()
      this._getInfo()
    },
    computed: {
      statusClass() {
        return (status) => {
          return `order-status${status}`
        }
      }
    },
    methods: {
      _change(id) {
        if (this.timer) {
          this.$root.eventHub.$emit('titps', `请勿频繁点击`)
          return false
        }
        if (this.activeId !== id) {
          this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.timer = null
          }, 600)
          this.activeId = id
          this._pulldown()
        }
      },
      async _getOrder() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await orders(this.$root.user.username, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.list = [...this.list, ...this._format(ret.data.data.ret)]
          this.total = ret.data.data.count
        }
      },
      async _getWithdrawList() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await withdraw_list(this.$root.user.username, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.list = [...this.list, ...this._format(ret.data.data.ret)]
          this.total = ret.data.data.count
        }
      },
      _format(list) {
        if (!list || !list.length) {
          return []
        }
        list.forEach((res) => {
          if (res.create) {
            res.time = timeformat(res.create)
          }
        })
        return list
      },
      _getInfo() {
        if (this.activeId === 1) {
          this._getOrder()
        } else {
          this._getWithdrawList()
        }
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        this._getInfo()
      },
      _scrollToEnd() {
        if (this.list.length < this.total) {
          this.page += 1
          this._getInfo()
        }
      },
    },
    components: {
      back,
      empyt,
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 92%;
    left: 50%;
    transform: translate(-50%, 0);
    position: absolute;
    top: 110px;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    /*border-radius: 10px;*/
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .order-item {
    height: 88px;
    width: 92%;
    border-bottom: 1px solid #f8f8f8;
    justify-content: flex-start;
    margin: 0 auto;
  }

  .order-item img {
    width: 48px;
    height: auto;
  }

  .order-price {
    justify-content: flex-end;
    color: #B53FE2;
    margin-bottom: 5px;
  }

  .order-time {
    justify-content: flex-end;
  }

  .order-title {
    justify-content: flex-start;
    text-indent: 20px;
  }

  .order-status1{
    justify-content: flex-end;
    color: #FF3939;
    margin-bottom: 5px;
  }
  .order-status2{
    justify-content: flex-end;
    color: #1BA02B;
    margin-bottom: 5px;
  }
</style>
