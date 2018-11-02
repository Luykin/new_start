<template>
	<transition name="list">
		<div class="body">
			<back></back>
			<div class="header flex">
				<userheader></userheader>
			</div>
			<div class="mg30"></div>
			<div class="flex ll recharge-title">请输入提现金额<p class="ss" style="color:#727589;">(今日剩余提现次数<span style="color: #ffcd32;">{{$root.user.count ?  Math.abs(10 - $root.user.count) : 0}}</span> 次)</p></div>
			<div class="flex input-warp">
				<img src="https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E4%BA%BA%E5%90%8D%E5%B8%81icon@3x.png" class="recharge-img">
				<input type="text" name="提现输入框" class="flex my-input" v-model="money">
			</div>
			<div class="flex btn-buy lll" @click="_withdraw">提现</div>
			<img src="https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E8%AF%B4%E6%98%8Eimg@3x.png" class="font-img">
		</div>
	</transition>
</template>
<script type="text/javascript">
	import userheader from 'components/userheader/userheader'
	import { withdraw, updateuserinfo } from 'api/index'
	import back from 'base/back/back'
	export default {
		data() {
			return {
				money: ''
			}
		},
		created() {
		},
		mounted() {
		},
		computed: {
		},
		methods: {
			async _withdraw() {
				if (!this.money || isNaN(this.money)) {
					this.$root.eventHub.$emit('titps', '请正确填写')
					this.money = ''
					return false
				}
				if(this.$root.user.score < this.money) {
					this.$root.eventHub.$emit('titps', '您的余额不足')
					return false
				}
				if (this.$root.user.count >= 10) {
					this.$root.eventHub.$emit('titps', '今日已超出提现次数上限')
					return false
				}
				this.$root.eventHub.$emit('loading', true)
				const ret = await withdraw(this.$root.user.username, this.money)
				this.$root.eventHub.$emit('loading', null)
				if (ret.status == 200 && ret.data.code == 200) {
					this.$root.eventHub.$emit('titps', '提现申请已提交')
					this.money = ''
					const ret = await updateuserinfo(this.$root.user.username)
					if (ret.status == 200 && ret.data.code == 200 ){
						this.$root.user = ret.data.data
						this.$root.eventHub.$emit('update')
					}
				} else {
					if (ret.data.code == 438) {
						this.$root.eventHub.$emit('titps', '今日已超出提现次数上限')
						this.$root.eventHub.$emit('loading', null)
						return false
					}
					this.$root.eventHub.$emit('titps', '提交申请不通过')
					this.$root.eventHub.$emit('loading', null)
				}
			}
		},
		components: {
			userheader,
			back
		}
	}
</script>
<style scoped>
.header{
	height: 100px;
	background: #27283A;
}
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
.recharge-img{
	width: 40px;
	height: auto;
}
.recharge-title{
	width: 90%;
	height: 40px;
	margin: 0 auto;
	justify-content: flex-start;
}
.input-warp{
	height: 70px;
	width: 90%;
	margin: 10px auto;
	justify-content: flex-start;
	border-bottom: 2px solid #8284A0;
}
.btn-buy{
	width: 90%;
	margin: 20px auto;
	height: 50px;
	background: #F3A523;
	color: #10111E;
	border-radius: 10px;
}
.my-input{
	color: #727589;
	font-size: 50px;
	border: none;
	height: 75%;
	text-indent: 20px;
	background: rgba(0,0,0,0);
}
</style>