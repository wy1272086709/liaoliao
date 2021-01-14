<template>
	<view>
		<u-navbar :isBack="true" title="" :borderBottom="true" :isFixed="true"  :zIndex="10000000000000001" :height="platform==1?78:74">
			<template v-slot:default="">
				<view class="slot-wrap">
					<u-tabs   bg-color="#FFFFFF" :name="'title'" :bold="bold" :active-color="activeColor" :list="tabArr"
					@change="change" :bar-width="115" :current="activeTabIndex" :is-scroll="isScroll"></u-tabs>
				</view>
			</template>
		</u-navbar>
		
		
		<swiper :current="activeTabIndex" :scroll-with-animation="true" 	@change="switchCourseTab" :style="'width:100%;height:'+scrollHeight+'px;'">
			<swiper-item :class="[ 'swiper-item-css', index==0?'swiper-item-top':'' ]" v-for="(item,index) in tabArr" :key="item.navId">
				<scroll-view :style="'height:'+scrollHeight+'px;'"  scroll-y="true"	 
				@scrolltolower="lower">
				
					<view v-if="activeTabIndex == 2" class="log-view">
						<course-log v-for="(item,key) in articleLogList"  :courseType="1" :title="item.title" 
						@study="studyCourse" :cid="item.cid" :id="item.nid" :key="item.nid" :status="2"></course-log>
					</view>						
					<view v-else-if="activeTabIndex == 1"  class="log-view">
						<course-log @study="studyCourse" :key="item.nid" v-for="(item,key) in audioLogList" :courseType="2" :title="item.title" 
						 :cid="item.cid" :id="item.nid" :src="item.downurl"  :current_value="item.jdsc" :duration_value="item.zsc"></course-log>
					</view>
					<view v-else  class="log-view">
						<course-log  @study="studyCourse" :key="item.nid" :courseType="3" :src="item.downurl" v-for="(item,key) in videoPayList" :title="item.title" 
						:cid="item.cid" :id="item.nid" :current_value="item.jdsc" :duration_value="item.zsc"></course-log>
					</view>					
				</scroll-view>
			</swiper-item>
		</swiper>	  		
	</view>
</template>

<script>
	import courseLog from '../../common/course_log.vue';
	import { mapGetters,mapMutations } from 'vuex';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let totalpage = 1;
	let nowpage = 1;
	let totalpage1 = 1;
	let totalpage2 = 1;
	let totalpage3 = 1;
	let isLoad = 0;
	export default {
		data() {
			return {
				tabArr: [
					{
						title: '视频课程',
						id: 1,
					},
					{
						title: '音频课程',
						id: 2,
					},
					{
						title: '文章课程',
						id: 3
					}
				],
				activeColor: '#A88FEF',
				activeTabIndex: 0,
				isScroll: true,
				platform: '',
				bold: true,
				scrollHeight: '',
				audioLogList: [],
				articleLogList: [],
				videoPayList: []
			};
		},
		components: {
			courseLog
		},
		computed:{
			...mapGetters([ 'playinfoList', 'videoLogList']),
			uid: function() {
				let uid = util.cache('app_userid', null);
				console.log('uid', uid);
				return uid ? uid: 0;
			},
		},
		async onShow() {
			const articleLogList = await this.getCourseLogList(1, 1, true);
			this.articleLogList = articleLogList;
			const videoList = await this.getCourseLogList(3, 1, true);
			this.videoPayList = videoList;
			const audioLogList = await this.getCourseLogList(2, 1, true);
			this.audioLogList = audioLogList;
			//this.audioLogList = list;
		},
		
		onBackPress(e) {
			console.log("监听返回按钮事件", e);
			uni.switchTab({
				url: '/pages/user/user_index'
			});
			return true;
		},
		async onLoad() {
			const info = uni.getSystemInfoSync();
			const articleLogList = await this.getCourseLogList(1, 1, true);
			this.articleLogList = articleLogList;
			const videoList = await this.getCourseLogList(3, 1, true);
			this.videoPayList = videoList;
			const audioLogList = await this.getCourseLogList(2, 1, true);
			this.audioLogList = audioLogList;
			isLoad = 1;
			this.scrollHeight = info.windowHeight - info.statusBarHeight - (info.platform == 1?uni.upx2px(78):uni.upx2px(74));
		},
		methods:{
			...mapMutations( [ 'set_playinfo', 'setVideoInfo' ] ),
			change(index) {
				this.activeTabIndex = index;
				if(index == 0) {
					
				}
				nowpage = 1;
				// 这里刷新测试列表...
			},
			getVideoList() {
				const list = this.videoLogList;
				return Object.values(list);
			},
			studyCourse(attrs) {
				console.log('go here!...'+JSON.stringify(attrs));
				// 文章
				if (attrs.courseType == 1) {
					const url = '/pages/course/article_detail?id='+attrs.id+'&cid='+attrs.cid;
					uni.navigateTo({
						url: url
					});
				} else if(attrs.courseType == 2) {
					console.log('study audio...');
					let v = '';
					const percent = Math.round(attrs.current_value*100/attrs.duration_value, 2);
					if (percent==100) {
						v = 0;
					} else {
						v = attrs.current_value;
					}
					const info = {
						id:    attrs.id,
						title: attrs.title,
						src:   attrs.src,
						coverImgUrl: attrs.coverImgUrl,
						isContinue: 1,
						current_value: v,
						duration_value: attrs.duration_value,
						fromLog: 1,
					};
					console.log('info'+JSON.stringify(info));
					this.set_playinfo(info);
					const url = '/pages/course/audio_detail';
					uni.navigateTo({
						url: url
					});
				} else if(attrs.courseType == 3) {
					let v = '';
					const percent = Math.round(attrs.current_value*100/attrs.duration_value, 2);
					if (percent==100) {
						v = 0;
					} else {
						v = attrs.current_value;
					}
					const info = {
						id: attrs.id,
						title: attrs.title,
						videoUrl: attrs.src,
						coverImgUrl: attrs.coverImgUrl,
						current_time: v,
						fromLog: 1,
					};
					console.log('attrs:'+JSON.stringify(info));
					this.setVideoInfo(info);
					const url = '/pages/course/video_detail';
					uni.navigateTo({
						url: url+'?title='+attrs.title
					});
				}
			},
			switchCourseTab(e) {
				this.activeTabIndex = e.detail.current;
				nowpage = 1;
				/*if (window.hasOwnProperty('nowpage')) {
					console.log('bind nowpage...');
				}*/
			},
			lower() {
				// 这里下拉加载数据...
				const index = this.activeTabIndex;
				const _self = this;
				if (index == 0) {
					totalpage = totalpage1;
					if (nowpage>=totalpage) {
						return;
					}
					const callback = async ()=>{
						nowpage++;
						const list = await _self.getCourseLogList(3, nowpage, true);
						_self.videoPayList = _self.videoPayList.concat(list);
					};
					setTimeout(callback, 500);
				} else if(index == 1) {
					totalpage = totalpage2;
					if (nowpage>=totalpage) {
						return;
					}
					const callback = async ()=> {
						nowpage++;
						const list = await _self.getCourseLogList(2, nowpage, true);
						_self.audioLogList = _self.audioLogList.concat(list);
					};
					setTimeout(callback, 500);
				} else  if(index == 2) {
					totalpage = totalpage3;
					if (nowpage>=totalpage) {
						return;
					}
					const callback = async ()=>{
						nowpage++;
						const list = await _self.getCourseLogList(nowpage, true);
						_self.articleLogList = _self.articleLogList.concat(list);
					};
					setTimeout(callback, 500);
				}
			},
			async getCourseLogList(cid, nowpage, isAppend) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params = {
					auth: auth,
					uid: this.uid,
					cid: cid,
					nowpage: nowpage,
					filterData: true,
					version: 'v2'
				};
				const url = apiPrefix+'?mod=product&ac=my_list';
				const res = await http.request(url, params);
				console.log('res:'+JSON.stringify(res));
				if(res.status == 1) {
					const d = res.data;
					totalpage1 = res.totalpage;
					return d;
				}
				return [];
			},
			
		},
	}
</script>

<style lang="scss">
.log-view {
	margin-top:16px;
}
</style>
