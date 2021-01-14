<template>
	<view class="wrap" @tap.stop="tapFunc">
		<view class="left-view" @tap.stop="tapFunc">
			<text class="left-view-title">{{title}}</text>
			<view class="left-view-desc" @tap.stop="tapFunc">
				<view @tap.stop="tapFunc">
					<template v-if="courseType == 2">
						<u-icon name="volume-up" color="#A3A3A3" size="24"></u-icon>
					</template>
					<template v-else-if="courseType == 3">
						<u-icon name="play-right" color="#A3A3A3" size="24"></u-icon>
					</template>
					<view class="left-view-play" @tap.stop="tapFunc">
						<text>播放{{playCnt}}</text>
					</view>
				</view>
				<view>
					<view class="left-view-stat" @tap.stop="tapFunc">
						<!--
						<view class="left-view-stat-readnum">
							<image 	src="../static/img/cases/view.png" class="view-icon-class"></image>
							<text>{{readNum}}</text>
						</view>
						-->
						<view class="left-view-stat-praisenum" @tap.stop="tapFunc" v-if="courseType==2">
							<image  src="../static/img/cases/ok.png" class="praise-icon-class"></image>
							<text>{{wzsccs}}</text>
						</view>
						<view class="score-css" @tap.stop="tapFunc">
							<image src="../static/img/score/score_week_icon_article.png" class="score-icon-class"></image>
							<text>{{score_num}}积分</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--
		<view class="right-view" v-if="isShowLock">
			<view class="bg-view">
				<u-icon name='lock' color='#FFFFFF' size='30' ></u-icon>
			</view>
		</view>
		-->
		<view class="common-pic-view" :style="isShowLock? 'background-image:url('+ thumbUrl+')':''" @tap.stop="tapFunc">
			<!-- @load="loadItemPic(info.thumbUrl)" -->
			<view :class="[ !isShowLock? 'content-img-view': 'default-suo-css']" @tap.stop="tapFunc">
				<image :lazy-load="true" v-if="thumbUrl && !isShowLock" :src="thumbUrl" 
				 class="thumb-class"
				></image>
				<!-- 未充值... -->
				<u-icon name='lock' color='#FFFFFF' size='38' v-if="isShowLock"></u-icon>
			</view>
			<!--
			<u-lazy-load :image="info.thumbUrl" class="thumb-class"></u-lazy-load>
			-->
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		props:{
			title: {
				type: String,
				default: '',
			},
			isShowLock: {
				type: Boolean,
				default: true,
			},
			courseType: {
				// 课程类别
				type: Number,
				default: 2
			},
			playCnt: {
				type: String,
				default: '',
			},
			src: {
				type: String,
				default: '',		
			},
			singer: {
				type: String,
				default: ''
			},
			coverImgUrl: {
				type: String,
				default: ''				
			},
			thumbUrl: {
				type: String,
				default: '',
			},
			readNum: {
				type: Number,
				default: 0,
			},
			wzsccs: {
				type: [Number, String],
				default: 0,
			},
			score_num: {
				type: [Number, String],
				default: 0
			}
		},
		components:{
			
		},
		methods: {
			tapFunc() {
				console.log('audio tap Func')
				//this.$nextTick(() => {
					console.log('dom update...');
					if (this.courseType == 2) {
						this.$emit('view_audio');
					} else {
						this.$emit('view_video');
					}
				//});
			}
		},
		created() {
			
			
		}
	}
</script>

<style lang="scss">
.wrap {
	margin-left: 32rpx;
	margin-right: 32rpx;
	border-bottom: 1px solid #F2F2F2;
	display: flex;
	padding-top:10px;
	padding-bottom: 10px;
	
	.left-view {
		display: flex;
		flex-direction: column;
		align-items: space-between;
		width:86%;
		&-title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333232;
		}
		&-desc {
			color:#A3A3A3;
			font-size:20rpx;
			display: flex;
			view {
				display: flex;
			}
			view:nth-child(1) {
				align-items: center;
				margin-right:15rpx;
			}
			view:nth-child(2) {
				align-items: center;
			}
		}
		&-play {
				
		}
		&-stat {
			
			height:50rpx;
			display: flex;
			align-items: flex-end;
			/*justify-content: space-between;*/
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9A9A9A;
			&-praisenum {
				.praise-icon-class {
					width:32rpx;
					height:20rpx;
					margin-right:13rpx;
				}
			}
			.score-css {
				margin-left:20rpx;
				.score-icon-class {
					margin-right: 12rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
			
			&-readnum {
				margin-right: 46rpx;
				.view-icon-class{
					width:24rpx;
					height:24rpx;
					margin-right: 15rpx;
				}
			}
		}
	}
	.right-view {
		display: flex;
		width: 14%;
		justify-content: flex-end;
		align-items: center;
		.bg-view {
			width: 50rpx;
			height: 50rpx;
			display: flex;
			border-radius: 50%;
			background: rgba($color: #000000, $alpha: 0.5);
			justify-content: center;
			align-items: center;
		}
	}
}

.common-pic-view {
	display: flex;
	/*background-size: 120rpx 120rpx;*/
	
	width: 120rpx;
	height: 120rpx;
	background-size: 120rpx 120rpx;
	background-repeat: no-repeat;
	background-position: center;
	justify-content: center;
	position: relative;
	align-items: center;
}

.default-suo-css {
	background: rgba(0,0,0, 0.5);
	top:0;
	bottom: 0;
	left:0;
	right:0;
	margin:0;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
}

.thumb-class {
	width: 120rpx;
	height: 120rpx;
}
.suo-img-css {
	width: 35rpx;
	height: 35rpx;
}
</style>
