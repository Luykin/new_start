<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <userheader></userheader>
      <div class="task-info flex fw js">
        <div class="normal-title flex">选择充值的金额</div>
        <div class="good-item flex" v-for="item in goods_list" :class="{'active-good-item': activeId === item.id}"
             @click="_chose(item.id)">{{item.label}}
        </div>
        <div class="task-btn flex line-back">支付</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import {goods} from 'api/index'
  import userheader from 'components/userheader/minUserHeader'

  export default {
    name: 'good',
    data() {
      return {
        goods_list: [],
        activeId: null
      }
    },
    created() {
      this._init()
    },
    methods: {
      _init() {
        this._getGoods(0)
      },
      _chose(id) {
        this.activeId = id
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
