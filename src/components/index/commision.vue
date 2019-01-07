<template>
  <transition name="list">
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="task-info flex fw js">
        <div class="task-color-title flex">
          <span class="flex js">我的团队</span>
          <div class="flex see-team-btn" @click="_toDetail">查看团队</div>
        </div>
        <div class="flex team-com-item fw">
          <span class="flex team-num">{{$root.user.today_new_people}}</span>
          <span class="flex team-title">今日新增人数</span>
        </div>
        <div class="flex team-com-item fw">
          <span class="flex team-num">{{$root.user.num_people}}</span>
          <span class="flex team-title">目前团队人数</span>
        </div>
        <div class="task-btn flex line-back">生成推广二维码海报</div>
      </div>
      <div class="task-info">
        <div class="task-color-title flex">说明</div>
        <span class="flex s line-font">1.点击团队，点击推广即可生成自己的二维码进行推广。</span>
        <span class="flex s line-font">2.发朋友圈进行推广。</span>
        <span class="flex s line-font">3.到各个微信、QQ群发二维码。</span>
        <span class="flex s line-font">4.贴吧、社区、网站进行发布二维码。</span>
        <span class="flex s line-font">5.再微信群里加人，购买加人软件分享自己的二维码。</span>
        <span class="flex s line-font">6.群发每个微信、QQ好友，给个红包示好，让好友帮忙转发。</span>
      </div>
      <div class="footer-none"></div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'

  export default {
    name: 'commision',
    created() {

    },
    methods: {
      _toDetail() {
        this.$router.push({
          name: 'detail-commision'
        })
      }
    },
    components: {
      userheader
    }
  }
</script>

<style scoped>
  .header {
    width: 92%;
    height: 170px;
    margin: 10px auto 20px;
  }

  .team-com-item {
    width: 44%;
    height: 80px;
    margin: 10px 0 10px 4%;
    background: #E3DEFF;
    color: #6B41E1;
    border-radius: 10px;
  }

  .team-num {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 8px;
  }

  .team-title {
    color: #9A80E4;
    font-size: 12px;
  }

  .line-font {
    width: 92%;
    margin: 0 auto;
    color: #555;
    line-height: 20px;
    min-height: 25px;
    height: auto;
    justify-content: flex-start;
    font-size: 14px;
  }

  .see-team-btn {
    color: #6B41E1;
    font-weight: 400;
    padding: 4px 6px;
    font-size: 12px;
    text-indent: 0;
    border-radius: 4px;
    width: auto;
    height: 50%;
    flex-grow: 0;
    flex-shrink: 0;
    white-space: nowrap;
    border: 1px solid #6B41E1;
    justify-content: center;
  }
</style>
