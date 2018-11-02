<template>
	<transition name="list">
		<div class="body">
			<back></back>
			<img src="https://cdn.xingkwh.com/%E7%9B%88%E5%88%A9%E6%8A%80%E5%B7%A7banner@3x.png" class="header-img">
			<div style="width: 100%; padding-top: 38%;"></div>
			<div class="qr-body">
				<img src="https://cdn.xingkwh.com/kefu2.png" style="width: 100%; height: auto;">
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import back from 'base/back/back'
	export default {
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
			back
		}
	}
</script>
<style scoped>
.body{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99999;
	background: #282442;
	overflow-y: scroll;
}
.header-img{
	width: 100%;
	height: auto;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
.qr-body{
	width: 68%;
	margin: 20px auto;
	background-size: 100% 100%;
	overflow: hidden;
	border-radius: 10px;
}
</style>