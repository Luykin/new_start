<template>
  <footer class="flex" v-show="show">
    <router-link tag='div' :to='item.path' class="footer-item flex sss fw" v-for="item in footer_config" :key='path'
                 :class="{'disable': item.disable}" v-if="item">
      <img :src="item.icon" class="footer-icon canUsed">
      <img :src="item.disabled" class="footer-icon disabled">
      <span class="flex mg5 ssss footer-item-name">{{item.name}}</span>
    </router-link>
    <div class="width-limit">
    <div class="add-task-btn flex" :class="{'show-add-task-btn': active}" @click="_toRelease"></div>
    <div class="push-btn flex" @click="_showPushBotton">
    <i class="plush flex" :class="{'active': active}"></i>
    </div>
    <div class="push-btn-border"></div>
    </div>
  </footer>
</template>

<script>
  const router_list = ['/index', '/hall', '/commision', '/user']
  export default {
    data() {
      return {
        show: true,
        active: null,
        footer_config: [{
          name: '推荐',
          icon: require('../../assets/img/footer3.png'),
          disabled: require('../../assets/img/disable3.png'),
          path: '/index'
        }, {
          name: '大厅',
          icon: require('../../assets/img/footer1.png'),
          disabled: require('../../assets/img/disable1.png'),
          path: '/hall'
        }, {
          name: '发布',
          icon: null,
          path: '',
          disabled: null,
          disable: true
          // name: '发布',
          // icon: require('../../assets/img/footer2.png'),
          // disabled: require('../../assets/img/disable2.png'),
          // path: '/release'
        }, {
          name: '榜单',
          icon: require('../../assets/img/footer2.png'),
          disabled: require('../../assets/img/disable2.png'),
          path: '/commision'
        }, {
          name: '我的',
          icon: require('../../assets/img/footer4.png'),
          disabled: require('../../assets/img/disable4.png'),
          path: '/user'
        }]
      }
      // {
      //   // name: '推广',
      //   // icon: require('../../assets/img/footer2.png'),
      //   // disabled: require('../../assets/img/footer2.png'),
      //   // path: '/release'
      // }
    },
    name: 'new-footer',
    methods: {
      _toRelease() {
        if (!this.$root.serverCache.ret.length) {
          return false
        }
        this.$router.push({
          path: './release'
        })
        this._showPushBotton()
      },
      _showPushBotton() {
        this.active = !this.active
      }
    },
    // watch: {
    //   '$route' : (oldRouter, newRouter) => {
    //     try {
    //       if (this.show && router_list.indexOf(newRouter.path) < 0) {
    //         this.show = null
    //       }
    //       if (!this.show && router_list.indexOf(newRouter.path) >= 0) {
    //         this.show = true
    //       }
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   }
    // }
  }
</script>

<style scoped>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 55px;
    z-index: 998;
    background: #fff;
    color: #999;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
  }

  .footer-item {
    height: 100%;
    flex-grow: 1;
    align-content: flex-end;
  }

  .disable {
    pointer-events: none;
    user-select: none;
  }

  .width-limit {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    height: 100%;
    max-width: 420px;
    min-width: 350px;
    margin: 0 auto;
    z-index: -1;
  }

  .push-btn {
    width: 16%;
    /*max-width: ;*/
    padding-top: 16%;
    border-radius: 1000px;
    position: absolute;
    left: 50%;
    top: 0;
    /*border: 3px solid #fff;*/
    /*box-shadow: 0 0 10px rgba(0, 0, 0, .2);*/
    transform: translate(-50%, -40%);
    overflow: hidden;
    /*transition: all .3s;*/
    background: url("https://cdn.xingkwh.com/%E9%A6%96%E9%A1%B5%E5%8F%91%E5%B8%83%E6%8C%89%E9%92%AE@3x%281%29.png") no-repeat center center;
    background-size: 100% 100%;
  }

  .plush {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    background: url("https://cdn.xingkwh.com/%E9%A6%96%E9%A1%B5%E5%8F%91%E5%B8%83%E6%8C%89%E9%92%AE+%E5%8A%A0%E5%8F%B7@3x.png") no-repeat center center;
    background-size: 100% 100%;
    transition: all .3s;
    /*transform: translate(0, -2px);*/
  }

  .add-task-btn {
    width: 40%;
    padding-top: 30%;
    position: absolute;
    left: 50%;
    top: -50%;
    transform: translate(-50%, -100%) scale(0, 0);
    transition: all .3s;
    transform-origin: bottom center;
    background: url("https://cdn.xingkwh.com/newTask.png") no-repeat;
    background-size: 100% 100%;
  }

  .show-add-task-btn {
    transform: translate(-50%, -100%) scale(1, 1);
  }

  .active {
    transform: rotate(45deg);
  }

  .footer-icon {
    max-width: 28px;
    width: 29%;
    margin: 1px auto;
    height: auto;
    /*filter: grayscale(100%);*/
  }

  .canUsed {
    display: none;
  }

  .router-link-active .canUsed {
    display: block;
  }

  .disabled {
    display: block;
  }

  .router-link-active .disabled {
    display: none;
  }

  .footer-item-name {
    margin-bottom: 6%;
  }
</style>
