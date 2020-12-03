<template>
	<view id="root-view">
		
		<view>
			<swiper class="swiper"  :indicator-dots="true" :autoplay="true" :interval="6000" :duration="500">
				<block v-for="(ad,index2) in adsArr" :key="ad.ad_id">
					<swiper-item   class="swiper-item-class" 
					@tap="gotoAdsUrl(index2)">
						<image :src="ad.ad_img"  class="ads-image"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		
		<!-- :bar-width="110" gutter="33" -->
		<!--
		<u-tabs ref="tabs"   bg-color="#FFFFFF" :name="'title'" :bold="bold" :active-color="activeColor" :list="tabs"
		@change="change" :bar-width="110" :gutter="33"  :current="caseTabIndex" :is-scroll="true"></u-tabs>
		-->
		<scroll-view class="header-view" :duration="100"  :scroll-x="true"  :show-scrollbar="false" :scroll-into-view="scrollInto" >
			<view  class="header-view-box">
				<!-- 初始尺寸设置为120rpx,   去掉header-view width 属性, 设置元素的flex-shrink 为0，在子元素上-->
				<view @tap="switchTab(index)" v-for="(tab,index) in tabs" :id="'tab_'+tab.navId" :key="getNavKey(tab.navId)" class="common-tab-view">
					<view>
						<text :class="index==caseTabIndex ? 'active-tab-class':'common-tab-class'">{{ tab.title }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<view>			
			<swiper :current="caseTabIndex" :scroll-with-animation="true" 	@change="switchCasesTab" :style="'min-height:'+scrollHeight+'px;width:100%;'">
				<swiper-item v-for="(tab,index) in tabs" :key="'tab_'+tab.navId" :style="'min-height:'+scrollHeight+'px;'">
					<scroll-view id="content-view"  :style="'height:'+scrollHeight+'px;'" :scroll-y="true"  @scrolltolower="lower">
						<view style="height:16px;"></view>
						<view v-for="(item,m) in caseContentlist" class="content-root-view" :style="m==0 ? 'margin-top:0px;':''" @tap="getArticleView(item.id)" :key="item.id">
							<view class="content-img-view">
								<image :src="item.thumbUrl" class="thumb-class"></image>
							</view>
							<view class="content-titleinfo-view">
								<view class="content-title-view">
									<text>{{item.title}}</text>
								</view>
								<view class="content-desc-view">
									<text>{{item.description}}</text>
								</view>
								<view class="content-stats-view">
									<view class="content-stats-view-readnum">
										<image src="../../static/img/cases/view.png" style="width:32rpx;height:20rpx;margin-right:13rpx;"></image>
										<text>{{item.readNum}}</text>
									</view>
									<view class="content-stats-view-praisenum">
										<image src="../../static/img/cases/ok.png" style="width:24rpx;height:24rpx;margin-right: 15rpx;"></image>
										<text>{{item.praiseNum}}</text>
									</view>
								</view>
							</view>
						</view>
						<view style="height:16px;"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let eMap = {};
	let totalPage = 1;
	let nowpage = 1;
	let cid = 0;
	let interval = null;
	let tabTitle = '';
	export default {
		data() {
			return {
				tabArr: [],
				caseContentlist: [],
				swiperIdx: 0,
				recommendList: [],
				caseTabIndex: 0,
				isIphoneX: false,
				scrollHeight: '',
				adsArr: [],
				offsetTop: '',
				current: 0,
				isScroll: true,
				bold: true,
				control: true,
				activeColor: '#A88FEF',
				scrollInto: "",
				tabs: [],
			}
		},
		computed: {
			uid: function() {
				let uid = util.cache('wx_userid', null);
				if (uid) {
					return uid;
				}
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				return 0;
			}		
		},
		onShow() {
			
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
		onReady() {
			
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新');
			let _self = this;
			_self.getCaseList(cid, true, 1);
			setTimeout(function() {				
				uni.stopPullDownRefresh();
			}, 200);
		},
		onLoad(option) {
			let sysinfo = uni.getSystemInfoSync();
			let screenHeight = sysinfo.screenHeight;
			let width = sysinfo.windowWidth;
			let winHeight    = sysinfo.windowHeight;
			let radix = 750/width; 
			console.log('winHeight', winHeight);
			let isIphoneX = getApp().globalData.isIphoneX;
			this.isIphoneX = isIphoneX;
			let bottom = isIphoneX ? 30: 0;
			this.scrollHeight  = winHeight - uni.upx2px(81+bottom+320);
			if (isIphoneX) {
				winHeight    = winHeight - 30/radix;
			} 
			this.getAdsInfo();
			let appCid = option.app_cid;
			console.log('appCid', appCid);
			this.getRecommendImages();
			this.getHuashuTabbar(appCid);
		},
		mounted() {
			
		},
		components:{
			//tabBar:tabBar
			
		},
		beforeDestroy() {
			if(interval) {
				clearTimeout(interval);
			}
		},
		methods: {
			gotoNext() {
				
				uni.switchTab({
					url: '/pages/mind_square/index'
				});
			},
			moveHandle() {
				return false;
			},
			getAdsInfo() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=ad&ac=get_ad";
				http.request(url, {
					auth: auth,
					filterData: true,
					cid: 6
				}).then(resp => {
					if(resp.status == 1) {
						this.adsArr = resp.data;
						this.base_lsit = resp.data;
					}
					console.log('adsArr:', this.adsArr);
				})
			},
			gotoAdsUrl(index) {
				let href = this.adsArr[index].ad_content;
				if(!href) return;
				uni.navigateTo({
					url: href
				});
			},
			getNavKey(navId) {
				return 'tab_'+navId;
			},
			upper() {
				
			},
			scroll(e) {
				console.log('e', e);
			},
			selectedBanner(item, index) {
				console.log('s', item, index);
			},
			bindchange(e) {
				this.swiperIdx = e.detail.current;
			},
			bannerChange () {
				
			},
			gotoViewArticle(id, cid, title) {
				const url = '/pages/cases/detail?id='+id+'&cid='+cid+'&title='+title;
				console.log('url', url);
				uni.navigateTo({
					url:url
				});
			},
			getRecommendImages() {
				let data = getApp().globalData
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				let url = apiPrefix+'?mod=news&ac=banner';
				http.request(url, {
					auth:auth,
					filterData:true
				}).then(resp => {
					console.log('getRecommendImages resp', resp);
					this.recommendList = resp.data;
					//this.banner = this.getBannerPics(resp.data);
				})
			},
			getBannerPics(recommendArr) {
				let n = recommendArr.length;
				let srcArr = [];
				for(let i = 0;i<n;i++) {
					srcArr.push({ image: recommendArr[i].litpic,id:recommendArr[i].nid } );
				}
				console.log('banners:',srcArr);
				return srcArr;
			},
			tabArrData(tabArr) {
				// 需要隐藏一个元素
				let index = this.caseTabIndex;
				let len = tabArr.length;
				let navData = tabArr;
				//console.log('index', index);
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
						//console.log('m',m);
						navData[m].display = 'flex';
					} 
				} 
				return navData;
			},
			/*onReachBottom() {
				console.log('to lower!');
				let _self = this;
				console.log('page',nowpage);
				if(nowpage>=totalPage) {
					clearTimeout(interval);
					return;
				}
				interval = setTimeout(function() {
					nowpage++;
					console.log('page....',nowpage);
					_self.getCaseList(cid, false,nowpage);
				}, 500);
			},*/
			lower() {
				console.log('to lower!');
				let _self = this;
				console.log('page',nowpage);
				if(nowpage>=totalPage) {
					clearTimeout(interval);
					return;
				}
				interval = setTimeout(function() {
					nowpage++;
					console.log('page....',nowpage);
					_self.getCaseList(cid, false,nowpage);
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
					const d = resp.data;
					if(typeStr.length>0) {
						this.initHuashuListImage(d);
						isArray   = true;
						totalPage = resp.totalpage;
					} 
					if(firstLoad) {
						if(isArray) {
							this.caseContentlist = d;
						} else {
							this.caseContentlist = [];
						}
					} else {
						if(!isArray) {
							return;
						}
						let len = d.length;
						this.caseContentlist = this.caseContentlist.concat(d);
					}
				});
			},
			initHuashuListImage(list) {
				let n = list.length;
				for(let m = 0;m<n;m++)
				{
					if(!list[m].thumbUrl) {
						list[m].thumbUrl = '/static/img/love_skills/thumb.png';
					} else {
						list[m].thumbUrl = list[m].thumbUrl;
					}
				}
			},
			// 获取话术tab页
			getHuashuTabbar(cId) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=news&ac=get_all_cid";
				http.request(url, {
					auth: auth
				}).then(resp => {
					console.log('resp', resp);
					this.tabArr = resp;
					const n = resp.length;
					for(let m = 0;m<n;m++) {
						const nav = resp[m].firstNav;
						const title = nav.title;
						this.tabs.push({ title: title,navId: nav.navId });
					}
					//this.tabArr = _self.initTabData(resp);
					if(cId) {
						const tabIndex = this.getActiveTabIndex(cId);
						//this.scrollInto = 'tab_'+cId;
						this.caseTabIndex = tabIndex;
						cid = cId;
						tabTitle = _self.tabArr[tabIndex].firstNav.title;
					} else {
						cid    = _self.tabArr[0].firstNav.navId;
						tabTitle = _self.tabArr[0].firstNav.title;
					}
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
					url:'/pages/cases/detail?id='+id+'&cid='+cid+"&title="+tabTitle
				})
			},
			switchCasesTab(e) {
				nowpage = 1;
				let thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;
				console.log('thisCurr', thisCurr);
				if(thisCurr == this.caseTabIndex) {
					return;
				}
				this.caseTabIndex = thisCurr;
				let navId = this.tabArr[thisCurr].firstNav.navId;
				cid  = navId;
				tabTitle = this.tabArr[thisCurr].firstNav.title;
				//this.changeTabDisplay(thisCurr);
				this.scrollInto = 'tab_'+navId;
				//const t = parseInt(new Date().getTime()/1000);
				//this.delMap(eMap);
				/*if (typeof eMap[t]!='undefined') {
					return;
				}*/
				this.getCaseList(navId, true, 1);
				//eMap[t] = 1;
			},
			change(index) {
				nowpage = 1;
				if( this.caseTabIndex == index) {
					return;
				}
				this.caseTabIndex = index;
				let navId = this.tabArr[index].firstNav.navId;
				cid  = navId;
				tabTitle = this.tabArr[index].firstNav.title;
				this.getCaseList(navId, true, 1);
			},
			getIndexColor(index) {
				let colorArr = ['#FF0000 ', '#FF7F00', '#FFFF00 ', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF']
				return colorArr[index%7];
			},
			delMap(map) {
				let m = Object.keys(map);
				if(m.length<=1) {
					return;
				}
				for(let i = 0;i<m.length;i++)
				{
					if(i == m.length -1) {
						continue;
					}
					// 删除最后一个元素之外的所有元素...
					delete map[m[i]];
				}
				return map;
			},
			getActiveTabIndex(cId) {
				const tArr = this.tabArr;
				console.log('tabArr', this.tabArr, '---', cId);
				const n = tArr.length;
				for(let j = 0;j<n;j++) {
					let m = tArr[j].firstNav.navId;
					if(m === cId) {
						return j;
					}
				}
				return -1;
			},
			switchTab(index) {
				nowpage = 1;
				console.log('switchTab index:', index);
				// 切换面板
				if(index == this.caseTabIndex) {
					return;
				}
				this.caseTabIndex = index;
				let navId = this.tabArr[index].firstNav.navId;
				cid  = navId;
				tabTitle = this.tabArr[index].firstNav.title;
				//this.changeTabDisplay(index);
				/*const t = parseInt(new Date().getTime()/1000);
				this.delMap(eMap);
				// 不准同一秒内发送两次请求
				if (typeof eMap[t]!='undefined') {
					return;
				}*/
				this.scrollInto = 'tab_'+navId;
				this.getCaseList(navId, true, 1);
				//eMap[t] = 1;
				//console.log('eMap', eMap);
			},
			changeTabDisplay(index) {
				let n = this.tabArr.length;
				if( index>=3) {
					// 只保留最后三个
					for (let m = 0; m<=index-3;m++) {
						//console.log('m,', m);
						this.tabArr[m].display = 'none';
					}
					for (let x = index-2;x<=index;x++) {
						//console.log('x,', x);
						this.tabArr[x].display = 'flex';
					}
				} else {
					console.log('index', index);
					for (let m = 0;m<3;m++) {
						//console.log('m<4',m);
						this.tabArr[m].display = 'flex';
					} 
				} 
			}
		}
	}
</script>

<style lang="scss">
	


view {
	display: flex;
	border-sizing:border-box;
}

#root-view {
	justify-content: flex-start;
	flex-direction: column;
	/*background: linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);*/
	background: rgba(255,255,255, 1);
}

.u-tabs {
	width:750rpx;
	overflow-x: scroll;
}

/* 隐藏滚动条 */	
::-webkit-scrollbar {
	width: 0;
	height: 0;
	display: none;
	color: transparent;
} 
.header-view {
	flex-direction: row;
	height: 70rpx;
	margin-top:11rpx;
	width:750rpx;
	/*z-index:99999999;*/
}

.border-active {
	border-bottom: 2px solid rgba(255,255,255,1);
}

.header-view-box {
	padding-top:10rpx;
	/*margin-left: 32rpx;
	margin-right: 32rpx;*/
	flex-direction: row;
	justify-content: space-between;
}

.u-sticky {
	width:680rpx !important;
	height: 70rpx;
	margin-left:35rpx;
	/*padding-bottom: 10rpx;*/
	margin-right: 35rpx;
}


.common-tab-view {
	display: flex;
	height:60rpx;
	flex-basis:163.5rpx;
	flex-shrink: 0;
	margin-right:9rpx;
	background:rgba(255,255,255,1);
	/*border-radius:30rpx;*/
	/*border:3rpx solid rgba(236,236,236,1);*/
	justify-content: center;
	text-align: center;
	align-items: center;
	font-size:28rpx;
	font-family:SimHei;
	font-weight:400;
	color:rgba(120,208,125,1);
	/*color:#FFFFFF;*/
}
	
.swiper {
	margin-left:32rpx;
	margin-right:32rpx;
	width:686rpx;
	margin-top:24rpx;
	height:320rpx;
	border-radius: 27rpx;
}

.ads-image {
	width: 686rpx;
	height:320rpx;
}

.swiper-item-class {
	display: flex;
	justify-content: center;
	align-items: center;
}

#content-view {
	display: flex;
	overflow-y: scroll;
	-webkit-overflow-scrolling:touch;
	/*width: 100%;*/
	/*margin-bottom:16px;*/
	flex-direction: column;
}

.content-img-view  {
	margin-right:24rpx;
}

.content-root-view {
	margin-left:35rpx;
	margin-right:35rpx;
	margin-top: 16px;
}
.thumb-class {
	width: 120rpx;
	height: 120rpx;
	/*border-radius:20rpx;*/
}
.content-titleinfo-view {
	width:464rpx;
	/*height: 160rpx;*/
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-between;
}

.content-title-view {
	width:462rpx;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #323232;
	/*height: 100rpx;*/
	/*padding-bottom: 10rpx;*/
}

.content-desc-view {
	width:462rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #9A9A9A;
	
	overflow:hidden;
	/*height: 60px;*/
	// 超出省略号...
	text-overflow:ellipsis;
	display: -webkit-box;
	word-break: break-all;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.content-stats-view {
	width:462rpx;
	height:60rpx;
	display: flex;
	align-items: center;
	font-size: 20rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #9A9A9A;
}

.content-stats-view>view {
	height: 100%;
	align-items: center;
}

.content-stats-view-praisenum {
	
}

.content-stats-view-readnum {
	margin-right: 46rpx;
}

.active-tab-class {
	color:#A88FEF;
	padding-bottom:9rpx;
	border-bottom:1px solid #A88FEF;
}
.common-tab-class {
	color:#131313; 
}


.content-title-view>text {
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #323232;
}

.content-stats-view>text{
	font-size:18rpx;
	font-family:楷体;
	font-weight:400;
	color:rgba(160,160,160,1);
}
/*
#absolute-view {
	display: flex;
	flex-direction: column;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #FEFEFE;
}

.maskClass {
	position: fixed;
	top:0;
	left:0;
	z-index: 9999;
	width:100%;
	height:100%;
	background-color: rgba(0, 0, 0, 0.4);
}

.active-tab-class {
	color:#A88FEF;
	padding-bottom:9rpx;
	border-bottom:1px solid #A88FEF;
}
.common-tab-class {
	color:#131313; 
}

.mask-active-tab {
	background:transparent;
	color:#FFFFFF;
}

.z-index-class {
	z-index:999999;
}
.jiaocheng {
	display: flex;
	flex-wrap: wrap;
	width: 271rpx;
}

#nextBtn {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	justify-content:center;
	display: flex;
	align-items: center;
}
	
#nextBtn>view {
	width:180rpx;
	height:60rpx;
	background: #FFFFFF;
	border-radius: 30rpx;
	justify-content:center;
	display: flex;
	align-items: center;
}*/
</style>
