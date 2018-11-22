<template>
  <div class="flex header-user">
    <img :src="$root.user.avatar" class="iconx avater">
    <div class="flex namewarp fw llll">
      <p class="flex js nw-item ell x" :style="'font-weight: 900; color:'+ fontcolor + ';height: 25px'">{{$root.user.nickname || ''}}
        <span class="ssss feidaili" :class="{'daili': $root.user.is_agent}">{{$root.user.is_agent ? '(合伙人)' : '(非合伙人)'}}</span>
      </p>
      <p class="flex js nw-item ell sss" :style="'color:' + fontcolor">余额： <span>{{$root.user.score || 0}}元</span></p>
      <p class="flex js nw-item ell sss" :style="'color:' + fontcolor">ID： {{$root.user.id}}</p>
      <router-link tag='div' to='./withdraw' class="flex user-btn">
        提现
      </router-link>
    </div>
  </div>
</template>
<script type="text/javascript">
  //import { mapGetters } from 'vuex'
  export default {
    props: {
      fontcolor: {
        type: String,
        default: '#fff'
      }
    },
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    computed: {},
    methods: {},
    components: {}
  }
</script>
<style scoped>
  .header-user {
    height: 100%;
    justify-content: flex-start;
    background: url("https://cdn.xingkwh.com/%E5%B0%8F%E8%B4%B4%E5%A3%ABbg@3x.png") no-repeat;
    background-size: cover;
  }

  .avater {
    flex-shrink: 0;
    margin: 0px 5%;
    border-radius: 100%;
  }

  .namewarp {
    width: 30%;
    flex-shrink: 0;
    flex-grow: 1;
    overflow: hidden;
    position: relative;
  }

  .user-btn {
    position: absolute;
    right: 5%;
    bottom: 0%;
    width: 66px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 12px;
    opacity: 1;
    transition: all .5s;
  }

  .nw-item {
    height: 18px;
  }

  .nw-item span {
    color: rgb(255, 205, 50);
    text-indent: 6px;
  }

  .router-link-active {
    opacity: 0;
    transition: all .5s;
  }

  .nw-item .feidaili {
    color: rgba(255, 255, 255, .5);
  }

  .header-user .nw-item .daili {
    color: rgb(255, 205, 50);
  }
</style>
