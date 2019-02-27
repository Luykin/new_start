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
        try {
          // console.log(this.url)
          if (this.url && this.url.indexOf('://') > -1) {
            // console.log('含有http')
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
        if (url && url.indexOf('://') > -1) {
          // console.log('含有http')
          this.$emit(`load`, {
            url: url,
            index: this.index
          })
          return false
        }
        try {
          wx.ready(() => {
            setTimeout(() => {
              wx.downloadImage({
                serverId: url.toString(), // 需要下载的图片的服务器端ID，由uploadImage接口获得
                isShowProgressTips: 0, // 默认为1，显示进度提示
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
