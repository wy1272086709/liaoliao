<template>
	<view class="upgrade-page">
		<view class="upgrade-header">
			<text id="combo-text">请先选择VIP套餐</text>
		</view>
		<scroll-view class="upgrade-content">
			<view class="combo" @tap="selectCombo()" :style="style">
				<view class="left-image">
					<image class="image-vip-info" src="../../static/img/yuedu.png"></image>
				</view>
				<view class="right-view">
					<view class="first-line">
						<text>月度会员套餐</text>
						<text class="price-text">¥28</text>
					</view>
					<view class="second-line">
						<text>10万恋爱话术、搜索功能、AI聊天、无广告、搜索、表情包、装逼图</text>
					</view>
				</view>
			</view>
			<view class="combo" @tap="selectCombo2()" :style="secondStyle">
				<view class="left-image">
					<image class="image-vip-info" src="../../static/img/jidu.png"></image>
				</view>
				<view class="right-view">
					<view class="first-line">
						<text>季度会员套餐</text>
						<text class="price-text">¥98</text>
					</view>
					<view class="second-line">
						<text>10万恋爱话术、搜索功能、AI聊天、无广告、搜索、表情包、装逼图</text>
					</view>
				</view>
			</view>
			<view class="combo" @tap="selectCombo3()" :style="thirdStyle">
				<view class="left-image">
					<image class="image-vip-info" src="../../static/img/niandu.png"></image>
				</view>
				<view class="right-view">
					<view class="first-line">
						<text class="combo-member-text">年度会员套餐</text>
						<text class="price-text">¥198</text>
					</view>
					<view class="second-line">
						<text class="combo-desc">10万恋爱话术、搜索功能、AI聊天、无广告、搜索、表情包、装逼图</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="upgrade-bottom">
			<button>购买</button>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				style: "",
				secondStyle: "",
				thirdStyle: ""
			}
		},
		methods: {
			selectCombo() {
				this.style = "border:2px solid rgba(249,177,127,1);";
				this.secondStyle = "";
				this.thirdStyle  = "";
			},
			selectCombo2() {
				this.style = "";
				this.secondStyle = "border:2px solid rgba(249,177,127,1);";
				this.thirdStyle  = "";
			},
			selectCombo3() {
				this.style = "";
				this.secondStyle = "";
				this.thirdStyle  = "border:2px solid rgba(249,177,127,1);";
			}
		}
	}
</script>

<style>
page {
	background-color: #2369E6;
}

view,scroll-view {
	display:flex;
	box-sizing: border-box;
}
.upgrade-header {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	height: 40px;
	width:100%;
	margin-left:70rpx;
}

.upgrade-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-items: center;
	width:670rpx;
}


.combo {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 25px;
	background:rgba(255,255,255,1);
	border-radius:10px;
	height: 120px;
}

.right-view {
	flex-direction: column;
	width:462rpx;
	margin-left:40rpx;
	margin-right:40rpx;
	margin-top:25px;
	margin-bottom: 28px;
}

.second-line {
	margin-top: 9px;
}

.left-image {
	display: flex;
	justify-content: center;
	align-items: center;
	width:100px;
	height:116px;
	box-sizing: border-box;
	background:linear-gradient(90deg,rgba(244,245,246,1) 0%,rgba(255,247,209,1) 100%);
	border-radius:20rpx 0rpx 0rpx 20rpx;
}


.upgrade-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
}

.image-vip-info {
	display: flex;
	height:60px;
	width: 60px;
}

.second-line>text {
	font-size:12px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(102,102,102,1);
}

.first-line {
	justify-content: space-between;
}
#combo-text {
	font-weight: bold;
	
}

.first-line:first-child {
	font-size:16px;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(51,51,51,1);
}

.combo-text::before {
	width:5px;
}

.price-text {
	font-size:18px;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(249,177,127,1);
}

.upgrade-bottom {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 670rpx;
	position: fixed;
	bottom: 25px;
}

.upgrade-bottom>button {
	width:100%;
	border: 1px solid #007AFF;
	border-radius: 100px;
	background-color: #3DB1F2;
}
</style>
