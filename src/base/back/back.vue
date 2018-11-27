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
		background: #7045F2;
    background: linear-gradient(right, #7045F2, #9672F8);
    background: -webkit-gradient(linear, right top, left top, from(#7045F2), to(#9672F8));
		color: #fff;
		border-radius: 30px;
		position: fixed;
		bottom: 10%;
		right: 6%;
		z-index: 991000;
		opacity: .84;
	}
</style>
