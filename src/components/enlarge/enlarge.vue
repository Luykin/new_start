<template>
  <div>
    <img :src="realUrl" class="enlarge-img" :class="{'show': image}" @click="_close"/>
    <interlayer ref="interlayer" @close="_close"></interlayer>
  </div>
</template>

<script>
  import interlayer from 'base/interlayer/interlayer'

  export default {
    data() {
      return{
        realUrl: null,
        timer: null
      }
    },
    props: {
      image: {
        default: null
      }
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
          try {
            // this.image = null
            this.realUrl = this.image
            clearTimeout(this.timer)
            this.timer = null
            this.$refs.interlayer._showLayer()
          } catch (e) {
            console.log(e)
          }
        } else {
          try {
            this.timer = setTimeout(() => {
              this.realUrl = null
              clearTimeout(this.timer)
              this.timer = null
            },400)
            this.$refs.interlayer._hiddenLayer()
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .enlarge-img {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0, 0);
    width: 85%;
    height: auto;
    transition: all .4s;
    transform-origin: center center;
    z-index: 9999999;
    border-radius: 10px;
  }

  .show {
    transform: translate(-50%, -50%) scale(1, 1);
    transition: all .4s;
  }
</style>
