<template>
	<view id="root-view">
		<view id="result-box">
			<view id="result">
				<text>{{result }}</text>
			</view>
			
			<view id="detail">
				<text>{{ detail }}</text>
			</view>
		</view>
		<view id="bottom">
			<view class="testing-stat-button common-font" @tap="gotoTestingList">
				<view>测一测列表</view>
			</view>
			<view class="testing-stat-button common-font" @tap="gotoTesting">
				<view>重新测试</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import http from '../../common/http.js';
	let nid = '';
	export default {
		data() {
			return {
				result: '',
				detail: ''
			}
		},
		computed: {
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			}
		},
		onLoad(option) {
			nid = option.nid;
			this.getQuestionResult(nid);
		},
		methods: {
			async getQuestionResult(nid) {
				const answerStr = util.cache('testing_select_answer', null);
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					auth: auth,
					uid: this.uid,
					nid: nid,
					filterData: true
				};
				if(answerStr) {
					params.zuhe = answerStr;
				}
				const route = '?mod=cyc&ac=cs_tj';
				const url  = apiPrefix + route;
				const resp = await http.request(url, params);
				if(resp.status == 1) {
					this.result = resp.data.answer_title;
					this.detail = resp.data.answer_content;
				}
			},
			gotoTesting() {
				const titleStr = util.cache('testing_title', null);
				uni.redirectTo({
					url:'/pages/index/testing_questions?nid='+nid+'&title='+titleStr
				});
			},
			gotoTestingList() {
				uni.redirectTo({
					url:'/pages/index/testing'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
#root-view {
	display: flex;
	flex-direction: column;
	margin-left:30rpx;
	margin-right:30rpx;
	background: #FFFFFF;
	margin-top:60rpx;
	padding-left: 31rpx;
	padding-right: 31rpx;
	#result-box  {
		border-radius: 20rpx;
		word-break:break-all; 
		width:628rpx;
		#result {
			display: flex;
			margin-top:51rpx;
			margin-bottom: 47rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #343434;
		}
		
		#detail {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #343434;
		}
	}
	#bottom {
		display: flex;
		justify-content: space-between;
		margin-top:58rpx;
		margin-bottom: 54rpx;
		.testing-stat-button {
			display: flex;
			width:180rpx;
			height:60rpx;
			border: 1px solid #A88FEF;
			border-radius: 30rpx;
			justify-content: center;
			align-items: center;
			padding-left:0px;
			padding-right:0px;
		}
	}
}

.common-font {
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #A88FEF;
}


</style>
