<template>
	<div class="flex header-user">
		<img :src="$root.user.avatar" class="iconx avater">
		<div class="flex namewarp fw llll">
			<p class="flex js nw-item ell x" :style="'font-weight: 900; color:'+ fontcolor">{{$root.user.nickname || ''}}
        <span class="ssss" style="color: rgba(255,255,255,.4)">{{$root.user.is_agent ? '(代理)' : '(非代理)'}}</span>
      </p>
			<p class="flex js nw-item ell" :style="'color:' + fontcolor">余額： <span>{{$root.user.score || 0}}币</span></p>
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
			return {
			}
		},
		created() {
		},
		mounted() {
		},
		computed: {
		},
		methods: {
		},
		components: {
		}
	}
</script>
<style scoped>
.header-user{
	height: 100%;
	justify-content: flex-start;
  background: url("https://cdn.xingkwh.com/%E6%88%91%E7%9A%84-%E5%A4%B4%E5%83%8F%E8%83%8C%E6%99%AF.png") no-repeat;
  background-size: cover;
}
.avater{
	flex-shrink: 0;
	margin: 0px 5%;
	border-radius: 100%;
}
.namewarp{
	width: 30%;
	flex-shrink: 0;
	flex-grow: 1;
	overflow: hidden;
  position: relative;
}
.user-btn{
  position: absolute;
  right: 5%;
  bottom: 0%;
  width: 60px;
  height: 26px;
  border-radius: 4px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 12px;
  opacity: 1;
  transition: all .5s;
}
.nw-item{
	height: 25px;
}
.nw-item span{
	color: #DDBB6C;
	text-indent: 6px;
}
.router-link-active{
  opacity: 0;
  transition: all .5s;
}
</style>
