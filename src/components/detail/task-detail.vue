<template>
  <transition name="list">
    <div class="detail-body">
      <betterscroll class="wrapper" ref='wrapper'>
        <div>
          <div class="height10"></div>
          <back></back>
          <!--<div class="task-header" v-if="detail_info">-->
          <!--<div class="top flex fw">-->
          <!--<div class="tht-title ell">{{detail_info.min_title}}任务</div>-->
          <!--<div class="tht-user ell">悬赏发布人: {{detail_info.nickname}}</div>-->
          <!--</div>-->
          <!--<div class="bottom flex fw">-->
          <!--<div class="count-down flex">-->
          <!--<div class="cd-left flex ell">任务倒计时:</div>-->
          <!--&lt;!&ndash;任务倒计时:&ndash;&gt;-->
          <!--<span class="time">{{cut_time}}</span>-->
          <!--</div>-->
          <!--<div class="tdb-left flex">{{detail_info.num}}/-->
          <!--<span style="color: #6B41E1; font-weight: 900;font-size: 24px;transform: translate(0, -17.5%)">{{detail_info.use_num}}</span>次-->
          <!--</div>-->
          <!--<div class="tdb-right">+{{detail_info.single_price}}<span style="font-size: 10px;">元</span></div>-->
          <!--</div>-->
          <!--</div>-->
          <div class="new-task-header flex fw" v-if="detail_info">
            <div class="new-top flex fw">
              <img :src="detail_info.avatar" class="top-avatar"/>
              <div class="new-top-info-warp flex fw">
                <div class="tht-title ell">{{detail_info.min_title}}任务</div>
                <div class="tht-user ell">悬赏发布人: {{detail_info.nickname}}</div>
              </div>
              <div class="num-price ell">+<span style="font-size: 22px">{{detail_info.single_price}}</span>元</div>
            </div>
            <div class="new-task-num">
              任务数量:
              <span style="color: #555555">&nbsp;&nbsp;&nbsp;{{detail_info.num}}/</span>
              <span style="color: #F34281;font-weight: 900; font-size: 20px;">{{detail_info.use_num}}</span>
            </div>
            <div class="new-task-num" style="border: none">
              任务描述: <span style="color: #555;">&nbsp;&nbsp;{{detail_info.title}}</span>
            </div>
            <div class="task-url-warp flex">{{this.task_url}}</div>
            <div class="flex task-btn-copy" :data-clipboard-text="task_url" @click="_showTipsV"
                 :class="{'copy': detail_info.task_url}">点击复制 前往抖音
            </div>
          </div>
          <!--<div class="task-info flex fw" v-if="detail_info">-->
          <!--<div class="task-color-title flex">任务信息</div>-->
          <!--<div class="copy-warp flex">-->
          <!--<div class="copy-info" :class="{'blink': blink}">-->
          <!--<span>{{this.task_url}}</span>-->
          <!--</div>-->
          <!--&lt;!&ndash;<div class="copy-btn flex line-back" @click="$root.eventHub.$emit('titps', '请先报名此任务')"&ndash;&gt;-->
          <!--&lt;!&ndash;v-show="!detail_info.is_take_task">点击复制&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<div class="copy-btn flex line-back" :class="{'copy': detail_info.task_url}"-->
          <!--:data-clipboard-text="task_url" @click="_showTipsV">点击复制-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="task-info flex fw" v-if="detail_info">-->
          <!--<div class="task-color-title flex">任务描述</div>-->
          <!--<div class="dis-task-info flex">-->
          <!--{{detail_info.title}}-->
          <!--</div>-->
          <!--</div>-->
          <div class="task-info flex fw" v-if="detail_info">
            <img :src="detail_info.image_url" class="task-image" @load="$refs.wrapper.refresh()"/>
          </div>
        </div>
      </betterscroll>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 0">未在规定时间内完成</div>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 1">报名已结束</div>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 300">任务已提交</div>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 200">任务已完成</div>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 400">任务已过期</div>
      <div class="task-btn flex task-detail-btn line-back" v-if="btn_status === 100" @click="_toSubmitJob">重新提交</div>
      <div class="task-btn flex line-back task-detail-btn" v-if="btn_status === 2" @click="_toSubmitJob">提交任务</div>
      <div class="task-btn flex line-back task-detail-btn" v-if="btn_status === 3" @click="_signUp">立即报名</div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import betterscroll from 'base/better-scroll/better-scroll'
  import {task_detail, sign_up} from 'api/index'
  import ClipboardJS from 'clipboard'
  import back from 'base/back/back'

  export default {
    name: 'task-detail',
    data() {
      return {
        detail_info: null,
        cut_time: '',
        timer: null,
        disable_btn: null,
        blink: null,
        status: null,
        destroy: null,
        page_id: null
      }
    },
    computed: {
      task_url() {
        if (!this.detail_info) {
          return '加载中...'
        }
        if (!this.detail_info.task_url) {
          return '您还未报名该项目'
        }
        return this.httpString(this.detail_info.task_url)
      },
      btn_status() {
        try {
          if (!this.detail_info) {
            return 1
          }
          if (this.disable_btn && !this.status) {
            return 0
          }
          if (!this.detail_info || (!this.detail_info.can_sign_up && !this.status && this.status !== 0)) {
            return 1
          }
          if (this.status && this.status === 3) {
            return 100
          }
          if (this.status && this.status === 2) {
            return 200
          }
          if (this.status && this.status === -1) {
            return 400
          }
          if (this.status && this.status !== 0) {
            return 300
          }
          return this.detail_info.is_take_task ? 2 : 3
        } catch (e) {
          console.log(e)
        }
      },
    },
    created() {
      this.page_id = this.$route.params.id
      this._getDetail(this.page_id)
      const clipboard = new ClipboardJS('.copy')
      const that = this
      clipboard.on('success', function (e) {
        that.$root.eventHub.$emit('titps', '已复制链接,打开抖音完成任务')
        e.clearSelection()
      })
      clipboard.on('error', function (e) {
      })
      this.$root.eventHub.$on(`taskDetail`, (id) => {
        this.page_id = this.$route.params.id
        this._getDetail(id)
      })
      // this.$root.eventHub.$on(`updateMyTask${this.page_id}`, (info) => {
      //   this._getDetail()
      // })
      // this.$root.eventHub.$on('updateMyTask', (info) => {
      //   console.log(`通知的ret_id${info} 实际id:${this.detail_info.id}:  改页面${this.destroy}`)
      //   if (info && info.must) {
      //     console.log('开始更新')
      //     this._getDetail(info.id)
      //   }
      //   if (!this.destroy && (parseInt(info) === parseInt(this.detail_info.rtr_id))) {
      //     console.log('开始更新')
      //     this._getDetail(this.detail_info.id)
      //   } else {
      //     console.log('不更新')
      //   }
      // })
    },
    mounted() {
      this.$refs.wrapper._initScroll()
      // this.$router.push({
      //   name: 'sub-loading'
      // })
    },
    methods: {
      httpString(s) {
        let reg= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
        s = s.match(reg);
        if (s.length) {
          return s[0];
        } else {
          return ''
        }
      },
      _showTipsV() {
        if (!this.detail_info.task_url) {
          this.$root.eventHub.$emit('titps', '请先报名此任务')
        }
      },
      async _signUp() {
        try {
          if (!this.detail_info || !this.detail_info.id) {
            location.reload()
          }
          this.blink = null
          this.$root.eventHub.$emit('loading', true)
          // this.$router.push({
          //   name: 'sub-loading'
          // })
          const ret = await sign_up(this.detail_info.id, this.$root.user.username)
          this.$root.eventHub.$emit('loading', null)
          // this.$router.back(-1)
          if (ret.status === 200 && ret.data.code === 200) {
            this.blink = true
            let time = setTimeout(() => {
              this.blink = null
              clearTimeout(time)
            }, 2500)
            this._getDetail(this.detail_info.id, () => {
              this.$root.eventHub.$emit('titps', '成功报名,快去复制链接完成任务吧~')
              this.$refs.wrapper.scrollTo(0, 0)
            })
            return
          }
          if (ret === 443) {
            this.$root.eventHub.$emit('titps', '不能报名自己的任务')
            return false
          }
          if (ret === 403) {
            this.$root.eventHub.$emit('titps', '网络开了小差,稍后重试')
            return false
          }
          this.$root.eventHub.$emit('titps', '报名结束啦,看看其他任务吧')
        } catch (e) {
          console.log(e)
        }
      },
      _toSubmitJob() {
        let ret = JSON.parse(JSON.stringify(this.detail_info))
        ret.id = ret.rtr_id
        ret.page_id = this.page_id
        this.$router.push({
          name: 'submit-job',
          params: {
            info: ret
          }
        })
      },
      _getDetail(id, callback) {
        this.$root.eventHub.$emit('loading', true)
        let timer = setTimeout(async () => {
          const ret = await task_detail(id || this.page_id, this.$root.user.username)
          this.$root.eventHub.$emit('loading', null)
          if (ret.status === 200 && ret.data.code === 200) {
            this.detail_info = ret.data.data
            this.status = this.detail_info.status
            this.disable_btn = null
            clearInterval(this.timer)
            this.timer = null
            this._cutDown(this.detail_info.complete_time)
            if (callback) {
              callback()
            }
            return false
          }
          if (ret === 404) {
            this.$root.eventHub.$emit('titps', `该任务已被取消,无法查看`)
            this.$router.back(-1)
          } else {
            // this.$router.back(-1)
          }
          clearTimeout(timer)
          timer = null
        }, 400)
      },
      _cutDown(time) {
        console.log(time, '设置时间')
        if (!time) {
          this.cut_time = '您还未接受该任务'
          return false
        }
        this.timer = setInterval(() => {
          this.cut_time = this._msecTransform(time - Date.parse(new Date()))
        }, 1000)
        this.cut_time = this._msecTransform(time - Date.parse(new Date()))
      },
      _msecTransform(msec) {
        if (msec < 0) {
          clearInterval(this.timer)
          this.timer = null
          this.disable_btn = true
          return '任务已过期'
        }
        if (msec / 3600000 > 1) {
          const hour = Math.floor(msec / 3600000)
          const minute = Math.floor((msec % 3600000) / 60000)
          const scend = Math.floor((msec % 60000) / 1000)
          return `${hour > 9 ? hour : '0' + hour}:${minute > 9 ? minute : '0' + minute}:${scend > 9 ? scend : '0' + scend}`
        } else {
          const minute = Math.floor(msec / 60000)
          const scend = Math.floor((msec % 60000) / 1000)
          return `00:${minute > 9 ? minute : '0' + minute}:${scend > 9 ? scend : '0' + scend}`
        }
      },
    },
    beforeDestroy() {
      this.destroy = true
    },
    components: {
      back,
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 78px;
    overflow: hidden;
  }

  .task-header {
    width: 92%;
    height: 240px;
    margin: 10px auto;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .1);
  }

  .task-header:after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: url("https://cdn.xingkwh.com/%E4%BB%BB%E5%8A%A1%E6%A1%86@3x.png") no-repeat;
    background-size: 100% 100%;
    /*opacity: .9;*/
  }

  .top {
    height: 33%;
  }

  .bottom {
    height: 67%;
    align-content: flex-start;
    align-items: flex-start;
    position: relative;
  }

  .tht-title {
    width: 90%;
    margin: 0 auto 6px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 900;
    color: #6B41E1;
  }

  .tht-user {
    width: 90%;
    font-size: 10px;
    min-height: 20px;
    line-height: 20px;
    margin-bottom: -5px;
    color: #555555;
  }

  .count-down {
    width: 90%;
    height: 26px;
    border-radius: 6px;
    background: #fff;
    color: #CCCCCC;
    font-size: 12px;
    margin: 16px auto;
    overflow: hidden;
    justify-content: flex-start;
  }

  .cd-left {
    width: 30%;
    height: 100%;
    background: #E3DEFF;
    color: #6B41E1;
    font-size: 12px;
    margin-right: 10px;
  }

  .time {
    color: #FE5F91;
    font-weight: 600;
    font-size: 14px;
    text-indent: 10px;
  }

  .tdb-left {
    position: absolute;
    left: 4%;
    top: 55%;
    width: 27%;
    height: 30%;
    border-radius: 8px;
    color: #6b41e1;
    font-size: 13px;
    font-weight: 400;
    vertical-align: text-bottom;
    /*background: rgba(0,0,0,.7);*/
  }

  .tdb-right {
    position: absolute;
    left: 47%;
    top: 55%;
    width: 27%;
    height: 30%;
    border-radius: 8px;
    color: #FF6000;
    font-size: 20px;
    font-weight: 900;
    vertical-align: bottom;
    line-height: 45px;
    padding-left: 5%;
    /*background: rgba(0,0,0,.7);*/
  }

  .copy-warp {
    width: 90%;
    height: 40px;
    margin: 10px auto;
  }

  .copy-info {
    display: inline-block;
    width: 65%;
    height: 100%;
    line-height: 40px;
    text-indent: 20px;
    border-radius: 8px;
    background: #F8F8F8;
    color: #333;
    margin-right: 20px;
    font-size: 13px;
    /*user-select: text;*/
    /*overflow: scroll;*/
    white-space: nowrap;
    transition: all .5s;
    overflow: hidden;
  }

  .copy-info span {
    width: auto;
    display: inline-block;
    white-space: nowrap;
  }

  .copy-btn {
    width: 20%;
    height: 30px;
    border-radius: 10px;
    color: #fff;
    white-space: nowrap;
    flex-grow: 1;
    max-width: 90px;
  }

  .task-image {
    display: block;
    width: 100%;
    height: auto;
  }

  .task-detail-btn {
    position: fixed;
    bottom: 5px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .disable-btn {
    background: #bbb;
    color: #fff;
  }

  .blink {
    color: #ff3939;
  }

  .dis-task-info {
    background: #f8f8f8;
    color: #444;
    padding: 8px 4%;
    width: 80%;
    height: auto;
    margin: 10px auto;
    line-height: 20px;
    font-size: 13px;
    border-radius: 10px;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }

  .line-back {
    background: #F74BCA;
  }

  img {
    width: 100%;
    height: auto;
    user-select: none;
    pointer-events: none;
  }

  .top-avatar {
    width: 54px;
    height: 54px;
    border-radius: 1000px;
    margin: 0 1% 0 5%;
  }

  .new-task-header {
    width: 92%;
    height: auto;
    min-height: 240px;
    margin: 10px auto;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .1);
    background: #fff;
    color: #333;
    align-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
  }

  .new-top {
    width: 100%;
    height: 80px;
    background: #E3DEFF;
    justify-content: flex-start;
  }

  .new-top-info-warp {
    width: 0;
    flex-grow: 1;
    height: 100%;
  }

  .num-price {
    width: 90px;
    height: 100%;
    color: #FF6000;
    font-weight: 600;
    font-size: 14px;
    line-height: 80px;
    vertical-align: bottom;
  }

  .new-task-num {
    width: 90%;
    height: auto;
    min-height: 22px;
    line-height: 20px;
    border-bottom: 1px dashed #E3DEFF;
    vertical-align: bottom;
    word-break: break-all;
    padding: 15px 0;
  }

  .new-task-num span {
    display: inline-block;
    height: 100%;
  }

  .task-url-warp {
    width: 83%;
    padding: 10px 4%;
    height: auto;
    line-height: 18px;
    min-height: 30px;
    background: #F8F8F8;
    border-radius: 10px;
    word-break: break-all;
    user-select: text;
    color: #999999;
    font-size: 12px;
  }

  .task-btn-copy {
    background: #FB53D9;
    color: #fff;
    width: 40%;
    height: 35px;
    border-radius: 6px;
    margin: 15px auto 20px;
  }
</style>
