<template>
  <transition name="list">
    <div class="body">
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </transition>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
      }
    },
    mounted() {

    },
    methods: {
    }
  }

</script>
<style scoped>
.body{
  position: fixed;
  z-index: 99999999998;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  opacity: .6;
  user-select: none;
}
.loading{
  width: 100px;
  height: 20px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loading span{
  display: inline-block;
  width: 5px;
  height: 100%;
  border-radius: 2px;
  margin: 0 3px;
  background: #253250;
  -webkit-animation: load 1s ease infinite;
}
@keyframes load{
  0%,100%{
    transform: scale3d(1,1,1);
    background: #253250;
  }
  50%{
    transform: scale3d(1,2.5,1);
    background: #fff;
  }
}
.loading span:nth-child(2){
  animation-delay:0.2s;
}
.loading span:nth-child(3){
  animation-delay:0.4s;
}
.loading span:nth-child(4){
  animation-delay:0.6s;
}
.loading span:nth-child(5){
  animation-delay:0.8s;
}
</style>
