<template>
  <div class="lamp flex js">
    <img src="../../assets/img/lamp.png" class="lamp-img"/>
    <div class="move-warp">
      <div class="move">
        <div class="move-item ell" v-for="i in 10">
          <span class="orange">从前有座三{{i}}</span>
          <span>完成悬赏提现</span>
          <span class="orange">30元</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'lamp'
  }
</script>

<style scoped>
  .lamp {
    position: fixed;
    z-index: 99;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    background: #8460E8;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 92%;
    height: 32px;
    box-shadow: 0 0 6px rgba(135, 98, 237, 0.62);
  }

  .lamp-img {
    width: 24px;
    height: auto;
    margin: 0 15px;
  }

  .move-warp {
    display: inline-block;
    white-space: nowrap;
    padding: 0 10px;
    height: 100%;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
  }

  .move {
    width: 100%;
    height: auto;
    animation: message 30s linear infinite;
  }

  .move-item{
    height: 32px;
    color: #fff;
    font-size: 13px;
    line-height: 32px;
  }

  .orange{
    color: #FFAB00;
  }

  @keyframes message {
    0%,
    8.5%,
    100% {
      transform: translate3d(0, 0, 0);
    }

    10%,
    18.5% {
      transform: translate3d(0, -10%, 0);
    }

    20%,
    28.5% {
      transform: translate3d(0, -20%, 0);
    }

    30%,
    38.5% {
      transform: translate3d(0, -30%, 0);
    }

    40%,
    48.5% {
      transform: translate3d(0, -40%, 0);
    }

    50%,
    58.5% {
      transform: translate3d(0, -50%, 0);
    }

    60%,
    68.5% {
      transform: translate3d(0, -60%, 0);
    }

    70%,
    78.5% {
      transform: translate3d(0, -70%, 0);
    }

    80%,
    88.5% {
      transform: translate3d(0, -80%, 0);
    }

    90%,
    99.9999% {
      transform: translate3d(0, -90%, 0);
    }
  }
</style>
