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
			<uni-icons type="back" @tap="back()" :size="iconSize"></uni-icons>
			<text id="huashu-title">{{navigation.title}}</text>
		</view>
		<!--  -->
		<view id="content-view" :style="'min-height:'+scrollHeight+'px;'">
			<view class="huashu-article huashu-article-first" v-for="item in articleList" >
				<view class="huashu-line" v-for="line in item">
					<view class="huashu-sex">
						<template v-if="line.sex == 1">
							<image class="huashu-sex-image" src="../../static/img/index/man.png"></image>
						</template>
						<template v-else>
							<image class="huashu-sex-image" src="../../static/img/index/female.png"></image>
						</template>
					</view>
					<view class="huashu-content">
						<text class="huashu-content-text">{{line.content}}</text>
					</view>
					<view class="huashu-copy-btn">
						<image class="huashu-copy-image" src="../../static/img/index/copy.png" @tap="copyHuashu(line.content)"></image>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
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
				},
				contentText: '加载更多',
				loadingType: 'more', //加载更多状态
				iconSize: 20,
				page: 1,
				articleList: [
					[
						{
							// 1男,2女,content 为对话内容
							sex:1,
							content: "能不能和我拍个照"
						},
						{
							sex:2,
							content: "为什么"
						}
					],
					[
						{
							// 1男,2女,content 为对话内容
							sex:2,
							content: "能不能和我拍个照"
						},
						{
							sex:1,
							content: "为什么"
						}
					],
					[
						{
							// 1男,2女,content 为对话内容
							sex:1,
							content: "能不能和我拍个照"
						},
						{
							sex:2,
							content: "为什么"
						}
					],
					[
						{
							// 1男,2女,content 为对话内容
							sex:2,
							content: "能不能和我拍个照"
						},
						{
							sex:1,
							content: "为什么"
						}
					]
				]
			}
		},
		onPullDownRefresh:function(){
			this.getArticleList();
		},
		components: {
			tabBar:tabBar,
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
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
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		methods: {
			getArticleList() {
				
			},
			lower() {
				console.log('拉倒底部,加载下一页....');
				this.articleList.push([
					{
						// 1男,2女,content 为对话内容
						sex:1,
						content: "能不能和我拍个照"
					},
					{
						sex:2,
						content: "为什么"
					},
					{
						// 1男,2女,content 为对话内容
						sex:1,
						content: "能不能和我拍个照"
					},
					{
						sex:2,
						content: "为什么"
					}
				]);
			},
			back() {
				uni.navigateBack({
					url:'/pages/index/index',
				});
			},
			copyHuashu(content) {
				console.log('content', content);
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
		},
		onReachBottom() {
			console.log("上滑动");
			uni.showNavigationBarLoading();
			console.log('reach');
			let _self = this;
			if(_self.page > 3) {
				console.log('page');
				_self.loadingType = 'nomore';
				return;
			}
			let t = setTimeout(function() {
				_self.articleList.push([
					{
						// 1男,2女,content 为对话内容
						sex:1,
						content: "能不能和我拍个照"
					},
					{
						sex:2,
						content: "为什么"
					}
				]);
				_self.page++;
				uni.hideNavigationBarLoading();
			}, 500);
			// more = contentdown: "上拉显示更多",
			// loading =contentrefresh: "正在加载...",
			// nomore = contentnomore: "没有更多数据了"
		    // 在此进行上拉刷新的业务逻辑
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
