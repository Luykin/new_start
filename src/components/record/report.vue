<template>
  <transition name="list">
    <div class="detail-body">
      <back></back>
      <div class="cachet flex js">
        <div class="cachet-item flex" v-for="item in btn_list" :class="{'active-cachet-item': item.id === activeId}" @click="_change(item.id)">{{item.name}}</div>
      </div>
      <!--<div class="task-info">-->

      <!--</div>-->
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'

  export default {
    name: 'recharge',
    data() {
      return{
        btn_list: [{
          id: 1,
          name: '我被举报'
        },{
          id: 2,
          name: '我的举报'
        }],
        activeId: 1
      }
    },
    methods: {
      _change(id) {
        this.activeId = id
      },
    },
    components: {
      back
    }
  }
</script>

<style scoped>
</style>
