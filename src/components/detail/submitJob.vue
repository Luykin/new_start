<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info flex fw">
        <div class="submit-job-header flex line-back">
          {{detail_info.title.slice(0,8)}}
          <div class="min-title">{{detail_info.min_title}}</div>
        </div>
        <div class="normal-title flex">请按示例截图并上传提交给悬赏人审核</div>
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
      </div>
      <div class="task-btn flex line-back" @click="_submit">完成任务</div>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import upload from 'base/upload/upload'
  import {sub_or_arb} from 'api/index'
  export default {
    name: 'submitJob',
    data() {
      return {
        process: 0,
        detail_info: {
          id: null,
          min_title: '抖音粉丝',
          title: ''
        },
        res_info: null
      }
    },
    created() {
      // console.log(this.$route.query)
      this.detail_info = this.$route.query
    },
    methods: {
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
      async _submit() {
        if (!this.process) {
          this.$root.eventHub.$emit('titps', `请先上传您完成的截图~`)
          return false
        }
        if (this.process < 100) {
          this.$root.eventHub.$emit('titps', `请等待上传完成`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        // username, id, sub_type, task_image, appeal_user_image, appeal_user_explain) {
        const ret = sub_or_arb(this.$root.user.username, this.detail_info.id, 1, this.res_info.key)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', `提交成功~`)
        }
      },
    },
    components: {
      back,
      upload
    }
  }
</script>

<style scoped>
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
    flex-grow: 1;
    height: 0;
    padding-top: 120%;
    background: #F8F8F8;
    margin: 12px;
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

  .process-warp{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.55);
    color: #aee4ac;
    font-weight: 600;
    font-size: 20px;
  }

  .process-warp span{
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    margin-top: 15px;
  }
</style>
