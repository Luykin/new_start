<template>
  <transition name="list">
    <div class="body">
      <img src="https://cdn.xingkwh.com/%E8%B5%9A%E8%B5%8F%E9%87%91.png"/>
      <div class="footer-none"></div>
      <div class="copy reward-footer flex" :data-clipboard-text="code" @click="">复制话术</div>
      <back></back>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import ClipboardJS from 'clipboard'
  export default {
    data() {
      return{
        code: '给大家推荐一个好项目,在这里玩"赚"抖音/快手,涨粉,开直播,学习上热门方法,还可以推广赚钱,一起加入进来吧! (扫码进入,生成自己的海报推广)'
      }
    },
    name: 'reward',
    created() {
      const clipboard = new ClipboardJS('.copy')
      const that = this
      clipboard.on('success', function (e) {
        that.$root.eventHub.$emit('titps', '已复制到剪贴板')
        console.log(e)
        e.clearSelection()
      })
      clipboard.on('error', function (e) {
      })
    },
    components: {
      back
    }
  }
</script>

<style scoped>
  .body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    /*background: #fff;*/
    background: linear-gradient(45deg, #253250, #34283A);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#34283A));
    overflow-y: scroll;
  }
  .reward-footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background: rgba(0,0,0,.8);
    color: #fff;
  }
</style>
