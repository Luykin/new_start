<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div>
          <div class="task-info flex" v-for="item in list" v-if="list.length" :key="item.id"
               @click="_toSubmitJob(item)">
            <img :src="item.avatar"/>
            <div class="flex audit-body fw ell">
              <span class="flex js ab-name">{{item.service_group_id === 1 ? '抖音': '快手'}}名:{{item.task_nickname || item.nickname}}</span>
              <span class="flex js ab-time cut-down" v-if="item.status === 1">{{'审核倒计时:' + _msecTransform(item.user_audit_time - nowTime)}}</span>
              <span class="flex js ab-time" v-else>时间:{{item.time}}</span>
            </div>
            <div class="flex img-audit" @click.stop="_setEnlargeImage(item.task_image)">
              <img :src="item.task_image" v-if="item.task_image" @error="_setError(item)"/>
              <span v-if="item.error">图片错误</span>
            </div>
            <div class="flex audit-other fw" v-if="item.status !== 1">
              <div class="min-title flex">{{item.min_title}}</div>
              <div class="flex ao-status">{{_statusText(item.status)}}
              </div>
            </div>
            <div class="flex audit-other fw" v-else @click.stop="">
              <div class="ao-btn flex" @click="_showNoPasss(item)">不通过</div>
              <div class="ao-btn flex suc-color" @click="_pass(item, 1)">通过</div>
            </div>
          </div>
          <empyt v-show="!list.length" :padding="90"></empyt>
        </div>
      </betterscroll>
      <popup ref="nopass">
        <div class="popup-report">
          <h1 class="flex pop-title">审核不通过</h1>
          <span class="describe">告知提交人不通过原因</span>
          <div class="pop-text-text flex nopass-text">
            <textarea v-model="nopass" placeholder="不通过理由" maxlength="120" class="disScroll"></textarea>
          </div>
          <div class="pop-btn-warp flex">
            <div class="flex pop-btn back-f8" @click="_close">取消</div>
            <div class="flex pop-btn line-back" @click="_noPass">确定</div>
          </div>
        </div>
      </popup>
      <enlarge :image="enlarge_image" @close="_setEnlargeImage()"></enlarge>
      <!--<div class="task-btn flex suc-color" @click="_submit" v-if="list.length && info.types === 1">全部通过</div>-->
      <router-view></router-view>
      <interlayer ref="interlayer"></interlayer>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import enlarge from 'components/enlarge/enlarge'
  import empyt from 'base/empyt/empyt'
  import {task_audit, pass_or_fail_task, pass_task} from 'api/index'
  import {timeformat} from 'common/js/util'
  import betterscroll from 'base/better-scroll/better-scroll'
  import interlayer from 'base/interlayer/interlayer'
  import popup from 'base/popup/popup'

  export default {
    name: 'audit-list',
    data() {
      return {
        page: 0,
        num: 10,
        total: 0,
        list: [],
        // parse: null,
        task_id: null,
        info: null,
        nopass: '',
        nowItem: null,
        enlarge_image: null,
        nowTime: Date.parse(new Date()),
      }
    },
    created() {
      this.$root.eventHub.$on('audit', (id) => {
        // console.log(id, this.info)
        if (id === this.info.task_id || id === this.info.id) {
          this._pulldown()
        }
      })
      // this.parse = {
      //   name: 'manage-detail',
      //   params: this.$route.params
      // }
    },
    mounted() {
      this.info = this.$route.params
      this._getTaskAudit()
      this.$refs.wrapper._initScroll()
      this._setTime()
      document.querySelectorAll('.disScroll').forEach((item) => {
        item.addEventListener('blur', () => {
          try {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          } catch (e) {
            console.log(e)
          }
        })
      })
    },
    computed: {
      _statusText() {
        return (status) => {
          return status === -1 ? '已过期' : status === 0 ? '进行中' : status === 1 ? '等待审核' : status === 2 ? '审核通过' : status === 3 ? '审核不通过' : '仲裁'
        }
      }
    },
    methods: {
      async _submit() {
        this.$root.eventHub.$emit('titps', `等待时间较长,请勿刷新页面`)
        this.$root.eventHub.$emit('loading', true)
        const ret = await pass_task(this.$root.user.username, this.info.id)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', `审核成功`)
          this.$router.back(-1)
        }
      },
      _close() {
        this.nowItem = ''
        this.$refs.interlayer._hiddenLayer()
        this.$refs.nopass._hiddenPopup()
      },
      _noPass() {
        if (!this.nopass) {
          this.$root.eventHub.$emit('titps', `请输入不通过的理由`)
          return false
        }
        if (this.nopass.length < 6) {
          this.$root.eventHub.$emit('titps', `请至少输入5个字符`)
          return false
        }
        this._pass(this.nowItem, 2, this.nopass)
        this._close()
      },
      _showNoPasss(item) {
        this.nowItem = item
        // console.log(this.nowItem)
        this.$refs.interlayer._showLayer()
        this.$refs.nopass._showPopup()
      },
      async _pass(item, type, task_message) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await pass_or_fail_task(item.id, item.task_id, this.$root.user.username, type, task_message)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (type === 1) {
            item.status = 2
          }
          if (type === 2) {
            item.status = 3
          }
          this.nopass = ''
          this.$root.eventHub.$emit('titps', `提交成功`)
        }
        if (ret === 442) {
          this.$root.eventHub.$emit('audit', item.task_id)
          this.$root.eventHub.$emit('titps', `该任务已完成`)
        }
        if (ret === 403) {
          this.$root.eventHub.$emit('titps', `网络开了小差`)
          return false
        }
        if (ret === 404) {
          this.$root.eventHub.$emit('titps', `好像出错啦~`)
          return false
        }
      },
      _setError(item) {
        item.task_image = null
        item.error = true
      },
      _setEnlargeImage(image) {
        // console.log('??')
        if (!image) {
          this.enlarge_image = null
        } else {
          this.enlarge_image = image
        }
      },
      _setTime() {
        setInterval(() => {
          this.nowTime = Date.parse(new Date())
        }, 1000)
      },
      async _getTaskAudit(must) {
        this.$root.eventHub.$emit('loading', true)
        // task_audit(id, username, types, page, num) {
        const ret = await task_audit(this.info.id, this.$root.user.username, this.info.types || 1, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (must) {
            this.list = []
          }
          this.list = [...this.list, ...this._format(ret.data.data.ret)]
          this.total = ret.data.data.count
          this.task_id = ret.data.data.task_id
        }
        if (ret === 403 && !this.list.length) {
          this.$root.eventHub.$emit('titps', `网络开了小差~`)
          // this.$router.back(-1)
          return false
        }
      },
      _toSubmitJob(item) {
        // console.log(item.status)
        if (!item.status) {
          this.$root.eventHub.$emit('titps', `本条任务正在进行中~`)
          return false
        }
        this.$router.push({
          name: 'submit-job',
          params: {
            info: Object.assign(item, {
              audit: true,
              task_id: this.task_id
            })
          }
        })
        // this.$router.push({
        //   name: 'al-submitJob',
        //   params: Object.assign(item, {
        //     audit: true,
        //     task_id: this.task_id
        //   })
        // })
      },
      _format(list) {
        if (!list || !list.length) {
          return []
        }
        list.forEach((res) => {
          // console.log(res.complete_time)
          if (res.user_audit_time || res.complete_time) {
            res.time = timeformat(res.user_audit_time || res.complete_time)
          }
        })
        return list
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        // this.list = []
        this._getTaskAudit(true)
      },
      _scrollToEnd() {
        // console.log(this.list.length < this.totle, typeof this.list.length, this.list.length , typeof this.total, this.total)
        if (this.list.length < this.total) {
          this.page += 1
          this._getTaskAudit()
        }
      },
      _msecTransform(msec) {
        if (msec < 0) {
          return '已过期'
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
    components: {
      back,
      empyt,
      popup,
      enlarge,
      interlayer,
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
  }

  .task-info {
    height: 70px;
    min-height: 70px;
    align-content: center;
    align-items: center;
  }

  .task-info img {
    width: 45px;
    height: 45px;
    border-radius: 1000px;
    margin: 0 10px;
  }

  .ab-name {
    color: #444;
    font-size: 13px;
  }

  .ab-time {
    color: #9096AB;
    font-size: 10px;
    margin-top: 5px;
  }

  .audit-body {
    height: 100%;
    /*flex-grow: 2;*/
  }

  .audit-other {
    width: auto;
    flex-grow: 1;
    min-width: 100px;
    height: 100%;
  }

  .min-title {
    width: auto;
    background: #E3DEFF;
    color: #6B41E1;
    padding: 4px 6px;
    border-radius: 3px;
    font-size: 10px;
    transform: scale(.9, .9);
    margin-bottom: 10px;
  }

  .ao-status {
    font-weight: 600;
    color: #FF8215;
    font-size: 13px;
  }

  .cut-down {
    color: #ff6000;
  }

  .img-audit {
    max-width: 50px;
    min-width: 35px;
  }

  .img-audit span {
    font-size: 10px;
    color: #999;
    white-space: nowrap;
  }

  .img-audit img {
    width: 35px;
    height: 55px;
    border-radius: 0;
  }

  .ao-btn {
    width: 70%;
    height: 28px;
    border-radius: 5px;
    color: #fff;
    background: #6B41E1;
    margin: 5px 0;
    font-size: 13px;
  }

  .suc-color {
    background: #F656D9;
  }

  .task-btn {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .popup-report {
    width: 80%;
    padding: 4% 4% 70px 4%;
    min-height: 160px;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
  }

  .pop-title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  }

  .describe {
    display: block;
    width: 90%;
    line-height: 20px;
    margin: 0 auto;
    color: #444;
  }

  .pop-text-text {
    width: 94%;
    height: 80px;
    background: #f8f8f8;
    border-radius: 4px;
    overflow: hidden;
    margin: 0 auto;
  }

  .pop-text-text textarea {
    width: 90%;
    height: 80%;
    border: none;
    outline: none;
    background: #f8f8f8;
    text-indent: 10px;
    color: #444;
  }

  .index-input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /*color: rgba(255, 255, 255, .7);*/
    color: #CCCCCC;
  }

  .pop-btn {
    height: 100%;
    color: #fff;
  }

  .line-back {
    background: #F74BCA;
  }

  .back-f8 {
    background: #f8f8f8;
    color: #333;
  }

  .pop-btn-warp {
    /*height: 50px;*/
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /*background: red;*/
    height: 50px;
    /*border-radius: 8px;*/
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow: hidden;
  }

  .nopass-text {
    margin: 20px auto -10px;
  }
</style>
