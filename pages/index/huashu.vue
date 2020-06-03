<template>
	<view id="root-view">
		<!--
		<view class="navigation" :style="'height:' +  navigation.height + 'px;' + 'left:'+navigation.left+'px'+';padding-top:' + navigation.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + navigation.top + 'px'">
				<uni-icons type="back" @tap="back()"></uni-icons>
				<text id="huashu-title">{{navigation.title}}</text>
			</view>
		</view>
		-->
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view class="left">
			<uni-icons type="back" @tap="back()"></uni-icons>
			<text id="huashu-title">{{navigation.title}}</text>
		</view>
		<scroll-view id="content-view" :style="'height:'+scrollHeight+'px;'">
			<view class="huashu-article huashu-article-first">
				<view class="huashu-line">
					<view class="huashu-sex">
						<image class="huashu-sex-image" src="../../static/img/index/man.png"></image>
					</view>
					<view class="huashu-content">
						<text class="huashu-content-text">能不能和我拍个照</text>
					</view>
					<view class="huashu-copy-btn">
						<image class="huashu-copy-image" src="../../static/img/index/copy.png" @tap="copyHuashu('能不能和我拍个照')"></image>
					</view>
				</view>
				<view class="huashu-line">
					<view class="huashu-sex">
						<image class="huashu-sex-image" src="../../static/img/index/female.png"></image>
					</view>
					<view class="huashu-content">
						<text class="huashu-content-text">为什么</text>
					</view>
					<view class="huashu-copy-btn">
						<image class="huashu-copy-image" src="../../static/img/index/copy.png" @tap="copyHuashu('为什么')"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	export default {
		data() {
			return {
				scrollHeight: 0,
				navigation: {
					height: 88,
					top: 30,
					left:17,
					title: ""
				}
			}
		},
		components: {
			tabBar:tabBar,
		},
		onLoad(option) {
			console.log('option', option);
			let title = option.title;
			if(title) {
				this.navigation.title = decodeURIComponent(title);
			}
			let sysinfo = uni.getSystemInfoSync();
			let windowHeight = sysinfo.windowHeight;
			//this.navigation.height = statusBarHeight;
			let scrollHeight = windowHeight - 82;
			this.scrollHeight = scrollHeight;
		},
		methods: {
			back() {
				uni.navigateBack({
					url:'/pages/index/index',
				});
			},
			copyHuashu(content) {
				uni.setClipboardData({
					data: content,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '已复制到剪贴板'
								});
							}
						});
					}
				});
			}
		}
	}
</script>

<style scoped>
.navigation {
	height: 88px;
	background:rgba(35,105,230,1);
}
#root-view {
	flex-direction: column;
}
.status_bar {
    height: var(--status-bar-height);
    width: 100%;
	background:rgba(35,105,230,1);
}
.left {
	background-color: rgba(35,105,230,1);
	height:40px;
	align-items: center;
}
  
#huashu-title {
	margin-left:256rpx;
	
}
view, scroll-view {
	display: flex;
	box-sizing:border-box;
}
#content-view {
	display: flex;
	flex-direction: column;
	width:750rpx;
	align-items: center;
	align-content: center;
	justify-content: center;
	background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
}

.huashu-article {
	display: flex;
	flex-direction: column;
	width: 686rpx;
	background:rgba(255,255,255,1);
	margin-left:32rpx;
	margin-right:32rpx;
	border-radius:10px;
}

.huashu-article-first {
	margin-top:23px;
}

.huashu-line {
	margin-top:34rpx;
	margin-bottom:32rpx;
}
.huashu-sex,.huashu-copy-btn {
	margin-right:32rpx;
}

.huashu-sex {
	margin-left:32rpx;
}

.huashu-sex-image {
	max-width: 40rpx;
	max-height: 40rpx;
}

.huashu-copy-image {
	max-width: 32rpx;
	max-height: 32rpx;
}
.huashu-content {
	width:486rpx;
	margin-right:40rpx;
}

.huashu-content-text {
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
}
</style>
