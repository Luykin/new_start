<template>
    <div class="customer-inlet flex fw" @click="_to_kefu">
      <!--<img src="https://cdn.xingkwh.com/kefu_xk.png"/>-->
      <!--<span class="flex customer-inlet-text">在线客服</span>-->
    </div>
</template>

<script>
  export default {
    name: 'customer',
    methods: {
      _to_kefu() {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人。')
          return false
        }
        this.$router.push({
          path: '/custom'
        })
      }
    }
  }
</script>

<style scoped>
  .customer-inlet{
    width: 60px;
    height: 60px;
    /*background: #7045F2;*/
    /*background: linear-gradient(right, #7045F2, #9672F8);*/
    /*background: -webkit-gradient(linear, right top, left top, from(#7045F2), to(#9672F8));*/
    background: url("https://cdn.xingkwh.com/%E5%AE%A2%E6%9C%8Dimg@3x.png") no-repeat;
    background-size: cover;
    color: #fff;
    border-radius: 100%;
    position: fixed;
    bottom: 11%;
    right: 5%;
    z-index: 999;
    opacity: .9;
    overflow: hidden;
  }
  .customer-inlet img {
    width: 55%;
    height: auto;
  }
  .customer-inlet-text{
    transform: scale(.8,.8);
    font-size: 10px;
    margin-top: 3px;
  }
</style>
