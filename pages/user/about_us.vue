<template>
	<view>
		<view id="about-us-content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	import parseHtml from '../../common/html_parse';
	import http from '../../common/http.js';
	
	export default {
		data() {
			return {
				title: "",
				content: ''
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN || MP-QQ
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#endif
			this.getAboutUs();
		},
		methods: {
			getAboutUs()
			{
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let url = apiPrefix+"?mod=about";
				http.request(url, {
					auth:auth,
					filterData: true,
				}).then(resp => {
					console.log('resp', resp);
					if(resp.status == 1) {
						this.title   = resp.title;
						this.content = parseHtml(resp.content);
					}
				});
			}
		}
	}
</script>

<style>
#about-us-content {
	margin-left: 32rpx;
	margin-right: 32rpx;
	margin-top:20px;
}
</style>
