<template>
	<div class="music">
		<audio src="http://pd70b9zd0.bkt.clouddn.com/bgnew.mp3" ref="audio" autoplay></audio>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {

		},
		created() {  
		},
		mounted() {
			this.$refs.audio.loop=true;
			this.$refs.audio.autoplay=true;
			this.$root.eventHub.$on('audio', (data) => {
				if(data) {
					this._play()
				}else {
					this._pause()
				}
			});
			document.addEventListener('WeixinJSBridgeReady',() => {
				console.log('canplay')
				this._play()
			},false);
		},
		methods: {
			_play(){
				this.$refs.audio.play()
			},
			_pause() {
				this.$refs.audio.pause()
			}
		}
	}
</script>
<style scoped>
.music{
	position: fixed;
	z-index: -99;
	opacity: 0;
}
</style>