<template>
	<view id="root-view">
		<view id="container-view" :style="'height:'+winHeight+'px;'">
			<view id="ads-view" :style="'height:'+adsHeight+'px;'"></view>
			<view id="icon-view" :style="'height:'+iconHeight+'px;'">
				<view id="help-center-view"  @tap="help_center()">
					<view>
						<image class="icon-class" src="../../static/img/huashu/help_center.png"></image>
					</view>
					<view class="icon-view-text">
						<text class="icon-text">表情包</text>
					</view>
				</view>
				<view id="upgrade-vipinfo-view" @tap="upgrade_vip()">
					<view class="">
						<image class="icon-class" src="../../static/img/huashu/upgrade_vip.png"></image>
					</view>
					<view class="icon-view-text">
						<text class="icon-text">VIP升级</text>
					</view>
				</view>
				<view id="contact-customer-view" @tap="contact_consumer()">
					<view>	
						<button open-type="contact" @contact="handleContact()" class="contact-btn">
							<image class="icon-class" src="../../static/img/huashu/contact_consumer.png"></image>
						</button>
					</view>
					<view class="icon-view-text">
						<button open-type="contact" @contact="handleContact()" class="contact-btn">
							<text class="icon-text">联系客服</text>
						</button>
					</view>
				</view>
				<view id="complaint-view" @tap="complaint()">
					<view>
						<image class="icon-class" src="../../static/img/huashu/complaint.png"></image>
					</view>
					<view class="icon-view-text">
						<text class="icon-text">投诉建议</text>
					</view>
				</view>
			</view>
			
			<view id="search-view" :style="'height:'+searchViewHeight+'px;margin-top:'+searchViewTop+'px;'">
				<input id="search-text" type="text" placeholder="点击这里输入对方想说的话" placeholder-class="search-class"/>
				<uni-icons type="search" :size="iconSize"></uni-icons>
				<!--
				<uni-search-bar></uni-search-bar>
				-->
			</view>
			<scroll-view id="content-view" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
                @scroll="scroll" :style="'height:'+scrollHeight+'px;'">
				<view v-for="item in navList" class="nav-view">
					<view class="first-nav" :style="'margin-top:'+firstNavTop+'px;'">
						<label class="first-nav-icon">
						</label>
						<label class="first-nav-label">
							<text class="first-nav-text">{{item.firstNav}}</text>
						</label>
					</view>
					<view class="second-nav">
						<view :class="nav.navClass" :style="'height:'+secondNavLabelHeight+'px;'" @tap="enter_huashu(nav.title);" v-for="nav in item.secondNav">
							<text class="second-nav-text">{{nav.title}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<tabBar></tabBar>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	export default {
		data() {
			return {
				winHeight:0,
				scrollHeight: 0,
				adsHeight: 0,
				iconHeight: 0,
				searchViewHeight: 0,
				searchViewTop: 0,
				searchViewBottom: 0,
				firstNavTop: 0,
				secondNavLabelHeight: 0,
				iconSize: 0,
				navList: [{
					firstNav: '开场助手',
					secondNav: [ 
						{ title: '重新开场', navClass:'second-nav-label second-nav-lable-margin' }, 
						{ title: '土味情话', navClass:'second-nav-label second-nav-lable-margin' }, 
						{ title: '表情话术', navClass:'second-nav-label' }, 
						{ title: '表情话术', navClass:'second-nav-label second-nav-lable-margin second-nav-lable-top' }, 
						{ title: '表情话术', navClass:'second-nav-label second-nav-lable-margin second-nav-lable-top' },
					]
				}]
			}
		},
		mounted() {
			this.getNavList();
		},
		components:{
			tabBar
		},
		methods: {
			getNavList() {
				
			},
			handleContact() {
				console.log('handler...');
			},
			search() {
				
			},
			upgrade_vip() {
				// 升级
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
			contact_consumer() {
			
			},
			scroll() {
				
			},
			lower() {
				
			},
			upper() {
				
			},
			enter_huashu(title) {
				uni.navigateTo({
					url:'/pages/index/huashu?title='+encodeURIComponent(title)
				});
			}
		},
		onLoad() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			let ratio     = winHeight/731;
			ratio = ratio.toFixed(2);
			this.iconHeight = ratio *102; 
			this.adsHeight= ratio*188;
			this.winHeight = winHeight;
			this.searchViewHeight = 40* ratio;
			this.searchViewTop    = 20*ratio;
			this.searchViewBottom = 0;
			this.firstNavTop = 20*ratio;
			this.secondNavLabelHeight = 30*ratio;
			this.scrollHeight = winHeight - 188*ratio - 102*ratio - 80*ratio - 82;
			this.iconSize = this.searchViewHeight - 10;
		}
	}
</script>

<style scoped>
	* {
		border-sizing:border-box;
	}
	view,scroll-view {
		display: flex;
	}
	
	#root-view {
		flex-direction: column;
	}
	
	#container-view {
		background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
		width: 750rpx;
		flex-direction: column;
	}
	
	#ads-view {
		width:750rpx;
	}
	
	#icon-view {
		margin-left:60rpx;
		margin-right:60rpx;
	}
	
	.icon-class {
		max-width:112rpx;
		max-height: 112rpx;
	}
	
	.icon-view-text {
		margin-top:8px;
		height: 33px;
	}
	
	.icon-text {
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	.nav-view {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}

	.second-nav,.first-nav {
		margin-left:34rpx;
		margin-right:34rpx;
	}
	
	.second-nav {
		margin-top:13px;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.first-nav-icon {
		display: inline-flex;
		width:3px;
		height:17px;
		background:rgba(255,255,255,1);
		border-radius:2px;
	}
	
	.first-nav-label {
		height:25px;
		display: inline-flex;
		margin-left: 10rpx;
	}
	
	.first-nav-label>text {
		font-size:14px;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(255,255,255,1);
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
	
	/* 除了第一个元素外的元素,需要添加这个  */
	.second-nav-lable-margin {
		margin-right:32rpx;
	}
	
	.second-nav-lable-top {
		margin-top:24rpx;
	}
	
	.second-nav-text {
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
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
	
	#search-view {
		width:686rpx;
		height:40px;
		background:rgba(255,255,255,1);
		border-radius:20px;
		align-items: center;
		margin-left: 32rpx;
		margin-right: 32rpx;
	}
	
	.search-class {
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(170,170,170,1);
	}
	
	#search-text {
		display: inline-block;
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(170,170,170,1);
		width:90%;
		margin-left:5px;
	}
	
	#content-view {
		height:150px;
	}
	
	.contact-btn {
		display: flex;
		line-height: 1;
		background-color:transparent;
		padding-top: 1px;
		padding-left:0px;
		padding-right: 0px;
	}
	button::after {
		border: none;
	}
</style>
