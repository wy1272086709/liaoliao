<template>
	<view id="view-content" :style="'min-height:'+height+'px'">
		<view id="title">
			<view class="title">
				<text style="font-weight: bold;">{{title}}</text>
			</view>
			<view style="flex-direction: row;">
				<view class="author">
					<text>{{author}}</text>
				</view>
				<view class="readtime">
					<text>{{readTime}}</text>
				</view>
			</view>
		</view>
		<view id="view-article">
			<rich-text :nodes="htmls"></rich-text>
		</view>
	</view>
</template>

<script>
	import parseHtml from '../../common/html_parse';
	import http from '../../common/http.js';
	import util  from '../../common/util.js';
	export default {
		data() {
			return {
				htmls: '',
				title: '文章标题',
				height: 0,
				readTime: '',
				cid: '',
				author: '',
			};
		},
		mounted() {
			
		},
		onLoad(option) {
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#ifdef MP-QQ
			if(option.is_share == 1) {
				uni.switchTab({
					url:'/pages/index/index'
				});
				return;
			}
			//#endif
			this.setIosBackground();
			console.log('onload options', option);
			let cid = option.cid;
			this.cid = cid;
			let aid = option.id;
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
			
			//#ifdef MP-QQ
			if(this.cid == 78) {
				path+="&is_share=1";
			}
			//#endif
			
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
				const url = apiPrefix + "?mod=news&ac=read";
				http.request(url, {
					auth: auth,
					cid: cid,
					id: aid
				}).then(resp => {
					//console.log('resp', resp);
					let title = resp.title;
					// 设置标题,
					uni.setNavigationBarTitle({
						title:title
					});
					this.title = resp.title;
					this.readTime = resp.readTime;
					// 解析html内容
					//console.log(resp.content);
					resp.content = resp.content.replace(/<img/gi,'<img style="width:100%;height:auto"');
					this.htmls = parseHtml(resp.content);
					//console.log(this.htmls);
				});
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	image {
		
	}
	#title {
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
		margin-top:10px;
		height: 48rpx;
		margin-right: 20px;
		background: rgba(231,243,255,1);
	}
	
	.readtime {
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
</style>
