<template>
	<div class="btn-back flex" @click="_back">
		返回
	</div>
</template>
<script type="text/javascript">
	export default {
		methods: {
			_back() {
				this.$router.back(-1)
			}
		}
	}
</script>
<style scoped>
	.btn-back{
		width: 86px;
		height: 38px;
		background: #ff3535;
    background: linear-gradient(right, #FF561E, #FF2966);
		color: #fff;
		border-radius: 30px;
		position: fixed;
		bottom: 6%;
		right: 6%;
		z-index: 999999;
		opacity: .9;
	}
</style>
