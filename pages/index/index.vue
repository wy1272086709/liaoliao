<template>
<view id="root-view" :style="'background:rgba(0,0,0,'+opacity+');'">
		<!-- :style="'height:'+contentHeight+'px;'" -->
	<scroll-view :show-scrollbar="false">
		<scroll-view :show-scrollbar="false">
			<!-- 判断用户这个版本是否第一次进入,小程序中,这个值始终为true,APP中需要通过接口来判断 -->
			<scroll-view id="container-view">	
				<view id="search-view"  @tap="gotoSearchWordPage">
					
					<view id="search-btn-view">
						<uni-icons type="search" :size="iconSize" :color="'#B2B2B2'"></uni-icons>
					</view>
					<text id="search-text" style="align-items:center;" class="app-search-class" :style="{zIndex: inputIndex}">
						大家都在搜
					</text>
				</view>
				
				
				<view id="search-result">
					<view>
						<text>当前总量</text> <text class="search-res-num"> {{ total}}</text><text style="margin-right: 8rpx;">条,</text>
						<text id="today-last-update">今日更新</text> <text class="search-res-num">{{ update_num }}</text><text>条</text>
					</view>
				</view>
				
				
				<!-- :style="'height:'+contentHeight+'px;' -->
				<view  id="content-view-box">
					<view id="content-view">
						<view class="nav-view" >
							<view class="first-nav">
								<image src="../../static/img/index/title.png" style="width:8rpx;height: 100%;line-height:48rpx;margin-right: 22rpx;"></image>
								<label :class="['first-nav-label', 'first-nav-even-label']" id="first-nav-label0" style="height: 100%;line-height:48rpx;">
									<text>{{navList0.firstNav ? navList0.firstNav.title: ''}}</text>
								</label>
								<label class="first-nav-content first-nav-same-class" style="height: 100%;line-height:48rpx;">
									<text>{{navList0.firstNav ? navList0.firstNav.content: ''}}</text>
								</label>
							</view>
							<view class="second-nav">
								<second-nav :index ="0" :secondNav="navList0.secondNav"></second-nav>
							</view>
						</view>
						
						<view class="nav-view" >
							<view class="first-nav">
								<image src="../../static/img/index/title.png" style="width:8rpx;height: 100%;line-height:48rpx;margin-right: 22rpx;"></image>
								<label :class="['first-nav-label', 'first-nav-odd-label']"  id="first-nav-label1" style="height: 100%;line-height:48rpx;">
									<text>{{navList1.firstNav ? navList1.firstNav.title:''}}</text>
								</label>
								<label class="first-nav-content first-nav-same-class" style="height: 100%;line-height:48rpx;">
									<text>{{navList1.firstNav ? navList1.firstNav.content: ''}}</text>
								</label>
							</view>
							<view class="second-nav">
								<second-nav :index ="1" :secondNav="navList1.secondNav"></second-nav>
							</view>
						</view>
						
						
						<view v-for="(item,index) in appNavList" class="nav-view" :key="item.firstNav.navId">
							<view class="first-nav">
								<image src="../../static/img/index/title.png" style="width:8rpx;height: 100%;line-height:48rpx;margin-right: 22rpx;"></image>
								<label :class="['first-nav-label', index%2==0?'first-nav-even-label':
								'first-nav-odd-label']" style="height: 100%;line-height:48rpx;">
									<text>{{item.firstNav.title}}</text>
								</label>
								<label class="first-nav-content first-nav-same-class" style="height: 100%;line-height:48rpx;">
									<text>{{item.firstNav.content}}</text>
								</label>
							</view>
							<view class="second-nav">
								<second-nav :index ="index+2" :secondNav="item.secondNav"></second-nav>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</scroll-view>
	</scroll-view>
</view>
</template>

<script>
	//import tabBar from '../../common/tabbar.vue';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import lsSwiper from '../../components/ls-swiper/index.vue';
	import customSwiper from '@/components/blackmonth-swiper/index';
	import secondNav from '@/common/get_second_nav.vue';
	
	export default {
		data() {
			return {
				platForm: 0,
				opacity: 0,
				iconSize: '',
				keyword: '',
				isIphoneX: false,
				navList: [],
				lineHeight: '',
				headerHeight: '',
				contentHeight: 543,
				secondNavMarginTop: 0,
				adsArr: [],
				inputIndex: 0,
				base_lsit: [],
				marginBottom: 0,
				total: '121552',
				update_num: '369',
				/*isShowMask: false,
				maskClass: '',
				arrowLeft: '',
				arrowTop: '',
				searchInputTop: '',
				searchInputLeft: '',
				firstMeetTop:'',
				firstMeetLeft: '',
				impressionTop: '',
				arrow1Top: '',
				arrow1Left: '',
				impressionArrowTop: '',
				impressionArrowLeft: '',
				firstMeetArrowTop: '',
				firstMeetArrowLeft: '',
				infoUpdateTop: '',
				todayUpdateLeft: '',
				todayUpdateTop: '',
				nextTop: '',
				nextLeft: '',*/
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
			customSwiper,
			secondNav
		},
		computed:{
			firstTitle:function() {
				const l = this.navList;
				if(l.length>0) {
					return l[0].firstNav.title;
				}
				return '';
			},
			secondTitle:function() {
				const l = this.navList;
				console.log('seoncdTitle', l);
				if(l.length>0) {
					return l[1].firstNav.title;
				}
				return '';
			},
			navList0: function() {
				const list = this.navList.length>0 ? this.navList[0]: {};
				console.log('list', list);
				return list;
			},
			navList1: function() {
				return this.navList.length>0 ? this.navList[1]: {};
			},
			appNavList: function() {
				return this.navList.length>0 ? this.navList.slice(2): [];
			},
			/*
			MiddleArrowTop: function() {
				return (this.firstMeetTop + this.impressionTop) /2;
			}*/
		},
		methods: {
			gotoNext() {
				uni.navigateTo({
					url: '/pages/cases/index'
				});
			},
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
			moveHandle(e) {
				return false;
			},
			async getElementData(selector) {
				const q = uni.createSelectorQuery().select(selector);
				let info = null;
				await q.boundingClientRect(data=> { // data - 各种参数
					console.log('data', data);
					info = data;
					if(selector == '#today-last-update' && data) {
						this.todayUpdateLeft = data ? data.left: '';
						this.todayUpdateTop = data ? data.top: '';
					}
					console.log('this.todayUpdateTop', this.todayUpdateTop);
					if (selector == '#first-nav-label0' && data) {
						this.firstMeetTop   = data.top;
					} 
					if(selector == '#first-nav-label1' && data) {
						this.impressionTop  = data.top;	
					}
					this.infoUpdateTop = this.todayUpdateTop+uni.upx2px(47)+14;
					this.arrow1Top     = this.infoUpdateTop - uni.upx2px(47);
					console.log('this.firstMeetTop', this.firstMeetTop, 'this.impressionTop', this.impressionTop);
					//初次约会
					return info;
				}).exec();
				//return info;
			},
			clickItem(e) {
				console.log('item', e);
				uni.navigateTo({
					url: e.ad_content
				});
			},
			/*showMaskView() {
				let  _self = this;
				//_self.maskClass = 'maskClass';
				//_self.isShowMask= true;
				this.searchInputTop = 40;
				this.searchInputLeft = 32;
				this.arrowLeft = 540;
				this.arrowTop  = 110;
				//this.firstMeetLeft = 32;
				//this.firstMeetTop = 323;		
				this.getElementData('#today-last-update');
				this.getElementData('#first-nav-label0');
				this.getElementData('#first-nav-label1');
			},*/
			hideMaskView(selector) {
				
			},
			getIndexBottom(index) {
				
				let arr = [ 62,51,60,64,20,20 ];
				return arr[index];
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
					console.log('resp pages/index/index:', resp);
					const n = resp.length;
					_self.navList = resp;	
					//_self.showMaskView();
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
			//this.showMaskView();
			//#ifdef MP-WEIXIN || MP-QQ 
			this.setIosBackground();
			//#endif
		},
		onShow() {
			/*const v = util.getVersionValue();
			if(v) {
				this.maskClass = '';
				this.isShowMask= false;
			} else {
				this.maskClass = 'maskClass';
				this.isShowMask= true;
			}*/
		},
		onReady() {
			console.log('on Ready...');
			
		},
		onLoad() {
			this.getNavList();
			//this.getAdsInfo();
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
			
			// #ifdef APP-PLUS || H5
			this.contentHeight   = winHeight; 
			// #endif
			
			// #ifdef MP-WEIXIN || MP-QQ
			this.contentHeight   = winHeight - bottom; 
			//this.marginBottom = 60;
			// #endif
			this.platForm = getApp().globalData.platform;
			this.searchViewBottom = 0;
			//this.firstNavTop = 20;
			
			// #ifdef MP-WEIXIN || MP-QQ
			this.iconSize = searchViewHeight - 10;
			// #endif
			
			// #ifdef APP-PLUS || H5
			this.iconSize = 19;
			this.nextTop  = winHeight - 60;
			// #endif
			
			//#ifdef APP-PLUS
			/*plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				console.log(wgtinfo);
				let v = wgtinfo.version;   //版本号
				let k = 'app_version_'+v;
				uni.setStorageSync(k, 1);
			});*/
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
		
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #A6A6A6;
		/*margin-top:15rpx;*/
	}

	
	
	.first-nav-label {
		
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #272727;
	}
	
	.first-nav-even-label {
		/*color:rgba(109, 142, 217, 1);*/
	}
	
	.first-nav-odd-label {
		/*color:rgba(242,61,166,1);*/
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
	}
	
	.app-search-class {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #B2B2B2;
	}
	
	#search-view {
		width:686rpx;
		
		/*background:rgba(255,255,255,1);*/
		/* #ifdef MP-WEIXIN|| MP-QQ */
		background: rgba(36, 104, 231, 1);
		margin-top:144rpx;
		border-radius:20px;
		height:80rpx;
		/* #endif */
		
		/* #ifdef APP-PLUS || H5 */
		background: #F3F3F3;
		margin-top:40rpx;
		margin-bottom: 53rpx;
		height: 60rpx;
		background: #F3F3F3;
		border-radius: 30rpx;
		padding-top:17rpx;
		padding-bottom: 17rpx;
		padding-left:21rpx;
		/* #endif */
		
		align-items: center;
		margin-left: 32rpx;
		margin-right: 32rpx;
	}
	
	#search-result {
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-top:53rpx;
		margin-bottom: 80rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #626262;
		
		color:#898989;
		
	}
	.search-res-num {
		color:#A88FEF;	
		margin-left:10rpx;
		margin-right: 10rpx;
	}
	
	#search-text {
		display: flex;
		font-size:27rpx;
		font-family:SourceHanSansSC;
		font-weight:400;
		/* #ifdef MP-WEIXIN || MP-QQ */
		color:rgba(255,255,255);
		height:80rpx;
		margin-left:15px;
		width:80%;
		/* #endif */
		
		/* #ifdef APP-PLUS */
		color:#B2B2B2;
		height:100%;
		width:100%;
		/* #endif */
		
		
		
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
		/* #ifdef MP-WEIXIN || MP-QQ */
		width:20%;
		/* #endif */
		
		display: flex;
		justify-content: center;
	}
	
	.first-nav {
		height: 48rpx;
	}
	
	.second-nav {
		margin-top: 51rpx;
	}
</style>
