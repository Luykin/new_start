<template>
	<transition name="list">
		<div class="body">
			<back></back>
			<img src="https://cdn.xingkwh.com/BTC%E4%BB%8B%E7%BB%8Dbanner@3x.png" class="header-img">
			<div style="width: 100%; padding-top: 32%;"></div>
			<img src="https://cdn.xingkwh.com/BTC%E4%BB%8B%E7%BB%8D%20%E6%96%87%E5%AD%97@3x.png" class="body-img">
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
	background: #10111E;
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
.body-img{
	display: block;
	width: 87%;
	height: auto;
	margin: 15px auto;
}
</style>