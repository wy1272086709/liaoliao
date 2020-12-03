<template>
	<view id="root-view">
		<view id="header-view" @tap="payScore">
			<view id="score_num">{{ score_num }}</view>
			<view>
				<button class="pay_score_button">购买积分</button>
			</view>
		</view>
		<view id="content-view">
			<text>积分明细</text>
		</view>
		
		<view id="footer-view">
			<view id="footer-view-title">积分任务({{current}}/{{total}})</view>
			<view v-for="item in taskList" :key="item.nid" class="footer-view-task">
				<view class="task-left-view">
					<view class="task-image">
						<image :src="item.imageSrc" class="task-image-icon"></image>
					</view>
					<view class="task-text">
						<text>{{item.title}}</text>
						<text>{{item.desc}}</text>
					</view>
				</view>
				
				<view class="task-button-view">
					<button>{{ item.statusText }}</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				score_num: '13599',
				current: 0,
				total: 4,
				scrollHeight: '',
				taskList: [
					{
						nid: 1,
						title: '连续签到7天',
						type: 1,//标志任务类型,1为签到型任务
						desc: '任务任务+10积分',
						imageSrc: '../../static/img/score/score_icon_active.png',
						//imageSrc: '../../static/img/score/score_icon.png',
						step: 0, // 完成进度
						step_count: 10, // 总共步骤
						statusText: '去完成',
					},
					{
						nid: 2,
						title: '任意浏览文章',
						type: 2,//标志任务类型,1为签到型任务
						desc: '任务任务+10积分',
						imageSrc: '../../static/img/score/score_icon_active.png',
						//imageSrc: '../../static/img/score/score_icon.png',
						step: 0, // 完成进度
						step_count: 10, // 总共步骤
						statusText: '去完成',
					},
					{
						nid: 3,
						title: '任意评论',
						type: 3,//标志任务类型,1为签到型任务
						desc: '任务任务+10积分',
						//imageSrc: '../../static/img/score/score_icon.png',
						imageSrc: '../../static/img/score/score_icon_active.png',
						step: 1, // 完成进度
						step_count: 5, // 总共步骤
						statusText: '1/5',
					},
					{
						nid: 4,
						title: '邀请好友',
						type: 1,//标志任务类型,1为签到型任务
						desc: '任务任务+2积分',
						//imageSrc: '../../static/img/score/score_icon.png',
						imageSrc: '../../static/img/score/score_icon_active.png',
						step: 0, // 完成进度
						step_count: 10, // 总共步骤
						statusText: '1/5',
					}
				]
			}
		},
		onLoad(option) {
			const info = uni.getSystemInfoSync();
			const h    = info.windowHeight;
			this.scrollHeight =  h - uni.upx2px(280);
		},
		methods: {
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
			lower() {
				// 任务多的时候,可以继续往下拉...
			}
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
	#footer-view {
		&-title {
			margin-top:100rpx;
			color:red;
			margin-bottom: 20px;;
		}
		.footer-view-task {
			display: flex;
			margin-top:20px;
			justify-content: space-between;
			.task-left-view {
				display: flex;
				.task-image {
					width:44px;
					height: 38px;
					&-icon {
						height: 44px;
						width: 38px;
					}
				}
				.task-text {
					display: flex;
					flex-direction: column;
					text {
						display: flex;
					}
					text:nth-child(1) {
						color:#333333;
						margin-bottom: 10px;
					}
					text:nth-child(2) {
						color:#CCD0DB;
					}
				}
			}
			.task-button-view {
				display: flex;
				align-items: center;
				button {
					line-height: 1;
					padding-top:5px;
					padding-bottom: 5px;
					font-family: PingFang SC;
					color:#FFFFFF;
					font-size: 16px;
					padding-left:15px;
					padding-right:15px;
					background-color: #FF3333;
				}
			}
		}
		
	}
}


</style>
