<template>
	<view>
		<u-navbar :isBack="false" title="" :borderBottom="true" :isFixed="true"  :zIndex="10000000000000001" :height="platform == 1? 98: 94">
			<template v-slot:default="">
				<view class="slot-wrap">
					<view id="search-box">
						<view id="slot-title" @tap="gotoTop">小妙教程</view>
						<view id="slot-input">
							<u-search placeholder="大家都在搜" @change="mindInput" v-model="keyword" :show-action="false"></u-search>
						</view>
					</view>
					<view id="tab-view">
						<u-tabs  gutter="33" bg-color="#FFFFFF" :name="'title'" :bold="bold" :active-color="activeColor" :list="tabArr"
						@change="change" :bar-width="110" :current="activeTabIndex" :is-scroll="isScroll"></u-tabs>
					</view>
				</view>
			</template>
		</u-navbar>
			
		<swiper :current="activeTabIndex" :scroll-with-animation="true" 	@change="switchVideoTab" :style="'width:100%;height:'+scrollHeight+'px;'">
			<swiper-item :class="[ 'swiper-item-css', index==0?'swiper-item-top':'' ]" v-for="(item,index) in tabArr" :key="item.navId">
				<scroll-view :style="'height:'+scrollHeight+'px;'"  scroll-y="true"	 
				@scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop">
					<view v-if="activeTabIndex == 0">
						<article-course @view_article="getArticleView" :key="info.id" v-for="(info,m) in articeList" :info="info" :isShowLock="info.isShowLock">
							
						</article-course>
					</view>						
					<view v-else-if="activeTabIndex == 1">
						<audio-course @click.native="viewAudio(item)" :title="item.title" :isShowLock="item.isShowLock" :playCnt="item.playCnt" v-for="(item, key) in allAudioList" :key="item.id">
							
						</audio-course>
					</view>
					<view v-else>
						<view>
							<!-- :danmu-list="danmuList" enable-danmu danmu-btn -->
							<video class="myVideo" controls	 src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
								@error="videoErrorCallback"></video>
						</view>	
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>	  				
	</view>
</view>
</template>

<script>
	import util from '../../common/util.js';
	import audioCourse from '../../common/audio_course.vue';
	import articleCourse from '../../common/article_course.vue';
	import course from '../../common/view_course.js';
	let nowpage = 1;
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		
		data() {
			return {
				src: '',
				inputVal: '',
				keyword: '',
				scrollHeight: '',
				control: true,
				activeTabIndex: 0,
				isScroll: true,
				platform: '',
				
				bold: true,
				old: {
					scrollTop:0,
				},
				scrollTop: 0,
				suoImg: '../../static/img/suo.png',
				// 是否充值,false 表示未充值...
				isRecharge: false,
				activeColor: '#A88FEF',
				tabArr: [ 
					{ name: '文章专区', navId:1 }, 
					{ name: '音频专区',navId: 2 }, 
					{ name: '视频专区', navId: 3 }, 
				],
				articeList: [],
				allAudioList: [],
				/*danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				speedValue: 1.0*/
			}
		},
		mixins:[
			course
		],
		onReady() {
			
		},
		onShow() {
			//渲染当前列表中歌曲的播放的进度
			//必须放在onShow中A
			//this.set_renderIndex(this.playIndex);
		},
		components:{
			audioCourse,
			articleCourse
		},
		computed:{
			//'playIndex',
			...mapGetters(['audiolist',  'playinfo', 'paused', 'curPlayId']),
			uid: function() {
				let uid = util.cache('app_userid', null);
				console.log('uid', uid);
				return uid ? uid: 0;
			},
			score: {
				get() {
					return 999;
				},
				set() {
					
				}
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync();
			this.platform = getApp().globalData.platform;
			this.scrollHeight = info.windowHeight - info.statusBarHeight - 20- uni.upx2px(60+80+8);
			this.articeList   = [
				{
					cid: "68",
					classname: "形象提升",
					description: "",
					id: "389",
					readNum: "15",
					readTime: "2020-11-11 16:37:27",
					sfsc: 0,
					thumbUrl: "http://imgmyqx.ofbei.com/upload1/20201111/20201111163727_759.jpg",
					title: "什么样的男生比较受欢迎",
					isShowLock: true,
					wzsccs: "1",
					score_num: 10
				}
			];
			this.allAudioList = [
				{
					title: '什么样的男生受欢迎1',
					isShowLock: false,
					playCnt: '6万',
					id: 1,
					score_num: 10,
					src: '../../static/video/1.mp3'
				},
				{
					title: '什么样的男生受欢迎2',
					isShowLock: false,
					id: 2,
					playCnt: '6万',
					score_num: 10,
					src: '../../static/video/2.mp3'
				}
			];
			const audioList = this.allAudioList.filter((info)=> {
				return !info.isShowLock;
			});
			console.log('audioList:'+JSON.stringify(audioList));
			//设置音频列表
			this.set_audiolist({
				data: audioList,
				status: false
			});
			// 
		},
		methods: {
			// 'set_renderIndex','set_audio'
			...mapMutations([ 'set_audiolist', 'set_playinfo','set_curPlayId' ]),
			viewAudio(info) {
				// 跳转到音频详情页...
				const storeInfo = this.getStoreAudioInfo(info);
				if(this.curPlayId!=storeInfo.id) {
					this.set_playinfo({
						id: storeInfo.id,
						title: storeInfo.title,
						src: storeInfo.src,
						singer: storeInfo.singer,
						coverImgUrl: storeInfo.coverImgUrl,
					});
					
				}
				
				const viewFunc = () => {
					// 扣除当前用户的积分,然后写进vuex,cache中...
					if (info.isShowLock) {
						this.score-=info.score_num;
						// 扣完积分之后,当前音频
						this.set_audiolist({
							data: [...storeInfo],
							status: true,
						});
					}
					info.isShowLock = false;
					uni.navigateTo({
						url: '/pages/index/audio_detail'
					});
				};
				// info 里面需要一个tabIndex;
				info.tabIndex = 1;
				const isVisit = this.canVisit(this.uid, info, 1, this.score, viewFunc);
			},
			getStoreAudioInfo(info) {
				const audioInfo = {};
				['title', 'src', 'singer', 'coverImgUrl', 'id'].forEach((key)=>{
					audioInfo[key] = info[key];
				});
				return audioInfo;
			},
			updateScore(score, nid, uid) {
				// 更新当前用户消耗的积分...
				
			},
			loadItemPic(src) {
				/*console.log('文章图片');
				let d = new Date;
				console.log(',img src:'+src+' time:'+d.getTime());*/
			},
			videoErrorCallback() {
				
			},
			getArticleView(info) {
				info.tabIndex = 0;
				//uid, info, type, score, callback
				const succCallback = () => {
					const id = info.id;
					const cid = info.cid;
					const tabTitle = info.tabTitle;
					info.isShowLock = false;
					// 获取文章详情信息
					uni.navigateTo({
						url:'/pages/cases/detail?id='+id+'&cid='+cid+"&title="+tabTitle
					});
				};
				this.canVisit(this.uid, info, 0,  this.score, succCallback);
			},
			switchVideoTab(e) {
				console.log('e', e);
				this.activeTabIndex = e.detail.current;
				//this.activeTabIndex = index;
			},
			inputFocus() {
				
			},
			mindInput() {
				
			},
			lower() {
				// 这里下拉加载数据...
				
			},
			scrollTopFunc() {
				
			},
			scroll() {
				
			},
			change(index) {
				this.activeTabIndex = index;
				nowpage = 1;
				// 这里刷新测试列表...
				
			},
			gotoTop() {
				
			},
			blurFunc() {
				const len = this.inputVal.length;
				console.log('input value....'+len+':--'+this.inputVal);
			},
			sendDanmu() {
				console.log('sendDanmu!...');
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			speedControl(v) {
				this.speedValue = v;
				this.videoContext.playbackRate(v);
			}
		}
	}
</script>

<style lang="scss">
.speed-list {
	background-color: #000000;
	width: 120px;
	height: 230px;
}

.u-tabs {
	
}
.slot-wrap {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	//margin-top:35rpx;
	/*padding-left:32rpx;*/
	/*padding-right:34rpx;*/
	/*padding-bottom: 20rpx;*/
	//margin-bottom:11rpx;
	//padding-bottom: 20rpx;
	justify-content: space-between;
	#search-box {
		display: flex;
		justify-content: flex-start;
		padding-top:10px;
		padding-bottom: 10px;
		#slot-title {
			display: flex;
			width:160rpx;
			/*flex-shrink: 1;*/
			height: 60rpx;
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #343434; 
		}
		
		#slot-input {
			display: flex;
			flex-direction: row-reverse;
			box-sizing: border-box;
			width:500rpx;
			height: 60rpx;
			margin-left:20rpx;
			padding-left: 20rpx;
			align-items: center;
			background: #F2F2F2;
			border-radius: 30rpx;
		}
	}

	#tab-view {
		
	}
}

.speed-list >view {
	color: #FFFFFF;
	text-align: center;
	font-size: 16px;
	height: 46px;
	line-height: 46px;
}

.myVideo {
	
	width:750rpx;
	/*width: 686rpx;
	margin-left:32rpx;
	margin-right: 32rpx;*/
}
.swiper-item-css {
	margin-top:20px;
}
.swiper-item-top {
	margin-top:0px;
}

view.active {
	color:#09BB07;
}


</style>
