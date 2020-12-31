<template>
	<view>
		<view v-for="item in audioList" :key="item.id" class="audio-view">
			<luch-audio :author="item.author" :name="item.name"  :src="item.src" :play.sync="item.audioPlay" ></luch-audio>
		</view>
	</view>
</template>

<script>
	import luchAudio from '../../common/luch-audio.vue';
	export default {
		data() {
			return {
				audioList: [
					{
						name: '歌曲3',
						author: '作者3',
						id: 1,
						audioPlay: true,
						src: '../../static/video/1.mp3',
					},
					{
						name: '歌曲2',
						author: '作者2',
						id: 2,
						audioPlay: true,
						src: '../../static/video/2.mp3',
					},
					/*{
						name: '歌曲1',
						author: '作者1',
						id: 3,
						audioPlay: true,
					}*/
				]
			}
		},
		methods:{
			play(data) {
				const m = uni.getBackgroundAudioManager();
				if (data) {
					m.play();
				} else {
					m.pause();
				}
			}
		},
		components:{
			luchAudio
		}
	}
</script>

<style>
	.audio-view {
		margin-bottom: 20px;
	}
</style>
