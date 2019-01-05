<template>
  <!--<div class="btn-back flex" @click="_back" v-show="show"></div>-->
  <div class="flex back-warp js">
    <div class="flex back-btn js" @click="_back">
      <img src="../../assets/img/back.png"/>
      返回
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      path: {
        type: [String, Boolean],
        default: null
      },
      parse: {
        type: [String, Boolean],
        default: null
      },
    },
    data() {
      return{
        show: true
      }
    },
    methods: {
      _back() {
        if (this.path) {
          this.$router.replace({
            path: this.path
          })
          return false
        }
        if (this.parse) {
          this.$router.replace({
            name: this.parse.name,
            params: this.parse.params,
          })
          return false
        }
        this.$router.back(-1)
      },
      _show() {
        this.show = true
      },
      _hiden(){
        this.show = null
      }
    }
  }
</script>
<style scoped>
  .back-warp{
    width: 100%;
    height: 40px;
    /*background: #000;*/
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
  .back-btn{
    width: 25%;
    height: 100%;
  }
  .back-btn img{
    width: 20px;
    height: auto;
    margin: 0 5px 0 10px;
  }
  /*.btn-back{*/
    /*width: 86px;*/
    /*height: 38px;*/
    /*color: #fff;*/
    /*border-radius: 30px;*/
    /*position: fixed;*/
    /*bottom: 6%;*/
    /*right: 6%;*/
    /*z-index: 999990;*/
    /*opacity: .8;*/
  /*}*/
</style>
