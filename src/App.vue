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
  import foot from 'components/footer/new-footer'
  import centerTips from 'base/centerTips/centerTips'
  import loading from 'base/loading/loading'
  import preloading from 'components/preloading/preloading'
  import {getUserInfo} from 'api/index'
  import {decryptByDES} from 'common/js/util'
  import {UAID, CHANNEL, FACTOR} from 'api/config'

  export default {
    data() {
      return {
        centerTips: '',
        preloadingshow: [],
        loading: null,
        timer: null
      }
    },
    created() {
      this.$root.eventHub.$on('titps', (titps) => {
        this.centerTips = titps
        this.$refs.centerTips._open()
      })
      this.$root.eventHub.$on('updateUserInfo', (path) => {
        console.log('全局更新用户信息')
        try {
          const username = decryptByDES(localStorage.getItem(`${UAID}${CHANNEL}username`) || '', FACTOR)
          if (username) {
            this._getUserInfo(username, path)
          } else {
            this.$router.replace({
              path: '/login'
            })
          }
        } catch (e) {
          this.$router.replace({
            path: '/login'
          })
        }
      })
      this.$root.eventHub.$on('loading', (loading) => {
        if (this.timer && loading) {
          return false
        }
        if (loading) {
          this.timer = setTimeout(() => {
            this.loading = loading
          }, 200)
        } else {
          clearTimeout(this.timer)
          this.timer = null
          this.loading = loading
        }
      })
    },
    mounted() {
      setTimeout(() => {
        this.preloadingshow = []
      }, 300)
    },
    methods: {
      async _getUserInfo(username, path) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await getUserInfo(username)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          if (path) {
            this.$router.replace({
              path: path
            })
          }
          console.log(this.$route)
          const locationUrl = window.location.origin + `/#/`
          history.replaceState(null, null, locationUrl)
        }
        if (ret === 404) {
          this.$router.replace({
            path: '/login'
          })
        }
      },
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
  @import url(common/css/reset.css);
  @import url(common/css/task.css);
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
