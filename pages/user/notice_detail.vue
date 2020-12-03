<template>
	<view id="root-view">
		
		<view id="view-article">
			<!--
			<rich-text :nodes="htmls"></rich-text>
			-->
			<u-parse :html="htmls"></u-parse>
		</view>
		<view class="top-view">
			<view class="readtime">
				<text>{{readTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import http from '../../common/http.js';
	
	export default {
		data() {
			return {
				htmls: '<p>我那个去!</p>',
				readTime: ''
			};
		},
		nid: '',
		index: '',
		onLoad(option) {
			const nid = option.nid;
			this.nid  = nid;
			this.index = option.index;
			this.getNoticeDetail();
		},
		methods:{
			async getNoticeDetail() {
				let data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const url = apiPrefix+'?mod=tz&ac=read';
				const params = {
					auth: auth,
					nid: this.nid
				};
				// 获取到的data 下的内容
				const resp = await http.request(url, params);
				if (resp.title) {
					uni.setNavigationBarTitle({
						title:resp.title,
						complete() {
							
						}
					})
					this.title = resp.title;
				}
				if (resp.content) {
					this.htmls = resp.content;
				}
				if (resp.pubdate) {
					this.readTime = resp.pubdate;
				}
				this.updateNoticeStat();
			},
			updateNoticeStat() {
				// 这里设置当前消息已读
				const k = 'notice_list';
				const listStr = util.cache(k, null);
				const list    = listStr ? JSON.parse(listStr): [];
				// 设置已读
				if(list[this.index].isRead == 1) {
					return;
				}
				list[this.index].isRead = 1;
				// 写入缓存...
				const newListStr = JSON.stringify(list);
				util.cache(k, newListStr);
				
				// 更新未读数字
				const unReadCnt = util.cache('notice_unread_cnt', null);
				// unreadCnt
				let n = parseInt(unReadCnt);
				if(n>0) n--;
				util.cache('notice_unread_cnt', n+"");
			}
		}
	}
</script>

<style lang="scss">
#root-view {
	display: flex;
	flex-direction: column;
	.top-view {
		
		margin-bottom: 20px;
		margin-left: 32rpx;
		margin-right: 32rpx;
		.title {
			font-weight: 600;
			font-size: 32rpx;
			font-family: PingFang SC;
			text-align: center;
		}
		.readtime {
			
			text-align: right;
		}
	}
	#view-article {
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-top: 45rpx;
		margin-bottom: 40px;
		display: flex;
		
	}
}
</style>
