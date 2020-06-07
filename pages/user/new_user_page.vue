<template>
    <view>
        <vip-info :level="level" :member_validate_dates="dates"></vip-info>
    </view>
</template>

<script>
import vipInfo from '../../common/vipinfo/vipinfo.vue';
export default {
    data() {
        return {
            level:1,
			dates: "2020.05.06~2020.06.06"
        }
    },
	components: {
		vipInfo:vipInfo
	},
    methods: {
        
    }
}
</script>

<style>
	@import "../../common/uni.css";
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
</style>