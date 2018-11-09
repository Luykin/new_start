<template>
  <div class="multi-body">
    <div class="click-warp" v-if="show" @click="show = false"></div>
    <div class="multi-warp" :class="{'hidden': !show}">
      <div v-for="item in multi_list" class="flex multi-item ell" @click="$emit('chose', item)"
           :class="{'active-item': active_id === item.id}">
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

  .multi-warp {
    height: auto;
    min-height: 30px;
    background: #fff;
    transform: scale(1, 1);
    transform-origin: left top;
    transition: all .3s;
    box-shadow: 0 0 6px rgba(0, 0, 0, .1);
  }

  .multi-item {
    width: 100%;
    height: 30px;
    text-indent: 20px;
    color: #353535;
    justify-content: flex-start;
  }

  .active-item {
    color: red;
    background: #f5f5f5;
  }

  .hidden {
    transform: scale(1, 0);
  }


  .click-warp {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0;
  }

  .multi-body {
    position: absolute;
    bottom: 2px;
    width: 101%;
    height: 0;
    z-index: 999;
    transition: all .3s;
    transform-origin: left bottom;
  }
</style>
