<template>
  <div class="user-header-warp flex">
    <img :src="$root.user.avatar" class="header-avater"/>
    <div class="user-name flex fw">
      <span class="ell name">{{$root.user.nickname}}</span>
      <span class="flex js ell" v-if="showType === 1">账户余额: {{$root.user.score}}</span>
      <span class="flex js ell" v-else>收益余额: {{$root.user.price}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showType: {
        type: [Number],
        default: 1
      }
      // protocol: {
      //   type: [Boolean],
      //   default: false
      // }
    }
  }
</script>

<style scoped>
  .user-header-warp {
    width: 100%;
    height: 100%;
    max-height: 100px;
    overflow: hidden;
    color: #fff;
    font-size: 13px;
  }

  .header-avater {
    width: 63px;
    height: 63px;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: 1000px;
    margin: 0 15px;
  }

  .name {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .user-name {
    width: 100%;
    height: 100%;
    flex-shrink: 1;
    flex-grow: 1;
  }

  .border-scored {
    border-right: 1px solid #D1A8FF;
    height: 20px;
  }

  .num-title {
    color: #D1A8FF;
  }
</style>
