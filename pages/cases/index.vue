<template>
	<view id="root-view">
		<view id="header-view">
			<view  :class="last_update_class" id="last_update" @tap="switchTab('last_update')">
				<text>最近更新</text>
			</view>
			<view :class="love_skills_class" id="love_skills" @tap="switchTab('love_skills')">
				<text>撩妹技巧</text>
			</view>
			<view :class="girl_area_class" id="girl_area"  @tap="switchTab('girl_area')">
				<text>女生专区</text>
			</view>
		</view>
		
		<view id="content-view"  :style="'min-height:'+scrollHeight+'px;bottom:'+bottom+'px;'">
			<view v-for="item in list" class="content-root-view" @tap="getArticleView(item.id)" :key="item.id">
				<view class="content-img-view">
					<image :src="item.thumbUrl" class="thumb-class"></image>
				</view>
				<view class="content-titleinfo-view">
					<view class="content-title-view">
						<text>{{item.title}}</text>
					</view>
					<view class="content-stats-view">
						<text>{{item.readTime}} 阅读 {{item.readNum}}</text>
					</view>
				</view>
			</view>
		</view>
		<tabBar></tabBar>
		<scorll-view>
		     <view style="height:34px;" v-if="isIphoneX">
				
			 </view>
		</scorll-view>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	let list = [{
		id: 1,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 2,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 3,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 4,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 5,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 6,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 7,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 8,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 9,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}, {
		id: 10,
		thumbUrl: '/static/img/love_skills/thumb.png',
		title: '套路女朋友的多种方法，全程高能',
		readTime: '4.28 18:00',
		readNum: '2.77万'
	}];
	export default {
		data() {
			return {
				tabName: 'last_update',
				last_update_class: 'last_update border-active',
				love_skills_class: 'love_skills',
				girl_area_class: 'girl_area',
				list: list,
				page: 1,
				interval: null,
				isIphoneX: false,
				scrollHeight: 0,
				bottom: 0,
				winHeight: 0,
			}
		},
		onLoad() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			let isIphoneX = getApp().globalData.isIphoneX;
			this.isIphoneX = isIphoneX;
			this.bottom = 82;
			if (isIphoneX) {
				this.winHeight    = winHeight - 34;
				this.bottom = this.bottom+34; 
			} 
			this.scrollHeight = this.winHeight - 82 - 50;
		},
		mounted() {
			
		},
		components:{
			tabBar:tabBar
		},
		beforeDestroy() {
			this.interval || clearTimeout(this.interval);
		},
		onReachBottom() {
			console.log('reach bottom!');
			let _self = this;
			if(this.page>3) {
				clearTimeout(this.interval);
				if (!_self.isFixHeight) {
					let view = uni.createSelectorQuery().select("#content-view");
					view.boundingClientRect(data => {
						console.log('data:', data);
						_self.scrollHeight = data.height+20;
						_self.isFixHeight  = true;
					}).exec();
				}
				return;
			}
			this.interval = setTimeout(function() { 
				_self.list.push({
					id: 11,
					thumbUrl: '/static/img/love_skills/thumb.png',
					title: '套路女朋友的多种方法22222',
					readTime: '4.28 18:00',
					readNum: '2.77万'
				});
				_self.page++;
			}, 500);
		},
		methods: {
			lower() {
				this.list.push({
					thumbUrl: '/static/img/love_skills/thumb.png',
					title: '套路女朋友的多种方法22222',
					readTime: '4.28 18:00',
					readNum: '2.77万'
				});
			},
			getArticleView(id) {
				console.log('getArticleView....');
				// 获取文章详情信息
				uni.navigateTo({
					url:'/pages/cases/detail'
				})
			},
			switchTab(tabName) {
				// 切换面板
				if(tabName=='last_update') {
					this.last_update_class = 'last_update border-active';
					this.love_skills_class = 'love_skills';
					this.girl_area_class   = 'girl_area';
				} else if(tabName == 'love_skills') {
					this.last_update_class = 'last_update';
					this.love_skills_class = 'love_skills border-active';
					this.girl_area_class   = 'girl_area';
				} else if(tabName == 'girl_area') {
					this.last_update_class = 'last_update';
					this.love_skills_class = 'love_skills';
					this.girl_area_class   = 'girl_area border-active';
				}
				// 这里要发送请求更新内容
				
			}
		}
	}
</script>

<style>
view {
	display: flex;
	border-sizing:border-box;
}

#root-view {
	width: 750rpx;
	justify-content: flex-start;
	flex-direction: column;
	background: linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
}

#header-view {
	display: flex;
	height: 50px;
	width: 750rpx;
	justify-content: space-around;
	align-items: center;
	background: rgba(35,105,230,1);
}

.border-active {
	border-bottom: 2px solid rgba(255,255,255,1);
}

#last_update, #love_skills, #girl_area {
	height: 50px;
	display: flex;
	align-items: center;
}

.last_update>text,.love_skills>text,.girl_area>text {
	font-size:14px;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(255,255,255,1);
}

#content-view {
	display: flex;
	overflow-y: scroll;
	-webkit-overflow-scrolling:touch;
	width: 100%;
	margin-top:16px;
	flex-direction: column;
}
.content-root-view {
	margin-bottom: 16px;
}
.thumb-class {
	max-width: 200rpx;
	max-height: 80px;
	border-radius:20rpx;
	margin-left:24rpx;
	margin-right:32rpx;
}
.content-titleinfo-view {
	width:464rpx;
	height: 80px;
	flex-wrap: wrap;
	flex-direction: column;
}

.content-title-view {
	width:462rpx;
	height: 50px;
}

.content-stats-view{
	width:462rpx;
	height:30px;
	align-items: flex-end
}

.content-title-view>text {
	font-size:32rpx;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(255,255,255,1);
}

.content-stats-view>text{
	font-size:24rpx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(255,255,255,1);
}
</style>
