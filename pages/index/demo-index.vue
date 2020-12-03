<template>
	<view class="">
		<view>
			<view class="selected-list">
				<view class="uni-padding-wrap uni-common-mt">
					<view>
						<scroll-view class="scroll-view_H" scroll-x="true">
							<view id="demo1" class="scroll-view-item_H" @tap="" v-for="(item,index) in index_scroll_data" :key="index">
								<view class="music-tit">
									<text class="t-l">{{item.name}}</text>
									<text class="t-r">{{item.allTime}}</text>
								</view>
								<view class="music-con">
									{{item.con}}
								</view>
								<view class="music-step">
									<musicProgress :musicData="music_data" :current="index"></musicProgress>
									<!-- <view class="icon iconfont">&#xe608;</view>
									<view class="line progress-box">
										<progress percent="60" color="#10AEFF" active stroke-width="4" />
										
									</view> -->
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import musicProgress from '../../common/auto-progress.vue'
	export default {
		data() {
			return {
				index_scroll_data:[
					{
						name:'程一电台Vol.954',
						allTime:"8'54''",
						con:'那就这样吧，再爱都曲终人散了。'
					},
					{
						name:'程一电台Vol.954',
						allTime:"8'54''",
						con:'那就这样吧，再爱都曲终人散了。'
					},
					{
						name:'程一电台Vol.954',
						allTime:"8'54''",
						con:'那就这样吧，再爱都曲终人散了。'
					}
				],
				music_data:[
					{
						audiosrc: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						coverimg: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
						isPlayAudio: false,
						audioSeek: 0,
						audioDuration: 0,
						showTime1: '00:00',
						showTime2: '00:00',
						audioTime: 0
					},
					{
						audiosrc: 'http://other.web.rh01.sycdn.kuwo.cn/resource/n2/16/17/450264753.mp3',
						coverimg: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
						isPlayAudio: false,
						audioSeek: 0,
						audioDuration: 0,
						showTime1: '00:00',
						showTime2: '00:00',
						audioTime: 0
					},
					{
						audiosrc: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						coverimg: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
						isPlayAudio: false,
						audioSeek: 0,
						audioDuration: 0,
						showTime1: '00:00',
						showTime2: '00:00',
						audioTime: 0
					}
				]
			}
		},
		components:{
			musicProgress
		}
	}
</script>
<style lang="scss">
	.selected-list {
		width: 100%;
		height: 220upx;
		overflow: hidden;
		box-sizing: border-box;
		.scroll-view-item_H {
			display: inline-block;
			width: 65%;
			height: 220upx;
			font-size: 36upx;
			padding: 20upx;
			margin: 0upx 3%;
			overflow: hidden;
			box-sizing: border-box;
			border-radius: 20upx;
			box-shadow: 1upx 1upx 2upx 1upx rgba(170, 170, 170, 1);
			
			&:first-child {
				background-color: #7A8CF0;
			}
			&:nth-child(2) {
				background-color: #F06F9B;
			}
			&:last-child {
					background-color: #aaa;
			}
		}
		.uni-common-mt {
			margin-top: 0upx;
		}
		.uni-padding-wrap {
			width: 100%;
			padding: 0upx;
		}
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			height: 220upx;
			box-sizing: border-box;
		}
		.music-tit,
		.music-con,
		.music-step {
			width: 100%;
			color: #fff;
			overflow: hidden;
			box-sizing: border-box;
			line-height: 60upx;
		}
		.music-tit {
			font-size: 26upx;
			.t-l {
				float: left;
			}
			.t-r {
				float: right;
			}
		}
		.music-con {
			font-size: 30upx;
			text-align: left;
		}
		.music-step {
			.icon {
				float: left;
				font-size: 60upx;
				line-height: 70upx;
				margin-right: 20upx;
			}
			.line {
				margin-top: 31upx;
				._progress {
					width: 80%
				}
			}
		}
	}
</style>