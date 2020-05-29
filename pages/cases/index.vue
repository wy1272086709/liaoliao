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
		
		<scroll-view id="content-view" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
            :refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
            @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
			<view v-for="item in list" class="content-root-view">
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
		</scroll-view>
		<tabBar></tabBar>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	export default {
		data() {
			return {
				triggered: false,
				borderClass: '',
				tabName: 'last_update',
				last_update_class: 'last_update border-active',
				love_skills_class: 'love_skills',
				girl_area_class: 'girl_area',
				list: [{
					thumbUrl: '/static/img/love_skills/thumb.png',
					title: '套路女朋友的多种方法，全程高能',
					readTime: '4.28 18:00',
					readNum: '2.77万'
				}]
			}
		},
		onLoad() {
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000);
		},
		mounted() {
			
		},
		components:{
			tabBar:tabBar
		},
		methods: {
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 3000)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
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
	height: 724px;
	width: 750rpx;
	flex-direction: column;
	background: linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
}

#header-view {
	display: flex;
	height: 50px;
	width:100%;
	justify-content: space-around;
	align-items: center;
	background: rgba(35,105,230,1);
}

.border-active {
	border-bottom: 2px solid rgba(255,255,255,1);
}

.last_update, .love_skills, .girl_area {
	height: 100%;
	line-height: 50px;
}
.last_update>text,.love_skills>text,.girl_area>text {
	font-size:14px;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(255,255,255,1);
}

#content-view {
	display: flex;
	height: 605px;
	width: 100%;
	margin-top:16px;
	flex-direction: column;
}
.content-root-view {
	
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
