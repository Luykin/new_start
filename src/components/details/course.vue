<template>
  <div>
    <betterscroll class="course-body" ref="wrapper">
      <img :src="url" @load="_inint"/>
    </betterscroll>
    <back></back>
  </div>
</template>

<script>
  import back from 'base/back/back'
  import betterscroll from 'base/better-scroll/better-scroll'

  export default {
    name: 'course',
    data() {
      return {
        url: 'http://p70pqu6ys.bkt.clouddn.com/30001_dy_url.png'
      }
    },
    created() {
      try {
        if (this.$route.query.url) {
          if (this.$route.query.url) {
            this.url = this.$route.query.url
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    mounted() {
    },
    methods: {
      _inint() {
        this.$refs.wrapper._initScroll()
      },
    },
    components: {
      back,
      betterscroll
    }
  }
</script>

<style scoped>
  .course-body {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    z-index: 99999;
    background: #f1f1f1;
  }
  .course-body img{
    width: 100%;
    height: auto;
    pointer-events: none;
    user-select: none;
  }
</style>
