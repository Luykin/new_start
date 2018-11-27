<template>
	<div class="btn-back flex" @click="_back" v-show="show">
		返回
	</div>
</template>
<script type="text/javascript">
	export default {
	  data() {
	    return{
	      show: true
      }
    },
		methods: {
			_back() {
				this.$router.back(-1)
			},
      _show() {
			  this.show = true
      },
      _hiden(){
			  this.show = null
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
		z-index: 999990;
		opacity: .84;
	}
</style>
