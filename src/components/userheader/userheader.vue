<template>
	<div class="flex header-user">
		<img :src="$root.user.avatar" class="iconx avater">
		<div class="flex namewarp fw llll">
			<span class="flex js nw-item ell" :style="'font-weight: 900; color:'+ fontcolor">{{$root.user.nickname || ''}}</span>
			<p class="flex js nw-item ell" :style="'color:' + fontcolor">余額： <span>{{$root.user.score || 0}}币</span></p>
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
}
.nw-item{
	height: 25px;
}
.nw-item span{
	color: #F3A523;
	text-indent: 6px;
}
</style>