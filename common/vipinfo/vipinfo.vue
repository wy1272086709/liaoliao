<template>
	<view class='header-vip-view' :style="'background:'+backgroundColor+';'" @tap="payForVip()">
		<template v-if="level<=0">
			<button type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo" class="login-btn-view">
				<view class="left-vip-image-view">
					<image v-if="level == 0" src="../../static/img/user/visit_left_vip_logo.png" class="left-vip-image"></image>
				</view>
				<view class="right-vip-info" :style="'width:'+vipInfoWidth+'px'">
					<view class="vip-text-view">
						<text class="vip-info-text" v-if="level == 0">游客您好</text>
					</view>
					<view class="discount-view">
						<text class="limit-time-discount">{{memberDiscountText}}</text>
					</view>
				</view>
				<view class="right-vip-action" :style="'width:'+actionWidth+'px;'">
					<text class="action-class">{{memberAction}}</text>
				</view>
				<view class="right-vip-image-view">
					<image src="../../static/img/user/arrow.png" class="vipinfo_arrow"></image>
				</view>
			</button>
		</template>
		<template v-else="level>0">
			<view class="left-vip-image-view">
				<image v-if="level == 0" src="../../static/img/user/visit_left_vip_logo.png" class="left-vip-image"></image>
				<image v-if="level == 1" src="../../static/img/user/no_member_left_vip_logo.png" class="left-vip-image"></image>
				<image v-if="level == 2" src="../../static/img/user/month_left_vip_logo.png" class="left-vip-image"></image>
				<image v-if="level == 3" src="../../static/img/user/quarter_left_vip_logo.png" class="left-vip-image"></image>
				<image v-if="level == 4" src="../../static/img/user/year_left_vip_logo.png" class="left-vip-image"></image>
			</view>
			<view class="right-vip-info">
				<view class="vip-text-view">
					<text class="vip-info-text" v-if="level == 0">游客您好</text>
					<text class="vip-info-text" v-if="level == 1">非VIP会员</text>
					<text class="vip-info-text" v-if="level == 2">VIP月卡会员</text>
					<text class="vip-info-text" v-if="level == 3">VIP季卡会员</text>
					<text class="vip-info-text" v-if="level == 4">VIP年卡会员</text>
				</view>
				<view class="discount-view">
					<text class="limit-time-discount">{{memberDiscountText}}</text>
				</view>
			</view>
			<view class="right-vip-action" :style="'width:'+actionWidth+'rpx;margin-left:'+marginLeft+'rpx;'">
				<text class="action-class">{{memberAction}}</text>
			</view>
			<view class="right-vip-image-view">
				<image src="../../static/img/user/arrow.png" class="vipinfo_arrow"></image>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memberLevel: this.level,
				memberValidateDates: this.member_validate_dates,
				memberAction: '',
				actionMarginLeft: '',
				actionWidth: '',
				vipInfoWidth: '',
				marginLeft: 0,
			}
		},
		props:['level', 'member_validate_dates'],
		mounted() {
			this.initDiscountText();
			this.initBackground();
			this.initActions();
			this.initActionMargin();
		},
		computed:{
			memberDiscountText: function() {
				if(this.level == 0) {
					return '登录/注册成为会员';
				} else if(this.level == 1) {
					return '会员享更多功能';
				} else {
					console.log('member_validate_dates', this.member_validate_dates);
					return this.member_validate_dates;
				}
			},
			backgroundColor: function() {
				let backgroundColor = '';
				if(this.level == 0) {
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
				return backgroundColor;
			}
		},
		methods: {
			initDiscountText() {
				
			},
			initBackground() {
				
			},
			wxGetUserInfo() {
				// 发送事件给父元素...
				this.$emit('memberLogin', true);
			},
			initActions() {
				if(this.level == 0) {
					this.memberAction = '';
				} else if(this.level == 1) {
					this.memberAction = '立即充值';
				} else {
					this.memberAction = '续费';
				}
			},
			initActionMargin() {
				if(this.level == 1) {
					this.actionWidth = 96;
					this.marginLeft  = 114;
				} else if(this.level == 0) {
					this.actionWidth = 0;
					this.vipInfoWidth = 394;
				} else {
					this.actionWidth = 52;
				}
			},
			payForVip() {
				if(this.level>=1) {
					uni.navigateTo({
						url:'/pages/user/upgrade_user_vip'
					});
				} 
			}
		}
	}
</script>

<style scoped>
	.header-vip-view {
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
	.login-btn-view {
		display: flex;
		height: 100%;
		background-color: transparent;
		align-items: center;
	}
	.vip-info-text {
		font-size:16px;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(119,79,37,1);
	}
	
	.limit-time-discount {
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(119,79,37,1);
	}
	
	.left-vip-image {
		max-width:86rpx;
		max-height: 86rpx;
	}
	
	.left-vip-image-view {
		margin-left:38rpx;
		margin-right:32rpx;
	}
	
	.right-vip-info {
		flex-direction: column;
	}
	
	.right-vip-action {
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
		margin-right:24rpx;
		margin-top:32px;
		margin-bottom: 32px;
	}
	
	.action-class {
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	
</style>
