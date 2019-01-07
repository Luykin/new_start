<template>
  <footer class="flex" v-show="show">
    <router-link tag='div' :to='item.path' class="footer-item flex sss fw" v-for="item in footer_config" :key='path'
                 :class="{'disable': item.disable}">
      <img :src="item.icon" class="footer-icon canUsed">
      <img :src="item.disabled" class="footer-icon disabled">
      <span class="flex mg5 ssss">{{item.name}}</span>
    </router-link>
    <div class="width-limit">
      <div class="add-task-btn flex" :class="{'show-add-task-btn': active}" @click="_toRelease"></div>
      <div class="push-btn flex line-back" @click="_showPushBotton" :class="{'active': active}">
        <i class="plush flex">+</i>
      </div>
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
          name: '',
          icon: null,
          path: '',
          disabled: null,
          disable: true
        }, {
          name: '推广',
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
  }

  .disable {
    pointer-events: none;
    user-select: none;
  }

  .width-limit {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 420px;
    min-width: 350px;
    margin: 0 auto;
    z-index: -1;
  }

  .push-btn {
    width: 14%;
    padding-top: 14%;
    border-radius: 1000px;
    position: absolute;
    left: 50%;
    top: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    transform: translate(-50%, -35%);
    overflow: hidden;
    transition: all .3s;
  }

  .plush {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    color: #fff;
    font-weight: 300;
    font-size: 55px;
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
    transform: translate(-50%, -35%) rotate(45deg);
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
</style>
