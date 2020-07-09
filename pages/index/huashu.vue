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
					<input id="search-text" type="text" placeholder="点击这里输入对方想说的话" placeholder-class="search-class" v-model="searchKeyword" @confirm="searchKeywordFunc" />
				</div>
				<div id="search-view-icon" @tap="searchKeywordFunc()">
					<uni-icons type="search" :size="iconSize"></uni-icons>
				</div>
			</view>
		</view>
		<view id="content-view" :style="'min-height:'+scrollHeight+'px;'">
			<view class="huashu-article huashu-article-first" v-for="item in articleList" :key="item.id">
				<view class="huashu-article-title">
					<text :class="searchText">{{item.title}}</text>
				</view>
				<view class="huashu-line" v-for="(line,key,index) in item.content">
					<view class="huashu-sex">
						<template v-if="line.split('@@')[0] == 1">
							<image class="huashu-sex-image" src="../../static/img/index/man.png"></image>
						</template>
						<template v-else>
							<image class="huashu-sex-image" src="../../static/img/index/female.png"></image>
						</template>
					</view>
					<view class="huashu-content">
						<text class="huashu-content-text">{{line.split('@@')[1]}}</text>
					</view>
					<view class="huashu-copy-btn" @tap="copyHuashu(line)">
						<image class="huashu-copy-image" src="../../static/img/index/copy.png"></image>
					</view>
				</view>
			</view>
			<view id="user-upgrade-vip-view" v-if="level<=1" @tap="upgrade_vip">
				<img src="https://kuxou.com/images/user_upgrade_vip.png" id="user_upgrade_vip" />
			</view>
		</view>
		<!-- 这里 -->
		
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
	let navId = 0;
	let nowpage = 1;
	let totalPage = 0;
	let isSearch = false;
	let interval = null;
	// 进入界面的
	let isFixedHeight = false;
	// 搜索的时候的
	let isFixedHeight2 = false;
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
				iconSize: 20,
				searchText: '',
				articleList: [ 
					
				]
			}
		},
		components: {
			tabBar:tabBar,
		},
		computed: {
			level: function() {
				console.log('userInfo:', this.$store.getters.userInfo);
				if(this.$store.getters.userInfo.level) {
					return this.$store.getters.userInfo.level;
				} else {
					return 0;
				}
			},
			uid: function() {
				if(this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				return 0;
			}
		},
		watch:{
			
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新');
			let _self = this;
			isFixedHeight = false;
			_self.getHuashuArticleList();
			setTimeout(function() {				
				uni.stopPullDownRefresh();
			}, 200);
		},
		onLoad(option) {
			console.log('option', option);
			let title = option.title;
			// 获取keyword,
			let key  = option.keyword;
			navId = option.navId;
			if (key) {
				this.searchKeyword = key;
				// 判断从搜索框进入的。
				isSearch = true;
			}
			if(title) {
				title = decodeURIComponent(title);
				uni.setNavigationBarTitle({
					title:title
				});
			}
			let sysinfo = uni.getSystemInfoSync();
			let windowHeight = sysinfo.windowHeight;
			if(getApp().globalData.isIphoneX) {
				windowHeight = windowHeight - 34;
			}
			//this.navigation.height = statusBarHeight;
			let scrollHeight = windowHeight - 50;
			this.scrollHeight = scrollHeight;
			uni.startPullDownRefresh();
		},
		methods: {
			getHuashuArticleList() {
				let keyword = this.searchKeyword;
				console.log('navId', navId);
				let classid = navId;
				let params = {};
				if (keyword) {
					params = { keyword: keyword };
				} else if (classid) {
					params.cid = classid;
				}
				params.uid = this.uid;
				params.nowpage = 1;
				// 搜索框搜索时候,将nowpage 置位1
				nowpage = 1;
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				params.auth = auth;
				let url = apiPrefix + "?mod=loveword&ac=list";
				if(keyword) {
					url = apiPrefix + "?mod=loveword&ac=search";
				}
				params.filterData = true;
				// 通过栏目获取话术列表接口
				http.request(url, params).then(resp=>{
					console.log('resp', resp);
					if(resp.status == 1) {
						let articleData  = resp.data;
						this.articleList =  articleData;
						totalPage   = resp.totalpage;
					}
				});
			},
			searchKeywordFunc() {
				// 调用搜索关键词接口...
				let keyword = this.searchKeyword;
				if(!keyword || keyword.length<2) {
					uni.showToast({
						title: '请输入关键词，且至少2个字符长度!',
						icon:"none",
						duration: 2000
					});
					return;
				}
				isFixedHeight = false;
				let params = {
					filterData:true
				};
				if (keyword) {
					params.keyword = keyword;
				}
				// 表示搜索框的结果...
				isSearch = true;
				params.uid = this.uid;
				params.nowpage = 1;
				this.params = params;
				// 通过关键词获取话术列表接口
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				params.auth = auth;
				const url = apiPrefix + "?mod=loveword&ac=search";
				http.request(url, params).then(resp=>{
					console.log('resp', resp);
					if(resp.status == 1) {
						this.articleList = resp.data;
						this.totalPage   = resp.totalpage;
					} else {
						uni.showToast({
							title: '未查询到结果',
							icon:"none",
							duration: 2000
						});
						this.articleList = [];
						return;
					}
				});
			},
			back() {
				uni.navigateBack({
					url:'/pages/index/index',
				});
			},
			upgrade_vip() {
				// 这里跳转到登录界面
				if(this.level<2) {
					console.log('go here!');
					uni.switchTab({
						url: '/pages/user/index'
					});
					return;
				}
				uni.navigateTo({
					url:'/pages/user/upgrade_user_vip'
				});
			},
			copyHuashu(line) {
				let content = line.split('@@')[1];
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
			console.log('reach');
			let _self = this;
			if(isSearch && (!this.searchKeyword || this.searchKeyword.length<2)) {
				// 显示空数据给用户
				return;
			}
			if (nowpage>=totalPage) {
				if (interval) {
					clearTimeout(interval);
				}
				let view = uni.createSelectorQuery().select("#content-view");
				if(!isFixedHeight && !isSearch  && this.uid>0) {
					view.boundingClientRect(data => {
						console.log('data:', data);
						_self.scrollHeight = data.height+20;
						isFixedHeight = true;
					}).exec();
				} else if(!isFixedHeight2 && isSearch && this.uid>0) {
					view.boundingClientRect(data => {
						_self.scrollHeight = data.height+20;
						isFixedHeight2 = true;
					}).exec();
				}
				return;
			}
			uni.showNavigationBarLoading();
			interval = setTimeout(function() {
				nowpage++;
				let params = {};
				params.nowpage = nowpage;
				params.cid = navId;
				params.uid = _self.uid;
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				params.auth = auth;
				let url = '';
				if(isSearch) {
					url = apiPrefix + "?mod=loveword&ac=search";
					params.keyword = _self.searchKeyword;
				} else {
					url = apiPrefix + "?mod=loveword&ac=list";
				}
				params.filterData = true;
				http.request(url, params).then(resp=>{
					console.log('resp', resp);
					if(resp.status == 1) {
						let len = resp.data.length;
						for(let j = 0;j<len;j++) {
							_self.articleList.push(resp.data[j]);
						}
						console.log(_self.articleList);
						totalPage   = resp.totalpage;
					}
				});
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
	margin-top:16px;
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
	margin-top:16px;
}
.searchText {
	font-weight: bold;
}
</style>
