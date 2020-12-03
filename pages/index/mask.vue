<template>
	<view  :style="{height:height+'px',width:'750rpx'}" @touchmove.prevent="moveHandle">
		<uni-transition :modeClass="['fade-in']" v-for="(item,index) in srcList" :show="curIndex == index">
			<view :style="{height:height+'px'}">
			<image :src="item" mode="scaleToFill" class="img-css" ></image>
			</view>
			<template v-if="curIndex!=4">
				<view :style="'position:absolute;top:'+nextTop+'px;left:0rpx;width:100%;z-index:10000000056666'" id="nextBtn" class="mask-text" @tap="gotoNext()">
					<view>
						<text>下一步</text>
					</view>
				</view>
			</template>
			<template v-else>
				<view :style="'position:absolute;top:'+nextTop+'px;left:0rpx;width:100%;z-index:999999999999999999'" id="user-nextBtn" @tap="gotoHome">
					<view>
						<text>我知道了</text>
					</view>
				</view>
			</template>
		</uni-transition>
		
	</view>
</template>

<script>
	import util from '../../common/util.js';
	export default {
		data() {
			return {
				srcList: [
					"../../static/img/mask/mask_app_index.png",
					"../../static/img/mask/mask_mind.png",
					"../../static/img/mask/mask_skills.png",
					"../../static/img/mask/mask_more_huashu.png",
					"../../static/img/mask/mask_user_index.png",
				],
				curIndex: 0,
				nextTop: '',
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight;
			console.log('height', this.height);
			this.nextTop   = uni.getSystemInfoSync().windowHeight - 60 -50;
		},
		methods: {
			moveHandle() {
				return false;
			},
			gotoNext() {
				this.curIndex++;
			},
			gotoHome() {
				util.setVersionValue();
				uni.switchTab({
					url:'/pages/index/app_index'
				});
			}
		}
	}
</script>

<style>
.img-css {
	width:750rpx;
	height: 100%;
}


#nextBtn {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	justify-content:center;
	display: flex;
	align-items: center;
}
	
#nextBtn>view {
	width:180rpx;
	height:60rpx;
	background: #FFFFFF;
	border-radius: 30rpx;
	justify-content:center;
	display: flex;
	align-items: center;
}


#user-nextBtn {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	justify-content:center;
	display: flex;
	align-items: center;
}

#user-nextBtn >view {
	width:180rpx;
	height:60rpx;
	background: #A88FEF;
	border-radius: 30rpx;
	justify-content:center;
	display: flex;
	color:#FFFFFF;
	align-items: center;
}

.uni-transition {
	transition-timing-function: ease !important;
	transition-duration: 0.5s !important;
	transition-property: transform, opacity !important;
}
	
.mask-text {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #FEFEFE;
}

</style>
