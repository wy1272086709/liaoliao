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
			<block v-for="(item,index2) in articleList" :key="item.id">
				<!--
				<view class="huashu-link-view" v-if="index>0" >
					<view class="huashu-link" style="margin-bottom:-20rpx">
						<view class="huashu-link-left">
							<image src="../../static/img/index/link_down.png" class="huashu-link-icon"></image>
						</view>
						<view class="huashu-link-middle">
							
						</view>
						<view class="huashu-link-right">
							<image src="../../static/img/index/link_down.png" class="huashu-link-icon"></image>
						</view>
					</view>
				</view>
				-->
				<view class="huashu-article huashu-article-first">
					<!--
					<view class="huashu-article-title">
						<image src="../../static/img/index/love_icon.png" class="love-icon-class"></image>
						<text :class="searchText">{{item.title}}</text>
					</view>
					-->
					<view class="huashu-line" v-for="(line,key,index) in item.content" :key="getKey(index,index2)" @tap.stop="lineFunc(line, index2, index)">
						<view class="huashu-sex">
							<template v-if="line.split('@@')[0] == 1">
								<image class="huashu-sex-image" src="../../static/img/index/man.png"></image>
							</template>
							<template v-else>
								<image class="huashu-sex-image" src="../../static/img/index/famale.png"></image>
							</template>
						</view>
						<view class="huashu-content">
							<view class="huashu-content-text">
								<rich-text :nodes="parseHtmlNodes(line.split('@@')[1])"></rich-text>
							</view>
							<!--
							<rich-text class="huashu-content-text" :nodes="parseHtmlNodes(line.split('@@')[1])"></rich-text>
							-->
						</view>
						<view class="huashu-copy-btn" @tap="copyHuashu(line, index2, index)">
							<image class="huashu-copy-image" src="../../static/img/index/copy.png"></image>
						</view>
					</view>
				</view>
				<!---
				<view class="huashu-link-view" v-if="index!=(articleList.length-1)">
					<view class="huashu-link" style="margin-top:-20rpx;">
						<view class="huashu-link-left">
							<image src="../../static/img/index/link_up.png" class="huashu-link-icon"></image>
						</view>
						<view class="huashu-link-middle">
							
						</view>
						<view class="huashu-link-right">
							<image src="../../static/img/index/link_up.png" class="huashu-link-icon"></image>
						</view>
					</view>
				</view>
				-->
			</block>
			<view style="height:23px;" v-if="level>1">
				
			</view>
		</view>
		<!-- 这里 -->
	</view>
	
	<scroll-view id="root-view" v-if="isShowNoResult" :style="'height:'+contentHeight+'px;'">
		<view id="search-scroll-box">
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
					<view style="margin-bottom: 38rpx;">
						<text class="search-result-suggest">{{ suggestMsgText }}</text>
					</view>
					<view id="no-result-box">
						<text class="search-result-suggest">
							共搜索到 <text class="search-result-num">0</text> 条结果,您可以尝试以下方案
						</text>
					</view>
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
					<button class="ask-btn">
						<!--
						<text class="iconfont icon-tiwen icon-right"></text>
						-->
						<text class="tiwen-text">去提问</text>
					</button>
				</view>
			</view>
		</view>
	</scroll-view>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
	import util  from '../../common/util.js';
	import parseHtml from '../../common/html_parse.js';
	let navId = 0;
	let nowpage = 1;
	let totalPage = 0;
	let isSearch = false;
	let searchKeywordVal = '';
	// 限定用户第一次进入
	export default {
		data() {
			return {
				totalRows: '0',
				isShowNoResult: false,
				contentHeight: 0,
				platForm: 0,
				suggestMsgText: "",
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
			},
			level: function() {
				let userInfo = {};
				//#ifdef APP-PLUS || H5
				let type = util.cache('appLoginType', null);
				let userInfoStr = util.cache('app_user_info_'+type, null);
				userInfo    = userInfoStr ? JSON.parse(userInfoStr): {};
				//#endif
				
				//#ifdef MP-WEIXIN || MP-QQ
				userInfo = util.getUserInfoFromStorage();
				//#endif
				
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
				let uid = util.cache('app_userid', null);
				if (uid) {
					return uid;
				}
				if(this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				return 0;
			}
		},
		onHide() {
			
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
		created() {
			console.log('created....');
		},
		watch:{
			
		},
		onPullDownRefresh() {
			//console.log('页面下拉刷新');
			let _self = this;
			_self.getHuashuArticleList();
			setTimeout(function() {				
				uni.stopPullDownRefresh();
			}, 100);
		},
		onUnload() {
			//navId = 0;
			// 卸载当前变量...,按照道理,清空了.
			//console.log('navId:',navId,'nowpage:', nowpage);
		},
		onLoad(option) {
			console.log('ONload!....');
			console.log('option', option);
			//#ifdef MP-WEIXIN  || MP-QQ
			this.setIosBackground();
			//#endif
			let sysinfo = uni.getSystemInfoSync();
			this.contentHeight = sysinfo.windowHeight;
			let title = option.title;
			// 获取keyword,
			let key  = option.keyword;
			navId = option.navId;
			console.log('key', key);
			if (key) {
				this.searchKeyword = searchKeywordVal = key;
				// 判断从搜索框进入的。
				isSearch = true;
				uni.setNavigationBarTitle({
					title:'"搜索结果"'
				});
			} else {
				isSearch = false;
				searchKeywordVal = '';
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
			getKey(index, index2) {
				return index+'_'+index2;
			},
			//#ifdef MP-QQ
			copy_customer_qq() {
				let qq = '3342315151';
				uni.setClipboardData({
					data: qq,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showModal({
									title: '提示',
									content: '复制QQ号成功,请前往添加好友',
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success() {
										
									}
								});
							}
						});
					}
				});
			},
			//#endif
			parseHtmlNodes(content) {
				const str = '<div style="float:left;">'+'*'.repeat(8)+'</div>'+'<div style="float:left;"> 解锁更多 </div>'+'<div style="float:left;">'+'*'.repeat(8)+'</div>';
				const regexp = /hidden/gi;
				content = content.replace(regexp, str, content);
				if(!isSearch) {
					return content;
				}
				let t = parseHtml(content);
				return t;				
			},
			suggestMsg() {
				let Arr = [
					'未搜索到结果', '好的文案还在酝酿中,敬请期待', '编辑还在赶来的路上'
				];
				console.log('Math.random()', Math.random());
				let s = parseInt(Math.random()*3);
				return Arr[s];
			},
			suggest() {
				let url = '/pages/user/complaint';
				//#ifdef MP-WEIXIN || MP-QQ
				url = '/pages/user/complaint';
				//#endif
				
				// 后面改成脑洞广场地址...
				//#ifdef APP-PLUS || H5
				url = '/pages/mind_square/publish';
				//#endif
				
				uni.navigateTo({
					url:url
				});
			},
			setIosBackground() {
				if (getApp().globalData.platform == 2) {
					console.log('setIosBackgroundColor:');
					if(typeof wx.setBackgroundColor == 'function') {
						wx.setBackgroundColor({
							backgroundColor: "#FFFFFF", // 顶部窗口的背景色为蓝色
							backgroundColorBottom: "#FFFFFF", // 底部窗口的背景色为绿
						});
					}
				};
			},
			getHuashuArticleList() {
				let keyword = this.searchKeyword;
				//console.log('navId', navId);
				let classid = navId;
				let params = {
					version:'v2'
				};
				if (keyword) {
					params = { keyword: keyword };
				} else if (classid) {
					params.cid = classid;
				}
				params.uid = this.uid;
				params.nowpage = 1;
				// 搜索框搜索时候,将nowpage 置位1
				nowpage = 1;
				console.log('huashu params:', params);
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
						this.suggestMsgText = this.suggestMsg();
						this.articleList =  [];
						totalPage   = 0;
						this.totalRows = 0;
						if (keyword) {
							this.isShowNoResult = true;
							if (getApp().globalData.platform == 2) {
								uni.setBackgroundColor({
									backgroundColor: "#2369E6", // 底部窗口的背景色为绿
								});
							}
						}
					}
				});
			},
			searchKeywordFunc() {
				// 调用搜索关键词接口...
				let keyword = this.searchKeyword;
				searchKeywordVal = keyword;
				if(!keyword || keyword.length<1) {
					uni.showToast({
						title: '请输入关键词，且至少1个字符长度!',
						icon:"none",
						duration: 2000
					});
					return;
				}
				uni.setNavigationBarTitle({
					title:'"搜索结果"'
				});
				let params = {
					filterData:true,
					version: 'v2'
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
						this.suggestMsgText = this.suggestMsg();
						this.articleList = [];
						this.totalRows = 0;
						this.isShowNoResult = true;
						if (getApp().globalData.platform == 2) {
							//console.log('setIosBackgroundColor:');
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
				if(this.level == 0) {
					//console.log('go here!');
					uni.switchTab({
						url: '/pages/user/user_index'
					});
					return;
				}
				
				
				if(this.platForm == 1) {
					uni.navigateTo({
						url:'/pages/user/upgrade_user_vip_new'
					});
					return;
				}
				
				//#ifdef APP-PLUS || H5
				if(this.platForm == 2) {
					uni.showModal({
						title: '提示',
						content: '请联系客服!',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
					});
				}
				//#endif
			},
			copyHuashu(line, index2, index) {
				// 第三段,同时,不是第一句,则弹框，提示用户去升级
				if(index2>=3 && index>=1 && this.level<=1) {
					let title = '';
					let url   = '';
					if(this.uid>0) {
						title = '请充值/续费VIP';
						url   = '/pages/user/upgrade_user_vip_new';
					} else {
						title = '请先登录';
						url   = '/pages/user/login_v2';
					}
					uni.showToast({
						icon:'none',
						title: title,
						duration:500,
						complete() {
							uni.navigateTo({
								url:url
							});
						}
					})
					return;
				}
				let content = line.split('@@')[1];
				content = content.replace(/<span style='(.*?)'>(.*?)<\/span>/, "$2");
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
			},
			lineFunc(line, index2, index) {
				this.copyHuashu(line, index2, index);
			}
		},
		onReachBottom() {
			let _self = this;
			if(getApp().globalData.level<=1) {
				return;
			}
			//console.log('nowpage', nowpage);
			//console.log('here!', getApp().globalData.level);
			if (nowpage>=totalPage) {
				if(nowpage == totalPage) {
					// 更改这里的
				}
				return;
			}
			uni.showLoading({
				title:"玩命加载中..."
			});
			setTimeout(function() {
				nowpage++;
				let params = {
					version: 'v2'
				};
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
					params.keyword = searchKeywordVal;
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
						uni.hideLoading();
						totalPage   = 0;
						this.totalRows = 0;
					}
				});
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
	background-color: #FFFFFF;
	
	
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #616161;
}

view, scroll-view {
	display: flex;
	box-sizing:border-box;
}

#search-view{
	width:690rpx;
	height:60rpx;
	background: #F3F3F3;
	border-radius: 30rpx;
	align-items: center;
	margin-left: 30rpx;
	margin-right: 30rpx;
	margin-top:40rpx;
	margin-bottom: 37rpx;
}

#search-view-box {
	flex-direction: column;
	width:750rpx;
	/*padding-top:16px;*/
}

#search-scroll-box {
	flex-direction: column;
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
	display: flex;
	width: 586rpx;
	height: 100%;
	justify-content: center;
	align-items: center;
}

#search-view-icon {
	display: flex;
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
	font-size:25rpx;
	font-family:FZLTHJW;
	font-weight:normal;
	color:rgba(42,42,42,1);
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
	background-color: #F2F2F2;
	margin-left:32rpx;
	margin-right:32rpx;
	border-radius:19rpx;
	padding-bottom: 20rpx;
	margin-bottom: 60rpx;
	box-sizing:content-box;
}
.jiacu {
	font-weight: bold;
	color: rgba(233,206,147,1);
}

.huashu-article-title{
	background:linear-gradient(124.1678deg,rgba(247,237,215,1) 0%,rgba(233,206,147,1) 100%);
	border-top-left-radius:19rpx;
	border-top-right-radius:19rpx;
	height: 85.5rpx;
	font-size:26rpx;
	font-family:Microsoft YaHei;
	font-weight:400;
	justify-content: center;
	align-items: center;
	color:rgba(136,94,36,1);
}

.huashu-link-middle {
	width:580rpx;
}

.huashu-link-view {
	height: 15rpx;
}

.huashu-link {
	z-index:1000001;
}

.huashu-link-icon {
	max-width: 20rpx;
	max-height: 36rpx;
}

.love-icon-class {
	max-width: 24.5rpx;
	max-height: 24.5rpx;
	margin-right:6rpx;
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
	font-size:23.5rpx;
	font-family:SourceHanSansSC;
	font-weight:400;
	color:rgba(136,94,36,1);
}

.user_upgrade_vip {
	width:686rpx;
	height: 212.86rpx;
}

.user-upgrade-vip-view {
	justify-content: center;
	margin-bottom:16px;
	margin-top:16px;
	margin-left: 32rpx;
	margin-right: 32rpx;
}

.searchText {
	font-weight: bold;
}

#search-result-view {
	margin-left: 32rpx;
	margin-right: 32rpx;
	display:flex;
	/*height: 300px;*/
	flex-direction:column;
	justify-content:center;
}

#search-result-header {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height:60px;
	align-items: center;
	/*margin-bottom: 10px;*/
	padding-bottom: 21rpx;
	border-bottom: 2px solid #F1F0F0;
}

.search-result-title {
	margin-top: 20px;
	margin-bottom: 10px;
}

.search-result-title>text {
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #333333;
}

.ask-btn {
	display: flex;
	width: 120rpx;
	height: 60rpx;
	background: #C3AEFF;
	border-radius: 30rpx;
	padding-left: 0px;
	padding-right: 0px;
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
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
}

.search-total-rows {
	color: rgb(27, 26, 26);
	font-weight: bold;
	margin-left: 5px;
	margin-right: 5px;
}

.search-result-suggest {
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #616161;
}

.search-result-num {
	color: #A88FEF;
	margin-left:10rpx;
	margin-left:10rpx;
}

#contact-btn-view,.contact-btn  {
	background: transparent;
	line-height: 1;
	padding-left: 0px;
	padding-right: 0px;
	display: flex;
}

</style>
