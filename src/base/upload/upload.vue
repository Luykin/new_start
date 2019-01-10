<template>
  <div class="hidden">
    <input type="file" accept="image/*" class="file" ref="file" @change="_preview($event)"/>
    <canvas ref="spread" width="300" height="485" class="spread hidek" style="width: 540px; height: 873px;"></canvas>
    <img class="spreadimg hidek" @load="_setcanvas" ref="spreadimg"/>
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
          //清空画布
          const canvasText = canvas.getContext('2d');
          // canvasText.clearRect(0,0,canvasText.width,canvasText.height);
          canvas.height = canvas.height;
          // 对图像进行压缩
          canvasText.drawImage(imgbg, 0, 0, 300, 485)
          let files = this.dataURLtoFile(canvas.toDataURL('image/png'), this.key)
          // console.log(`压缩文件:${files} 大小${files.size}`)
          this._qiniuUpload(files, this.key, this)
        } catch (err) {
          console.log(err)
          return false
        }
      },
      // this.$refs.file.click()
      _imitateClick() {
        console.log('点击上传')
        this.$refs.file.click()
      },
      _preview() {
        try {
          let files = this.$refs.file.files[0]
          try {
            if (files.size > 10542880) {
              this.$root.eventHub.$emit('titps', `请选择小于10M的图片~`)
              return false
            }
          } catch (e) {
            console.log(e)
          }
          console.log('清空画布')
          //清空画布
          // if (files.type.slice(6)) {}
          try {
            this.key = 'DGZ用户传图' + Date.parse(new Date()) + `.${files.type.replace('image/', '')}`
          } catch (e) {
            this.key = 'DGZ用户传图' + Date.parse(new Date()) + '.png'
          }
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
      _clear() {
        console.log('清空画布')
        let canvas = document.querySelector('.spread');
        this.key = '';
        this.$emit('view', null);
        this.$emit('setprocess', 0);
        canvas.height = canvas.height;
        this.$refs.file.outerHTML = this.$refs.file.outerHTML;
        this.$refs.spreadimg.outerHTML = this.$refs.spreadimg.outerHTML;
        // document.querySelector('.spreadimg').outerHTML = document.querySelector('.spreadimg').outerHTML;
      },
      async _qiniuUpload(file, key, that) {
        console.log('开始上传')
        const ret = await up_token()
        if (ret.status === 200 && ret.data.code === 200) {
          // const that = this
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
              console.log(that)
              that.$emit('setprocess', res)
            },
            error(err){
              console.log(err)
              that.$emit('err', err)
            },
            complete(res){
              console.log(res)
              that.$emit('success', res)
              this.$refs.file.outerHTML = this.$refs.file.outerHTML
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
