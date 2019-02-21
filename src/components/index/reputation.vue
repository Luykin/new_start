<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="sign-btn flex" @click="_sign">{{$root.user.sign_in ? '已签到' : '每日签到'}}</div>
      <div class="task-info flex fw">
        <div class="task-info-header">
          <div class="tih-inner flex">
            <div class="flex js repulation-title">
              抖赞信用
            </div>
            <div class="flex boom-num fw">
              <span class="flex">{{parseInt($root.user.credit_num)}}</span>
              <span class="flex title">信用分</span>
            </div>
            <div class="flex record-num">
              <div class="record-num-item flex border-after js fw" @click="_toReputationList(1)">
                <img src="../../assets/img/creditadd.png"/>
                <div class="rni-info">
                  <span class="flex add-num">{{$root.user.add_credit_num || 0}}</span>
                  <span class="flex">已加信用</span>
                </div>
              </div>
              <div class="record-num-item flex js fw" @click="_toReputationList(2)">
                <img src="../../assets/img/creditreduce.png"/>
                <div class="rni-info">
                  <span class="flex add-num">{{$root.user.reduce_credit_num || 0}}</span>
                  <span class="flex">已扣信用</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex s line-font line-min-title">信用分数：</div>
        <div class="s line-font">2、信用极差：150</div>
        <div class="s line-font">1、信用极低：200</div>
        <div class="s line-font">3、信用良好：310</div>
        <div class="s line-font">4、信用优秀：380</div>
        <div class="s line-font">5、信用极好：450</div>
        <div class="s line-font line-min-title">信用分数限制：</div>
        <div class="s line-font">1、抖赞信用低于200，每天只能报名1次任务；</div>
        <div class="s line-font">2、抖赞信用低于150，不能提现与充值, 不能报名发布任务；</div>
        <div class="s line-font line-min-title">信用分数增加：</div>
        <div class="s line-font">1、每日签到,增加信誉+1；</div>
        <div class="s line-font">2、报名任务完成并审核通过+1(每日1次)；</div>
        <div class="s line-font">3、发布任务并全部审核通过, 无仲裁+2(每日1次)；</div>
        <div class="s line-font line-min-title">信用分数减少：</div>
        <div class="s line-font">1、报名任务成功，但规定时间内无提交任务，扣除信用-5；(放弃不扣)</div>
        <div class="s line-font">2、官方任务中：乱传图、传错图、审核不通过，扣除信用-10；</div>
        <div class="s line-font">3、普通任务审核不通过，可重新提交，规定时间内未通过，扣除信用-10；</div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import {signIn} from 'api/index'

  export default {
    name: 'reputation',
    components: {
      back
    },
    methods: {
      _toReputationList(type) {
        this.$router.push({
          name: 'reputation-list',
          params: {
            type
          }
        })
      },
      async _sign() {
        if (this.$root.user.sign_in) {
          // this.$root.eventHub.$emit('titps', `您已签到`)
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await signIn(this.$root.user.username)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          // console.log(ret)
          this.$root.user.add_credit_num += 1
          this.$root.user.credit_num += 1
          this.$root.user.sign_in = true
          this.$root.eventHub.$emit('titps', `签到成功,信誉+1`)
        }
      },
    }
  }
</script>

<style scoped>
  .task-info {
    /*background: ;*/
    background: #fff url("https://cdn.xingkwh.com/creditbd.png") no-repeat left top;
    background-size: 100% auto;
    min-height: 300px;
    position: relative;
    padding-top: 62%;
  }

  .task-info-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 54%;
  }

  .tih-inner {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    color: #fff;
    font-size: 15px;
    align-items: flex-start;
    align-content: flex-start;
  }

  .record-num {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 88%;
    height: 28%;
    padding: 10px 0;
    background: #fff;
    border-radius: 1000px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  }

  .boom-num {
    position: absolute;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 55%;
    border-radius: 1000px;
    color: #fff;
    font-size: 27px;
    font-weight: 600;
  }

  .boom-num .title {
    font-size: 14px;
    font-weight: 400;
    margin-top: 10%;
    margin-bottom: -10%;
  }

  .repulation-title {
    height: 40px;
    width: 90%;
    padding: 0 5%;
  }

  .record-num-item {
    box-sizing: border-box;
    height: 100%;
    width: 55%;
    padding: 0 0 0 5%;
    position: relative;
  }

  .record-num-item span {
    color: #999999;
    font-size: 12px;
  }

  .record-num-item img {
    width: 32%;
    height: auto;
    flex-shrink: 0;
  }

  .border-after:after {
    display: block;
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    height: 50%;
    width: 1px;
    transform: translate(0, -50%);
    background: #E3DEFF;
  }

  .rni-info {
    width: auto;
    flex-grow: 1;
    margin-right: 5%;
  }

  .record-num-item .add-num {
    color: #FF3939;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .border-after .add-num {
    color: #1BA02B;
  }

  .line-min-title {
    color: #333;
    font-weight: 600;
  }

  .sign-btn {
    width: auto;
    padding: 0 4%;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
  }
</style>
