<template>
	<view class="audio-cover" :style="customStyle" v-if="info.title!=''" @click="gotoAudio">
		<!--1 代表正在播放,0表示暂停 -->
		<uni-transition :show="info.status != 1" :modeClass="['fade']" :duration="1000">
			<view class="audio-cover-close"  @click.stop="$emit('closeAudioCover')">
				<view class="audio-cover-close-view">
					<u-icon name='close' size='30' color="#BFBADB"></u-icon>
				</view>
			</view>
		</uni-transition>
		<view class="audio-cover-left">
			<view class="audio-cover-left-view">
				<image :src="info.coverImg" :class="['audio-cover-left-view-img', info.status == 1 ? 'on':'']"></image>
			</view>
		</view>
		<view class="audio-cover-title">
			<text>{{info.title}}</text>
		</view>
		<view class="audio-cover-right" @click.stop="playFunc(info)">
			<u-icon :name="info.status != 1?'play-circle':'pause-circle'" size="70" color="#BFBADB"></u-icon>
		</view>
	</view>
</template>
<script>
import uIcon from '../uview-ui/components/u-icon/u-icon.vue';
import { mapMutations, mapGetters } from 'vuex';
export default {
	data() {
		return {
			src: '',
			animationData: {},
		};
	},
	computed:{
		...mapGetters(['playinfo'])
	},
	comments:{
		uIcon: uIcon
	},
	props:{
		info:{
			type: Object,
			default() {
				return {
					title: '人际交往中性格内向是劣势吗?',
					status: 1,
					coverImg: '../static/img/course/test.jpg'
				};
			}
		},
		customStyle: {
			type: Object,
			default() {
				return {
					
				}
			}
		}
	},
	mounted() {
		// this.deleteBtn = this.$refs.deleteBtn.$el.offsetWidth;
		
	},
	watch:{
		
	},
	methods: {
		...mapMutations(['set_pause', 'set_playinfo']),
		playFunc(info) {
			info.status = 1 - info.status;
			// 这里要控制音频的播放和暂停
			this.$audio.operate();
			// 1 正在播放,0 暂停
		},
		gotoAudio() {
			// 跳转到音频界面, 
			this.set_playinfo({
				isContinue: 1
			});
			const idStr = this.playinfo.id;
			uni.navigateTo({
				url: '/pages/course/audio_detail?id='+idStr
			});
		},
		showClose() {
			
		}
	}
};
</script>
<style scoped lang="scss">
.audio-cover {
	background-color: rgba(0,0, 0, 0.05);
	display: flex;
	width: 750rpx;
	box-sizing: border-box;
	justify-content: space-between;
	padding-right: 56rpx;
	padding-left:10rpx;
	position: relative;
	height: 120rpx;
	view {
		display: flex;
	}
	&-close {
		display: flex;
		align-items: center;
		&-view {
			height: 60rpx;
		}
	}
	&-title {
		display: flex;
		align-items: center;
	}
	&-left {
		display: flex;
		align-items: center;
		height: 120rpx;
		//animation-fill-mode: forwards;
		//-webkit-animation-fill-mode: forwards;
		image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			//box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
			//position: absolute;
			//top: 50%;
			//left: 50%;
			//transform: translate(-50%, -50%);
				
			border: 1px solid #fff;
		}
		&-view {
			&-img.on {
				-webkit-animation: 10s rowup linear infinite normal;
				animation: 10s rowup linear infinite normal;
				//animation-fill-mode: forwards;
				//-webkit-animation-fill-mode: forwards;
			}
		}
	}
	&-right {
		
	}
}

@keyframes rowup {
	0% {
		-webkit-transform: translate(0%, 0%) rotate(0deg);
		transform-origin: center center;
	}

	100% {
		-webkit-transform: translate(0%, 0%) rotate(360deg);
		transform-origin: center center;
	}
}
</style>
