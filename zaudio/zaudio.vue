<template>
	<view class="imt-audio theme2" v-if="audiolist.length > 0">
		<view class="top">
			<view class="audio-control-wrapper">
				<image :src="coverImgUrl" mode="aspectFit" class="cover" :class="{ on: !renderData('paused') }"></image>
				<template>
					<image :src="require('./static/playbtn.png')" alt="" @click="operation(true)" class="play" v-if="renderData('paused')"></image>
					<image :src="require('./static/pausebtn.png')" alt="" @click="operation(false)" class="play" v-else></image>
				</template>
			</view>

			<view>
				<view class="title">{{ renderData('title') }}</view>
				<view class="singer">{{ renderData('singer') }}</view>
				<view class="praise" @tap="$emit('praise')">
					<u-icon name='thumb-up' size='32' :color="sfdz?'#FF0000':'#333333'"></u-icon>
					<text style="margin-left: 10px;">{{dzcs}}</text>
				</view>
			</view>
		</view>
		<!-- :disabled="!renderIsPlay" -->
		<view class="audio-wrapper">
			<view class="audio-number">{{ renderData('current') }}</view>
			<slider
				class="audio-slider"
				:activeColor="themeColor"
				block-size="16"
				:value="renderData('current_value')"
				:max="renderData('duration_value')"
				@changing="changing"
				@change="change"
				
			></slider>
			<view class="audio-number">{{ renderData('duration') }}</view>
		</view>
	</view>
</template>

<script>
import { formatSeconds } from './util.js';
import { mapGetters, mapMutations } from 'vuex';
import audioMixins from './audio_mixins.js';
export default {
	props: {
		default_cover: {
			type: String //默认海报
		},
		//自动续播下一首
		continue: {
			type: Boolean,
			default: false
		},
		//自动播放
		autoplay: {
			type: Boolean,
			default: true
		},
		themeColor: {
			type: String,
			default: '#42b983'
		},
		coverImgUrl: {
			type: String,
			default: ''
		},
		sfdz: {
			type: [Number, Boolean],
			default: 0
		},
		dzcs: {
			type: [Number, String],
			default: '1'
		}
	},
	mixins: [
		audioMixins
	],
	computed: {
		format() {
			return num => formatSeconds(num);
		},
		//  'renderIndex', 'audio', 'playIndex', 'renderIsPlay'
		...mapGetters(['audiolist', 'playinfo', 'n_pause', 'paused', 'curPlayId']),
		renderData() {
			return name => {
				if (name == 'paused') {
					return this.paused;
				}
				return this.playinfo[name];
			};
		}
	},
	created() {
		this.audioInit();
	},
	methods: {
		// 'set_renderIndex','set_audio',
		...mapMutations([ 'set_playinfo', 'set_pause', 'set_n_pause', 'set_curPlayId']),
		audioInit() {
			console.log('ini1');
			
			if (this.autoplay && this.$audio.src) {
				console.log('autoplay...');
				const { src, duration_value, current_value, fromLog } = this.playinfo;
				if (this.$audio.src!=src) {
					this.$audio.src = src;
					this.$audio.startTime = 0;
					this.$audio.seek(0);
				}
				this.operation(true);
			}
			if (this.$audio.started) return;
			console.log('init2...');
			this.$audio.started = true;
			this.initAudioEvents();
			console.log('$audio开始监听事件');
			
			if (this.autoplay && !this.$audio.src) {
				const { duration_value, current_value, src, title, singer, coverImgUrl, fromLog } = this.playinfo;
				console.log('src:'+src);
				this.$audio.src = src;
				this.$audio.title = title;
				this.$audio.singer = singer;
				this.$audio.coverImgUrl = coverImgUrl;
				this.operation(true);
			}
		},
		changing(event) {
			this.set_playinfo({
				current: this.format(event.detail.value),
				current_value: event.detail.value
			});
		},
		//播放or暂停,或者从学习记录中跳转过来的。
		operation(status) {
			console.log('status:'+status);
			console.log('this.playinfo:'+JSON.stringify(this.playinfo));
			console.log('curPlayId'+this.curPlayId);
			const { fromLog, current_value, duration_value } = this.playinfo;
			//渲染与播放地址 不同
			if (status) {
				// 播放 渲染的数据
				if ((fromLog && current_value!=duration_value) || (this.curPlayId== this.playinfo.id)) {
					//this.$audio.startTime = parseFloat(current_value);
					this.$audio.seek(parseFloat(current_value));
				} else {
					console.log('2222');
					this.$audio.startTime = 0;
					this.$audio.seek(0);
				}
				this.set_curPlayId(this.playinfo.id);
				this.set_pause(false);
				this.set_n_pause(false);
				
				this.$audio.play();
			} else {
				//暂停
				console.log('xxxxx');
				this.$audio.pause();
				this.set_pause(true);
				this.set_n_pause(true);
			}
		},
		//拖动
		change(e) {
			this.$audio.seek(e.detail.value);
		},
	}
};
</script>

<style scoped lang="scss">
@import './index.scss';
//  #ifdef MP-WEIXIN
.theme3 .audio-slider {
	margin-top: -8px !important;
}
// #endif
</style>
