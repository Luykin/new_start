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
      this.preloadingshow = ['https://cdn.xingkwh.com/%E5%90%88%E4%BC%99%E4%BA%BA%E6%94%B6%E7%9B%8Abg@3x.png', 'https://cdn.xingkwh.com/%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9Ficondrak@3x.png', 'https://cdn.xingkwh.com/%E4%BB%8A%E6%97%A5%E6%94%B6%E7%9B%8Aicondrak@3x.png', 'https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83bgback@3x.png']
    }, 300)
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
