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
          <div></div>
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">作品链接:</div>
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">商品数量:</div>
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">所需金额:</div>
        </div>
      </div>
      <div class="index-btn flex ll mg10">提交订单</div>
    </div>
  </transition>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        title: ['抖音1', '抖音刷粉丝', '抖音2',]
      }
    },
    created() {

    },
    mounted() {
    },
    computed: {},
    methods: {},
    components: {}
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

  .from-item{
    width: 88%;
    height: 35px;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 3px;
    justify-content: flex-start;
  }
  .from-item-left{
    height: 100%;
    width: 32%;
  }
</style>
