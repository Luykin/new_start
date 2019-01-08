<template>
  <transition name="list">
    <div class="detail-body" v-if="activeService">
      <back></back>
      <div class="service-warp flex">
        <div v-for="item in $root.serverCache.ret" class="flex service-item fw"
             :class="{'active-service' : activeService.id === item.id}" @click="activeService = item">
          <img :src="item.n_icon" class="normal"/>
          <img :src="item.icon" class="active"/>
          <span class="flex">{{item.title}}</span>
        </div>
      </div>
      <div class="release-body flex fw">
        <div class="flex max-task-input-warp task-input-warp">
          <div class="tiw-mid">
            <input type="text" name="作品链接" placeholder="请粘贴作品链接" class="index-input" v-model="works_link"/>
          </div>
          <div class="line-back course-btn flex fw" @click="_toCourse(activeService)">
            <span class="flex cb-item">获取</span>
            <span class="flex cb-item">教程</span>
          </div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">悬赏标题</div>
          <div class="tiw-mid">
            <input type="text" name="悬赏标题" placeholder="请输入标题(不超过40个字符)" class="index-input" v-model="reward_title"
                   @keyup="_rectifyRewardTitle"/>
          </div>
          <div class="tiw-right"></div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">悬赏数量</div>
          <div class="tiw-mid">
            <input type="number" name="悬赏数量" placeholder="设定任务数量" class="index-input" v-model="reward_amount" @keyup="_rectifyMinPrice" @blur="_rectifyMinCount"/>
          </div>
          <div class="tiw-right">个</div>
        </div>
        <!--<div class="flex task-input-warp">-->
          <!--<div class="tiw-left flex">每单金额</div>-->
          <!--<div class="tiw-mid">-->
            <!--<input type="text" name="每单金额" :placeholder="`悬赏每单金额(最低${activeService.min_price}元)`" class="index-input"-->
                   <!--v-model="single_price"-->
                   <!--@keyup="_rectifySinglePrice" @blur="_rectifyMinPrice"/>-->
          <!--</div>-->
          <!--<div class="tiw-right">元</div>-->
        <!--</div>-->
        <div class="flex task-input-warp">
          <div class="tiw-left flex">总共金额</div>
          <div class="tiw-mid">
            <input type="text" name="总金额" :placeholder="`请填写总金额`" class="index-input"
                   v-model="all_price"
                   @keyup="_rectifyAllPrice" @blur="_rectifyMinPrice"/>
          </div>
          <div class="tiw-right">元</div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">悬赏每单金额</div>
          <div class="tiw-mid tiw-mid-tips">{{tips}}</div>
          <div class="tiw-right light-color">{{count_single_price}}元</div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">任务审核时间</div>
          <div class="tiw-mid"></div>
          <div class="tiw-right light-color">24小时</div>
        </div>
        <div class="total-sum-warp flex">
          <div class="cover-charge">发任务平台收取<span class="red">{{$root.serverCache.service_ratio * 100}}%</span>服务费</div>
          本次预付款总金额<span class="sum-money">{{all_price ? all_price : 0}}</span>元
        </div>
      </div>
      <div class="task-btn flex line-back" @click="_payAndPubTask">立即发布</div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  // pay_and_pub_task(id, title, task_url, num, single_price, price, score, username) {
  import back from 'base/back/back'
  import {pay_and_pub_task} from 'api/index'
  import {formatDownNum} from 'common/js/util'

  export default {
    data() {
      return {
        works_link: '',
        reward_title: '',
        reward_amount: '',
        single_price: '',
        all_price: '',
        // activeServiceId: null,
        activeService: null,
        tips: ''
      }
    },
    created() {
      // this.activeServiceId = this.$root.serverCache[0].id
      this.activeService = this.$root.serverCache.ret[0]
    },
    mounted() {
      document.querySelectorAll('.index-input').forEach((item) => {
        item.addEventListener('blur', () => {
          try {
            document.body.scrollTop = document.body.scrollHeight;
            document.documentElement.scrollTop = 0;
          } catch (e) {
            console.log(e)
          }
        })
      })
    },
    computed: {
      count_single_price() {
        if (!this.all_price || !this.reward_amount) {
          return 0
        }
        return formatDownNum((this.all_price * (1 - this.$root.serverCache.service_ratio)/this.reward_amount), 2)
      },
      aggregate_amount() {
        if (!this.all_price || !this.reward_amount) {
          return 0
        }
        return this.count_single_price * this.reward_amount
      },
      // advance() {
      //   return formatNum(this.aggregate_amount +(this.aggregate_amount * this.$root.serverCache.service_ratio), 2)
      // }
    },
    methods: {
      _toCourse(item) {
        // console.log(item.tutorial_url)
        this.$router.push({
          name: 'course',
          params: item
        })
      },
      async _payAndPubTask() {
        if (!this.$root.user.username) {
          this.$root.eventHub.$emit('titps', `请从二维码重新进入~`)
          return false
        }
        if (!this.reward_title) {
          this.$root.eventHub.$emit('titps', `请设置任务标题哦~`)
          return false
        }
        if (!this.works_link) {
          this.$root.eventHub.$emit('titps', `请粘贴您的作品链接~`)
          return false
        }
        if (!this.all_price) {
          this.$root.eventHub.$emit('titps', `请设置任务总价哦~`)
          return false
        }
        if (this.count_single_price < parseFloat(this.activeService.min_price)) {
          // this.tips = `单价必须大于${this.activeService.min_price}元`
          this.$root.eventHub.$emit('titps', this.tips)
          return false
        }
        if (!this.reward_amount || this.reward_amount <= 0) {
          this.$root.eventHub.$emit('titps', `请设置任务数量哦~`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await pay_and_pub_task(this.activeService.id, this.reward_title, this.works_link, this.reward_amount, this.count_single_price, this.aggregate_amount, this.all_price, this.$root.user.username)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.eventHub.$emit('titps', `发布成功~`)
          this.$root.eventHub.$emit('updateList', 100)
          this.$root.eventHub.$emit('updateUserInfo')
          this.$router.replace({
            path: './success',
            query: {
              id: ret.data.data.id,
              reward_title: this.reward_title,
              works_link: this.works_link,
              reward_amount: this.reward_amount,
              single_price: this.count_single_price
            }
          })
          this.reward_title = ''
          this.works_link = ''
          this.reward_amount = ''
          this.single_price = ''
        }
        if (ret === 422) {
          this.$root.eventHub.$emit('titps', `金额校验不通过!`)
          return false
        }
        if (ret === 433) {
          this.$root.eventHub.$emit('titps', `您的余额不足哦~`)
          this.$router.push({
            path: './good'
          })
          return false
        }
        // if (ret === 444) {
        //   this.$root.eventHub.$emit('titps', `单价校验不通过`)
        //   return false
        // }
      },
      _rectifySinglePrice() {
        try {
          if (isNaN(this.single_price) || this.single_price < 0) {
            this.single_price = ''
          }
          if (this.single_price.indexOf('.') > -1) {
            const end = this.single_price.indexOf('.')
            this.single_price = this.single_price.slice(0, end + 3)
          }
        } catch (e) {
          this.single_price = ''
        }
      },
      _rectifyMinCount() {
        // reward_amount
        try {
          if (!this.reward_amount) {
            return false
          }
          if (isNaN(this.reward_amount) || this.reward_amount < parseFloat(this.$root.user.min_num)) {
            // console.log(this.single_price < this.activeService.min_price, this.single_price, this.activeService.min_price)
            this.$root.eventHub.$emit('titps', `设置数量必须大于${this.$root.user.min_num}人~`)
            this.reward_amount = ''
            return false
          }
          return true
        } catch (e) {
          this.reward_amount = ''
          return false
        }
      },
      _rectifyAllPrice() {
        try {
          if (isNaN(this.all_price) || this.all_price < 0) {
            this.all_price = ''
          }
          if (this.all_price.indexOf('.') > -1) {
            const end = this.all_price.indexOf('.')
            this.all_price = this.all_price.slice(0, end + 3)
          }
          this._rectifyMinPrice()
        } catch (e) {
          this.all_price = ''
        }
      },
      _rectifyRewardTitle() {
        try {
          if (this.reward_title.length > 40) {
            this.reward_title = this.reward_title.slice(0, 30)
          }
        } catch (e) {
          console.log(e)
        }
      },
      _rectifyMinPrice() {
        try {
          if (!this.all_price) {
            return false
          }
          if (this.count_single_price < parseFloat(this.activeService.min_price)) {
            this.tips = `单价必须大于${this.activeService.min_price}元`
            return false
          }
          this.tips = ''
          return true
        } catch (e) {
          this.all_price = ''
          return false
        }
      },
    },
    name: 'release',
    components: {
      back
    }
  }
</script>

<style scoped>
  .release-body {
    width: 96%;
    height: auto;
    min-height: 300px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto;
    padding: 20px 0;
    overflow: hidden;
    align-items: flex-start;
    align-content: flex-start;
  }

  .service-warp {
    width: 100%;
    height: 120px;
    margin-top: -15px;
  }

  .service-item {
    color: #fff;
  }

  .service-item img {
    width: 55px;
    height: 55px;
    border-radius: 1000px;
    margin: 20px auto 10px;
  }

  .task-input-warp {
    width: 90%;
    height: 42px;
    background: #F8F8F8;
    border-radius: 6px;
    margin: 6px auto;
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
    margin-right: 10px;
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

  .course-btn {
    margin-left: 10px;
    width: 22%;
    height: 100%;
    border-radius: 6px;
    min-width: 70px;
    max-width: 90px;
    color: #fff;
    font-weight: 600;
  }

  .cb-item {
    letter-spacing: 5px;
    margin: 5px auto;
    text-indent: 5px;
  }

  .total-sum-warp {
    width: 90%;
    height: 90px;
    position: relative;
    font-size: 15px;
    color: #333333;
    margin-bottom: -20px;
  }

  .sum-money {
    color: #FF3939;
    font-size: 22px;
    font-weight: 600;
  }

  .cover-charge {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 10px;
    color: #999;
    transform: scale(.9);
  }

  .red {
    color: #FF312D;
  }

  .active-service {
    color: #ffe3ff;
    font-weight: 600;
    position: relative;
  }

  /*.active-service:after {*/
  /*content: '';*/
  /*position: absolute;*/
  /*left: 50%;*/
  /*bottom: -10px;*/
  /*transform: translate(-50%, 0);*/
  /*width: 20%;*/
  /*height: 2px;*/
  /*background: #ffd1c5;*/
  /*box-shadow: 0 0 10px rgba(0, 0, 0, .1);*/
  /*}*/
  .active {
    display: none;
  }

  .active-service .active {
    display: block;
  }

  .active-service .normal {
    display: none;
  }
  .line-back{
    background: #F74BCA;
  }
  .tiw-mid-tips{
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #ff312d;
    justify-content: center;
  }
</style>
