<template>
  <transition name="list">
    <div>
      <lamp></lamp>
      <!--@pulldown="_pulldown"-->
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div class="min-warp-height">
          <div class="height45"></div>
          <div class="header">
            <userheader></userheader>
          </div>
          <!--bg-none-->
          <div class="flex task-title">
            <span class="flex js">推荐任务</span>
            <div class="flush flex" @click="_pulldown(true)" v-show="!pullLoading">
              <img src="../../assets/img/reflush.png"/>
            </div>
          </div>
          <div class="index-task-item bg-none flex" v-for="item in list" v-if="list.length" :key="item.id"
               @click="_getDetail(item.id)" :class="_setBackTaskItem(item)">
            <div v-show="item.is_top" class="top-title-new"></div>
            <div class="categry-task flex" :style="`background:${item.bg_color}; color: ${item.font_color}`">
              {{item.min_title}}
            </div>
            <div class="flex index-task-item-inner">
              <div class="default-avatar">
                <img :src="item.avatar" class="new-task-item-avatar" @error="_error($event)"/>
              </div>
              <div class="flex fw ell js">
                <div class="task-item-title ell flex js">
                  {{item.title}}
                </div>
                <p class="task-num ell"><span style="color: #6B41E1">{{item.use_num}}</span>人已做,还剩<span
                  style="color: #FF3939">{{item.remain_num}}</span>个名额</p>
              </div>
              <div class="flex task-item-money js">
                ¥{{item.single_price}}
              </div>
            </div>
          </div>
          <div style="height: 10px"></div>
          <empyt v-show="!list.length" :flush="!pullLoading" @flush="_pulldown(1)"></empyt>
        </div>
      </betterscroll>
      <entrance></entrance>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  // https://cdn.xingkwh.com/%E6%8A%96%E4%B8%AA%E8%B5%9E%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.png
  import userheader from 'components/userheader/userheader'
  import betterscroll from 'base/better-scroll/better-scroll'
  import empyt from 'base/empyt/empyt'
  import entrance from 'components/entrance-window/entrance'
  import {login, home_page, task_detail, update_user_info, getAppInfo} from 'api/index'
  import {UAID, CHANNEL, APPNAME,env} from 'api/config'
  import lamp from 'components/lamp/lamp'
  import {decryptByDES} from 'common/js/util'
  import {isWx} from 'common/js/util'

  export default {
    data() {
      return {
        page: 0,
        num: 20,
        list: [],
        total: 0,
        updateTimer: null,
        pullDownTimer: null,
        pullLoading: null,
        doingLoad: null,
      }
    },
    name: 'user',
    computed: {
      _setBackTaskItem() {
        return (item) => {
          return `iti-back${item.service_group_id}`
        }
      },
    },
    created() {
      this.$root.eventHub.$on('updateList', (time) => {
        this._pulldown()
      })
      this.$root.eventHub.$on('refresh/index', () => {
        const that = this
        let timer = setTimeout(() => {
          try {
            that.$refs.wrapper.refresh()
          } catch (e) {
            console.log(e)
          }
          clearInterval(timer)
          timer = null
        }, 100)
      })
    },
    mounted() {
      this._inint()
      this._getAppInfo()
    },
    methods: {
      _error(err) {
        try {
          err.target.style.display = 'none'
        } catch (e) {
          console.log(e)
        }
      },
      async _getAppInfo() {
        const ret = await getAppInfo()
        if (ret.status === 200 && ret.data.code === 200) {
          if (ret.data.data.notice && this.$route.path === '/index') {
            this.$root.notice = ret.data.data.notice
            this.$router.push({
              path: '/notice'
            })
          }
        }
      },
      _inint() {
        this.$refs.wrapper._initScroll()
        this._getHomeInfo(null)
        // this._getPubTask()
      },
      getRequestParameters() {
        var arr = (location.search || '').replace(/^\?/, '').split('&')
        var params = {}
        for (var i = 0; i < arr.length; i++) {
          var data = arr[i].split('=')
          if (data.length >= 2) {
            params[data[0]] = data[1]
          }
        }
        return params
      },
      getRequestParameter(key) {
        var params = this.getRequestParameters()
        return params[key]
      },
      _browserLogin() {
        const browser_code = decryptByDES(decodeURIComponent(this.getRequestParameter('browser_code')) || '', 'dougezan')
        if (browser_code) {
          console.log('浏览器code登录', browser_code)
          this._updateuserinfo(browser_code)
        } else {
          console.log('浏览器储存登录browserLogin')
          let user
          user = localStorage.getItem(`${UAID}user_id`) || localStorage.getItem('user_id')
          if (user) {
            this._updateuserinfo(user)
          } else {
            this.$router.replace({
              path: '/browser-login'
            })
          }
        }
      },
      _wxLogin(callback) {
        if (this.getRequestParameter('code')) {
          console.log('微信登录wxLogin', this.getRequestParameter('code'), '邀请码', this.getRequestParameter('username'))
          // alert('微信code登录')
          this._login(this.getRequestParameter('code'), this.getRequestParameter('username'), null, callback)
        } else {
          console.log('浏览器储存登录wxLogin')
          let user
          user = localStorage.getItem(`${UAID}user_id`) || localStorage.getItem('user_id')
          if (user) {
            this._updateuserinfo(user, callback)
          } else {
          }
        }
      },
      async _updateuserinfo(username, callback) {
        if (!username) {
          console.log('_updateuserinfo: 不存在username')
        }
        const ret = await update_user_info(username)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          const locationUrl = window.location.origin + `/#/index`
          history.replaceState(null, null, locationUrl)
          try {
            localStorage.setItem(`${UAID}user_id`, ret.data.data.username)
          } catch (e) {
            console.log(e)
          }
        }
        if (callback) {
          callback(this.$root.user)
        }
        if (ret === 404) {
          this.$root.eventHub.$emit('titps', '登录已失效,请重新登录')
          this.$router.replace({
            path: '/browser-login'
          })
        }
      },
      // async _getPubTask(callback) {
      //   this.$root.eventHub.$emit('loading', true)
      //   const ret = await pub_task(1)
      //   this.$root.eventHub.$emit('loading', null)
      //   if (ret.status === 200 && ret.data.code === 200) {
      //     this.$root.serverCache = ret.data.data
      //   }
      //   if (callback) {
      //     callback()
      //   }
      // },
      async _login(code, surper_code, channel, callback) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await login(code, surper_code)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          const locationUrl = window.location.origin + `/#/index`
          history.replaceState(null, null, locationUrl)
          try {
            localStorage.setItem(`${UAID}user_id`, ret.data.data.username)
          } catch (e) {
            console.log(e)
          }
          return false
        }
        if (callback) {
          callback(this.$root.user)
        }
      },
      async _getHomeInfo(must, callback, loading) {
        if (this.doingLoad) {
          return false
        }
        if (!must || loading) {
          this.$root.eventHub.$emit('loading', true)
        }
        this.doingLoad = true
        this.pullLoading = true
        const ret = await home_page(this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (must || !this.list.length) {
            this.list = [...this.formatTop(ret.data.data.top_ret), ...ret.data.data.ret]
          } else {
            this.list = [...this.list, ...ret.data.data.ret]
          }
          this.total = parseInt(ret.data.data.count)
        }
        let timer = setTimeout(() => {
          this.pullLoading = null
          clearTimeout(timer)
          timer = null
        }, 2000)
        if (callback) {
          callback()
        }
        this.doingLoad = null
      },
      formatTop(list) {
        try {
          if (!list.length) {
            return []
          }
          list.forEach((item) => {
            item.is_top = true
          })
          return list
        } catch (e) {
          console.log(e)
          return list
        }
      },
      async _getDetail(id) {
        // if (!this.$root.user.username) {
        //   return false
        // }
        this.$router.push({
          name: 'task-detail',
          params: {id}
        })
      },
      _pulldown(loading) {
        if (this.pullLoading) {
          return false
        }
        this.num = 20
        this.page = 0
        this._getHomeInfo(true, null, loading)
      },
      _scrollToEnd() {
        // console.log(this.list.length < this.totle, typeof this.list.length, this.list.length , typeof this.total, this.total)
        if (this.list.length < this.total) {
          this.page += 1
          this._getHomeInfo()
        }
      }
    },
    components: {
      empyt,
      lamp,
      entrance,
      userheader,
      betterscroll
    }
  }
</script>

<style scoped>
  .header {
    width: 92%;
    height: 170px;
    margin: 10px auto 20px;
  }

  .wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 55px;
    overflow: hidden;
  }
</style>
