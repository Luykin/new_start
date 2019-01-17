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
          <div class="flex task-title">
            <span class="flex js">推荐任务</span>
            <div class="flush flex" @click="_pulldown(true)" v-show="!pullLoading">
              <img src="../../assets/img/reflush.png"/>
            </div>
          </div>
          <div class="index-task-item flex" v-for="item in list" v-if="list.length" :key="item.id"
               @click="_getDetail(item.id)">
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
  import userheader from 'components/userheader/userheader'
  import betterscroll from 'base/better-scroll/better-scroll'
  import empyt from 'base/empyt/empyt'
  import entrance from 'components/entrance-window/entrance'
  import {pub_task, login, home_page, task_detail, update_user_info} from 'api/index'
  import {UAID, CHANNEL, APPNAME, env} from 'api/config'
  import lamp from 'components/lamp/lamp'

  export default {
    data() {
      return {
        page: 0,
        num: 10,
        list: [],
        total: 0,
        updateTimer: null,
        pullDownTimer: null,
        pullLoading: null
      }
    },
    name: 'user',
    created() {
      this.$root.eventHub.$on('updateList', (time) => {
        this._pulldown()
      })
      this.$root.eventHub.$on('updateUserInfo', (time) => {
        this.$nextTick(() => {
          if (this.updateTimer) {
            clearTimeout(this.updateTimer)
          }
          this.updateTimer = setTimeout(() => {
            this._updateuserinfo(this.$root.user.username)
            clearTimeout(this.updateTimer)
            this.updateTimer = null
          }, time || 2000)
        })
      })
      this.$root.eventHub.$on('refresh/index', () => {
        this.$nextTick(() => {
          try {
            this.$refs.wrapper.refresh()
          } catch (e) {
            console.log(e)
          }
        })
      })
    },
    mounted() {
      this._inint()
      // this._checkLogin()
    },
    methods: {
      _error(err) {
        try {
          err.target.style.display = 'none'
        } catch (e) {
          console.log(e)
        }
      },
      _inint() {
        this.$refs.wrapper._initScroll()
        this._getHomeInfo(null)
        this._getPubTask(this._checkTask())
        this._wxLogin(this._checkLogin())
      },
      // _checkHomeInfo() {
      //   if (!this.total) {
      //     let timer = setTimeout(() => {
      //       console.log('获取列表失败,尝试重新获取')
      //       this._getHomeInfo()
      //       clearTimeout(timer)
      //       timer = null
      //     }, 1300)
      //   }
      // },
      _checkTask() {
        if (!this.$root.serverCache.ret.length) {
          let timer = setTimeout(() => {
            console.log('获取商品失败,尝试重新获取')
            this._getPubTask()
            clearTimeout(timer)
            timer = null
          }, 1300)
        }
      },
      _checkLogin() {
        if (!this.$root.user.username) {
          let timer = setTimeout(() => {
            console.log('登录失败,尝试重连')
            this._wxLogin()
            clearTimeout(timer)
            timer = null
          }, 1300)
        }
      },
      _wxLogin(callback) {
        const url = window.location.href
        const start = url.indexOf('code=') + 5
        const end = url.indexOf('&state')
        const channel = decodeURIComponent(this.$route.query.channel || '老用户')
        this.$root.channel = channel
        if (start > 4 && end > -1) {
          console.log('微信登录')
          this._login(url.slice(start, end), this.$route.query.username, channel, callback)
          const locationUrl = window.location.origin + `/#/`
          history.replaceState(null, null, locationUrl)
        } else {
          console.log('浏览器储存登录')
          let user
          user = localStorage.getItem(`${UAID}${channel}user_id`) || localStorage.getItem('user_id')
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
        }
        if (callback) {
          callback(this.$root.user)
        }
      },
      async _getPubTask(callback) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await pub_task(1)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.serverCache = ret.data.data
        }
        if (callback) {
          callback()
        }
      },
      async _login(code, surper_code, channel, callback) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await login(code, surper_code, channel)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          try {
            localStorage.setItem(`${UAID}${channel}user_id`, ret.data.data.username)
          } catch (e) {
            console.log(e)
          }
        }
        if (callback) {
          callback(this.$root.user)
        }
      },
      async _getHomeInfo(must, callback, loading) {
        if (!must || loading) {
          this.$root.eventHub.$emit('loading', true)
        }
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
        if (!this.$root.user.username) {
          return false
        }
        this.$router.push({
          name: 'task-detail',
          params: {id}
        })
      },
      _pulldown(loading) {
        if (this.pullLoading) {
          return false
        }
        this.num = 10
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
