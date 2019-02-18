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
          <div class="index-task-item flex bg-none" v-for="item in list" v-if="list.length" :key="item.id"
               @click="_getDetail(item.id)" :class="_setBackTaskItem(item)">
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
                <p class="task-num ell"><span style="color: #6B41E1">{{item.use_num}}</span>人已做,还剩<span
                  style="color: #FF3939">{{item.remain_num}}</span>个名额</p>
              </div>
              <div class="flex task-item-money js">
                ¥{{item.single_price}}
              </div>
            </div>
          </div>
          <div style="height: 10px"></div>
          <empyt v-show="!list.length" :padding="90" :flush="!pullLoading" @flush="_pulldown(1)"></empyt>
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
        num: 20,
        total: 0,
        btn_list: [{
          id: 1,
          name: '抖音专区'
        },{
          id: 2,
          name: '快手专区'
        }],
        activeId: 1,
        pullDownTimer: null,
        pullLoading: null,
        doingLoad: null
      }
    },
    computed: {
      _setBackTaskItem() {
        return (item) => {
          return `iti-back${item.service_group_id}`
        }
      },
    },
    created() {
      this._getTaskHall(this.activeId)
      this.$root.eventHub.$on('updateList', (time) => {
        this._pulldown()
      })
      this.$root.eventHub.$on('refresh/hall', () => {
        const that = this
        let timer = setTimeout(() => {
          try {
            that.$refs.wrapper.refresh()
          } catch (e) {
            console.log(e)
          }
          clearInterval(timer)
          timer = null
        }, 100)
      })
    },
    mounted() {
      this.$refs.wrapper._initScroll()
    },
    methods: {
      _change(id) {
        if (id === this.activeId) {
          return false
        }
        this._getTaskHall(id, true, true, () => {
          this.activeId= id
        })
      },
      _error(err) {
        try {
          err.target.style.display = 'none'
        } catch (e) {
          console.log(e)
        }
      },
      async _getTaskHall(id=1, must, loading, callback) {
        if (this.doingLoad) {
          return false
        }
        if (!must || loading) {
          this.$root.eventHub.$emit('loading', true)
        }
        this.doingLoad = true
        this.pullLoading = true
        const ret = await task_hall(id, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (must || !this.list.length) {
            this.list = [...this.formatTop(ret.data.data.top_ret), ...ret.data.data.ret]
          } else {
            this.list = [...this.list, ...ret.data.data.ret]
          }
          this.total = ret.data.data.count
          if (callback) {
            callback()
          }
        }
        let timer = setTimeout(() => {
          this.pullLoading = null
          clearTimeout(timer)
          timer = null
        }, 2000)
        this.doingLoad = null
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
        // if (!this.$root.user.username) {
        //   return false
        // }
        this.$router.push({
          name: 'task-detail',
          params: {id}
        })
      },
      _pulldown(loading) {
        this.num = 20
        this.page = 0
        // this.list = []
        this._getTaskHall(this.activeId, true, loading)
      },
      _scrollToEnd() {
        if (this.list.length < this.total) {
          this.page += 1
          this._getTaskHall(this.activeId)
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
