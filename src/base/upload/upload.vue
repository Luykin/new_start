<template>
  <div class="hidden">
    <input type="file" accept="image/*" class="file" ref="file" @change="_preview($event)"/>
    <canvas ref="spread" width="300" height="485" class="spread hidek" style="width: 600px; height: 970px;"></canvas>
    <img class="spreadimg hidek" @load="_setcanvas" ref="spreadimg"/>
  </div>
</template>

<script>
  import {up_token, jsapi_code} from 'api/index'
  // import {jsapi_code} from 'api/index'

  export default {
    name: 'upload',
    data() {
      return {
        key: ''
      }
    },
    created() {
      // this._getJsapiCode()
      // wx.config({
      //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //   appId: '', // 必填，公众号的唯一标识
      //   timestamp: '', // 必填，生成签名的时间戳
      //   nonceStr: '', // 必填，生成签名的随机串
      //   signature: '',// 必填，签名
      //   jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
      // });
    },
    mounted() {
      // this._getJsapiCode()
    },
    methods: {
      async _getJsapiCode() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await jsapi_code('dz1.ruooming.com')
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          console.log('配置jsapi')
          const data = ret.data.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.app_id, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.sign,// 必填，签名
            jsApiList: ['chooseImage', 'uploadImage', 'downloadImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表
          });
        } else {
          this.$root.eventHub.$emit('titps', ret)
        }
      },
      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: mime})
      },
      _setView(image) {
        let imgbg = document.querySelector('.spreadimg')
        imgbg.src = image
      },
      _setcanvas() {
        try {
          let canvas = document.querySelector('.spread');
          let imgbg = document.querySelector('.spreadimg');
          const canvasText = canvas.getContext('2d');
          canvas.height = canvas.height;
          canvasText.drawImage(imgbg, 0, 0, 300, 485)
          let files = this.dataURLtoFile(canvas.toDataURL('image/png'), this.key)
          this._qiniuUpload(files, this.key, this)
        } catch (err) {
          console.log(err)
          return false
        }
      },
      _imitateClick() {
        console.log('点击上传')
        this.$refs.file.click()
        // this._wxChooseImage()
      },
      _wxChooseImage() {
        const that = this
        wx.ready(() => {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              try {
                setTimeout(() => {
                  var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                  that.$emit('view', localIds)
                  // 兼容ios渲染
                  try{
                    var u = navigator.userAgent, app = navigator.appVersion;
                    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if (isIOS) {
                      wx.getLocalImgData({
                        localId: localIds.toString(), // 图片的localID
                        success: function (res) {
                          var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                          that.$emit('view', localData)
                        }
                      });
                    }
                  } catch (e) {
                    console.log(e)
                  }
                  let proess = Math.random();
                  that.$emit('setprocess', {
                    total: {
                      percent: proess
                    }
                  })
                  let timer = setInterval(() => {
                    if (proess > 88) {
                      clearInterval(timer)
                      return false
                    }
                    proess += Math.random() * 10;
                    that.$emit('setprocess', {
                      total: {
                        percent: proess
                      }
                    })
                  }, 300)
                  wx.uploadImage({
                    localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                      var serverId = res.serverId; // 返回图片的服务器端ID
                      that.$emit('success', {
                        key: serverId
                      })
                      clearInterval(timer)
                      that.$emit('setprocess', {
                        total: {
                          percent: 100
                        }
                      })
                    }
                  });
                }, 200);
              } catch (e) {
                alert(e)
              }
            }
          });
        })
      },
      _preview() {
        try {
          this._clear()
          let files = this.$refs.file.files[0]
          if (!files) {
            this.$root.eventHub.$emit('titps', `没有选择图片哦`)
            return false
          }
          if (files.size > 10500000) {
            this.$root.eventHub.$emit('titps', `请选择小于10M的图片~`)
            return false
          }
          if (!files.size) {
            this.$root.eventHub.$emit('titps', `请从[相册]中选择图片~`)
            this._clear()
            return false
          }
          this.key = 'DGZ_user' + (Math.random() + +new Date()) + '.png'
          let reader = new FileReader()
          reader.readAsDataURL(files)
          reader.onload = (e) => {
            this.$root.eventHub.$emit('titps', `开始上传图片`)
            this.$emit('view', e.target.result)
            this._setView(e.target.result)
          }
        } catch (e) {
          console.log(e)
        }
      },
      _clear() {
        console.log('清空画布')
        let canvas = document.querySelector('.spread')
        this.key = ''
        this.$emit('view', null)
        this.$emit('setprocess', 0)
        canvas.height = canvas.height;
        this.$refs.file.value = ''
        this.$refs.spreadimg.src = null
      },
      async _qiniuUpload(file, key, that, update) {
        console.log('开始上传')
        const ret = await up_token()
        if (ret.status === 200 && ret.data.code === 200) {
          const putExtra = {
            fname: key,
            params: {},
            mimeType: ['image/png', 'image/jpeg', 'image/gif'] || null
          }
          const config = {
            useCdnDomain: true,
            region: qiniu.region.z2
          }
          let observable = window.qiniu.upload(file, key, ret.data.data.uptoken, putExtra, config)
          const observer = {
            next(res) {
              that.$emit('setprocess', res)
            },
            error(err) {
              that._clear()
              that.$emit('err', err)
            },
            complete(res) {
              that.$emit('success', res)
              that.$root.eventHub.$emit('titps', `上传完成`)
              that.$refs.file.value = ''
              if (update) {
                that.$emit('view', `https://cdn.back.melonblock.com/${this.key}`)
              }
            }
          }
          let subscription = observable.subscribe(observer) // 上传开始
        }
        // console.log('上传失败')
        // console.log(file, key)
        // let observable = window.qiniu.upload(file, key, token, putExtra, config)
      },
    }
  }
</script>

<style scoped>
  .hidden {
    width: 0;
    height: 0;
    overflow: hidden;
    opacity: 0;
  }

  .file {
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;
  }

  .hidek {
    opacity: 0;
    position: fixed;
    z-index: -99;
    top: 1000px;
    left: 0;
  }
</style>
