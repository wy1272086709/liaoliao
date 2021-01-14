<template>
	<view>
		<video :id="videoId" class="video" :src="url" autoplay="true" duration="" controls="true" 
			danmu-btn="true" enable-danmu="true" :loop="true" muted="true" initial-time="" direction="-90"
			show-mute-btn="true"  @pause="pause" @ended="onfinish" @error="onfail" @waiting="waiting"
			@timeupdate="timeupdate" @fullscreenchange="fullscreenchange">
		</video>
	
		<button class="btn" @click="seek">跳转到指定位置</button>
	</view>
</template>
<script>
export default { 
		data() { 
			return { 
				VideoContext: {}, 
				state: true, 
				currentTime: 0, 
				duration: 0, 
				videoId: '',
				url: 'http://imgmyqx.ofbei.com/upload1/20201207/5a755bafd1ceee8b93196173e3d9d563.mp4' ,
			 } 
		}, 
		 onReady() { 
			 console.log('onReady...');
			this.videoId = Date.now() + Math.ceil(Math.random()*10000000)+""; 
			this.VideoContext = uni.createVideoContext(this.videoId); 
			
			this.VideoContext.play(); 
			setTimeout(()=> {
			this.VideoContext.seek(18.299);
			}, 1000);
			console.log('video context here!');
		}, 
		 onLoad() { 
			 console.log('onLoad...');
			const info = uni.getSystemInfoSync(); this.width = info.windowWidth+'px'; 
			this.height = info.windowHeight;
		}, 
		 methods: { 
			 seek() {
				 this.VideoContext.seek(25);
				 this.VideoContext.play(); 
			 },
			 timeupdate(e) { 
				console.log(e.detail); 
				this.duration = e.detail.duration 
				this.currentTime = e.detail.currentTime 
			}, 
			pause(e) { 
				console.log('e--pause:'+JSON.stringify(e)); 
			}, 
			onfinish(e) {
				
			},
			onfail(e) {
				
			},
			waiting(e) {
				
			},
			fullscreenchange(e) { 
				console.log('e--fullscreenchange:'+JSON.stringify(e)); 
			}, 
			exitFullScreen(e) { 
				console.log('e--exitFullScreen'+JSON.stringify(e)); 
			} 
		} ,
}
</script>