<template>
	<view>
		<u-navbar :isBack="false" title="" :borderBottom="true" :isFixed="true"  :zIndex="10000000000000001" :height="platform == 1? 58: 54">
			<template v-slot:default="">
				<view class="slot-wrap">
					<view id="search-box">
						<view id="slot-title" @tap="gotoTop">小妙教程</view>
						<view id="slot-input">
							<u-search @search="courseSearch(1)" placeholder="大家都在搜" @change="courseSearch(1)" v-model="keyword" :show-action="false"></u-search>
						</view>
					</view>
				</view>
			</template>
		</u-navbar>
			
		<view id="tab-view">
			<u-tabs bg-color="#FFFFFF" :name="'title'" :bold="bold" :active-color="activeColor" :list="tabArr"
			@change="switchTab" :show-bar="false" :bar-width="110" :current="activeTabIndex" :is-scroll="isScroll"></u-tabs>
		</view>
		
		<swiper :current="activeTabIndex" :scroll-with-animation="true" 	@change="switchCourseTab" :style="'width:100%;height:'+scrollHeight+'px;margin-top:80rpx;'">
			<swiper-item :class="[ 'swiper-item-css', index==0?'swiper-item-top':'' ]" v-for="(item,index) in tabArr" :key="item.navId">
				<scroll-view :style="'height:'+scrollHeight+'px;'"  scroll-y="true"	 
				@scrolltolower="lower" @scrolltoupper="upper"   :scroll-top="scrollTop">
					<view v-if="activeTabIndex == 0">
						<article-course @view_article="getArticleView" :key="info.id" v-for="(info,m) in articeList" :info="info" :isShowLock="info.isShowLock"></article-course>
					</view>						
					<view v-else-if="activeTabIndex == 1">
						<!--  @tap.native="viewAudio(item)"   -->
						<audio-course :courseType="2"  :thumbUrl="item.thumbUrl" @view_audio="viewAudio(item)"  :score_num="item.score_num" :title="item.title" :isShowLock="item.isShowLock" :playCnt="item.readNum" v-for="(item, key) in allAudioList" :key="item.id" :wzsccs="item.wzsccs">
						</audio-course>
					</view>
					<view v-else>
						<!-- :danmu-list="danmuList" enable-danmu danmu-btn -->
						<!--
						<video class="myVideo" :controls="false" 	 src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
							@error="videoErrorCallback"></video>
							-->
						<audio-course :courseType="3" :thumbUrl="item.thumbUrl" @view_video="viewVideo(item)" :score_num="item.score_num" :title="item.title" :isShowLock="item.isShowLock" :playCnt="item.readNum" v-for="(item, key) in videoList" :key="item.id"></audio-course>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>	
		<audio-cover @closeAudioCover="closeAudioCover" :customStyle="{position:'fixed', bottom:'0px', zIndex:'1000005'}" :info="info" v-if="isShowCover"></audio-cover>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import http from '../../common/http.js';
	import audioCourse from '../../common/audio_course.vue';
	import articleCourse from '../../common/article_course.vue';
	import course from '../../common/view_course.js';
	import audioCover from '../../common/audio_cover.vue';
	import { mapGetters, mapMutations } from 'vuex';
	// 
	let nowpage = 1;
	
	let totalpage1 = 1;
	let totalpage2 = 2;
	let totalpage3 = 3;
	let totalpage = 1;
	let totalpage4 = 1; // 搜索总共多少页
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
					
				],
				articeList: [],
				allAudioList: [],
				videoList: [],
				info: {
					
				},
				isShowCover: true,
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
		async onShow() {
			console.log('onShow...');
			//渲染当前列表中歌曲的播放的进度
			//必须放在onShow中A
			//this.set_renderIndex(this.playIndex);
			this.keyword = '';
			this.getArticleList(1);
			this.getAudioList(1);
			this.getVideoList(1);
			//const playinfo = { ...mapGetters(['playinfo']) };	
			console.log('playinfo:'+JSON.stringify(this.playinfo));
			const title = this.playinfo?this.playinfo.title:'';
			const status = this.paused|| this.n_pause?0:1;
			const imgUrl = this.playinfo.coverImgUrl?this.playinfo.coverImgUrl: '';
			this.info = {
				title: title,
				status: status,
				coverImg: imgUrl,
				id: this.playinfo.id
			};
			console.log('this.playinfo:'+JSON.stringify(this.playinfo));
			this.isShowCover = this.playinfo.src ? true: false;
			console.log('this.info'+JSON.stringify(this.info));
		},
		components:{
			audioCourse,
			articleCourse,
			audioCover
		},
		computed:{
			//'playIndex',
			...mapGetters(['audiolist',  'playinfo', 'paused', 'curPlayId', 'userInfo', 'n_pause']),
			uid: function() {
				const u = this.userInfo;
				if(u.uid) {
					return u.uid;
				}
				let uid = util.cache('app_userid', null);
				console.log('uid', uid);
				return uid ? uid: 0;
			},
			uInfo: function() {
				const u = this.userInfo;
				if (u.uid) {
					return u;
				} else {
					let type = util.cache('appLoginType', null);
					console.log('type', type);
					let uInfoStr = util.cache('app_user_info_'+type, null);
					console.log('uInfoStr', uInfoStr);
					if (uInfoStr) return JSON.parse(uInfoStr);
					return {};
				}
			},
			score: {
				get() {
					const info = this.uInfo;
					console.log('info'+JSON.stringify(info));
					return info.score;
				},
				set(score) {
					// 设置进用户信息里面去,同时设置积分值...
					this.setUserInfoVals({
						score:score
					});
					// 更新进入缓存中去...
					const u = this.uInfo;
					u.score = score;
					const type = util.cache('appLoginType', null);
					const str = JSON.stringify(u);
					util.cache('app_user_info_'+type, str);
				}
			}
		},
		onTabItemTap() {
			
		},
		async onLoad() {
			console.log('onLoad...');
			const info = uni.getSystemInfoSync();
			this.platform = getApp().globalData.platform;
			this.scrollHeight = info.windowHeight - info.statusBarHeight - (this.platform == 1?58:54) - uni.upx2px(80);
			
			await this.getCourseCids();
			/*const audioList = this.allAudioList.filter((info)=> {
				return !info.isShowLock;
			});
			console.log('audioList:'+JSON.stringify(audioList));*/
			//设置音频列表
		},
		methods: {
			// 'set_renderIndex','set_audio'
			...mapMutations([ 'set_audiolist', 'set_playinfo', 'setArticleLogList',
			 'setVideoInfo', 'setVideoLogList','setUserInfoVals' ]),
			async viewAudio(info) {
				// 跳转到音频详情页...
				const storeInfo = this.getStoreAudioInfo(info);
				console.log('view Audio...');
				
				
				const viewFunc = (storeInfo) => {
					let playinfo = {
						id: storeInfo.id,
						title: storeInfo.title,
						src: info.src,
						singer: storeInfo.singer,
						fromLog: 0,
						isContinue: 0,
						coverImgUrl: storeInfo.thumbUrl,
					};
					const curPlayId = uni.getStorageSync('audio_play_id');
					console.log('curPlayId:'+curPlayId+',id:'+storeInfo.id);
					if(curPlayId!=storeInfo.id) {
						
					} else {
						// 相同的,对应的值...
						playinfo.isContinue = 1;
					}
					this.set_playinfo(playinfo);
					// 扣除当前用户的积分,然后写进vuex,cache中...
					this.updateScore(storeInfo.id, this.uid, ()=> {
						uni.navigateTo({
							url: '/pages/course/audio_detail?id'+storeInfo.id
						});
					});
				};
				// info 里面需要一个tabIndex;
				//info.tabIndex = 1;
				// uid, info,  type
				const isVisit = this.canVisit(this.uid, info, 1);
				if (!isVisit) {
					return;
				}
				const redirectUrl = this.getRedirectUrl(info, 1);
				const scoreFunc = (score) => {
					this.scoreJudge(score, info, redirectUrl, viewFunc);
				};
				const score = await this.getUserScore();
				scoreFunc(score);
				//const isVisit = this.canVisit(this.uid, info, 1, this.score, viewFunc);
			},
			closeAudioCover() {
				console.log('close audio cover...');
				this.set_playinfo({
					src: ''
				});
				this.isShowCover = false;
			},
			async viewVideo(info) {
				// 跳转到音频详情页...
				console.log('viewVideo_info:'+JSON.stringify(info));
				info.fromLog = 1;
				const viewFunc = (info) => {
					// 扣除当前用户的积分,然后写进vuex,cache中...
					if (info.isShowLock) {
						//this.score-=info.score_num;
						// 扣完积分之后,当前视频
						this.setVideoLogList(info);
					}
					this.updateScore(info.id, this.uid, ()=> {
						this.setVideoInfo(info);
						uni.navigateTo({
							url: '/pages/course/video_detail?isFromIndex=1'
						});
					});
				};
				// info 里面需要一个tabIndex;
				//info.tabIndex = 1;
				const isVisit = this.canVisit(this.uid, info, 2);
				if (!isVisit) {
					return;
				}
				const redirectUrl = this.getRedirectUrl(info, 2);
				const callback = (score, info, redirectUrl)=>{
					this.scoreJudge(score, info, redirectUrl, viewFunc);
				};
				const score = await this.getUserScore();
				callback(score, info, redirectUrl);
			},
			getStoreAudioInfo(info, keys) {
				const audioInfo = {};
				const keysArr = keys || ['title', 'src', 'singer', 'coverImgUrl', 'thumbUrl', 'id'];
				keysArr.forEach((key)=>{
					audioInfo[key] = info[key];
				});
				return audioInfo;
			},
			// 扣除当前用户消耗的积分...
			async updateScore(nid, uid, callback) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params = {
					auth: auth,
					uid: this.uid,
					nid: nid,
					filterData: true,
				};
				const url = apiPrefix+'?mod=product&ac=jifen_insert';
				const resp = await http.request(url, params);
				console.log('url'+url+',params:'+JSON.stringify(params));
				console.log('udpateScore:'+JSON.stringify(resp));
				// 1 表示成功
				if (resp.status == 1) {
					callback();
				} else {
					uni.showModal({
						title:"扣除积分失败"
					});
				}
			},
			loadItemPic(src) {
				/*console.log('文章图片');
				let d = new Date;
				console.log(',img src:'+src+' time:'+d.getTime());*/
			},
			videoErrorCallback() {
				
			},
			async courseSearch(pageNo, isAppend) {
				const word = this.keyword;
				let cid = '';
				const index = this.activeTabIndex;
				if( index == 0 )  {
					cid = 1;
				} else if( index == 1) {
					cid = 2;
				} else if(index == 2) {
					cid = 3;
				}
				if (!word) {
					if (cid == 1) {
						this.articeList = this.getArticleList(1);
					} else if(cid == 2) {
						this.allAudioList = this.getAudioList(1);
					} else if(cid == 3) {
						this.videoList = this.getVideoList(1);
					}
					return;
				}
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				
				const params = {
					auth: auth,
					keyword: word,
					nowpage: pageNo,
					cid: cid, // 文章的栏目ID为1
					uid: this.uid,
					version: 'v2',
					filterData: true,
				};
				const url = apiPrefix+'?mod=product&ac=search';
				const resp = await http.request(url, params);
				if(resp.status == 1) {
					const res = resp.data;
					totalpage4 = resp.totalpage;
					const len = res.length;
					const map = this.getCourseMap(cid);
					const articleList = [];
					for(let m = 0;m<len;m++) {
						const newRow = this.keysTransform(res[m],map);
						articleList.push(newRow);
					}
					console.log('search courseList:'+JSON.stringify(articleList));
					if (cid == 1) {
						this.articeList = isAppend? this.articeList.concat(articleList): articleList;
					} else if(cid == 2) {
						this.allAudioList = !isAppend? articleList: this.allAudioList.concat(articleList);					const list = this.allAudioList;
						this.set_audiolist({
							data: list,
							status: false
						});
						console.log('hehe!');
					} else if(cid == 3) {
						this.videoList    = !isAppend? articleList: this.videoList.concat(articleList);
					}
				}
			},
			// map,原始字符串键到目标字符串键的映射关系
			keysTransform(row, map) {
				const keys = Object.keys(map);
				const newRow = {};
				keys.forEach((item)=>{
					const k = map[item];
					// sfgm 为1,表示已购买,isShowLock 为0，不加锁
					if (item == 'sfgm') {
						row[item] = row[item]? false: true;
					} 
					newRow[k] = row[item];
				});
				return newRow;
			},
			async getArticleView(info) {
				//info.tabIndex = 0;
				//info.isShowLock = 1;
				//uid, info, type, score, callback
				//this.setArticleLogList(info);
				console.log('this.uid:'+this.uid);
				const isVisit = this.canVisit(this.uid, info,  0); 
				if (!isVisit) {
					return;
				}
				console.log('hehe');
				const score = await this.getUserScore();
				const callback = (score, info)=>{
					const redirectUrl = this.getRedirectUrl(info, 0);
					const succCallback = (info) => {
						const uid = this.uid;
						if (info.isShowLock) {
							this.setArticleLogList(info);
						}
						this.updateScore(info.id, uid, ()=> {
							//info.isShowLock = false;
							// 获取文章详情信息
							//this.score-=info.score_num;
							const id = info.id;
							const cid = info.cid;
							const tabTitle = info.tabTitle;
							uni.navigateTo({
								url:'/pages/course/article_detail?id='+id+'&cid='+cid+"&title="+tabTitle
							});
						});
					};
					this.scoreJudge(score, info, redirectUrl, succCallback);
				};
				callback(score, info);
			},
			switchCourseTab(e) {
				console.log('e', e);
				console.log('switchCourseTab...');
				this.activeTabIndex = e.detail.current;
				const index = e.detail.current;
				nowpage = 1;
				// 这里如果搜索框有值,再进行搜索一下
				if (this.keyword) {
					this.courseSearch(1);
				} else {
					// 如果没有搜索值
					if (index == 0) {
						this.articeList = this.getArticleList(1);
					} else if(index == 1) {
						this.allAudioList = this.getAudioList(1);
					} else if(index == 2) {
						this.videoList = this.getVideoList(1);
					}
					return;
				}
			},
			async getUserScore() {
				const suffix = '?mod=product&ac=jifen';
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const url = apiPrefix+suffix;
				const auth      = data.auth;
				const params = {
					uid: this.uid,
					auth: auth,
					version: 'v2',
					filterData: true
				};
				const respData = await http.request(url, params);
				if (respData.status == 1) {
					return respData.jifen;
				} else {
					return 0;
				}
			},
			getCourseMap(cid) {
				const map = {
					1: {
						'nid': 'id',
						'cid': 'cid',
						'jifen': 'score_num',
						'dzcs': 'wzsccs',
						'title': 'title',
						'sfdz': 'sfsc',
						'thumbUrl': 'thumbUrl',
						'readNum': 'readNum',
						'description': 'description',
						'sfgm': 'isShowLock',
					},
					2: {
						'nid': 'id',
						'cid': 'cid',
						'jifen': 'score_num',
						'dzcs': 'wzsccs',
						'title': 'title',
						'sfdz': 'sfsc',
						'thumbUrl': 'thumbUrl',
						'readNum': 'readNum',
						'downurl': 'src', 
						'thumbUrl_big': 'coverImgUrl',
						'sfgm': 'isShowLock',
					},
					3: {
						'nid': 'id',
						'cid': 'cid',
						'jifen': 'score_num',
						'dzcs': 'wzsccs',
						'title': 'title',
						'sfdz': 'sfsc',
						'thumbUrl': 'thumbUrl',
						'readNum': 'readNum',
						'downurl': 'videoUrl', 
						'thumbUrl_big': 'coverImgUrl',
						'sfgm': 'isShowLock',
					}
				};
				return map[cid];
			},
			inputFocus() {
				
			},
			lower() {
				// 这里下拉加载数据...
				const index = this.activeTabIndex;
				if (this.keyword) {
					totalpage = totalpage4;
					if (nowpage>=totalpage) {
						return;
					}
					setTimeout(()=>{
						nowpage++;
						this.courseSearch(nowpage, true);
					}, 500);
					return;
				}
				// 这里下拉加载数据
				if (index == 0) {
					totalpage = totalpage1;
					if (nowpage>=totalpage) {
						return;
					}
					setTimeout(()=>{
						nowpage++;
						this.getArticleList(nowpage, true);
					}, 500);
				} else if(index == 1) {
					totalpage = totalpage2;
					if (nowpage>=totalpage) {
						return;
					}
					setTimeout(()=> {
						nowpage++;
						this.getAudioList(nowpage, true);
					}, 500);
				} else  if(index == 2) {
					totalpage = totalpage3;
					if (nowpage>=totalpage) {
						return;
					}
					setTimeout(()=>{
						nowpage++;
						this.getVideoList(nowpage, true);
					}, 500);
				}
			},
			upper() {
				// 上拉加载下一页
				uni.showNavigationBarLoading();
				const index = this.activeTabIndex;
				if (index == 0) {
					this.getArticleList(1, false, true);
				} else if(index == 1) {
					this.getAudioList(1, false, true);
				} else if(index == 2) {
					this.getVideoList(1, false, true);
				}
			},
			async getCourseCids() {
				// 获取教程栏目
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params = {};
				params.auth     = auth;
				params.filterData = true;
				params.version = 'v2';
				const url = apiPrefix+'?mod=product&ac=get_all_cid';
				const resp = await http.request(url, params);
				if (resp.status == 1) {
					const d = resp.data;
					const len = d.length;
					const tabArr = [];
					for(let j = 0;j<len;j++) {
						const tab = {
							navId: d[j].firstNav.navId,
							name: d[j].firstNav.title,
						};
						tabArr.push(tab);
					}
					this.tabArr = tabArr;
				} 
				console.log('url', url, 'params:', params);
			},
			async getArticleList(pageNo, isAppend, stopRefresh) {
				// 获取教程栏目
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params = {
					auth: auth,
					nowpage: pageNo,
					cid: 1, // 文章的栏目ID为1
					uid: this.uid,
					version: 'v2',
					filterData: true,
				};
				//params.auth     = auth;
				//params.filterData = true;
				const url = apiPrefix+'?mod=product&ac=list';
				const resp = await http.request(url, params);
				if (stopRefresh) {
					uni.hideNavigationBarLoading();
				}
				if(resp.status == 1) {
					console.log('resp.data.article:'+JSON.stringify(resp));
					const res = resp.data;
					const len = res.length;
					const map = {
						'nid': 'id',
						'cid': 'cid',
						'jifen': 'score_num',
						'dzcs': 'wzsccs',
						'title': 'title',
						'sfdz': 'sfsc',
						'thumbUrl': 'thumbUrl',
						'readNum': 'readNum',
						'description': 'description',
						'sfgm': 'isShowLock',
					};
					const articleList = [];
					for(let m = 0;m<len;m++) {
						const newRow = this.keysTransform(res[m],map);
						articleList.push(newRow);
					}
					console.log('articleList:'+JSON.stringify(articleList));
					if (!isAppend) {
						this.articeList = articleList;
						totalpage1 = resp.totalpage;
					} else {
						this.articeList = this.articeList.concat(articleList);
						totalpage1 = resp.totalpage;
					}
				}
			},
			async getVideoList(pageNo, isAppend, stopRefresh) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params = {
					auth: auth,
					nowpage: pageNo,
					cid: 3, // 文章的栏目ID为1
					uid: this.uid,
					version: 'v2',
					filterData: true,
				};
				const url = apiPrefix+'?mod=product&ac=list';
				const resp = await http.request(url, params);
				if (stopRefresh) {
					// 隐藏loading
					uni.hideNavigationBarLoading();
				}
				if(resp.status == 1) {
					console.log('videoList:'+JSON.stringify(resp));
					const res = resp.data;
					totalpage3 = resp.totalpage;
					const len = res.length;
					const map = {
						'nid': 'id',
						'cid': 'cid',
						'jifen': 'score_num',
						'dzcs': 'wzsccs',
						'title': 'title',
						'sfdz': 'sfsc',
						'thumbUrl': 'thumbUrl',
						'readNum': 'readNum',
						'downurl': 'videoUrl', 
						'thumbUrl_big': 'coverImgUrl',
						'sfgm': 'isShowLock',
					};
					const videoList = [];
					for(let m = 0;m<len;m++) {
						const newRow = this.keysTransform(res[m],map);
						videoList.push(newRow);
					}
					if (!isAppend) {
						this.videoList = videoList;
					} else {
						this.videoList = this.videoList.concat(videoList);
					}
				}
			},
			// 获取音频列表...
			async getAudioList(pageNo, isAppend, stopRefresh) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params = {
					auth: auth,
					nowpage: pageNo,
					cid: 2, // 文章的栏目ID为1
					uid: this.uid,
					version: 'v2',
					filterData: true,
				};
				const url = apiPrefix+'?mod=product&ac=list';
				const resp = await http.request(url, params);
				if (stopRefresh) {
					// 隐藏loading
					uni.hideNavigationBarLoading();
				}
				if(resp.status == 1) {
					const res = resp.data;
					totalpage2 = resp.totalpage;
					const len = res.length;
					const map = {
						'nid': 'id',
						'cid': 'cid',
						'jifen': 'score_num',
						'dzcs': 'wzsccs',
						'title': 'title',
						'sfdz': 'sfsc',
						'thumbUrl': 'thumbUrl',
						'readNum': 'readNum',
						'downurl': 'src', 
						'thumbUrl_big': 'coverImgUrl',
						'sfgm': 'isShowLock'
					};
					const audioList = [];
					for(let m = 0;m<len;m++) {
						const newRow = this.keysTransform(res[m],map);
						audioList.push(newRow);
					}
					console.log('audioList:'+JSON.stringify(audioList));
					if (!isAppend) {
						const test = {
							id: 555,
							cid: 3,
							score_num: 1,
							wzsccs: 21,
							title: '呵呵',
							sfsc: 1,
							thumbUrl: '',
							readNum:  '35',
							src:      '../../static/video/1.mp3',
							coverImgUrl: '',
							isShowLock: true
						};
						this.allAudioList = audioList;
						this.set_audiolist({
							data: audioList,
							status: false
						});
					} else {
						this.allAudioList = this.allAudioList.concat(audioList);
						this.set_audiolist({
							data: this.allAudioList,
							status: false
						});
					}
				}
			},
			scrollTopFunc() {
				
			},
			switchTab(index) {
				console.log('switchTab...');
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
::-webkit-scrollbar {
  display:none;
  width:0;
  height:0;
  color:transparent;
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
	margin-top:35rpx;
	margin-bottom: 31rpx;
	//border-bottom: 1px solid #F2F2F2;
	#search-box {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		#slot-title {
			display: flex;
			margin-left:32rpx;
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
			/*padding-left: 20rpx;*/
			align-items: center;
			background: #F2F2F2;
			border-radius: 30rpx;
		}
	}
}
/deep/ .u-tabs {
	width: 100%;
	display: flex;
	justify-content: center;
}
#tab-view {
	border-bottom: 1px solid #F2F2F2;
	width: 100%;
	display: flex;
	z-index: 99999999999;
	position: fixed;
	justify-content: center;
}
.speed-list >view {
	color: #FFFFFF;
	text-align: center;
	font-size: 16px;
	height: 46px;
	line-height: 46px;
}

.myVideo {

	width: 686rpx;
	margin-left:32rpx;
	margin-right: 32rpx;
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
