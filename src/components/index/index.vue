<template>
  <transition name="list">
    <div>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div class="min-warp-height">
          <div class="height10"></div>
          <div class="header">
            <userheader></userheader>
          </div>
          <div class="flex task-title">推荐任务</div>
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
                <span class="task-num ell">{{item.use_num}}人已做,还剩{{item.remain_num}}个名额</span>
              </div>
              <div class="flex task-item-money js">
                ¥{{item.single_price}}
              </div>
            </div>
          </div>
          <div style="height: 10px"></div>
          <empyt v-show="!list.length"></empyt>
        </div>
      </betterscroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  import betterscroll from 'base/better-scroll/better-scroll'
  import empyt from 'base/empyt/empyt'
  import {pub_task, login, home_page, task_detail, update_user_info} from 'api/index'
  import {UAID, CHANNEL, APPNAME} from 'api/config'

  export default {
    data() {
      return {
        page: 0,
        num: 10,
        list: [],
        total: 0,
        updateTimer: null,
        pullDownTimer: null
      }
    },
    name: 'user',
    created() {
      this.$root.eventHub.$on('updateList', (time) => {
        this._pulldown()
        // this.$nextTick(() => {
        //   if (this.pullDownTimer) {
        //     clearTimeout(this.pullDownTimer)
        //   }
        //   this.pullDownTimer = setTimeout(() => {
        //     this._pulldown()
        //     clearTimeout(this.pullDownTimer)
        //     this.pullDownTimer = null
        //   }, time || 8000)
        // })
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
        this._getHomeInfo()
        this._getPubTask()
        // this._login()
        this._wxLogin(null)
        // updateUserInfo
      },
      _wxLogin(callback) {
        const url = window.location.href
        const start = url.indexOf('code=') + 5
        const end = url.indexOf('&state')
        if (start > 4 && end > -1) {
          console.log('微信登录')
          this._login(url.slice(start, end), this.$route.query.username, callback)
          const locationUrl = window.location.origin + `/dgz/#/`
          console.log(locationUrl)
          history.replaceState(null, null, locationUrl)
        } else {
          console.log('浏览器储存登录')
          const user = localStorage.getItem(`${UAID}${CHANNEL}user_id`) || localStorage.getItem('user_id')
          if (user) {
            this._updateuserinfo(user, callback)
          } else {
            // console.log(user, '无法加载用户信息');
            // console.log(NOWCONFIG.spread);
            // window.location.href = `${NOWCONFIG.spread}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
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
      async _getPubTask() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await pub_task(1)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.serverCache = ret.data.data
        }
      },
      async _login(code, surper_code, callback) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await login(code, surper_code)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          localStorage.setItem(`${UAID}${CHANNEL}user_id`, ret.data.data.username)
        }
        if (callback) {
          callback(this.$root.user)
        }
      },
      async _getHomeInfo(must) {
        if (!must) {
          this.$root.eventHub.$emit('loading', true)
        }
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
          path: `./index/${id}`
        })
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        // this.list = []
        this._getHomeInfo(true)
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
