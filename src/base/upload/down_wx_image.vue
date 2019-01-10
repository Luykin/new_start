<template>
  <div></div>
</template>

<script>
  export default {
    name: 'down_wx_image',
    props: {
      url: '',
      index: 0
    },
    created() {
      try {
        console.log(this.url)
        if (this.url.indexOf('http') > -1) {
          console.log('含有http')
          this.$emit(`load`, {
            url: this.url,
            index: this.index
          })
          return false
        }
        this._loadUrl()
      } catch (e) {
        console.log(e)
      }
    },
    methods: {
      _loadUrl() {
        const that = this
        console.log('加载wx图片')
        try {
          wx.ready(() => {
            wx.downloadImage({
              serverId: this.url, // 需要下载的图片的服务器端ID，由uploadImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                var localId = res.localId // 返回图片下载后的本地ID
                that.$emit(`load`, {
                  url: localId,
                  index: that.index
                })
              }
            })
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
