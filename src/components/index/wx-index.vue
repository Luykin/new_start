<template>
  <transition name="list">
    <div class="detail-body">
      <div class="header">
        <userheader :hidden="hidden"></userheader>
      </div>
      <div class="task-info flex">
        请用外部浏览器打开,获取更良好的体验
      </div>
      <div class="task-info flex">
        公告: 抖个赞开始外部浏览器内测啦~
      </div>
      <div class="task-btn flex gre-btn" :class="{'copy': $root.user.username}" :data-clipboard-text="your_url" @click="_new">
        开启新旅程
      </div>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  import {login, update_user_info} from 'api/index'
  import {UAID, CHANNEL, APPNAME, DOMAIN, env} from 'api/config'
  import ClipboardJS from 'clipboard'
  import {encryptByDES} from 'common/js/util'
  export default {
    name: 'wx-index',
    data() {
      return{
        hidden: true,
        your_url: ''
      }
    },
    created() {
      this._wxLogin()
    },
    mounted() {
      const clipboard = new ClipboardJS('.copy')
      const that = this
      clipboard.on('success', function (e) {
        that.$root.eventHub.$emit('titps', '已复制链接,打开浏览器,开启新旅程吧')
        e.clearSelection()
      })
      clipboard.on('error', function (e) {
      })
    },
    computed: {
      // your_url() {
      //   return this.$root.user.username ? '' : `http://dgz.likesblock.com?username=${this.$root.user.username}`
      // },
    },
    methods: {
      _new() {
        if (!this.$root.user.username) {
          this.$root.eventHub.$emit('titps', '未登录')
        }
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
          console.log('微信登录', this.getRequestParameter('code'), '邀请码', this.getRequestParameter('username'))
          this._login(this.getRequestParameter('code'), this.getRequestParameter('username'), null, callback)
        } else {
          console.log('浏览器储存登录')
          let user
          user = localStorage.getItem(`${UAID}user_id`) || localStorage.getItem('user_id')
          if (user) {
            this._updateuserinfo(user, callback)
          } else {
          }
        }
      },
      async _login(code, surper_code, channel, callback) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await login(code, surper_code)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          const locationUrl = window.location.origin + `/#/wx-index`
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
          console.log(encryptByDES(this.$root.user.username, 'dougezan'))
          this.your_url = `${DOMAIN}?browser_code=${encodeURIComponent(encryptByDES(this.$root.user.username, 'dougezan'))}`
        }
        if (callback) {
          callback(this.$root.user)
        }
      },
    },
    components: {
      userheader
    }
  }
</script>

<style scoped>
  .header {
    width: 92%;
    height: 170px;
    margin: 10px auto 20px;
  }
  .task-info{
    color: #999;
    align-content: center;
    align-items: center;
  }
  .gre-btn{
    background: #F74BCA;
  }
</style>
