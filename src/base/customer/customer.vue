<template>
    <div class="customer-inlet flex fw" @click="_to_kefu">
      <img src="https://cdn.xingkwh.com/kefu_xk.png"/>
      <span class="flex customer-inlet-text">在线客服</span>
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
    background: #ff3535;
    background: linear-gradient(right, #FF561E, #FF2966);
    background: -webkit-gradient(linear, right top, left top, from(#FF561E), to(#FF2966));
    color: #fff;
    border-radius: 100%;
    position: fixed;
    bottom: 11%;
    right: 3%;
    z-index: 999;
    opacity: .8;
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
