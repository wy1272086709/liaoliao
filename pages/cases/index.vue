<template>
	<view id="root-view">
		<view id="header-view">
			<!-- 初始尺寸设置为120rpx,   去掉header-view width 属性, 设置元素的flex-shrink 为0，在子元素上-->
			<view   @tap="switchTab(index)" v-for="(tab,index) in tabArr">
				<view :class="tab.class">
					<text>{{ tab.title }}</text>
				</view>
			</view>
		</view>
		<scroll-view id="content-view"  scroll-y="true"	:style="'height:'+scrollHeight+'px;'" @scrolltolower="lower">
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
		</scroll-view>
		<tabBar></tabBar>
		<scorll-view>
		     <view style="height:34px;" v-if="isIphoneX">
				
			 </view>
		</scorll-view>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
	let list = [];
	let tabArr = [];
	let totalPage = 1;
	let page = 1;
	let cid = 0;
	let interval = null;
	let isFixedHeight = false;
	export default {
		data() {
			return {
				tabArr: tabArr,
				list: list,
				isIphoneX: false,
				scrollHeight: 0,
				bottom: 0
			}
		},
		computed: {
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				return 0;
			}
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新');
			let _self = this;
			isFixedHeight = false;
			_self.getCaseList(cid, false, 1);
			setTimeout(function() {				
				uni.stopPullDownRefresh();
			}, 200);
		},
		onLoad() {
			let sysinfo = uni.getSystemInfoSync();
			let screenHeight = sysinfo.screenHeight;
			let winHeight    = sysinfo.windowHeight;
			console.log('winHeight', winHeight);
			let isIphoneX = getApp().globalData.isIphoneX;
			this.isIphoneX = isIphoneX;
			this.bottom = 82;
			if (isIphoneX) {
				winHeight    = winHeight - 34;
				this.bottom = this.bottom+34; 
			} 
			this.scrollHeight = winHeight - 82 - 51 -16;
			console.log(this.scrollHeight);
			this.getHuashuTabbar();
			isFixedHeight = false;
		},
		mounted() {
			
		},
		components:{
			tabBar:tabBar
		},
		beforeDestroy() {
			if(interval) {
				clearTimeout(interval);
			}
		},
		
		onReachBottom() {
			console.log('reach bottom!');
			let _self = this;
			if(page>=totalPage) {
				if (!isFixedHeight &&this.uid>0) {
					let view = uni.createSelectorQuery().select("#content-view");
					view.boundingClientRect(data => {
						console.log('data:', data);
						_self.scrollHeight = data.height+20;
						isFixedHeight = true;
					}).exec();
				}
				clearTimeout(interval);
				return;
			}
			interval = setTimeout(function() { 
				page++;
				_self.getCaseList(cid, false, page);
			}, 500);
		},
		methods: {
			lower() {
				console.log('to lower!');
				let _self = this;
				if(page>=totalPage) {
					clearTimeout(interval);
					return;
				}
				interval = setTimeout(function() {
					page++;
					_self.getCaseList(cid, false, page);
				}, 500);
			},
			getCaseList(cid, firstLoad, page) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=news&ac=list";
				http.request(url, {
					auth: auth,
					cid: cid,
					uid: this.uid,
					nowpage: page,
					filterData: true
				}).then(resp => {
					console.log('resp', resp);
					let typeStr = Object.prototype.toString.call(resp.data);
					let isArray = false;
					if(typeStr.indexOf('Array')!== -1) {
						resp.data = this.initHuashuListImage(resp.data);
						isArray   = true;
						totalPage = resp.totalpage;
					} 
					if(firstLoad) {
						if(isArray) {
							this.list = resp.data;
						} else {
							this.list = [];
						}
					} else {
						if(!isArray) {
							return;
						}
						let len = resp.data.length;
						for(let i = 0;i<len;i++)
						{
							this.list.push(resp.data[i]);
						}
					}
					uni.getSystemInfo({
						success: (res) => {
							// 动态更改列表高度,看是否需要
							console.log('res:', res);
						}
					});
				});
			},
			initHuashuListImage(list) {
				let n = list.length;
				const data = getApp().globalData;
				const hostUrl = data.hostUrl;
				for(let m = 0;m<n;m++)
				{
					list[m].thumbUrl = hostUrl+list[m].thumbUrl;
				}
				console.log('list',list);
				return list;
			},
			// 获取话术tab页
			getHuashuTabbar() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=news&ac=get_all_cid";
				http.request(url, {
					auth: auth
				}).then(resp => {
					console.log('resp', resp);
					_self.tabArr = _self.initTabData(resp);
					 cid    = _self.tabArr[0].navId;
					_self.getCaseList(cid, true, 1);
				});
			},
			initTabData(tabData) {
				let n = tabData.length;
				let tabArr = [];
				for(let s = 0;s<n;s++)
				{
					let tab = tabData[s].firstNav;
					if(s==0) {
						tab.class = 'border-active';
					} else {
						tab.class = '';	
					}
					tabArr.push(tab);
				}
				return tabArr;
			},
			getArticleView(id) {
				console.log('getArticleView....');
				// 获取文章详情信息
				uni.navigateTo({
					url:'/pages/cases/detail?id='+id+'&cid='+this.cid
				})
			},
			switchTab(index) {
				// 切换面板
				this.tabArr[index].class = 'border-active';
				// 这里ajax 请求,获取tab页对应的文章列表
				let n = this.tabArr.length;
				for(let s = 0;s<n;s++) {
					if(s!=index) {
						this.tabArr[s].class = '';
					}
				}
				let navId = this.tabArr[index].navId;
				cid  = navId;
				this.getCaseList(navId, true, 1);
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
	justify-content: flex-start;
	flex-direction: column;
	background: linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
}

#header-view {
	display: flex;
	height: 51px;
	background: rgba(35,105,230,1);
	overflow-x: auto;
}

.border-active {
	border-bottom: 2px solid rgba(255,255,255,1);
}

#header-view>view {
	height: 49px;
	display: flex;
	flex-basis: 187.5rpx;
	flex-shrink: 0;
	align-items: center;
	white-space: nowrap;
	justify-content: center;
}


#header-view>view>view {
	height: 47px;
	justify-content: center;
	text-align: center;
	align-items: center;
}

#header-view>view>view>text{
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
