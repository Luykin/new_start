<template>
  <transition name="list">
    <div class="body">
      <back></back>
      <div class="record-header flex">
        <div class="flex rh-item" :class="{'ative-record':  ativerecord === 1}" @click="_choseitem(1)">
          <span class="flex">已成为合伙人</span>
        </div>
        <div class="flex rh-item" :class="{'ative-record':  ativerecord === 2}" @click="_choseitem(2)">
          <span class="flex">未成为合伙人</span>
        </div>
      </div>
      <div style="margin-top: 60px"></div>
      <betterscroll class="wrapper" :data="list" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper'>
        <div class="scroll">
          <div v-for="item in list" class="better-item flex">
            <div class="flex bi-center ell">
              <img :src="item.avatar"/>
              <span class="flex js llll">{{item.nickname}}</span>
              <span class="flex js llll" style="color: #727589">{{item.updateA}}</span>
              <span class="flex js llll">{{ativerecord === 1 ? '已支付' : '未支付'}}</span>
            </div>
          </div>
          <div v-show="!list.length" class="flex sss mg30">
            <empyt></empyt>
          </div>
        </div>
      </betterscroll>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import {get_next_info} from 'api/index'
  import {timeformat} from 'common/js/util'
  import back from 'base/back/back'
  import empyt from 'base/empyt/empyt'
  import betterscroll from 'base/better-scroll/better-scroll'

  export default {
    data() {
      return {
        ativerecord: 1,
        page: 0,
        num: 10,
        totle: 0,
        list: []
      }
    },
    created() {
      try {
        if (this.$route.query.ativerecord) {
          this.ativerecord = parseInt(this.$route.query.ativerecord)
        }
      } catch (err) {
        console.log(err)
      }
    },
    mounted() {
      this._inint()
      this._pulldown()
      this.$root.eventHub.$on('update', () => {
        this._pulldown()
      })
    },
    computed: {
      // ...mapGetters([
      // 	'user'
      // 	])
    },
    methods: {
      _inint() {
        this.$refs.wrapper._initScroll()
      },
      _choseitem(num) {
        if (this.ativerecord === parseInt(num)) {
          return false
        }
        this.ativerecord = parseInt(num)
        this._pulldown()
      },
      _formatdata(list) {
        if (list.length) {
          list.forEach((item) => {
            item.updateA = timeformat(item.create || new Date().valueOf())
          })
          return list
        } else {
          return []
        }
      },
      async _orders(is_agent) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await get_next_info(this.$root.user.user_id, is_agent, this.num, this.page)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (ret.data.data.count) {
            this.list = [...this.list, ...this._formatdata(ret.data.data.ret)]
            this.totle = ret.data.data.count
          }
        }
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        if (this.ativerecord === 1) {
          this._orders('True')
        } else {
          this._orders('False')
        }
      },
      _scrollToEnd() {
        if (this.list.length < this.totle) {
          // console.log('触底加载')
          this.page += 1
          if (this.ativerecord === 1) {
            this._orders('True')
          } else {
            this._orders('False')
          }
        }
      }
    },
    components: {
      betterscroll,
      back,
      empyt
    },
  }
</script>
<style scoped>
  .body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99998;
    background: #31293D;
    background: linear-gradient(45deg, #253250, #34283A);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#34283A));
    overflow-y: scroll;
  }

  .record-header {
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99999;
    background: #253250;
    background: linear-gradient(45deg, #253250, #2A2E48);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#2A2E48));
  }

  .rh-item {
    width: 40%;
    height: 70%;
    color: #BFBDE3;
    border: 1px solid #393A59;
  }

  .rh-item:nth-child(1) {
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
  }

  .rh-item:nth-child(2) {
    border-top-right-radius: 1000px;
    border-bottom-right-radius: 1000px;
  }

  .rh-item span {
    box-sizing: border-box;
    width: 25%;
    height: 100%;
    white-space: nowrap;
  }

  .ative-record {
    background: #3C3B5C;
    color: #fff;
    border: none;
  }

  .wrapper {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
  }

  .scroll {
    width: 100%;
    height: auto;
  }

  .better-item {
    width: 100%;
    height: 70px;
    /*background: #fff;*/
    border-bottom: 1px solid #3C3B5C;
  }

  .bi-img {
    margin: 0 4%;
  }

  .bi-center {
    color: #fff;
    flex-grow: 1;
    justify-content: flex-start;
    text-indent: 20px;
  }

  .bi-name {
    color: #727589;
    margin-top: 5px;
  }

  .flex-end {
    justify-content: flex-end;
    margin-right: 10%;
  }

  .bi-center img{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: 0 10px;
  }
</style>
