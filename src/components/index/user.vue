<template>
  <transition name="list">
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="task-info flex user-path">
        <!--<div v-for="item in user_config" class="user-path-item flex">{{item.name}}</div>-->
        <router-link tag='div' :to='item.path' class="user-path-item flex fw" v-for="item in user_config" :key='path'>
          <img :src="item.icon"/>
          {{item.name}}
        </router-link>
      </div>
      <div class="task-info padding-none">
        <router-link tag='div' :to='item.path' class="user_nav flex" v-for="item in user_nav" :key='path' v-if="!item.disable">
          <img :src="item.icon"/>
          <div class="user_name">
            {{item.name}}
            <div class="flex red-icon-read" v-if="item.path === '/report' && $root.user.need_deal_num">{{$root.user.need_deal_num}}</div>
          </div>
        </router-link>
      </div>
      <div class="footer-none"></div>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'

  export default {
    name: 'user',
    data() {
      return {
        user_config: [{
          name: '发布管理',
          icon: require('../../assets/img/user2.png'),
          path: '/manage'
        }, {
          name: '我的任务',
          icon: require('../../assets/img/user4.png'),
          path: '/myTask'
        }, {
          name: '充值记录',
          icon: require('../../assets/img/user3.png'),
          path: '/recharge?id=1'
        }, {
          name: '提现记录',
          icon: require('../../assets/img/user1.png'),
          path: '/recharge?id=2'
        }],
        user_nav: [{
          name: '举报维权',
          path: '/report',
          icon: require('../../assets/img/usericon3.png'),
        },{
          name: '绑定手机号',
          path: '/phone',
          icon: require('../../assets/img/usericon1.png'),
        },{
          name: '平台入口',
          path: '/phone',
          icon: null,
          disable: true
        }]
      }
    },
    created() {

    },
    components: {
      userheader
    }
  }
</script>

<style scoped>
  .header {
    width: 92%;
    height: 170px;
    margin: 10px auto 20px;
  }

  .user-path {
    height: 85px;
    padding: 0;
  }

  .user-path-item {
    height: 100%;
    color: #666;
  }

  .user-path-item img {
    width: 40.5%;
    max-width: 45px;
    min-width: 32px;
    height: auto;
    margin: 0 20% 8px;
  }

  .user_nav {
    width: 92%;
    height: 50px;
    color: #333333;
    margin: 0 auto;
    border-bottom: 1px solid #F8F8F8;
    position: relative;
    justify-content: flex-start;
  }

  .user_nav:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    background: url("https://cdn.xingkwh.com/awm.png") no-repeat center center;
    background-size: 100% auto;
    width: 8px;
    height: 100%;
  }

  .user_nav img {
    width: 26px;
    height: auto;
    margin: 0 10px 0 5px;
  }

  .padding-none{
    padding: 0;
  }

  .red-icon-read {
    position: absolute;
    right: 0;
    top: 0;
    /*min-width: 23px;*/
    width: 23px;
    height: 23px;
    border-radius: 100px;
    background: red;
    color: #fff;
    transform: translate(100%, -60%) scale(.8, .8);
  }

  .user_name{
    position: relative;
  }
</style>
