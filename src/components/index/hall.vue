<template>
  <transition name="list">
    <div>
      <div class="cachet flex js">
        <div class="cachet-item flex" v-for="item in btn_list" :class="{'active-cachet-item': item.id === activeId}"
             @click="_change(item.id)">{{item.name}}
        </div>
      </div>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div class="min-warp-height">
          <div class="index-task-item flex" v-for="item in list" v-if="list.length" :key="item.id"
               @click="_getDetail(item.id)">
            <div v-show="item.is_top" class="top-title-new"></div>
            <div class="categry-task flex" :style="`background:${item.bg_color}; color: ${item.font_color}`">
              {{item.min_title}}
            </div>
            <div class="flex index-task-item-inner">
              <div class="default-avatar">
                <img :src="item.avatar" class="new-task-item-avatar" @error="_error($event)"/>
              </div>
              <div class="flex fw ell js">
                <span class="task-item-title ell">{{item.title}}</span>
                <span class="task-num ell">{{item.use_num}}人已做,还剩{{item.remain_num}}个名额</span>
              </div>
              <div class="flex task-item-money js">
                ¥{{item.single_price}}
              </div>
            </div>
          </div>
          <div style="height: 10px"></div>
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
        },{
          id: 2,
          name: '快手专区'
        }],
        activeId: 1,
        pullDownTimer: null
      }
    },
    created() {
      this._getTaskHall()
      this.$root.eventHub.$on('updateList', (time) => {
        // this.$nextTick(() => {
        //   if (this.pullDownTimer) {
        //     clearTimeout(this.pullDownTimer)
        //   }
        //   this.pullDownTimer = setTimeout(() => {
        //     this._pulldown()
        //     clearTimeout(this.pullDownTimer)
        //     this.pullDownTimer = null
        //   }, time || 8000)
        // })
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
      _change(id) {
        if (id === 2) {
          this.$root.eventHub.$emit('titps', `快手专区正在努力开发中~`)
        }
      },
      _error(err) {
        try {
          err.target.style.display = 'none'
        } catch (e) {
          console.log(e)
        }
      },
      async _getTaskHall(must) {
        if (!must) {
          this.$root.eventHub.$emit('loading', true)
        }
        const ret = await task_hall(null, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (must || !this.list.length) {
            this.list = [...this.formatTop(ret.data.data.top_ret), ...ret.data.data.ret]
          } else {
            this.list = [...this.list, ...ret.data.data.ret]
          }
          this.total = ret.data.data.count
        }
      },
      formatTop(list) {
        try {
          if (!list.length) {
            return []
          }
          list.forEach((item) => {
            item.is_top = true
          })
          return list
        } catch (e) {
          console.log(e)
          return list
        }
      },
      async _getDetail(id) {
        if (!this.$root.user.username) {
          return false
        }
        this.$router.push({
          name: 'task-detail',
          params: {id}
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
    top: 65px;
    bottom: 55px;
    overflow: hidden;
  }
</style>
