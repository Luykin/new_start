<template>
	<div class="body">
		<back></back>
		<div class="user-header mg10">
			<div class="user-header-inner-warp flex">
				<div class="flex uhiw-top">
					<img :src="$root.user.avatar" class="iconx avater">
					<span class="flex mg10 s" style="color: #A46E2D">{{$root.user.nickname || ''}}</span>
				</div>
				<div class="flex js uhiw-bottom ssss">
					<div class="flex uhiw-bitem fw">
						<span class="flex ubiw-name">今日收益</span>
						<span class="flex xx">{{$root.user.today_income || '0.00'}}</span>
					</div>
					<div class="flex uhiw-bitem fw">
						<span class="flex ubiw-name">总收益</span>
						<span class="flex xx">{{$root.user.sum_income || '0.00'}}</span>
					</div>
					<div class="flex uhiw-bitem fw">
						<span class="flex ubiw-name">团队人数</span>
						<span class="flex xx">{{$root.user.num_people || '0.00'}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="team-level-body flex mg20 fw">
			<div class="explain-warp flex js lll">
				團隊人數
			</div>
			<div class="team-level-item flex ell">
				<span class="flex s">一级(人)</span>
				<div class="flex ll mg10">{{team_level[0] ? team_level[0].num_people : '0'}}</div>
			</div>
			<div class="team-level-item flex ell">
				<span class="flex s">二级(人)</span>
				<div class="flex ll mg10">{{team_level[1] ? team_level[1].num_people : '0'}}</div>
			</div>
			<div class="team-level-item flex ell">
				<span class="flex s">三级(人)</span>
				<div class="flex ll mg10">{{team_level[2] ? team_level[2].num_people : '0'}}</div>
			</div>
		</div>
		<div class="explain-warp flex js lll mg20">
			團隊收益
		</div>
		<div class="transcat-header flex mg10">
			<span class="th-item flex">团队</span>
			<span class="th-item flex">今日交易</span>
			<span class="th-item flex">累计交易</span>
			<span class="th-item flex">今日收益</span>
			<span class="th-item flex">累计收益</span>
		</div>
		<div class="transcat-item flex" v-for="item in profit_details" v-if="profit_details.length">
			<div class="tran-line flex">{{item.level == 1 ? '一' : item.level == 2 ? '二' : '三'}}级</div>
			<div class="tran-line flex">{{item.today_trans}}</div>
			<div class="tran-line flex">{{item.total_trans}}</div>
			<div class="tran-line flex">{{item.today_profit}}</div>
			<div class="tran-line flex">{{item.total_profit}}</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { teams, updateuserinfo } from 'api/index'
	import back from 'base/back/back'
	export default{
		data() {
			return{
				team_level: [],
				profit_details: []
			}
		},
		created() {
			this._teams()
			this._updateuserinfo()
		},
		mounted() {
			let time = setTimeout(() => {
				this.$root.eventHub.$on('teams', () => {
					this._teams()
					this._updateuserinfo()
				})
				clearTimeout(time)
			},1000)
		},
		computed: {
		},
		methods: {
			async _teams() {
				this.$root.eventHub.$emit('loading', true)
				const ret = await teams(this.$root.user.username)
				this.$root.eventHub.$emit('loading', null)
				if (ret.status == 200 && ret.data.code == 200) {
					this.team_level = ret.data.data.team_level
					this.profit_details = ret.data.data.profit_details
				}
			},
			async _updateuserinfo() {
        const ret = await updateuserinfo(this.$root.user.username)
        if (ret.status == 200 && ret.data.code == 200){
          this.$root.user = ret.data.data
          this.$root.eventHub.$emit('update')
        }
      },
		},
		components: {
			back
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
	background: #10111E;
	overflow-y: scroll;
}
.user-header{
	background: url('https://cdn.xingkwh.com/%E4%BD%A3%E9%87%91%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83bg@3x.png') no-repeat;
	background-size: 100% 100%;
	width: 92%;
	padding-top: 40%;
	border-radius: 8px;
	position: relative;
}
.user-header-inner-warp{
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	align-items: flex-start;
	flex-wrap: wrap;
}
.uhiw-top{
	height: 60%;
	flex-wrap: wrap;
}
.uhiw-bottom{
	height: 40%;
}
.avater{
	flex-shrink: 0;
	margin: 0px 5%;
	border-radius: 100%;
}
.uhiw-bitem{
	height: 30%;
	border-right: 1px solid #FFCC7E;
}
.ubiw-name{
	color: #FFCC7E;
	margin-bottom: 5px;
}
.team-level-body{
	height: 180px;
	background: #27283A;
	justify-content: flex-start;
}
.team-level-item{
	height: 90px;
	width: 27%;
	margin: 20px 0 20px 5%;
	background: #3D3E56;
	flex-wrap: wrap;
}
.team-level-item:nth-child(2){
	background: #2F3044;
}
.team-level-item:nth-child(3){
	background: #3D3E56;
}
.team-level-item:nth-child(4){
	background: #424360;
}
.team-level-item span{
	color: #8284A0;
}
.transcat-header{
	height: 50px;
	background: #27283A;
}
.th-item{
	color: #727589;
	font-size: 13px;
	flex-grow: 1;
	border-right: 1px solid #424558;
}
.transcat-item{
	height: 60px;
	width: 100%;
	border-bottom: 1px solid #27283A;
	font-size: 13px;
	color: #fff;
	justify-content: flex-start;
}
.tran-line{
	flex-wrap: wrap;
	flex-grow: 1;
	height: 100%;
	text-align: center;
	line-height: 20px;
}
</style>