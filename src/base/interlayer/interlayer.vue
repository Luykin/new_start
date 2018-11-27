<template>
  <div class="layer" :class="{layerIn:layerIn, layerOut:layerOut}" @click.stop.capture="_close(e)" ref='layer'>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      layerIn: false,
      layerOut: false
    }
  },
  methods: {
    _showLayer() {
      this.layerIn = true
      this.layerOut = false
    },
    _hiddenLayer() {
      this.layerIn = false
      this.layerOut = true
    },
    _setZIndex(z) {
      this.$refs.layer.style.zIndex = z
    },
    _close(e) {
      if (e) {
        e.stopPropagation()
      }
      this.$emit('close')
    }
  }
}

</script>
<style type="text/css" scoped>
.layer {
  position: fixed;
  z-index: 991500;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  opacity: .65;
  display: none;
}

.layerIn {
  display: block;
}

.layerOut {
  display: none;
}

</style>
