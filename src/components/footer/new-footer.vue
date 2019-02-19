<template>
  <footer class="flex" v-show="show">
    <router-link tag='div' :to='item.path' class="footer-item flex sss fw" v-for="item in footer_config" :key='path'
                 :class="{'disable': item.disable}" v-if="item">
      <img :src="item.icon" class="footer-icon canUsed">
      <img :src="item.disabled" class="footer-icon disabled">
      <span class="flex mg5 ssss footer-item-name">{{item.name}}</span>
    </router-link>
    <div class="width-limit">
      <!--<div class="add-task-btn flex" :class="{'show-add-task-btn': active}" @click="_toRelease"></div>-->
      <div class="push-btn flex" @click="_showPushBotton">
        <i class="plush flex"></i>
      </div>
      <div class="push-btn-border"></div>
    </div>
    <div class="choice-layer flex fw" :class="{'active-layer': active}" @click="_showPushBotton">
      <img src="https://cdn.xingkwh.com/logo%202.png" class="logo-img"/>
      <div class="icon-box-warp flex fw">
        <div class="flex ibw-title">请选择您悬赏的</div>
        <div class="flex ibw-title">任务类型</div>
        <div class="ibw-item flex ell fw" @click.stop="_toReplease(1)">
          <img src="https://cdn.xingkwh.com/%E6%8A%96%E9%9F%B3%E6%82%AC%E8%B5%8Ficon@3x.png"/>
          抖音悬赏
        </div>
        <div class="ibw-item flex ell fw" @click.stop="_toReplease(2)">
          <img src="https://cdn.xingkwh.com/%E5%BF%AB%E6%89%8B%E6%82%AC%E8%B5%8Ficon@3x.png"/>
          快手悬赏
        </div>
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
      // _toRelease() {
      //   if (!this.$root.serverCache.ret.length) {
      //     return false
      //   }
      //   this.$router.push({
      //     path: './release'
      //   })
      //   this._showPushBotton()
      // },
      _showPushBotton() {
        this.active = !this.active
      },
      _toReplease(type) {
        this.$root.eventHub.$emit('chose_type', type)
        this.$router.push({
          name: 'release',
          params: {
            type
          }
        })
        this._showPushBotton()
      },
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
    margin-bottom: 5px;
  }

  .choice-layer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, .75);
    overflow: hidden;
    z-index: 99999;
    color: #fff;
    align-items: flex-end;
    align-content: flex-end;
    /*transform: translate3d(0, 100%, 0);*/
    transform: scale(0, 0);
    border-radius: 1000px;
    transition: all .2s;
    transform-origin: center 93%;
  }

  .active-layer {
    transform: scale(1, 1);
    border-radius: 0;
  }

  .icon-box-warp {
    width: 100%;
    height: 200px;
    margin-bottom: 60px;
  }

  .ibw-item {
    width: 15%;
    margin: 30px 10% 0;
  }

  .ibw-item img {
    width: 100%;
    height: auto;
    margin: 0 0 12px 0;
  }

  .ibw-title {
    height: 35px;
    font-size: 18px;
    font-weight: 600;
  }

  .logo-img {
    width: 40%;
    height: auto;
    max-width: 157px;
    min-width: 117px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
