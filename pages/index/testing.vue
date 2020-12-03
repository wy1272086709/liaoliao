<template>
	<view id="root-view">
		<!--
		<scroll-view id="tab-scroll" :scroll-x="true"  :show-scrollbar="false" :scroll-into-view="scrollInto">
			<!-- 初始尺寸设置为120rpx,   去掉header-view width 属性, 设置元素的flex-shrink 为0，在子元素上-->
			<!--
			<view  class="header-view-box">
				
				<view  v-for="(tab,index) in tabArr" :key="tab.navId" :id="'tab_'+tab.navId" :data-index="index" @tap.cancel="switchTab(index)" :style="'flex-basis:'+basisWidth+'rpx;'">
					<view>
						<text :style="index==activeTabIndex ? 'border-bottom: 4rpx solid #A88FEF;color:#A88FEF': ''">{{ tab.title }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		-->
		<u-tabs v-if="control" gutter="33" bg-color="#F2F2F2" :name="'title'" :bold="bold" :active-color="activeColor" :list="tabArr"
		@change="change" :bar-width="110" :current="activeTabIndex" :is-scroll="isScroll"></u-tabs>
		
		<view id="testing-content">
			<swiper :current="activeTabIndex" :scroll-with-animation="true" 	@change="switchTestingTab" :style="'width:100%;height:'+scrollHeight+'px;'">
				<swiper-item :style="'width:100%;height:'+scrollHeight+'px;'" v-for="item in tabArr" :key="item.navId" class="swiper-item-css">
					<scroll-view :enable-flex="true" enable-back-to-top="true" :style="'height:'+scrollHeight+'px;'" :scroll-y="true"  @scrolltolower="lower">
						<view style="height:20px;">
							
						</view>
						<view class="scroll-view-content">
							<view class="testing-box" v-for="(item,index) in testingList" :key="item.nid">
								<view class="testing-title-view " @tap="gotoTesting(item)" :style="{backgroundImage:'url('+item.thumbUrl+')'}">
									<view class="has-pass">
										<view :style="item.test_status == 1 ? 'background-color:#419FFF;':'background-color:#E93EE3'">{{ statusText(index) }}</view>
									</view>
									<view class="testing-title">
										{{item.title}}
									</view>
								</view>
								<view class="testing-stat-view">
									<view class="testing-stat-button" @tap="gotoTesting(item)">
										<view v-if="!uid || item.test_status == 0">立即测试</view>
										<view v-if="uid && item.test_status == 1">再测一遍</view>
									</view>
									<view class="testing-num">
										<text class="num">{{item.test_num}}</text>
										<text>人测过</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import http from '../../common/http.js';
	let nowpage = 1;
	let totalpage = 1;
	let pageSize = 10;
	let interval;
	export default {
		data() {
			return {
				tabArr: [
					{ navId: 1, title: '情感' },
					{ navId: 2, title: '运势' },
					{ navId: 3, title: '星座' },
					{ navId: 4, title: '趣味' },
				],
				activeTabIndex: 0,
				scrollInto: '',
				testingList: [ 
					/*{
						title: '测测你的IQ值是多少?',
						num: '666',
						status: 1,
					}, {
						title: '抽签测今天运势',
						num: '666',
						status: 0,
					}*/
				],
				scrollHeight: '',
				status: 0,
				current: 0,
				isScroll: true,
				bold: true,
				control: true,
				activeColor: '#A88FEF'
			}
		},
		computed:{
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			},
			basisWidth: function() {
				//const n = this.tabArr.length;
				//const m = Math.ceil(n/2);
				//return  Math.floor(686/m);
				return 171.5;
			},
			cid: function() {
				return this.tabArr.length>0 ? this.tabArr[this.activeTabIndex].navId: 0;
			}
		},
		onLoad() {
			this.getTestingList(1);
			this.getTestingTab();
			const sysinfo = uni.getSystemInfoSync();
			this.scrollHeight = sysinfo.windowHeight - uni.upx2px(106);
		},
		onReachBottom() {
			// 获取第二页的测一测列表
			let _self = this;
			console.log('page',nowpage);
			if(nowpage>=totalpage) {
				clearTimeout(interval);
				return;
			}
			interval = setTimeout(function() {
				nowpage++;
				console.log('page....',nowpage);
				_self.getTestingList(nowpage, true);
			}, 500);
		},
		methods: {
			lower() {
				let _self = this;
				console.log('lower page',nowpage);
				if(nowpage>=totalpage) {
					clearTimeout(interval);
					return;
				}
				interval = setTimeout(function() {
					nowpage++;
					console.log('page....',nowpage);
					_self.getTestingList(nowpage, true);
				}, 500);
			},
			change(index) {
				this.activeTabIndex = index;
				nowpage = 1;
				// 这里刷新测试列表...
				this.getTestingList(1);
			},
			switchTab(index) {
				this.activeTabIndex = index;
				//this.scrollInto = 'tab_'+this.tabArr[index].navId;
				// 切换tab 重置nowpage 值
				nowpage = 1;
				// 这里刷新测试列表...
				this.getTestingList(1);
			},
			switchTestingTab(e) {
				const thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;
				console.log('thisCurr', thisCurr);
				if(thisCurr == this.activeTabIndex) {
					return;
				}
				this.activeTabIndex = thisCurr;
				this.scrollInto = 'tab_'+this.tabArr[thisCurr].navId;
				// 切换tab 重置nowpage 值
				nowpage = 1;
				// 这里刷新测试列表...
				this.getTestingList(1);
			},
			statusText(index) {
				if(!this.uid) {
					return '未测试';
				}
				let statusArr = {
					0: '未测试',
					1: '已测试'
				};
				const status = this.testingList[index].test_status;
				return statusArr[status];
			},
			gotoTesting(item) {
				// 进入测试题目页面
				uni.navigateTo({
					url: '/pages/index/testing_questions?nid='+item.nid+'&title='+item.title
				});
			},
			getQuestionTab() {
				
			},
			// 获取测一测栏目的类别
			async getTestingTab() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					auth: auth,
					filterData: true
				};
				const route = '?mod=cyc&ac=get_all_cid';
				const url  = apiPrefix + route;
				const res  = await http.request(url, params);
				if (res.status == 1) {
					const r = res.data;
					const l = r.length;
					let tabArr = [];
					for(let m =0;m<l;m++) {
						const info = {
							//title:r[m].firstNav.title,
							title:r[m].firstNav.title,
							navId:r[m].firstNav.navId,
						}
						tabArr.push(info);
					}
					
					this.tabArr = tabArr;
				}
			},
			async getTestingList(pageNo, isAppend) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					uid: this.uid,
					auth: auth,
					nowpage: pageNo,
					filterData: true
				};
				if (this.cid ) {
					params.cid = this.cid;
				}
				const route = '?mod=cyc&ac=list';
				const url  = apiPrefix + route;
				const res  = await http.request(url, params);
				console.log('res', res);
				if (res.status == 1) {
					if(!isAppend) {
						totalpage        = res.totalpage;
						this.testingList = res.data;
					} else {
						this.testingList = this.testingList.concat(res.data);
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
	
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
		display: none;
	} 
	
#tab-scroll {
	display: flex;
	height: 50rpx;
	margin-left:32rpx;
	margin-right:32rpx;
	overflow-x: auto;
	width:686rpx;
	margin-top:56rpx;
	-webkit-overflow-scrolling: touch;
	.header-view-box {
		display: flex;
		
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #141414;
		
		view {
			height: 46rpx;
			display: flex;
			flex-shrink: 0;
			align-items: center;
			white-space: nowrap;
			flex-basis: 170rpx;
			justify-content: flex-start;
			/*margin-right:20px;*/
			view {
				height: 46rpx;
				/*padding-bottom: 5rpx;*/
				justify-content: center;
				text-align: center;
				align-items: center;
			}
		}
	}
}
#testing-content {
	display: flex;
	margin-left:32rpx;
	margin-right: 32rpx;
	.swiper-item-css {
		.scroll-view-content {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
	.testing-box {
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		width: 320rpx;
		height: 340rpx;
		margin-bottom: 33rpx;
		.testing-title-view {
			display: flex;
			width:320rpx;
			height:260rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			flex-direction: column;
			justify-content: space-between;
			border:1px solid black;
			background-repeat:'no-repeat';
			background-size:320rpx 260rpx;
			.has-pass {
				width:100%;
				height:42rpx;
				display: flex;
				justify-content: flex-end;
				view {
					display: flex;
					width:115rpx;
					justify-content: center;
					font-size:26rpx;
					background-color: #E93EE3;
					color: #FFFFFF;
					border-bottom-left-radius: 36rpx;
					border-top-right-radius: 20rpx;
				}
			}
			.testing-title {
				display: flex;
				justify-content: center;
				height:40rpx;
				background: #000000;
				opacity: 0.5;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				/*border-radius: 20rpx 20rpx 0rpx 0rpx;*/
			}
		}
		.testing-stat-view {
			margin-left:32rpx;
			margin-right: 32rpx;
			padding-top:20rpx;
			padding-bottom:20rpx;
			display: flex;
			justify-content: space-between;
			.testing-stat-button {
				
				display: flex;
				width: 120rpx;
				height: 40rpx;
				border: 1px solid #A88FEF;
				border-radius: 20rpx;
				justify-content: center;
				align-items: center;
				
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #A88FEF;
				border-radius: 20rpx;
			}
		
			.testing-num {
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color:#343434;
				}
				.num {
					color: #A88FEF;
				}
			}
		}
	}
}
</style>
