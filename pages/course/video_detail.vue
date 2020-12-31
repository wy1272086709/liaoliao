<template>
	<view id="root-view" :style="{'padding-top':top,'padding-bottom':bottom}">
		<video-course @updateVideoProgress="updatePlayProgress" :url="videoInfo.videoUrl" :height="h" :width="w" v-if="isShowVideo"></video-course>
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
				isShowVideo: false,
				top: '',
				bottom: '',
			}
		},
		computed:{
			...mapGetters(['videoInfo', 'videoPaused']),
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
		onLoad(option) {
			const info = uni.getSystemInfoSync();
			this.w = info.windowWidth+'px';
			const height =  Math.round(603/375 * 750, 1);
			this.h = height+'rpx';
			const v = ((info.windowHeight - uni.upx2px(height))/2)+'px';
			this.top = this.bottom = v;
			console.log('w'+this.w+',h='+this.h);
			console.log('videoInfo'+JSON.stringify(this.videoInfo));
			console.log('isFromIndex:'+JSON.stringify(option.isFromIndex));
			this.$audio.pause();
			//const t = this.videoInfo.title;
			if (option.isFromIndex == 1) {
				isFromIndex = 1;
			}
			if (option.isFromIndex == 1) {
				this.getVideoSrc();
			} else {
				const t = this.videoInfo.title;
				console.log('t'+t);
				uni.setNavigationBarTitle({
					title: t
				});
				this.isShowVideo = true;
			}
		},
		onBackPress(e) {
			console.log("监听返回按钮事件", e);
			if (!this.videoPaused)
			this.updatePlayProgress();
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			console.log('curRoute:'+curRoute+',isFromIndex'+isFromIndex);
			// 这里更新播放进度
			if (!isFromIndex) {
				if (curRoute == 'pages/course/course_study_log') {
					uni.switchTab({
						url: '/pages/course/index',
						complete() {
							console.log('switch tab success!');
						}
					});
				} else if(curRoute == 'pages/course/video_detail') {
					uni.navigateTo({
						url: '/pages/course/course_study_log',
						complete() {
							console.log('navigate success!');
						}
					});
				}
			} else {
				uni.switchTab({
					url: '/pages/course/index'
				});
			}
			// 此处一定姚要return为true，否则页面不会返回到指定路径
			return true;
		},
		methods: {
			...mapMutations(['setVideoInfo']),
			async updatePlayProgress() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const url       = data.serverUri+'?mod=product&ac=jd_log'
				const params = {
					auth: auth,
					nid: this.videoInfo.id,
					uid: this.uid,
					cid: 3,
					jdsc: this.videoInfo.current_time,
					zsc:  this.videoInfo.duration,
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
					this.setVideoInfo({
						videoUrl: src
					});
					console.log('title:'+resp.data.title);
					uni.setNavigationBarTitle({
						title:resp.data.title
					});
					this.isShowVideo = true;
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
	align-items: flex-start;
}
</style>
