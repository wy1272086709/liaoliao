<template>
	<!-- imgHeight+'px' -->
	<view class="content" :style="{height:imgHeight+'px'}">
		<swiper class="swiper"
		:autoplay="autoplay" 
		:duration="duration" :indicator-dots="true" @change="change" @transition="transition">
		<!-- imgHeight+'px' -->
			<swiper-item v-for="(item,index) in guideImages"  :style="{height:imgHeight+'px'}">
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image :src="item" mode="scaleToFill" :style="{height:imgHeight+'px'}"></image>
					</view>
				</view>	
			</swiper-item>
		</swiper>
		<view id="next-btn" v-if="showMenu">
			<view class="jump-over login-entry-btn" @tap="login">
				<button type="default">
				{{text}}
				</button>
			</view>
			<view class="jump-over" @tap="launchFlag">
				<button type="default">
				{{jumpover}}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
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
					'../../static/img/index/guide_page/page_01.png',
					'../../static/img/index/guide_page/page_02.png',
					'../../static/img/index/guide_page/page_03.png',
					'../../static/img/index/guide_page/page_04.png',
				]
			}
		},
		computed:{
			showMenu: function() {
				return this.curIndex == (this.guideImages.length-1);
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
					url: '/pages/user/login_v2',
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
				const v = util.getVersionValue();
				if(!v) {
					uni.redirectTo({
						url:'/pages/index/mask'
					});
					return;
				}
				uni.switchTab({
					url:'/pages/index/app_index'
				});
			},
			change(e) {
				console.log('e change', e);
				this.curIndex = e.detail.current;
				// 3为对应的图片长度-1,当滑动到最后一张图片的时候,显示进入按钮
				if (e.detail.current == this.guideImages.length -1) {
					this.jumpover = '进入首页';
				} else {
					
				}
			},
			transition(e) {
				
			}
		}
	}
</script>

<style scoped>
#root-view {
	display: flex;
	flex-direction: row;
}
page {
 
}
.content {
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);  
	padding-bottom: env(safe-area-inset-bottom);  
	
}
page,.content{
	width: 100%;
}
.swiper{
	width: 100%;
	height: 100%;
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
	/*margin: 0 auto;*/
}
.swiper-item-img image{
	width: 100%;
	
}

#next-btn {
	position: absolute;
	z-index:100000000001;
	display: flex;
	width: 100%;
	justify-content: center;
	bottom:125rpx;
	left: 0px;
	font-size: 40rpx;
	font-family: HYE2GJ;
	font-weight: 400;
	color: #333333;
}

.login-entry-btn {
	margin-right:60rpx;
}
.jump-over>button {
	padding: 10rpx 10rpx;
	color:#E2CDFF;
	background-color: #FFF;
	line-height: 1.5;
}
.jump-over>button::after {
	border: 1px solid #E2CDFF;
}
</style>
