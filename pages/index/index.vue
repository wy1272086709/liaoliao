<template>
<view id="root-view">
		<!-- :style="'height:'+contentHeight+'px;'" -->
	<scroll-view :show-scrollbar="false">
		<scroll-view :show-scrollbar="false">
			<!-- 判断用户这个版本是否第一次进入,小程序中,这个值始终为true,APP中需要通过接口来判断 -->
			
			<scroll-view id="container-view">
				<view id="bg-view">
					<image src="../../static/img/index/bg.png" class="bg-view-image"></image>
				</view>
				<view id="ads-view" >
					<!--
					<swiper class="swiper"  :indicator-dots="true" :autoplay="true" :interval="6000" :duration="500">
						<block v-for="(ad,index2) in adsArr" :key="ad.ad_id">
							<swiper-item   class="swiper-item-class" 
							@tap="gotoAdsUrl(index2)" style="width:750rpx;">
								<image :src="ad.ad_img"  class="ads-image"></image>
							</swiper-item>
						</block>
					</swiper>
					!-->
					<ls-swiper :list="base_lsit" imgKey="ad_img" :crown="true" :loop="true" :shadow='true' :height="160" :previousMargin="60"
					 :nextMargin="60" :imgRadius="5" :autoplay="true" :interval="6000" @clickItem="clickItem"/>
					 <!--
					  <customSwiper :swiper-list="swiperList" />
					 -->
				</view>
				<view id="search-view">
					<!-- #ifdef APP-PLUS || H5 -->
					<text id="search-text" @tap="gotoSearchWordPage"  style="align-items:center;color:rgba(255,255,255, 1);" class="search-class">
						点击这里输入对方说的话
					</text>
					<view id="search-btn-view">
						<uni-icons type="search" :size="iconSize" :color="'rgba(255,255,255,1)'"></uni-icons>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN  || MP-QQ -->
						<input id="search-text" type="text"  placeholder="点击这里输入对方说的话"  placeholder-style="align-items:center;color:rgba(255,255,255, 1);" placeholder-class="search-class" v-model="keyword" @confirm="searchKeyword" />
						<view id="search-btn-view" @tap="searchKeyword()">
							<uni-icons type="search" :size="iconSize" :color="'rgba(255,255,255,1)'"></uni-icons>
						</view>
					<!-- #endif -->
					
				</view>
				<!-- :style="'height:'+contentHeight+'px;' -->
				<view  id="content-view-box">
					<view id="content-view">
						<view v-for="(item,index) in navList" class="nav-view" :key="item.firstNav.navId">
							<view class="first-nav" style="flex-direction: column;">
								<label :class="index%2==0?'first-nav-label first-nav-even-label':'first-nav-label first-nav-odd-label'">
									<text>{{item.firstNav.title}}</text>
								</label>
								<label class="first-nav-content first-nav-same-class">
									<text>{{item.firstNav.content}}</text>
								</label>
							</view>
							<view class="second-nav">
								<template v-if="index==0 || index == 5">
									<view class="second-nav-three-row" :style="'background-image:url('+nav.litpic+');'+(index2==0 ? 'margin-right:24rpx': (index2==1?'margin-right:26rpx':''))"  @tap="enter_huashu(nav.title, nav.navId);" v-for="(nav,index2) in item.secondNav" :key="nav.navId">
										<text class="second-nav-text">{{nav.title}}</text>
									</view>
								</template>
								<template v-else-if="index == 1">
									<view style="flex-direction: row;">
										<view class="second-nav-three-left" :key="item.secondNav[0].navId" :style="'background-image:url('+item.secondNav[0].litpic+');'" @tap="enter_huashu(item.secondNav[0].title, item.secondNav[0].navId);"> 
											<text class="second-nav-text-left">{{item.secondNav[0].title}}</text>
										</view>
										<view class="second-nav-three-right"> 
											<view class="second-nav-right-one" :key="item.secondNav[1].navId" :style="'background-image:url('+item.secondNav[1].litpic+');'" @tap="enter_huashu(item.secondNav[1].title, item.secondNav[1].navId);">
												<text class="second-nav-right-one-text">{{item.secondNav[1].title}}</text>
												<text  class="second-nav-right-one-content">{{item.secondNav[1].content}} </text>
											</view>
											<view class="second-nav-right-two" :key="item.secondNav[2].navId" :style="'background-image:url('+item.secondNav[2].litpic+');'" @tap="enter_huashu(item.secondNav[2].title, item.secondNav[2].navId);">
												<text class="second-nav-right-two-text">{{item.secondNav[2].title}}</text>
												<text  class="second-nav-right-two-content">{{item.secondNav[2].content}} </text>
											</view>
										</view>
									</view>
								</template>
								<template v-else-if="index == 2">
									<view class="six-nav-csss" :style="'background-image:url('+nav.litpic+');'+(index2%2==0?'margin-right:20rpx;':'')+(index2<=3?'margin-bottom:19rpx;':'')"  @tap="enter_huashu(nav.title, nav.navId);" v-for="(nav,index2) in item.secondNav" :key="nav.navId">
										<view class="six-nav-title">
											<text>{{nav.title}}</text>
										</view>
										<view class="six-nav-content">
											<text>{{nav.content}}</text>
										</view>
									</view>
								</template>
								<template v-else-if="index == 3">
									<view id="five-party-layout-view">
										<view class="five-party-view"  @tap="enter_huashu(nav.title, nav.navId);" :key="nav.navId"  v-for="(nav,index2) in item.secondNav" :style="'background-image:url('+nav.litpic+');'+(index2==0?'width:682rpx;height:157rpx;':'')+(index2<=2?'margin-bottom:18rpx;':'')+((index2==1||index2==3) ? 'margin-right:20rpx;':'')">
											<view class="five-party-view-title">{{nav.title}}</view>
											<view class="five-party-view-content">{{nav.content}}</view>
										</view>
									</view>
								</template>
								<template v-else-if="index == 4">
									<view id="four-part-layout-view">
										<view id="four-part-left">
											<view class="four-part-one" :key="item.secondNav[0].navId"  @tap="enter_huashu(item.secondNav[0].title, item.secondNav[0].navId);" >
												<text class="four-part-font-title title-one-position">{{item.secondNav[0].title}}</text>
												<view class="four-part-font-content content-one-position">{{item.secondNav[0].content}}</view>
											</view>
											<view class="four-part-three" :key="item.secondNav[2].navId" @tap="enter_huashu(item.secondNav[2].title, item.secondNav[2].navId);">
												<text class="four-part-font-title title-three-position">{{item.secondNav[2].title}}</text>
												<text class="four-part-font-content content-three-position">{{item.secondNav[2].content}}</text>
											</view>
										</view>
										
										<view id="four-part-right">
											<view class="four-part-two" :key="item.secondNav[1].navId"  @tap="enter_huashu(item.secondNav[1].title, item.secondNav[1].navId);">
												<text class="four-part-font-title title-two-position">{{item.secondNav[1].title}}</text>
												<text class="four-part-font-content content-two-position">{{item.secondNav[1].content}}</text>
											</view>
											<view class="four-part-four" :key="item.secondNav[3].navId"  @tap="enter_huashu(item.secondNav[3].title, item.secondNav[3].navId);">
												<text class="four-part-font-title title-four-position">{{item.secondNav[3].title}}</text>
												<text class="four-part-font-content content-four-position">{{item.secondNav[3].content}}</text>
											</view>
										</view>
									</view>
								</template>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</scroll-view>
	</scroll-view>
	<!--
	<tabBar :current="0" :position="'relative'"></tabBar>
	-->
</view>
</template>

<script>
	//import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import lsSwiper from '../../components/ls-swiper/index.vue';
	import customSwiper from '@/components/blackmonth-swiper/index';

	
	export default {
		data() {
			return {
				platForm: 0,
				iconSize: 0,
				keyword: '',
				isIphoneX: false,
				navList: [],
				lineHeight: '',
				headerHeight: '',
				contentHeight: 543,
				secondNavMarginTop: 0,
				adsArr: [],
				base_lsit: [],
				marginBottom: 0,
				isFirstGo: 0,
				swiperList: [{
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}]
			}
		},
		components:{
			//tabBar
			lsSwiper,
			customSwiper 
		},
		methods: {
			// 判断APP 用户当前版本，是否是第一次进入,需要通过接口，将版本号传递过去...
			getIndexMargin(index) {
				let arr = [
					32,
					34,
					37,
					28,
					79,
					32
				]
				return arr[index];
			},
			clickItem(e) {
				console.log('item', e);
				uni.navigateTo({
					url: e.ad_content
				});
			},
			getIndexBottom(index) {
				
				let arr = [ 62,51,60,64,20,20 ];
				return arr[index];
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
			gotoSearchWordPage() {
				uni.navigateTo({
					url:'/pages/index/keyword_page',
					success: function(res) {
						console.log('res success', res)
					},
					fail: function(res) {
						console.log('fail res', res)
					}
				});
			},
			writeLog() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=user&ac=logs";
				http.request(url, {
					auth: auth,
					logs_type:'xcx'
				});
			},
			getNavList() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=loveword&ac=get_all_cid";
				http.request(url, {
					auth: auth
				}).then( resp => {
					//console.log('resp pages/index/index:', resp);
					const n = resp.length;
					_self.navList = resp;		
					//_self.contentHeight = _self.calculateNavHeight(resp);
				});
			},
			calculateNavHeight(navList) {
				// 判断nav 高度
				let n = navList.length;
				let sumHeight = 0;
				for (let j = 0;j<n;j++)
				{
					let oneNavHeight = 25+20+13;
					let secondNav = navList[j].secondNav;
					let secondLen = secondNav.length;
					if (secondLen>3) {
						let lineNum = Math.ceil(secondLen/3);
						oneNavHeight+=30*lineNum + (lineNum-1)*12;
					} else {
						oneNavHeight+=30;
					}
					//底部bottom
					oneNavHeight+=20;
					sumHeight+=oneNavHeight;
				}
				sumHeight+=60;
				return sumHeight;
			},
			// 跳转到关键词页面
			searchKeyword() {
				if(!this.keyword || this.keyword.length<1) {
					uni.showToast({
						title: '请输入关键词，且至少1个字符长度!',
						icon:"none",
						duration: 2000
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/index/huashu?keyword='+this.keyword
				});
			},
			handleContact() {
				console.log('contact ... handler...');
			},
			search() {
				
			},
			upgrade_vip() {
				if(this.platForm == 2) {
					return;
				}
				// 升级
				let userInfo = this.$store.getters.userInfo;
				//console.log('userInfo', userInfo);
				if (userInfo.nickName === undefined) {
					uni.showModal({
						title: '提示',
						content: '请先登录',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							if(res.confirm) {
								console.log('res...confirm');
								uni.switchTab({
									url: '/pages/user/index'
								});
							}
						},
						fail: () => {},
						complete: () => {
							
						}
					});
					return;
				}
				// 投诉建议
				uni.navigateTo({
					url: '/pages/user/upgrade_user_vip'
				});
			},
			complaint() {
				// 投诉建议
				uni.navigateTo({
					url: '/pages/user/complaint'
				});
			},
			help_center() {
				uni.navigateTo({
					url: '/pages/index/meme'
				});
			},
			contact_consumer() {},
			enter_huashu(title, navId) {
				uni.navigateTo({
					url:'/pages/index/huashu?title='+encodeURIComponent(title)+'&navId='+navId
				});
			},
			setIosBackground() {
				if (getApp().globalData.platform == 2) {
					console.log('setIosBackgroundColor:');
					setTimeout(()=> {
						
						uni.setBackgroundColor({
							backgroundColorTop: "#2468E7", // 顶部窗口的背景色为蓝色
							backgroundColorBottom: "#FFFFFF", // 底部窗口的背景色为绿
						});
					}, 300);
				}
			},
			getUserLevel() {
				// 更新缓存有效期
				
			}
		},
		onShareAppMessage() {
			let pages = getCurrentPages() //获取加载的页面
			let currentPage = pages[pages.length-1] //获取当前页面的对象
			let url = currentPage.route //当前页面url
			return {
				title: '恋爱话术',
				path: url,
				success: function() {
				},
				fail: function() {
				}
			};
		},
		mounted() {
			//#ifdef MP-WEIXIN || MP-QQ
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#endif
			const systemInfo = uni.getSystemInfoSync();
			// px转换到rpx的比例
			let pxToRpxScale = 750 / systemInfo.windowWidth;
			this.lineHeight =  systemInfo.statusBarHeight * pxToRpxScale + 'rpx';
			this.headerHeight = 44 * pxToRpxScale;
			//#ifdef MP-WEIXIN || MP-QQ 
			this.setIosBackground();
			//#endif
		},
		onReady() {
			console.log('on Ready...');
		},
		onLoad() {
			this.getAdsInfo();
			console.log('onLoad...');
			//#ifdef MP-WEIXIN
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#endif
			let sysinfo = uni.getSystemInfoSync();
			let winHeight    = sysinfo.windowHeight;
			let winWidth     = sysinfo.windowWidth;
			// 1px = radix rpx;
			let radix        = 750/winWidth;
			let searchViewHeight = 40;
			this.isIphoneX = getApp().globalData.isIphoneX;
			console.log('this.isIphoneX', this.isIphoneX);
			let bottom = 60;
			// 64rpx->px
			if (this.isIphoneX) {
				// 换算为px
				bottom+= 30/radix;
			}
			//#ifdef APP-PLUS || H5
			this.contentHeight   = winHeight; 
			
			//#endif
			//#ifdef MP-WEIXIN || MP-QQ
			this.contentHeight   = winHeight - bottom; 
			//this.marginBottom = 60;
			//#endif
			this.platForm = getApp().globalData.platform;
			this.searchViewBottom = 0;
			this.firstNavTop = 20;
			this.iconSize = searchViewHeight - 10;
			this.getNavList();
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				console.log(wgtinfo);
				let v = wgtinfo.version;   //版本号
				let k = 'app_version_'+v;
				uni.setStorageSync(k, 1);
			});
			//#endif
			this.writeLog();
			//this.getUserLevel();
		}
	}
</script>

<style>
	* {
		box-sizing:border-box;
	}
	view,scroll-view {
		display: flex;
	}
	
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;
		color: transparent;
	} 
	.wrap {
		width:686rpx !important;
	}
	.swiper {
		display: flex !important;
		width:686rpx !important;
		height:320rpx !important;
	}
	
	#root-view {
		flex-direction: column;
		background-color: rgba(255,255,255,1);
		/**
		background-image: url(../../static/img/index/bg.png);
		/*background-size: 750rpx 265rpx;*/
		/*background-size: 750rpx 262rpx;
		background-repeat: no-repeat;
		*/
		/**
		background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
		*/
	}
	
	#bg-view {
		width:750rpx;
		height:265rpx;
	}
	
	.bg-view-image {
		width:100%;
		height: 100%;
	}
	
	#container-view {
		flex-direction: column;
		-webkit-overflow-scrolling: touch;
		/*padding-bottom: 60px;*/
	}
	
	#ads-view {
		position: absolute;
		top:5rpx;
		margin-left:32rpx;
		margin-right:32rpx;
		width:686rpx;
		margin-top:24rpx;
		height:320rpx;
	}

	#user_header {
		justify-content: center;
		align-items: center;
	}
	
	.ads-image {
		width: 686rpx;
		height:320rpx;	
		border-radius: 15px;
	}
	
	#contact-btn-view {
		height: 112rpx;
	}
	.icon-class {
		max-width:112rpx;
		max-height: 112rpx;
	}
	.contact-icon-class {
		width:112rpx;
		height: 112rpx;
	}
	
	.nav-view {
		display: flex;
		flex-direction: column;
		margin-bottom: 35px;
	}
	
	.first-nav-content {
		
	}
	
	.first-nav-same-class {
		font-size:18rpx;
		font-family:DFYuanLightGB;
		font-weight:400;
		color:rgba(49,49,49,1);
		margin-top:15rpx;
	}

	
	.second-nav {
		flex-direction: row;
		flex-wrap: wrap;
		margin-top:10px;
	}
	
	.first-nav-label {
		font-size:32rpx;
		font-family:DFYuanLightGB;
		font-weight:600;
		-webkit-text-stroke:1px undefined;
		text-stroke:1px undefined;
	}
	
	.first-nav-even-label {
		color:rgba(109, 142, 217, 1);
	}
	
	.first-nav-odd-label {
		color:rgba(242,61,166,1);
	}
	
	.second-nav-label {
		width:206rpx;
		height:30px;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		opacity:0.4;
		justify-content: center;
		align-items: center;
	}
	
	.second-nav-three-row {
		width:212rpx;
		height:212rpx;
		background-size:contain;	
	}
	
	.second-nav-three-left {
		width:333rpx;
		height:322rpx;
		/*opacity:0.39;*/
		background-size: contain;
		margin-right:15rpx;
		border-radius:20rpx 20rpx 20rpx 20rpx;
	}
	
	.second-nav-three-right {
		flex-direction: column;
	}
	
	.second-nav-right-one {
		width:336rpx;
		height:153rpx;
		background-size: contain;
		margin-bottom:15rpx;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	
	.second-nav-right-two {
		background-size: contain;
		width:336rpx;
		height:153rpx;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	
	.second-nav-right-one-text {
		display: flex;
		margin-left:156rpx;
		margin-top:38rpx;
		font-size:34rpx;
		font-family:SourceHanSansSC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	
	.second-nav-right-two-text {
		display: flex;
		margin-left:150rpx;
		margin-top:40rpx;
		font-size:34rpx;
		font-family:SourceHanSansSC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	.second-nav-right-one-content {
		display: flex;
		margin-top:17rpx;
		margin-left:144rpx;
		padding-left:9rpx;
		padding-right:9rpx;
		height:30rpx;
		background:rgba(234,104,162,1);
		border-radius:15rpx;
		font-size:17rpx;
		padding-top:6rpx;
		padding-bottom:7rpx;
		font-family:DFYuanLightGB;
		font-weight:400;
		color:rgba(255,255,255,1);
		max-width:170rpx;
	}
	
	.second-nav-right-two-content {
		display: flex;
		margin-top:13rpx;
		margin-left:130rpx;
		padding-top:6rpx;
		padding-bottom:7rpx;
		height:30rpx;
		background:rgba(234,104,162,1);
		border-radius:15rpx;
		font-size:18rpx;
		font-family:DFYuanLightGB;
		font-weight:400;
		padding-left:20rpx;
		padding-right:10rpx;
		color:rgba(255,255,255,1);
		max-width:170rpx;
	}
	
	.six-nav-csss {
		background-size: contain;
		flex-direction: column;
		width:333rpx;
		height:158rpx;
	}
	
	.six-nav-title {
		margin-left:30rpx;
		margin-top:38rpx;
		font-size:26rpx;
		font-family:SourceHanSansSC;
		font-weight:500;
		color:rgba(23,8,13,1);
	}
	
	.six-nav-content {
		margin-left:29rpx;
		margin-top:19rpx;
		font-size:19rpx;
		font-family:PingFang;
		font-weight:400;
		color:rgba(23,8,13,1);
	}
	
	#five-party-layout-view {
		flex-direction: row;
		flex-wrap:wrap;
	}
	
	.five-party-view {
		flex-direction: column;
		background-size: contain;
		width:332rpx;
		height: 157rpx;;
	}
	
	.five-party-view-title {
		margin-top:38rpx;
		margin-left:31rpx;
		font-size:26rpx;
		font-family:SourceHanSansSC;
		font-weight:500;
		color:rgba(23,8,13,1);
	}
	
	.five-party-view-content {
		margin-top:19rpx;
		margin-left:29rpx;
		font-size:19rpx;
		font-family:PingFang;
		font-weight:400;
		color:rgba(23,8,13,1);
	}
	#four-part-layout-view {
		flex-direction: row;
	}
	
	#four-part-left {
		flex-direction: column;
	}
	
	#four-part-right {
		flex-direction: column;
	}
	
	.four-part-one,.four-part-two,.four-part-three,.four-part-four {
		flex-direction: column;
	}
	
	.four-part-one {
		width:325rpx;
		height:189rpx;
		background:linear-gradient(17deg,rgba(131,91,213,1),rgba(234,148,199,1));
		border-radius:10rpx;
		margin-right: 32rpx;
		margin-bottom: 23rpx;
		align-items: flex-start;
		justify-content: flex-start;

	}
	
	.four-part-two {
		width:329rpx;
		height:165rpx;
		background:linear-gradient(17deg,rgba(53,174,166,1),rgba(158,224,133,1));
		border-radius:10rpx;
		margin-bottom: 22rpx;
		align-items: flex-start;
		justify-content: flex-start;

	}
	
	.four-part-three {
		width:325rpx;
		height:189rpx;
		background:linear-gradient(17deg,rgba(255,115,137,1),rgba(255,180,140,1));
		border-radius:10rpx;
		margin-right: 32rpx;
		align-items: flex-start;
		justify-content: flex-start;

	}
	
	.four-part-four {
		width:330rpx;
		height:214rpx;
		background:linear-gradient(17deg,rgba(81,89,228,1),rgba(139,202,248,1));
		border-radius:10rpx;
		align-items: flex-start;
		justify-content: flex-start;

	}
	
	.four-part-font-title {
		font-size:31rpx;
		font-family:58;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	
	.four-part-font-content {
		font-size:22rpx;
		font-family:58;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	
	.title-one-position {
		margin-left:27rpx;
		margin-top:36rpx;
	}
	
	.title-two-position {
		margin-left:48rpx;
		margin-top:37rpx;
	} 
	
	.title-three-position {
		margin-left:28rpx;
		margin-top:38rpx;
	} 
	
	.title-four-position {
		margin-left:49rpx;
		margin-top:35rpx;
	} 
	
	.content-one-position {
		margin-top:30rpx;
		margin-left:27rpx;
		padding-left:10rpx;
		max-width:234rpx;
		word-wrap:break-word;
		padding-right:10rpx;
		background:rgba(131,79,232,1);
		border-radius:11rpx;
	}
	
	.content-two-position {
		margin-top:18rpx;
		margin-left:27rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		max-width:234rpx;
		background: #3ABCA2;
		border-radius:11px;
	}
	
	.content-three-position {
		margin-top:32rpx;
		margin-left:25rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		max-width:234rpx;
		background:rgba(253,97,122,1);
		border-radius:11px;
	}
	
	.content-four-position {
		margin-top:37rpx;
		margin-left:32rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		max-width:234rpx;
		background:rgba(81,89,228,1);
		border-radius:11px;
	}
	
	/* 除了第一个元素外的元素,需要添加这个  */
	.second-nav-lable-margin {
		margin-right:32rpx;
	}
	
	.second-nav-lable-top {
		margin-top:12px;
	}
	
	.second-nav-text {
		display: flex;
		height:29rpx;
		margin-top:33rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		border-top-right-radius:14rpx;
		border-bottom-right-radius:14rpx;
		font-size:20rpx;
		font-family:HeitiCSEG;
		font-weight:normal;
		background: #F23DA6;
		color:rgba(255,255,255,1);
		font-weight:400;
	}
	
	.second-nav-text-left {
		margin-left:106rpx;
		margin-top:243rpx;
		font-size:32rpx;
		font-family:SourceHanSansSC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	
	
	
	#icon-view {
		flex-direction: row;
		justify-content: center;
	}
	
	#upgrade-vipinfo-view, #help-center-view, #contact-customer-view, #complaint-view {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width:157.5rpx;
	}
	
	.search-class {
		font-size:27rpx;
		font-family:SourceHanSansSC;
		font-weight:400;
		color:rgba(255,255,255,1);
		color: green;
	}
	
	#search-view {
		width:686rpx;
		height:80rpx;
		/*background:rgba(255,255,255,1);*/
		background: rgba(36, 104, 231, 1);
		border-radius:20px;
		align-items: center;
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-top:144rpx;
	}
	
	#search-text {
		display: flex;
		height:80rpx;
		font-size:27rpx;
		font-family:SourceHanSansSC;
		font-weight:400;
		color:rgba(255,255,255,1);
		width:80%;
		margin-left:15px;
	}
	
	#content-view {
		display: flex;
		overflow-y:scroll ;
		-webkit-overflow-scrolling:touch;
		margin-left:32rpx;
		margin-right:32rpx;
		flex-direction: column;
	}
	
	#content-view-box {
		margin-top:35px;
		flex: 1;
	}
	
	.icon-view-contact {
		margin-top: 12px;
	}
	
	.contact-btn {
		display: flex;
		margin: 0;
		border: 0;
		background-color:transparent;
		padding:0;
		overflow: auto;
	}
	#contact-btn-view2 {
		height:33px;
		line-height: 1;
	}
	button::after {
		border: none;
		width:0;
		height: 0;
		-webkit-transform:scale(1);
	    transform:scale(1);
	    display: none;
	    background: transparent;
	}
	
	#search-btn-view {
		width:20%;
		justify-content: center;
	}
</style>
