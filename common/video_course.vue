<template>
	<video :id="videoId" :ref="videoId"  @ended="end" :autoplay="true" :show-center-play-btn="true" :controls="true" @exitFullScreen="exitFullScreen" :style="{height:height, width:'750rpx'}" @pause="pause" @timeupdate="timeupdate" @fullscreenchange="fullscreenchange" class="video" :src="url"></video>	
</template>

<script>
	import {mapMutations,mapGetters} from 'vuex'
	export default {
		computed:{
			...mapGetters(['videoInfo', 'curPlayId']),
			posterUrl(){
				if(this.poster) return this.poster
				return this.url + '?x-oss-process=video/snapshot,t_'+(parseInt(this.currentTime*1000))+',f_jpg,w_800,m_fast'
			}
		},
		created() {
			//this.videoId = Date.now() + Math.ceil(Math.random()*10000000)+"";
			this.videoId = 'myVideo';
			this.VideoContext = uni.createVideoContext(this.videoId, this);
		},
		//ref="video1"
		mounted() {
			console.log('mounted...');
			this.set_curPlayId(this.videoInfo.id);
			console.log('this.videoInfo'+JSON.stringify(this.videoInfo));
			const t = this.videoInfo.current_time;
			const x = this.videoInfo.fromLog;
			console.log('x'+x+',t+'+t);
			// 播放的ID不同,或者从课程记录中跳转过来的.
			
			if (t &&x==1 || (this.curPlayId==this.videoInfo.id)) {
				console.log('seek video'+t);
				this.VideoContext.seek(t);
			} else {
				this.VideoContext.seek(0);
			}
			this.VideoContext.play();
		},
		methods:{
			...mapMutations(['setVideoInfo', 'setVideoLogList', 'set_curPlayId', 'setVideoPaused']),
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
				this.setVideoPaused(true);
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
				this.$emit('updateVideoProgress');
			},
			exitFullScreen() {
				
			}
		},
		watch: {
			state(state, oldValue) {
				console.log(state,'state');
				if(!state){
					this.VideoContext.pause()
				}else{
					this.$nextTick(()=>{
						//this.VideoContext.requestFullScreen({direction:this.direction})
					});
				}
			}
		},
		data() {
			return {
				VideoContext:{},
				state:true,
				currentTime:0,
				duration:0,
				videoId:''
			};
		},
		props: {
			poster: {
				type: [String,Boolean],
				default(){
					return ''
				}
			},
			title: {
				type: String,
				default: '呵呵'
			},
			url: {
				type: String,
				default(){
					return ''
				}
			},
			direction: {
				type: String,
				default(){
					return 'vertical'
				}
			},
			width: {
				type: String,
				default(){
					return "750rpx";
				}
			},
			height: {
				type: [ String, Number ],
				default() {
					return "450rpx";
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
.root{
	position:relative;
	width: 750rpx;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}
.title {
	color: #FFFFFF;
}
.posterImg,.video,.box{
	display: flex;
	width: 750rpx;
	/*height: 300px;*/
	//border: solid 1px red;absolute
	position:absolute;
}
.posterImg{
	//border: solid red 1px;
}
.box{
	justify-content: center;
	align-items: center;
}
.playIcon{
	width: 100rpx;
}
</style>
