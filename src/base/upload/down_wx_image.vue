<template>
  <div></div>
</template>

<script>
  // import {jsapi_code} from 'api/index'
  export default {
    name: 'down_wx_image',
    props: {
      url: '',
      index: 0,
      config: null
    },
    created() {
      this._setJsapiCode()
    },
    mounted() {
    },
    methods: {
      async _setJsapiCode() {
        const that = this
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: that.config.app_id, // 必填，公众号的唯一标识
          timestamp: that.config.timestamp, // 必填，生成签名的时间戳
          nonceStr: that.config.noncestr, // 必填，生成签名的随机串
          signature: that.config.sign,// 必填，签名
          jsApiList: ['chooseImage', 'uploadImage', 'downloadImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表
        })
        // alert('配置完成')
        try {
          console.log(this.url)
          if (this.url && this.url.indexOf('http') > -1) {
            console.log('含有http')
            this.$emit(`load`, {
              url: this.url,
              index: this.index
            })
            return false
          }
          this._loadUrl(this.url)
        } catch (e) {
          console.log(e)
        }
      },
      _loadUrl(url) {
        const that = this
        // console.log('加载wx图片')
        if (!url) {
          return false
        }
        try {
          wx.ready(() => {
            setTimeout(() => {
              wx.downloadImage({
                serverId: url.toString(), // 需要下载的图片的服务器端ID，由uploadImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                  var localId = res.localId // 返回图片下载后的本地ID
                  that.$emit(`load`, {
                    url: localId,
                    index: that.index
                  })
                },
                fail: function (err) {
                }
              })
            },0)
          })
        } catch (e) {
          alert(e)
        }
      },
    },
  }
</script>

<style scoped>

</style>
