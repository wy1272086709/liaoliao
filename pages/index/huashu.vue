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
		<!-- 这里是状态栏 -->
		<!--
		<view class="status_bar">
			  
		</view>
		<view class="left">
			<uni-icons type="back" @tap="back()" :size="iconSize"></uni-icons>
			<text id="huashu-title">{{navigation.title}}</text>
		</view>
		->
		<!--  -->
		
		<view id="search-view-box">
			<view id="search-view">
				<input id="search-text" type="text" placeholder="点击这里输入对方想说的话" placeholder-class="search-class" v-model="searchKeyword" />
				<uni-icons type="search" :size="iconSize"></uni-icons>
			</view>
		</view>
		<view id="content-view" :style="'min-height:'+scrollHeight+'px;'">
			<view class="huashu-article huashu-article-first" v-for="item in articleList">
				<view class="huashu-article-title">
					<text>{{item.title}}</text>
				</view>
				<view class="huashu-line" v-for="line in item.list" :key="line.id">
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
					<view class="huashu-copy-btn" @tap="copyHuashu(line.content)">
						<image class="huashu-copy-image" src="../../static/img/index/copy.png"></image>
					</view>
				</view>
			</view>
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
				searchKeyword: "",
				navigation: {
					height: 88,
					top: 30,
					left:17,
					title: ""
				},
				isFixHeight: false,
				contentText: '加载更多',
				loadingType: 'more', //加载更多状态
				iconSize: 20,
				page: 1, 
				articleList: [ 
					{
						list:[
							{
								// 1男,2女,content 为对话内容
								id: 1,
								sex:1,
								content: "能不能和我拍个照"
							},
							{
								id: 2,
								sex:2,
								content: "为什么"
							}
						],
						title: "关于拍照"
					},
					{
						list:[
							{
								id: 3,
								// 1男,2女,content 为对话内容
								sex:1,
								content: "能不能和我拍个照"
							},
							{
								id: 4,
								sex:2,
								content: "为什么"
							}
						],
						title: "关于拍照"
					},
					{
						list:[
							{
								id: 5,
								// 1男,2女,content 为对话内容
								sex:2,
								content: "能不能和我拍个照"
							},
							{
								id: 6,
								sex:1,
								content: "为什么"
							}
						],
						title: '为什么呀!'
					},
					{	
						list:[
							{
								id: 7,
								// 1男,2女,content 为对话内容
								sex:1,
								content: "能不能和我拍个照"
							},
							{
								id: 8,
								sex:2,
								content: "为什么"
							}
						],
						title: "关于拍照"
					}
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
			// 获取keyword,
			let key  = option.keyword;
			this.searchKeyword = key;
			if(title) {
				title = decodeURIComponent(title);
				uni.setNavigationBarTitle({
					title:title
				});
			}
			let sysinfo = uni.getSystemInfoSync();
			let windowHeight = sysinfo.windowHeight;
			if(getApp().globalData.isIphoneX) {
				windowHeight = windowHeight - 68;
			}
			//this.navigation.height = statusBarHeight;
			let scrollHeight = windowHeight - 82 -50;
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
				this.articleList.push({
					list:[
						{
							id: 10,
							// 1男,2女,content 为对话内容
							sex:1,
							content: "能不能和我拍个照"
						},
						{
							id: 11,
							sex:2,
							content: "为什么"
						}
					],
					title: "关于拍照"
				});
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
									title: '复制成功'
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
				// 获取DIV 的高度,然后加上scrollHeight
				// 计算组件的高度
				if(!_self.isFixHeight) {
					let view = uni.createSelectorQuery().select("#content-view");
					view.boundingClientRect(data => {
						_self.scrollHeight = data.height+100;
						_self.isFixHeight  = true;
					}).exec();
				}
				_self.loadingType = 'nomore';
				return;
			}
			let t = setTimeout(function() {
				_self.articleList.push({
					list:[
						{
							id: 10,
							// 1男,2女,content 为对话内容
							sex:1,
							content: "能不能和我拍个照"
						},
						{
							id: 11,
							sex:2,
							content: "为什么"
						}
					],
					title: "关于拍照"
				});
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

#search-view{
	width:686rpx;
	height:40px;
	align-items: center;
	background-color: rgba(255,255,255, 1);
	margin-left: 32rpx;
	margin-right: 32rpx;
	margin-bottom: 10px;
	border-radius:4px 4px 4px 4px;
}

#search-view-box {
	width:750rpx;
	background-color: #2369E6;
}

.search-class {
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(170,170,170,1);
}

#search-text {
	display: inline-block;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(170,170,170,1);
	width:90%;
	margin-left:5px;
}
	
#content-view {
	display: flex;
	overflow-y: scroll;
	-webkit-overflow-scrolling:touch;
	flex-direction: column;
	width:750rpx;
	align-items: center;
	align-content: center;
	justify-content: flex-start;
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

.huashu-article-title{
	margin-top:10px;
	margin-left:32rpx;
	border-bottom: 1px dashed #2369E6;
	margin-right:32rpx;
}

.huashu-article-title>text {
	font-size: 16px;
	font-family: PingFangSC-Regular,PingFang SC;
	font-weight: 500;
	color: #2369E6;
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
	padding-left: 40rpx;
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
}

.huashu-content-text {
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
}

</style>
