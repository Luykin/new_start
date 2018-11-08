<template>
	<transition name="list">
		<div class="body">
			<back></back>
			<div class="header flex">
				<userheader></userheader>
			</div>
			<div class="mg30"></div>
			<div class="goods-warp flex">
				<div class="gw-item flex fw" :class="{'active-gw-item': choseitem && (choseitem.good_id == item.good_id)}" v-for="item in goodslist" @click="choseitem = item">
					<span class="flex xxxx gi-lable">{{item.label}}</span>
					<span class="flex s gi-price mg10">￥{{item.good.price}}</span>
				</div>
			</div>
			<div class="btn-buy flex" @click="_wxbuy">确认购买</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import userheader from 'components/userheader/userheader'
	import back from 'base/back/back'
	import { goodlist, addorder, updateuserinfo } from 'api/index'
	export default {
		data() {
			return {
				goodslist: [],
				choseitem: null,
			}
		},
		created() {
			this._initgoods()
		},
		mounted() {
		},
		computed: {
		},
		methods: {
			async _wxbuy() {
				if(!window.WeixinJSBridge) {
					console.log('未在微信内')
				} else{
					this.$root.eventHub.$emit('loading', true)
					const ret = await addorder(this.choseitem.good_id, this.choseitem.good.score, this.choseitem.good.price, this.$root.user.username)
					this.$root.eventHub.$emit('loading', null)
					if (ret.status == 200 && ret.data.code == 200 && ret.data.data.order_code) {
						const reualt = ret.data.data.pay_ret
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
         			"appId": reualt.appId,     //公众号名称，由商户传入
         			"timeStamp": reualt.timeStamp,         //时间戳，自1970年以来的秒数
         			"nonceStr":reualt.nonceStr, //随机串
         			"package": reualt.package,
         			"signType":"MD5",         //微信签名方式：
         			"paySign": reualt.paySign //微信签名
         		},(res) => {
         			if(res.err_msg == "get_brand_wcpay_request:ok"){
         				this.$root.eventHub.$emit('titps', '充值成功~')
         				setTimeout(async () => {
         					const ret = await updateuserinfo(this.$root.user.username)
         					if (ret.status == 200 && ret.data.code == 200 ){
         						this.$root.user = ret.data.data
         						this.$root.eventHub.$emit('update')
         						this.$router.replace({
         							path: '/user'
         						})
         					}
         				}, 300)
         			}})
					}
				}
			},
			async _initgoods() {
				this.$root.eventHub.$emit('loading', true)
				const ret = await goodlist()
				this.$root.eventHub.$emit('loading', null)
				if (ret.status == 200 && ret.data.code == 200) {
					this.goodslist =  ret.data.data
					this.choseitem = ret.data.data.length ? ret.data.data[0] : null
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
	background: #524E4B;
}
.body{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99999;
	background: #fff;
	overflow-y: scroll;
}
.goods-warp{
	flex-wrap: wrap;
	width: 97%;
	height: auto;
	margin-left: 3%;
	justify-content: flex-start;
}
.gw-item{
	height: 80px;
	width: 30%;
	flex-grow: 0;
	flex-shrink: 0;
	margin: 0 2% 15px 0;
	border:  2px solid #424360;
	border-radius: 6px;
}
.gi-lable{
	color: #F3A523;
}
.gi-price{
	color: #8284A0;
}
.active-gw-item{
	background: rgba(66,67,96,1);
}
.btn-buy{
	width: 90%;
	height: 45px;
	margin: 20px auto;
	border-radius: 6px;
	color: #111;
	background: #ffb800;
	/*	border: 1px solid #07ff00;*/
}
</style>
