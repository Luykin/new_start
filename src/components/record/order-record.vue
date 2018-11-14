<template>
  <transition name="list">
    <div class="body">
      <back></back>
      <div class="record-header flex">
        <div class="flex rh-item" :class="{'ative-record':  ativerecord === 1}" @click="_choseitem(1)">
          <span class="flex">进行中</span>
        </div>
        <div class="flex rh-item" :class="{'ative-record':  ativerecord === 2}" @click="_choseitem(2)">
          <span class="flex">已完成</span>
        </div>
      </div>
      <div style="margin-top: 60px"></div>
      <betterscroll class="wrapper" :data="list" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper'>
        <div class="scroll">
          <div v-for="item in list" class="better-item flex">
            <div class="flex fw bi-center">
              <span class="flex js ll">{{item.lable}}</span>
              <span class="flex js ssss bi-name">{{item.addition.slice(0, 18)}}</span>
            </div>
            <div class="flex fw" style="justify-content: flex-end;">
              <span class="flex s bi-name flex-end">{{item.updateA}}</span>
              <span class="flex s bi-name flex-end" style="color: #fff; background: #BBB; padding: 6px 10px 5px; border-radius: 100px; flex-grow: 0; width: auto;">{{item.status === 2 ? '已完成' : '进行中'}}</span>
            </div>
          </div>
          <div v-show="!list.length" class="flex sss mg30" style="color: #727589;">
            暂时没有找到相关数据哦~
          </div>
        </div>
      </betterscroll>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import { orders } from 'api/index'
  import { timeformat } from 'common/js/util'
  import back from 'base/back/back'
  import betterscroll from 'base/better-scroll/better-scroll'
  export default {
    data() {
      return {
        ativerecord: 1,
        page: 0,
        num: 10,
        totle: 0,
        list:[]
      }
    },
    created() {
      try{
        if (this.$route.query.ativerecord) {
          this.ativerecord = parseInt(this.$route.query.ativerecord)
        }
      }catch(err){
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
      _choseitem(num){
        if (this.ativerecord === parseInt(num)) {
          return false
        }
        this.ativerecord = parseInt(num)
        this._pulldown()
      },
      _formatdata(list) {
        if(list.length) {
          list.forEach((item) => {
            item.updateA = timeformat(item.create || new Date().valueOf())
          })
          return list
        } else {
          return []
        }
      },
      async _orders(status) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await orders(this.$root.user.user_id, this.num, this.page, status)
        this.$root.eventHub.$emit('loading', null)
        if(ret.status === 200 && ret.data.code === 200) {
          if (ret.data.data.count) {
            this.list = [...this.list, ...this._formatdata(ret.data.data.tasks)]
            this.totle = ret.data.data.count
          }
        }
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        if (this.ativerecord === 1) {
          this._orders(1)
        } else {
          this._orders(2)
        }
      },
      _scrollToEnd(){
        if (this.list.length < this.totle) {
          // console.log('触底加载')
          this.page += 1
          if (this.ativerecord === 1) {
            this._orders(1)
          } else {
            this._orders(2)
          }
        }
      }
    },
    components: {
      betterscroll,
      back
    },
  }
</script>
<style scoped>
  .body{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99998;
    background: #f5f5f5;
    overflow-y: scroll;
  }
  .record-header{
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99999;
    background: #524E4B;
  }
  .rh-item{
    height: 100%;
    flex-grow: 1;
    color: #A8A6A4;
  }
  .rh-item span{
    box-sizing: border-box;
    width: 25%;
    height: 100%;
    white-space: nowrap;
  }
  .ative-record{
    color: #DBB868;
    border-bottom: 2px solid #DBB868;
  }
  .wrapper {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
  }
  .scroll{
    width: 100%;
    height: auto;
  }
  .better-item{
    width: 100%;
    height: 70px;
    background: #fff;
    border-bottom: 1px solid #F2F2F2;
  }
  .bi-img{
    margin: 0 4%;
  }
  .bi-center{
    color: #333;
    flex-grow: 1;
    justify-content: flex-start;
    text-indent: 20px;
  }
  .bi-name{
    color: #727589;
    margin-top: 5px;
  }
  .flex-end{
    justify-content: flex-end;
    margin-right: 10%;
  }
</style>
