<template>
  <div class="detail-body">
    <back></back>
    <!--<div class="header">-->
      <!--<userheader></userheader>-->
    <!--</div>-->
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
      <div class="task-btn flex line-back" @click="_showQrCode">生成我的二维码海报</div>
    </div>
    <div class="task-info">
      <div class="task-color-title flex">说明</div>
      <div class="flex s line-font line-min-title">发布任务反现：</div>
      <div class="s line-font">1、当你的一级发布任务，审核通过后，你将获得<i class="red-color">5%</i>返佣；
      </div>
      <div class="s line-font">2、当你的二级发布任务，审核通过后，你将获得<i class="red-color">2%</i>返佣；</div>
      <div class="s line-font line-min-title">赚取任务返佣：</div>
      <div class="s line-font">1、当你的一级，完成并审核通过任务后，你将获得<i class="red-color">2%</i>返佣；</div>
      <div class="s line-font">2、当你的二级，完成并审核通过任务后，你将获得<i class="red-color">1%</i>返佣；</div>
      <div class="s line-font line-min-title">推广方法:</div>
      <div class="s line-font">1.进入抖个赞，点击团队，点击推广即可生成自己的二维码；</div>
      <div class="s line-font">2.把抖个赞二维码海报发送朋友圈进行推广；</div>
      <div class="s line-font">3.到各个微信、QQ群发二维码；</div>
      <div class="s line-font">4.贴吧、社区、网站进行发布二维码；</div>
      <div class="s line-font">5.再微信群里加人，购买加人软件分享自己的二维码；</div>
      <div class="s line-font">6.群发每个微信、QQ好友，给个红包示好，让好友帮忙转发；</div>
      <div class="s line-font">7.建立微信群让下级进群，一对一教学，直到学会；</div>
    </div>
    <div class="footer-none"></div>
    <router-view></router-view>
    <poster ref="poster"></poster>
  </div>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  import poster from 'components/poster/poster'
  import back from 'base/back/back'

  export default {
    name: 'commision',
    created() {

    },
    methods: {
      _toDetail() {
        this.$router.push({
          name: 'detail-commision'
        })
      },
      _showQrCode() {
        this.$refs.poster._showqr()
      },
    },
    components: {
      back,
      poster,
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

  .line-min-title {
    font-weight: 700;
    color: #444;
    border-top: 1px dashed rgba(0, 0, 0, .1);
    margin-top: 5px;
    padding-top: 5px;
  }

  .line-min-title:nth-child(2) {
    border-top: none;
  }

  .red-color {
    white-space: nowrap;
    color: #FF3939;
  }
</style>
