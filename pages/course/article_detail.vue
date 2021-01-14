<template>
	<view id="view-content" :style="'min-height:'+height+'px'">
		<view id="title">
			<view class="title">
				<text style="font-weight: bold;">{{title}}</text>
			</view>
			<view style="display:flex;flex-direction: row;">
				<view class="author">
					<text>{{author}}</text>
				</view>
				<view class="readtime">
					<text>{{readTime}}</text>
				</view>
			</view>
		</view>
		<view id="view-article" class="u-content">
			<!--
			<rich-text :nodes="htmls"></rich-text>
			-->
			<u-parse :html="htmls"></u-parse>
		</view>
		
		<view id="bottom">
			<view id="article-bottom" @tap="thumbup">
				<u-icon name="thumb-up" :color="sfsc?'#FF3300':'#A6A6A6'" size="40" style="margin-right:17rpx;"></u-icon>
				<text>{{ wzsccs }}</text>
			</view>
		</view>
		
		<!--
		<view id="article-previous-next">
			<view id="previous-view" @tap="gotoPrev">
				<view  class="article-link">上一篇: {{prevTitle ? prevTitle: '无'}}</view>
			</view>
			<view id="next-view" @tap="gotoNext">
				<view  class="article-link">
				下一篇: {{nextTitle ?nextTitle: '无'}}
				</view>
			</view>
		</view>
		-->
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util  from '../../common/util.js';
	//import event from '../../common/event.js';
	let nid;
	let isRequestFinished = 0;
	export default {
		data() {
			return {
				htmls: '',
				title: '',
				height: 0,
				readTime: '',
				cid: '',
				sfsc: '',
				wzsccs: '',
				author: '',
				/*prevTitle: '',
				nextTitle: '',
				prevHref: '',
				nextHref: '',*/
			};
		},
		mounted() {
			
		},
		computed:{
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			}
		},
		components:{
			
		},
		onLoad(option) {		
			console.log('onload options', option);
			let cid = option.cid;
			this.cid = cid;
			let aid = option.id;
			nid = aid;
			let articleTitle = option.title;
			this.author = articleTitle;
			this.getHuashuArticleView(cid, aid);
			// 设置view height
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.height = winHeight;
		},
		onShareAppMessage() {
			console.log('share....');
			let path = this.getPagePath();
			let title= this.getTitle();
			return {
				title: title,
				path: path,
				success: function() {
					console.log('share success!');
				},
				fail: function() {
					console.log('share..sucess!');
				}
			};
		},
		methods:{
			authLogin() {
				const uid = this.uid;
				if (!uid) {
					return false;
				}
				return true;
			},
			async thumbup() {
				/*const func = event.throttle(()=> {
					this.priseFunc();
				}, 1000, true);
				await func();*/
				this.priseFunc();
			},
			async priseFunc() {
				if(isRequestFinished!=0) {
					return;
				}
				const isLogin = this.authLogin();
				if(!isLogin) {
					uni.showToast({
						icon:'none',
						title:'请先登录',
						complete() {
							uni.navigateTo({
								url: '/pages/user/login_v2'
							});
						}
					});
					return;
				}
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const type = 1 - this.sfsc;
				const params = {
					uid: this.uid,
					auth: auth,
					nid: nid,
					type: type,
					filterData: true
				};
				//?mod=news&ac=wz_sc
				const url = apiPrefix+'?mod=product&ac=dz_insert';
				const respData = await http.request(url, params);
				if(respData.status == 1) {
					this.wzsccs = respData.dzcs;
					this.sfsc   = 1- this.sfsc;
					isRequestFinished = 1;
					setTimeout(()=> {
						isRequestFinished = 0;
					}, 1300);
				}
			},
			getTitle() {
				let pages = getCurrentPages() //获取加载的页面
				let currentPage = pages[pages.length-1] //获取当前页面的对象
				let options = currentPage.options;
				return options.title;
			},
			getPagePath()
			{
				let pages = getCurrentPages() //获取加载的页面
				let currentPage = pages[pages.length-1] //获取当前页面的对象
				let url = currentPage.route //当前页面url
				let options = currentPage.options;
				let query = util.buidQuery(options);
				//console.log('query', query);
				let path = "/"+url+"?"+query;
				return path;
			},
			setIosBackground() {
				if (getApp().globalData.platform == 2) {
					console.log('setIosBackgroundColor:');
					uni.setBackgroundColor({
						backgroundColorTop: "#FFFFFF", // 顶部窗口的背景色为蓝色
						backgroundColorBottom: "#FFFFFF", // 底部窗口的背景色为绿
					});
				}
			},
			getHuashuArticleView(cid, aid)
			{
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=product&ac=read";
				http.request(url, {
					auth: auth,
					version: 'v2',
					nid: aid,
					uid: this.uid
				}).then(resp => {
					//console.log('resp', resp);
					let title = resp.title;
					// 设置标题,
					uni.setNavigationBarTitle({
						title:title
					});
					this.title = resp.title;
					this.readTime = resp.pubdate;
					this.sfsc = resp.sfdz;
					this.wzsccs = resp.dzcs;
					this.author = resp.categoryname;
					// 解析html内容
					// console.log(resp.content);
					//resp.content = resp.content.replace(/<img/gi,'<img style="width:100%;height:auto"');
					this.htmls = resp.content;
					//console.log('this.htmls :', this.htmls);
				});
			},
		
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	
	image {
		
	}
	#title {
		display: flex;
		flex-direction: column;
		margin-left:32rpx;
		margin-right:32rpx;
		margin-top: 10px;
		margin-bottom: 20px;
	}
	
	.title>text {
		font-size:24px;
		font-family:"Microsoft YaHei";
		color:rgba(51,51,51,1);
	}
	
	.author {
		display: flex;
		margin-top:10px;
		height: 48rpx;
		margin-right: 20px;
		background: rgba(231,243,255,1);
	}
	
	.readtime {
		display: flex;
		margin-top: 10px;
		height: 48rpx;
	}
	
	.readtime>text {
		font-size: 16px;
		font-family: "Microsoft YaHei";
		color:rgba(179, 179, 179, 1);
	}
	
	#view-content {
		display: flex;
		width: 750rpx;
		justify-content: flex-start;
		flex-direction: column;
		background: rgba(255,255,255,1);
	}
	
	#view-article {
		margin-left:32rpx;
		margin-right:32rpx;
		width:686rpx;
		overflow-x: hidden;
		justify-content: center;
		align-items: center;
		word-break: break-all;
	}
	
	.author>text {
		color:blue;
		font-size:18px;
		font-family:"Microsoft YaHei";
		font-weight:400;
	}
	
	#view-article text {
		font-size:18px;
		font-family:"Microsoft YaHei";
		font-weight:400;
	}
	
	#bottom {
		display: flex;
		justify-content: center;
		margin-top:20px;
	}
	#article-bottom {
		display: flex;
		margin-bottom: 20px;
		justify-content: center;
		align-items: center;
		width: 180rpx;
		height: 80rpx;
		background: #F3F3F3;
		border-radius: 40rpx;
		
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #A6A6A6;
	}
	
	#article-previous-next {
		display: flex;
		justify-content: space-between;
		margin-left: 30.01rpx;
		margin-right: 29rpx;
		padding-bottom: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		
		
		color: #626262;	
	}
	
	#previous-view {
		display: flex;
		height: 60rpx;
		background: #F3F3F3;
		align-items: center;
		justify-content: center;
	}
	
	.article-link {
		
		display: display;
		width:330rpx;
		padding-left:15.01rpx;
		padding-top:16rpx;
		margin-bottom: 17rpx;
		
		overflow:hidden;
		
		/*height: 60px;*/
		// 超出省略号...
		text-overflow:ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #A3A3A3;
	}
	
	#next-view {
		display: flex;
		height: 60rpx;
		align-items: center;
		justify-content: center;
		background: #F3F3F3;
	}
</style>
