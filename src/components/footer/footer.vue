<template>
  <footer class="flex">
    <router-link tag='div' :to='item.path' class="footer-item flex sss fw" v-for="item in footer_config" :key='path'>
      <i class="iconfont x" :class="item.icon" ></i>
      <span class="flex mg5 ssss">{{item.name}}</span>
    </router-link>
  </footer>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      footer_config:[{
        name: '首頁',
        icon: 'icon-shouye',
        path: '/index'
      },{
        name: '傭金',
        icon: 'icon-qunzu',
        path: '/commision'
      },{
        name: '我的',
        icon: 'icon-wode',
        path: '/user'
      }]
    }
  },
  computed: {

  },
  created() {
  }
}

</script>
<style type="text/css" scoped>
footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 55px;
  border-top: 1px solid rgba(0,0,0,.1);
  z-index: 9999;
  background: #fff;
  color: #8E8E93;
  box-shadow: 0 0 2px rgba(0,0,0,.1);
}
.footer-item{
  height: 100%;
  flex-grow: 1;
}
.router-link-active{
  color: #FF4830;
  background: #f8f8f8;
}
</style>
