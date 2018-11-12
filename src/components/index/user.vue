<template>
  <transition name="list">
    <div>
     <div class="user-header">
       <div class="user-header-inner-warp flex">
        <div class="flex js uhiw-top">
          <userheader></userheader>
        </div>
        <div class="flex js uhiw-bottom s">
          <router-link tag='div' :to='item.path' class="flex fw" v-for="item in user_route" :key='path'>
            <img :src="item.icon" class="iconsss">
            <span class="flex mg10">{{item.name}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <!--<div class="order-btn-list-warp flex mg10">-->
      <!--<router-link tag='div' to='./recharge-record?ativerecord=1' class="oblw-item flex">-->
        <!--<i class="iconfont icon-chongzhijilu maxmaxmax"></i>-->
        <!--<span class="flex oblw-title s mg10">充值记录</span>-->
      <!--</router-link>-->
      <!--<router-link tag='div' to='./recharge-record?ativerecord=2' class="oblw-item flex">-->
        <!--<i class="iconfont icon-tixianjilu maxmax"></i>-->
        <!--<span class="flex oblw-title s" style="margin-top: 15px;">提现记录</span>-->
      <!--</router-link>-->
      <!--<router-link tag='div' to='./transaction-record' class="oblw-item flex">-->
        <!--<i class="iconfont icon-jiaoyijilu maxmaxmaxs" style="transform: translate(0, -5px);"></i>-->
        <!--<span class="flex oblw-title s" style="margin-top: 5px;">交易记录</span>-->
      <!--</router-link>-->
    <!--</div>-->
    <!--<div class="flex mg10"></div>-->
    <!--<router-link tag='div' to='./strategy' class="user-list-item flex">-->
      <!--<i class="iconfont icon-xinshoubangzhu uli-icon xx"></i>-->
      <!--<span class="uli-title flex">新手攻略</span>-->
      <!--<img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">-->
    <!--</router-link>-->
    <!--<router-link tag='div' to='./introduce' class="user-list-item flex">-->
      <!--<i class="iconfont icon-jieshao uli-icon xx"></i>-->
      <!--<span class="uli-title flex">平台介绍</span>-->
      <!--<img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">-->
    <!--</router-link>-->
    <!--<router-link tag='div' to='./skill' class="user-list-item flex">-->
      <!--<i class="iconfont icon-yongjin uli-icon xx"></i>-->
      <!--<span class="uli-title flex">传播技巧</span>-->
      <!--<img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">-->
    <!--</router-link>-->
    <!-- <router-link tag='div' to='./inlet' class="user-list-item flex">
      <i class="iconfont icon-rukou uli-icon xx"></i>
      <span class="uli-title flex">平台入口</span>
      <img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">
    </router-link> -->
    <!-- <img src="https://cdn.xingkwh.com/kefu2.png" class="kefu-img"> -->
    <div class="footer-none"></div>
  </div>
</transition>
</template>
<script type="text/javascript">
  // import { mapGetters } from 'vuex'
  import userheader from 'components/userheader/userheader'
  export default {
    data() {
      return {
        user_route: [{
          icon: 'https://cdn.xingkwh.com/%E8%B4%AD%E4%B9%B0%E8%AE%B0%E5%BD%95.png',
          path: './recharge-record?ativerecord=1',
          name: '购买记录'
        },{
          icon: 'https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E8%AE%B0%E5%BD%95.png',
          path: './recharge-record?ativerecord=2',
          name: '提现记录'
        },{
          icon: 'https://cdn.xingkwh.com/%E4%B8%8B%E5%8D%95%E8%AE%B0%E5%BD%95.png',
          path: './order-record',
          name: '下单记录'
        }]
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
    },
    components: {
      userheader
    },
    watch: {
      '$route' (to, from) {
        try{
          if (to.query.ativerecord) {
            this.$root.eventHub.$emit('ativerecord', to.query.ativerecord)
          }
        } catch(err){
          console.log(err)
        }
      }
    }
  }

</script>
<style type="text/css" scoped>
.user-header{
  width: 100%;
  padding-top: 50%;
  /*border-radius: 8px;*/
  position: relative;
  background: #524E4B;
  overflow: hidden;
}
.user-header-inner-warp{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: flex-start;
  flex-wrap: wrap;
}
.order-btn-list-warp{
  width: 95%;
  height: 100px;
  overflow: hidden;
  padding-left: 3%;
}
.oblw-item{
  height: 100%;
  margin-right: 3.3%;
  flex-grow: 1;
  background: #27283A;
  border-radius: 5px;
  flex-wrap: wrap;
}
.nw-item{
  height: 25px;
  color: #353535;
}
.uhiw-top{
  height: 60%;
}
.uhiw-bottom{
  height: 40%;
  color: #fff;
}
.uhiw-btn{
  width: 42%;
  margin-left: 5%;
  flex-grow: 0;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #99691A;
  color: #99691A;
  font-weight: 600;
}
.oblw-title{
  color: #8284A0;
}
.user-list-item{
  height: 54px;
}
.uli-icon{
  margin: 0 20px;
  flex-shrink: 0;
  color: #F3A523;
}
.uli-title{
  height: 100%;
  flex-grow: 1;
  justify-content: flex-start;
}
.icon-img{
  width: 20px;
  height: auto;
  margin: 0 14px;
}
</style>
