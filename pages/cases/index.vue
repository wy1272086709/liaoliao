<template>
	<view id="root-view">
		<view id="header-view">
			<!-- 初始尺寸设置为120rpx,   去掉header-view width 属性, 设置元素的flex-shrink 为0，在子元素上-->
			<view   @tap="switchTab(index)" v-for="(tab,index) in tabArr" :key="tab.firstNav.navId" :style="'display:'+tab.display+';'">
				<view :style="index==caseTabIndex ? 'border-bottom:2px solid rgba(255,255,255,1);':''">
					<text>{{ tab.firstNav.title }}</text>
				</view>
			</view>
		</view>
		<swiper :current="caseTabIndex" @change="switchCasesTab" :style="'min-height:'+scrollHeight+'px;'">
			<swiper-item v-for="(tab,index) in tabArr" :key="tab.firstNav.navId">
				<scroll-view id="content-view" enable-back-to-top="true" scroll-y="true"	:style="'height:'+parseInt(scrollHeight-16)+'px;'" @scrolltolower="lower">
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
			</swiper-item>
		</swiper>
		<tabBar :current="1" :position="position"></tabBar>
		<view style="height:34px;width:100%;" v-if="isIphoneX">
				
		</view>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
	let eMap = {};
	let totalPage = 1;
	let page = 1;
	let cid = 0;
	let interval = null;
	let isFixedHeight = false;
	export default {
		data() {
			return {
				tabArr: [],
				list: [],
				caseTabIndex: 0,
				isIphoneX: false,
				scrollHeight: 0,
				position: 'fixed',
				tabTitle: '',
			}
		},
		computed: {
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				return 0;
			},
		},
		onShareAppMessage() {
			console.log('share....');
			let pages = getCurrentPages() //获取加载的页面
			let currentPage = pages[pages.length-1] //获取当前页面的对象
			let url = currentPage.route //当前页面url
			return {
				title: '恋爱技巧',
				path: "/"+url,
				success: function() {
					console.log('share success!');
				},
				fail: function() {
					console.log('share..sucess!');
				}
			};
		},
		onHide() {
			eMap = {};
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新');
			let _self = this;
			isFixedHeight = false;
			_self.getCaseList(cid, true, 1);
			setTimeout(function() {				
				uni.stopPullDownRefresh();
			}, 200);
		},
		onLoad(option) {
			uni.showShareMenu({
			    withShareTicket: true
			});
			//console.log('option', option);
			let sysinfo = uni.getSystemInfoSync();
			let screenHeight = sysinfo.screenHeight;
			let winHeight    = sysinfo.windowHeight;
			console.log('winHeight', winHeight);
			let isIphoneX = getApp().globalData.isIphoneX;
			this.isIphoneX = isIphoneX;
			if (isIphoneX) {
				winHeight    = winHeight - 34;
			} 
			// scrollHeight+16
			this.scrollHeight = winHeight - 60 - 51;
			//console.log(this.scrollHeight);
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
		methods: {
			tabArrData(tabArr) {
				// 需要隐藏一个元素
				let index = this.caseTabIndex;
				let len = tabArr.length;
				let navData = tabArr;
				console.log('index', index);
				if( index>=4) {
					// 只保留最后三个
					for (let m = 0; m<=index-4;m++) {
						navData[m].display = 'none';
					}
					for (let x = index-3;x<=index;x++) {
						navData[x].display = 'flex';
					}
				} else {
					for (let m = 0;m<4;m++) {
						console.log('m',m);
						navData[m].display = 'flex';
					} 
				} 
				return navData;
			},
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
					//console.log('resp', resp);
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
				});
			},
			initHuashuListImage(list) {
				let n = list.length;
				const data = getApp().globalData;
				const hostUrl = data.hostUrl;
				for(let m = 0;m<n;m++)
				{
					if(!list[m].thumbUrl) {
						list[m].thumbUrl = '/static/img/love_skills/thumb.png';
					} else {
						list[m].thumbUrl = hostUrl+list[m].thumbUrl;
					}
				}
				//console.log('list',list);
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
					//console.log('resp', resp);
					this.tabArr = _self.initTabData(resp);
					//console.log('tabArr', this.tabArr);
					cid    = _self.tabArr[0].firstNav.navId;
					this.tabTitle = _self.tabArr[0].firstNav.title;
					this.getCaseList(cid, true, 1);
				});
			},
			initTabData(tabData) {
				let n = tabData.length;
				for(let s = 0;s<n;s++) {
					tabData[s].display = 'flex';
				}
				return tabData;
			},
			getArticleView(id) {
				//console.log('getArticleView....');
				// 获取文章详情信息
				uni.navigateTo({
					url:'/pages/cases/detail?id='+id+'&cid='+cid+"&title="+this.tabTitle
				})
			},
			switchCasesTab(e) {
				let thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;
				//console.log('thisCurr', thisCurr);
				this.caseTabIndex = thisCurr;
				let navId = this.tabArr[thisCurr].firstNav.navId;
				cid  = navId;
				this.tabTitle = this.tabArr[thisCurr].firstNav.title;
				this.changeTabDisplay(thisCurr);
				const t = parseInt(new Date().getTime()/1000);
				if (typeof eMap[t]!='undefined') {
					return;
				}
				this.getCaseList(navId, true, 1);
				eMap[t] = 1;
			},
			switchTab(index) {
				// 切换面板
				this.caseTabIndex = index;
				let navId = this.tabArr[index].firstNav.navId;
				cid  = navId;
				this.tabTitle = this.tabArr[index].firstNav.title;
				this.changeTabDisplay(index);
				const t = parseInt(new Date().getTime()/1000);
				// 不准同一秒内发送两次请求
				if (typeof eMap[t]!='undefined') {
					return;
				}
				this.getCaseList(navId, true, 1);
				eMap[t] = 1;
				//console.log('eMap', eMap);
			},
			changeTabDisplay(index) {
				if( index>=4) {
					// 只保留最后三个
					for (let m = 0; m<=index-4;m++) {
						this.tabArr[m].display = 'none';
					}
					for (let x = index-3;x<=index;x++) {
						this.tabArr[x].display = 'flex';
					}
				} else {
					for (let m = 0;m<4;m++) {
						console.log('m',m);
						this.tabArr[m].display = 'flex';
					} 
				} 
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

/* 隐藏滚动条 */	
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
} 

.border-active {
	border-bottom: 2px solid rgba(255,255,255,1);
}

#header-view {
	display: flex;
	height: 51px;
	-webkit-overflow-scrolling: touch;
	background: rgba(35,105,230,1);
	overflow-x: auto;
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
	margin-bottom:16px;
	flex-direction: column;
}
.content-root-view {
	margin-bottom: 16px;
}
.thumb-class {
	max-width: 200rpx;
	max-height: 160rpx;
	border-radius:20rpx;
	margin-left:24rpx;
	margin-right:32rpx;
}
.content-titleinfo-view {
	width:464rpx;
	height: 160rpx;
	flex-wrap: wrap;
	flex-direction: column;
}

.content-title-view {
	width:462rpx;
	height: 100rpx;
}

.content-stats-view{
	width:462rpx;
	height:60rpx;
	align-items: flex-end;
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
