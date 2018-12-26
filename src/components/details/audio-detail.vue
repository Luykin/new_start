<template>
  <transition name="list">
    <div class="body">
      <div class="header">
        <img :src="detail.banner" v-if="detail.banner"/>
      </div>
      <div class="course-list flex fw">
        <div class="flex title js">课程名称</div>
        <div class="flex min-title js">课程名称</div>
        <div class="flex catalog js">
          <span class="flex js">课程目录</span>
          <span style="white-space: nowrap;">共{{detail.ret.length}}节</span>
        </div>
        <div v-for="(item,index) in detail.ret" :key="id" class="flex audio-item" @click="currentIndex = index" :class="{'active-audio': currentIndex === index}">
          {{item.title}}
        </div>
      </div>
      <back></back>
      <player :playList="detail.ret" :currentIndex="currentIndex" @normalIndex="currentIndex = -1"></player>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'
  import {course_detail} from 'api/index'
  import player from 'components/player/player'

  export default {
    data() {
      return {
        detail: {
          ret: [],
        },
        currentIndex:-1,
      }
    },
    name: 'audio-detail',
    created() {
      this._getCourseDetail(this.$route.params.id)
    },
    methods: {
      async _getCourseDetail(id) {
        this.$root.eventHub.$emit('loading', true)
        const ret = await course_detail(id, this.$root.user.user_id)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          this.detail = ret.data.data
        }
        if (ret.data.code === 433) {
          this.$root.eventHub.$emit('titps', '您还未购买该课程~')
          this.$root.eventHub.$emit('courseBuy', this.detail)
          this.$router.back(-1)
        }
      }
    },
    components: {
      back,
      player
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
    background: #31293D;
    background: linear-gradient(45deg, #253250, #34283A);
    background: -webkit-gradient(linear, right top, left bottom, from(#253250), to(#34283A));
    overflow-y: scroll;
  }

  .header {
    width: 96%;
    height: 170px;
    border-radius: 10px;
    margin: 10px auto;
    background: #414161;
    background-size: 100% 100%;
    overflow: hidden;
  }

  .header img{
    width: 100%;
    height: 100%;
  }

  .course-list {
    width: 96%;
    background: #414161;
    border-radius: 10px;
    min-height: 200px;
    margin: 0 auto;
    align-items: flex-start;
    align-content: flex-start;
  }

  .course-list .title {
    width: 90%;
    min-height: 40px;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    margin-top: 8px;
  }
  .course-list .min-title{
    width: 90%;
    min-height: 20px;
    font-size: 14px;
    color: #B5B5DD;
    padding-bottom: 10px;
    border-bottom: 1px dashed #626296;
  }
  .course-list .catalog{
    height: 40px;
    width: 90%;
    color: #D2D2E7;
    font-size: 14px;
  }
  .audio-item{
    width: 90%;
    height: 45px;
    color: #B5B5DD;
    font-size: 14px;
    font-weight: 600;
    justify-content: flex-start;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #313349;
    position: relative;
  }
  /*https://cdn.xingkwh.com/%E8%AF%BE%E7%A8%8B%E6%92%AD%E6%94%BE%E6%8C%89%E9%92%AE@3x.png*/
  .audio-item:after{
    width: 26px;
    height: 26px;
    content: '';
    display: block;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    background: url("https://cdn.xingkwh.com/%E8%AF%BE%E7%A8%8B%E6%92%AD%E6%94%BE%E6%8C%89%E9%92%AE@3x.png") no-repeat;
    background-size: cover;
  }
  .active-audio{
    color: #635F8D;
  }
</style>
