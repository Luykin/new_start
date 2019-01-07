<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="cachet flex js">
        <div class="cachet-item flex" v-for="item in btn_list" :class="{'active-cachet-item': item.id === activeId}"
             @click="_change(item.id)">{{item.name}}
        </div>
      </div>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div>
          <div class="task-info flex fw" v-for="item in list" v-if="list.length" :key="item.id" @click=" _getDetail(item.task_id)">
            <div class="my-task-top flex js">
              <img :src="item.avatar"/>
              <div class="flex my-task-top-title ell fw">
                <span class="flex js">{{item.title.slice(0, 14)}}</span>
                <span class="flex js time-cut-down" v-show="item.status === 0">{{'任务倒计时:' + _msecTransform(item.complete_time - nowTime)}}</span>
              </div>
              <div class="flex task-item-money js">
                赏金{{item.single_price}}元
              </div>
            </div>
            <div class="flex my-task-bottom js">
              <div class="task-status flex" :class="taskTips(item.status)">{{taskText(item.status)}}</div>
              <img src="../../assets/img/delete.png" class="delete"/>
            </div>
          </div>
          <empyt v-show="!list.length" :padding="90"></empyt>
        </div>
      </betterscroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import empyt from 'base/empyt/empyt'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {my_task} from 'api/index'

  export default {
    name: 'recharge',
    data() {
      return {
        btn_list: [{
          id: 0,
          name: '进行中'
        }, {
          id: 1,
          name: '审核中'
        }, {
          id: 2,
          name: '已通过'
        }, {
          id: 3,
          name: '未通过'
        }],
        activeId: 0,
        page: 0,
        num: 10,
        total: 0,
        list: [],
        timer: null,
        nowTime: Date.parse(new Date())
      }
    },
    computed: {
      taskTips() {
        return(status) => {
          return `status${status}`
        }
      },
      taskText() {
        return (status) => {
          return status === 0 ? '任务进行中' : status === 1 ? '任务审核中' : status === 2 ? '任务已完成' : '任务未通过'
        }
      }
    },
    created() {
      this._getMyTask()
      this.$root.eventHub.$on('updateMyTask', () => {
        this._pulldown()
      })
    },
    mounted() {
      this.$refs.wrapper._initScroll()
      this._setTime()
    },
    methods: {
      _getDetail(id) {
        // console.log(id)
        this.$router.push({
          path: `./index/${id}`
        })
      },
      // _toSubmitJob(item) {
      //   this.$router.push({
      //     name: 'submitMyJob',
      //     params: item
      //   })
      // },
      _setTime() {
        setInterval(() => {
          this.nowTime = Date.parse(new Date())
        }, 1000)
      },
      _change(id) {
        if (this.timer) {
          this.$root.eventHub.$emit('titps', `请勿频繁点击`)
          return false
        }
        if (this.activeId !== id) {
          this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.timer = null
          }, 600)
          this.activeId = id
          this._pulldown()
        }
      },
      async _getMyTask() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await my_task(this.activeId, this.$root.user.username, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.list = [...this.list, ...ret.data.data.ret]
          this.total = ret.data.data.count
        }
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        this._getMyTask()
      },
      _scrollToEnd() {
        if (this.list.length < this.total) {
          this.page += 1
          this._getMyTask()
        }
      },
      // _cutDown(time) {
      //   // console.log(time)
      //   if (!time) {
      //     this.cut_time = '您还未接受改任务'
      //     return false
      //   }
      //   this.timer = setInterval(() => {
      //     this.cut_time = this._msecTransform(time - Date.parse(new Date()))
      //   }, 1000)
      //   this.cut_time = this._msecTransform(time - Date.parse(new Date()))
      // },
      _msecTransform(msec) {
        if (msec < 0) {
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
    },
    components: {
      back,
      empyt,
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 110px;
    bottom: 0;
    overflow: hidden;
  }

  .my-task-top {
    width: 92%;
    height: 50px;
    border-bottom: 1px solid #f8f8f8;
    margin: 0 auto;
  }

  .my-task-bottom {
    width: 92%;
    height: 40px;
    margin: 10px auto 0;
    position: relative;
  }

  .my-task-bottom .delete {
    width: 24px;
    height: auto;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }

  .my-task-top img {
    width: 45px;
    height: 45px;
    border-radius: 100px;
  }

  .task-status {
    padding: 8px 3px;
    background: #FF8215;
    border-radius: 5px;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    width: 90px;
  }
  .status0{
    background: #FF8215;
  }
  .status1{
    background: #6741D3;
  }
  .status2{
    background: #32BC42;
  }
  .status3{
    background: #FF3939;
  }

  .my-task-top-title {
    height: 100%;
    margin: 0 20px 0 10px;
  }

  .time-cut-down{
    color: #FF3939;
    font-size: 10px;
    margin-top: 4px;
  }
</style>
