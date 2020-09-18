<template>
	<view>
	<scroll-view :show-scrollbar="false">
		<scroll-view :show-scrollbar="false">
			<scroll-view id="container-view">
				<view id="ads-view">
					<ls-swiper :list="base_lsit" imgKey="ad_img" :crown="true" :loop="true" :shadow='true' :height="160" :previousMargin="60"
					 :nextMargin="60" :imgRadius="5" :autoplay="true" :interval="6000" />
				</view>
				<view id="margin-area-view">
					<view id="huashu-view-box">
						<view class="huashu-first-line">
							<text class="font-css">话术教学</text>
							<text class="more-text" @tap="gotoHome">更多话术></text>
						</view>
						<view class="huashu-second-line">
							<view v-for="(nav,index2) in appNavList" @tap="enter_huashu(nav.title, nav.navId);"  class="second-nav-three-row" :style="'background-image:url('+nav.litpic+');'+(index2==0 ? 'margin-right:24rpx': (index2==1?'margin-right:26rpx':''))" :key="nav.navId">
								<text>{{nav.title}}</text>
							</view>
						</view>
					</view>
					
					<view id="miaoyu-test">
						<view class="huashu-first-line">
							<text class="font-css">测一测</text>
							<text class="more-text" @tap="gotoTestList">更多测试></text>
						</view>
						<view id="swiperTest">
							<customSwiper :swiper-list="swiperList" />
						</view>
					</view>
					
					<view id="cases-content">
						<view class="cview" v-for="(item,index) in casesNavList" :key="index">
							<view class="huashu-first-line">
								<text class="font-css">{{item[0].classname}}</text>
								<text class="more-text" @tap="gotoCaseList(item[0].cid)">查看更多 ></text>
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
			</scroll-view>
		</scroll-view>
	</scroll-view>
		
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import lsSwiper from '../../components/ls-swiper/index.vue';
	import customSwiper from '@/components/blackmonth-swiper/index';
	
	export default {
		data() {
			return {
				base_lsit: [],
				appNavList: [],
				swiperList: [
					{
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
						title: '测试文字1111',
					}, 
					{
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
						title: '测试文字1111',
					}, 
					{
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
						title: '测试文字1111',
					}, 
					{
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
						title: '测试文字1111',
					}, 
					{
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
						title: '测试文字1111',
					}, 
				],
				//恋爱技巧栏目内容列表
				casesNavList: []
			}
		},
		components:{
			customSwiper,
			lsSwiper
		},
		onLoad() {
			this.getCategoryArr();
			this.getAdsInfo();
			this.getNavList();
		},
		methods: {
			gotoHome() {
				// 跳转到之前的首页
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			// 跳转到测试列表页
			gotoTestList() {
				
			},
			gotoCaseList(cid) {
				uni.reLaunch({
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
						navId: resp[i].firstNav.navId
					};
					appNavList.push(item);
				}
				const secondNavList  = resp[0].secondNav;
				const secondNavList2 = resp[5].secondNav;
				const picArr1 = this.arrayColumn(secondNavList, 'litpic');
				const picArr2 = this.arrayColumn(secondNavList2, 'litpic');
				const picArr  = picArr1.concat(picArr2);
				for(let j = 0;j<n;j++) {
					appNavList[j].litpic = picArr[j];
				}
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
			}
		}
	}
</script>

<style lang="scss">


#margin-area-view {
	margin-left:32rpx;
	margin-right:32rpx;
	margin-top:40px;
	display: flex;
	flex-direction: column;
	
	.huashu-first-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.font-css {
			font-weight: bolder;
			font-size:24px;
		}
		.more-text {
			font-size:16px;
		}
	}
	
	#huashu-view-box {
		display: flex;
		flex-direction: column;
		.huashu-first-line>text {
			display: flex;	
		}
		
		.huashu-second-line {
			margin-top:20px;
			margin-bottom:40px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			height: 500rpx;
			justify-content: space-between;
			align-items: space-between;
			.second-nav-three-row {
				display: flex;
				align-items: center;
				justify-content: center;
				width:212rpx;
				height:212rpx;
				color:#FFFFFF;
				background-size:contain;	
			}
		}
	}
}

#cases-content {
	margin-bottom: 20px;
	.cview {
		margin-top:40px;
	}

	.content-root-view {
		display: flex;
		margin-top: 32rpx;
		.content-img-view  {
			display: flex;
			margin-right:24rpx;
			.thumb-class {
				max-width: 200rpx;
				max-height: 160rpx;
				border-radius:20rpx;
			}
		}
		
		.content-titleinfo-view {
			display: flex;
			width:464rpx;
			height: 160rpx;
			flex-wrap: wrap;
			flex-direction: column;
		}
		
		.content-title-view {
			width:462rpx;
			display: flex;
			align-items: flex-start;
			height: 100rpx;
			text {
				font-size:26rpx;
				font-family:SimHei;
				font-weight:500;
				color:rgba(11,11,11,1);
			}
		}
	}
}
</style>
