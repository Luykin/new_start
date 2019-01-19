<template>
  <transition name="pop">
    <div class="pop-body" @click.self="$router.back(-1)">
      <div class="task-info" @click.stop="">
        <img src="https://cdn.xingkwh.com/%E5%BC%B9%E7%AA%97@2x.png"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import {login, update_user_info} from 'api/index'
  import {UAID, CHANNEL, APPNAME, DOMAIN, env} from 'api/config'
  import {encryptByDES} from 'common/js/util'
  import {isWx} from 'common/js/util'
  export default {
    name: 'wx-index-tips',
    created() {
      if (this.$route.query.browser_code && !isWx()) {
        // console.log(`${DOMAIN}?browser_code=${this.$route.query.browser_code}`)
        window.location.href = `${DOMAIN}?browser_code=${this.$route.query.browser_code}`
      } else {
        this._wxLogin()
      }
    },
    methods: {
      _new() {
        // if (!this.$root.user.username) {
        //   this.$root.eventHub.$emit('titps', '未登录')
        //   return false
        // }
        this.$router.push({
          name: 'wx-index-tips'
        })
      },
      getRequestParameters() {
        var arr = (location.search || '').replace(/^\?/, '').split('&')
        var params = {}
        for (var i = 0; i < arr.length; i++) {
          var data = arr[i].split('=')
          if (data.length === 2) {
            params[data[0]] = data[1]
          }
        }
        return params
      },
      getRequestParameter(key) {
        var params = this.getRequestParameters()
        return params[key]
      },
      _wxLogin(callback) {
        if (this.getRequestParameter('code')) {
          // console.log('微信登录', this.getRequestParameter('code'), '邀请码', this.getRequestParameter('username'))
          this._login(this.getRequestParameter('code') || this.$route.query.browser_code, this.getRequestParameter('username'), null, callback)
        } else {
          console.log('浏览器储存登录')
          let user
          user = localStorage.getItem(`${UAID}user_id`) || localStorage.getItem('user_id')
          if (user) {
            this._updateuserinfo(user, callback)
          } else {
            this.$router.replace({
              path: '/browser-login'
            })
          }
        }
      },
      async _login(code, surper_code, channel, callback) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await login(code, surper_code)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          const locationUrl = window.location.origin + `/#/wx-index?browser_code=${encodeURIComponent(encryptByDES(this.$root.user.username, 'dougezan'))}`
          history.replaceState(null, null, locationUrl)
          console.log(encryptByDES(this.$root.user.username, 'dougezan'))
          this.your_url = `${DOMAIN}?browser_code=${encodeURIComponent(encryptByDES(this.$root.user.username, 'dougezan'))}`
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
      async _updateuserinfo(username, callback) {
        if (!username) {
          console.log('_updateuserinfo: 不存在username')
        }
        const ret = await update_user_info(username)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          const locationUrl = window.location.origin + `/#/wx-index?browser_code=${encodeURIComponent(encryptByDES(this.$root.user.username, 'dougezan'))}`
          history.replaceState(null, null, locationUrl)
          this.your_url = `${DOMAIN}?browser_code=${encodeURIComponent(encryptByDES(this.$root.user.username, 'dougezan'))}`
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
    },
  }
</script>

<style scoped>
  .pop-body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, .65);
    overflow: hidden;
    z-index: 9999;
  }

  .task-info {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    padding: 0;
    background: none;
    overflow: hidden;
  }

  .task-info img {
    display: block;
    width: 100%;
    margin: 0 auto;
    user-select: text;
  }
</style>
