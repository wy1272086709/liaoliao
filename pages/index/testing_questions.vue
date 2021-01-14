<template>
	<!--  -->
	<view id="root-view">
		<!--- 题目 -->
		<!-- 进度条 -->
		
			<view id="ques-progress">
				<view id="ques-title">
					<text class="cur-ques-index">{{ askIndex }}</text> / <text>{{ subjectList.length }}</text>
				</view>
				<view id="ques-line-progress">
					<u-line-progress :percent="percent" :show-percent="true"></u-line-progress>
				</view>
			</view>
		
			<view id="ques-option">
					<swiper :current="subjectIndex" :style="{height:swiperHeight+'px'}"  @change="swiperChange" >
						<swiper-item  @touchmove.stop="stopTouchMove" class="swiper" style="height:100%" v-for="(subject,index) in subjectList" :key="subject.question_title">
							<scroll-view :style="{height:swiperHeight+'px'}" show-scrollbar="true" scroll-y="true">
								<view>
									<view class="cu-bar bg-white solid-bottom">
										<view class="action text-black">
											<text class="cuIcon-title text-red">{{subject.question_title}}</text>
										</view>
									</view>
									<view>
										<!-- v-if="platform == 1" -->
										<view class="block">
											<view :hover-stay-time="100" @tap.stop="radioboxChange" :ref="'view'+index" :data-index="index" class="cu-form-group" :style="subject.userAnswer == index?'background-color:#A9A9A9':''" v-for="(option,index) in subject.question_select" :key="index" >
												<!--
												<radio color="#09BB07" :value="index" :checked="subject.userAnswer == index?true:false"></radio>
												-->
												<view class="title text-black" @tap.stop="radioboxChange" :data-index="index">
													<text @tap.stop="radioboxChange" :data-index="index">{{option}}</text>
												</view>
											</view>
										</view>
										<!--
										<view class="block" @touchstart.stop="radioboxChange" v-else-if="platform == 2">
											<view :hover-stay-time="100" :ref="'view'+index" :data-index="index" class="cu-form-group" :style="subject.userAnswer == index?'background-color:#A9A9A9':''" v-for="(option,index) in subject.question_select" :key="index" >
												<!--
												<radio color="#09BB07" :value="index" :checked="subject.userAnswer == index?true:false"></radio>
												-->
												<!--
												<view class="title text-black">{{option}}</view>
											</view>
										</view>
										-->
									</view>
								</view>
							</scroll-view>
						</swiper-item>
					</swiper>
			</view>
		
		<!--
		<view id="view-testing" v-if="showRes" @tap="viewResult">
			<button>查看我的测评报告</button>
		</view>
		-->
	</view>
</template>

<script>
	import uLineProgress from '../../uview-ui/components/u-line-progress/u-line-progress.vue';
	import util from '../../common/util.js';
	import http from '../../common/http.js';
	let nid;
	let title;
	export default {
		data() {
			return {
				swiperHeight: '',
				subjectList: [
					/*{
						"title":"",
						"question_select":{
							
						},
						"userAnswer": "",
					}*/
				],
				subjectIndex: 0,
				contentHeight: '',
				platform: ''
			}
		},
		components: {
			uLineProgress
		},
		computed:{
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			},
			askIndex: function() {
				return this.subjectIndex < this.subjectList.length? this.subjectIndex+1:this.subjectIndex;
			},
			percent: function() {
				const len = this.subjectList.length;
				return Math.round(this.subjectIndex/len*100);
			}
		},
		onShow() {
			this.gotoResultPage();
		},
		onLoad(option) {
			const _self = this;
			// 加载的时候,将用户勾选的变量清除掉
			const list = this.subjectList;
			for(let m = 0;m<list.length;m++) {
				this.subjectList[m].userAnswer = '';
			}
			nid = option.nid;
			if(option.title) {
				
				uni.setNavigationBarTitle({
					title:option.title
				});
				console.log('option.title'+option.title);
				util.cache('testing_title', option.title);
			}
			const p = getApp().globalData.platform;
			this.platform = p;
			this.getQuestionInfo(option.nid);
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {           
					_self.contentHeight = res.windowHeight;
					//console.log('_self.contentHeight', _self.contentHeight);
					_self.swiperHeight  = _self.contentHeight - 100;
				},
			});
		},
		methods: {
			stopTouchMove() {
				return true;
			},
			async getQuestionInfo(nid) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					auth: auth,
					uid: this.uid,
					nid: nid,
					filterData: true
				};
				const route = '?mod=cyc&ac=read';
				const url  = apiPrefix + route;
				const res  = await http.request(url, params);
				if(res.status == 1) {
					this.subjectList = res.data;
				}
				console.log('ques res:', res);
			},
			swiperChange(e) {
				let index = e.target.current;
				if (index != undefined) {
					this.subjectIndex = index;			
				}					
			},
			radioboxChange(e) {
				console.log('e.target:');
				console.log(e.target);
				//console.log(index);
				//console.log('clicked'+index);
				/*let items = this.subjectList[this.subjectIndex].optionList;
				let values = e.detail.value;
				console.log('values', values);*/
				const values = e.target.dataset.index;
				//const values = index;
				console.log('values', values);
				if(!values) {
					return;
				}
				this.subjectList[this.subjectIndex].userAnswer = values;
				if(this.subjectIndex < this.subjectList.length - 1){
					this.subjectIndex += 1;	
				} else {
					this.subjectIndex = this.subjectList.length;
				}
				console.log('values', values);
				console.log('this.subjectIndex', this.subjectIndex);
				
				this.gotoResultPage();
			},
			gotoResultPage() {
				const len = this.subjectList.length;
				if(this.percent == 100 && this.subjectIndex == len) {
					const list = this.subjectList;
					const len  = list.length;
					let userAnswerStr = '';
					for(let m = 0;m<len;m++) {
						userAnswerStr+=list[m].userAnswer;
					}
					console.log('userAnswerStr', userAnswerStr);
					// 后面覆盖题目覆盖这个值
					util.cache('testing_select_answer', userAnswerStr);
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pages/index/testing_result?nid='+nid
						});
					}, 500);
				}
			},
			viewResult() {
				uni.navigateTo({
					url:'/pages/index/testing_result'
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../../colorui/animation.css";
	page {
		background-color: #F2F2F2;
		
	}
	
	::-webkit-scrollbar { 
		display: flex;
		width: 1rpx!important; 
		height: 10rpx!important;
		background-color: #F2F2F2;
	}
	
	#root-view {		
		margin-left:32rpx;
		margin-right: 32rpx;
		box-sizing: border-box;
		width:686rpx;
		flex-direction: row;
		justify-content: center;
		/*display: flex;*/
		#ques-progress {
			display: flex;
			flex-direction: column;
			margin-bottom:20px;
			#ques-title {
				display: flex;
				justify-content: flex-end;
				.cur-ques-index {
					margin-top:-6px;
					color:red;
					font-size:24px;
				}
			}
		}
		#ques-option {
			background-color: #FFFFFF;
			border-radius: 20rpx;
		}
		#view-testing {
			background-color: #FFFFFF;
			display: flex;
			position: absolute;
			bottom:20px;
			width:100%;
			button {
				width:100%;
				background-color: red;
				color: #FFFFFF;
			}
		}
	}

	.swiper,.swiper-box {
		height: 500px;
	}
	.cu-form-group {
		display: flex;
		cursor:pointer;
		justify-content: flex-start;
		align-items: center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		margin-bottom:20px;
		background: #F3F3F3;
		min-height: 50px;
	}

	.cu-form-group .title {
		padding-left: 30upx;
		padding-right: 30upx;
	}

	.cu-form-group {
		border-top: none;
	}

	.cu-bar {
		margin-left:34rpx;
		margin-right:34rpx;
		margin-top:51rpx;
		margin-bottom: 55rpx;
	}
	
	.cu-bar-title {
		min-height: 50upx;
	}
	
	.block {
		display: flex;
		margin-left:35rpx;
		margin-right:35rpx;
		flex-direction: column;
		min-height: 500px;
	}
	.cuIcon-title {
		
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #343434;
		font-weight: bolder;
	}
	.title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.cu-list.menu>.cu-item-error{justify-content: flex-start;}
</style>
