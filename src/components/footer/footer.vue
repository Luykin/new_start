<template>
  <transition name="list">
    <footer class="flex" v-if="config">
      <router-link tag='div' :to='item.path' class="footer-item flex sss fw" v-for="item in footer_config" :key='path' v-show="item.system.indexOf(config.system) > -1">
        <!--<i class="iconfont x" :class="item.icon"></i>-->
        <img :src="item.icon">
        <span class="flex mg5 ssss">{{item.name}}</span>
      </router-link>
    </footer>
  </transition>
</template>
<script type="text/javascript">
  import {NOWCONFIG} from 'api/app_config'
  export default {
    data() {
      return {
        config: null,
        footer_config: [{
          name: '首页',
          icon: 'https://cdn.xingkwh.com/%E5%BA%95%E9%83%A8%E5%AF%BC%E8%88%AA-%E9%A6%96%E9%A1%B5%E9%80%89%E4%B8%AD@3x.png',
          path: '/index',
          system: [1, 2]
        },{
          name: '秘籍',
          icon: 'https://cdn.xingkwh.com/secret.png',
          path: '/secret',
          system: [1]
        }, {
          name: '团队',
          icon: 'https://cdn.xingkwh.com/%E5%BA%95%E9%83%A8%E5%AF%BC%E8%88%AA-%E5%9B%A2%E9%98%9F%E9%80%89%E4%B8%AD@3x.png',
          path: '/commision',
          system: [1]
        }, {
          name: '我的',
          icon: 'https://cdn.xingkwh.com/%E5%BA%95%E9%83%A8%E5%AF%BC%E8%88%AA-%E6%88%91%E7%9A%84%E9%80%89%E4%B8%AD@3x.png',
          path: '/user',
          system: [1, 2]
        }]
      }
    },
    computed: {},
    created() {
      this.config = NOWCONFIG
      // console.log([1].indexOf(this.config.system) > -1)
    }
  }

</script>
<style type="text/css" scoped>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 55px;
    border-top: 1px solid rgba(0, 0, 0, .1);
    z-index: 999;
    background: #3F3F60;
    color: #8E8E93;
    box-shadow: 0 0 2px rgba(0, 0, 0, .1);
  }

  .footer-item {
    height: 100%;
    flex-grow: 1;
  }

  .footer-item img {
    width: 28%;
    max-width: 32px;
    margin-bottom: -5px;
    height: auto;
    filter: grayscale(100%);
    transition: all .5s;
  }

  .footer-item span {
    height: 0;
    color: #F8E71C;
    overflow: hidden;
    transform: scale(.85, .85);
    transform-origin: center center;
    transition: all .5s;
  }

  .router-link-active img {
    filter: grayscale(0%);
  }

  .router-link-active span {
    height: 15px;
  }
</style>
