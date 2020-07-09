<template>
	<view class="root-view">
			<view id="content-view" :style="'height:'+contentHeight+'px;margin-top:'+marginTop+'px;'">
				<!-- 如果用微信登录，获取微信相关用户信息 -->
				<template v-if="userInfo.nickName==undefined">
					<view id="no-login-view">
						<view id="header-member-info">
							<view class="zx">
								<button  type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo" id="login-btn-avatar">
									<image class="tx-img-nologin" src="../../static/img/user/default_avatar.png"></image>
								</button>
							</view>
						</view>
						<view id="grant-view">
							<button  type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo" id="login-btn">
								<text>点击登录/注册</text>
							</button>
						</view>
						<vip-info :level="level" :member_validate_dates="dates" @memberLogin="login(false)"></vip-info>
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
								<text>会员ID:   {{userInfo.uid}}</text>
							</view>
						</view>
						<vip-info :level="level" :member_validate_dates="dates"></vip-info>
					</view>
				</template>
				<view id="bottom_list">
					<uni-list>
						<uni-list-item title="关于我们" thumb="/static/img/user/about_us.png"></uni-list-item>
						<uni-list-item title="专属客服" thumb="/static/img/user/contact_customer.png"  @tap="copy_customer_wechat()"  rightText="点击复制客服微信" :showArrow="false"></uni-list-item>
						<uni-list-item title="当前版本" thumb="/static/img/user/setting.png" :showArrow="false">
							<template v-slot:right="">
								<text>1.0.0</text>
							</template>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
			<tabBar :position="position" :current="2"></tabBar>
			<scorll-view>
			    <view style="height:34px;" v-if="isIphoneX"></view>
			</scorll-view>
	</view>
	
</template>


<script>
	import tabbar from '../../common/tabbar.vue';
	import vipInfo from '../../common/vipinfo/vipinfo.vue';
	import http from '../../common/http.js';
	let weichat =  'wangquietforyou';
	export default {
		data() {
			return {
				contentHeight: 0,
				isIphoneX: false,
				marginTop: '',
				position: "fixed",
				isCanUse:uni.getStorageSync('wx_user_info') || true
			}
		},
		components:{
			tabBar:tabbar,
			vipInfo,
		},
		onShow() {
			let globalData = getApp().globalData;
			if(globalData.isRecharge == 1) {
				console.log('loginRequest....');
				this.loginRequest(true);
			}
		},
		onLoad(option) {
			//this.login();
			let winHeight      = uni.getSystemInfoSync().windowHeight;
			console.log('winHeight', winHeight);
			if (this.isIphoneX) {
				winHeight =  winHeight - 34;
			}
			let globalData = getApp().globalData;
			this.isIphoneX = globalData.isIphoneX;
			// 设计稿731 高度
			this.contentHeight = winHeight-60 -60;
			console.log(winHeight, this.contentHeight);
			console.log('onLoad....');
			// 判断缓存里面，是否有用户信息,有就自动登录
			let userInfo = this.getUserInfoFromStorage();
			if(userInfo.openid) {
				this.login(false);
			}
		},
		created() {
			console.log('created....');
		},
		computed: {
			userInfo: function() {
				return this.$store.getters.userInfo;
			},
			level: function() {
				if (this.$store.getters.userInfo.level) {
					return this.$store.getters.userInfo.level;
				}
				return 0;
			},
			dates: function() {
				let userInfo = this.$store.getters.userInfo;
				let dateStr = '';
				if (userInfo.start_time) {
					dateStr+=userInfo.start_time+"~";
				}
				if (userInfo.end_time) {
					dateStr+=userInfo.end_time;
				}
				console.log('dateStr', dateStr);
				return dateStr;
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
				//this.getUserInfoFromWeixin();
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
					data: weichat,
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
			setUserInfo(userInfo) {
				this.$store.commit('setUserInfo', userInfo);
			},
			login(hideLoading) {
				if (!hideLoading) {
					uni.showLoading({
						title: '登录中...'
					});
				}
			   // 1.wx获取登录用户code
				this.loginRequest(hideLoading);
			},
			loginRequest(hideLoading) {
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						console.log(loginRes);
						if(!hideLoading) {
							uni.hideLoading();
						}
						//非第一次授权获取用户信息
						let data = getApp().globalData;
						const apiPrefix = data.serverUri;
						const auth = data.auth;
						const url = apiPrefix + "?mod=user&ac=wx_user";
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.getUserInfo({
							provider:'weixin',
							success: (res) => {
								console.log('res:', res);
								let userInfo = res.userInfo;
								console.log(userInfo);
								uni.request({
									url:url,
									method: 'POST',
									header: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									data:{
										code: code,
										auth: auth,
										nickname: userInfo.nickName,
										avatarurl: userInfo.avatarUrl,
										city: userInfo.city,
										country: userInfo.country,
										gender: userInfo.gender,
										province: userInfo.province
									},
									success: (resp) => { 
										//openId、或SessionKdy存储//隐藏loading
										console.log(resp);
										resp = resp.data.data;
										let uid = resp.id;
										userInfo.uid = uid;
										userInfo.level = resp.cid;
										if(resp.start_time) {
											userInfo.start_time = resp.start_time;
										}
										if(resp.end_time) {
											userInfo.end_time = resp.end_time;
										}
										if(resp.openid) {
											userInfo.openid = resp.openid;
										}
										//_this.dates = userInfo.start_time + "~" + userInfo.end_time;
										console.log('userInfo:', userInfo);
										_this.setUserInfo(userInfo);
										_this.setUserInfoToStrorage(userInfo);
										if(hideLoading) {
											data.isRecharge = 0;
										}
									},
								});
							},
							fail: () => {
								console.log("未授权");
							}
						});
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
				const userStr = uni.getStorageSync('wx_userinfo');
				console.log('userStr from storage:', userStr);
				if(userStr) {
					return JSON.parse(userStr);
				} else {
					return '';
				}
			},
			// 手动授权方法,授权登录的时候,只调用一次
			wxGetUserInfo(e) {
				console.log('get_user_info');
				this.login();
			},
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
		display: flex;
		height: 100%;
		flex-direction: column;
		background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
	}
	
	#content-view {
		display: flex;
		flex-direction: column;
		flex-wrap:wrap;
		margin-top:60px;
		min-height:434px;
		justify-content: flex-start;
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
		height:58px;
	}
	
	#login-btn-avatar {
		height:80px;
		line-height: 1;
		display: flex;
		margin: 0;
		position: static;
		border: 0;
		background-color:transparent;
		padding:0;
		overflow: auto;
		margin-top:-40px;
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

	#login-btn {
		background-color: transparent;
		line-height: 1;
		display: flex;
		border: 0px solid rgba(0,0,0,.2);
		padding-left:0px;
		padding-right:0px;
		border-radius: 0px;
		height:100%;
		width:100%;
		justify-content: center;
		align-items: flex-end;
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
	
	.tx-img {
		width:80px;
		height:80px;
		border-radius: 50%;
		margin-top:-40px;
	}
	
	.tx-img-nologin {
		width:80px;
		height:80px;
		border-radius: 50%;
	}

	.name,.member-class {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}
	
	.zx {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width:100%;
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
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);
		border-radius:10px;
	}
	
	
	.uni-list-item__extra-text {
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(61,177,242,1) !important;
	}
	
	#bottom_list {
		margin-top: 16px;
		display:flex;
		flex-direction: column;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);
		border-radius:10px 10px 10px 10px;
		width:686rpx;
	}	
</style>
