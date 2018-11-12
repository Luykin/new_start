<template>
	<transition name="list">
		<div class="body">
			<back></back>
			<div class="record-header flex">
				<div class="flex rh-item" :class="{'ative-record':  ativerecord === 1}" @click="_choseitem(1)">
					<span class="flex">购买记录</span>
				</div>
				<div class="flex rh-item" :class="{'ative-record':  ativerecord === 2}" @click="_choseitem(2)">
					<span class="flex">提现记录</span>
				</div>
			</div>
			<div style="margin-top: 60px"></div>
			<betterscroll class="wrapper" :data="list" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper'>
				<div class="scroll">
					<div v-for="item in list" class="better-item flex" v-if="ativerecord === 1">
						<div class="flex fw bi-center">
							<!--<span class="flex js ll">+{{item.price}}</span>-->
							<!--<span class="flex js ssss bi-name">充值</span>-->
              {{item.lable}}
						</div>
						<div class="flex fw">
							<span class="flex lll bi-name flex-end" style="color: #333">{{item.price}}</span>
							<span class="flex s bi-name flex-end">{{item.updateA}}</span>
						</div>
					</div>
					<div v-for="item in list" class="better-item flex" v-if="ativerecord === 2">
						<img src="https://cdn.xingkwh.com/%E6%AD%A3%E7%A1%AE%20%283%29.png" class="iconssss bi-img" v-show="item.status !==0">
						<img src="https://cdn.xingkwh.com/%E6%AD%A3%E7%A1%AE%20%282%29.png" class="iconssss bi-img" v-show="item.status === 0">
						<div class="flex fw bi-center">
							<span class="flex js ll">+{{item.score}}</span>
							<span class="flex js ssss bi-name">提现</span>
						</div>
						<div class="flex fw">
							<span class="flex ssss bi-name flex-end">{{item.status === 0 ? '审核中' : '成功'}}</span>
							<span class="flex ssss bi-name flex-end">{{item.updateA}}</span>
						</div>
					</div>
					<div v-show="!list.length" class="flex sss mg30" style="color: #727589;">
						暂时没有找到相关数据哦~
					</div>
				</div>
			</betterscroll>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import { withdrawlist, orders } from 'api/index'
	import { timeformat } from 'common/js/util'
	import back from 'base/back/back'
	import betterscroll from 'base/better-scroll/better-scroll'
	export default {
		data() {
			return {
				ativerecord: 1,
				page: 0,
				num: 10,
				totle: 0,
				list:[]
			}
		},
		created() {
			try{
				if (this.$route.query.ativerecord) {
					this.ativerecord = parseInt(this.$route.query.ativerecord)
				}
			}catch(err){
				console.log(err)
			}
		},
		mounted() {
			this._inint()
			this._pulldown()
			this.$root.eventHub.$on('update', () => {
				this._pulldown()
			})
			let time = setTimeout(() => {
				this.$root.eventHub.$on('ativerecord', (ativerecord) => {
					this.ativerecord = parseInt(ativerecord)
					this._pulldown()
				})
				clearTimeout(time)
				time = null
			}, 1000)
		},
		computed: {
			// ...mapGetters([
			// 	'user'
			// 	])
		},
		methods: {
			_inint() {
				this.$refs.wrapper._initScroll()
			},
			_choseitem(num){
				this.ativerecord = parseInt(num)
				this._pulldown()
			},
			async _orders() {
				this.$root.eventHub.$emit('loading', true)
				const ret = await orders(this.$root.user.user_id, this.num, this.page)
				this.$root.eventHub.$emit('loading', null)
				if(ret.status === 200 && ret.data.code === 200) {
					if (ret.data.data.count) {
						this.list = [...this.list, ...this._formatdata(ret.data.data.tasks)]
						this.totle = ret.data.data.count
					}
				}
			},
			_formatdata(list) {
				if(list.length) {
					list.forEach((item) => {
						item.updateA = timeformat(item.create || new Date().valueOf())
					})
					return list
				} else {
					return []
				}
			},
			async _withdrawlist() {
				this.$root.eventHub.$emit('loading', true)
				const ret = await withdrawlist(this.$root.user.user_id, this.num, this.page)
				this.$root.eventHub.$emit('loading', null)
				if(ret.status === 200 && ret.data.code === 200) {
					if (ret.data.data.count) {
						this.list = [...this.list, ...this._formatdata(ret.data.data.ret)]
						this.totle = ret.data.data.count
					}
				}
			},
			_pulldown() {
				// console.log('下拉刷新')
				this.num = 10
				this.page = 0
				this.list = []
				if (this.ativerecord === 1) {
					this._orders()
				} else {
					this._withdrawlist()
				}
			},
			_scrollToEnd(){
				if (this.list.length < this.totle) {
					// console.log('触底加载')
					this.page += 1
					if (this.ativerecord === 1) {
						this._orders()
					} else {
						this._withdrawlist()
					}
				}
			}
		},
		components: {
			betterscroll,
			back
		},
	}
</script>
<style scoped>
.body{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99998;
	background: #f5f5f5;
	overflow-y: scroll;
}
.record-header{
	width: 100%;
	height: 60px;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 99999;
	background: #524E4B;
}
.rh-item{
	height: 100%;
	flex-grow: 1;
	color: #A8A6A4;
}
.rh-item span{
	box-sizing: border-box;
	width: 25%;
	height: 100%;
	white-space: nowrap;
}
.ative-record{
	color: #DBB868;
	border-bottom: 2px solid #DBB868;
}
.wrapper {
	width: 100%;
	position: absolute;
	top: 60px;
	bottom: 0;
}
.scroll{
	width: 100%;
	height: auto;
}
.better-item{
	width: 100%;
	height: 70px;
  background: #fff;
	border-bottom: 1px solid #F2F2F2;
}
.bi-img{
	margin: 0 4%;
}
.bi-center{
  color: #333;
	flex-grow: 1;
  justify-content: flex-start;
  text-indent: 20px;
}
.bi-name{
	color: #727589;
	margin-top: 5px;
}
.flex-end{
	justify-content: flex-end;
	margin-right: 10%;
}
</style>
