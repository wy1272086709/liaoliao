<template>
	<view class="header-vip-view" :style="'background-image:'+backgroundImage" @tap="payForVip()">
		<template v-if="level<=0">
			<button type='primary' @tap="appLogin" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo" class="login-btn-view">
				<view class="discount-nologin-view">
					<text class="limit-time-discount">{{memberDiscountText}}</text>
				</view>
				<view class="right-vip-image-nologin-view">
					<image src="../../static/img/user/arrow.png" class="vipinfo_arrow"></image>
				</view>
			</button>
		</template>
		<template v-else="level>0">
			<template v-if="platform==2">
				<template v-if="level==1">
					<view class="discount-view-ios">
						<view class="limit-time-discount">
							{{memberDiscountText}}
						</view>
					</view>
					<view class="right-vip-image-view" v-if="programNumber==3 &&platform!=2">
						<image src="../../static/img/user/arrow.png" class="vipinfo_arrow"></image>
					</view>
				</template>
				<template v-else>
					<view class="discount-view">
						<text class="limit-time-discount">{{memberDiscountText}}</text>
					</view>
					<view class="right-vip-action">
						<text class="limit-time-discount">{{memberAction}}</text>
					</view>
					<view class="right-vip-image-view">
						<image src="../../static/img/user/arrow.png" class="vipinfo_arrow"></image>
					</view>
				</template>
			</template>
			<template v-else="platform<2">
				<view class="discount-view" :style="level==1 ?'margin-left:80rpx;':''">
					<text class="limit-time-discount">{{memberDiscountText}}</text>
				</view>
				<view class="right-vip-action">
					<text class="limit-time-discount">{{memberAction}}</text>
				</view>
				<view class="right-vip-image-view">
					<image src="../../static/img/user/arrow.png" class="vipinfo_arrow"></image>
				</view>
			</template>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actionMarginLeft: '',
				actionWidth: '',
				vipInfoWidth: '',
				marginLeft: 0,
				rightAreaWidth: ''
			}
		},
		props:{
			level: {
				default: 0,
				type: [Number,String]
			},
			member_validate_dates: {
				default: '',
				type: String
			}, 
			platform: {
				default: 1, 
				type: [Number, String]
			},
			// 1 微信,2qq, 3 APP
			programNumber: {
				default: 1,
				type: [Number,String]
			}
		},
		mounted() {
			//this.initDiscountText();
			//this.initBackground();
			this.initActionMargin();
		},
		computed:{
			memberAction: function() {
				console.log('this.level memberAction', this.level );
				console.log('hehe');
				if (this.programNumber !=3) {
					if(this.platform == 2) {
						return '';
					}
				}
				if(this.level == 0) {
					console.log('hehe1');
					return '';
				} else if(this.level == 1) {
					console.log('hehe2');
					return  this.programNumber != 3 ? '立即充值':'';
				} else {
					console.log('hehe3');
					return '续费';
				}
			},
			memberDiscountText: function() {
				console.log('this.platform', this.platform);
				// 不为APP 时候
				if (this.programNumber !=3) {
					if(this.platform == 2 && this.level == 1) {
						return '联系客服,享更多功能';
					}
				}
				if(this.level == 0) {
					return '登录/注册成为会员';
				} else if(this.level == 1) {
					if(this.programNumber == 3) {
						return '立即充值';
					} else {
						return '';
					}
				} else {
					//console.log('member_validate_dates', this.member_validate_dates);
					return this.member_validate_dates;
				}
			},
			backgroundImage: function() {
				console.log('vipInfo,this.level:', this.level);
				let arr = [
					'https://imgmyqx.ofbei.com/images/no_member_left_vip_logo.png',
					'https://imgmyqx.ofbei.com/images/month_left_vip_logo.png',
					'https://imgmyqx.ofbei.com/images/quarter_left_vip_logo.png',
					'https://imgmyqx.ofbei.com/images/year_left_vip_logo.png'
				];
				let t = this.level;
				if(this.level>=1) {
					t = t - 1;
				}
				let url = arr[t];
				let s =  "url('"+url+"');";
				return s;
			},
			backgroundColor: function() {
				let backgroundColor = '';
				console.log('platform', this.platform, 'memberLevel:', this.memberLevel);
				if(this.platform == 1) {
					if(this.level == 0 ) {
						backgroundColor = 'linear-gradient(90deg,rgba(133,133,133,1) 0%,rgba(184,184,184,1) 100%);';
					} else if(this.level == 1) {
						backgroundColor = 'linear-gradient(90deg,rgba(247,178,80,1) 0%,rgba(255,210,117,1) 100%);';
					} else if(this.level == 2) {
						backgroundColor = 'linear-gradient(90deg,rgba(35,109,230,1) 0%,rgba(22,184,218,1) 100%);';
					} else if(this.level == 3) {
						backgroundColor = 'linear-gradient(90deg,rgba(17,182,75,1) 0%,rgba(97,240,139,1) 100%);';
					} else if(this.level == 4) {
						backgroundColor = 'linear-gradient(90deg,rgba(255,136,79,1) 0%,rgba(255,184,134,1) 100%);';
					}
				} else if(this.platform == 2){
					if(this.level <= 1 ) {
						backgroundColor = 'linear-gradient(90deg,rgba(133,133,133,1) 0%,rgba(184,184,184,1) 100%);';
					} else if(this.level == 2) {
						backgroundColor = 'linear-gradient(90deg,rgba(35,109,230,1) 0%,rgba(22,184,218,1) 100%);';
					} else if(this.level == 3) {
						backgroundColor = 'linear-gradient(90deg,rgba(17,182,75,1) 0%,rgba(97,240,139,1) 100%);';
					} else if(this.level == 4) {
						backgroundColor = 'linear-gradient(90deg,rgba(255,136,79,1) 0%,rgba(255,184,134,1) 100%);';
					}
				}
				return backgroundColor;
			}
		},
		methods: {
			wxGetUserInfo() {
				// 发送事件给父元素...
				console.log('wxGetUserInfo....');
				this.$emit('memberLogin', true);
			},
			appLogin() {
				console.log('appLogin');
				this.$emit('memberLogin', true);
			},
			initActions() {
				
			},
			initActionMargin() {
				if(this.level == 1) {
					//this.actionWidth = 96;
					this.marginLeft  = 100;
					this.rightAreaWidth = 240;
				} else if(this.level == 0) {
					//this.actionWidth = 0;
					this.vipInfoWidth = 394;
				} else {
					//this.actionWidth = 52;
					this.rightAreaWidth = 126;
				}
			},
			payForVip() {
				// 安卓端可以跳转...
				if(this.programNumber !=3) {
					if(this.level>=1 && this.platform != 2) {
						uni.navigateTo({
							url:'/pages/user/upgrade_user_vip'
						});
					} 
				} else {
					// APP 也是只有安卓端支付用..
					if(this.level>=1) {
						if (this.platform !=2) {
							uni.navigateTo({
								url:'/pages/user/upgrade_user_vip'
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '请联系客服!',
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
							});
						}
					} 
				}
			}
		}
	}
</script>

<style scoped>
	.header-vip-view {
		/*width:606rpx;*/
		background-size: contain;
		background-repeat: no-repeat;
		display: flex;
		/*background-position: center center;*/
		width:654rpx;
		height: 175.1rpx;
		margin-left:16rpx;
		margin-right:16rpx;
		/*margin-bottom: 79rpx;*/
		margin-top:20rpx;
		padding-bottom:69rpx;
		align-items: flex-end;
		justify-content: flex-start;
	}
	
	.login-btn-view {
		display: flex;
		height: 100%;
		width:100%;
		background-color: transparent;
		align-items: flex-end;
	}
	
	.vip-info-text {
		font-size:16px;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(119,79,37,1);
	}
	.discount-view {
		/*margin-left: 104rpx;*/
		/*margin-bottom:23rpx;*/
		margin-bottom:16rpx;
		align-items: flex-end;
		margin-left:60rpx;
		margin-right:10rpx;
	}
	.discount-view-ios {
		margin-bottom:16rpx;
		margin-left:90rpx;
		margin-right:10rpx;
	}
	.discount-nologin-view {
		/*margin-left: 104rpx;*/
		margin-top:100rpx;
		margin-left:60rpx;
		margin-right:10rpx;
	}
	
	.limit-time-discount-ios {
		margin-bottom: 23rpx;
		margin-left: 90rpx;
		margin-right: 10rpx;
	}
	
	.limit-time-discount {
		font-size:25rpx;
		font-family:QingYuan;
		font-weight:400;
		font-style:italic;
		color:rgba(255,255,255,1);
	}
	
	/*.left-vip-image {
		max-width:86rpx;
		max-height: 86rpx;
	}*/
	
	.vip-right-area {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	
	/*
	.left-vip-image-view {
		margin-left:38rpx;
		
		margin-right:32rpx;
	}
	
	.right-vip-info {
		flex-direction: row;
	}*/
	
	.right-vip-action {
		margin-bottom:16rpx;
		align-items: flex-end;
		margin-right:8rpx;
	}
	.vip-text-view {
		margin-bottom: 6px;
		height: 22px;
	}
	
	.vipinfo_arrow {
		max-width: 32rpx;
		max-height: 32rpx;
	}
	
	.right-vip-image-view {
		margin-bottom:16rpx;
		align-items: flex-end;
	}
	
	.right-vip-image-nologin-view {
		/*margin-top:100rpx;*/
		margin-bottom: 15rpx;
	}
	
	.action-class {
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	
</style>
