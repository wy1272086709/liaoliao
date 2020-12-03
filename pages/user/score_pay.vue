<template>
	<view id="root-view">
		<view v-for="item in scoreList" :key="item.id" class="score-item">
			<view class="price-title-view">
				<text>¥</text>
				<text class="price-text">{{item.price}}</text>
				<text>元</text>
			</view>
			<view class="price-desc-view">
				<text>充值 {{item.price}} 元,送 {{item.score}} 积分</text>
			</view>
			<view class="pay-score-view">
				<text>充值</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scoreList: [
					{
						price: 9.9,
						desc: '',
						score: 1000,
					},
					{
						price: 26.9,
						desc: '',
						score: 5000,
					},
					{
						price: 9.9,
						desc: '',
						score: 10000,
					},
					{
						price: 26.9,
						desc: '',
						score: 20000,
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
#root-view {
	margin-top:40px;
	margin-left: 30rpx;
	margin-right: 30rpx;
	padding-left: 41rpx;
	padding-right: 41rpx;
	padding-top: 52rpx;
	padding-bottom: 41rpx;
	display: flex;
	justify-content: space-between;
	border-radius: 20rpx;
	background-color: #FFFFFF;
	flex-wrap: wrap;
	align-content: space-between;
	.score-item {
		display: flex;
		flex-direction: column;
		width: 284rpx;
		height: 358rpx;
		justify-content: center;
		background-image: url(../../static/img/score/score_pay_item.png);
		background-repeat: no-repeat;
		background-size: 284rpx 358rpx;
		position: relative;
		.price-title-view {
			text-align: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #C3AEFF;
			
			.price-text {
				font-size: 48rpx;
				font-family: PingFang SC;
				font-weight: 800;
				font-style: italic;
			}
			.price-text:after {
				display: inline-block;
				content: ' ';
				width:5px;
			}
		}
		.price-desc-view {
			margin-left: 30rpx;
			margin-right: 29rpx;
			color:#CCC;
		}
		
		.pay-score-view {
			position: absolute;
			bottom:-30rpx;
			left:38rpx;
			width: 210rpx;
			height: 60rpx;
			background: #C3AEFF;
			border-radius: 30rpx;
			line-height: 60rpx;
			text-align:center;
			
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	.score-item:nth-child(1), .score-item:nth-child(2) {
		margin-bottom:45rpx;
	}
}
</style>
