<template>
	<view>
		<u-navbar :is-back="false" title="" :borderBottom="true" :isFixed="true"  :zIndex="10000000000000001">
			<template v-slot:default="">
				<view class="slot-wrap">
					<view id="slot-img" @tap="gotoTop">
						<image src="../../static/img/index/app_logo.png" style="width:191rpx;height:45rpx;"></image>
					</view>
					<view id="slot-input"  @tap="gotoKeywordPage">
						<uni-icons  type="search" id="search-icon" color="#CCCCCC"></uni-icons>
						<input placeholder="大家都在搜" disabled="true" placeholder-class="search-holder" id="search-input">
					</view>
				</view>
			</template>
		</u-navbar>
			<view id="root-view">
				<view id="ads-view">
					<ls-swiper :list="base_lsit" imgKey="ad_img" :crown="true" :loop="true" :shadow='true' :height="160" :previousMargin="60"
					 :nextMargin="60" :imgRadius="5" :autoplay="true" :interval="6000" @clickItem="clickItem" />
				</view>
				<view id="margin-area-view">
					<view id="huashu-view-box" class="padding-css">
						<view class="huashu-first-line" @tap="gotoHome">
							<view style="display: block;height: 40rpx;line-height: 1;">
								<image src="../../static/img/index/title.png" class="title-icon" style="display: block;float: left;height: 40rpx;line-height: 1;"></image>
								<text class="font-css" style="display: block;float:left;height: 40rpx;line-height: 1;">话术教学</text>
							</view>
							<text class="more-text" >更多话术></text>
						</view>
						<view class="huashu-second-line">
							<!-- (index2==0 ? 'margin-right:24rpx': (index2==1?'margin-right:26rpx':'')) -->
							<view v-for="(nav,index2) in appNavList" @tap="enter_huashu(nav.title, nav.navId);"  :class="['second-nav-three-row', index2>=3?'bottom-nav-row':'']" :style="'background-image:url('+nav.litpic+');'" :key="nav.navId">
								<text>{{nav.title}}</text>
							</view>
						</view>
					</view>
					
					<view id="miaoyu-test" class="padding-css">
						<view class="huashu-first-line">
							<view style="display: block;height: 40rpx;line-height: 1;">
								<image src="../../static/img/index/title.png" class="title-icon" style="display: block;float:left;height: 40rpx;line-height: 1;"></image>
								<text class="font-css" id="test-title" style="display: block;float:left;height: 40rpx;line-height: 1;">测一测</text>
							</view>							
							<text class="more-text" @tap="gotoTestList">更多测试></text>
						</view>
						<view class="swiperTest">
							<view class="tower-swiper" @touchmove="TowerMove" @touchstart="TowerStart" @touchend="TowerEnd">
								<view class="tower-item" @tap="goTesting(item.nid, item.title)" :class="item.zIndex==1?'none':''" v-for="(item,index) in swiperList" :key="index" :style="[{'--index': item.zIndex,'--left':item.mLeft}]" :data-direction="direction">
									<view class="swiper-item">
										<image :src="item.thumbUrl_tj" mode="aspectFill"></image>
										<view>
											<text style="color:white">{{item.title}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					
					<view id="cases-content">
						<view class="cview padding-css" v-for="(item,index) in casesNavList" :key="index">
							<view class="huashu-first-line" @tap="gotoCaseList(item[0].cid)">
								<view style="display: block;height: 40rpx;line-height: 1;">
									<image src="../../static/img/index/title.png" class="title-icon" style="display: block;float:left;height: 40rpx;line-height: 1;"></image>
									<text class="font-css" style="display: block;float:left;height: 40rpx;line-height: 1;">{{item[0].classname}}</text>
								</view>
								<text class="more-text">查看更多 ></text>
							</view>
							<view class="content-view">
								<view v-for="(info,m) in item" class="content-root-view"  @tap="getArticleView(info.id, info.cid, item[0].classname)" :key="info.id">
									<view class="content-img-view">
										<image :src="info.thumbUrl" class="thumb-class"></image>
									</view>
									<view class="content-titleinfo-view">
										<view class="content-title-view">
											<text>{{info.title}}</text>
										</view>
										<view class="content-desc-view">
											<text>{{info.description}}</text>
										</view>
									</view>
								</view>
							</view>
					</view>
				</view>
			</view>
		</view>
		<!--
		<view id="absolute-view" :class="maskClass" @touchmove.stop.prevent="moveHandle">
			<uni-transition :show="isShowMask" :modeClass="['slide-top']">
				<view  :style="'position:absolute;top:'+searchInputTop+'px;left:'+searchInputLeft+'px;'">
					<image src="../../static/img/index/mask/search_border.png" style="display:flex;width:400rpx;height: 60rpx;"></image>
				</view>
				<!-- 输入妹子说的话 -->
				
				<!--
				<view>
					<view :style="'position:absolute;top:'+arrow1Top+'px;left:'+arrow1Left+'px;'">
						<image src="../../static/img/index/mask/arrow2.png" style="display:flex;width:50rpx;height: 37rpx;"></image>
					</view>
					<view class="mask-text" :style="'position:absolute;top:'+girlHuashuTop+'px;left:145rpx;'">
						<text>输入妹子说的话</text>
					</view>
				</view>
				
				<!-- 测一测 -->
				<!--
				<view id="test-mask" :style="'position:absolute;top:'+testTop+'px;left:'+testLeft+'px;'">
					<text id="test-mask-title">测一测</text>
					<image src="../../static/img/index/mask/app_index_arrow.png" :style="'top:'+testTextTop+'px;'"></image>
					<text id="test-mask-info">全新玩法，你了解自己吗？</text>
				</view>
				
				<view :style="'position:absolute;top:'+nextTop+'px;left:0rpx;width:100%;z-index:10000000056666'" id="nextBtn" class="mask-text" @tap="gotoNext()">
					<view>
						<text>下一步</text>
					</view>
				</view>
			</uni-transition>
		</view>
		-->
	</view>
</template>

<script>
	import uNavbar  from '../../uview-ui/components/u-navbar/u-navbar.vue';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import lsSwiper from '../../components/ls-swiper/index.vue';
	
	import customSwiper from '@/components/blackmonth-swiper/index';
	
	
	export default {
		data() {
			return {
				base_lsit: [],
				appNavList: [],
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				/*maskClass: '',
				isShowMask: false,
				searchInputTop: '',
				searchInputLeft: '',
				testTop: '',
				arrow1Left: '',
				arrow1Top: '',
				testLeft: '',
				girlHuashuTop: '',
				testTextTop: '',
				nextTop: '',*/
				//恋爱技巧栏目内容列表
				casesNavList: []
			}
		},
		components:{
			customSwiper,
			lsSwiper,
			uNavbar
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
		onLoad() {
			this.getSwiperList();
			
			this.getCategoryArr();
			this.getAdsInfo();
			this.getNavList();
			
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
			/*const m = uni.createSelectorQuery().select('#slot-input');
			m.boundingClientRect((data)=>{
				console.log('data', data);
				this.searchInputTop = data.top;
				this.searchInputLeft= data.left;
				//this.maskClass = 'maskClass';
				//this.isShowMask= true;
				this.nextTop   = uni.getSystemInfoSync().windowHeight - 60;
				this.arrow1Left = this.searchInputLeft-uni.upx2px(50);
				this.arrow1Top  = this.searchInputTop+uni.upx2px(60);
				this.girlHuashuTop = this.arrow1Top+uni.upx2px(37);
			}).exec();
			
			
			
			const h = uni.createSelectorQuery().select('#test-title');
			
			h.boundingClientRect((data)=>{
				console.log('data222', data);
				this.testTop = this.nextTop - uni.upx2px(440);
				this.testLeft= data.left;
				this.testTextTop  = data.top-uni.upx2px(11);
			}).exec();
			*/
		},
		methods: {
			// 点击事件
			clickItem(item) {
				console.log('item:', item);
				const url = item.ad_content;
				uni.navigateTo({
					url:url
				});
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
			gotoTesting(index) {
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
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=news&ac=indextj";
				const respData = await http.request(url, {
					auth: auth,
					cid: [69, 68, 1, 2]
				});
				this. casesNavList = respData;
				console.log('respData', respData);
			},
			async getNavList() {
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
				/*const secondNavList  = resp[0].secondNav;
				const secondNavList2 = resp[5].secondNav;
				const picArr1 = this.arrayColumn(secondNavList, 'litpic');
				const picArr2 = this.arrayColumn(secondNavList2, 'litpic');
				const picArr  = picArr1.concat(picArr2);
				for(let j = 0;j<n;j++) {
					appNavList[j].litpic = picArr[j];
				}*/
				console.log('appNavList', appNavList);
				this.appNavList = appNavList;
				return appNavList;
			},
			arrayColumn(array, columnName) {
			    return array.map(function(value,index) {
			        return value[columnName];
			    })
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
			async getSwiperList() {
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
				if(resp.status == 1) {
					console.log('resp.data', resp.data);
					this.swiperList = resp.data;
				} else {
					this.swiperList = [];
				}
				this.TowerSwiper('swiperList');
			},
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				console.log('list', list);
				this.swiperList = list
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
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style lang="scss">
	@import "../../colorui/main.css";
	body {
		background: #FFFFFF;
		font-size: 28upx;
		color: #333333;
	}
	#root-view {
		background: #F2F2F2;
	}
	
	.title-icon {
		width: 8rpx;	
		height: 36rpx;
		margin-right: 22rpx;
	}
	
.slot-wrap {
	display: flex;
	align-items: center;
	flex:1;
	margin-top:55rpx;
	padding-left:34rpx;
	padding-right:35rpx;
	justify-content: space-between;
	margin-bottom:31rpx;
	padding-bottom: 20rpx;
	
	#slot-img {
		display: flex;
		align-items: center;
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
		.font-css {
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
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				
			}
			.bottom-nav-row {
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
				width:464rpx;
				flex-wrap: wrap;
				flex-direction: column;
				justify-content: space-between;
			}
			
			.content-title-view {
				width:492rpx;
				display: block;
				overflow: hidden;
				/* height: 60px; */
				text-overflow: ellipsis;
				display: -webkit-box;
				word-break: break-all;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				/*word-break: break-all;*/
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
		}
	}
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
}

#test-mask {
	#test-mask-title {
		font-size: 46rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #FFFFFF;
	}
	
	#test-mask-info {
		margin-left:62rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #FEFEFE;
	}
	
	image {
		position:absolute;
		width:62rpx;
		height: 11rpx;
	}
}

.mask-text {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #FEFEFE;
}

</style>
