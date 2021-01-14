<template>
	<!-- 音频详情界面 -->
	<view class="content" :style="{height}">
		<u-navbar :is-back="true" :title="title">
			<view class="slot-wrap">
				
			</view>
		</u-navbar>
		<view class="content-img">
			<image :src="imgSrc" :style="{width:maxWidth+'px', height:maxWidth+'px'}"></image>
		</view>
		<!-- v-if="isPlay", isPlay: false,-->
		<zaudio @praise="praiseUp" :coverImgUrl="coverImgUrl" :title="title"   :autoplay="true" :continue="true"  :dzcs="dzcs" :sfdz="sfdz"></zaudio>
	</view>
</template>

<script>
	import zaudio from '@/zaudio/zaudio.vue';
	import { mapGetters, mapMutations } from 'vuex';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let isRequestFinished = 0;
	export default {
		data() {
			return {
				key: 0,
				statusBarHeight: '',
				maxWidth: '',
				imgSrc: '',
				title: '',
				coverImgUrl: '',
				dzcs: '',
				sfdz: '',
				//isPlay: false,
				height: ''
			};
		},
		async onLoad(option) {
			const info = uni.getSystemInfoSync();
			console.log('playinfo:'+JSON.stringify(this.playinfo));
			this.height = info.windowHeight+'px';
			this.statusBarHeight =  info.statusBarHeight;
			//const u = this.$store.getters.userInfo;
			//console.log('u'+JSON.stringify(u));
			this.maxWidth = info.windowWidth * 0.9;
			let idStr = option.id;
			if (!idStr) {
				idStr = this.playinfo.id;
			}
			//this.$audio.src = this.playinfo.src;
			await this.getAudioSrc(idStr);
		},
		computed: {
			...mapGetters(['playinfo', 'userInfo']),
			uid: function() {
				if (this.userInfo.uid) {
					return this.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			}
		},
		components: { 
			zaudio
		},
		methods: {
			...mapMutations(['set_playinfo']),
			async praiseUp() {
				if(isRequestFinished!=0) {
					return;
				}
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const type  = 1 - this.sfdz;
				const idStr = this.uid;
				const nidStr= this.playinfo.id;
				const params = {
					auth: auth,
					nid: nidStr,
					uid: idStr,
					type: type,
					version: 'v2',
					filterData: true
				};
				const url = apiPrefix+'?mod=product&ac=dz_insert';
				const resp = await http.request(url, params);
				if (resp.status == 1) {
					isRequestFinished = 1;
					setTimeout(()=> {
						isRequestFinished = 0;
					}, 1300);
					this.sfdz = 1- this.sfdz;
					this.dzcs = resp.dzcs;
				}
			},
			async getAudioSrc(idStr) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const uid       = this.uid;
				const params = {
					auth: auth,
					nid: idStr,
					uid: uid,
					version: 'v2',
					filterData: true
				};
				console.log('audioParams:'+JSON.stringify(params));
				const url = apiPrefix+'?mod=product&ac=read';
				const resp = await http.request(url, params);
				
				console.log('audioResp:'+JSON.stringify(resp));
				
				if (resp.status == 1) {
					const respData = resp.data;
					const src = respData.downurl;
					this.sfdz = respData.sfdz;
					this.dzcs = respData.dzcs;
					this.set_playinfo({
						//src: src,
						coverImgUrl: respData.litpic
					});
					console.log('set playinfo src:'+JSON.stringify(this.playinfo));
					this.imgSrc = respData.litpic_big;
					this.coverImgUrl = respData.litpic;
					this.title = respData.title;
					
					//this.isPlay = true;
				}
			}
		}
	};
</script>

<style scoped lang="scss">
body {
	height: 100%;
}
.header {
	
}
.bottom {
	margin: 20rpx
}

.content {
	display: flex;
	flex-direction: column;
	align-items: justify-content;
	&-img {
		width: 90%;
		margin-left: 5%;
		margin-right: 5%;
		/*margin-top: 20px;
		margin-bottom: 50px;*/
		display: flex;
		justify-content: center;
		img {
			max-width: 100%;
			
		}
	}
}

.slot-wrap {
	display: flex;
	align-items: center;
}
</style>
