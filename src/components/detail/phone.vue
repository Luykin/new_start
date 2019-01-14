<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info flex fw">
        <!--{{$root.user.phone}}-->
        <div class="phone-header flex js">{{Boolean($root.user.phone) ? `您已绑定了手机号${$root.user.phone}` : '绑定手机号即可提现哦'}}</div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">手机号</div>
          <div class="tiw-mid">
            <input type="number" name="手机号" placeholder="请输入手机号" class="index-input" v-model="phone"/>
          </div>
          <div class="tiw-right"></div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">获取验证码</div>
          <div class="tiw-mid">
            <input type="number" name="验证码" placeholder="请输入验证码" class="index-input" v-model="code"/>
          </div>
          <div class="tiw-right flex">
            <div class="line-back flex code-btn" @click="_getCode">{{time ? `${time}s` : '发送验证码'}}</div>
          </div>
        </div>
        <div class="task-btn flex line-back" @click="_bindPhone">立即绑定</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import {bind_phone, send_verify} from 'api/index'

  export default {
    name: 'phone',
    data() {
      return {
        phone: '',
        code: '',
        time: 0,
        timer: null
      }
    },
    mounted() {
      document.querySelectorAll('.index-input').forEach((item) => {
        item.addEventListener('blur', () => {
          try {
            document.body.scrollTop = document.body.scrollHeight;
            document.documentElement.scrollTop = 0;
          } catch (e) {
            console.log(e)
          }
        })
      })
    },
    methods: {
      async _bindPhone() {
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
        // bind_phone(code, phone, username) {
        const ret = await bind_phone(this.code, this.phone, this.$root.user.username)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', `绑定成功~`)
          this.$root.eventHub.$emit('updateUserInfo')
          this.$router.back(-1)
        } else {
          this.code = ''
          this.$root.eventHub.$emit('titps', `失败, 请稍后重试`)
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
    created() {
      console.log(Boolean(this.$root.user.phone))
    },
    components: {
      back
    }
  }
</script>

<style scoped>
  .phone-header{
    height: 50px;
    width: 100%;
    background: #E3DEFF;
    color: #6B41E1;
    margin-bottom: 25px;
    text-indent: 20px;
  }

  .task-info {
    padding: 0;
    min-height: 300px;
    overflow: hidden;
  }

  .task-input-warp {
    width: 90%;
    height: 42px;
    background: #F8F8F8;
    border-radius: 6px;
    margin: 6px auto;
    overflow: hidden;
  }

  .max-task-input-warp {
    height: 85px;
    background: none;
  }

  .max-task-input-warp .tiw-mid {
    background: #F8F8F8;
  }

  .tiw-left {
    height: 100%;
    width: 30%;
    flex-shrink: 0;
    color: #333;
    justify-content: flex-start;
    white-space: nowrap;
    text-indent: 10px;
  }

  .tiw-mid {
    width: 0;
    flex-grow: 1;
    height: 100%;
  }

  .tiw-right {
    width: auto;
    height: 100%;
    /*margin-right: 10px;*/
  }

  .light-color {
    color: #999999;
  }

  .index-input {
    width: 100%;
    height: 100%;
    text-indent: 20px;
    color: #333;
    background: none;
    user-select: text !important;
  }

  .index-input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #CCCCCC;
  }
  .code-btn{
    width: 90px;
    height: 80%;
    border-radius: 10px;
    /*margin-left: 10px;*/
    /*margin: auto 0;*/
    color: #fff;
  }
</style>
