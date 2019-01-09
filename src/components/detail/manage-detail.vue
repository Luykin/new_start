<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="task-info flex fw" v-if="manageInfo">
        <div class="manage-item-header flex fw ell">
          <span class="flex js task-id-warp">[任务ID: {{manageInfo.id}}]</span>
          <span
            class="status">{{manageInfo.status === 1 ? '[发布中]' : manageInfo.status === 2 ? '[已取消]' : '[已完成]'}}</span>
          <span class="title">{{manageInfo.title}}</span>
          <div class="min-title">{{manageInfo.min_title}}</div>
          <div class="min-title top-title" v-show="manageInfo.is_top">已置顶 : {{time}}</div>
          <!--<div class="min-title top-title cut-down-top">123</div>-->
        </div>
        <div class="money-show flex">
          <img src="../../assets/img/manage6.png"/>
          <div class="money-info flex fw">
            <span class="money ell flex">{{manageInfo.price}}元</span>
            <span>赏金总额</span>
          </div>
        </div>
        <div class="money-show flex">
          <img src="../../assets/img/manage5.png"/>
          <div class="money-info flex fw">
            <span class="money ell flex">{{manageInfo.single_price}}元</span>
            <span>单次赏金</span>
          </div>
        </div>
        <div class="data-manage flex">
          <div class="data-manage-item flex fw">
            <img src="../../assets/img/manage2.png"/>
            {{manageInfo.browse_num}}
            <span class="dm-title">浏览次数</span>
          </div>
          <div class="data-manage-item flex fw">
            <img src="../../assets/img/manage1.png"/>
            {{manageInfo.current_num}}
            <span class="dm-title">进行中</span>
          </div>
          <div class="data-manage-item flex fw">
            <img src="../../assets/img/manage4.png"/>
            {{manageInfo.pass_num}}
            <span class="dm-title">已经通过</span>
          </div>
          <div class="data-manage-item flex fw">
            <img src="../../assets/img/manage3.png"/>
            {{manageInfo.refuse_num}}
            <span class="dm-title">失败次数</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="mih-bottom flex fw">
          <div class="mih-bottom-btn flex line-red-color" @click="_topShow(manageInfo)">
            <img src="../../assets/img/minicon4.png"/>
            置顶推荐
          </div>
          <div class="mih-bottom-btn flex line-back" @click="_toAuditList(manageInfo)">
            <img src="../../assets/img/minicon3.png"/>
            审核任务
            <div class="flex red-icon-read" v-show="manageInfo.task_audit_num">{{manageInfo.task_audit_num}}</div>
          </div>
          <div class="mih-bottom-btn flex line-gray-color" @click="_show">
            <img src="../../assets/img/minicon2.png"/>
            取消任务
          </div>
          <div class="mih-bottom-btn flex line-green-color" @click="_showQrCode">
            <img src="../../assets/img/minicon1.png"/>
            求助好友
          </div>
          <div class="mih-bottom-btn flex line-blue-color" @click="_seeTask">
            <img src="../../assets/img/minicon5.png"/>
            查看任务
          </div>
        </div>
        <div class="task-btn flex" @click="_toAllAuditList(manageInfo)">所有任务情况</div>
      </div>
      <router-view></router-view>
      <stick ref="stick"></stick>

      <interlayer ref="interlayer"></interlayer>
      <popup ref="popup">
        <div class="popup-report flex fw">
          <h1 class="flex pop-title">取消任务</h1>
          <span class="describe">任务在没有[审核中][进行中][仲裁]的情况下,可以取消,剩余赏金会返回到您的账户余额中~</span>
          <div class="pop-btn-warp flex">
            <div class="flex pop-btn back-f8" @click="_close">取消</div>
            <div class="flex pop-btn line-back" @click="_cancel">是的</div>
          </div>
        </div>
      </popup>
      <poster ref="poster"></poster>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import stick from 'components/stick/stick'
  import {cancel_publication} from 'api/index'
  import interlayer from 'base/interlayer/interlayer'
  import popup from 'base/popup/popup'
  import poster from 'components/poster/poster'

  export default {
    // props: {
    //   info: {
    //     type: [Object],
    //     default: null
    //   }
    // },
    name: 'manage-detail',
    data() {
      return {
        manageInfo: null,
        timer: null,
        time: ''
      }
    },
    created() {
      if (!this.$route.params.price) {
        this.$router.back(-1)
      }
      try {
        this.manageInfo = this.$route.params
        if (this.manageInfo.due_time) {
          this.time = this._msecTransform(this.manageInfo.due_time - Date.parse(new Date()))
          this.timer = setInterval(() => {
            this.time = this._msecTransform(this.manageInfo.due_time - Date.parse(new Date()))
          }, 1000)
        }
      } catch (e) {
        console.log(e)
      }
      // console.log(this.$route.params)
    },
    mounted() {

    },
    methods: {
      _seeTask() {
        if (!this.$root.user.username) {
          return false
        }
        if (this.manageInfo.status === 2) {
          this.$root.eventHub.$emit('titps', `本条任务已被取消`)
          return false
        }
        this.$router.push({
          name: 'task-detail',
          params: {id: this.manageInfo.id}
        })
      },
      _showQrCode() {
        this.$refs.poster._showqr()
      },
      async _cancel() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await cancel_publication(this.manageInfo.id, this.$root.user.username)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', `取消成功~`)
          this.$root.eventHub.$emit('updateUserInfo')
          this.$root.eventHub.$emit('updateList')
          this.$root.eventHub.$emit('updateManage')
          this.$router.back(-1)
          return false
        } else {
          this._close()
          this.$root.eventHub.$emit('titps', `本条任务不满足取消条件~`)
        }
        // if (ret === 445) {
        //   this.$root.eventHub.$emit('titps', `本条任务不满足取消条件~`)
        // } else {
        //   this.$root.eventHub.$emit('titps', `本条任务不满足取消条件~`)
        // }
      },
      _close() {
        try {
          this.$refs.interlayer._hiddenLayer()
          this.$refs.popup._hiddenPopup()
        } catch (e) {
          console.log(e)
        }
      },
      _show() {
        try {
          if (this.manageInfo.status === 2) {
            this.$root.eventHub.$emit('titps', `本条任务已被取消`)
            return false
          }
          this.$refs.interlayer._showLayer()
          this.$refs.popup._showPopup()
        } catch (e) {
          console.log(e)
        }
      },
      _msecTransform(msec) {
        if (msec < 0) {
          clearInterval(this.timer)
          this.timer = null
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
      _topShow(item) {
        this.$refs.stick._show(item)
      },
      _toAllAuditList(info) {
        this.$router.push({
          name: 'audit-list',
          params: Object.assign(info, {
            types: 2,
            // info: this.$route.params
          })
        })
      },
      _toAuditList(info) {
        this.$router.push({
          name: 'audit-list',
          params: Object.assign(info, {
            types: 1,
          })
        })
      },
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    },
    components: {
      back,
      stick,
      interlayer,
      popup,
      poster
    }
  }
</script>

<style scoped>
  .task-info {
    padding: 0;
    overflow: hidden;
  }

  .manage-item-header {
    background: #E8E4FF;
    color: #444;
    height: 60px;
    justify-content: flex-start;
  }

  .manage-item-header .status {
    color: #6B41E1;
    margin: 0 10px;
    font-weight: 600;
  }

  .manage-item-header .title {
    font-weight: 600;
    max-width: 30%;
    overflow: hidden;
  }

  .manage-item-header .min-title {
    padding: 5px;
    background: #C8BEFF;
    color: #572DCB;
    border-radius: 5px;
    font-size: 10px;
    transform: scale(.85, .85);
    margin: 0 3px 0 10px;
  }

  .manage-item-header .top-title {
    background: #ff3939;
    color: #fff;
    margin: 0;
  }

  .task-id-warp {
    font-size: 10px;
    color: #555;
    text-indent: 11px;
    margin-bottom: 6px;
    font-weight: 600;
    /*transform: scale(.9,.9);*/
  }

  .money-show {
    width: 50%;
    height: 100px;
  }

  .money-show img {
    width: 44%;
    height: auto;
    max-width: 90px;
    min-width: 50px;
    margin: 0 4% 0 7%;
  }

  .money-info {
    height: 100%;
    /*font-weight: 600;*/
    color: #555;
  }

  .money {
    font-size: 18px;
    margin-bottom: 7px;
    color: #333333;
    font-weight: 600;
  }

  .data-manage {
    height: 90px;
    margin-bottom: 20px;
  }

  .data-manage-item {
    width: 18%;
    min-width: 55px;
    margin: 0 2.7%;
    height: 68px;
    border-radius: 10px;
    font-weight: 600;
    background: #f8f8f8;
    position: relative;
  }

  .dm-title {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 160%);
    white-space: nowrap;
    color: #555;
    font-size: 12px;
  }

  .data-manage-item img {
    width: 40%;
    height: auto;
    margin: 0 30% 8px 30%;
  }

  .data-manage-item:nth-child(1) {
    color: #3671FF;
  }

  .data-manage-item:nth-child(2) {
    color: #FF8215;
  }

  .data-manage-item:nth-child(3) {
    color: #1BA02B;
  }

  .data-manage-item:nth-child(4) {
    color: #FF3939;
  }

  .mih-bottom {
    width: 92%;
    height: 120px;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }

  .mih-bottom-btn {
    width: 28%;
    min-width: 79px;
    height: 34px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    color: #fff;
    font-weight: 600;
    font-size: 13px;
    margin: 0 4% 20px 0;
    position: relative;
  }

  .mih-bottom-btn img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }

  .red-icon-read {
    position: absolute;
    right: 0;
    top: 0;
    /*min-width: 23px;*/
    width: 23px;
    height: 23px;
    border-radius: 100px;
    background: red;
    color: #fff;
    transform: translate(30%, -30%) scale(.8, .8);
  }

  .line-red-color {
    background: #FFA96B;
    background: linear-gradient(-45deg, #FF3939, #FFA96B);
    background: -webkit-gradient(linear, right bottom, left top, from(#FF3939), to(#FFA96B));
  }

  .line-gray-color {
    background: #627288;
    background: linear-gradient(-45deg, #627288, #B2C0C7);
    background: -webkit-gradient(linear, right bottom, left top, from(#627288), to(#B2C0C7));
  }

  .line-green-color {
    background: #42D852;
    background: linear-gradient(-45deg, #15961E, #42D852);
    background: -webkit-gradient(linear, right bottom, left top, from(#15961E), to(#42D852));
  }

  .line-blue-color {
    background: #423AE7;
    background: linear-gradient(-45deg, #423AE7, #369CFF);
    background: -webkit-gradient(linear, right bottom, left top, from(#423AE7), to(#369CFF));
  }

  .mih-min-btn {
    width: 26px;
    height: 26px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 100%;
    box-shadow: 0 0 10px #F0D9F9;
    color: #fff;
    font-weight: 600;
  }

  .line {
    height: 1px;
    width: 88%;
    margin: 10px auto;
    background: #f8f8f8;
  }

  .task-btn {
    background: #FF3939;
    margin: 25% 0 20px 0;
  }

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
</style>
