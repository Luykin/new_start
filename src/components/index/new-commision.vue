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
          <div class="ranking-top" :class="{'ranking-style': activeId === 1}">
            <div class="ranking-top-warp flex" v-if="activeId === 1">
              <div v-for="item in topThree" class="top-three flex">
                <img
                  :src="item.avatar"
                  class="top-three-avatar"/>
                <div class="flex fw cachet-info">
                  <span class="flex top-three-money ell">{{item.sum_score}}元</span>
                  <div class="flex top-three-cachet">
                    <img src="https://cdn.xingkwh.com/%E4%BF%A1%E7%94%A8icon%E7%99%BD%E8%89%B2@3x.png"/>
                    {{parseInt(item.credit_num)}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in list" class="ranking-item flex js ell">
            <span class="ranking-number" v-show="activeId === 1">{{index+4}}</span>
            <img :src="item.avatar" class="ranking-avatar"/>
            <span class="ranking-name ell">{{item.nickname}}</span>
            <div class="ranking-credit flex">
              <img src="https://cdn.xingkwh.com/%E4%BF%A1%E7%94%A8icon@3x.png"/>
              {{parseInt(item.credit_num)}}
            </div>
            <div class="ranking-score ell flex" v-if="activeId === 1">
              提现:
              <span>{{item.sum_score}}元</span>
            </div>
            <div class="ranking-score ell flex" v-else>
              永久封禁
            </div>
          </div>
          <!--<div style="height: 10px"></div>-->
          <!--<empyt v-show="!list.length" :padding="90" :flush="!pullLoading" @flush="_pulldown(1)"></empyt>-->
        </div>
      </betterscroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {blackList, rankList} from 'api/index'

  export default {
    name: 'new-commision',
    data() {
      return {
        activeId: -1,
        btn_list: [{
          id: 1,
          name: '收入榜'
        }, {
          id: 2,
          name: '黑名单'
        }],
        list: [],
        topThree: [],
        page: 0,
        num: 20,
        total: 0,
        catheList: {}
      }
    },
    created() {
    },
    mounted() {
      this._change(1)
      this.$refs.wrapper._initScroll()
    },
    methods: {
      // scrollTo
      _change(id) {
        if (id === this.activeId) {
          return false
        }
        this.page = 0
        this.list = []
        if (id === 2) {
          this._getBlacklist(null, () => {
            this.activeId = id
          }, id)
        } else {
          this._getRanklist(null, true, () => {
            this.activeId = id
          }, id)
        }
        this.$refs.wrapper.scrollTo(0, 0)
      },
      async _getBlacklist(loadMore, callback, id) {
        if (!loadMore && id && this.catheList[id]) {
          this.list = this.catheList[id]
          if (callback) {
            callback()
          }
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await blackList(this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.list = [...this.list, ...ret.data.data.ret]
          this.total = ret.data.data.count
          if (callback) {
            callback()
          }
          this.catheList[this.activeId] = this.list
        }
      },
      // rankList
      async _getRanklist(loadMore, must, callback, id) {
        if (!loadMore && id && this.catheList[id]) {
          this.list = this.catheList[id]
          if (callback) {
            callback()
          }
          return false
        }
        this.$root.eventHub.$emit('loading', true)
        const ret = await rankList(this.$root.user.username, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (callback) {
            callback()
          }
          if (must) {
            this.list = ret.data.data.result.slice(3)
            this.catheList[this.activeId] = this.list
            const topThree = ret.data.data.result.slice(0, 3)
            this.topThree = [topThree[1], topThree[0], topThree[2]]
          } else {
            this.list = [...this.list, ...ret.data.data.result]
            this.catheList[this.activeId] = this.list
          }
          this.total = ret.data.data.count - 3
        }
      },
      _pulldown() {
        this.page = 0
        if (this.activeId === 2) {
          this._getBlacklist(true)
        } else {
          this._getRanklist(true, true)
        }
      },
      _scrollToEnd() {
        if (this.list.length < this.total) {
          this.page += 1
          if (this.activeId === 2) {
            this._getBlacklist(true)
          } else {
            this._getRanklist(true, null)
          }
        }
      }
    },
    components: {
      userheader,
      betterscroll
    }
  }
</script>

<style scoped>
  .cachet {
    padding: 5px 4%;
    background: #6B41E1;
  }

  .wrapper {
    width: 100%;
    position: absolute;
    top: 65px;
    bottom: 55px;
    overflow: hidden;
    background: #6B41E1;
  }

  .cachet-item {
    background: #5027C3;
    color: #9F85E9;
  }

  .active-cachet-item {
    background: #fff;
    color: #6B41E1;
  }

  .ranking-item {
    width: 82%;
    padding: 0 4%;
    background: #fff;
    height: 65px;
    margin: 0 auto;
    position: relative;
    color: #333333;
    font-size: 14px;
    overflow: hidden;
    /*border-bottom: 1px solid #E3DEFF;*/
  }

  .ranking-item:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 90%;
    transform: translate(-50%, 0);
    height: 1px;
    background: #E3DEFF;
  }

  .ranking-item:nth-child(2) {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .ranking-item:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .ranking-number {
    color: #9A80E4;
    font-weight: 600;
    margin-right: 15px;
    font-size: 15px;
  }

  .ranking-avatar {
    width: 45px;
    height: 45px;
    border-radius: 100px;
    margin-right: 15px;
  }

  .ranking-name {
    width: 20%;
  }

  .ranking-score {
    width: 30%;
  }

  .ranking-score span {
    color: #FF6000;
  }

  .ranking-credit {
    width: 0;
    flex-grow: 1;
    color: #6B41E1;
  }

  .top-three-cachet {
    margin-top: 5px;
  }

  .ranking-credit img, .top-three-cachet img {
    width: 15px;
    height: 15px;
    margin: 0 5px 2px 0;
  }

  .ranking-top {
    min-height: 15px;
    overflow: hidden;
  }

  .ranking-style {
    padding-top: 56%;
    position: relative;
  }

  .ranking-top-warp {
    position: absolute;
    top: 0;
    bottom: 15px;
    left: 0;
    right: 0;
    align-content: flex-end;
    align-items: flex-end;
  }

  .top-three {
    width: 27%;
    height: 80%;
    margin: 0 2%;
    position: relative;
  }

  .top-three:nth-child(1) {
    background: url("https://cdn.xingkwh.com/%E7%AC%AC%E4%BA%8C@3x.png") no-repeat;
    background-size: 100% 100%;
  }

  .top-three:nth-child(2) {
    background: url("https://cdn.xingkwh.com/%E7%AC%AC%E4%B8%80@3x.png") no-repeat;
    margin-bottom: 6%;
    background-size: 100% 100%;
  }

  .top-three:nth-child(3) {
    background: url("https://cdn.xingkwh.com/%E7%AC%AC%E4%B8%89@3x.png") no-repeat;
    background-size: 100% 100%;
  }

  .top-three-avatar {
    position: absolute;
    z-index: -1;
    border-radius: 1000px;
    width: 92%;
    height: auto;
    top: 2%;
  }

  .cachet-info {
    color: #fff;
    position: absolute;
    top: 64%;
  }

  .top-three-money {
    font-weight: 600;
  }
</style>
