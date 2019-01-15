<template>
  <div class="lamp flex js">
    <img src="../../assets/img/lamp.png" class="lamp-img"/>
    <div class="move-warp">
      <div class="move" :class="{'move-start' : list.length}">
        <div class="move-item ell" v-for="item in list" v-if="list.length">
          <span class="orange">{{item.nickname}}</span>
          <span>完成悬赏提现</span>
          <span class="orange">{{item.money}}元</span>
        </div>
        <div class="move-item ell" v-show="!list.length" @click="_getList(true)">网络错误,点击我重新加载</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {with_draw} from 'api/index'
  export default {
    name: 'lamp',
    data() {
      return {
        list: [],
        pullLoading: null
      }
    },
    created() {
      this._getList()
    },
    methods: {
      async _getList(must) {
        if (this.pullLoading) {
          return false
        }
        if (must) {
          this.$root.eventHub.$emit('loading', true)
        }
        this.pullLoading = true
        const ret = await with_draw()
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200) {
          this.list = ret.data.data
        }
        let timer = setTimeout(() => {
          this.pullLoading = null
          clearTimeout(timer)
          timer = null
        }, 2000)
      }
    },
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
    /*animation: message 30s linear infinite;*/
  }

  .move-start{
    animation: message 35s linear infinite;
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
