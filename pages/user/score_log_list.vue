<template>
	<view id="root-view">
		<view id="header-view" @tap="payScore">
			<view id="score_num">{{ score_num }}</view>
			<view>
				<button class="pay_score_button">购买积分</button>
			</view>
		</view>
		<view id="content-view" @tap="getScoreLogList">
			<text>积分明细</text>
		</view>
		
		<view class="score-log-view">
			<view v-for="item in scoreLogList" :key="item.id" class="score-log">
				<view class="score-log-left">
					<view>{{item.title}}</view>
					<view>{{item.pubdate}}</view>
				</view>
				<view class="score-log-right">
					<text :style="item.pay_jifen.substr(0, 1) == '+'?'color:green':'color:red;'">{{item.pay_jifen}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	export default {
		data() {
			return {
				score_num: '9999',
				scoreLogList: [
					
				]
			}
		},
		onLoad() {
			this.getScoreLogList();
		},
		computed: {
			uid: function() {
				let uid = util.cache('app_userid', null);
				console.log('uid', uid);
				return uid ? uid: 0;
			},
		},
		onReachBottom() {
			// 下拉加载数据
			
		},
		methods: {
			async getScoreLogList() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params = {
					auth: auth,
					uid: this.uid,
					version: 'v2',
					filterData: true,
				};
				const url = apiPrefix+'?mod=product&ac=jfmx';
				const resp = await http.request(url, params);
				if (resp.status == 1) {
					this.scoreLogList = resp.data;
					this.score_num = resp.jifen;
				}
				console.log('resp:'+JSON.stringify(resp));
			},
			payScore() {
				uni.navigateTo({
					url: '/pages/user/score_pay',
					fail(res) {
						console.log('fail res:'+JSON.stringify(res));
					},
					complete(res) {
						console.log('complete res:'+JSON.stringify(res));
					}
				})
			},
		}
	}
</script>

<style lang="scss">

#root-view {
	display: flex;
	flex-direction: column;
	margin-left:32rpx;
	margin-right: 32rpx;
	#header-view {
		margin-top:20px;
		padding-top:20px;
		padding-bottom:20px;
		display: flex;
		align-items: center;
		padding-left:32rpx;
		padding-right: 32rpx;
		background-color: #F2F2F2;
		justify-content: space-between;
		#score_num {
			font-weight: 600;
			font-family: PingFang SC;
			font-size: 40rpx;
		}
		.pay_score_button {
			line-height: 2;
			padding-left: 10px;
			padding-right: 10px;
			font-family: PingFang SC;
			font-size: 16px;
		}
	}
	
	#content-view {
		
		font-size:40rpx;
		font-weight: 600;
		font-family: PingFang SC;
		
	}
	.score-log-view {
		.score-log {
			padding:10px;
			display: flex;
			justify-content: space-between;
			background-color: #F2F2F2;
			align-items: center;
			margin-bottom: 20px;
			&-left {
				display: flex;
				flex-direction: column;
			}
			&-right {
				display: flex;
			}
		}
	}
	#content-view:before {
		content: '';
		margin-top:5px;
		display: block;
		width: 686rpx;
		height: 15px;
		border-top: 1px solid #F3F3F3;
	}
	
	#content-view:after {
		display: block;
		margin-top:5px;
		content: '';
		width: 686rpx;
		height: 15px;
		border-bottom: 1px solid #F3F3F3;
	}
}
</style>
