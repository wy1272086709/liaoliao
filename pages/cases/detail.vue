<template>
	<view id="view-content" :style="'min-height:'+height+'px'">
		<view id="view-article">
			<rich-text :nodes="htmls"></rich-text>
		</view>
	</view>
</template>

<script>
	import parseHtml from '../../common/html_parse';
	import http from '../../common/http.js';
	export default {
		data() {
			return {
				htmls: '',
				title: '文章标题',
				height: 0,
			};
		},
		onLoad(option) {
			let cid = option.cid;
			let aid = option.id;
			
			this.getHuashuArticleView(cid, aid);
			// 设置view height
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.height = winHeight;
		},
		methods:{
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
					console.log('resp', resp);
					let title = resp.title;
					// 设置标题,
					uni.setNavigationBarTitle({
						title:title
					});
					// 解析html内容
					resp.content = resp.content.replace(/img/gi,'img style="width:100%;height:auto"');
					this.htmls = parseHtml(resp.content);
				});
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
	image {
		
	}
	#view-content {
		display: flex;
		width: 750rpx;
		justify-content: flex-start;
		flex-direction: column;
		background: linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
	}
	
	#view-article {
		margin-left:32rpx;
		margin-right:32rpx;
		width:686rpx;
		justify-content: center;
		align-items: center;
	}
</style>
