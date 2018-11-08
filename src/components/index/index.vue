<template>
  <transition name="list">
    <div>
      <div class="header flex afterh hp2">
        <img :src="$root.user.avatar" class="iconlll avater" v-if="$root.user.avatar">
        <div class="iconlll avater" v-show="!$root.user.avatar"></div>
        <div class="flex namewarp fw ss">
          <span class="flex js nw-item" style="font-weight: 900;">{{$root.user.nickname || ''}}</span>
          <p class="flex js nw-item">余额：<span class="score">{{$root.user.score || 0}}</span></p>
        </div>
        <img src="https://cdn.xingkwh.com/bgmuisck.png" class="iconss icon" v-show="play"
             @click="play = null; $root.eventHub.$emit('audio', null)">
        <img src="https://cdn.xingkwh.com/bgmuiscg.png" class="iconss icon" v-show="!play"
             @click="play = true; $root.eventHub.$emit('audio', true)">
        <router-link tag='div' to='./withdraw' class="btni flex btni1">提現</router-link>
        <router-link tag='div' to='./recharge' class="btni flex btni2">充值</router-link>
      </div>
      <div class="header flex" style="border-top: 1.5px solid #10111E; height: 40px; align-items: flex-start;">
        <div class="flex" style="width: 20%;height: 100%;">
          <img src="https://cdn.xingkwh.com/%E5%96%87%E5%8F%AD.png" style="width: 25px; height: auto;">
        </div>
        <div class="flex" style="width: 80%; margin: 0 auto; overflow: hidden; justify-content: flex-start;">
          <div class="message-item-warp">
            <div v-for="item in message" class="message-item flex js"><img :src="item.avatar" class="message-avater"
                                                                           @error="_changurl($event)">恭喜<span
              style="color:#FFB800;margin: 0 5px;">{{item.nickname}}</span>盈利<span style="color:#FFB800;margin: 0 5px;">{{item.score}}幣-BTC</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex now-peple">
        <div class="flex np-left">
          <span class="flex ssss" style="color: #999; margin-bottom: 5px; transform: scale(.9, .9);">現時線上</span>
          <span class="flex ll">{{people}}人</span>
        </div>
        <div class="flex np-right">
          <div class="flex npr-left red">
              <span class="flex ssss" style="margin-bottom: 5px; transform: scale(.8, .8);">
              買涨
            </span>
            <span class="flex s">
              {{scale}}%
            </span>
          </div>
          <div class="flex npr-mid">
            <div class="zhang-line" :style="'width:'+ scale +'%'"></div>
          </div>
          <div class="flex npr-left gren">
              <span class="flex ssss" style="margin-bottom: 5px; transform: scale(.8, .8);">
              買跌
            </span>
            <span class="flex s">
              {{100 - scale}}%
            </span>
          </div>
        </div>
      </div>
      <chart></chart>
      <div class="header flex afterh hp15 ss">
        <span class="hfah-title">交易金額</span>
        <div class="btni flex nonei" :class="{'activei': now_trade == item}" v-for="item in trade_list"
             @click="_clicktrade(item)">{{item}}
        </div>
      </div>
      <div class="header flex afterh hp1 ss">
        <p class="hfah-title">交易週期: <span :class="{'activetime': timer < 30}">{{timer}}s</span></p>
        <p class="hfah-title double">预计收益: <span
          style="text-indent: 10px; color: #FFB800;">{{now_trade.toFixed(2)}}BTC幣</span></p>
      </div>
      <div class="btn-buy-warp flex">
        <div class="btn-buy flex red-border" @click="_transaction(1)">買涨<img
          src="https://cdn.xingkwh.com/%E4%B9%B0%E6%B6%A8icon@3x.png" class="iconauto"></div>
        <div class="btn-buy flex grn-border" @click="_transaction(2)">買跌<img
          src="https://cdn.xingkwh.com/%E4%B9%B0%E8%B7%8Cicon@3x.png" class="iconauto"></div>
      </div>
      <div class="footer-none"></div>
      <popup ref="popup">
        <div class="result flex fw">
          <div class="rtitle flex">交易结果</div>
          <div class="result-list flex fw">
            <div class="result-item flex" v-for="item in transaction_result" :class="{'active-tran': item.result == 1}">
              <div class="flex result-item-half fw ss">
                <p class="flex js textindex20">交易方向:<span class="color">{{item.direction == 1 ? '看涨' : '看跌'}}</span></p>
                <p class="flex mg10 js textindex20">购买时间:{{item.createA}}</p>
                <p class="flex mg10 js textindex20">交易价格:{{item.start_index}}</p>
                <p class="flex mg10 js textindex20">结果:<span class="color">{{item.result == 1 ? '赚' : '亏'}}</span></p>
              </div>
              <div class="flex result-item-half fw ss">
                <p class="flex js textindex20">投入: {{item.score}}BTC币</p>
                <p class="flex mg10 js textindex20">交易周期: 30s</p>
                <p class="flex mg10 js textindex20">到期价格:{{item.final_index}}</p>
                <p class="flex mg10 js textindex20">返还金额: <span class="color">{{item.result == 2 ? 0 : item.score + item.ret_score}}BTC币</span>
                </p>
              </div>
            </div>
          </div>
          <div class="rsure flex" @click="_closeresult">我知道了</div>
        </div>
      </popup>
      <popup ref='kefu'>
        <div class="kefu-img-warp">
          <img src="https://cdn.xingkwh.com/kefu2.png" class="kefu-img">
          <div class="flex kefu-biaoqian">添加客服，日赚3萬</div>
        </div>
        <img src="http://pd70b9zd0.bkt.clouddn.com/caclev.png" @click="_closekefu" class="cancelimg">
      </popup>
      <popup ref='newuser'>
        <div class="flex newuser-box fw">
          <p class="xxx flex">您已獲得<span style="color: #ffb800">3元</span>體驗金~</p>
          <span class="ssss flex mg20">至少進行壹次交易才可提現</span>
        </div>
        <img src="http://pd70b9zd0.bkt.clouddn.com/caclev.png" @click="$refs.newuser._hiddenPopup();_showcouse()"
             class="cancelimg">
      </popup>
      <popup ref='declare'>
        <div class="declare-img-warp">
          <img src="http://p70pqu6ys.bkt.clouddn.com/%E6%8F%90%E7%A4%BA@3x.png" class="kefu-img">
        </div>
        <img src="http://pd70b9zd0.bkt.clouddn.com/caclev.png" @click="_closedeclare" class="cancelimg">
      </popup>
      <interlayer ref="interlayer"></interlayer>
      <div v-if="course_step == 1" class="flex allscreen-course">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E4%B8%80%E6%AD%A5@3x.png" class="peple-course one-course"
             @click="_next">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AE%AD%E5%A4%B4@3x.png" class="arrow one-arrow">
      </div>
      <div v-if="course_step == 2" class="flex allscreen-course">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E4%BA%8C%E6%AD%A5@3x.png" class="peple-course two-course"
             @click="_next">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AE%AD%E5%A4%B4@3x.png" class="arrow two-arrow">
      </div>
      <div v-if="course_step == 3" class="flex allscreen-course">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E4%B8%89%E9%83%A8@3x.png" class="peple-course tir-course"
             @click="_next">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AE%AD%E5%A4%B4@3x.png" class="arrow tir-arrow">
      </div>
      <div v-if="course_step == 4" class="flex allscreen-course">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E5%9B%9B%E6%AD%A5@3x.png" class="peple-course fow-course"
             @click="_next">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AE%AD%E5%A4%B4@3x.png" class="arrow fow-arrow">
      </div>
      <div v-if="course_step == 5" class="flex allscreen-course">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E4%BA%94%E6%AD%A5@3x.png" class="peple-course"
             @click="_next">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AE%AD%E5%A4%B4@3x.png" class="arrow fiw-arrow">
      </div>
      <div v-if="course_step == 6" class="flex allscreen-course">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AC%AC%E5%85%AD%E6%AD%A5@3x.png" class="peple-course"
             @click="_next">
        <img src="http://pd70b9zd0.bkt.clouddn.com/%E7%AE%AD%E5%A4%B4@3x.png" class="arrow six-arrow">
      </div>
      <img src="http://p70pqu6ys.bkt.clouddn.com/%E6%8F%90%E7%A4%BA@3x.png"
           style="position: absolute; z-index: -999; opacity: 0; width: 0;height: 0;left: -100px;top: -100px;"
           @load="_initall($event)">
    </div>
  </transition>
</template>
<script type="text/javascript">
  import chart from 'base/btcchart/btcchart'
  import {login, transaction, transactionlist, message, updateuserinfo} from 'api/index'
  import popup from 'base/popup/popup'
  import {inedxtimeformat} from 'common/js/util'
  import interlayer from 'base/interlayer/interlayer'
  // import Fingerprint2 from 'fingerprintjs2'
  const DEFAULT_URL = 'http://p7o5mvmp4.bkt.clouddn.com/.favicon.png'
  export default {
    data() {
      return {
        trade_list: [20, 40, 50, 100],
        now_trade: 20,
        timer: 30,
        timer_id: null,
        success_buy: null,
        play: true,
        message: [],
        people: 6000 + Math.round(Math.random() * 3000),
        scale: 40 + Math.round(Math.random() * 20),
        transaction_result: [],
        course_step: null,
      }
    },
    created() {
      const hours = new Date().getHours()
      if (hours < 1) {
        this.people = 4000 + Math.round(Math.random() * 2000)
      }
      if (hours >= 1 && hours <= 8) {
        this.people = 200 + Math.round(Math.random() * 800)
      }
      if (hours > 8 && hours <= 11) {
        this.people = 1000 + Math.round(Math.random() * 1000)
      }
      if (hours > 12 && hours <= 14) {
        this.people = 3000 + Math.round(Math.random() * 1000)
      }
      if (hours > 15 && hours <= 17) {
        this.people = 2000 + Math.round(Math.random() * 1000)
      }
      if (hours > 18 && hours <= 24) {
        this.people = 5000 + Math.round(Math.random() * 4000)
      }
      const url = window.location.href
      const start = url.indexOf('code=') + 5
      const end = url.indexOf('&state')
      if (start > 4 && end > -1) {
        this._login(url.slice(start, end), this.$route.query.username)
        history.replaceState(null, null, window.location.origin)
      } else {
        const user = localStorage.getItem('username')
        if (user) {
          this._updateuserinfo(user)
        } else {
        }
      }
      this._initevetbut()
      this._initstarttimer()
      this._message()
    },
    mounted() {
    },
    computed: {},
    methods: {
      _initall(e) {
        console.log('加载完成')
        this.$refs.declare._showPopup()
        this.$refs.interlayer._showLayer()
        e.path[0].style.display = 'none'
      },
      async _updateuserinfo(username) {
        const ret = await updateuserinfo(username)
        if (ret.status == 200 && ret.data.code == 200) {
          this.$root.user = ret.data.data
          this._transactionlist()
          this.$root.eventHub.$emit('wxuser')
        }
      },
      _closedeclare() {
        this.$refs.declare._hiddenPopup()
        this.$refs.kefu._showPopup()
      },
      _closekefu() {
        this.$refs.kefu._hiddenPopup()
        if (!localStorage.getItem('newuser') && this.$root.user.create && this.$root.user.create > this.$root.user.old_create) {
          this._shownewuser()
          localStorage.setItem('newuser', true)
        } else {
          this._showcouse()
        }
      },
      _shownewuser() {
        this.$refs.newuser._showPopup()
      },
      _showcouse() {
        if (!localStorage.getItem('cousertime') || parseInt(localStorage.getItem('cousertime')) + 86400000 < new Date().valueOf()) {
          this.course_step = 1
        } else {
          this.$refs.interlayer._hiddenLayer()
        }
      },
      _next() {
        this.course_step += 1
        if (this.course_step > 6) {
          localStorage.setItem('cousertime', new Date().valueOf())
          this.$refs.interlayer._hiddenLayer()
        }
      },
      _changurl(e) {
        if (e.target.src == DEFAULT_URL) {
          return false
        }
        e.target.src = DEFAULT_URL
      },
      _closeresult() {
        this.transaction_result = []
        this.$refs.popup._hiddenPopup()
        this.$refs.interlayer._hiddenLayer()
      },
      _initstarttimer() {
        const randomnum = Math.random()
        const time = 2500 + Math.round(randomnum * 7000)
        let timer = setTimeout(() => {
          if (this.scale > 65 || randomnum > 0.5) {
            this.scale = parseInt(this.scale - randomnum * 5)
            this.people = Math.abs(parseInt(this.people - randomnum * 20))
          } else {
            this.scale = parseInt(this.scale + randomnum * 5)
            this.people = Math.abs(parseInt(this.people + randomnum * 20))
          }
          if (this.scale < 37) {
            this.scale = 40
          }
          // this.people = parseInt(this.people + push*randomnum*20)
          this._initstarttimer()
          clearTimeout(timer)
        }, time)
      },
      _initevetbut() {
        this.$root.eventHub.$on('result', (data) => {
          if (data.user) {
            this.$root.user = data.user
            this.$root.eventHub.$emit('update')
          }
          data.transactions.createA = inedxtimeformat(data.transactions.create)
          this.transaction_result.push(data.transactions)
          this.$refs.popup._showPopup()
          this.$refs.interlayer._showLayer()
          let time = setTimeout(() => {
            this.$root.eventHub.$emit('point', {
              nowpoint: null,
              endpoint: null,
              color: null,
              xpoint: null,
            })
            clearTimeout(time)
          }, 1000)
        })
      },
      async _login(code, super_code) {
        if (code) {
          try {
            this.$root.eventHub.$emit('loading', true)
            const ret = await login(null, null, code, super_code)
            this.$root.eventHub.$emit('loading', null)
            if (ret.status == 200 && ret.data.code == 200) {
              this.$root.user = ret.data.data
              localStorage.setItem('username', ret.data.data.username)
              this._transactionlist()
              this.$root.eventHub.$emit('wxuser')
            }
          } catch (err) {
            console.log(err)
          }
          return false
        }
        // try {
        //   let options = {}
        //   Fingerprint2.getV18(options, async (result, components) =>{
        //     this.$root.eventHub.$emit('loading', true)
        //     const ret = await login(result.slice(0, 5), 'http://p7o5mvmp4.bkt.clouddn.com/.favicon.png', result)
        //     this.$root.eventHub.$emit('loading', null)
        //     if (ret.status == 200 && ret.data.code == 200) {
        //       this.$root.user = ret.data.data
        //       this._transactionlist()
        //       this.$root.eventHub.$emit('wxuser')
        //     }
        //   })
        // } catch(err){
        //   console.log(err)
        // }
      },
      async _message() {
        const ret = await message()
        if (ret.status == 200 && ret.data.code == 200) {
          this.message = ret.data.data
        }
      },
      async _transactionlist() {
        try {
          this.$root.eventHub.$emit('loading', true)
          const ret = await transactionlist(this.$root.user.username)
          this.$root.eventHub.$emit('loading', null)
          if (ret.status == 200 && ret.data.code == 200) {
            const list = ret.data.data.ret
            for (let i = 0; i < list.length; i++) {
              if (list[i].yes) {
                this.$root.eventHub.$emit('point', {
                  nowpoint: list[i].start_index,
                  endpoint: list[i].final_index,
                  color: list[i].direction == 1 ? '#ff3535' : '#05BE00',
                  xpoint: list[i].create
                })
                console.log('触发打点')
                this._timerdo(30 - parseInt((new Date().valueOf() - list[i].create) / 1000))
              } else {
                break
              }
            }
          }
        } catch (err) {
          console.log(err)
        }
      },
      _clicktrade(item) {
        this.now_trade = item
      },
      _timerdo(nowtime) {
        if (this.timer_id || nowtime) {
          clearInterval(this.timer_id)
          this.timer = nowtime || 30
          this.timer_id = null
        }
        this.timer_id = setInterval(() => {
          if (this.timer <= 1) {
            this.timer = 30
            clearInterval(this.timer_id)
            this.timer_id = null
            return false
          }
          this.timer -= 1
        }, 1000)
      },
      async _transaction(direction) {
        if (!this.$root.user || !this.now_trade) {
          this.$root.eventHub.$emit('titps', '登录中...')
          return false
        }
        if (this.$root.user.score < this.now_trade + this.now_trade * 0.1) {
          this.$root.eventHub.$emit('titps', '您的余额不足')
          return false
        }
        if (this.success_buy) {
          this.$root.eventHub.$emit('titps', '请10s后购买')
          return false
        }
        const ret = await transaction(direction, this.$root.user.username, this.now_trade)
        if (ret.status == 200 && ret.data.code == 200) {
          this.$root.user = ret.data.data.user
          this.$root.eventHub.$emit('update')
          this.$root.eventHub.$emit('point', {
            xpoint: ret.data.data.time,
            nowpoint: ret.data.data.start_index,
            endpoint: null,
            color: direction == 1 ? '#ff3535' : '#05BE00'
          })
          this._timerdo()
          this.success_buy = true
          let timersucess = setTimeout(() => {
            this.success_buy = null
            clearTimeout(timersucess)
          }, 10000)
          this.$root.eventHub.$emit('titps', '交易成功')
        } else {
          this.$root.eventHub.$emit('titps', '网络异常')
        }
      },
      // ...mapMutations({
      //   setUser: 'SET_USER'
      // })
    },
    components: {
      chart,
      popup,
      interlayer
    }
  }

</script>
<style type="text/css" scoped>
  .hp2:after {
    padding-top: 17%;
  }

  .hp1:after {
    padding-top: 10%;
  }

  .hp15:after {
    padding-top: 15%;
  }

  .header {
    background: #27283A;
    border-bottom: #10111E;
    overflow: hidden;
  }

  .avater {
    flex-shrink: 0;
    margin: 0px 2.5%;
    border-radius: 100%;
    background: #ffb800;
  }

  .namewarp {
    width: 30%;
    flex-shrink: 0;
    overflow: hidden;
  }

  .nw-item {
    height: 25px;
  }

  .icon {
    flex-shrink: 0;
    margin: 0 10px;
  }

  .btni {
    max-width: 25%;
    box-sizing: border-box;
    flex-grow: 1;
    height: 36px;
    margin-right: 10px;
    border-radius: 8px;
    overflow: hidden;
  }

  .btni1 {
    border: 1px solid #FFB800;
    color: #FFB800;
  }

  .btni2 {
    background: #FFB800;
    color: #27283A;
  }

  .hfah-title {
    flex-shrink: 0;
    flex-wrap: wrap;
    flex-grow: 1;
    margin: 0 20px;
  }

  .double {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 60%;
    margin: 0;
    border-left: 1px solid #bdbdbd;
  }

  .nonei {
    background: #424360;
    color: #fff;
  }

  .activei {
    background: #FFB800;
    color: #27283A;
  }

  .btn-buy-warp {
    height: 70px;
    justify-content: flex-start;
  }

  .btn-buy {
    width: 42%;
    flex-grow: 0;
    margin-left: 5%;
    border-radius: 8px;
    height: 40px;
  }

  .red-border {
    border: 1px solid #FF3535;
    color: #FF3535;
  }

  .grn-border {
    border: 1px solid #07FF00;
    color: #07FF00;
  }

  .iconauto {
    width: 20px;
    height: auto;
    margin: 0 5px;
  }

  .activetime {
    color: red;
    font-size: 15px;
  }

  .score {
    color: #FFB723;
  }

  .now-peple {
    height: 50px;
  }

  .np-left {
    width: 26%;
    height: 70%;
    border-right: 1px solid #26282C;
    flex-wrap: wrap;
  }

  .np-right {
    width: 74%;
    height: 100%;
  }

  .npr-left {
    height: 100%;
    width: 25%;
    flex-wrap: wrap;
  }

  .npr-mid {
    flex-grow: 1;
    height: 14px;
    background: #3FDD67;
    border-radius: 4px;
    justify-content: flex-start;
    overflow: hidden;
  }

  .red {
    color: #FF3535;
  }

  .gren {
    color: #3FDD67;
  }

  .zhang-line {
    width: 0;
    height: 100%;
    background: #FF3535;
  }

  .result {
    width: 300px;
    min-height: 120px;
    border-radius: 10px;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
    align-items: flex-start;
  }

  .rtitle {
    width: 100%;
    height: 50px;
    background: #ff3535;
  }

  .rsure {
    width: 100%;
    height: 40px;
    background: #ffb800;
    color: #333;
  }

  .result-list {
    width: 100%;
    min-height: 120px;
    max-height: 220px;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #111;
  }

  .result-item {
    height: auto;
    min-height: 120px;
    border-top: 1px solid #27283a;
    border-bottom: 1px solid #27283a;
  }

  .result-item-half {
    width: 50%;
    height: auto;
  }

  .textindex20 {
    text-indent: 30px;
    white-space: nowrap;
    /* transform: scale(0.9, 0.9);*/
  }

  .textindex20 span {
    text-indent: 5px;
  }

  .color {
    color: #FF3535;
  }

  .active-tran .color {
    color: #58C96B;
  }

  .message-item {
    /*  display: inline-block;*/
    height: 40px;
    white-space: nowrap;
    line-height: 40px;
  }

  .message-item-warp {
    width: 100%;
    animation: message 40s linear infinite;
  }

  .message-avater {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    margin: 0 10px;
  }

  @keyframes message {

    0%,
    8.5%,
    100% {
      transform: translate3d(0, 0, 0);
    }

    10%,
    18.5% {
      transform: translate3d(0, -10%, 0);
    }

    20%,
    28.5% {
      transform: translate3d(0, -20%, 0);
    }

    30%,
    38.5% {
      transform: translate3d(0, -30%, 0);
    }

    40%,
    48.5% {
      transform: translate3d(0, -40%, 0);
    }

    50%,
    58.5% {
      transform: translate3d(0, -50%, 0);
    }

    60%,
    68.5% {
      transform: translate3d(0, -60%, 0);
    }

    70%,
    78.5% {
      transform: translate3d(0, -70%, 0);
    }

    80%,
    88.5% {
      transform: translate3d(0, -80%, 0);
    }

    90%,
    99.9999% {
      transform: translate3d(0, -90%, 0);
    }
  }

  .allscreen-course {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }

  .peple-course {
    width: 84%;
    height: auto;
  }

  .one-course {
    transform: translate(0, -70%);
  }

  .two-course {
    transform: translate(0, 20%);
  }

  .tir-course {
    transform: translate(0, 25%);
  }

  .fow-course {
    transform: translate(0, -20%);
  }

  .fiw-course {
    transform: translate(0, 0);
  }

  .arrow {
    width: 40px;
    height: auto;
  }

  @keyframes onearrow {

    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }

    50% {
      transform: translate3d(0, 50%, 0);
    }
  }

  @keyframes twoarrow {

    0%,
    100% {
      transform: translate3d(0, 0, 0) rotate(-90deg);
    }

    50% {
      transform: translate3d(-80%, 0, 0) rotate(-90deg);
    }
  }

  @keyframes tirarrow {

    0%,
    100% {
      transform: translate3d(-50%, 0, 0) rotate(-180deg);
    }

    50% {
      transform: translate3d(-50%, 50%, 0) rotate(-180deg);
    }
  }

  @keyframes sixarrow {

    0%,
    100% {
      transform: translate3d(-50%, 0, 0);
    }

    50% {
      transform: translate3d(-50%, 50%, 0);
    }
  }

  .one-arrow {
    position: absolute;
    top: 8%;
    right: 5%;
    animation: onearrow 1.4s linear infinite;
  }

  .two-arrow {
    position: absolute;
    right: 5%;
    top: 35%;
    animation: twoarrow 1.4s linear infinite;
  }

  .tir-arrow {
    position: absolute;
    left: 50%;
    bottom: 20%;
    animation: tirarrow 1.4s linear infinite;
  }

  .fow-arrow {
    position: absolute;
    left: 50%;
    bottom: 33%;
    animation: tirarrow 1.4s linear infinite;
  }

  .fiw-arrow {
    position: absolute;
    left: 20%;
    bottom: 25%;
    animation: tirarrow 1.4s linear infinite;
  }

  .six-arrow {
    position: absolute;
    left: 50%;
    top: 48%;
    animation: sixarrow 1.4s linear infinite;
  }

  .kefu-img {
    width: 100%;
    height: auto;
  }

  .kefu-img-warp {
    width: 290px;
    height: auto;
    min-height: 460px;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
    background: #fff;
  }

  .declare-img-warp {
    width: 290px;
    height: auto;
    min-height: 300px;
    margin: 0 auto;
  }

  .cancelimg {
    display: block;
    transform: translate(0, 100%);
    margin: 0 auto;
  }

  .kefu-biaoqian {
    color: #FFB800;
    background: rgba(255, 208, 64, .223);
    width: 40%;
    padding: 15px;
    border-radius: 10px;
    white-space: nowrap;
    margin: 0 auto 20px;
  }

  .newuser-box {
    height: 140px;
    width: 280px;
    margin: 0 auto;
    background: rgba(38, 40, 55, .7);
    border-radius: 10px;
    border: 2px dashed #a97437;
  }

</style>
