<template>
  <transition name="list">
    <div class="detail-calibrator-body">
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import {encryptByDES, decryptByDES} from 'common/js/util'
  import {getUserInfo} from 'api/index'
  import {isWx} from 'common/js/util'
  import {UAID, CHANNEL, FACTOR, ENVIRONMENT} from 'api/config'
  export default {
    name: 'calibrator',
    data() {
      return{
      }
    },
    created() {
      // console.log(encodeURIComponent(encryptByDES(JSON.stringify({
      //   username: '123456',
      //   environment: ENVIRONMENT
      // }), FACTOR)))
      // flushAll
      this.$root.eventHub.$on('flushAll', () => {
        this._init()
      })
      this._init()
    },
    methods: {
      _init() {
        if (this.capabilityCheck()) {
          this.$root.eventHub.$emit('updateUserInfo', '/index')
        } else {
          this.$router.replace({
            path: '/home'
          })
        }
      },
      // 能力校验
      capabilityCheck() {
        if (!isWx()) {
          // 浏览器通过能力校验
          if (this.$route.query.ability && decryptByDES(decodeURIComponent(this.$route.query.ability), FACTOR)) {
            let must_info;
            try {
              const string_info = decryptByDES(decodeURIComponent(this.$route.query.ability), FACTOR);
              must_info = JSON.parse(string_info);
              if (must_info && must_info.environment === ENVIRONMENT) {
                this.$root.must_info = must_info;
                localStorage.setItem('environment', must_info.environment);
              }
            } catch (e) {
              console.log(e)
            }
          }
          return true
        } else {
          return true; //2019.03.04 关闭防封机制
          // 1.判断url进入方式
          // console.log(this.$route)
          if (this.$route.query.ability && decryptByDES(decodeURIComponent(this.$route.query.ability), FACTOR)) {
            let must_info
            try {
              const string_info = decryptByDES(decodeURIComponent(this.$route.query.ability), FACTOR)
              must_info = JSON.parse(string_info)
              console.log(must_info)
              if (must_info && must_info.environment === ENVIRONMENT) {
                this.$root.must_info = must_info
                localStorage.setItem('environment', must_info.environment)
                return true
              } else {
                return false
              }
            } catch (e) {
              return false
            }
          } else {
            // 2.判断是否是刷新
            return localStorage.getItem('environment') && localStorage.getItem('environment') === ENVIRONMENT
          }
        }
      },
      // update_user_info
    }
  }
</script>

<style scoped>
</style>
