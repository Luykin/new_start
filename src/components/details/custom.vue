<template>
  <div class="custom">
    <iframe :src="iframe_url" class="iframe"></iframe>
    <back></back>
  </div>
</template>

<script>
  import back from 'base/back/back'
  import {UAID, APPNAME} from 'api/config'

  export default {
    name: 'custom',
    computed: {
      iframe_url() {
        return `https://qiyu.xingkwh.com/#/?userid=${this.$root.user.id}&name=${this.$root.user.nickname}&uaid=${UAID}&score=${this.$root.user.score}&appName=${APPNAME}&avatar=${this.$root.user.avatar}`
      }
    },
    components: {
      back
    }
  }
</script>

<style scoped>
  .custom {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background: #fff;
    overflow: hidden;
  }
  .iframe{
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    outline: none;
  }
</style>
