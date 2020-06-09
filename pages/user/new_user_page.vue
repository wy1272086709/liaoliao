<template>
    <view>
        <view class="content">
			<view class="uni-padding-wrap">
				<view class="uni-title uni-common-mt">
					数组类型
					<text>\nnodes属性为Array</text>
				</view>
				<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
					<rich-text :nodes="nodes"></rich-text>
				</view>
				<view class="uni-title uni-common-mt">
					字符串类型
					<text>\nnodes属性为String</text>
				</view>
				<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
					<rich-text :nodes="strings"></rich-text>
				</view>
			</view>
        </view>
    </view>
</template>

<script>
import vipInfo from '../../common/vipinfo/vipinfo.vue';
export default {
    data() {
        return {
            level:1,
			dates: "2020.05.06~2020.06.06",
			nodes: [{
				name: 'div',
				attrs: {
					class: 'div-class',
					style: 'line-height: 60px; color: red; text-align:center;'
				},
				children: [{
					type: 'text',
					text: 'Hello&nbsp;uni-app!'
				}]
			}],
			strings: '<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
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