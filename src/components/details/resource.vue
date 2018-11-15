<template>
  <div class="resource">
    <img src="https://cdn.xingkwh.com/Artboard%205.png"/>
    <div style="padding-top: 67%;" class="copy-warp">
      <div class="copy" :data-clipboard-text="url1"></div>
      <div class="copy" :data-clipboard-text="code1"></div>
      <div class="copy" :data-clipboard-text="url2" style="margin-top: 35%"></div>
      <div class="copy" :data-clipboard-text="code2"></div>
    </div>
    <back></back>
  </div>
</template>

<script>
  import back from 'base/back/back'
  import ClipboardJS from 'clipboard'

  export default {
    name: 'resource',
    data() {
      return{
        url1: 'https://pan.baidu.com/s/1jnKTx5I-If_jnIenfKLMfA',
        code1: 'ofw9',
        url2: 'https://pan.baidu.com/s/1j3H_5_rhX6ZgY2NCMbAhuQ',
        code2: 'r06a'
      }
    },
    created() {
      const clipboard = new ClipboardJS('.copy')
      const that = this
      clipboard.on('success', function (e) {
        that.$root.eventHub.$emit('titps', '已复制到剪贴板')
        console.info('Action:', e.action)
        console.info('Text:', e.text)
        console.info('Trigger:', e.trigger)
        e.clearSelection()
      })
      clipboard.on('error', function (e) {
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
      })
    },
    components: {
      back
    }
  }
</script>

<style scoped>
.resource {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 99999;
  background: #f1f1f1;
  overflow-y: scroll;
}

.resource img {
  width: 100%;
  height: auto;
}
.copy{
  width: 100%;
  height: 0;
  padding-top: 15%;
}
.copy-warp{
  position: absolute;
  top: 0;
  width: 100%;
  background: rgba(0,0,0,.2);
  opacity: 0;
}
</style>
