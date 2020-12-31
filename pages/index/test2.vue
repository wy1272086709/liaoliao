<template>
	<view class="u-content">
		<test-swiper :info="item"></test-swiper>
		<view @tap="tapFunc" :animation="animationData" style="margin-top:20px;">
			<text>呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵</text>
		</view>
	</view>
</template>

<script>
	import testSwiper from '../../common/audio_cover.vue';
	export default {
		data() {
			return {
				item: {
					title: '人际交往中性格内向是劣势吗?',
					status: 0,
					coverImg: '../../static/img/course/test.jpg'
				},
				animationData: {}
			}
		},
		components:{
			testSwiper
		},
		onLoad() {
			console.log('tap');
			const a = uni.createAnimation({
				duration: 2000,
				timingFunction: "ease",
				delay: 0
			});
			this.animation = a;
		},
		methods:{
			tapFunc() {
				const a = this.animation;
				a.width(0).height(0);
				this.animationData = a.export();
			}
		}
	}
</script>

<style lang="scss" scoped>
	#view-article {
		margin-left:32rpx;
		margin-right:32rpx;
		width:686rpx;
		overflow-x: hidden;
		justify-content: center;
		align-items: center;
		word-break: break-all;
	}
	
	.u-content {
		margin-top: 100rpx;
	}
</style>