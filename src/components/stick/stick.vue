<template>
  <div>
    <interlayer ref="interlayer"></interlayer>
    <popup ref="popup">
      <div class="popup-report flex fw">
        <!--<h1 class="flex pop-title">置顶推荐</h1>-->
        <span class="describe" v-if="info">{{info.is_top ? '本任务已被置顶,继续置顶将延长置顶时间' : '亲，顶置推荐您的任务能获得更大的曝光！'}}</span>
        <div class="flex top-consume">本次置顶需消耗¥<span>{{$root.user.top_score}}元</span></div>
        <div class="pop-btn-warp flex">
          <div class="flex pop-btn back-f8" @click="_close">取消</div>
          <div class="flex pop-btn line-back" @click="_toTop">我要置顶</div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import interlayer from 'base/interlayer/interlayer'
  import popup from 'base/popup/popup'
  import {set_top_task} from 'api/index'

  export default {
    name: 'stick',
    data() {
      return{
        info: null
      }
    },
    mounted() {
    },
    methods: {
      _close() {
        try {
          this.$refs.interlayer._hiddenLayer()
          this.$refs.popup._hiddenPopup()
        } catch (e) {
          console.log(e)
        }
      },
      _show(item) {
        if (item.status === 2) {
          this.$root.eventHub.$emit('titps', `本条任务已被取消`)
          return false
        }
        // console.log(item)
        this.info = item
        try {
          this.$refs.interlayer._showLayer()
          this.$refs.popup._showPopup()
        } catch (e) {
          console.log(e)
        }
      },
      async _toTop() {
        if (!this.info || !this.$root.user.top_score) {
          this._close()
          this.$root.eventHub.$emit('titps', `服务器价格错误${this.$root.user.top_score}~`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await set_top_task(this.info.id, this.$root.user.username, this.$root.user.top_score)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this._close()
          this.$root.eventHub.$emit('updateUserInfo')
          this.$root.eventHub.$emit('updateList')
          this.$root.eventHub.$emit('updateManage')
          this.$root.eventHub.$emit('titps', `本条任务已被置顶~`)
        } else {
          this.$root.eventHub.$emit('titps', `置顶失败~`)
        }
      },
      // set_top_task(id, username, top_score) {
    },
    components: {
      interlayer,
      popup
    }
  }
</script>

<style scoped>
  .popup-report {
    width: 80%;
    padding: 4% 4% 70px 4%;
    min-height: 80px;
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
    text-align: center;
    width: 90%;
    line-height: 20px;
    margin: 20px auto 15px;
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

  .nopass-text {
    margin: 20px auto -10px;
  }

  .top-consume {
    color: #555;
    font-weight: 600;
    /*margin-top: 10px;*/
    font-size: 16px;
  }

  .top-consume span {
    color: #FF3939;
  }
</style>
