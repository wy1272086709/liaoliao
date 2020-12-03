<template>
	<view>
		<u-navbar :isBack="false" title="" :borderBottom="true" :isFixed="true"  :zIndex="10000000000000001" :height="platform == 1? 98: 94">
			<template v-slot:default="">
				<view class="slot-wrap">
					<view id="search-box">
						<view id="slot-title" @tap="gotoTop">小妙教程</view>
						<view id="slot-input">
							<u-search placeholder="大家都在搜" @change="mindInput" v-model="keyword" :show-action="false"></u-search>
						</view>
					</view>
					<view id="tab-view">
						<u-tabs  gutter="33" bg-color="#FFFFFF" :name="'title'" :bold="bold" :active-color="activeColor" :list="tabArr"
						@change="change" :bar-width="110" :current="activeTabIndex" :is-scroll="isScroll"></u-tabs>
					</view>
				</view>
			</template>
		</u-navbar>
			
		<swiper :current="activeTabIndex" :scroll-with-animation="true" 	@change="switchVideoTab" :style="'width:100%;height:'+scrollHeight+'px;'">
			<swiper-item :class="[ 'swiper-item-css', index==0?'swiper-item-top':'' ]" v-for="(item,index) in tabArr" :key="item.navId">
				<scroll-view :style="'height:'+scrollHeight+'px;'"  scroll-y="true"	 
				@scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop" >
					<view v-if="activeTabIndex == 0">
						<view v-for="(info,m) in articeList" class="content-root-view"   @tap="getArticleView(info.id, info.cid, item[0]?item[0].classname:'')" :key="info.id">
							<view class="common-pic-view" :style="!isRecharge? 'background-image:url('+ info.thumbUrl+')':''">
								<view :class="[ isRecharge? 'content-img-view': 'default-suo-css']">
									<image :lazy-load="true" v-if="info.thumbUrl && isRecharge" :src="info.thumbUrl" 
									 class="thumb-class"
									@load="loadItemPic(info.thumbUrl)"></image>
									<!-- 未充值... -->
									<u-icon name='lock' color='#FFFFFF' size='38' v-if="!isRecharge"></u-icon>
								</view>
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
					<view v-else-if="activeTabIndex == 1">
						
					</view>
					<view v-else>
						<view>
							<!-- :danmu-list="danmuList" enable-danmu danmu-btn -->
							<video class="myVideo" controls	 src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
								@error="videoErrorCallback"></video>
						</view>	
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>	  				
	</view>
</view>
</template>

<script>
	let nowpage = 1;
	export default {
		data() {
			return {
				src: '',
				inputVal: '',
				keyword: '',
				scrollHeight: '',
				control: true,
				activeTabIndex: 0,
				isScroll: true,
				platform: '',
				bold: true,
				old: {
					scrollTop:0,
				},
				scrollTop: 0,
				suoImg: '../../static/img/suo.png',
				// 是否充值,false 表示未充值...
				isRecharge: false,
				activeColor: '#A88FEF',
				tabArr: [ 
					{ name: '文章专区', navId:1 }, 
					{ name: '音频专区',navId: 2 }, 
					{ name: '视频专区', navId: 3 }, 
				],
				articeList: []
				/*danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				speedValue: 1.0*/
			}
		},
		onReady() {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		onLoad() {
			const info = uni.getSystemInfoSync();
			this.platform = getApp().globalData.platform;
			this.scrollHeight = info.windowHeight - info.statusBarHeight - 20- uni.upx2px(60+80+8);
			this.articeList   = [
				{
					cid: "68",
					classname: "形象提升",
					description: "",
					id: "389",
					readNum: "15",
					readTime: "2020-11-11 16:37:27",
					sfsc: 0,
					thumbUrl: "http://imgmyqx.ofbei.com/upload1/20201111/20201111163727_759.jpg",
					title: "什么样的男生比较受欢迎",
					wzsccs: "1"
				}
			];
		},
		methods: {
			loadItemPic(src) {
				/*console.log('文章图片');
				let d = new Date;
				console.log(',img src:'+src+' time:'+d.getTime());*/
			},
			videoErrorCallback() {
				
			},
			getArticleView(id, cid, tabTitle) {
				if(!this.isRecharge) {
					uni.navigateTo({
						url: '/pages/user/score_list'
					});
					return;
				}
				// 获取文章详情信息
				uni.navigateTo({
					url:'/pages/cases/detail?id='+id+'&cid='+cid+"&title="+tabTitle
				});
			},
			switchVideoTab(e) {
				console.log('e', e);
				this.activeTabIndex = e.detail.current;
				//this.activeTabIndex = index;
			},
			inputFocus() {
				
			},
			mindInput() {
				
			},
			lower() {
				// 这里下拉加载数据...
				
			},
			scrollTopFunc() {
				
			},
			scroll() {
				
			},
			change(index) {
				this.activeTabIndex = index;
				nowpage = 1;
				// 这里刷新测试列表...
				
			},
			gotoTop() {
				
			},
			blurFunc() {
				const len = this.inputVal.length;
				console.log('input value....'+len+':--'+this.inputVal);
			},
			sendDanmu() {
				console.log('sendDanmu!...');
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			speedControl(v) {
				this.speedValue = v;
				this.videoContext.playbackRate(v);
			}
		}
	}
</script>

<style lang="scss">
.speed-list {
	background-color: #000000;
	width: 120px;
	height: 230px;
}

.u-tabs {
	
}
.slot-wrap {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	//margin-top:35rpx;
	/*padding-left:32rpx;*/
	/*padding-right:34rpx;*/
	/*padding-bottom: 20rpx;*/
	//margin-bottom:11rpx;
	//padding-bottom: 20rpx;
	justify-content: space-between;
	#search-box {
		display: flex;
		justify-content: flex-start;
		padding-top:10px;
		padding-bottom: 10px;
		#slot-title {
			display: flex;
			width:160rpx;
			/*flex-shrink: 1;*/
			height: 60rpx;
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #343434; 
		}
		
		#slot-input {
			display: flex;
			flex-direction: row-reverse;
			box-sizing: border-box;
			width:500rpx;
			height: 60rpx;
			margin-left:20rpx;
			padding-left: 20rpx;
			align-items: center;
			background: #F2F2F2;
			border-radius: 30rpx;
		}
	}

	#tab-view {
		
	}
}

.speed-list >view {
	color: #FFFFFF;
	text-align: center;
	font-size: 16px;
	height: 46px;
	line-height: 46px;
}

.myVideo {
	
	width:750rpx;
	/*width: 686rpx;
	margin-left:32rpx;
	margin-right: 32rpx;*/
}
.swiper-item-css {
	margin-top:20px;
}
.swiper-item-top {
	margin-top:0px;
}

view.active {
	color:#09BB07;
}

.test-img-css {
	width: 20vw;
	
}

.content-root-view {
	display: flex;
	flex-direction:row-reverse;
	margin-left:32rpx;
	margin-right: 32rpx;
	justify-content: space-between;
	margin-top: 38rpx;
	.content-img-view  {
		display: flex;
		margin-right:22rpx;
	}
	
	.default-suo-css {
		top:0;
		bottom: 0;
		left:0;
		right:0;
		margin:0;
		position: absolute;
		background-color: rgba(0,0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
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
			.praise-icon-class {
				width:32rpx;
				height:20rpx;
				margin-right:13rpx;
			}
		}
		
		.content-stats-view-readnum {
			margin-right: 46rpx;
			.view-icon-class{
				width:24rpx;
				height:24rpx;
				margin-right: 15rpx;
			}
		}
	}
}

.common-pic-view {
	display: flex;
	/*background-size: 120rpx 120rpx;*/
	width: 120rpx;
	height: 120rpx;
	background-size: 120rpx 120rpx;
	background-repeat: no-repeat;
	background-position: center;
	justify-content: center;
	position: relative;
	align-items: center;
}

.thumb-class {
	width: 120rpx;
	height: 120rpx;
}
.suo-img-css {
	width: 35rpx;
	height: 35rpx;
}
</style>
