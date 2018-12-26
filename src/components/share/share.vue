<template>
    <div>
      分享
    </div>
</template>

<script>
  import { jsapi_code } from 'api/index'
  export default {
    name: 'share',
    created() {
      this._init()
    },
    methods: {
      _init() {
        // wx.config({
        //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //   appId: 'wx8c8084e0e0c2b623', // 必填，公众号的唯一标识
        //   timestamp: , // 必填，生成签名的时间戳
        //   nonceStr: '', // 必填，生成签名的随机串
        //   signature: '',// 必填，签名
        //   jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
        // });
      },
    }
  }
</script>

<style scoped>

</style>
