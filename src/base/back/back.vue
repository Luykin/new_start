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
    background: -webkit-gradient(linear, right top, left top, from(#FF561E), to(#FF2966));
		color: #fff;
		border-radius: 30px;
		position: fixed;
		bottom: 14%;
		right: 3%;
		z-index: 999999;
		opacity: .84;
	}
</style>
