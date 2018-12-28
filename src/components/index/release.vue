<template>
  <transition name="list">
    <div class="detail-body">
      <div class="service-warp flex"></div>
      <div class="release-body flex fw">
        <div class="flex max-task-input-warp task-input-warp">
          <div class="tiw-mid">
            <input type="number" name="作品链接" placeholder="请粘贴作品链接" class="index-input" v-model="works_link"/>
          </div>
          <div class="line-back course-btn flex fw">
            <span class="flex cb-item">获取</span>
            <span class="flex cb-item">教程</span>
          </div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">悬赏数量</div>
          <div class="tiw-mid">
            <input type="number" name="悬赏数量" placeholder="设定任务数量" class="index-input" v-model="reward_amount"/>
          </div>
          <div class="tiw-right">个</div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">每单金额</div>
          <div class="tiw-mid">
            <input type="text" name="每单金额" placeholder="设定悬赏每单金额" class="index-input" v-model="single_price"
                   @keyup="_rectifySinglePrice"/>
          </div>
          <div class="tiw-right">元</div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">悬赏总共金额</div>
          <div class="tiw-mid"></div>
          <div class="tiw-right light-color">{{aggregate_amount}}元</div>
        </div>
        <div class="flex task-input-warp">
          <div class="tiw-left flex">任务审核时间</div>
          <div class="tiw-mid"></div>
          <div class="tiw-right light-color">24小时</div>
        </div>
        <div class="total-sum-warp flex">
          <div class="cover-charge">发任务平台收取<span class="red">15%</span>服务费</div>
          本次预付款总金额<span class="sum-money">{{advance}}</span>元
        </div>
      </div>
      <div class="task-btn flex line-back">立即发布</div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        works_link: '',
        reward_amount: '',
        single_price: '',
      }
    },
    computed: {
      aggregate_amount() {
        return this.single_price && this.reward_amount ? this.single_price * this.reward_amount : 0
      },
      advance() {
        return this.aggregate_amount + this.aggregate_amount * 0.15
      }
    },
    methods: {
      _rectifySinglePrice() {
        try {
          if (isNaN(this.single_price) || this.single_price < 0) {
            this.single_price = ''
          }
        } catch (e) {
          this.single_price = ''
        }
      },
    },
    name: 'release'
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
    height: 150px;
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
</style>
