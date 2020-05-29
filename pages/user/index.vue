<template>
	<view class="root-view">
		<template v-if="userInfo.nickName==undefined">
			<view id="no-login-view">
				<view class='header'>
					<image src='../../static/img/default_avatar.png'></image>
				</view>
				<view class='content'>
					<view id="content-first-line">
						<text>申请获取以下权限</text>
					</view>
					<view id="content-second-line">
						<text>获得你的公开信息(昵称，头像、地区等)</text>
					</view>
				</view>
				<view id="grant-view">
					<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
						授权登录
					</button>
				</view>
			</view>
		</template>
		<template v-else>
			<view id="content-view">
				<!-- 如果用微信登录，获取微信相关用户信息 -->
				<view class="li-view">
					<view id="header-member-info">
						<view class="zx">
							<image class="tx-img" :src="userInfo.avatarUrl"></image>
						</view>
						<view class="member-level-text">
							<label id="member-level-btn">
								<text class="member-level">
									普通会员
								</text>
							</label>
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
					<view id="top_list">
						<uni-list>
							<uni-list-item title="升级VIP" thumb="/static/img/user/upgrade_vip.png" @tap="upgrade_vip()"></uni-list-item>
							<uni-list-item title="激活码解锁" thumb="/static/img/user/active.png"></uni-list-item>
							<uni-list-item title="AI导师" thumb="/static/img/user/ai.png"></uni-list-item>
						</uni-list>
					</view>
				</view>
				<view id="bottom_list">
					<uni-list>
						<uni-list-item title="联系客服" thumb="/static/img/user/contact_customer.png"  @tap="copy_customer_wechat()"  rightText="点击复制客服微信" :showArrow="false"></uni-list-item>
						<uni-list-item title="投诉建议" thumb="/static/img/user/complaint.png"  @tap="handleComplaint()"></uni-list-item>
						<uni-list-item title="当前版本" thumb="/static/img/user/cur_version.png"  thumbrightText="1.9.3" :showArrow="false"></uni-list-item>
					</uni-list>
				</view>
			</view>
			<tabBar></tabBar>
		</template>
	</view>
	
</template>

<script>
	import tabbar from '../../common/tabbar.vue';
	export default {
		data() {
			return {
				weichat: 'wangquietforyou',
				sessionKey: '',
				openId: '',
				isCanUse:uni.getStorageSync('wx_user_info') || true
			}
		},
		components:{
			tabBar:tabbar
		},
		onLoad() {
			//this.login();
			console.log(uni.getStorageSync('wx_user_info'));
			console.log('onLoad....');
		},
		created() {
			console.log('created....');
		},
		computed: {
			userInfo: function() {
				return this.$store.getters.userInfo;
			}
		},
		methods: {
			handleComplaint() {
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
									title: '已复制到剪贴板'
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
				// 这里弹框,弹出微信
				uni.showModal({
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
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
　　　　　　　　　　　　　　　　　　　	//获取用户信息后向调用信息更新方法
								console.log(infoRes);
								_this.setUserInfo(infoRes.userInfo);
								_this.updateUserInfo();//调用更新信息方法
							}
						});
						
			
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
					},
				});
			},
			setUserInfoToStrorage(userInfo) {
				const userStr = JSON.stringify(userInfo);
				uni.setStorageSync({
					key: 'wx_user_info',
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
				console.log(e.detail.userInfo);
				try {
					const userInfo = e.detail.userInfo;
					this.setUserInfo(userInfo);
					this.setUserInfoToStrorage(userInfo);
					// 这里发送ajax 请求,将用户信息发送给后端,让它保存起来
				} catch (e) {
				    
				}
			},
			// 手机登录时获取手机号码相关信息的函数
			getPhoneNumber(e) {
				console.log(e);
			}		
		}
	}
	
</script>

<style>
	page {
		
	}
	* {
		border-sizing:border-box;
	}
	view {
		display: flex;
	}
	.uni-list {	
		background:rgba(255,255,255,1) !important;
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.01) !important;
		border-radius:20rpx !important;
	}
	
	.uni-list-item {
		
	}
	.root-view {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		height: 1462rpx;
	}
	#content-view {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		flex-wrap:wrap;
		justify-content: center;
		background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
		height: 1324rpx;
	}

	#no-login-view {
		display: flex;
		flex-direction: column;
	}
	
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	#header-view {
		display: flex;
		flex-direction: column;
		width:100%;
	}
	#header-member-info {
		display: flex;
		flex-direction: ;
	}
	.content {
		width:750rpx;
		flex-direction: column;
		justify-content: center;
	}

	.content-first-line {
		justify-content: center;
	}


	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
	
	.tx {
		height: 200rpx;
	}
	
	.member-btn {
		border-radius: 20rpx;
		max-height:55rpx;
		line-height: 55rpx;
		font-size: 40rpx;
		padding-left:5rpx;
		padding-right:5rpx;
	}
	
	
	.tx-img {
		width:160rpx;
		height:160rpx;
		border-radius: 50%;
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
		margin-top:-80rpx;
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
		height: 40rpx;
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
		height:50rpx;
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
		margin-top:-24rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 4rpx 8rpx 0px rgba(0,0,0,0.01);
		border-radius:20rpx;
	}
	
	#top_list, #bottom_list {
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
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.01);
		border-radius:20rpx 20rpx 20rpx 20rpx;
		margin-bottom: 20rpx;
		width:686rpx;
	}
	
	#top_list {
		margin-top:50rpx;
	}
	
	
</style>
