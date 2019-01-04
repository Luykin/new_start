<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="cachet flex js">
        <div class="cachet-item flex" v-for="item in btn_list" :class="{'active-cachet-item': item.id === activeId}" @click="_change(item.id)">{{item.name}}</div>
      </div>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list" v-if="list.length">
        <div>
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

  export default {
    name: 'recharge',
    data() {
      return{
        btn_list: [{
          id: 1,
          name: '充值记录'
        },{
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
      this.$refs.wrapper._initScroll()
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

      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        if (this.activeId === 1) {
          this._getOrder()
        }
        // this._getMyTask()
      },
      _scrollToEnd() {
        // if (this.list.length < this.total) {
        //   this.page += 1
        //   this._getMyTask()
        // }
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
</style>
