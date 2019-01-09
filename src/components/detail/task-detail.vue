<template>
  <transition name="list">
    <div class="detail-body">
      <betterscroll class="wrapper" ref='wrapper'>
        <div>
          <div class="height10"></div>
          <back></back>
          <div class="task-header" v-if="detail_info">
            <div class="top flex fw">
              <div class="tht-title ell">{{detail_info.title}}</div>
              <div class="tht-user ell">悬赏发布人: {{detail_info.nickname}}</div>
            </div>
            <div class="bottom flex fw">
              <div class="count-down flex">
                <div class="cd-left flex ell">{{detail_info.min_title}}任务</div>
                任务倒计时:
                <span class="time">{{cut_time}}</span>
              </div>
              <div class="tdb-left flex">{{detail_info.num}}/
                <span style="color: #6B41E1; font-weight: 900;font-size: 24px;transform: translate(0, -17.5%)">{{detail_info.use_num}}</span>次
              </div>
              <div class="tdb-right">+{{detail_info.single_price}}<span style="font-size: 10px;">元</span></div>
            </div>
          </div>
          <div class="task-info flex fw" v-if="detail_info">
            <div class="task-color-title flex">任务信息</div>
            <div class="copy-warp flex">
              <div class="copy-info" :class="{'blink': blink}">
                <span>{{this.task_url}}</span>
              </div>
              <div class="copy-btn flex line-back" @click="$root.eventHub.$emit('titps', '请先报名此任务')"
                   v-show="!detail_info.is_take_task">点击复制
              </div>
              <div class="copy-btn flex line-back copy" v-show="detail_info.is_take_task"
                   :data-clipboard-text="task_url" @click="">点击复制
              </div>
            </div>
          </div>
          <div class="task-info flex fw" v-if="detail_info">
            <div class="task-color-title flex">任务描述</div>
            <div class="dis-task-info flex">
              {{detail_info.title}}
            </div>
          </div>
          <div class="task-info flex fw" v-if="detail_info">
            <img :src="detail_info.image_url" class="task-image" @load="$refs.wrapper.refresh()"/>
          </div>
        </div>
      </betterscroll>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 0">未在规定时间内完成</div>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 1">暂时无法报名</div>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 300">任务已提交</div>
      <div class="task-btn flex task-detail-btn disable-btn" v-if="btn_status === 200">任务已完成</div>
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
        destroy: null
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
        return this.detail_info.task_url
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
      this._getDetail(this.$route.params.id)
      const clipboard = new ClipboardJS('.copy')
      const that = this
      clipboard.on('success', function (e) {
        that.$root.eventHub.$emit('titps', '已复制作品链接,赶快打开抖音完成任务吧~')
        // console.log(e)s
        e.clearSelection()
      })
      clipboard.on('error', function (e) {
      })
      this.$root.eventHub.$on('updateMyTask', (id) => {
        console.log(`通知的ret_id${id} 实际id:${this.detail_info.id}:  改页面${this.destroy}`)
        if (!this.destroy && id === this.detail_info.rtr_id) {
          this._getDetail(this.detail_info.id)
        }
      })
    },
    mounted() {
      this.$refs.wrapper._initScroll()
    },
    methods: {
      async _signUp() {
        try {
          if (!this.detail_info || !this.detail_info.id) {
            location.reload()
          }
          this.blink = null
          this.$root.eventHub.$emit('loading', true)
          const ret = await sign_up(this.detail_info.id, this.$root.user.username)
          this.$root.eventHub.$emit('loading', null)
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
            return
          }
          this.$root.eventHub.$emit('titps', '任务已暂停报名')
        } catch (e) {
          console.log(e)
        }
      },
      _toSubmitJob() {
        let ret = JSON.parse(JSON.stringify(this.detail_info))
        ret.id = ret.rtr_id
        // console.log(this.$route.path.indexOf('/myTask'))
        if (this.$route.path.indexOf('/myTask') > -1) {
          this.$router.push({
            name: 'mySubmitJob',
            params: ret
          })
        } else {
          this.$router.push({
            name: 'submitJob',
            params: ret
          })
        }
      },
      async _getDetail(id, callback) {
        console.log(`要更新的id${id}`)
        this.$root.eventHub.$emit('loading', true)
        const ret = await task_detail(id, this.$root.user.username)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.detail_info = ret.data.data
          this.status = this.detail_info.status
          clearInterval(this.timer)
          this.timer = null
          this._cutDown(this.detail_info.complete_time)
          if (callback) {
            callback()
          }
        }
      },
      _cutDown(time) {
        // console.log(time)
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
    bottom: 85px;
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
    margin: 0 auto 10px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 900;
    color: #fff;
  }

  .tht-user {
    width: 90%;
    font-size: 12px;
    color: #fff;
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

  .copy-info span{
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
    bottom: 15px;
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
</style>
