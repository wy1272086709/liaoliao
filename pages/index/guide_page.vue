<template>
	<view class="content" :style="{height:imgHeight+'px'}">
		<swiper class="swiper"
		:autoplay="autoplay" 
		:duration="duration" :indicator-dots="true" @change="change" @transition="transition">
			<swiper-item v-for="(item,index) in guideImages">
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image :src="item" mode="aspectFit" :style="{height:imgHeight+'px'}"></image>
					</view>
				</view>	
			</swiper-item>
		</swiper>
		<view id="next-btn">
			<view class="jump-over" @tap="login()">{{text}}</view>
			<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curIndex: 0,
				autoplay: false,
				duration: 500,
				jumpover: '',
				text: '注册/登录',
				imgHeight: '',
				guideImages: [
					'https://imgmyqx.ofbei.com/upload1/20200909/20200909142613_312.png',
					'https://imgmyqx.ofbei.com/upload1/20200909/20200909142710_307.png',
					'https://imgmyqx.ofbei.com/upload1/20200909/20200909142756_104.png',
					'https://imgmyqx.ofbei.com/upload1/20200909/20200909142756_104.png'
				]
			}
		},
		onLoad(option) {
			console.log('hehehe');
			let info           = uni.getSystemInfoSync();
			let winHeight      = info.windowHeight;
			let winWidth       = info.windowWidth;
			this.imgHeight = winHeight;
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/user/login',
					fail(res) {
						console.log('to login fail:', res);
					}
				}
				);
			},
			nextPage() {
				this.curIndex++;
			},
			launchFlag() {
				
			},
			change(e) {
				console.log('e change', e);
				// 3为对应的图片长度-1,当滑动到最后一张图片的时候,显示进入按钮
				if (e.detail.current == this.guideImages.length -1) {
					this.jumpover = '进入首页';
				}
			},
			transition(e) {
				console.log('e transition', e);
			}
		}
	}
</script>

<style scoped>
#root-view {
	display: flex;
	flex-direction: row;
}

page,.content{
	width: 100%;
	height: 100%;
	background-size: 100% auto ;
	padding: 0;
}
.swiper{
	width: 100%;
	height: 80%;
	background: #FFFFFF;
}
.swiper-item {
	width: 100%;
	height: 100%;
	text-align: center;
	position: relative;
	display: flex;
	/* justify-content: center; */
	align-items:flex-end;
	flex-direction:column-reverse
}
.swiper-item-img{
	width: 100%;
	height: 100%;
	margin: 0 auto;
}
.swiper-item-img image{
	width: 95%;
	
}

#next-btn {
	position: absolute;
	top:50px;
	left: 50px;
}
</style>
