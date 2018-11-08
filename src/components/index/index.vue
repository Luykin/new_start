<template>
  <transition name="list">
    <div>
      <div class="index-header flex">
        <div class="flex header-item ll" v-for="(item, index) in title" :class="{'active-header-item': index === 0}">
          <span>{{item}}</span>
        </div>
      </div>
      <div style="height: 50px;"></div>
      <div class="tips-warp flex mg10"></div>
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
  .tips-warp{
    width: 90%;
    min-height: 160px;
    /*background: ;*/
  }
</style>
