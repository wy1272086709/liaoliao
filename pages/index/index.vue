<template>
	<view id="root-view">
		<view id="container-view" :style="'height:'+winHeight+'px;'">
			<view id="ads-view"></view>
			<view id="icon-view">
				<view id="upgrade-vipinfo-view">
					<view class="">
						<image class="icon-class" src="../../static/img/huashu/upgrade_vip.png"></image>
					</view>
					<view class="icon-view-text">
						<text class="icon-text">VIP升级</text>
					</view>
				</view>
				<view id="help-center-view">
					<view>
						<image class="icon-class" src="../../static/img/huashu/help_center.png"></image>
					</view>
					<view class="icon-view-text">
						<text class="icon-text">帮助中心</text>
					</view>
				</view>
				<view id="contact-customer-view">
					<view>
						<image class="icon-class" src="../../static/img/huashu/contact_consumer.png"></image>
					</view>
					<view class="icon-view-text">
						<text class="icon-text">联系客服</text>
					</view>
				</view>
				<view id="complaint-view">
					<view>
						<image class="icon-class" src="../../static/img/huashu/complaint.png"></image>
					</view>
					<view class="icon-view-text">
						<text class="icon-text">投诉建议</text>
					</view>
				</view>
			</view>
			
			<view id="search-view">
				<input id="search-text" type="text" placeholder="点击这里输入对方想说的话" placeholder-class="search-class"/>
				<uni-icons type="search"></uni-icons>
				<!--
				<uni-search-bar></uni-search-bar>
				-->
			</view>
			<scroll-view id="content-view" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
                @scroll="scroll">
				<view class="first-nav">
					<label class="first-nav-icon">
					</label>
					<label class="first-nav-label">
						<text class="first-nav-text">开场助手</text>
					</label>
				</view>
				<view class="second-nav">
					<view class="second-nav-label">
						<text class="second-nav-text">重新开场</text>
					</view>
					<view class="second-nav-label">
						<text class="second-nav-text">土味情话</text>
					</view>
					<view  class="second-nav-label">
						<text class="second-nav-text">表情话术</text>
					</view>
				</view>
				<view class="first-nav">
					<label class="first-nav-icon">
					</label>
					<label class="first-nav-label">
						<text class="first-nav-text">开场助手</text>
					</label>
				</view>
				<view class="second-nav">
					<view class="second-nav-label">
						<text class="second-nav-text">重新开场</text>
					</view>
					<view class="second-nav-label">
						<text class="second-nav-text">土味情话</text>
					</view>
					<view  class="second-nav-label">
						<text class="second-nav-text">表情话术</text>
					</view>
				</view>
				<view class="first-nav">
					<label class="first-nav-icon">
					</label>
					<label class="first-nav-label">
						<text class="first-nav-text">开场助手</text>
					</label>
				</view>
				<view class="second-nav">
					<view class="second-nav-label">
						<text class="second-nav-text">重新开场</text>
					</view>
					<view class="second-nav-label">
						<text class="second-nav-text">土味情话</text>
					</view>
					<view  class="second-nav-label">
						<text class="second-nav-text">表情话术</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<tabBar></tabBar>
	</view>
</template>

<script>
	import tabBar from '../../common/tabbar.vue';
	import uniIcons from "../../components/uni-icons/uni-icons.vue";
	
	export default {
		data() {
			return {
				winHeight:0
			}
		},
		components:{
			tabBar,
			uniIcons
		},
		methods: {
			search() {
				
			}
		},
		onLoad() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight;
		}
	}
</script>

<style>
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
		height: 661px;
		width: 750rpx;
		flex-direction: column;
	}
	
	#ads-view {
		height:188px;
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

	.second-nav,.first-nav {
		margin-left:34rpx;
		margin-right:34rpx;
	}
	
	.second-nav {
		margin-top:13px;
		justify-content: space-between;
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
		margin-top:12px;
		margin-bottom:20px;
		margin-left: 32rpx;
		margin-right: 32rpx;
	}
	
	.search-class {
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(170,170,170,1);
	}
	
	#search-text {
		display: inline-block;
		width:90%;
	}
	
	#content-view {
		height:150px;
	}
</style>
