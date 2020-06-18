<template>
	<view class='header-vip-view' :style="'background:'+backgroundColor+';'">
		<view class="left-vip-image-view">
			<image v-if="memberLevel == 0" src="../../static/img/user/visit_left_vip_logo.png" class="left-vip-image"></image>
			<image v-if="memberLevel == 1" src="../../static/img/user/no_member_left_vip_logo.png" class="left-vip-image"></image>
			<image v-if="memberLevel == 2" src="../../static/img/user/month_left_vip_logo.png" class="left-vip-image"></image>
			<image v-if="memberLevel == 3" src="../../static/img/user/quarter_left_vip_logo.png" class="left-vip-image"></image>
			<image v-if="memberLevel == 4" src="../../static/img/user/year_left_vip_logo.png" class="left-vip-image"></image>
		</view>
		<view class="right-vip-info">
			<view class="vip-text-view">
				<text class="vip-info-text" v-if="memberLevel == 0">游客您好</text>
				<text class="vip-info-text" v-if="memberLevel == 1">非VIP会员</text>
				<text class="vip-info-text" v-if="memberLevel == 2">VIP月卡会员</text>
				<text class="vip-info-text" v-if="memberLevel == 3">VIP季卡会员</text>
				<text class="vip-info-text" v-if="memberLevel == 4">VIP年卡会员</text>
			</view>
			<view class="discount-view">
				<text class="limit-time-discount">{{memberDiscountText}}</text>
			</view>
		</view>
		<view class="right-vip-action" :style="'margin-left:'+actionMarginLeft+'rpx;margin-right:16rpx;'" @tap="payForVip()">
			<text class="action-class">{{memberAction}}</text>
		</view>
		<view class="right-vip-image-view">
			<image src="../../static/img/user/arrow.png" class="vipinfo_arrow"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memberLevel: this.level,
				memberValidateDates: this.member_validate_dates,
				backgroundColor: '',
				memberAction: '',
				memberDiscountText: '',
				actionMarginLeft: '',
			}
		},
		props:['level', 'member_validate_dates'],
		mounted() {
			this.initDiscountText();
			this.initBackground();
			this.initActions();
			this.initActionMargin();
		},
		methods: {
			initDiscountText() {
				if(this.memberLevel == 0) {
					this.memberDiscountText = '登录/注册成为会员';
				} else if(this.memberLevel == 1) {
					this.memberDiscountText = '会员享更多功能';
				} else {
					this.memberDiscountText = this.memberValidateDates;
				}
			},
			initBackground() {
				if(this.memberLevel == 0) {
					this.backgroundColor = 'linear-gradient(90deg,rgba(133,133,133,1) 0%,rgba(184,184,184,1) 100%);';
				} else if(this.memberLevel == 1) {
					this.backgroundColor = 'linear-gradient(90deg,rgba(247,178,80,1) 0%,rgba(255,210,117,1) 100%);';
				} else if(this.memberLevel == 2) {
					this.backgroundColor = 'linear-gradient(90deg,rgba(35,109,230,1) 0%,rgba(22,184,218,1) 100%);';
				} else if(this.memberLevel == 3) {
					this.backgroundColor = 'linear-gradient(90deg,rgba(17,182,75,1) 0%,rgba(97,240,139,1) 100%);';
				} else if(this.memberLevel == 4) {
					this.backgroundColor = 'linear-gradient(90deg,rgba(255,136,79,1) 0%,rgba(255,184,134,1) 100%);';
				}
			},
			initActions() {
				if(this.memberLevel == 0) {
					this.memberAction = '';
				} else if(this.memberLevel == 1) {
					this.memberAction = '立即充值';
				} else {
					this.memberAction = '续费';
				}
			},
			initActionMargin() {
				if(this.memberLevel>1) {
					this.actionMarginLeft = 62;
				} else if(this.memberLevel == 1) {
					
				} else if(this.memberLevel == 0) {
					this.actionMarginLeft = 66;
				}
			},
			payForVip() {
				uni.navigateTo({
					url:'/pages/user/upgrade_user_vip'
				});
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
		max-width:68rpx;
		max-height: 68rpx;
	}
	
	.left-vip-image-view {
		margin-left:38rpx;
		margin-right:32rpx;
	}
	
	.right-vip-info {
		flex-direction: column;
		width:270rpx;
	}
	
	.vip-text-view {
		margin-bottom: 6px;
	}
	
	.vipinfo_arrow {
		max-width: 32rpx;
		max-height: 32rpx;
	}
	
	.grant-view {
		justify-content: center;
		margin-top:33px;
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
