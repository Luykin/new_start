<template>
  <transition name="list">
    <div>
      <div class="index-header flex">
        <div class="flex header-item ll" v-for="item in title"
             :class="{'active-header-item': item.id === active_service_id}"
             @click="active_com_id = null; active_service_id = item.id; _getServices(item.id)">
          <span>{{item.label}}</span>
        </div>
        <!--<div class="flex header-item ll" v-for="item in com_title"-->
        <!--:class="{'active-header-item': item.id === active_com_id}"-->
        <!--@click="active_service_id = null; active_com_id = item.id; _getCombos(item.id)">-->
        <!--<span>{{item.label}}</span>-->
        <!--</div>-->
        <div class="flex header-item ll" :class="{'active-header-item': active_com_id === -1}"
             @click="active_service_id = null; active_com_id = -1; _combos_category()">
          <span>抖音套餐</span>
        </div>
      </div>
      <div style="height: 50px;"></div>
      <div class="tips-warp flex mg10">
        <div class="tips-card-warp mg10 categry1" v-show="active_com_id">
          <div class="tips-card-label flex ell xx text-categry1">上热门体验方案</div>
          <div class="flex price">
            <span class="flex maxmaxmaxs">{{now_good.score}}</span>
            <div class="flex fw price-right">
              <span class="flex llll js">元/次</span>
              <span class="flex llll js">[{{now_good.tag}}]</span>
            </div>
          </div>
          <div class="flex tips-goods fw js">
            <h1 class="flex js llll">包含:</h1>
            <span v-for="item in now_good.services">{{item.max_num + item.label}}</span>
          </div>
        </div>
        <h1 class="flex lll tips-title">小贴士</h1>
        <p v-html="now_good.tips || now_good.des" class="tips-pen"></p>
      </div>
      <div class="from-warp flex mg10 fw">
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">商品选择:</div>
          <div class="flex from-item-right xenia" @click.stop="multi_show = !multi_show">
            {{now_good.label}}
            <multi :multi_list="good_list" :show="multi_show" :active_id="active_id" @chose="_multiChose"></multi>
          </div>
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">作品链接:</div>
          <div class="flex from-item-right">
            <input type="text" name="作品链接" placeholder="请输入作品链接" class="index-input" v-model="link"/>
            <router-link tag='div'
                         :to="'./index/course?url=' + now_good.tutorials_mobile"
                         class="flex course-btn ell">查看教程
            </router-link>
          </div>
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">商品数量:</div>
          <div class="flex from-item-right ell">
            <span v-show="!now_good.min_num">1 (固定数量)</span>
            <input type="text" name="作品链接" placeholder="请输入商品数量" class="index-input" v-model="num"
                   @keyup="_rectifyMoney" v-show="now_good.min_num"/>
          </div>
        </div>
        <div v-show="now_good.min_num < now_good.max_num" class="flex note">注：下单数量范围：
          {{now_good.min_num}}~{{now_good.max_num}}{{now_good.units}}
        </div>
        <div class="from-item flex mg20">
          <div class="flex ell from-item-left">所需金额:</div>
          <div class="flex from-item-right ell">{{num ? num : 0}}*{{(now_good.price || now_good.score)}}=
            {{agencyPrice}}
          </div>
        </div>
      </div>
      <div class="index-btn flex ll mg10" @click="_addTask">提交订单</div>
      <div class="flex" style="height: 65px"></div>
      <popup ref="proxy">
        <div class="flex proxy-warp fw">
          <img src="https://cdn.xingkwh.com/%E4%BB%A3%E7%90%86%E8%A7%A3%E9%94%81.png"/>
          <span class="flex sss">1、星空抖音,快手业务全网最低价。</span>
          <span class="flex sss">2、拥有招收代理权限，收取的代理金获得50%分成。</span>
          <span class="flex sss">3、成为代理，拥有专属代理群。</span>
          <img src="https://cdn.xingkwh.com/%E4%BB%A3%E7%90%86%E6%9D%83%E9%99%90.png"/>
          <span class="flex sss">1、支付{{proxy_price}}元代理费用即可解锁。</span>
          <div class="proxy-btn-buy lll flex mg10" @click="_wxbuy">立即成为代理</div>
        </div>
      </popup>
      <interlayer ref="interlace" @close="$refs.proxy._hiddenPopup(); $refs.interlace._hiddenLayer()"></interlayer>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import {login, appinfo, combos_category, getServices, getCombos, addtask, wechat_agent_good, wechat_agent_order} from 'api/index'
  import multi from 'base/multi/multi'
  import popup from 'base/popup/popup'
  import interlayer from 'base/interlayer/interlayer'

  export default {
    data() {
      return {
        active_service_id: 0,
        active_com_id: null,
        title: [],
        com_title: [],
        multi_show: false,
        active_id: 0,
        good_list: [],
        link: '',
        num: '',
        proxy_price: 128,
        good_catch: {},
        proxy_good_id: null
      }
    },
    created() {
      this._init()
    },
    mounted() {
    },
    computed: {
      now_good() {
        let item = {
          label: '加载中',
          id: 0,
          score: 0,
          min_num: 0,
          max_num: 0,
          tag: ''
        }
        for (let i = 0; i < this.good_list.length; i++) {
          if (this.good_list[i].id === this.active_id) {
            item = this.good_list[i]
            break
          }
        }
        return item
      },
      agencyPrice() {
        return Math.round(((this.num || 0) * (this.now_good.price || this.now_good.score)) * 100) / 100
      }
    },
    methods: {
      async _wxbuy() {
        if (!this.proxy_good_id && this.proxy_good_id !== 0) {
          return false
        }
        if (!window.WeixinJSBridge) {
          console.log('未在微信内')
        } else {
          this.$root.eventHub.$emit('loading', true)
          const ret = await wechat_agent_order(this.$root.user.user_id, this.proxy_price, this.proxy_good_id)
          this.$root.eventHub.$emit('loading', null)
          if (ret.status === 200 && ret.data.code === 200 && ret.data.data.order_code) {
            const reualt = ret.data.data.pay_ret
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                'appId': reualt.appId,     //公众号名称，由商户传入
                'timeStamp': reualt.timeStamp,         //时间戳，自1970年以来的秒数
                'nonceStr': reualt.nonceStr, //随机串
                'package': reualt.package,
                'signType': 'MD5',         //微信签名方式：
                'paySign': reualt.paySign //微信签名
              }, (res) => {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  this.$root.eventHub.$emit('titps', '开通代理成功~')
                  this.$refs.proxy._hiddenPopup();
                  this.$refs.interlace._hiddenLayer();
                  setTimeout(async () => {
                    const ret = await updateuserinfo(this.$root.user.user_id)
                    if (ret.status === 200 && ret.data.code == 200) {
                      this.$root.user = ret.data.data
                      this.$root.eventHub.$emit('update')
                      this.$router.replace({
                        path: '/user'
                      })
                    }
                  }, 300)
                }
              })
          }
        }
      },
      async _updateuserinfo(username) {
        const ret = await updateuserinfo(username)
        if (ret.status === 200 && ret.data.code == 200) {
          this.$root.user = ret.data.data
        }
      },
      _init() {
        const url = window.location.href
        const start = url.indexOf('code=') + 5
        const end = url.indexOf('&state')
        if (start > 4 && end > -1) {
          this._login(url.slice(start, end))
          history.replaceState(null, null, window.location.origin + '/#/index');
        } else {
          const user = localStorage.getItem('user_id')
          if (user) {
            this._updateuserinfo(user)
          } else {
          }
        }
        this._appinfo()
      },
      async _addTask() {
        if (!this.$root.user.id) {
          return false
        }
        if (!this.$root.user.is_agent) {
          this._showproxy()
          return false
        }
        if (!this.link || this.link.indexOf('http') < 0) {
          this.$root.eventHub.$emit('titps', '请正确填写链接')
          return false
        }
        if (!this.num || this.num > this.now_good.max_num || this.num < this.now_good.min_num) {
          this.$root.eventHub.$emit('titps', '请填写数量在范围之内')
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await addtask(this.active_com_id ? 2 : 1, this.$root.user.user_id, this.num, this.now_good.id, this.agencyPrice, this.link)
        this.$root.eventHub.$emit('loading', null)
      },
      async _getCombos(com_id, id) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await getCombos(com_id)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.err_code === 200) {
          this.good_catch[id] = this._formatCombos(ret.data.data)
          this.good_list = this.good_catch[id]
          this.active_id = ret.data.data[0].id
        }
      },
      _formatCombos(list) {
        try {
          list.forEach((res) => {
            if (res.services.length) {
              res.tutorials_mobile = res.services[0].tutorials_mobile
            }
          })
          return list
        } catch (e) {
          console.log(e)
          return list
        }
      },
      async _getServices(id) {
        this.num = ''
        if (this.good_catch[id]) {
          this.good_list = this.good_catch[id]
          this.active_id = this.good_catch[id][0].id
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await getServices(id)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.err_code === 200) {
          this.good_list = ret.data.data
          this.good_catch[id] = ret.data.data
          this.active_id = ret.data.data[0].id
        }
      },
      async _wechat_agent_good(id, callback) {
        const ret = await wechat_agent_good(id)
        if (ret.status === 200 && ret.data.code === 200) {
          this.proxy_price = ret.data.data.score
          this.proxy_good_id = ret.data.data.good_id
          if (callback) {
            callback()
          }
        }
      },
      async _combos_category(id = -1) {
        this.num = 1
        if (this.good_catch[id]) {
          this.good_list = this.good_catch[id]
          this.active_id = this.good_catch[id][0].id
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await combos_category()
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.err_code === 200) {
          this._getCombos(ret.data.data[0].category, id)
        }
      },
      async _appinfo() {
        const ret = await appinfo()
        if (ret.status === 200 && ret.data.err_code === 200) {
          this.title = ret.data.data.service_categories
          this.active_service_id = this.title[0].id
          this._getServices(this.title[0].id)
        }
      },
      async _login(code) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await login(code)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
          localStorage.setItem('user_id', ret.data.data.user_id)
          if (!ret.data.data.is_agent) {
            this._wechat_agent_good(this.$root.user.user_id, this._showproxy)
          }
        }
      },
      _showproxy() {
        this.$refs.proxy._showPopup()
        this.$refs.interlace._showLayer()
      },
      _multiChose(e) {
        this.active_id = e.id
      },
      _rectifyMoney() {
        if (isNaN(this.num) || this.num.indexOf('.') > -1 || this.num <= 0) {
          this.num = ''
        }
      },
    },
    components: {
      multi,
      popup,
      interlayer
    }
  }

</script>
<style type="text/css" scoped>
  .index-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, .1);
    z-index: 999;
  }

  .header-item {
    flex-grow: 1;
  }

  .active-header-item {
    color: #000;
  }

  .active-header-item span {
    position: relative;
  }

  .active-header-item span:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 4px;
    width: 100%;
    background: linear-gradient(right, #FF1212, #FFCF41);
    background: -webkit-gradient(linear, right top, left top, from(#FF1212), to(#FFCF41));
    opacity: .8;
    border-radius: 10px;
    transform: translate(-50%, 0);
  }

  .tips-warp {
    width: 90%;
    min-height: 60px;
    background: #FFEEE8;
    color: #FF551F;
    border-radius: 8px;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .from-warp {
    width: 90%;
    min-height: 100px;
    background: #fff;
    border-radius: 8px;
    padding-bottom: 20px;
    align-items: flex-start;
  }

  .tips-title {
    width: 90%;
    height: 50px;
    text-indent: 35px;
    justify-content: flex-start;
    background: url("https://cdn.xingkwh.com/%E5%B0%8F%E8%B4%B4%E5%A3%ABicon.png") no-repeat;
    background-size: 28px auto;
    background-position: 0 46%;
  }

  .index-btn {
    width: 90%;
    height: 45px;
    border-radius: 8px;
    color: #fff;
    background: linear-gradient(right, #FF561E, #FF2966);
    background: -webkit-gradient(linear, right top, left top, from(#FF561E), to(#FF2966));
  }

  .from-item {
    width: 88%;
    height: 38px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 3px;
    justify-content: flex-start;
  }

  .from-item-left {
    height: 100%;
    width: 32%;
    flex-shrink: 0;
  }

  .from-item-right {
    flex-grow: 1;
    height: 100%;
    justify-content: flex-start;
    text-indent: 20px;
    position: relative;
    color: #666;
  }

  .xenia {
    color: #353535;
    background: url("https://cdn.xingkwh.com/%E5%95%86%E5%93%81%E9%80%89%E6%8B%A9@2x.png") no-repeat;
    background-size: 15px auto;
    background-position: 94% center;
  }

  .index-input {
    text-indent: 20px;
    color: #353535;
  }

  .course-btn {
    background: #FF2E5D;
    color: #fff;
    font-size: 12px;
    width: 60px;
    height: 80%;
    flex-shrink: 0;
    margin: 0 5px;
    text-align: center;
    text-indent: 0;
  }

  .tips-card-warp {
    width: 90%;
    padding-top: 63%;
    border-radius: 10px;
    background: linear-gradient(right, #FF561E, #FF2966);
    position: relative;
    overflow: hidden;
  }

  .tips-card-label {
    position: absolute;
    top: 15%;
    left: 5%;
    width: 59%;
  }

  .categry1 {
    background: url("https://cdn.xingkwh.com/%E4%B8%8A%E7%83%AD%E9%97%A8%E6%96%B9%E6%A1%88.png") no-repeat;
    background-size: 100% 100%;
  }

  .text-categry1 {
    color: #1268EB;
  }

  .price {
    position: absolute;
    top: 30%;
    width: 100%;
    height: 30%;
  }

  .price .maxmaxmaxs {
    padding-left: 5%;
    flex-grow: 1;
    width: 0;
    height: 100%;
    justify-content: flex-start;
    color: #fff;
    overflow: hidden;
  }

  .price-right {
    width: 0;
    white-space: nowrap;
    max-width: 70%;
    flex-grow: 1.5;
  }

  .price-right span {
    color: #fff;
    margin: 3px auto;
  }

  .tips-goods {
    position: absolute;
    bottom: 0;
    left: 6%;
    width: 90%;
    height: 40%;
    color: #fff;
    align-items: flex-start;
    align-content: flex-start;
  }

  .tips-goods span {
    margin: 5px 5px 0 0;
  }

  .proxy-warp {
    width: 78%;
    padding: 4%;
    margin: 0 auto;
    height: auto;
    min-height: 100px;
    background: #fff;
    border-radius: 10px;
  }

  .proxy-warp span {
    min-height: 24px;
    line-height: 20px;
    justify-content: flex-start;
  }

  .proxy-warp img {
    width: 40%;
    margin: 10px 10%;
    height: auto;
  }

  .proxy-btn-buy {
    width: 100%;
    height: 40px;
    border-radius: 6px;
    background: #524E4B;
    color: #DBB868;
  }

  .tips-pen {
    width: 90%;
    line-height: 22px;
    padding-bottom: 10px;
    transition: all .3s;
  }

  .note {
    width: 90%;
    margin-bottom: -15px;
    height: 30px;
    font-size: 13px;
    text-indent: 10px;
    justify-content: flex-start;
    color: #FF2E5D;
  }
</style>
