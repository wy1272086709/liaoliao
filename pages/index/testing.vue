<template>
	<view id="root-view">
		<scroll-view id="tab-scroll" :scroll-x="true"  :show-scrollbar="false" :scroll-into-view="scrollInto">
			<!-- 初始尺寸设置为120rpx,   去掉header-view width 属性, 设置元素的flex-shrink 为0，在子元素上-->
			<view  class="header-view-box">
				<view  v-for="(tab,index) in tabArr" :key="tab.id" :id="'tab_'+tab.id" :data-index="index" @tap.cancel="switchTab(index)">
					<view>
						<text :style="index==activeTabIndex ? 'border-bottom: 1rpx solid #007AFF;': ''">{{ tab.name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<view id="testing-content">
			<view v-for="item in testingList" class="testing-box">
				<view class="testing-title-view " @tap="gotoTesting">
					<view class="has-pass">
						<view>{{statusText}}</view>
					</view>
					<view class="testing-title">
						{{item.title}}
					</view>
				</view>
				<view class="testing-stat-view">
					<view class="testing-stat-button" @tap="gotoTesting">
						<view v-if="status == 0">立即测试</view>
						<view v-if="status == 1">再测一遍</view>
					</view>
					<view class="testing-num">
						<text>{{item.num}}</text>人测过
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabArr: [
					{ id: 1, name: '情感' },
					{ id: 2, name: '运势' },
					{ id: 3, name: '星座' },
					{ id: 4, name: '趣味' },
				],
				activeTabIndex: 0,
				scrollInto: '',
				testingList: [ 
					{
						title: '测测你的IQ值是多少?',
						num: '666',
					}, {
						title: '抽签测今天运势',
						num: '666',
					}
				],
				status: 0,
			}
		},
		computed:{
			statusText: function() {
				let statusArr = {
					0: '未测试',
					1: '已测试'
				};
				return statusArr[this.status];
			}
		},
		methods: {
			switchTab() {
				
			},
			gotoTesting() {
				// 进入测试题目页面
				
			}
		}
	}
</script>

<style lang="scss">
#tab-scroll {
	display: flex;
	height: 50rpx;
	margin-left:32rpx;
	margin-right:32rpx;
	overflow-x: auto;
	width:686rpx;
	-webkit-overflow-scrolling: touch;
	.header-view-box {
		display: flex;
		view {
			height: 46rpx;
			display: flex;
			flex-shrink: 0;
			align-items: center;
			white-space: nowrap;
			flex-basis: 170rpx;
			justify-content: flex-start;
			/*margin-right:20px;*/
			view {
				height: 46rpx;
				/*padding-bottom: 5rpx;*/
				justify-content: center;
				text-align: center;
				align-items: center;
			}
		}
	}
}
#testing-content {
	display: flex;
	margin-left:32rpx;
	margin-right: 32rpx;
	justify-content: space-between;
	margin-top:20px;
	.testing-box {
		.testing-title-view {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width:330rpx;
			height:262rpx;
			border:1px solid black;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			.has-pass {
				width:100%;
				height:42rpx;
				display: flex;
				justify-content: flex-end;
				view {
					width:115rpx;
					font-size:26rpx;
					background-color: red;
					color: #FFFFFF;
					border-bottom-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
				}
			}
			.testing-title {
				display: flex;
				justify-content: center;
				font-size:32rpx;
				color: #FFFFFF;
				background-color:#2D5E70;
				height:20px;
			}
		}
		.testing-stat-view {
			margin-left:32rpx;
			margin-right: 32rpx;
			margin-top:20px;
			margin-bottom:20px;
			display: flex;
			justify-content: space-between;
			.testing-stat-button {
				color:#F18DEC;
				font-size:24rpx;
				border-radius: 20rpx;
				border:1px solid #F18DEC;
			}
			.testing-num {
				font-size:24rpx;
				color:#F18DEC;
			}
		}
	}
}
</style>
