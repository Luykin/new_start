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
          {{item.name}}
        </router-link>
      </div>
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
          icon: null
        },{
          name: '绑定手机号',
          path: '/phone',
          icon: null
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
    width: 38%;
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
    content: '>';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%) scale(1, 2);
    font-size: 16px;
    color: #C1C1C1;
  }

  .padding-none{
    padding: 0;
  }
</style>
