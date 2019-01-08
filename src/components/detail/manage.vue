<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper' :data="list">
        <div class="min-warp-height">
          <div class="task-info flex fw" v-for="item in list" @click="_toManageDetail(item)">
            <div class="manage-item-header flex ell">
              <span class="status">{{item.status === 1 ? '[发布中]' : item.status === 2 ? '[已取消]' : '[已完成]'}}</span>
              <span class="title">{{item.title.slice(0,12)}}</span>
              <div class="min-title">{{item.min_title}}</div>
              <div class="min-title top-title" v-show="item.is_top">已置顶</div>
            </div>
            <div class="mih-body flex fw">
              <span class="mih-red">{{item.single_price}}元</span>
              <span class="mih-name flex">任务赏金</span>
            </div>
            <div class="mih-body flex fw">
              {{item.num}}/<span class="mih-red">{{item.use_num}}</span>
              <span class="mih-name flex">任务数量</span>
            </div>
            <div class="mih-body flex fw">
              {{item.browse_num}}
              <span class="mih-name flex">浏览次数</span>
            </div>
            <div class="mih-bottom flex">
              <div class="mih-bottom-btn flex line-red-color" @click.stop="_topShow(item)">
                <img src="../../assets/img/minicon4.png"/>
                置顶推荐
              </div>
              <div class="mih-bottom-btn flex line-back" @click.stop="_toAuditList(item)">
                <img src="../../assets/img/minicon3.png"/>
                审核任务
                <div class="flex red-icon-read" v-show="item.task_audit_num">{{item.task_audit_num}}</div>
              </div>
              <div class="line-back flex mih-min-btn">
                <span class="right-aw"> > </span>
              </div>
            </div>
          </div>
          <empyt v-show="!list.length" :padding="90"></empyt>
        </div>
      </betterscroll>
      <stick ref="stick"></stick>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import empyt from 'base/empyt/empyt'
  import back from 'base/back/back'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {release_management} from 'api/index'
  import stick from 'components/stick/stick'

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
    mounted() {
      this._init()
      this.$root.eventHub.$on('updateManage', () => {
        this._pulldown()
      })
    },
    methods: {
      _topShow(item) {
        this.$refs.stick._show(item)
      },
      _init() {
        this.$refs.wrapper._initScroll()
        this._getManageList()
      },
      _toAuditList(info) {
        console.log('审核任务')
        this.$router.push({
          name: 'audit-list',
          params: Object.assign(info, {
            types: 1,
          })
        })
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
      _toManageDetail(info) {
        this.$router.push({
          name: 'manage-detail',
          params: info
        })
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        this._getManageList()
      },
      _scrollToEnd() {
        if (this.list.length < this.total) {
          this.page += 1
          this._getManageList()
        }
      }
    },
    components: {
      empyt,
      back,
      stick,
      betterscroll
    }
  }
</script>

<style scoped>
  .task-info {
    padding: 0;
    overflow: hidden;
  }

  .wrapper {
    width: 100%;
    position: absolute;
    top: 40px;
    bottom: 0;
    overflow: hidden;
  }

  .manage-item-header {
    background: #E8E4FF;
    color: #444;
    height: 40px;
    justify-content: flex-start;
  }

  .manage-item-header .status {
    color: #6B41E1;
    margin: 0 10px;
    font-weight: 600;
  }

  .manage-item-header .title {
    font-weight: 600;
    max-width: 35%;
    overflow: hidden;
  }

  .manage-item-header .min-title {
    padding: 5px;
    background: #C8BEFF;
    color: #572DCB;
    border-radius: 5px;
    font-size: 10px;
    transform: scale(.85, .85);
    margin: 0 3px 0 10px;
  }

  .manage-item-header .top-title {
    background: #ff3939;
    color: #fff;
    margin: 0;
  }

  .mih-body {
    width: 29%;
    height: 80px;
    margin: 10px 2%;
    background: #F8F8F8;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
  }

  .mih-name {
    color: #555555;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 400;
  }

  .mih-red {
    color: #FF3939;
  }

  .mih-bottom {
    width: 93%;
    height: 50px;
    margin-top: -5px;
    justify-content: flex-start;
    position: relative;
  }

  .mih-bottom-btn {
    width: 28%;
    height: 30px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    color: #fff;
    font-weight: 600;
    font-size: 13px;
    margin-right: 5%;
    position: relative;
  }

  .mih-bottom-btn img {
    width: 13px;
    height: auto;
    margin-right: 5px;
  }

  .red-icon-read {
    position: absolute;
    right: 0;
    top: 0;
    /*min-width: 23px;*/
    width: 23px;
    height: 23px;
    border-radius: 100px;
    background: red;
    color: #fff;
    transform: translate(30%, -30%) scale(.8, .8);
  }

  .line-red-color {
    background: #FFA96B;
    background: linear-gradient(-45deg, #FF3939, #FFA96B);
    background: -webkit-gradient(linear, right bottom, left top, from(#FF3939), to(#FFA96B));
  }

  .mih-min-btn {
    width: 26px;
    height: 26px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 100%;
    box-shadow: 0 0 10px #F0D9F9;
    color: #fff;
    font-weight: 600;
  }

  .right-aw {
    transform: scale(1, 1.6);
  }

</style>
