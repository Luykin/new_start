<template>
  <div class="body">
    <betterscroll class="wrapper" ref='wrapper' :data="content" @scrollToEnd="$refs.wrapper.refresh()">
      <div v-html="content" class="content-body"></div>
    </betterscroll>
    <back></back>
  </div>
</template>

<script>
  import {secret_details} from 'api/index'
  import back from 'base/back/back'
  import betterscroll from 'base/better-scroll/better-scroll'

  export default {
    name: 'secret',
    data() {
      return {
        content: ''
      }
    },
    created() {
      // console.log(this.$route.params.id)
      this._secretDetails(this.$route.params.id)
    },
    mounted() {
      this._inint()
    },
    methods: {
      _inint() {
        this.$refs.wrapper._initScroll()
      },
      async _secretDetails(id) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await secret_details(id, this.$root.user.user_id)
        this.$root.eventHub.$emit('loading', null)
        if (ret.data.code === 200) {
          this.content = ret.data.data.content
        } else {
          this.$root.eventHub.$emit('titps', '无法查看')
          this.$router.back(-1)
        }
      },
    },
    components: {
      back,
      betterscroll
    }
  }
</script>

<style scoped>
  .body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    /*background: #fff;*/
    background: linear-gradient(45deg, #253250, #34283A);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#34283A));
    overflow-y: scroll;
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .content-body {
    width: 92%;
    height: auto;
    padding: 4%;
    line-height: 32px;
    color: #fff;
  }
</style>
