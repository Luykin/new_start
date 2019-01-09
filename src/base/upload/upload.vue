<template>
  <div class="hidden">
    <input type="file" accept="image/*" class="file" ref="file" @change="_preview($event)"/>
    <canvas ref="spread" width="300" height="485" class="spread hidek" style="width: 390px; height: 631px;"></canvas>
    <img class="spreadimg" @load="_setcanvas"/>
  </div>
</template>

<script>
  import { up_token } from 'api/index'
  export default {
    name: 'upload',
    data() {
      return{
        key: ''
      }
    },
    created() {
    },
    mounted() {
      // console.log(this.$refs.file)
    },
    methods: {
      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
      },
      _setView(image) {
        let imgbg = document.querySelector('.spreadimg')
        imgbg.src = image
      },
      _setcanvas() {
        try {
          let canvas = document.querySelector('.spread')
          let imgbg = document.querySelector('.spreadimg')
          // 对图像进行压缩
          canvas.getContext('2d').drawImage(imgbg, 0, 0, 300, 485)
          let files = this.dataURLtoFile(canvas.toDataURL('image/png'), this.key)
          console.log(`压缩文件:${files} 大小${files.size}`)
          let reader = new FileReader()
          reader.readAsDataURL(files)
          reader.onload = (e) => {
            console.log(e)
          }
          this._qiniuUpload(files, this.key||new Date())
        } catch (err) {
          console.log(err)
          return false
        }
      },
      // this.$refs.file.click()
      _imitateClick() {
        this.$refs.file.click()
      },
      _preview() {
        try {
          let files = this.$refs.file.files[0]
          if (files.size > 10542880) {
            this.$root.eventHub.$emit('titps', `请选择小于10M的图片~`)
            return false
          }
          this.key = 'DGZ用户传图' + Date.parse(new Date()) + '.png'
          // this._qiniuUpload(files, key)
          console.log(`源文件:${files} 大小${files.size}`)
          let reader = new FileReader()
          reader.readAsDataURL(files)
          reader.onload = (e) => {
            console.log(e)
            this.$emit('view', e.target.result)
            this._setView(e.target.result)
          }
        } catch (e) {
          console.log(e)
        }
      },
      async _qiniuUpload(file, key) {
        const ret = await up_token()
        if (ret.status === 200 && ret.data.code === 200) {
          const that = this
          const putExtra = {
            fname: key,
            params: {},
            mimeType: ["image/png", "image/jpeg", "image/gif"] || null
          };
          const config = {
            useCdnDomain: true,
            region: qiniu.region.z2
          }
          let observable = window.qiniu.upload(file, key, ret.data.data.uptoken, putExtra, config)
          const observer = {
            next(res){
              that.$emit('setProcess', res)
            },
            error(err){
              console.log(err)
              that.$emit('err', err)
            },
            complete(res){
              console.log(res)
              that.$emit('success', res)
            }
          }
          let subscription = observable.subscribe(observer) // 上传开始
        }
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
</style>
