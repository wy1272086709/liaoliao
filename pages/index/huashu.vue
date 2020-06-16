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
				<div id="search-view-text">
					<input id="search-text" type="text" placeholder="点击这里输入对方想说的话" placeholder-class="search-class" v-model="searchKeyword" />
				</div>
				<div id="search-view-icon" @tap="searchKeywordFunc()">
					<uni-icons type="search" :size="iconSize"></uni-icons>
				</div>
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
		<!-- 这里 -->
		<view id="user-upgrade-vip-view" v-if="level<=0" @tap="upgrade_vip">
			<img src="../../static/img/huashu/user_upgrade_vip.png" id="user_upgrade_vip" />
		</view>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
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
				navId: 0,
				isFixHeight: false,
				contentText: '加载更多',
				iconSize: 20,
				page: 1, 
				params: {},
				totalPage: 0,
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
		components: {
			tabBar:tabBar,
		},
		computed: {
			level: function() {
				if(this.$store.getters.userInfo.level) {
					return this.$store.getters.userInfo.level;
				} else {
					return -1;
				}
			}
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新');
			let _self = this;
			setTimeout(function() {
				_self.getHuashuArticleList();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(option) {
			console.log('option', option);
			let title = option.title;
			// 获取keyword,
			let key  = option.keyword;
			let navId = option.navId;
			if (key) {
				this.searchKeyword = key;
			}
			if(title) {
				title = decodeURIComponent(title);
				uni.setNavigationBarTitle({
					title:title
				});
			}
			if (navId) {
				this.navId = navId;
			}
			let sysinfo = uni.getSystemInfoSync();
			let windowHeight = sysinfo.windowHeight;
			if(getApp().globalData.isIphoneX) {
				windowHeight = windowHeight - 34;
			}
			//this.navigation.height = statusBarHeight;
			let scrollHeight = windowHeight - 50;
			this.scrollHeight = scrollHeight;
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		methods: {
			getHuashuArticleList() {
				let keyword = this.searchKeyword;
				let classid = this.navId;
				let params = {};
				if (classid) {
					params.classid = classid;
				}
				if (keyword) {
					params = { keyord: keyword };
				}
				params.page = 1;
				this.params = params;
				// 通过栏目获取话术列表接口
				http.request('', params).then(resp=>{
					console.log('resp', resp);
					if(resp.status == 1) {
						this.articleList = resp.data;
						this.totalPage   = resp.total;
					}
				});
			},
			searchKeywordFunc() {
				// 调用搜索关键词接口...
				let keyword = this.searchKeyword;
				let params = {};
				if (keyword) {
					params.keyword = keyword;
				}
				params.page = 1;
				this.params = params;
				// 通过关键词获取话术列表接口
				http.request('', params).then(resp=>{
					console.log('resp', resp);
					if(resp.status == 1) {
						this.articleList.push(resp.data);
						this.totalPage   = resp.total;
					}
				});
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
			upgrade_vip() {
				uni.navigateTo({
					url:'/pages/user/upgrade_user_vip'
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
			if(_self.page >=_self.totalPage) {
				console.log('最后一页!');
				// 获取DIV 的高度,然后加上scrollHeight
				// 计算组件的高度
				if(!_self.isFixHeight) {
					let view = uni.createSelectorQuery().select("#content-view");
					view.boundingClientRect(data => {
						_self.scrollHeight = data.height+16;
						_self.isFixHeight  = true;
					}).exec();
				}
				return;
			}
			let t = setTimeout(function() {
				_self.page++;
				_self.params.page = _self.page;
				http.request('', _self.params).then(resp=>{
					console.log('resp', resp);
					if(resp.status == 1) {
						_self.articleList.push(resp.data);
						_self.totalPage   = resp.total;
					}
				});
				/*_self.articleList.push({
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
				});*/
				uni.hideNavigationBarLoading();
			}, 200);
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
	background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
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

#search-view-text {
	width: 586rpx;
	height: 100%;
	justify-content: center;
	align-items: center;
}

#search-view-icon {
	width: 100rpx;
	height: 100%;
	justify-content: center;
	align-items: center;
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
	padding-right:32rpx;
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

#user_upgrade_vip {
	width:686rpx;
	height:100px;
	
}

#user-upgrade-vip-view {
	justify-content: center;
	margin-bottom:57px;
}
</style>
