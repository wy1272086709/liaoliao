<template>
	<view  class="content-root-view"   :key="info.id" @tap.stop="$emit('view_article', info)">
			<view class="common-pic-view" :style="isShowLock? 'background-image:url('+ info.thumbUrl+')':''">
				<!-- @load="loadItemPic(info.thumbUrl)" -->
				<view :class="[ !isShowLock? 'content-img-view': 'default-suo-css']">
					<image :lazy-load="true" v-if="info.thumbUrl && !isShowLock" :src="info.thumbUrl" 
					 class="thumb-class"
					></image>
					<!-- 未充值... -->
					<u-icon name='lock' color='#FFFFFF' size='38' v-if="isShowLock"></u-icon>
				</view>
				<!--
				<u-lazy-load :image="info.thumbUrl" class="thumb-class"></u-lazy-load>
				-->
			</view>
			<view class="content-titleinfo-view">
				<view class="content-title-view">
					<text>{{info.title}}</text>
				</view>
				<view class="content-desc-view">
					<text>{{info.description}}</text>
				</view>
				<view class="content-stats-view">
					<view class="content-stats-view-readnum">
						<image 	src="../static/img/cases/view.png" class="view-icon-class"></image>
						<text>{{info.readNum}}</text>
					</view>
					<view class="content-stats-view-praisenum">
						<image  src="../static/img/cases/ok.png" class="praise-icon-class"></image>
						<text>{{info.wzsccs}}</text>
					</view>
					<view class="score-css">
						<image src="../static/img/score/score_week_icon_article.png" class="score-icon-class"></image>
						<text>{{info.score_num}}积分</text>
					</view>
				</view>
			</view>
		</view>
	</view>			
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			info: {
				type: Object,
				default: function() {
					return {
						
					};
				}
			},
			isShowLock: {
				type: [Boolean, Number],
				default: false,
			}
		}
	}
</script>

<style lang="scss">

.content-root-view {
	display: flex;
	cursor: pointer;
	flex-direction:row-reverse;
	padding-left:32rpx;
	padding-right: 32rpx;
	justify-content: space-between;
	margin-top: 38rpx;
	padding-bottom: 10px;
	border-bottom: 1px solid #F2F2F2;
	.content-img-view  {
		display: flex;
		margin-right:22rpx;
	}
	
	.default-suo-css {
		top:0;
		bottom: 0;
		left:0;
		right:0;
		margin:0;
		position: absolute;
		background-color: rgba(0,0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.content-titleinfo-view {
		display: flex;
		width:496rpx;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.content-title-view {
		width:100%;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		align-items: flex-start;
		margin-top:0rpx;
		text {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333232;
		}
	}
	.content-desc-view {
		width:492rpx;
		display: block;
		overflow: hidden;
		text-overflow:ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #A6A6A6;
	}
	
	.content-stats-view {
		width:492rpx;
		height:50rpx;
		display: flex;
		align-items: flex-end;
		/*justify-content: space-between;*/
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #9A9A9A;
		.content-stats-view-praisenum {
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
		
		.content-stats-view-readnum {
			margin-right: 46rpx;
			.view-icon-class{
				width:24rpx;
				height:24rpx;
				margin-right: 15rpx;
			}
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

.thumb-class {
	width: 120rpx;
	height: 120rpx;
}
.suo-img-css {
	width: 35rpx;
	height: 35rpx;
}
</style>
