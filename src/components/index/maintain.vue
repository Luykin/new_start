<template>
  <transition name="list">
    <div class="detail-body flex fw">
      <!--服务器正在维护中,请各位耐心等待...-->
      久等了, 服务器将在5分钟之后启动
      <!--<span class="flex mg20">{{list[parseInt(Math.random() * 10)]}}</span>-->
      <span class="flex mg20">{{titps}}</span>
      <span class="flex mg20">{{`编码:${Date.parse(new Date()).toString().slice(5, 10)}`}}</span>
    </div>
  </transition>
</template>

<script>
  import {update_user_info} from 'api/index'
  import {UAID, CHANNEL, APPNAME, env} from 'api/config'
  export default {
    name: 'maintain',
    data() {
      return {
        // net: `福利: 您的ID${}, 截图领取1元余额`,
        list: ['你猜我几点修复,我赌5毛下午2点~','还差最后一个任务,我就要提现啦' ,'练习手速抢任务,哼哼哈嘿','等我修复完,一大波福利送给你~', '你猜我几点修复,我赌5毛下午2点~', '我不会告诉你任务还能置顶', '你猜我几点修复,我赌5毛下午2点~','练习手速抢任务,哼哼哈嘿', '官方的一大波任务即将到达', '练习手速抢任务,哼哼哈嘿', '想抢任务? 再等等,程序员正在努力抢修', '我不会告诉你任务还能置顶', '还差最后一个任务,我就要提现啦', '你猜我几点修复,我赌5毛下午2点~', '你又进来了? 马上就好啦~', '快了快了,就要好了', '官方的一大波任务即将到达', '还在修复,这程序员必须祭天', '等我修复完,一大波福利送给你~','想抢任务? 再等等,程序员正在努力抢修', '官方的一大波任务即将到达', '你又进来了? 马上就好啦~', '快了快了,就要好了', '官方的一大波任务即将到达', '还在修复,这程序员必须祭天','想抢任务? 再等等,程序员正在努力抢修', '我不会告诉你任务还能置顶', '你又进来了? 马上就好啦~', '练习手速抢任务,哼哼哈嘿' , '快了快了,就要好了', '官方的一大波任务即将到达', '还在修复,这程序员必须祭天', '想抢任务? 再等等,程序员正在努力抢修']
      }
    },
    computed: {
      titps() {
        if (this.$root.user.username) {
          return `幸运的你: 您的ID:  ${this.$root.user.username}  , 截图领取1元充值余额`
        } else {
          return '服务器马上启动!'
        }
      },
    },
    created() {
      let user = localStorage.getItem(`${UAID}${CHANNEL}user_id`) || localStorage.getItem('user_id')
      this._updateuserinfo(user)
    },
    methods: {
      async _updateuserinfo(username, callback) {
        if (!username) {
          console.log('_updateuserinfo: 不存在username')
        }
        const ret = await update_user_info(username)
        if (ret.status === 200 && ret.data.code === 200) {
          this.$root.user = ret.data.data
        }
        if (callback) {
          callback(this.$root.user)
        }
      },
    }
  }
</script>

<style scoped>
  .detail-body{
    color: #fff;
    font-weight: 600;
  }
  span {
    font-size: 10px;
    color: #e5e5e5;
    /*transform: scale(.9,.9);*/
  }
</style>
