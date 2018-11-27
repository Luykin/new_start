<template>
    <div class="secret">
      <betterscroll class="wrapper" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper'>
        <div v-for="item in list" v-if="list.length" class="secret-item flex">
          <img :src="item.image"/>
          <!--{{item.image}}-->
        </div>
      </betterscroll>
    </div>
</template>

<script>
  import { secret_list, secret_details } from 'api/index'
  import betterscroll from 'base/better-scroll/better-scroll'

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
    methods: {
      async _secret_list(){
        this.$root.eventHub.$emit('loading', true)
        const ret = await secret_list(this.num, this.page)
        this.$root.eventHub.$emit('loading', null)
        this.total = ret.data.data.count
        this.list = [...this.list, ...ret.data.data.ret]
        console.log(this.list)
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
    bottom: 55px;
  }
  .secret-item{
    width: 88%;
    padding: 10px 2%;
    height: 100px;
    border-radius: 10px;
    margin: 10px auto;
    color: #fff;
    background: #505273;
    overflow: hidden;
  }
  /*.secret-item img{*/
    /**/
  /*}*/
</style>
