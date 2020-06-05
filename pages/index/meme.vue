<template>
	<view id="root-view">
		<view id="search-view">
			<input id="search-text" type="text" placeholder="输入表情包关键词" placeholder-class="search-class"/>
			<uni-icons type="search" :size="iconSize"></uni-icons>
		</view>
		<scroll-view id="meme-list-view" :style="'height:'+scrollHeight+'px;'">
			<view>
				<view v-for="(item,index) in imageList" :class="item.class">
					<image :src="item.src" class="meme-image"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconSize: 40,
				scrollHeight: 0,
				imageList: [
					{
						src: "../../static/img/meme/biaoqing01.png",
						class: "meme-image-view",
					},
					{
						
						src: "../../static/img/meme/biaoqing01.png",
						class: "meme-image-view meme-second-image-view",
					},
					{
						src: "../../static/img/meme/biaoqing01.png",
						class: "meme-image-view",
					}
				]
			}
		},
		mounted() {
			
		},
		onLoad() {
			let info = uni.getSystemInfoSync();
			this.scrollHeight = info.windowHeight - 48;
		},
		methods: {
			
		}
	}
</script>

<style scoped>
view, scroll-view {
	display: flex;
	box-sizing: border-box;
}
#root-view {
	flex-direction: column;
	background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
	height: 100%;
}
.search-class,#search-view>input {
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(170,170,170,1); 
}

#search-view {
	justify-content: center;
	align-items: center;
	width:686rpx;
	height:40px;
	margin-top: 8px;
	margin-left:32rpx;
	margin-right:32rpx;
	background:rgba(255,255,255,1);
	border-radius:20px;
}

#search-text {
	width:542rpx;
	margin-left: 5px;
}
.meme-image {
	max-width:206rpx;
	max-height: 206rpx;
}

#meme-list-view {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top:4px;
	margin-left:32rpx;
	margin-right:32rpx;
}
.meme-image-view {
	max-width:206rpx;
	margin-top:16px;
	margin-bottom: 16px;
}

.meme-second-image-view {
	margin-left:32rpx;
	margin-right:32rpx;
}
</style>
