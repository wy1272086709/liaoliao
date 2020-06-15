<template>
	<view class="root-view">
			<view id="content-view" :style="'height:'+contentHeight+'px'">
				<!-- 如果用微信登录，获取微信相关用户信息 -->
				<template v-if="userInfo.nickName==undefined">
					<view id="no-login-view">
						<view id="header-member-info">
							<view class="zx">
								<image class="tx-img" src="../../static/img/user/default_avatar.png"></image>
							</view>
						</view>
						<view id="grant-view">
							<button  type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo" id="login-btn">
								<text>点击登录/注册</text>
							</button>
						</view>
						<vip-info :level="level"></vip-info>
					</view>
				</template>
				<template v-if="userInfo.nickName!=undefined">
					<view class="li-view">
						<view id="header-member-info">
							<view class="zx">
								<image class="tx-img" :src="userInfo.avatarUrl"></image>
							</view>
						</view>
						<view id="header-view">
							<view class="name">
								<text class="nickname">
									{{userInfo.nickName}}
								</text>
							</view>
							<view class="member-class">
								<text>会员ID:   </text>
							</view>
						</view>
						<vip-info :level="level"></vip-info>
					</view>
				</template>
				<view id="bottom_list">
					<uni-list>
						<uni-list-item title="关于我们" thumb="/static/img/user/about_us.png"></uni-list-item>
						<uni-list-item title="专属客服" thumb="/static/img/user/contact_customer.png"  @tap="copy_customer_wechat()"  rightText="点击复制客服微信" :showArrow="false"></uni-list-item>
						<uni-list-item title="当前版本" thumb="/static/img/user/setting.png"  thumbrightText="1.9.3" :showArrow="false"></uni-list-item>
					</uni-list>
				</view>
			</view>
			<tabBar></tabBar>
			<scorll-view>
			     <view style="height:34px;" v-if="isIphoneX">
					
				 </view>
			</scorll-view>
	</view>
	
</template>


<script>
	import tabbar from '../../common/tabbar.vue';
	import vipInfo from '../../common/vipinfo/vipinfo.vue';
	import http from '../../common/http.js';
	export default {
		data() {
			return {
				weichat: 'wangquietforyou',
				sessionKey: '',
				openId: '',
				contentHeight: 0,
				level: -1,
				isIphoneX: false,
				isCanUse:uni.getStorageSync('wx_user_info') || true
			}
		},
		components:{
			tabBar:tabbar,
			vipInfo,
		},
		onLoad() {
			//this.login();
			let winHeight      = uni.getSystemInfoSync().windowHeight;
			if (this.isIphoneX) {
				winHeight =  winHeight - 34;
			}
			// 设计稿731 高度
			this.contentHeight = winHeight-82+20;
			console.log(winHeight, this.contentHeight);
			console.log(uni.getStorageSync('wx_user_info'));
			console.log('onLoad....');
		},
		created() {
			console.log('created....');
		},
		mounted() {
			this.isIphoneX = getApp().globalData.isIphoneX;
		},
		computed: {
			userInfo: function() {
				return this.$store.getters.userInfo;
			},
			level: function() {
				return this.$store.getters.userInfo.level;
			}
		},
		methods: {
			// 填写个人信息
			personal_info() {
				uni.navigateTo({
					url:'/pages/user/complaint'
				});
			},
			handleComplaint() {
				this.getUserInfoFromWeixin();
				uni.navigateTo({
					url:'/pages/user/complaint'
				});
			},
			upgrade_vip() {
				uni.navigateTo({
					url:'/pages/user/upgrade_user_vip'
				});
			},
			copy_customer_wechat() {
				uni.setClipboardData({
					data: this.weichat,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								});
							}
						});
					}
				});
			},
			updateUserInfo() {
				console.log('更新用户信息!');
			},
			setUserInfo(userInfo) {
				this.$store.commit('setUserInfo', userInfo);
			},
			addWechat() {
				this.getUserInfoFromWeixin();
				// 这里弹框,弹出微信
				/*uni.showModal({
				    title: '提示',
				    content: '请添加导师微信',
					showCancel: false,
					mask: true,
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});*/
			},
			getUserInfoFromWeixin() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
　　　　　　　　　　　　　　　　　　　	//获取用户信息后向调用信息更新方法
						console.log('infoRes', infoRes);
						_this.setUserInfo(infoRes.userInfo);
						_this.updateUserInfo();//调用更新信息方法
					}
				});
			},
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
			   // 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						
						console.log('code'+code);
						uni.hideLoading();
						//非第一次授权获取用户信息
						this.getUserInfoFromWeixin()
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						/*uni.request({
							url: '服务器地址',
							data: {
								code: code,
							},
							method: 'GET',
							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								//openId、或SessionKdy存储//隐藏loading
								uni.hideLoading();
							}
						});*/
					}
				});
			},
			setUserInfoToStrorage(userInfo) {
				const userStr = JSON.stringify(userInfo);
				console.log('userStr', userStr);
				uni.setStorage({
					key: 'wx_userinfo',
					data: userStr,
					success: function () {
						console.log('wxSetUserInfo...success');
					},
					fail:function() {
						console.log('wxSetUserInfo...fail');
					}
				});
			},
			getUserInfoFromStorage() {
				const userStr = uni.getStorageSync('wx_user_info');
				return JSON.parse(userStr);
			},
			// 手动授权方法,授权登录的时候,只调用一次
			wxGetUserInfo(e) {
				console.log('hehe');
				uni.getUserInfo({
					provider:'weixin',
					success: (res) => {
						console.log('res:', res);
						let userInfo = res.userInfo;
						console.log(userInfo);
						this.setUserInfo(userInfo);
						this.setUserInfoToStrorage(userInfo);
						this.userToDb(userInfo);
					},
					fail: () => {
						console.log("未授权");
					}
				});
			},
			userToDb(userInfo) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=wx_reg_add";
				http.request(url, {
					auth: auth,					
					openid: "abcdef",
					nickname: userInfo.nickName,
					avatar: userInfo.avatarUrl,
				}).then(resp=> {
					console.log(resp);
				});
			},
			// 手机登录时获取手机号码相关信息的函数
			getPhoneNumber(e) {
				console.log(e);
			}		
		}
	}
	
</script>

<style>
	view {
		display: flex;
		border-sizing:border-box;
	}
	.uni-list {	
		background:rgba(255,255,255,1) !important;
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.01) !important;
		border-radius:20rpx !important;
	}
	.uni-list-hover {
		background:rgba(255,255,255,1) !important;
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.01) !important;
		border-radius:20rpx !important;
	}
	
	.uni-list-item--hover {
		background:rgba(255,255,255,1) !important;
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.01) !important;
		border-radius:20rpx !important;
	}
	
	.root-view {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
	}
	
	
	#content-view {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		flex-wrap:wrap;
		justify-content: center;
	}

	#no-login-view {
		display: flex;
		flex-direction: column;
		width:686rpx;
		margin-left:32rpx;
		margin-right: 32rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);
		border-radius:10px;
	}

	#header-view {
		display: flex;
		flex-direction: column;
		width:100%;
	}
	#header-member-info {
		display: flex;
	}

	
	#header-vip-view {
		width:606rpx;
		display: flex;
		height:80px;
		background:linear-gradient(90deg,rgba(234,186,118,1) 0%,rgba(255,224,160,1) 100%);
		border-radius:10px;
		margin-left:40rpx;
		margin-right: 40rpx;
		margin-top:32px;
		margin-bottom: 20px;
		align-items: center;
	}
	
	#vip-info-text {
		font-size:16px;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(119,79,37,1);
	}
	
	#limit-time-discount {
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(119,79,37,1);
	}
	
	#left-vip-image {
		max-width:68rpx;
		max-height: 68rpx;
	}
	
	#left-vip-image-view {
		margin-left:38rpx;
		margin-right:32rpx;
	}
	
	#right-vip-info {
		flex-direction: column;
		width:394rpx;
	}
	
	#vip-text-view {
		margin-bottom: 6px;
	}
	
	#grant-view {
		justify-content: center;
		margin-top:33px;
	}
	
	.member-btn {
		border-radius: 20rpx;
		max-height:55rpx;
		line-height: 55rpx;
		font-size: 40rpx;
		padding-left:5rpx;
		padding-right:5rpx;
	}
	
	#login-btn {
		background-color: transparent;
		line-height: 1;
		display: flex;
		border: 0px solid rgba(0,0,0,.2);
		padding-left:0px;
		padding-right:0px;
		border-radius: 0px;
	}
	
	#login-btn::after{
		border: 0px solid #007AFF;
	}
	
	#login-btn>text {
		font-size:18px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	
	#right-vip-image-view {
		margin-right:24rpx;
		margin-top:32px;
		margin-bottom: 32px;
	}
	
	#vipinfo_arrow {
		max-width: 32rpx;
		max-height: 32rpx;
	}
	
	.tx-img {
		width:160rpx;
		height:160rpx;
		border-radius: 50%;
		margin-top:-80rpx;
	}

	.name,.member-class {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}
	
	.zx {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width:424rpx;
	}
	
	.member-level-text {
		width:240rpx;
		display:flex;
		justify-content: flex-end;
		align-items: flex-end;
	}
	
	.member-level {
		font-size:11px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(57,201,155,1);
	}
	
	#member-level-btn {
		width:104rpx;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);
		border-radius:4px;
		border:1px solid rgba(57,201,155,1);
	}
	
	.member-class {
		height:40rpx;
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:40rpx;
		margin-top:20rpx;
	}
	
	.nickname {
		height:25px;
		font-size:36rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		font-weight: bold;
		color:rgba(51,51,51,1);
		line-height:50rpx;
	}
	
	.li-view,#bottom_list {
		margin-left: 32rpx;
		margin-right: 32rpx;
		background-color: #FFFFFF;
	}
	
	.li-view {
		display:flex;
		flex-direction: column;
		margin-top:-12px;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);
		border-radius:10px;
	}
	
	#bottom_list {
		display: flex;
		flex-direction: column;
	}
	
	.uni-list-item__extra-text {
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(61,177,242,1) !important;
	}
	
	#bottom_list {
		margin-top: 20px;
		display:flex;
		flex-direction: column;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);
		border-radius:10px 10px 10px 10px;
		margin-bottom: 10px;
		width:686rpx;
	}	
</style>
