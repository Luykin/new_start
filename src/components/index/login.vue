<template>
  <transition name="list">
    <div class="detail-login-body">
      <div class="input-all-warp">
        <div class="login-header-warp">
          <div class="login-header flex">
            <!--抖个赞-->
            <img src="https://cdn.xingkwh.com/logo%202.png" class="logo-img"/>
          </div>
        </div>
        <div class="login-input-warp">
          <div class="login-input back-fff flex js">
            <img src="https://cdn.xingkwh.com/%E6%89%8B%E6%9C%BAicon@3x.png" class="login-icon"/>
            <input type="number" name="手机号" placeholder="请输入手机号" class="index-input" v-model="phone"/>
          </div>
        </div>
        <div class="login-input-warp">
          <div class="login-input flex">
            <div class="login-btn-left back-fff flex js">
              <img src="https://cdn.xingkwh.com/%E9%AA%8C%E8%AF%81%E7%A0%81icon@3x.png" class="login-icon"/>
              <input type="number" name="验证码" placeholder="请输入验证码" class="index-input" v-model="code"/>
            </div>
            <div class="login-code-btn flex ell" @click="_getCode" :class="{'disable-code-btn': time}">
              {{time ? `${time}s` : '验证码'}}
            </div>
          </div>
        </div>
        <div class="login-sure-btn flex" :class="{'active-login-btn': phone && code}" @click="_codeLogin">
          登录
        </div>
        <div v-if="$root.must_info && $root.must_info.username" class="has-code flex">*含有上级邀请码的入口</div>
      </div>
    </div>
  </transition>
</template>

<script>
  // const FACTOR = '2019_encryption_algorithm'
  import {send_verify, code_login} from 'api/index'
  import {UAID, CHANNEL, FACTOR} from 'api/config'
  import {encryptByDES, decryptByDES} from 'common/js/util'
  export default {
    name: 'login',
    data() {
      return {
        phone: '',
        code: '',
        time: 0,
        timer: null
      }
    },
    created() {
      // const username =  decryptByDES(localStorage.getItem(`${UAID}${CHANNEL}username`), FACTOR) || ''
      // if (username) {
      //   this._getUserInfo(username)
      // }
    },
    computed: {
      // show_username(value, key) {
      //   return encryptByDES(value, key)
      // },
    },
    mounted() {
      document.querySelectorAll('.index-input').forEach((item) => {
        item.addEventListener('blur', () => {
          try {
            document.body.scrollTop = document.body.scrollHeight
            document.documentElement.scrollTop = 0
          } catch (e) {
            console.log(e)
          }
        })
      })
    },
    methods: {
      async _codeLogin() {
        if (!this.phone) {
          this.$root.eventHub.$emit('titps', `请输入手机号~`)
          return false
        }
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}|(19[0-9]{1})))+\d{8})$/
        if (!myreg.test(this.phone)) {
          this.$root.eventHub.$emit('titps', `请正确填写手机号哦~`)
          return false
        }
        if (!this.code) {
          this.$root.eventHub.$emit('titps', `请输入验证码~`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await code_login(this.code, this.phone, this.$root.must_info ? this.$root.must_info.username: '')
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', `登录成功`)
          this.$root.user = ret.data.data
          this.$router.replace({
            path: '/index'
          })
          // const locationUrl = window.location.origin + `/#/index`
          // history.replaceState(null, null, locationUrl)
          // encryptByDES
          localStorage.setItem(`${UAID}${CHANNEL}username`, encryptByDES(ret.data.data.username, FACTOR))
        } else {
          if (ret === 431) {
            this.code = ''
            this.$root.eventHub.$emit('titps', `验证码错误`)
          } else {
            this.$root.eventHub.$emit('titps', `未知错误`)
          }
        }
      },
      async _getCode() {
        if (this.time) {
          return false
        }
        if (!this.phone) {
          this.$root.eventHub.$emit('titps', `请输入手机号~`)
          return false
        }
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}|(19[0-9]{1})))+\d{8})$/
        if (!myreg.test(this.phone)) {
          this.$root.eventHub.$emit('titps', `请正确填写手机号哦~`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await send_verify(this.phone)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          clearInterval(this.timer)
          this.$root.eventHub.$emit('titps', `验证码发送成功~`)
          this.time = 60
          this.timer = setInterval(() => {
            this.time -= 1
            if (this.time <= 0) {
              this.time = 0
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        } else {
          this.$root.eventHub.$emit('titps', `发送失败,请稍后重试`)
        }
      },
    },
  }
</script>

<style scoped>
  .login-header-warp {
    height: 0;
    width: 100%;
    margin: 0 auto;
    padding-top: 50%;
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    position: relative;
  }

  .login-header {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
  }

  .login-input-warp {
    width: 80%;
    height: 0;
    padding-top: 11%;
    margin: 0 auto 17px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .login-input {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    /*background: #fff;*/
  }

  .input-all-warp {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    font-size: 16px;
  }

  .back-fff {
    background: #fff;
  }

  .login-code-btn {
    width: auto;
    padding: 0 24px;
    background: #F656D9;
    color: #fff;
    height: 100%;
    border-radius: 4px;
  }

  .login-btn-left {
    height: 100%;
    margin-right: 10px;
    border-radius: 4px;
  }

  .login-sure-btn {
    width: 80%;
    height: 45px;
    border-radius: 4px;
    margin: 25px auto 0;
    background: #9A80E4;
    color: #fff;
  }

  .login-icon {
    width: 20px;
    height: auto;
    margin: 0 10px;
  }

  input {
    color: #9B77FF;
    font-weight: 400;
  }

  .index-input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: rgba(155, 119, 255, 0.67);
    font-weight: 400;
  }
  .disable-code-btn{
    background: #9A80E4;
  }

  .active-login-btn{
    background: #F656D9;
  }
  .has-code{
    width: 80%;
    margin: 15px auto 0;
    color: #F656D9;
    font-size: 12px;
    justify-content: flex-start;
  }
  .logo-img{
    width: 40%;
    height: auto;
    max-width: 175px;
    min-width: 130px;
  }
</style>
