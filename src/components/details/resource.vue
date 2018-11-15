<template>
  <div class="resource">
    <img src="https://cdn.xingkwh.com/Artboard%205.png"/>
    <div style="padding-top: 164%;" class="copy-warp">
      <div class="uri-warp flex fw" style="top: 40%;">
        <span class="copy flex" :data-clipboard-text="url1">{{url1}}</span>
        <div class="copy uri-btn flex mg20" :data-clipboard-text="code1">{{code1}}</div>
      </div>
      <div class="uri-warp flex fw" style="top: 80%;">
        <span class="copy flex" :data-clipboard-text="url2">{{url2}}</span>
        <div class="copy uri-btn flex mg20" :data-clipboard-text="code2">{{code2}}</div>
      </div>
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
        url1: 'https://dwz.cn/jPLXovV0',
        code1: 'ofw9',
        url2: 'https://dwz.cn/8GGy1eQj',
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
/*.copy{
  width: 100%;
  height: 0;
  padding-top: 15%;
}*/
.copy-warp{
  position: absolute;
  top: 0;
  width: 100%;
  background: rgba(0,0,0,0);
 /* opacity: 0;*/
}
.uri-warp{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  height: 18%;
  background: #3f3165;
  color: #fff;
  font-size: 20px;
  border-radius: 15px;
  user-select: text;
}
.uri-btn{
  width: 50%;
  height: 40px;
  border-radius: 16px;
  background: #fde15a;
  color: #413f37;
  font-weight: 600;
}
</style>
