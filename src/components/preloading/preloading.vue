<template>
	<div class="preloading">
		<img :src="item" v-for="item in preloadingshow" @load="_imgload($event)">
	</div>
</template>
<script type="text/javascript">
	export default {
  props: {
    preloadingshow: {
      type: Array,
      default: []
    },
  },
  methods: {
  	_imgload(e) {
  		try{
  			e.path[0].style.display = 'none';
  		} catch(err){
  			console.log(err)
  		}
  	}
  }
}
</script>
<style type="text/css" scoped>
	.preloading{
		position: fixed;
		z-index:  -999;
		opacity: 0;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
</style>