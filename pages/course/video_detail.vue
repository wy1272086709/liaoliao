<template>
	<view id="root-view" :style="{}">
		<!--
		<video-course @updateVideoProgress="updatePlayProgress" :url="videoInfo.videoUrl" :height="h" :width="w" v-if="isShowVideo"></video-course>
		-->
		<!--
		<view :style="{height:top}" class="w-view"></view>
		-->
		<video id="myVideo" ref="myVideo"  @ended="end" :autoplay="true" :show-center-play-btn="true" :controls="true" @exitFullScreen="exitFullScreen" :initial-time="videoPosition" :style="{height:h, width:'750rpx', position:'absolute',top: top,left:0}" @pause="pause" @timeupdate="timeupdate" @fullscreenchange="fullscreenchange" class="video" :src="url"></video>	
		<view :style="{height:bottom}" class="w-view">
			
		</view>
	</view>
</template>

<script>
	import videoCourse from '../../common/video_course.vue';
	import {mapGetters, mapMutations} from 'vuex';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let isFromIndex = 0;
	export default {
		data() {
			return {
				//isShowVideo: false,
				top: '',
				videoPosition: 0,
				bottom: '',
				url: '',
				height: '',
				VideoContext: null,
			}
		},
		computed:{
			...mapGetters(['videoInfo', 'videoPaused', 'paused', 'n_pause']),
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				const uid =  util.cache('app_userid', null);
				if (uid) {
					return uid;
				}
				return 0;
			},
		},
		onHide() {
			console.log('onHide...');
		},
		onReady() {
			console.log('onReady...');
			
		},
		onLoad(option) {
			const info = uni.getSystemInfoSync();
			this.w = info.windowWidth+'px';
			const height =  Math.round(603/375 * 750, 1);
			this.h = height+'rpx';
			const v = ((info.windowHeight - uni.upx2px(height))/2)+'px';
			this.top = this.bottom = v;
			console.log('onLoad...'+JSON.stringify(option));
			console.log('w'+this.w+',h='+this.h);
			console.log('videoInfo'+JSON.stringify(this.videoInfo));
			console.log('isFromIndex:'+JSON.stringify(option.isFromIndex));
			if (!this.paused) {
				this.$audio.stop();
			}
			
			if (!this.VideoContext) {
				this.VideoContext = uni.createVideoContext('myVideo');
			}
			
			//const t = this.videoInfo.title;
			if (option.isFromIndex == 1) {
				isFromIndex = 1;
			}
			if (isFromIndex == 1) {
				this.getVideoSrc();
			} else {
				const info = this.videoInfo;
				const t = info.title;
				console.log('t'+t);
				uni.setNavigationBarTitle({
					title: t
				});
				console.log('video-info:'+JSON.stringify(info));
				if (this.url != info.videoUrl) {
					this.url = info.videoUrl;
				}
				//this.isShowVideo = true;
				this.initVideo();
			}
		},
		
		onBackPress(options) {
			console.log("监听返回按钮事件", options);
			if (options.from === 'navigateBack') {  
				return false;  
			}  
			if (!this.videoPaused) {
				this.updatePlayProgress();
			}
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			console.log('curRoute:'+curRoute+',isFromIndex'+isFromIndex);
			// 这里更新播放进度
			if (!isFromIndex) {
				const _self = this;
				uni.navigateBack({
					delta:1,
					complete() {
						console.log('navigate success!');
						_self.VideoContext.pause();
					}
				})
				/*
				uni.navigateTo({
					url: '/pages/course/course_study_log',
					complete() {
						console.log('navigate success!');
						_self.VideoContext.pause();
					}
				});*/
			} else {
				uni.switchTab({
					url: '/pages/course/index'
				});
			}
			// 此处一定姚要return为true，否则页面不会返回到指定路径
			return true;
		},
		methods: {
			...mapMutations(['setVideoInfo', 'setVideoLogList', 'set_curPlayId', 'setVideoPaused']),
			initVideo() {
				console.log('mounted...');
				this.set_curPlayId(this.videoInfo.id);
				console.log('this.videoInfo'+JSON.stringify(this.videoInfo));
				const t = this.videoInfo.current_time;
				const x = this.videoInfo.fromLog;
				console.log('x'+x+',t+'+t);
				// 播放的ID不同,或者从课程记录中跳转过来的.
				
				if (t &&x==1 || (this.curPlayId==this.videoInfo.id)) {
					const per = Math.round(t*100/this.duration, 2);
					this.videoPosition = per==100?0:t;
				} else {
					
				}
				//this.VideoContext.play();
			},
			fullscreenchange(e) {
				console.log(e.detail);
				//this.state = e.detail.fullScreen
			},
			timeupdate(e) {
				console.log(e.detail);
				this.duration = e.detail.duration
				this.currentTime = e.detail.currentTime
			},
			end(e) {
				console.log('end');
				this.setVideoPaused(true);
				this.updatePlayProgress(true);
			},
			pause(e) {
				console.log('pause!...');
				console.log('e',e);
				// 将对应的状态信息,存进vuex 中
				const t = this.currentTime;
				this.setVideoInfo({current_time:t,duration:this.duration});
				this.setVideoPaused(true);
				console.log('pause video'+JSON.stringify(this.videoInfo));
				this.setVideoLogList(this.videoInfo);
				//this.$emit('updateVideoProgress');
				this.updatePlayProgress();
				//this.VideoContext.pause();
			},
			exitFullScreen() {
				
			},
			async updatePlayProgress(isComplete) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const url       = data.serverUri+'?mod=product&ac=jd_log'
				const zsc = Math.round(this.videoInfo.duration, 5);
				const jdsc  = isComplete?zsc:Math.round(this.videoInfo.current_time, 5);
				const params = {
					auth: auth,
					nid: this.videoInfo.id,
					uid: this.uid,
					cid: 3,
					jdsc: jdsc,
					zsc:  zsc,
					version: 'v2',
					filterData: true
				};
				const resp = await http.request(url, params);
				console.log('resp:'+JSON.stringify(resp));
				if (resp.status == 1) {
					
				}
			},
			async getVideoSrc() {
				const t = new Date().getTime()/1000;
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params = {
					auth: auth,
					nid: this.videoInfo.id,
					uid: this.uid,
					version: 'v2',
					filterData: true
				};
				const url = apiPrefix+'?mod=product&ac=read';
				const resp = await http.request(url, params);
				if (resp.status == 1) {
					const t2 = new Date().getTime()/1000;
					console.log('t2-t:'+(t2-t)+'s');
					const src = resp.data.downurl;
					if (src!=this.url) {
						this.setVideoInfo({
							videoUrl: src
						});
						this.url = src;
					}
					console.log('title:'+resp.data.title);
					uni.setNavigationBarTitle({
						title:resp.data.title
					});
					//this.isShowVideo = true;
					this.initVideo();
				}
			}
		},
		components:{
			videoCourse
		}
	}
</script>

<style>
#root-view {
	display: flex;
	/*flex-direction: column;
	align-items: flex-start;*/
}
.w-view {
	width: 100%;
}
</style>
