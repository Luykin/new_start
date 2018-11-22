<template>
  <div class="multi-body" :class="{'show':show}">
    <!--<div class="click-warp" v-if="show" @click="show = false"></div>-->
    <!--<div class="multi-warp" :class="{'hidden': !show}">-->
    <div class="flex multi-inner-warp fw js">
      <h1 class="flex multi-inner-title js">商品选择</h1>
      <div v-for="item in multi_list" class="flex multi-item ell fw ss" @click="$emit('chose', item)"
           :class="{'active-item': active_id === item.id, 'behavior-item': item.behavior === 0}">
        <img :src="item.icon"/>
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      multi_list: {
        type: Array,
        default: []
      },
      active_id: {
        type: Number,
        default: 0
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .multi-body {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background: rgba(55, 54, 87, .97);
    padding-top: 146%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    transform: translate3d(0, 100%, 0);
    transition: all .6s;
  }

  .show {
    transform: translate3d(0, 0, 0);
  }

  .multi-inner-warp {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .multi-item{
    max-width: 33.33%;
    margin: 10px 0;
    color: #BFBDE3;
  }
  .multi-item img{
    width: 50%;
    margin: 8px 50%;
    border-radius: 1000px;
  }

  .multi-inner-title{
    height: 100px;
    text-indent: 40px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
  .active-item{
    color: #fff;
  }
  .active-item img{
    filter: contrast(200%) brightness(110%);
    box-shadow: 0 0 10px rgba(0,0,0,.1);
  }
  .behavior-item{
    filter: grayscale(100%);
    /*filter: contrast(100%) brightness(100%);*/
  }
</style>
