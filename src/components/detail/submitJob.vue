<template>
  <transition name="list">
    <div class="detail-body">
      <back ref="back"></back>
      <div class="task-info flex fw js">
        <div class="submit-job-header flex line-back">
          {{detail_info.title.slice(0,8)}}
          <div class="min-title">{{detail_info.min_title}}</div>
        </div>
        <div class="normal-title flex">{{detail_info.task_message ? `未通过原因: ${detail_info.task_message}` :
          '请按示例截图并上传提交给悬赏人审核'}}
        </div>
        <div class="upload-warp"
             :style="`background: #f8f8f8 url(${detail_info.complete_image}) no-repeat center center; background-size: 100% auto;`"></div>
        <div class="upload-warp"
             :style="`background: #f8f8f8 url(${detail_info.task_image}) no-repeat center center; background-size: 100% auto;`"
             v-if="(detail_info.task_image && detail_info.status !== 3) || detail_info.audit"></div>
        <div class="upload-warp" @click="_choseImg" v-else>
          <div class="upload-inner flex">
            <div class="process-warp flex fw" v-show="process && process < 100">
              {{process}}%
              <span class="flex">正在上传,请耐心等待...</span>
            </div>
            <upload ref="upload" @view="_setUrl" @setProcess="_setProcess" @err="_err" @success="_success"></upload>
            <img ref="previewImg"/>
          </div>
        </div>
        <div class="flex success" v-if="!detail_info.audit && detail_info.status === 2">
          <img src="../../assets/img/manage4.png"/>
          您的任务已审核通过，赏金已进入您的收益。
        </div>
        <div class="flex task-input-warp" v-if="!detail_info.audit && (!detail_info.status || detail_info.status === 3)">
          <div class="tiw-left flex">抖音号</div>
          <div class="tiw-mid">
            <input type="text" name="抖音号" placeholder="请输入你的抖音号" class="index-input" v-model="dy_name"/>
          </div>
          <div class="tiw-right"></div>
        </div>
        <!--task_nickname-->
        <div v-if="detail_info.audit && detail_info.status === 1" class="flex dy-id">抖音号:{{detail_info.task_nickname}} </div>
      </div>

      <interlayer ref="interlayer"></interlayer>
      <popup ref="nopass">
        <div class="popup-report">
          <h1 class="flex pop-title">审核不通过</h1>
          <span class="describe">告知提交人不通过原因</span>
          <div class="pop-text-text flex nopass-text">
            <textarea v-model="nopass" placeholder="不通过理由" maxlength="120"></textarea>
          </div>
          <div class="pop-btn-warp flex">
            <div class="flex pop-btn back-f8" @click="_close">取消</div>
            <div class="flex pop-btn line-back" @click="_noPass">确定</div>
          </div>
        </div>
      </popup>
      <popup ref="popup">
        <div class="popup-report flex fw js">
          <h1 class="flex pop-title">举报维权</h1>
          <span class="describe">请上传您真实任务完成截图，对您仲裁结果成功率更高哦！</span>
          <div class="upload-warp" @click="_choseImgZC">
            <div class="upload-inner flex">
              <div class="process-warp flex fw" v-show="processZC && processZC < 100">
                {{processZC}}%
                <span class="flex">正在上传...</span>
              </div>
              <upload ref="uploadZC" @view="_setUrlZC" @setProcess="_setProcessZC" @err="_errZC"
                      @success="_successZC"></upload>
              <img ref="previewImgZC"/>
            </div>
          </div>
          <div class="upload-warp">
            <span class="reSay-waro ell">等待对方回复</span>
          </div>
          <div class="pop-text-text flex">
            <textarea v-model="textarea" placeholder="辩诉说明" maxlength="120"></textarea>
          </div>
          <div class="pop-btn-warp flex">
            <div class="flex pop-btn back-f8" @click="_close">取消</div>
            <div class="flex pop-btn line-back" @click="_submitZC">确定</div>
          </div>
        </div>
      </popup>

      <div class="task-btn flex line-back" @click="_submit" v-if="!detail_info.audit && !detail_info.status">完成任务</div>
      <div class="task-btn flex disable-btn" v-if="!detail_info.audit && detail_info.status === 1">审核中</div>
      <div class="task-btn flex red-btn" @click="_submit" v-if="!detail_info.audit && detail_info.status === 3">提交修改</div>
      <div class="task-btn flex gre-btn" v-if="!detail_info.audit && detail_info.status === 3" @click="_showModel">申请仲裁</div>
      <div class="task-btn flex disable-btn" v-if="detail_info.status > 3">仲裁中</div>
      <!--审核-->
      <div class="task-btn flex disable-btn" v-if="detail_info.audit && detail_info.status === 2">已审核通过</div>
      <div class="task-btn flex red-btn" v-if="detail_info.audit && detail_info.status === 1" @click="_showNoPasss">不通过</div>
      <div class="task-btn flex gre-btn" v-if="detail_info.audit && detail_info.status === 1" @click="_pass(1)">通过</div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import upload from 'base/upload/upload'
  import {sub_or_arb, pass_or_fail_task} from 'api/index'
  import interlayer from 'base/interlayer/interlayer'
  import popup from 'base/popup/popup'

  export default {
    name: 'submitJob',
    data() {
      return {
        process: 0,
        processZC: 0,
        detail_info: {
          id: null,
          min_title: '抖音粉丝',
          title: ''
        },
        res_info: null,
        res_info_ZC: null,
        textarea: '',
        nopass: '',
        dy_name: ''
      }
    },
    created() {
      // console.log(this.$route.query)
      this.detail_info = this.$route.params
      // console.log(this.$route.params)
    },
    methods: {
      _noPass() {
        if (!this.nopass) {
          this.$root.eventHub.$emit('titps', `请输入不通过的理由`)
          return false
        }
        if (this.nopass.length < 6) {
          this.$root.eventHub.$emit('titps', `请至少输入5个字符`)
          return false
        }
        this._pass(2, this.nopass)
      },
      async _pass(type, task_message) {
        if (!this.$route.params.task_id && this.$route.params.task_id !== 0) {
          this.$root.eventHub.$emit('titps', `请刷新页面后重试`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        // pass_or_fail_task(id, task_id, username, click_type, task_message) {
        const ret = await pass_or_fail_task(this.$route.params.id, this.$route.params.task_id, this.$root.user.username, type, task_message)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.nopass = ''
          this.$root.eventHub.$emit('audit')
          this.$root.eventHub.$emit('updateMyTask')
          this.$root.eventHub.$emit('titps', `提交成功~`)
          this.$refs.back._back()
        }
        if (ret === 442) {
          this.$root.eventHub.$emit('audit')
          // updateMyTask
          this.$root.eventHub.$emit('titps', `该任务已完成`)
        }
      },
      _close() {
        this.$refs.interlayer._hiddenLayer()
        this.$refs.popup._hiddenPopup()
        this.$refs.nopass._hiddenPopup()
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
      _showModel() {
        this.$refs.interlayer._showLayer()
        this.$refs.popup._showPopup()
      },
      _showNoPasss() {
        this.$refs.interlayer._showLayer()
        this.$refs.nopass._showPopup()
      },
      _errZC() {
        this.processZC = 0
        this.$refs.previewImgZC.src = null
        this.$root.eventHub.$emit('titps', `上传出错啦,请查询选择图片~`)
      },
      _setUrlZC(url) {
        this.processZC = 0.1
        this.$refs.previewImgZC.src = url
      },
      _setProcessZC(res) {
        this.processZC = res.total.percent.toFixed(2)
      },
      _successZC(res) {
        this.res_info_ZC = res
      },
      _choseImgZC() {
        if (this.processZC && this.processZC < 100) {
          console.log(this.processZC)
          return false
        }
        this.$refs.uploadZC._imitateClick()
      },
      _choseImg() {
        if (this.process && this.process < 100) {
          console.log(this.process)
          return false
        }
        this.$refs.upload._imitateClick()
      },
      _success(res) {
        this.res_info = res
      },
      async _submitZC() {
        if(!this.textarea) {
          this.$root.eventHub.$emit('titps', `请先填写您的申诉理由~`)
          return false
        }
        if (!this.processZC) {
          this.$root.eventHub.$emit('titps', `请先上传您完成的截图~`)
          return false
        }
        if (this.processZC < 100) {
          this.$root.eventHub.$emit('titps', `请等待上传完成`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        // sub_or_arb(username, id, sub_type, task_image, appeal_user_image, appeal_user_explain) {
        const ret = await sub_or_arb(this.$root.user.username, this.detail_info.id, 2, null, this.res_info_ZC.key, this.textarea)
        this.$root.eventHub.$emit('loading', null)
        // console.log(ret)
        if (ret.status === 200 && ret.data.code === 200) {
          // this._close()
          this.$root.eventHub.$emit('updateMyTask')
          this.$root.eventHub.$emit('titps', `提交成功~`)
          this.$router.back(-1)
        }
        if (ret === 403) {
          this.$root.eventHub.$emit('titps', `您已经提交过了~`)
        }
      },
      async _submit() {
        if (!this.process) {
          this.$root.eventHub.$emit('titps', `请先上传您完成的截图~`)
          return false
        }
        if (this.process < 100) {
          this.$root.eventHub.$emit('titps', `请等待上传完成`)
          return false
        }
        if (!this.dy_name) {
          this.$root.eventHub.$emit('titps', `请填写抖音号`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        // username, id, sub_type, task_image, appeal_user_image, appeal_user_explain) {
        const ret = await sub_or_arb(this.$root.user.username, this.detail_info.id, 1, this.res_info.key, null, null, this.dy_name)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (this.detail_info.status && this.detail_info.status === 3) {
            this.$root.eventHub.$emit('updateMyTask')
            this.$root.eventHub.$emit('titps', `修改成功~`)
            this.$router.back(-1)
          } else {
            this.$root.eventHub.$emit('titps', `提交成功~`)
            this.$root.eventHub.$emit('updateMyTask')
            this.$router.back(-1)
          }
        }
        if (ret === 404) {
          this.$root.eventHub.$emit('titps', `任务信息错误~`)
        }
      },
    },
    components: {
      back,
      upload,
      popup,
      interlayer
    }
  }
</script>

<style scoped>
  .normal-title {
    width: 92%;
    flex-shrink: 0;
    min-height: 40px;
    height: auto;
    line-height: 20px;
    word-break: break-all;
    padding: 10px 4%;
  }

  .detail-body {
    z-index: 9999;
  }

  .task-info {
    align-items: flex-start;
    align-content: flex-start;
    padding: 0;
    overflow: hidden;
  }

  .submit-job-header {
    color: #fff;
    font-weight: 600;
    justify-content: flex-start;
    height: 50px;
    /*text-indent: 20px;*/
    padding: 0 20px;
  }

  .min-title {
    background: #E3DEFF;
    color: #6B41E1;
    width: auto;
    padding: 4px 6px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 400;
    margin: 0 20px;
  }

  .upload-warp {
    width: 44%;
    margin: 10px 0 10px 4%;
    flex-grow: 0;
    height: 0;
    padding-top: 70%;
    background: #F8F8F8;
    /*margin: 12px;*/
    position: relative;
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
    font-size: 13px;
    margin-top: 15px;
  }

  .disable-btn {
    background: #dfdfdf;
    color: rgba(0, 0, 0, .3);
  }

  .success {
    width: 90%;
    padding: 0 2%;
    height: 90px;
    border-radius: 10px;
    background: #f8f8f8;
    color: #444;
    margin: 0 auto 20px;
    line-height: 20px;
  }

  .success img {
    width: 40px;
    height: auto;
    margin: 0 10px 0 0;
  }

  .task-btn {
    margin: 30px auto -15px;
  }

  .red-btn {
    background: #FF3939;
  }

  .gre-btn {
    background: #33C945;
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

  .nopass-text{
    margin: 20px auto -10px;
  }

  .task-input-warp {
    width: 90%;
    height: 42px;
    background: #F8F8F8;
    border-radius: 6px;
    margin: 6px auto 25px;
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
  .dy-id{
    color: #444;
    margin: 20px auto;
    justify-content: flex-start;
    white-space: nowrap;
    text-indent: 20px;
  }
  .reSay-waro{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
    font-size: 12px;
  }
</style>
