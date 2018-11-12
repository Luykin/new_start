<template>
  <div id="app" ref='app'>
   <!--    <m-header></m-header> -->
   <keep-alive>
    <router-view ref='body'></router-view>
  </keep-alive>
  <foot></foot>
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
      this.preloadingshow = ['https://cdn.xingkwh.com/%E5%9B%A2%E9%98%9F-%E4%BB%8A%E6%97%A5%E6%94%B6%E7%9B%8A.png', 'https://cdn.xingkwh.com/%E5%9B%A2%E9%98%9F-%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9F.png', 'https://cdn.xingkwh.com/%E8%B4%AD%E4%B9%B0%E8%AE%B0%E5%BD%95.png', 'https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E8%AE%B0%E5%BD%95.png', 'https://cdn.xingkwh.com/%E4%B8%8B%E5%8D%95%E8%AE%B0%E5%BD%95.png', 'https://cdn.xingkwh.com/%E6%88%91%E7%9A%84-%E5%A4%B4%E5%83%8F%E8%83%8C%E6%99%AF.png', 'https://cdn.xingkwh.com/%E4%B8%8A%E7%83%AD%E9%97%A8%E6%96%B9%E6%A1%88.png', 'https://cdn.xingkwh.com/%E4%B8%8A%E7%83%AD%E9%97%A8%E7%BD%91%E7%BA%A2%E6%96%B9%E6%A1%88.png','https://cdn.xingkwh.com/%E4%B8%8A%E7%83%AD%E9%97%A8%E5%90%8C%E5%9F%8E%E6%96%B9%E6%A1%88.png', 'http://p70pqu6ys.bkt.clouddn.com/30001_dy_url.png']
    }, 500)
  },
  methods: {
  },
  components: {
    foot,
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
