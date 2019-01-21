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
      if (this.capabilityCheck()) {
        this.$root.eventHub.$emit('updateUserInfo', '/index')
      } else {
        this.$router.replace({
          path: '/home'
        })
      }
    },
    methods: {
      // 能力校验
      capabilityCheck() {
        if (!isWx()) {
          // 浏览器通过能力校验
          console.log('进入index页面')
          return true
        } else {
          // 1.判断url进入方式
          console.log(this.$route)
          if (this.$route.query.ability && decryptByDES(decodeURIComponent(this.$route.query.ability), FACTOR)) {
            let must_info
            try {
              const string_info = decryptByDES(decodeURIComponent(this.$route.query.ability), FACTOR)
              must_info = JSON.parse(string_info)
              console.log(must_info)
              if (must_info && must_info.environment === ENVIRONMENT) {
                console.log('校对成功')
                this.$root.must_info = must_info
                sessionStorage.setItem('environment', must_info.environment)
                return true
              } else {
                return false
              }
            } catch (e) {
              return false
            }
          } else {
            // 2.判断是否是刷新
            return sessionStorage.getItem('environment') && sessionStorage.getItem('environment') === ENVIRONMENT
          }
        }
      },
      // update_user_info
    }
  }
</script>

<style scoped>
</style>
