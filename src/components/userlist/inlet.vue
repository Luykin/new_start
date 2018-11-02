<template>
	<transition name="list">
		<div class="body">
			商户号欠缺
		</div>
	</transition>
</template>
<script type="text/javascript">
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
</style>