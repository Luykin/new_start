<template>
  <transition name="list">
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="task-info flex user-path">
        <!--<div v-for="item in user_config" class="user-path-item flex">{{item.name}}</div>-->
        <router-link tag='div' :to='item.path' class="user-path-item flex" v-for="item in user_config" :key='path'>
          {{item.name}}
        </router-link>
      </div>
      <div class="task-info">

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
          icon: '',
          path: '/manage'
        }, {
          name: '我的任务',
          icon: '',
          path: '/index'
        }, {
          name: '充值记录',
          icon: '',
          path: '/index'
        }, {
          name: '提现记录',
          icon: '',
          path: '/index'
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
    color: #444;
  }
</style>
