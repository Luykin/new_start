<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="cachet flex js">
        <div class="cachet-item flex" v-for="item in btn_list" :class="{'active-cachet-item': item.id === activeId}"
             @click="_change(item.id)">{{item.name}}
        </div>
      </div>
      <!--<img src="../../assets/img/creditadd.png"/>-->
      <!--<img src="../../assets/img/creditreduce.png"/>-->
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div v-for="item in list" class="ranking-item flex js ell">
          <img src="../../assets/img/creditadd.png" class="ranking-image" v-if="activeId === 1"/>
          <img src="../../assets/img/creditreduce.png" class="ranking-image" v-else/>
          <div class="flex fw ranking-info">
            <div class="ri-title ell">{{item.title}}</div>
            <div class="flex js ri-create">{{item.time}}</div>
          </div>
          <div class="credit-num flex" :class="{'reduce': activeId === 2}">{{item.credit_num > 0 ? '+' + item.credit_num : item.credit_num}}</div>
        </div>
        <empyt v-if="!list.length"></empyt>
      </betterscroll>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {creditList} from 'api/index'
  import empyt from 'base/empyt/empyt'
  import {timeformat} from 'common/js/util'

  export default {
    name: 'reputation-list',
    data() {
      return {
        activeId: -1,
        btn_list: [{
          id: 1,
          name: '已加信誉'
        }, {
          id: 2,
          name: '已扣信誉'
        }],
        list: [],
        total: 0,
        page: 0,
        num: 10
      }
    },
    created() {
      // console.log(this.$route.params.type)
      this.activeId = this.$route.params.type
      this._getList(this.activeId)
    },
    methods: {
      _change(id) {
        if (id === this.activeId) {
          return false
        }
        this.page = 0
        this._getList(id, true, () => {
          this.activeId = id
        })
      },
      async _getList(id = 1, must, callback) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await creditList(this.$root.user.username, id, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (must) {
            this.list = this._formatList(ret.data.data.ret)
          } else {
            this.list = [...this.list, ...this._formatList(ret.data.data.ret)]
          }
          this.total = ret.data.data.count
          if (callback) {
            callback()
          }
        }
      },
      _formatList(list) {
        if (!list || !list.length) {
          return []
        }
        list.forEach((item) => {
          // console.log(item.create)
          item.time = timeformat(item.create)
        })
        return list
      },
      _pulldown() {
        this.page = 0
        this._getList(this.activeId, true)
      },
      _scrollToEnd() {
        if (this.list.length < this.total) {
          this.page += 1
          this._getList(this.activeId)
        }
      },
    },
    components: {
      back,
      empyt,
      betterscroll
    },
  }
</script>

<style scoped>
  .detail-body {

  }

  .wrapper {
    width: 100%;
    position: absolute;
    top: 115px;
    bottom: 55px;
    overflow: hidden;
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

  .ranking-item:nth-child(1) {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .ranking-item:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .ranking-image {
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }

  .ri-title {
    width: 100%;
    font-size: 13px;
    margin-bottom: 5px;
  }

  .ri-create {
    color: #999999;
    font-size: 10px;
  }

  .credit-num {
    width: 0;
    flex-grow: 1;
    font-weight: 600;
    color: #1BA02B;
    justify-content: flex-end;
    padding-right: 5px;
  }

  .reduce {
    color: #FF3939;
  }

  .ranking-info{
    width: 70%;
  }
</style>
