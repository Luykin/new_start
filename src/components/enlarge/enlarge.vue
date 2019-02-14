<template>
  <div>
    <div class="img-all-warp flex js" v-show="image" @click="_close" ref="imgwarp">
      <img :src="image">
      <img :src="image1">
      <div class="right-width"></div>
    </div>
    <interlayer ref="interlayer" @close="_close"></interlayer>
  </div>
</template>

<script>
  import interlayer from 'base/interlayer/interlayer'

  export default {
    data() {
      return {
        // realUrl: null,
        timer: null
      }
    },
    props: {
      scrollX: {
        default: 0
      },
      image: {
        default: null
      },
      image1: {
        default: null
      },
    },
    methods: {
      _close() {
        this.$emit('close')
      },
    },
    components: {
      interlayer
    },
    watch: {
      image(newValue, oldValue) {
        if (newValue) {
          this.$refs.interlayer._showLayer()
          this.$nextTick(() => {
            this.$refs.imgwarp.scrollTo(this.scrollX,0)
          })
        } else {
          this.$refs.interlayer._hiddenLayer()
        }
      }
    }
  }
</script>

<style scoped>
  /*.enlarge-img {*/
  /*position: fixed;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*transform: translate(-50%, -50%) scale(0, 0);*/
  /*width: 85%;*/
  /*height: auto;*/
  /*transition: all .4s;*/
  /*transform-origin: center center;*/
  /*z-index: 9999999;*/
  /*border-radius: 10px;*/
  /*}*/
  .img-all-warp {
    position: fixed;
    left: 0;
    right: 0;
    height: 72%;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 99999999;
    overflow-x: scroll;
  }
  .img-all-warp img{
    height: 100%;
    width: auto;
    transform: translate(-50%, 0);
    margin-left: 15px;
  }
  .img-all-warp img:nth-child(1){
    margin-left: 50%;
  }
  /*.show {*/
  /*transform: translate(-50%, -50%) scale(1, 1);*/
  /*transition: all .4s;*/
  /*}*/
  .right-width{
    padding: 10px .01%;
    margin-left: -30%;
  }
</style>
