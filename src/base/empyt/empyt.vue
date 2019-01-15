<template>
    <div class="flex empyt fw" :style="`padding-bottom: ${padding}%`">
      <img src="../../assets/img/empty.png"/>
      <div class="flex ssss">空荡荡的～什么也没有！<span class="flush-btn flex" v-if="flush" @click="$emit('flush')">刷新试一试</span></div>
    </div>
</template>

<script>
  export default {
    props: {
      padding: {
        type: [Number],
        default: 55
      },
      flush: {
        type: [Boolean],
        detail: false
      }
    },
    name: 'empyt'
  }
</script>

<style scoped>
  .empyt{
    width: 92%;
    color: #CCCCCC;
    background: #fff;
    margin: 10px auto;
    border-radius: 8px;
    /*padding-bottom: 55%;*/
    box-shadow: 0 0 10px rgba(0,0,0,.1);
  }
  .empyt img{
    width: 140px;
    height: auto;
    margin: 30px auto;
  }

  .flush-btn{
    width: auto;
    height: 40px;
    padding: 0 10px;
    color: #ff6000;
    font-weight: 600;
  }
</style>
