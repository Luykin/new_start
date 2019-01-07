<template>
  <transition name="list">
    <div>
      <div class="cachet flex js">
        <div class="cachet-item flex" v-for="item in btn_list" :class="{'active-cachet-item': item.id === activeId}"
             @click="_change(item.id)">{{item.name}}
        </div>
      </div>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div>
          <div class="index-task-item flex" v-for="item in list" v-if="list.length" :key="item.id"
               @click="_getDetail(item.id)">
            <div class="categry-task flex" :style="`background:${item.bg_color}; color: ${item.font_color}`">
              {{item.min_title}}
            </div>
            <div class="flex index-task-item-inner">
              <img :src="item.avatar" class="task-item-avatar"/>
              <div class="flex fw ell js">
                <span class="task-item-title ell">{{item.title}}</span>
                <span class="task-num ell">{{item.use_num}}人已做,还剩{{item.remain_num}}个名额</span>
              </div>
              <div class="flex task-item-money js">
                赏金{{item.single_price}}元
              </div>
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
  import empyt from 'base/empyt/empyt'
  import {task_hall} from 'api/index'
  import betterscroll from 'base/better-scroll/better-scroll'

  export default {
    data() {
      return {
        list: [],
        page: 0,
        num: 10,
        total: 0,
        btn_list: [{
          id: 1,
          name: '抖音专区'
        }],
        activeId: 1
      }
    },
    created() {
      this._getTaskHall()
      this.$root.eventHub.$on('updateList', () => {
        this._pulldown()
      })
      this.$root.eventHub.$on('refresh/hall', () => {
        this.$nextTick(() => {
          try {
            // console.log('刷新')
            this.$refs.wrapper.refresh()
          } catch (e) {
            console.log(e)
          }
        })
      })
    },
    mounted() {
      this.$refs.wrapper._initScroll()
    },
    methods: {
      async _getTaskHall(must) {
        if (!must) {
          this.$root.eventHub.$emit('loading', true)
        }
        const ret = await task_hall(null, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (must || !this.list.length) {
            this.list = [...ret.data.data.top_ret, ...ret.data.data.ret]
          } else {
            this.list = [...this.list, ...ret.data.data.ret]
          }
          this.total = ret.data.data.count
        }
      },
      async _getDetail(id) {
        if (!this.$root.user.username) {
          return false
        }
        this.$router.push({
          path: `./hall/${id}`
        })
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        // this.list = []
        this._getTaskHall(true)
      },
      _scrollToEnd() {
        if (this.list.length < this.total) {
          this.page += 1
          this._getTaskHall()
        }
      }
    },
    components: {
      empyt,
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 80px;
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
    width: 46px;
    height: 46px;
    margin: 0 16px;
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
    font-size: 12px;
    color: #FF3939;
    text-indent: 6px;
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

  .cachet {
    margin-top: 10px;
  }
</style>
