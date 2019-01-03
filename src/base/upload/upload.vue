<template>
  <div class="hidden">
    <input type="file" accept="image/*" class="file" ref="file" @change="_preview($event)"/>
  </div>
</template>

<script>
  import { up_token } from 'api/index'
  export default {
    name: 'upload',
    created() {
    },
    mounted() {
      // console.log(this.$refs.file)
    },
    methods: {
      // this.$refs.file.click()
      _imitateClick() {
        this.$refs.file.click()
      },
      _preview() {
        try {
          let files = this.$refs.file.files[0]
          console.log(files.size)
          if (files.size > 2050000) {
            this.$root.eventHub.$emit('titps', `请选择小于2M的图片~`)
            return false
          }
          const key = files.name
          this._qiniuUpload(files, key)
          let reader = new FileReader()
          reader.readAsDataURL(files)
          reader.onload = (e) => {
            this.$emit('view', e.target.result)
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
