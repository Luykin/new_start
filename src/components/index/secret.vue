<template>
  <div class="secret">
    <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper'>
      <div>
        <router-link tag="div" :to="'./secret/' + item.id" class="secret-item flex js" v-if="list.length" v-for="item in list" :key="id">
          <img :src="item.image"/>
          <div class="flex secret-item-right fw">
            <h1 class="flex ll js">{{item.title}}</h1>
            <div class="ss time">{{item.create}}</div>
          </div>
        </router-link>
      </div>
    </betterscroll>
    <!--<div class="footer-none"></div>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import {secret_list, secret_details} from 'api/index'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {timeChange} from 'common/js/util'

  export default {
    name: 'secret',
    data() {
      return {
        num: 10,
        page: 0,
        total: 0,
        list: []
      }
    },
    created() {
      this._secret_list()
    },
    mounted() {
      this._inint()
    },
    methods: {
      _inint() {
        this.$refs.wrapper._initScroll()
      },
      async _secret_list() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await secret_list(this.num, this.page)
        this.$root.eventHub.$emit('loading', null)
        this.total = ret.data.data.count
        this.list = [...this.list, ...this._formatlist(ret.data.data.ret)]
        // console.log(this.list)
      },
      _formatlist(list) {
        if (!list || !list.length) {
          return []
        }
        list.forEach(res => {
          res.create = timeChange(res.create)
        })
        return list
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        this._secret_list()
      },
      _scrollToEnd() {
        if (this.list.length < this.totle) {
          this.page += 1
          this._secret_list()
        }
      }
    },
    components: {
      betterscroll
    },
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 65px;
  }

  .secret-item {
    width: 88%;
    padding: 10px 2%;
    height: 100px;
    border-radius: 10px;
    margin: 10px auto;
    color: #fff;
    background: #424262;
    overflow: hidden;
  }

  .secret-item img {
    width: 120px;
    height: 100px;
    border-radius: 8px;
  }

  .secret-item-right {
    flex-grow: 1;
    align-items: flex-start;
    align-content: flex-start;
    height: 100%;
    position: relative;
  }
  .secret-item-right h1 {
    margin: 5px 1% 0 5%;
    line-height: 24px;
  }
  .secret-item-right .time{
    position: absolute;
    right: 2%;
    bottom: 2%;
    color: #BFBDE3;
  }
</style>
