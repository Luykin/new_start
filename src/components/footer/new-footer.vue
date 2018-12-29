<template>
  <footer class="flex">
    <router-link tag='div' :to='item.path' class="footer-item flex sss fw" v-for="item in footer_config" :key='path'
                 :class="{'disable': item.disable}">
      <img :src="item.icon">
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
  export default {
    data() {
      return {
        active: null,
        footer_config: [{
          name: '推荐',
          icon: '',
          path: '/index'
        }, {
          name: '大厅',
          icon: '',
          path: '/index'
        }, {
          name: '',
          icon: '',
          path: '',
          disable: true
        }, {
          name: '推广',
          icon: '',
          path: '/commision'
        }, {
          name: '我的',
          icon: '',
          path: '/user'
        }]
      }
    },
    name: 'new-footer',
    methods: {
      _toRelease() {
        if (!this.$root.serverCache.length) {
          return false
        }
        this.$router.push({
          path: './release'
        })
        this._showPushBotton();
      },
      _showPushBotton() {
        this.active = !this.active
      }
    }
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
    transform: translate(0, -2px);
  }

  .add-task-btn{
    width: 40%;
    padding-top: 30%;
    position: absolute;
    left: 50%;
    top: -50%;
    transform: translate(-50%, -100%) scale(0, 0);
    transition: all .3s;
    transform-origin: bottom center;
    background: url("../../assets/img/newTask.png") no-repeat;
    background-size: 100% 100%;
  }


  .show-add-task-btn{
    transform: translate(-50%, -100%) scale(1, 1);
  }

  .active{
    transform: translate(-50%, -35%) rotate(45deg);
  }
</style>
