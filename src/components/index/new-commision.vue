<template>
  <transition name="list">
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <!--<router-link tag='div' to='/group' class="task-btn flex task-detail-btn">-->
        <!--加入官方交流群-->
      <!--</router-link>-->
      <div class="task-info flex fw">
        页面正在建设中,公测开放!
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import userheader from 'components/userheader/userheader'
  export default {
    name: 'new-commision',
    created() {

    },
    components: {
      userheader
    }
  }
  //   name: '官方交流群',
  //     path: '/group',
  //     icon: require('../../assets/img/usericon2.png')
  // }
</script>

<style scoped>
  .task-info {
    color: #999;
  }

  .task-info {
    align-content: center;
    align-items: center;
  }
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
  .task-detail-btn{
    background: #FB53D9;
  }
</style>
