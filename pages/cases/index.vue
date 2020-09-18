<template>
	<view id="root-view">
		<scroll-view id="header-view" :scroll-x="true"  :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view  class="header-view-box">
				<!-- 初始尺寸设置为120rpx,   去掉header-view width 属性, 设置元素的flex-shrink 为0，在子元素上-->
				<view   @tap="switchTab(index)" v-for="(tab,index) in tabArr" :id="'tab_'+tab.firstNav.navId" :key="getNavKey(tab.firstNav.navId)"  :style="index==caseTabIndex ? 'background:rgba(243,86,86,1);opacity:0.7;color:rgba(255,255,255,1);':'color:'+getIndexColor(index)+';'">
					<text>{{ tab.firstNav.title }}</text>
				</view>
			</view>
		</scroll-view>
		<scroll-view :style="'height:'+scrollHeight+'rpx;margin-top:81rpx;'"   enable-back-to-top="true" scroll-y="true" @scrolltoupper="upper"	 @scrolltolower="lower">
			<!--
			<view id="article-swiper" :style="'display:'+swiperImageDisplay+';'" v-if="false">
				<swiper class="swiper" previous-margin="60rpx" next-margin="60rpx"  :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :style="'height:'+ swiperHeight+'rpx;'">
					<block v-for="recommend in recommendList">
						<swiper-item  :key="recommend.litpic" class="swiper-item-class" 
						@tap="gotoViewArticle(recommend.nid,recommend.cid,recommend.title)" >
							<view  class="swiper-view">
								<image :src="recommend.litpic" :class="'recommend-litpic-class'+(swiperIdx == index ? ' active' : ' quiet')"></image>
								<text class="swiper-view-title">{{recommend.title}}</text>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			-->
			<swiper :current="caseTabIndex" 	@change="switchCasesTab" :style="'min-height:'+scrollHeight+'rpx;'">
				<swiper-item v-for="(tab,index) in tabArr" :key="tab.firstNav.navId" :style="'min-height:'+scrollHeight+'rpx;'">
					<!-- :scroll-top="scrollTop" enable-back-to-top="true" -->
					<scroll-view id="content-view"  :style="'height:'+scrollHeight+'rpx;'"   enable-back-to-top="true"  :scroll-y="true" @scrolltoupper="upper"	 @scrolltolower="lower">
						<view style="height:16px;"></view>
						<view v-for="(item,m) in list" class="content-root-view" :style="m==0 ? 'margin-top:0px;':''" @tap="getArticleView(item.id)" :key="item.id">
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
						<view style="height:16px;"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</scroll-view>
		<!--
		<tabBar :current="1" :position="'fixed'"></tabBar>
		-->
	</view>
</template>

<script>
	//import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	//import carousel from '@/components/vear-carousel/vear-carousel'
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
				list: [],
				swiperIdx: 0,
				recommendList: [],
				caseTabIndex: 0,
				isIphoneX: false,
				scrollHeight: '',
				/*indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				animationStr: '',
				banner: [],*/
				scrollInto: "",
				/*old: {
					scrollTop:0,
				},
				swiperHeight: 399.16,*/
				//contentHeight: '',
				//swiperImageDisplay:'none',
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
			_self.getCaseList(cid, true, 1);
			setTimeout(function() {				
				uni.stopPullDownRefresh();
			}, 200);
		},
		onLoad(option) {
			//#ifdef MP-WEIXIN || MP-QQ
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#endif
			//console.log('option', option);
			let sysinfo = uni.getSystemInfoSync();
			let screenHeight = sysinfo.screenHeight;
			let width = sysinfo.windowWidth;
			let winHeight    = sysinfo.windowHeight;
			let radix = 750/width; 
			console.log('winHeight', winHeight);
			let isIphoneX = getApp().globalData.isIphoneX;
			this.isIphoneX = isIphoneX;
			let bottom = isIphoneX ? 30: 0;
			//#ifdef MP-WEIXIN || MP-QQ
			this.scrollHeight  = winHeight*radix - 81  -bottom;
			//#endif
			//#ifndef MP-WEIXIN || MP-QQ
			this.scrollHeight  = winHeight*radix - 81  -bottom;
			//#endif
			winHeight = winHeight - 60;
			if (isIphoneX) {
				winHeight    = winHeight - 30/radix;
			} 
			let appCid = option.app_cid;
			if(appCid) {
				this.scrollInto = 'tab_'+appCid;
				this.caseTabIndex = '';
			}
			this.getRecommendImages();
			this.getHuashuTabbar();
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
		onPageScroll(e) {
			console.log('e onPageScroll...', e);
		},
		methods: {
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
			onReachBottom() {
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
					/*let n = this.list.length;
					let sysinfo = uni.getSystemInfoSync();
					let width = sysinfo.windowWidth;
					let radix = 750/width; 
					radix = radix.toFixed(2);
					this.scrollHeight  = n*160+(n+1)*16*radix;
					console.log('radix', radix);*/
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
					tabTitle = _self.tabArr[0].firstNav.title;
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
				const t = parseInt(new Date().getTime()/1000);
				this.delMap(eMap);
				if (typeof eMap[t]!='undefined') {
					return;
				}
				this.getCaseList(navId, true, 1);
				eMap[t] = 1;
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
				const t = parseInt(new Date().getTime()/1000);
				this.delMap(eMap);
				// 不准同一秒内发送两次请求
				if (typeof eMap[t]!='undefined') {
					return;
				}
				this.scrollInto = 'tab_'+navId;
				this.getCaseList(navId, true, 1);
				eMap[t] = 1;
				console.log('eMap', eMap);
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

<style>
	
page {
	width:100%;
	overflow-y: auto;
	overflow-x: hidden;
}

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

/* 隐藏滚动条 */	
::-webkit-scrollbar {
	width: 0;
	height: 0;
	display: none;
	color: transparent;
} 

.border-active {
	border-bottom: 2px solid rgba(255,255,255,1);
}

#header-view {
	display: flex;
	flex-direction: row;
	position: fixed;
	height: 70rpx;
	margin-top:11rpx;
	width:680rpx;
	z-index:10000000001;
	margin-left:35rpx;
	/*padding-bottom: 10rpx;*/
	margin-right: 35rpx;
}

#header-view-wrap {
	position: fixed;
	height: 70rpx;
}
.header-view-box {
	flex-direction: row;
}

.header-view-box>view {
	display: flex;
	height:60rpx;
	flex-basis:218rpx;
	flex-shrink: 0;
	margin-right:9rpx;
	background:rgba(255,255,255,1);
	border-radius:30rpx;
	border:3rpx solid rgba(236,236,236,1);
	justify-content: center;
	text-align: center;
	align-items: center;
	font-size:25rpx;
	font-family:SimHei;
	font-weight:400;
	color:rgba(120,208,125,1);
}

.swiper {
	width:750rpx;
	height:399.16rpx;
	border-radius: 27rpx;
	margin-top:0rpx;
}

.swiper-view {
	flex-direction:column;
	width:100%;
	height:100%;
	justify-content:center;
	align-items:center;
}

.swiper-item {
	width:700rpx;
	height:100%;
	border-radius: 27rpx;
}

.swiper-view-title {
	display:flex;
	position:absolute;
	top:300rpx;
	font-size:27rpx;
	font-family:SimHei;
	font-weight:400;
	color:rgba(255,255,255,1);
}

.recommend-litpic-class {
	width:720rpx;
	height:100%;	
	border-radius: 27rpx;
	/*margin-left:18rpx;
	margin-right:19rpx;*/
}

.swiper-item-class>image {
	
}

.swiper-item-class {
	width:712.8rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.swiper-view > .active {
	transform: none;transition: all 0.2s ease-in 0s;
}

.swiper-view> .quiet {
	transform: scale(0.8333333);
	transition: all 0.2s ease-in 0s;
}

#header-view>view>view {
	height:60rpx;
	flex-basis:219rpx;
	flex-shrink: 0;
	
}

#article-swiper {
	width:750rpx;
}

#header-scroll-view {
	display: flex;
	flex-direction: row;
	width:750rpx;
	padding-bottom:10px;
	-webkit-overflow-scrolling: touch;
}

#content-view {
	display: flex;
	overflow-y: scroll;
	-webkit-overflow-scrolling:touch;
	width: 100%;
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
	max-width: 200rpx;
	max-height: 160rpx;
	border-radius:20rpx;
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
	font-size:26rpx;
	font-family:SimHei;
	font-weight:500;
	color:rgba(11,11,11,1);
}

.content-stats-view>text{
	font-size:18rpx;
	font-family:楷体;
	font-weight:400;
	color:rgba(160,160,160,1);
}
</style>
