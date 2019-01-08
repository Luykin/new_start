<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <!--:background="`#f8f8f8`" :color="`#666`"-->
      <betterscroll class="wrapper" ref='wrapper'>
          <img :src="$route.params.tutorial_url" @load="$refs.wrapper.refresh()"/>
      </betterscroll>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import betterscroll from 'base/better-scroll/better-scroll'
  export default {
    name: 'course',
    created() {
      console.log(this.$route.params)
      if (!this.$route.params.tutorial_url) {
        this.$root.eventHub.$emit('titps', `暂无教程`)
        this.$router.back(-1)
        return false
      }
    },
    mounted() {
      this.$refs.wrapper._initScroll()
    },
    components: {
      back,
      betterscroll
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: absolute;
    top: 40px;
    bottom: 0;
    overflow: hidden;
    /*background: #f8f8f8;*/
  }
</style>
