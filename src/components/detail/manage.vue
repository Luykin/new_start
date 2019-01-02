<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div>
          <div class="task-info" v-for="item in list">{{item.min_title}}</div>
        </div>
      </betterscroll>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {release_management} from 'api/index'

  export default {
    name: 'manage',
    data() {
      return {
        page: 0,
        num: 10,
        total: 0,
        list: []
      }
    },
    created() {
      this._init()
    },
    methods: {
      _init() {
        this._getManageList()
      },
      async _getManageList() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await release_management(this.$root.user.username, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.list = [...this.list, ...ret.data.data.ret]
          this.total = ret.data.data.count
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
      back,
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 40px;
    bottom: 0;
    overflow: hidden;
  }
</style>
