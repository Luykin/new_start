<template>
  <transition name="list">
    <div>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper'>
        <div>
          <div class="height10"></div>
          <div class="header">
            <userheader></userheader>
          </div>
          <div class="flex task-title">推荐任务</div>
          <div class="index-task-item flex" v-for="i in 10">
            <div class="categry-task flex">抖音评论</div>
            <div class="flex index-task-item-inner">
              <img src="../../assets/img/headerbg.png" class="task-item-avatar"/>
              <div class="flex fw ell js">
                <span class="task-item-title ell">求赞做任务,一块钱一次,电玩找哇哦的撒多</span>
                <span class="task-num ell">80人已经做了</span>
              </div>
              <div class="flex task-item-money">
                赏金2.5元
              </div>
            </div>
          </div>
        </div>
      </betterscroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {pub_task, login} from 'api/index'

  export default {
    name: 'user',
    created() {

    },
    mounted() {
      this._inint()
    },
    methods: {
      _inint() {
        this.$refs.wrapper._initScroll()
        this._getPubTask()
        this._login()
      },
      async _getPubTask() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await pub_task(1)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
         this.$root.serverCache = ret.data.data.ret
        }
      },
      async _login() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await login('abcdefg123')
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
        }
      },
      _pulldown() {
        // this.num = 10
        // this.page = 0
        // this.list = []
        // this._secret_list()
      },
      _scrollToEnd() {
        // if (this.list.length < this.totle) {
        //   this.page += 1
        //   this._secret_list()
        // }
      }
    },
    components: {
      userheader,
      betterscroll
    }
  }
</script>

<style scoped>
  .header {
    width: 92%;
    height: 170px;
    margin: 10px auto 20px;
  }

  .wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 65px;
    overflow: hidden;
  }

  .index-task-item {
    width: 92%;
    height: 80px;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    background: #fff;
    margin: 10px auto;
    position: relative;
    overflow: hidden;
  }

  .categry-task {
    position: absolute;
    left: 0;
    top: 0;
    width: 70px;
    height: 25px;
    max-height: 30%;
    border-bottom-right-radius: 10px;
    background: #FFDEF9;
    font-size: 10px;
    color: #F656D9;
    transform: scale(.8);
    transform-origin: left top;
  }

  .index-task-item-inner {
    height: 80%;
    position: absolute;
    bottom: 0;
  }

  .task-item-avatar {
    width: 47px;
    height: 47px;
    margin: 0 20px;
    border-radius: 1000px;
  }

  .task-item-title {
    width: 90%;
    font-size: 15px;
    color: #333;
    margin-bottom: 5px;
  }

  .task-num {
    font-size: 12px;
    color: #9096AB;
  }

  .task-item-money {
    width: 25%;
    max-width: 75px;
    height: 100%;
    margin-right: 3%;
    flex-grow: 1;
    flex-shrink: 0;
    white-space: nowrap;
    font-size: 13px;
    color: #FF3939;
    font-weight: 600;
    position: relative;
  }

  .task-item-money:after {
    width: 20px;
    height: 20px;
    content: '';
    background: url("../../assets/img/money.png");
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-100%, -50%);
  }
</style>
