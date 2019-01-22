<template>
  <transition name="list">
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="task-info flex user-path">
        <!--<div v-for="item in user_config" class="user-path-item flex">{{item.name}}</div>-->
        <router-link tag='div' :to='item.path' class="user-path-item flex fw" v-for="item in user_config" :key='path'>
          <div class="flex red-icon-read user-path-item-red" v-show="_calculationNumber(item.path)">
            {{_calculationNumber(item.path)}}
          </div>
          <img :src="item.icon"/>
          <div class="user-path-item-name flex">
            <span class="flex">{{item.name}}</span>
          </div>
        </router-link>
      </div>
      <div class="task-info padding-none">
        <router-link tag='div' :to='item.path' class="user_nav flex" v-for="item in user_nav" :key='path'
                     v-if="!item.disable">
          <img :src="item.icon"/>
          <div class="user_name flex js">
            <div class="flex js">
              <span style="position: relative">
                {{item.name}}
                <i class="flex red-icon-read" v-if="item.path === '/report' && $root.user.need_deal_num">{{$root.user.need_deal_num}}
                </i>
              </span>
            </div>
            <span class="flex" style="max-width: 38%" v-if="item.otherInfo">{{_initOtherInfo}}</span>
          </div>
        </router-link>
      </div>
      <div class="footer-none"></div>
      <router-view></router-view>
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
          name: '推广获取',
          path: '/user-commision',
          icon: require('../../assets/img/usericon7.png')
        },{
          name: '举报维权',
          path: '/report',
          icon: require('../../assets/img/usericon3.png'),
        }, {
          name: Boolean(this.$root.user.phone) ? `更换绑定` : '绑定手机号',
          path: '/phone',
          icon: require('../../assets/img/usericon1.png'),
          otherInfo: true,
          disable: true
        }, {
          name: '官方交流群',
          path: '/group',
          icon: require('../../assets/img/usericon2.png')
        }, {
          name: '商务合作',
          path: '/cooperate',
          icon: require('../../assets/img/usericon5.png')
        }, {
          name: '绑定微信',
          path: '/inlet',
          icon: require('../../assets/img/usericon6.png')
        }]
      }
    },
    computed: {
      // `${Boolean(this.$root.user.phone) ? this.$root.user.phone.slice(0,3)+'***'+this.$root.user.phone.slice(-3):''}`
      _initOtherInfo() {
        return `${Boolean(this.$root.user.phone) ? this.$root.user.phone.slice(0, 3) + '***' + this.$root.user.phone.slice(-3) : ''}`
      },
      _calculationNumber() {
        return (path) => {
          if (path === '/myTask') {
            try {
              return this.$root.user.u_pass_num + this.$root.user.u_fail_num + this.$root.user.u_current_num + this.$root.user.u_audit_num
            } catch (e) {
              console.log(e)
              return 0
            }
          }
          if (path === '/manage') {
            try {
              return this.$root.user.u_release_management_num
            } catch (e) {
              console.log(e)
              return 0
            }
          }
          return false
        }
      },
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
    position: relative;
  }

  .user-path-item-name {
    position: relative;
  }

  .user-path-item img {
    width: 40.5%;
    max-width: 45px;
    min-width: 32px;
    height: auto;
    margin: 0 20% 8px;
  }

  /*.user-path-item-img-warp{*/
  /*width: 40.5%;*/
  /*height: auto;*/
  /*position: relative;*/
  /*}*/

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

  .padding-none {
    padding: 0;
  }

  .user_name {
    position: relative;
  }

  .user_name span {
    height: 100%;
  }

  .user-path-item-red {
    right: 38%;
    top: 22%;
  }
</style>
