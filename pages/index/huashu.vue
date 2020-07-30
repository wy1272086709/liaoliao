<template>
	<view>
	<view id="root-view" v-if="!isShowNoResult">
		<view id="search-view-box">
			<view id="search-view">
				<div id="search-view-text">
					<input id="search-text" type="text" placeholder="点击这里输入对方说的话" placeholder-class="search-class" v-model="searchKeyword" @confirm="searchKeywordFunc" />
				</div>
				<div id="search-view-icon" @tap="searchKeywordFunc()">
					<uni-icons type="search" :size="iconSize"></uni-icons>
				</div>
			</view>
			<view id="search-result" v-if="totalRows>0">
				<text>共搜索出 <text class="search-total-rows">{{totalRows}} </text>条记录</text>
			</view>
		</view>
		
		<view id="content-view" :style="'min-height:'+scrollHeight+'px;'">
			<view class="huashu-article huashu-article-first" v-for="item in articleList" :key="item.id">
				<view class="huashu-article-title">
					<text :class="searchText">{{item.title}}</text>
				</view>
				<view class="huashu-line" v-for="(line,key,index) in item.content" :key="line">
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
			<view style="height:23px;" v-if="level>1">
				
			</view>
			<template v-if="level<=1 && platForm<2">
				<view  class="user-upgrade-vip-view"  @tap="upgrade_vip">
					<button v-if="platForm==1" open-type="contact"  class="contact-btn" id="contact-btn-view">
						<img src="https://kuxou.com/images/user_upgrade_vip.png" class="user_upgrade_vip" />
					</button>
				</view>
			</template>
			<template v-if="level<=1 && platForm>=2">
				<view  class="user-upgrade-vip-view">
					<button v-if="platForm==2" open-type="contact"  class="contact-btn" id="contact-btn-view">
						<img src="../../static/img/user/ios_visit_vip.png" class="user_upgrade_vip"  />
					</button>
				</view>
			</template>
		</view>
		<!-- 这里 -->
	</view>
	
	<scroll-view id="root-view" v-if="isShowNoResult" :style="'height:'+contentHeight+'px;'">
		<view id="search-view-box">
			<view id="search-view">
				<div id="search-view-text">
					<input id="search-text" type="text" placeholder="点击这里输入对方说的话" placeholder-class="search-class" v-model="searchKeyword" @confirm="searchKeywordFunc" />
				</div>
				<div id="search-view-icon" @tap="searchKeywordFunc()">
					<uni-icons type="search" :size="iconSize"></uni-icons>
				</div>
			</view>
			<view id="search-result" v-if="totalRows>0">
				<text>共搜索出 <text class="search-total-rows">{{totalRows}} </text>条记录</text>
			</view>
		</view>
		<view id="search-result-view">
			<view id="search-result-header">
				<text class="search-result-suggest">没有找到搜索结果,您可以尝试以下方案</text>
			</view>
			<view class="search-result-title">
				<text>精简关键词</text>
			</view>
			<view>
				<text class="search-result-suggest">建议使用简单的关键词,比如说女生说【你吃晚饭了吗?】,搜索时输入【晚饭】即可。 \n  也可以尝试相近的关键词,比如【你想干嘛?】可以搜索【干嘛】、【干什么】等相近的搜索词。</text>
			</view>
			<view class="search-result-title">
				<text>去恋爱互助讨论区提问</text>
			</view>
			<view>
				<text class="search-result-suggest">去把您的诉求发布到互助讨论区,让大家帮您想办法回复。</text>
			</view>
			<view id="ask-btn-view" @tap="suggest">
				<button id="ask-btn">
					<text class="iconfont icon-tiwen icon-right"></text>
					<text class="tiwen-text">去提问</text>
				</button>
			</view>
		</view>
	</scroll-view>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
	import util  from '../../common/util.js';
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
				totalRows: '0',
				isShowNoResult: false,
				contentHeight: 0,
				platForm: 0,
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
				//console.log('userInfo:', this.$store.getters.userInfo);
				let userInfo = util.getUserInfoFromStorage();
				if (userInfo.level) {
					return userInfo.level;
				}
				if(this.$store.getters.userInfo.level) {
					return this.$store.getters.userInfo.level;
				} else {
					return 0;
				}
			},
			uid: function() {
				let userInfo = util.getUserInfoFromStorage();
				if (userInfo.uid) {
					return userInfo.uid;
				}
				if(this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				return 0;
			},
			scrollHeight: function() {
				let scrollHeight = 0;
				let sysinfo = uni.getSystemInfoSync();
				let windowHeight = sysinfo.windowHeight;
				if(getApp().globalData.isIphoneX) {
					windowHeight = windowHeight - 34;
				}
				// 长度为0,则高度变化为:
				if(this.articleList.length == 0 && this.isShowNoResult) {
					scrollHeight = windowHeight - 350;
				} else {
					//this.navigation.height = statusBarHeight;
					scrollHeight = windowHeight - 50;
				}
				return scrollHeight;
			}
		},
		onShareAppMessage() {
			//console.log('share....');
			let pages = getCurrentPages() //获取加载的页面
			let currentPage = pages[pages.length-1] //获取当前页面的对象
			let url = currentPage.route //当前页面url
			let options = currentPage.options;
			//console.log('options', options);
			let query = util.buidQuery(options);
			let title = options.title ? decodeURI(options.title): '"搜索结果"';
			return {
				title: title,
				path: url+"?"+query,
				success: function() {
					console.log('share success!');
				},
				fail: function() {
					console.log('share..sucess!');
				}
			};
		},
		watch:{
			
		},
		onPullDownRefresh() {
			//console.log('页面下拉刷新');
			
			let _self = this;
			isFixedHeight = false;
			_self.getHuashuArticleList();
			setTimeout(function() {				
				uni.stopPullDownRefresh();
			}, 100);
		},
		onLoad(option) {
			//console.log('option', option);
			this.setIosBackground();
			let sysinfo = uni.getSystemInfoSync();
			this.contentHeight = sysinfo.windowHeight;
			let title = option.title;
			// 获取keyword,
			let key  = option.keyword;
			navId = option.navId;
			if (key) {
				this.searchKeyword = key;
				// 判断从搜索框进入的。
				isSearch = true;
				uni.setNavigationBarTitle({
					title:'"搜索结果"'
				});
			}
			if(title) {
				title = decodeURIComponent(title);
				uni.setNavigationBarTitle({
					title:title
				});
			}
			this.platForm = getApp().globalData.platform;
			uni.startPullDownRefresh();
		},
		methods: {
			suggest() {
				uni.navigateTo({
					url:'/pages/user/complaint'
				});
			},
			setIosBackground() {
				if (getApp().globalData.platform == 2) {
					console.log('setIosBackgroundColor:');
					uni.setBackgroundColor({
						backgroundColorTop: "#2369E6", // 顶部窗口的背景色为蓝色
						backgroundColorBottom: "#15B9DA", // 底部窗口的背景色为绿
					});
				};
			},
			getHuashuArticleList() {
				let keyword = this.searchKeyword;
				//console.log('navId', navId);
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
					//console.log('resp', resp);
					if(resp.status == 1) {
						let articleData  = resp.data;
						this.articleList =  articleData;
						totalPage   = resp.totalpage;
						let t = parseInt(resp.total);
						this.totalRows = t;
						// 第一页显示完整
						// 第一页的多加几个...
						this.isShowNoResult = false;
					} else {
						this.articleList =  [];
						totalPage   = 0;
						this.totalRows = 0;
						if (keyword) {
							this.isShowNoResult = true;
							if (getApp().globalData.platform == 2) {
								console.log('setIosBackgroundColor:');
								uni.setBackgroundColor({
									backgroundColorBottom: "#17ACDC", // 底部窗口的背景色为绿
								});
							}
						}
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
				uni.setNavigationBarTitle({
					title:'"搜索结果"'
				});
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
					//console.log('resp', resp);
					if(resp.status == 1) {
						this.articleList = resp.data;
						totalPage   = resp.totalpage;
						let t = parseInt(resp.total);
						this.totalRows = t;
						// 第一页显示完整
						this.isShowNoResult = false;
					} else {
						this.articleList = [];
						this.totalRows = 0;
						this.isShowNoResult = true;
						if (getApp().globalData.platform == 2) {
							console.log('setIosBackgroundColor:');
							uni.setBackgroundColor({
								backgroundColorBottom: "#17ACDC", // 底部窗口的背景色为绿
							});
						}
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
				//console.log('content', content);
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
			let _self = this;
			if(isSearch && (!this.searchKeyword || this.searchKeyword.length<2)) {
				// 显示空数据给用户
				return;
			}
			//console.log('here!', this.level);
			if (nowpage>=totalPage && this.level>1) {
				console.log('here!');
				if (interval) {
					clearTimeout(interval);
				}
				if(nowpage == totalPage) {
					// 更改这里的
				}
				return;
			}
			
			if (this.level<=1) {
				let m = parseInt(this.totalRows);
				if(m<=10) {
					return;
				}
				// 最后一页应该加的元素个数
				if (interval) {
					clearTimeout(interval);
				}
				return;
			}
			uni.showLoading({
				title:"玩命加载中..."
			});
			interval = setTimeout(function() {
				nowpage++;
				if(_self.level<=1) {
					uni.hideLoading();
					return;
				}
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
					//console.log('resp', resp);
					if(resp.status == 1) {
						uni.hideLoading();
						let len = resp.data.length;
						for(let j = 0;j<len;j++) {
							_self.articleList.push(resp.data[j]);
						}
						//console.log(_self.articleList);
						totalPage   = resp.totalpage;
						this.totalRows = resp.total;
					} else {
						totalPage   = 0;
						this.totalRows = 0;
					}
				});
				uni.hideNavigationBarLoading();
			}, 400);
		}
	}
</script>

<style scoped>
@import url('../../static/css/huashu/iconfont.css');
::-webkit-scrollbar {
	display: none;
} 

#root-view {
	flex-direction: column;
	background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
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
	flex-direction: column;
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

#search-result {
	margin-left: 32rpx;
	margin-right: 32rpx;
	height:20px;
}
	
#search-result>text {
	font-size: 14px;
	font-family: PingFangSC-Regular,PingFang SC;
	font-weight: 400;
	color: rgba(51,51,51,1);
}

#content-view {
	display: flex;
	overflow-y: scroll;
	flex: 1;
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

.user_upgrade_vip {
	width:686rpx;
	height:100px;
}

.user-upgrade-vip-view {
	justify-content: center;
	margin-bottom:16px;
	margin-top:16px;
}

.searchText {
	font-weight: bold;
}

#search-result-view {
	margin-left: 32rpx;
	margin-right: 32rpx;
	display:flex;
	height: 300px;
	flex-direction:column;
	justify-content:center;
}

#search-result-header {
	justify-content: center;
	height:60px;
	align-items: center;
	margin-bottom: 10px;
	border-bottom: 1px solid rgba(179,179,179,1);
}

.search-result-title {
	margin-top: 20px;
	margin-bottom: 10px;
}

.search-result-title>text {
	font-size: 16px;
	font-family:PingFangSC-Regular,PingFang SC;
	color: rgba(255,255,255,1);
	font-weight: 600;
}

#ask-btn {
	display: flex;
	width: 100px;
	height: 30px;
	background-color: ;
	margin-left:0px;
	background-color: #EE597A;
	border-radius:20px;
	justify-content: center;
	align-items: center;
}

#ask-btn-view {
	margin-top:10px;
	justify-content: flex-start;
}

.icon-right{
	margin-right: 10px;
}

.tiwen-text {
	color: rgba(255,255,255,1);
	font-size: 24rpx;
}

.search-total-rows {
	color:rgba(255,255,255,1);
	font-weight: bold;
	margin-left: 5px;
	margin-right: 5px;
}

.search-result-suggest {
	font-size: 13px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight: 400;
	color: rgba(255,255,255,1);
}

#contact-btn-view {
	background: transparent;
	line-height: 1;
	padding-left: 0px;
	padding-right: 0px;
	display: flex;
}

</style>
