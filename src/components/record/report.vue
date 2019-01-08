<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="cachet flex js">
        <div class="cachet-item flex" v-for="item in btn_list" :class="{'active-cachet-item': item.id === activeId}"
             @click="_change(item.id)">{{item.name}}
        </div>
      </div>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div class="min-warp-height">
          <div class="task-info flex fw" v-for="item in list" v-if="list.length" :key="item.id">
            <div class="report-header flex fw">
              <div class="flex rh-top js">
                <img :src="item.avatar" class="avatar"/>
                <div class="flex fw rh-title-warp">
                  <span class="flex js">{{item.title.slice(0, 14)}}</span>
                  <span class="flex js id-text">举报人ID: {{item.appeal_user_username}}</span>
                </div>
                <div class="rh-titps">{{setTips(item)}}</div>
              </div>
              <div class="rh-bottom flex js">
                <span class="flex js">举报时间: {{item.time}}</span>
                <span style="color: #ff8215; justify-content: flex-end" class="flex" v-show="_showCutDown(item)">{{`辩诉倒计时:${_msecTransform(item.arbitrate_time - nowTime)}`}}</span>
              </div>
            </div>
            <div class="report-image flex">
              <div class="report-image-item flex"
                   :style="`background: url(${item.appeal_user_image}) no-repeat center center; background-size: 100% auto;`" @click="_setEnlargeImage(item.appeal_user_image)">
                <div class="rii-text">{{item.appeal_user_explain}}</div>
              </div>
              <div class="report-image-item flex" style="background: none" v-if="activeId === 2 && !item.plea_user_image">
                <span class="reSay-waro ell">等待对方回复</span>
              </div>
              <div class="report-image-item flex" :style="_setImage(item.plea_user_image)" @click="_showModel(item)" v-else>
                <div class="rii-text" v-if="item.plea_user_explain">{{item.plea_user_explain}}</div>
              </div>
            </div>
          </div>
          <empyt v-show="!list.length" :padding="90"></empyt>
        </div>
      </betterscroll>
      <interlayer ref="interlayer"></interlayer>
      <popup ref="popup">
        <div class="popup-report">
          <h1 class="flex pop-title">举报维权</h1>
          <span class="describe">请上传您真实任务完成截图，对您仲裁结果成功率更高哦！</span>
          <div class="upload-warp" @click="_choseImg">
            <div class="upload-inner flex">
              <div class="process-warp flex fw" v-show="process && process < 100">
                {{process}}%
                <span class="flex">正在上传,请耐心等待...</span>
              </div>
              <upload ref="upload" @view="_setUrl" @setProcess="_setProcess" @err="_err" @success="_success"></upload>
              <img ref="previewImg"/>
            </div>
          </div>
          <div class="pop-text-text flex">
            <textarea v-model="textarea" placeholder="辩诉说明" maxlength="120" class="disableScroll"></textarea>
          </div>
          <div class="pop-btn-warp flex">
            <div class="flex pop-btn back-f8" @click="_close">取消</div>
            <div class="flex pop-btn line-back" @click="_submit">确定</div>
          </div>
        </div>
      </popup>
      <enlarge :image="enlarge_image" @close="_setEnlargeImage()"></enlarge>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import empyt from 'base/empyt/empyt'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {rights_protection, sub_of_plea} from 'api/index'
  import {timeformat} from 'common/js/util'
  import interlayer from 'base/interlayer/interlayer'
  import popup from 'base/popup/popup'
  import upload from 'base/upload/upload'
  import enlarge from 'components/enlarge/enlarge'

  export default {
    name: 'recharge',
    data() {
      return {
        btn_list: [{
          id: 1,
          name: '我被举报'
        }, {
          id: 2,
          name: '我的举报'
        }],
        activeId: 1,
        page: 0,
        num: 10,
        list: [],
        total: 0,
        timer: null,
        process: 0,
        res_info: null,
        textarea: '',
        nowChose: null,
        // cut_down_bs: null,
        nowTime: Date.parse(new Date()),
      }
    },
    computed: {
      _showCutDown() {
        return (item) => {
          return !item.plea_user_image && item.status === 4
        }
      },
      _setImage() {
        return (image) => {
          if (!image) {
            return ''
          } else {
            return `background: url(${image}) no-repeat center center; background-size: 100% auto;`
          }
        }
      },
      setTips() {
        return (item) => {
          if (this.activeId === 1) {
            return item.status === 4 ? item.plea_user_explain ? '等待平台仲裁' : '等待辩诉' : item.status === 5 ? '辩诉失败' : '辩诉成功'
          } else {
            return item.status === 4 ? item.plea_user_explain ? '等待平台仲裁' : '等待申述' : item.status === 5 ? '申述成功' : '申诉失败'
          }
        }
      },
    },
    created() {
      this._getRightsProtection(this.activeId)
    },
    mounted() {
      this.$refs.wrapper._initScroll()
      this._setTime()
      document.querySelectorAll('.disableScroll').forEach((item) => {
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
    methods: {
      _setTime() {
        setInterval(() => {
          this.nowTime = Date.parse(new Date())
        }, 1000)
      },
      async _getRightsProtection(id, callback) {
        this.$root.eventHub.$emit('loading', true)
        // rp_type, username, page, num) {
        const ret = await rights_protection(id || this.activeId, this.$root.user.username, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.list = [...this.list, ...this._format(ret.data.data.ret)]
          this.total = ret.data.data.count
          if (callback) {
            callback();
          }
        }
      },
      _format(list) {
        if (!list || !list.length) {
          return []
        }
        list.forEach((res) => {
          res.time = timeformat(res.create)
        })
        return list
      },
      _err() {
        this.process = 0
        this.$refs.previewImg.src = null
        this.$root.eventHub.$emit('titps', `上传出错啦,请查询选择图片~`)
      },
      _setUrl(url) {
        this.process = 0.1
        this.$refs.previewImg.src = url
      },
      _setProcess(res) {
        this.process = res.total.percent.toFixed(2)
      },
      _choseImg() {
        if (this.process && this.process < 100) {
          return false
        }
        this.$refs.upload._imitateClick()
      },
      _success(res) {
        this.res_info = res
      },
      _change(id) {
        if (this.timer) {
          this.$root.eventHub.$emit('titps', `请勿频繁点击`)
          return false
        }
        if (this.activeId !== id) {
          this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.timer = null
          }, 600)
          // this.activeId = id
          this._pulldown(id, () => {
            this.activeId = id
          })
        }
      },
      _showModel(item) {
        if (item.plea_user_image) {
          this._setEnlargeImage(item.plea_user_image)
          return false
        }
        if (this.activeId === 2) {
          this.$root.eventHub.$emit('titps', `请等待辩诉回应~`)
          return false
        }
        this.$refs.interlayer._showLayer()
        this.$refs.popup._showPopup()
        this.nowChose = item
      },
      async _submit() {
        if (!this.textarea) {
          this.$root.eventHub.$emit('titps', `请先填写您的辩诉说明~`)
          return false
        }
        if (!this.process) {
          this.$root.eventHub.$emit('titps', `请先上传您完成的截图~`)
          return false
        }
        if (this.process < 100) {
          this.$root.eventHub.$emit('titps', `请等待上传完成`)
          return false
        }
        if (!this.nowChose) {
          console.log('nowChose')
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await sub_of_plea(this.nowChose.id, this.$root.user.username, this.res_info.key, this.textarea)
        this.$root.eventHub.$emit('loading', null)
        // console.log(ret)
        if (ret.status === 200 && ret.data.code === 200) {
          this._close()
          this._pulldown()
          this.$root.eventHub.$emit('titps', `提交成功~`)
          // console.log(ret)
        }
        if (ret === 403) {
          this.$root.eventHub.$emit('titps', `您已经提交过了~`)
        }
      },
      _close() {
        this.$refs.interlayer._hiddenLayer()
        this.$refs.popup._hiddenPopup()
      },
      _pulldown(id = this.activeId, callback) {
        this.num = 10
        this.page = 0
        this.list = []
        this._getRightsProtection(id, callback)
      },
      _scrollToEnd() {
        if (this.list.length < this.total) {
          this.page += 1
          this._getRightsProtection(this.activeId)
        }
      },
      _setEnlargeImage(image) {
        // console.log(image)
        if (!image) {
          this.enlarge_image = null
        } else {
          this.enlarge_image = image
        }
      },
      _msecTransform(msec) {
        if (msec < 0) {
          return ''
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
      upload,
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
    top: 110px;
    bottom: 0;
    overflow: hidden;
  }

  .task-info {
    padding: 0;
    overflow: hidden;
  }

  .report-header {
    background: #E3DEFF;
    height: 100px;
  }

  .rh-top {
    width: 92%;
    height: 65%;
    margin: 0 auto;
    position: relative;
  }

  .rh-titps {
    position: absolute;
    right: 0;
    top: 50%;
    /*transform: translate(0, -50%);*/
    color: #FF8215;
    font-weight: 600;
  }

  .rh-bottom {
    width: 92%;
    height: 35%;
    margin: 0 auto;
    font-size: 13px;
    color: #6B41E1;
  }

  .report-header .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 100%;
    /*margin: 0 10px;*/
  }

  .report-image {
    min-height: 200px;
    background: #fff;
    overflow: hidden;
  }

  .report-image-item {
    width: 42%;
    padding-top: 75%;
    margin: 20px 2%;
    border: 1px solid #F8F8F8;
    background: url("../../assets/img/phone.png") no-repeat center center;
    background-size: 50px auto;
    position: relative;
  }

  .rii-text {
    width: 94%;
    position: absolute;
    bottom: 0;
    height: auto;
    max-height: 150px;
    min-height: 20px;
    padding: 10px 3%;
    background: rgba(227, 222, 255, .85);
    color: #6B41E1;
    font-size: 12px;
    line-height: 17px;
    text-indent: 10px;
    word-break: break-all;
    overflow: hidden;
  }

  .id-text {
    font-size: 10px;
    color: #6b41e1;
    margin: 5px 0 -5px;
  }

  .rh-title-warp {
    width: 60%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    max-width: 180px;
  }

  .popup-report {
    width: 80%;
    padding: 4% 4% 70px 4%;
    min-height: 260px;
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

  .upload-warp {
    flex-grow: 1;
    height: 0;
    padding-top: 50%;
    background: #F8F8F8;
    margin: 12px;
    position: relative;
    overflow: hidden;
  }

  .upload-inner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url("../../assets/img/phone.png") no-repeat center center;
    background-size: 55px auto;
    overflow: hidden;
    align-items: flex-start;
    border: 1px solid #f8f8f8;
  }

  .upload-inner img {
    width: 100%;
    height: auto;
  }

  .process-warp {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .55);
    color: #aee4ac;
    font-weight: 600;
    font-size: 20px;
  }

  .process-warp span {
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    margin-top: 15px;
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

  .pop-btn {
    height: 100%;
    color: #fff;
  }

  .back-f8 {
    background: #f8f8f8;
    color: #333;
  }
</style>
