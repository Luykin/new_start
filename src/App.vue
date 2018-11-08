<template>
  <div id="app" ref='app'>
   <!--    <m-header></m-header> -->
   <keep-alive>
    <router-view ref='body'></router-view>
  </keep-alive>
  <foot></foot>
  <music></music>
  <preloading :preloadingshow='preloadingshow'></preloading>
  <loading v-show="loading"></loading>
  <centerTips ref='centerTips'>
    <div class="tips-class flex ellipsis">{{centerTips}}</div>
  </centerTips>
</div>
</template>
<script>
// import MHeader from 'components/header/header'
import foot from 'components/footer/footer'
import centerTips from 'base/centerTips/centerTips'
import music from 'base/music/music'
import loading from 'base/loading/loading'
import preloading from 'components/preloading/preloading'

export default {
  data() {
    return {
      centerTips: '',
      preloadingshow: [],
      loading: null
    }
  },
  created() {
    this.$root.eventHub.$on('titps', (titps) => {
     this.centerTips = titps
     this.$refs.centerTips._open()
   })
    this.$root.eventHub.$on('loading', (loading) => {
      this.loading = loading
    })
  },
  mounted() {
    setTimeout(() => {
      this.preloadingshow = ['https://cdn.xingkwh.com/kefu2.png', 'http://p70pqu6ys.bkt.clouddn.com/%E6%8F%90%E7%A4%BA@3x.png','https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E8%AF%B4%E6%98%8Eimg@3x.png','http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E4%B8%80%E6%AD%A5@3x.png', 'http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E4%BA%8C%E6%AD%A5@3x.png', 'http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E4%B8%89%E9%83%A8@3x.png', 'http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E5%9B%9B%E6%AD%A5@3x.png', 'http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E4%BA%94%E6%AD%A5@3x.png', 'http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E5%85%AD%E6%AD%A5@3x.png','https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83bg@3x.png', 'https://cdn.xingkwh.com/%E4%BD%A3%E9%87%91bg@3x.png', 'https://cdn.xingkwh.com/%E4%BB%8A%E6%97%A5%E6%94%B6%E7%9B%8Aicon@3x.png', 'https://cdn.xingkwh.com/%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9Ficon@3x.png', 'https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E4%BA%BA%E5%90%8D%E5%B8%81icon@3x.png', 'https://cdn.xingkwh.com/%E4%BD%A3%E9%87%91%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83bg@3x.png','https://cdn.xingkwh.com/%E5%9B%A2%E9%98%9F%E8%AF%B4%E6%98%8Eimg@3x.png','https://cdn.xingkwh.com/%E5%B9%B3%E5%8F%B0%E4%BB%8B%E7%BB%8Dbanner@3x.png', 'https://cdn.xingkwh.com/%E7%9B%88%E5%88%A9%E6%8A%80%E5%B7%A7banner@3x.png','https://cdn.xingkwh.com/BTC%E4%BB%8B%E7%BB%8D%20%E6%96%87%E5%AD%97@3x.png', 'https://cdn.xingkwh.com/BTC%E4%BB%8B%E7%BB%8Dbanner@3x.png', 'https://cdn.xingkwh.com/%E5%B9%B3%E5%8F%B0%E4%BB%8B%E7%BB%8D%E6%96%87%E5%AD%97@3x.png']
    }, 500)
  },
  methods: {
  },
  components: {
    foot,
    music,
    loading,
    preloading,
    centerTips
  }
}

</script>
<style>
@import url(assets/icon/iconfont.css);
@import url(common/css/reset.css);
@import url(common/css/fontsize.css);
</style>
<style scoped>
.tips-class{
  width: auto;
  height: 40px;
  padding: 0 20px;
  background: rgba(0,0,0,.65);
  color: #fff;
  font-size: 15px;
  opacity: .9;
  border-radius: 10px;
  white-space: nowrap;
}
</style>
