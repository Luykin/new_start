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
        this.preloadingshow = ['http://p70pqu6ys.bkt.clouddn.com/30001_dy_url.png' ,'http://p70pqu6ys.bkt.clouddn.com/30001_ks.jpg','https://cdn.xingkwh.com/%E4%B8%BB%E9%A1%B5%E5%88%86%E7%B1%BB-%E6%8A%96%E9%9F%B3%E9%80%89%E4%B8%AD.png','https://cdn.xingkwh.com/%E4%B8%BB%E9%A1%B5%E5%88%86%E7%B1%BB-%E5%A5%97%E9%A4%90%E6%9D%83%E9%99%90%E9%80%89%E4%B8%AD@3x.png','https://cdn.xingkwh.com/%E9%A6%96%E9%A1%B5-%E5%BF%AB%E6%89%8B%E9%80%89%E4%B8%AD@3x.png', 'https://cdn.xingkwh.com/%E4%B8%BB%E9%A1%B5%E5%88%86%E7%B1%BB-%E6%8A%96%E9%9F%B3%E6%9D%83%E9%99%90%E9%80%89%E4%B8%AD@3x.png','https://cdn.xingkwh.com/%E8%B4%AD%E4%B9%B0%E8%AE%B0%E5%BD%95@3x.png', 'https://cdn.xingkwh.com/%E4%B8%8B%E5%8D%95%E8%AE%B0%E5%BD%95@3x.png', 'https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E8%AE%B0%E5%BD%95@3x.png', 'https://cdn.xingkwh.com/%E4%B8%8A%E7%83%AD%E9%97%A8%E6%96%B9%E6%A1%88.png', 'https://cdn.xingkwh.com/%E5%90%88%E4%BC%99%E4%BA%BA%E6%94%B6%E7%9B%8Abg@3x.png', 'https://cdn.xingkwh.com/%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9Ficondrak@3x.png', 'https://cdn.xingkwh.com/%E4%BB%8A%E6%97%A5%E6%94%B6%E7%9B%8Aicondrak@3x.png', 'https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83bgback@3x.png']
      }, 300)
    },
    methods: {},
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
  .tips-class {
    width: auto;
    height: 40px;
    padding: 0 20px;
    background: rgba(0, 0, 0, .65);
    color: #fff;
    font-size: 15px;
    opacity: .9;
    border-radius: 10px;
    white-space: nowrap;
  }
</style>
