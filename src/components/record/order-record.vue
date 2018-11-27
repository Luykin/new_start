<template>
  <transition name="list">
    <div class="body">
      <back></back>
      <div class="record-header flex">
        <div class="flex rh-item" :class="{'ative-record':  ativerecord === 1}" @click="_choseitem(1)">
          <span class="flex">进行中</span>
        </div>
        <div class="flex rh-item" :class="{'ative-record':  ativerecord === 2}" @click="_choseitem(2)">
          <span class="flex">已完成</span>
        </div>
      </div>
      <div style="margin-top: 60px"></div>
      <betterscroll class="wrapper" :data="list" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper'>
        <div class="scroll">
          <div v-for="item in list" class="better-item flex">
            <div class="flex fw bi-center">
              <p class="flex js ll ell">{{item.lable}}<span class="ss" style="text-indent: 5px; color: #727589">(数量{{item.point}})</span>
              </p>
              <span class="flex js ssss bi-name">{{item.addition.slice(0, 20)}}</span>
            </div>
            <div class="flex fw" style="justify-content: flex-end;">
              <span class="flex s bi-name flex-end">{{item.updateA}}</span>
              <span class="flex s bi-name flex-end bi-btn-s"
                    @click="_refundShow(item)" :class="_btnStatus(item.status)">{{_status(item.status)}}</span>
            </div>
          </div>
          <div v-show="!list.length" class="flex sss mg30">
            <empyt></empyt>
          </div>
        </div>
      </betterscroll>
      <popup ref="refund">
        <div class="refund-body flex fw">
          <h1 class="flex">取消订单申请</h1>
          <p class="flex ell">{{refund_item.lable}}(数量{{refund_item.point}})</p>
          <p class="flex">该订单正在排队中，是否确认取消该订单？</p>
          <p class="flex">取消申请通过后钱款({{refund_item.price}}元)会原路退回。</p>
          <div class="flex refund-btn" @click="$refs.interlace._hiddenLayer();$refs.refund._hiddenPopup()">取消</div>
          <div class="flex refund-btn" @click="_refund">确定</div>
        </div>
      </popup>
      <interlayer ref="interlace"></interlayer>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import {orders, refund} from 'api/index'
  import {timeformat} from 'common/js/util'
  import back from 'base/back/back'
  import empyt from 'base/empyt/empyt'
  import popup from 'base/popup/popup'
  import interlayer from 'base/interlayer/interlayer'
  import betterscroll from 'base/better-scroll/better-scroll'

  const KAMENG_STATUS_LIST = {
    '-11': '准备中',
    '-10': '未支付',
    '-9': '取消订单',
    '-8': '准备中',
    '-7': '准备中',
    '-6': '取消订单',
    '-5': '准备中',
    '-4': '已关闭',
    '-3': '准备中',
    '-2': '准备中',
    '-1': '准备中',
    '0': '准备中',
    '1': '进行中',
    '2': '已完成',
    '3': '进行中',
    '4': '已退款',
    '5': '已退款',
    '6': '申请退款中',
  }
  const REFUND_STATUS = [-2, -6, -9]

  export default {
    data() {
      return {
        ativerecord: 1,
        page: 0,
        num: 10,
        totle: 0,
        list: [],
        refund_item: {
          point: 0,
          lable: 0,
          price: 0
        }
      }
    },
    created() {
      try {
        if (this.$route.query.ativerecord) {
          this.ativerecord = parseInt(this.$route.query.ativerecord)
        }
      } catch (err) {
        console.log(err)
      }
    },
    mounted() {
      this._inint()
      this._pulldown()
      this.$root.eventHub.$on('update', () => {
        this._pulldown()
      })
    },
    computed: {
      // ...mapGetters([
      // 	'user'
      // 	])
      _btnStatus() {
        return (status) => {
          if (REFUND_STATUS.indexOf(status) > -1) {
            return 'can-click'
          } else {
            return ''
          }
        }
      },
      _status() {
        return (status) => {
          if (status in KAMENG_STATUS_LIST) {
            return KAMENG_STATUS_LIST[status]
          } else {
            return '准备中'
          }
        }
      }
    },
    methods: {
      _inint() {
        this.$refs.wrapper._initScroll()
      },
      _choseitem(num) {
        if (this.ativerecord === parseInt(num)) {
          return false
        }
        this.ativerecord = parseInt(num)
        this._pulldown()
      },
      _refundShow(item) {
        if (REFUND_STATUS.indexOf(item.status) < 0) {
          return false
        }
        this.refund_item = item
        this.$refs.interlace._showLayer()
        this.$refs.refund._showPopup()
      },
      async _refund(item) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await refund(this.$root.user.user_id, this.refund_item.id)
        this.$root.eventHub.$emit('loading', null)
        this.$refs.interlace._hiddenLayer()
        this.$refs.refund._hiddenPopup()
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', '取消订单申请已提交,请耐心等待。')
          this._pulldown()
        }
      },
      _formatdata(list) {
        if (list.length) {
          list.forEach((item) => {
            item.updateA = timeformat(item.create || new Date().valueOf())
          })
          return list
        } else {
          return []
        }
      },
      async _orders(status) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await orders(this.$root.user.user_id, this.num, this.page, status)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (ret.data.data.count) {
            this.list = [...this.list, ...this._formatdata(ret.data.data.tasks)]
            this.totle = ret.data.data.count
          }
        }
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        if (this.ativerecord === 1) {
          this._orders(1)
        } else {
          this._orders(2)
        }
      },
      _scrollToEnd() {
        if (this.list.length < this.totle) {
          // console.log('触底加载')
          this.page += 1
          if (this.ativerecord === 1) {
            this._orders(1)
          } else {
            this._orders(2)
          }
        }
      }
    },
    components: {
      betterscroll,
      popup,
      back,
      empyt,
      interlayer
    },
  }
</script>
<style scoped>
  .body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99998;
    background: #31293D;
    background: linear-gradient(45deg, #253250, #34283A);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#34283A));
    overflow-y: scroll;
  }

  .record-header {
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99999;
    background: #253250;
    background: linear-gradient(45deg, #253250, #2A2E48);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#2A2E48));
  }

  .rh-item {
    width: 40%;
    height: 70%;
    color: #BFBDE3;
    border: 1px solid #393A59;
  }

  .rh-item:nth-child(1) {
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
  }

  .rh-item:nth-child(2) {
    border-top-right-radius: 1000px;
    border-bottom-right-radius: 1000px;
  }

  .rh-item span {
    box-sizing: border-box;
    width: 25%;
    height: 100%;
    white-space: nowrap;
  }

  .ative-record {
    background: #3C3B5C;
    color: #fff;
    border: none;
  }

  .wrapper {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
  }

  .scroll {
    width: 100%;
    height: auto;
  }

  .better-item {
    width: 100%;
    height: 70px;
    /*background: #fff;*/
    border-bottom: 1px solid #3C3B5C;
  }

  .bi-img {
    margin: 0 4%;
  }

  .bi-center {
    color: #fff;
    flex-grow: 1;
    justify-content: flex-start;
    text-indent: 20px;
  }

  .bi-name {
    color: #727589;
    margin-top: 5px;
  }

  .flex-end {
    justify-content: flex-end;
    margin-right: 10%;
  }

  .refund-body {
    width: 85%;
    height: auto;
    padding: 10px;
    margin: 0 auto;
    background: #3b365d;
    color: #a2a2e8;
    border-radius: 8px;
    line-height: 25px;
  }

  .refund-body h1 {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .refund-btn {
    width: 40%;
    height: 35px;
    border-radius: 8px;
    border: 1px solid #a2a2e8;
    margin: 15px 3%;
  }

  .bi-btn-s {
    color: #727589;
    padding: 6px 10px 5px;
    border-radius: 100px;
    flex-grow: 0;
    width: auto;
    border: 1px solid #3C3B5C
  }

  .can-click {
    color: #cba2ff;
    border: 1px solid #cba2ff;
  }
</style>
