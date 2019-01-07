<template>
  <div class="popup" :class="{popupIn:popupIn, popupOut:popupOut, protocol:protocol}" v-show="show" ref='pop' @click.stop="$emit('popupClick')">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    protocol: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {
      popupIn: false,
      popupOut: false,
      show: false
    }
  },
  methods: {
    _showPopup() {
      this.show = true
      this.popupIn = true
      this.popupOut = false
    },
    _hiddenPopup() {
      this.popupIn = false
      this.popupOut = true
      let time = setTimeout(() => {
        this.show = false
        clearTimeout(time)
      }, 500)
    }
  }
}

</script>
<style type="text/css" scoped>
.popup {
  position: absolute;
  left: 0;
  top: -100%;
  width: 100%;
  height: auto;
  transform: translate3d(0, -50%, 0);
  flex-wrap: wrap;
  z-index: 999999;
  opacity: 1;
}

.popupIn {
  animation: popupIn .8s ease-in 1 forwards;
}

.popupOut {
  animation: popupOut .8s ease-out 1 forwards;
}

@keyframes popupIn {
  0% {
    top: -100%;
  }
  100% {
    top: 47%;
  }
}

@keyframes popupOut {
  0% {
    top: 47%;
  }
  100% {
    top: -100%;
  }
}

</style>
