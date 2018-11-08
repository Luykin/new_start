<template>
  <transition name="list">
    <div>
      <div class="index-header flex">
        <div class="flex header-item ll" v-for="(item, index) in title" :class="{'active-header-item': index === 0}">
          <span>{{item}}</span>
        </div>
      </div>
      <div style="height: 50px;"></div>
      <div class="tips-warp flex mg10">
        <h1 class="flex lll tips-title">小贴士</h1>
      </div>
      <div class="from-warp flex mg10 fw">
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">商品选择:</div>
          <div class="flex from-item-right xenia" @click.stop="multi_show = !multi_show">
            抖音粉丝
            <multi :multi_list="good_list" :show="multi_show" :active_id="active_id" @chose="_multiChose"></multi>
          </div>
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">作品链接:</div>
          <div class="flex from-item-right">
            <input type="text" name="作品链接" placeholder="请输入作品链接" class="index-input" v-model="link" />
            <div class="flex course-btn ell">查看教程</div>
          </div>
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">商品数量:</div>
          <div class="flex from-item-right">
            <input type="text" name="作品链接" placeholder="请输入商品数量" class="index-input" v-model="num" />
          </div>
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">所需金额:</div>
          <div class="flex from-item-right">1*99=99</div>
        </div>
      </div>
      <div class="index-btn flex ll mg10">提交订单</div>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import {login} from 'api/index'
  import multi from 'base/multi/multi'
  export default {
    data() {
      return {
        title: ['抖音1', '抖音刷粉丝', '抖音2',],
        multi_show: false,
        active_id: 0,
        good_list: [{
          id: 0,
          label: '抖音1'
        },{
          id: 1,
          label: '抖音2'
        },{
          id: 3,
          label: '抖音3'
        }],
        link: '',
        num: ''
      }
    },
    created() {
      this._init()
    },
    mounted() {
    },
    computed: {},
    methods: {
      _init() {
        this._login()
      },
      async _login() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await login('dGJDKA4561')
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
        }
      },
      _multiChose(e) {
        this.active_id = e.id
      }
    },
    components: {
      multi
    }
  }

</script>
<style type="text/css" scoped>
  .index-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, .1);
  }

  .header-item {
    flex-grow: 1;
  }

  .active-header-item {
    color: #000;
  }

  .active-header-item span {
    position: relative;
  }

  .active-header-item span:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 4px;
    width: 100%;
    background: linear-gradient(right, #FF1212, #FFCF41);
    opacity: .8;
    border-radius: 10px;
    transform: translate(-50%, 0);
  }

  .tips-warp {
    width: 90%;
    min-height: 60px;
    background: #FFEEE8;
    color: #FF551F;
    border-radius: 8px;
    align-items: flex-start;
  }

  .from-warp {
    width: 90%;
    min-height: 100px;
    background: #fff;
    border-radius: 8px;
    padding-bottom: 20px;
    align-items: flex-start;
  }

  .tips-title {
    width: 90%;
    height: 50px;
    text-indent: 35px;
    justify-content: flex-start;
    background: url("https://cdn.xingkwh.com/%E5%B0%8F%E8%B4%B4%E5%A3%ABicon.png") no-repeat;
    background-size: 28px auto;
    background-position: 0 46%;
  }

  .index-btn {
    width: 90%;
    height: 45px;
    border-radius: 8px;
    color: #fff;
    background: linear-gradient(right, #FF561E, #FF2966);
  }

  .from-item {
    width: 88%;
    height: 35px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 3px;
    justify-content: flex-start;
  }

  .from-item-left {
    height: 100%;
    width: 32%;
    flex-shrink: 0;
  }
  .from-item-right{
    flex-grow: 1;
    height: 100%;
    justify-content: flex-start;
    text-indent: 20px;
    position: relative;
    color: #666;
  }
  .xenia{
    color: #353535;
    background: url("https://cdn.xingkwh.com/%E5%95%86%E5%93%81%E9%80%89%E6%8B%A9@2x.png") no-repeat;
    background-size: 15px auto;
    background-position: 94% center;
  }
  .index-input{
    text-indent: 20px;
    color: #353535;
  }
  .course-btn{
    background: #FF2E5D;
    color: #fff;
    font-size: 12px;
    width: 50px;
    height: 80%;
    flex-shrink: 0;
    text-align: center;
  }
</style>
