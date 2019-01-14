<template>
  <div class="user-header-warp">
    <div class="top flex">
      <img :src="$root.user.avatar" class="header-avater"/>
      <div class="user-name flex fw">
        <span class="ell name" :class="{'login': !$root.user.username}"
              @click="_reload()">{{$root.user.nickname}}</span>
        <span class="flex js ell">ID: {{$root.user.username||'登录失败'}}</span>
      </div>
      <div class="flex btn-warp">
        <router-link tag='div' to='./good' class="flex btn top-btn line-back">充值</router-link>
        <!--<div class="flex btn top-btn line-back">充值</div>-->
      </div>
    </div>
    <div class="bottom flex">
      <div class="flex fw border-scored">
        <span class="flex number">{{$root.user.price}}</span>
        <span class="flex num-title">收益余额(元)</span>
      </div>
      <div class="flex fw">
        <span class="flex number">{{$root.user.score}}</span>
        <span class="flex num-title">充值余额(元)</span>
      </div>
      <div class="flex fw btn-warp">
        <router-link tag='div' to='./withdrawal' class="flex btn bottom-btn">提现</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userheader',
    methods: {
      _reload() {
        if (!this.$root.user.username) {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/dgz&response_type=code&scope=snsapi_userinfo#wechat_redirect\n'
        }
      },
    }
  }
</script>

<style scoped>
  .user-header-warp {
    width: 100%;
    height: 100%;
    max-height: 400px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .1);
    position: relative;
    color: #fff;
    font-size: 13px;
  }

  /*.user-header-warp:after{*/
  /*content: '';*/
  /*position: absolute;*/
  /*z-index: -1;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*top: 0;*/
  /*background: rgba(112,21,253, .5);*/
  /*background: linear-gradient(to bottom, rgba(255,255,255,.35) 52%, rgba(112,21,253, .55) 48%);*/
  /*filter: drop-shadow(0 0 50px rgba(255,255,255,.9));*/
  /*box-shadow: inset 0 3px 2px 0 #BFABEC;*/
  /*}*/

  .user-header-warp:before {
    content: '';
    position: absolute;
    z-index: -2;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: url("https://cdn.xingkwh.com/%E9%A6%96%E9%A1%B5%E5%A4%B4%E8%83%8C%E6%99%AF@3x.png") no-repeat;
    background-size: 100% 100%;
    opacity: .88;
  }

  .top {
    width: 100%;
    height: 55%;
  }

  .bottom {
    width: 100%;
    height: 45%;
  }

  .number {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 7px;
  }

  .btn {
    width: 70%;
    height: 30px;
    border-radius: 1000px;
    font-size: 16px;
  }

  .bottom-btn {
    border: 1px solid #fff;
  }

  .btn-warp {
    width: 110px;
    max-width: 30%;
    flex-shrink: 0;
    flex-grow: 0;
    height: 100%;
  }

  .top-btn {
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
  }

  .header-avater {
    width: 63px;
    height: 63px;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: 1000px;
    margin: 0 15px;
  }

  .name {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .user-name {
    width: 0;
    height: 100%;
    flex-shrink: 1;
    flex-grow: 1;
  }

  .border-scored {
    border-right: 1px solid #D1A8FF;
    height: 20px;
  }

  .num-title {
    color: #D1A8FF;
  }

  .login {
    color: rgb(222, 242, 255);
  }
</style>
