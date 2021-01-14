<template>
	<view>		
		<u-navbar :is-back="false" title="" :borderBottom="true" :isFixed="true"  :zIndex="10000000000000001" :height="navHeight">
			<template v-slot:default="">
				<view class="slot-wrap">
					<view id="slot-img" @tap="gotoTop">
						<image :lazy-load="true" src="../../static/img/index/app_logo.png"></image>					
						<!--
						<u-lazy-load :image="'../../static/img/index/app_logo.png'" @load="load1"></u-lazy-load>
						-->
					</view>
					<view id="slot-input"  @tap="gotoKeywordPage">
						<uni-icons  type="search" id="search-icon" color="#CCCCCC"></uni-icons>
						<input placeholder="大家都在搜" disabled="true" placeholder-class="search-holder" id="search-input">
					</view>
				</view>
			</template>
		</u-navbar>
		
		<scroll-view :style="'height:'+scrollHeight+'px;'"  :scroll-y="true" @scrolltolower="lower">
			<view id="root-view">
				<view id="ads-view">
					<ls-swiper :list="base_lsit" imgKey="ad_img" :crown="true" :loop="true" :shadow='true' :height="160" :previousMargin="60"
					 :nextMargin="60" :imgRadius="5" :autoplay="true" :interval="6000" @clickItem="clickItem" />
				</view>
				<view id="margin-area-view">
					<view id="huashu-view-box" class="padding-css">
						<view class="huashu-first-line" @tap="gotoHome">
							<view>
								<image :lazy-load="true"	src="../../static/img/index/title.png" class="title-icon"></image>								
								<!--
								<u-lazy-load :image="'../../static/img/index/title.png'" class="title-icon" @load="load2"></u-lazy-load>
								-->
								<!--  style="display: block;float:left;height: 40rpx;line-height: 1;" -->
								<text class="font-css">话术教学</text>
							</view>
							<text class="more-text" >更多话术></text>
						</view>
						<view class="huashu-second-line">
							<!-- (index2==0 ? 'margin-right:24rpx': (index2==1?'margin-right:26rpx':'')) -->
							<view v-for="(nav,index2) in appNavList" @tap="enter_huashu(nav.title, nav.navId);"  :class="['second-nav-three-row', index2>=3?'bottom-nav-row':'']"  :key="nav.navId">
							<!-- :style="'background-image:url('+nav.litpic+');'" -->
							<!--
								<u-lazy-load :image="nav.litpic" style="width:100%;height:100%;" @load="load2"></u-lazy-load>
								-->
								<image v-if="nav.litpic" :src="nav.litpic" style="width:100%;height:100%;" @load="loadHuashuImg(index2)"></image>
								<text style="position: absolute;">{{nav.title}}</text>
							</view>
						</view>
					</view>
					
					<view id="miaoyu-test" class="padding-css">
						<view class="huashu-first-line">
							<view>
								<!-- style="display: block;float:left;height: 40rpx;line-height: 1;" -->
								<image :lazy-load="true" src="../../static/img/index/title.png" class="title-icon" ></image>
								<!--
								<u-lazy-load :image="'../../static/img/index/title.png'" class="title-icon" @load="load3"></u-lazy-load>
								-->
								<!-- style="display: block;float:left;height: 40rpx;line-height: 1;" -->
								<text class="font-css" id="test-title" >测一测</text>
							</view>							
							<text class="more-text" @tap="gotoTestList">更多测试></text>
						</view>
						
						<view class="swiperTest">
							<view class="tower-swiper" @touchmove="TowerMove" @touchstart="TowerStart" @touchend="TowerEnd">
								<view class="tower-item" @tap="goTesting(item.nid, item.title)" :class="item.zIndex==1?'none':''" v-for="(item,index) in swiperList" :key="item.nid" :style="[{'--index': item.zIndex,'--left':item.mLeft}]" :data-direction="direction">
									<view class="swiper-item">
										<image v-if="item.thumbUrl_tj" :lazy-load="true" :src="item.thumbUrl_tj" mode="aspectFill" @load="loadTest(item.thumbUrl_tj)"></image>
										<view>
											<text style="color:white">{{item.title}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						
					</view>
					
					<view id="cases-content">
						<view class="cview padding-css" v-for="(item,index, index2) in casesNavList" :key="index">
							<view class="huashu-first-line" @tap="gotoCaseList(item[0].cid)">
								<view>
									<image :lazy-load="true" src="../../static/img/index/title.png" class="title-icon"></image>
									<!--
									<u-lazy-load :image="'../../static/img/index/title.png'" class="title-icon"></u-lazy-load>
									-->
									<text class="font-css">{{item[0] ? item[0].classname: '' }}</text>
								</view>
								<text class="more-text">查看更多 ></text>
							</view>
							<view class="content-view">
								<view v-for="(info,m) in item" class="content-root-view" :style="index2%2==0?'flex-direction:row':'flex-direction:row-reverse'"  @tap="getArticleView(info.id, info.cid, item[0]?item[0].classname:'')" :key="info.id">
									<view class="content-img-view">
										<image :lazy-load="true" v-if="info.thumbUrl" :src="info.thumbUrl" class="thumb-class" @load="loadItemPic(info.thumbUrl)"></image>
										<!--
										<u-lazy-load :image="info.thumbUrl" class="thumb-class"></u-lazy-load>
										-->
									</view>
									<view class="content-titleinfo-view">
										<view class="content-title-view">
											<text>{{info.title}}</text>
										</view>
										<view class="content-desc-view">
											<text>{{info.description}}</text>
										</view>
										<view class="content-stats-view">
											<view class="content-stats-view-readnum">
												<image :lazy-load="true"	src="../../static/img/cases/view.png" class="view-icon-class"></image>
												<text>{{info.readNum}}</text>
											</view>
											<view class="content-stats-view-praisenum">
												<image :lazy-load="true" src="../../static/img/cases/ok.png" class="praise-icon-class"></image>
												<text>{{info.wzsccs}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
					</view>
					</view>
					<!--
					<image :src="imgSrc"></image>
					-->
				</view>
			</view>
		</scroll-view>
		
		<u-no-network></u-no-network>
		
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import lsSwiper from '../../components/ls-swiper/index.vue';
	//import fileFunc from '../../common/file_func.js';
	export default {
		data() {
			return {
				base_lsit: [],
				appNavList: [],
				swiperList: [],
				navHeight: '',
				towerStart: 0,
				direction: '',
				//imgSrc: '',
				scrollHeight: '',
				//恋爱技巧栏目内容列表
				casesNavList: []
			}
		},
		components:{
			//customSwiper,
			lsSwiper,
			//uNavbar,
			//uNoNetwork
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
			this.getCategoryArr();
		},
		/*beforeDestroy() {
			this.casesNavList = this.base_lsit = this.appNavList = this.swiperList = [];
		},*/
		onLoad() {
			let d = new Date;
			console.log('app index onLoad time:'+d.getTime()+'ms' );
			const info = uni.getSystemInfoSync();
			this.platform = getApp().globalData.platform;
			this.navHeight= this.platform == 2 ? 54:58;
			this.scrollHeight = info.windowHeight - (this.platform == 2? 54:58) -info.statusBarHeight;			
			this.getSwiperList();
			this.getCategoryArr();
			this.getAdsInfo();
			this.getNavList();
			/*const url = 'http://imgmyqx.ofbei.com/upload1/20201016/20201016145146_992.jpg';
			fileFunc.createDir(url);
			const fileName = plus.io.convertLocalFileSystemURL("_downloads/upload1/20201016/20201016145146_992.jpg");
			console.log('fileName', fileName);
			this.imgSrc = "file://"+fileName;*/
		},
		onNavigationBarSearchInputChanged(e) {
		    console.log('onNavigationBarSearchInputChanged', e);
			// 跳转到
			uni.navigateTo({
				url: '/pages/index/keyword_page',
				complete(e) {
					console.log('navigateTo', e);
				}
			});
		},
		onReady() {
		},
		methods: {
			load1(index) {
				console.log('index', index);
			},
			loadHuashuImg(index) {
				/*console.log('话术图片');
				let d = new Date;
				console.log('index'+index+',img src:'+this.appNavList[index].litpic+' time:'+d.getTime());
				*/
			},
			loadTest(src) {
				/*console.log('测一测');
				let d = new Date;
				console.log(',img src:'+src+' time:'+d.getTime());*/
			},
			loadItemPic(src) {
				/*console.log('文章图片');
				let d = new Date;
				console.log(',img src:'+src+' time:'+d.getTime());*/
			},
			// 点击事件
			clickItem(item) {
				console.log('item:', item);
				const url = item.ad_content;
				uni.navigateTo({
					url:url
				});
			},
			lower() {
				
			},
			gotoTop() {
				uni.pageScrollTo({
					scrollTop:0
				});
			},
			moveHandle() {
				
			},
			gotoKeywordPage() {
				uni.navigateTo({
					url: '/pages/index/keyword_page'
				});
			},
			gotoNext() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			gotoTesting() {
				uni.navigateTo({
					url: '/pages/index/testing_questions'
				});
			},
			enter_huashu(title, navId) {
				uni.navigateTo({
					url:'/pages/index/huashu?title='+encodeURIComponent(title)+'&navId='+navId
				});
			},
			gotoHome() {
				// 跳转到之前的首页
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			goTesting(nid,title) {
				uni.navigateTo({
					url:'/pages/index/testing_questions?nid='+nid+'&title='+title
				});
				console.log('goTesting...');
			},
			// 跳转到测试列表页
			gotoTestList() {
				uni.navigateTo({
					url:'/pages/index/testing'
				});
			},
			gotoCaseList(cid) {
				uni.navigateTo({
					url: '/pages/cases/index?app_cid='+cid,
					fail(res) {
						console.log('fail', res);
					}
				});
			},
			getArticleView(id,cid, tabTitle) {
				console.log('getArticleView....', id, cid, tabTitle);
				// 获取文章详情信息
				uni.navigateTo({
					url:'/pages/cases/detail?id='+id+'&cid='+cid+"&title="+tabTitle
				});
			},
			async getCategoryArr() {
				let s1 = new Date();
				console.log('getCategoryArr--start', s1.getTime());
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=news&ac=indextj";
				const respData = await http.request(url, {
					auth: auth,
					cid: [69, 68, 1, 2]
				});
				this.casesNavList = respData;
				let s2 = new Date();
				console.log('getCategoryArr--end', s2.getTime());
				console.log('getCategoryArr cost '+(s2.getTime()- s1.getTime())+'ms');
				console.log('respData', respData);
			},
			async getNavList() {
				let s1 = new Date();
				console.log('getNavList--start', s1.getTime());
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=loveword&ac=get_all_cid";
				const resp= await http.request(url, {
					auth: auth
				});
				const n = resp.length;
				let appNavList = [];
				for(let i = 0;i<n;i++) {
					let item = {
						title: resp[i].firstNav.title,
						navId: resp[i].firstNav.navId,
						litpic: resp[i].firstNav.litpic
					};
					appNavList.push(item);
				}
				console.log('appNavList', appNavList);
				this.appNavList = Object.freeze(appNavList);
				let s2 = new Date();
				console.log('getNavList--end', s2.getTime());
				console.log('getCategoryArr cost '+(s2.getTime()- s1.getTime())+'ms');
			},
			getAdsInfo() {
				let s1 = new Date();
				console.log('getAdsInfo--start', s1.getTime());
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
						//this.adsArr = Object.freeze(resp.data);
						this.base_lsit = Object.freeze(resp.data);
					}
					console.log('adsArr:', this.adsArr);
					let s2 = new Date();
					console.log('getAdsInfo--end', s2.getTime());
					console.log('getAdsInfo cost '+(s2.getTime()- s1.getTime())+'ms');
				})
			},
			async getSwiperList() {
				let s1 = new Date();
				console.log('getSwiperList--start', s1.getTime());
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=cyc&ac=indextj";
				const resp = await http.request(url, {
					auth: auth,
					filterData: true,
					num:7,
				});
				let list = [];
				if(resp.status == 1) {
					console.log('resp.data', resp.data);
					list = resp.data;
					//this.swiperList = resp.data;
				} else {
					//this.swiperList = [];
				}
				this.TowerSwiper(list);
				let s2 = new Date();
				console.log('getSwiperList--end', s2.getTime());
				console.log('getSwiperList cost '+(s2.getTime()- s1.getTime())+'ms');
			},
			// 初始化towerSwiper
			TowerSwiper(list) {
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				console.log('list', list);
				this.swiperList = Object.freeze(list);
			},
			
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			
			// towerSwiper计算滚动
			TowerEnd() {
				let direction = this.direction;
				let list = this.swiperList;
				if(list.length<=0) {
					return;
				}
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < list.length; i++) {
						list[i - 1].mLeft = list[i].mLeft
						list[i - 1].zIndex = list[i].zIndex
					}
					list[list.length - 1].mLeft = mLeft;
					list[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = list.length - 1; i > 0; i--) {
						list[i].mLeft = list[i - 1].mLeft
						list[i].zIndex = list[i - 1].zIndex
					}
					list[0].mLeft = mLeft;
					list[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = Object.freeze(list);
			},
			constantize(obj) {
			  Object.freeze(obj);
			  Object.keys(obj).forEach( (key, i) => {
			    if ( typeof obj[key] === 'object' ) {
			      this.constantize( obj[key] );
			    }
			  });
			}
		}
	}
</script>

<style lang="scss">
	/*
	@import "../../colorui/main.css";
	*/
   scroll-view ::-webkit-scrollbar {
		display: none;
	   width: 0;
	   height: 0;
   }
	
.tower-swiper {
	height: 420upx;
	position: relative;
	max-width: 750upx;
	overflow: hidden;
}

.tower-swiper .tower-item {
	position: absolute;
	width: 300rpx;
	height: 380rpx;
	top: 0;
	bottom: 0;
	left: 50%;
	margin: auto;
	transition: all 0.2s ease-in 0s;
	opacity: 1;
}

.tower-swiper .tower-item.none {
	opacity: 0;
}

.tower-swiper .tower-item .swiper-item {
	width: 100%;
	height: 100%;
	border-radius: 6rpx;
	overflow: hidden;
}

	body {
		background: #FFFFFF;
		font-size: 28rpx;
		color: #333333;
	}
	image {
		will-change: transform;
	}
	#root-view {
		background: #F2F2F2;
	}
	
	.title-icon {
		width: 8rpx;	
		/*height: 36rpx;*/
		display: block;float: left;height: 40rpx;line-height: 1;
		margin-right: 22rpx;
	}
	
.slot-wrap {
	display: flex;
	align-items: center;
	flex:1;
	margin-top:35rpx;
	padding-left:34rpx;
	padding-right:35rpx;
	justify-content: space-between;
	margin-bottom:11rpx;
	padding-bottom: 20rpx;
	
	#slot-img {
		display: flex;
		align-items: center;
		image {
			width:191rpx;
			height:45rpx;
		}
	}
	#slot-input {
		display: flex;
		width:400rpx;
		height: 60rpx;
		border-radius: 30rpx;
		align-items: center;
		background: #F2F2F2;
		#search-icon {
			margin-left:21rpx;
			margin-right:19rpx;
		}
	}
}
#ads-view {
	display: flex;
	margin-left:30rpx;
	margin-right:30rpx;
	width:690rpx;
	/*background-color: #FFFFFF;*/
	padding-top:24rpx;
	padding-bottom: 30rpx;
	
	height:320rpx;
}

.wrap {
	width:690rpx;
}

.padding-css {
	padding-left:25rpx;
	padding-right:28rpx;
}

#margin-area-view {
	margin-left:30rpx;
	margin-right:30rpx;
	margin-top:54rpx;
	display: flex;
	flex-direction: column;
	width:690rpx;
	
	
	.huashu-first-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		view {
			display: block;
			height: 40rpx;
			line-height: 1;
		}
		.font-css {
			display: block;
			float:left;
			height: 40rpx;
			line-height: 1;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #272727;
		}
		.more-text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #A6A6A6;
		}
	}
	
	#huashu-view-box {
		display: flex;
		flex-direction: column;
		padding-top:37rpx;
		padding-bottom:40rpx;
		margin-bottom: 30.01rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		.huashu-first-line>text {
			display: flex;	
		}
		
		.huashu-second-line {
			margin-top:37rpx;
			/*margin-bottom:40px;*/
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			/*height: 500rpx;*/
			justify-content: space-between;
			align-items: space-between;
			.second-nav-three-row {
				display: flex;
				align-items: center;
				justify-content: center;
				width:190rpx;
				height:120rpx;
				color:#FFFFFF;
				background-size:contain;	
				background-repeat: no-repeat;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				text {
					display: flex;
					border-radius: 10rpx;
					padding: 5rpx 5rpx;
					background-color: rgba(0, 0, 0, 0.5);
				}
			}
			.bottom-nav-row {
				position:relative;
				margin-top: 32rpx;
			}
		}
	}
	#miaoyu-test {
		display: flex;
		flex-direction: column;
		width:100%;
		/*max-height:500px;*/
		padding-top:36rpx;
		padding-bottom: 39rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 30.01rpx;
		
		.swiperTest {
			display: flex;
			width:100%;
			/*height: 200px;*/
			.tower-swiper {
				display: flex;
				width: 100%;
				
				.tower-item {
					display: flex;
					justify-content: center;
					transform: scale(calc(0.5 + var(--index) / 10));
					margin-left: calc(var(--left) * 100upx - 150upx);
					z-index: var(--index);
					.swiper-item {
						position: relative;
						display: flex;
						justify-content: center;
						view {
							position: absolute;
							padding:0rpx 10rpx;
							border-radius: 10px;
							background-color: rgba(0, 0, 0, 0.5);
							top:180rpx;
							color:#FFFFFF;
						}
					}
				}
			}
		}
	}

	
	
	#cases-content {
		display: flex;
		flex-direction: column;
		
		.cview {
			display: flex;
			flex-direction: column;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-bottom: 30.01rpx;
			padding-top:38rpx;
			padding-bottom: 34rpx;
		}
	
		.content-root-view {
			display: flex;
			margin-top: 38rpx;
			.content-img-view  {
				display: flex;
				margin-right:22rpx;
				.thumb-class {
					width: 120rpx;
					height: 120rpx;
				}
			}
			
			.content-titleinfo-view {
				display: flex;
				width:496rpx;
				flex-wrap: wrap;
				flex-direction: column;
				justify-content: space-between;
			}
			
			.content-title-view {
				width:100%;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				/*display: -webkit-box;
				word-break: break-all;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;*/
				align-items: flex-start;
				margin-top:0rpx;
				text {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333232;
				}
			}
			.content-desc-view {
				width:492rpx;
				display: block;
				overflow: hidden;
				text-overflow:ellipsis;
				display: -webkit-box;
				word-break: break-all;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #A6A6A6;
			}
			
			.content-stats-view {
				width:492rpx;
				height:50rpx;
				display: flex;
				align-items: flex-end;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #9A9A9A;
				.content-stats-view-praisenum {
					
				}
				
				.content-stats-view-readnum {
					margin-right: 46rpx;
				}
			}
		}
	}
}

.view-icon-class {
	width:32rpx;height:20rpx;margin-right:13rpx;
}
.praise-icon-class {
	width:24rpx;height:24rpx;margin-right: 15rpx;
}

</style>
