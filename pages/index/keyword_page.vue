<template>
	<view id="root-view">
		<view id="search-view-box">
			<view id="search-view">								
				<input id="search-text" type="text" focus placeholder="点击这里输入对方说的话"  placeholder-style="align-items:center;" placeholder-class="search-class" v-model="keyword" @confirm="searchKeyword" />
				<view id="search-btn-view" @tap="searchKeyword()">
					<uni-icons type="search" size="20" :color="'#B2B2B2'"></uni-icons>
				</view>
			</view>
		</view>
		
		<view id="search-tags">
			<view id="seach-title">
				<text>大家都在搜</text>
			</view>
			<view id="search-keyword-box">
				<view v-for="(cnt,word, index) in searchKeywords" :key="word" class="keyword-btn" :style="'background-color:'+getIndexColor(index)+';'" 
				@tap="searchTagKeyword(word)">
					{{word}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	export default {
		data() {
			return {
				searchKeywords: [ 
				
				],
				keyword: '',
				backColor: ''
			}
		},
		onLoad() {
			this.getSearchKeyWord();
		},
		methods: {
			// 搜索关键词方法
			searchKeyword() {
				uni.navigateTo({
					url: '/pages/index/huashu?keyword='+this.keyword
				});
			},
			async getSearchKeyWord() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const url = apiPrefix+'?mod=loveword&ac=get_hot_keyword';
				const params = {
					auth: auth,
					filterData: true
				};
				const respData = await http.request(url, params);
				if(respData.status == 1) {
					this.searchKeywords = respData.data.all;
				}
			},
			searchTagKeyword(keyword) {
				uni.navigateTo({
					url: '/pages/index/huashu?keyword='+keyword
				});
			},
			getIndexColor(index) {
				let colorArr = ['#FF0000 ', '#FF7F00', '#A52A2A', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF']
				return colorArr[index%7];
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
#root-view {
	flex-direction: column;
}

#search-tags {
	width:686rpx;
	/*background:rgba(255,255,255,1);*/
	margin-left: 32rpx;
	margin-right: 32rpx;
	flex-direction: column;
}

#seach-title {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #131313;
	margin-top:10px;
	margin-bottom: 25px;
}

#search-view-box {
	width:750rpx;
	/*border-bottom: 1px solid #CCCCCC;*/
}

#search-view {
	width:686rpx;
	height:60rpx;
	padding-left: 10rpx;
	padding-right: 10rpx;
	/*background:rgba(255,255,255,1);*/
	background: #F3F3F3;
	border-radius: 30rpx;
	align-items: center;
	margin-left: 32rpx;
	margin-right: 32rpx;
	margin-top:25px;
}
#search-keyword-box {
	width:100%;
	justify-content: flex-start;
	flex-wrap: wrap;
}

.keyword-btn {
	padding-left:10px;
	padding-right:10px;
	height:20px;
	display: inline-block;
	line-height: 20px;
	/*flex-basis: 100rpx;*/
	/*justify-content: center;*/
	text-align: center;
	margin-right:50rpx;
	margin-bottom:20rpx;
	border-radius: 10px;
	/*align-items: center;*/
	font-size: 15px;
	opacity: 0.5;
	color:#FFFFFF;
	font-family: Microsoft YaHei !important;
}

#search-text {
	display: flex;
	height:80rpx;
	font-size:27rpx;
	font-family:SourceHanSansSC;
	font-weight:400;
	color:rgba(0,0,0,1);
	width:90%;
	margin-left:5px;
}

.search-class {
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #B2B2B2;
}

#search-btn-view {
	/*width:15%;*/
	justify-content: center;
}
</style>
