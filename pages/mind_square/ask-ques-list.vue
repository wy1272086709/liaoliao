<template>
	<view id="root-view">
		<scroll-view :scroll-y="true"  :show-scrollbar="false" :style="'height:'+contentHeight+'px;z-inex:1001;'" @scrolltolower="lower">
			<view id="mind-ask-view">
				<view class="mind-title">
					<view id="mind-title-mzshuo">
						<text>妹子说:</text>
					</view>
					<text id="mind-title-firstline">{{ask.title}}</text>
				</view>
				<view class="mind-content">
					<text>{{ask.description}}</text>
				</view>
				<view class="mind-interact">
					<view class="mind-interact-left">
						<view class="mind-nickName">{{ask.fbr}}</view>
						<view class="mind-pubdate">{{ask.pubdate}}</view>
					</view>
					<view class="mind-interact-right">
						<view class="praise-view" @tap="collectQuestion()">
							<!--
							<image src="../../static/img/mind_square/love.png" style="width: 28rpx;height:24rpx;margin-right:15.01rpx;"></image>
							-->
							<u-icon name="heart" size="32" :color="isCollect==0?'#A6A6A6':'#FF3300'" style="margin-right:15.01rpx;"></u-icon>
							<text>{{ask.fbsccs}}</text>
						</view>
						<view class="reply-view" @tap="gotoReply">
							<image src="../../static/img/mind_square/message.png" style="width: 24rpx;height:24rpx;margin-right:15.01rpx;"></image>
							<text>{{ask.hfsccs}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view id="answer-view">
				<view id="anser-title">精彩回答</view>
					<view id="answer-list-box">
						<view v-for="(answer,index) in answerList" :key="answer.hid" class="answer-item">
							<view class="left-icon">
								<image :src="answer.litpic" class="left-avatar"></image>
							</view>
							<view class="right-answer-view">
								<view class="answer-first-line">
									<view class="first-line-before">
										<view class="first-line-nickName">
											<text>{{answer.hfr}}</text>
										</view>
										<view>
											<text>{{answer.pubdate}}</text>
										</view>
									</view>
									
									<view class="first-line-after" @tap="collectAnswer(index)">
										<!--
										<image src="../../static/img/mind_square/love.png" style="width: 28rpx;height:24rpx;margin-right:15.01rpx;"></image>
										-->
										<u-icon name="heart" size="32" :color="answer.isCollect?'#FF3300':'#A6A6A6'" style="margin-right:15.01rpx;"></u-icon>
										<text>{{answer.hfsccs}}</text>
									</view>
								</view>
								<view class="answer-second-line">
									<text>{{answer.content}}</text>
								</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- var(--window-bottom) -->
		<view id="bottom-view" :style="{bottom:bottom+'px'}">
			<!-- 回复 -->
			<view id="left-reply-icon">
				<image src="../../static/img/mind_square/reply.png" class="reply-css"></image>
			</view>
			<view id="replay-text-view">
				<textarea  @focus="areaFocus" @blur="areaBlur" :adjustPosition="false"  class="uni-textarea" :focus="isFocus" auto-height="true" maxlength="100" v-model.trim="content" placeholder="快来帮帮这位兄弟吧~~"  placeholder-class="replay-placeholder" />
			</view>
			<view id="reply-btn-view" @tap="reply">
				<view id="publish-btn-view">
					<label>发布</label>
				</view>
			</view>
		</view>
	</view>
</template>

<script >
	import uIcon from '../../uview-ui/components/u-icon/u-icon.vue'
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let eMap = {};
	let nid = '';
	let interval = null;
	let nowpage = 1;
	let totalpage = 1;
	let pageNo  = 1;
	export default {
		data() {
			return {
				isAble: true,
				isFocus: false,
				answerList: [
					{
						// 头像,默认头像
						litpic: 'https://thirdwx.qlogo.cn/mmopen/vi_32/E9fiagcYNaOiatcFStyL8uVApmNw4QfLlmRSiaibxTSzw6HucD7Kn975QzBh9ABu4fLIov1peUYWEianuFicjTvtqxbA/132',
						hfr: '汪毓',
						pubdate: '10小时前',
						hfsccs: '2541',
						content: '首先女生肯定是需要人安慰,需要人安慰,需要人安慰,需要人安慰',
						hid: 1,
						hfsc: 0,
						isCollect:0,
					}
				],
				ask: {
					title: '最近心情不是很好',
					description: '女生突然跟我说最近心情不好,我要怎么安慰她',
					fbr: '小明',
					pubdate: '10小时前',
					fbsccs: '2641',
					hfsccs: '654',
					sfsc: 0
				},
				isCollect : false,
				content: '',
				contentHeight: '',
				replyTop: '',
				//isShowRepley: true,
				bottom: ''
			}
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
		},
		components:{
			uIcon
		},
		onLoad(option) {
			nid = option.nid;
			this.init(option.nid);
			this.bottom = 0;
		},
		methods: {
			gotoReply(e) {
				// 文本框获得焦点
				if(!this.uid) {
					// 跳转到登录页面
					uni.showToast({
						icon:'none',
						title:'请先登录',
						complete() {
							uni.navigateTo({
								url:'/pages/user/login_v2'
							});
						}
					});
					return;
				}
				// 显示发送消息的文本框
				//this.isShowRepley = !this.isShowRepley;
				console.log('e', e);
				/*if(this.isShowRepley) {
					const d = e.detail;
					//this.replyTop = d.y + 91;
					this.isFocus = true;
				}*/
			},
			areaFocus(e) {
				console.log('areaFocus', e);
				const h = e.detail.height;
				console.log('h', h);
				const info = uni.getSystemInfoSync();
				console.log('info', info);
				const isIPhoneX = getApp().globalData.isIphoneX;
				console.log('isPhoneX', isIPhoneX);
				if(isIPhoneX) {
					this.bottom = h - uni.upx2px(68);
				} else {
					this.bottom = h;
				}
			},
			areaBlur(e) {
				this.bottom = 0;
			},
			init(nid) {
				const systemInfo = uni.getSystemInfoSync();
				this.contentHeight = systemInfo.windowHeight - uni.upx2px(80);
				this.getQuestionReplyList(nid, pageNo);
				this.getQuestionDetail(nid);
			},
			async getQuestionDetail(nid) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					nid:nid
				};
				params.auth = auth;
				// 获取问题详情
				const url = apiPrefix + "?mod=ndgc&ac=read";
				const resp = await http.request(url, params);
				const infoStr = util.cache('mind_question_info', null);
				console.log('infoStr', infoStr);
				const info    = infoStr ? JSON.parse(infoStr): {};
				this.ask = {...info, ...resp};
				console.log('this.ask', this.ask);
			},
			async getQuestionReplyList(nid,pageNo,isApppend) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					nid:nid,
					filterData: true
				};
				params.auth = auth;
				params.nowpage = pageNo;
				const url  = apiPrefix + "?mod=ndgc&ac=hf_list";
				const resp = await http.request(url, params);
				if(isApppend) {
					this.answerList = this.answerList.concat(resp.data);
				} else {
					this.answerList = resp.data;
					totalpage = resp.totalpage;
				}
			},
			async publicReply() {
				if(!this.content) {
					uni.showToast({
						title:"请输入内容后再进行评论",
						duration:1000,
						icon:'none'
					});
					return;
				}
				if(this.content.length>500) {
					uni.showToast({
						title:"回复内容长度不超过500个字",
						duration:1000,
						icon:'none'
					});
					return;
				}
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					nid:nid,
					uid: this.uid,
					content:this.content,
					filterData: true
				};
				params.auth = auth;
				const url  = apiPrefix + "?mod=ndgc&ac=hf_insert";
				const resp = await http.request(url, params);
				if(resp.status == 1) {
					this.init(nid);
					this.ask.hfsccs++;
				}
				this.content = '';
				//this.isShowRepley = false;
				console.log('resp', resp);
			},
			async collectQuestion() {
				// 只保留最后两个元素
				this.delMap();
				const t1 = parseInt(new Date().getTime()/1000);
				// 不允许连续点击两次或者更多次...
				if(eMap[t1]) {
					return;
				}
				if(!this.uid) {
					uni.showToast({
						icon:'none',
						title:'请先登录',
						complete() {
							uni.navigateTo({
								url:'/pages/user/login_v2'
							});
						}
					});
					return;
				}
				// this.color = '#FF3300';
				// 这里需要将问题ID,当前用户,收藏,还是取消收藏,传递给后台
				// 表示已经点赞过...
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					nid:nid,
					uid: this.uid,
					type: this.ask.sfsc,
					auth: auth,
					filterData: true
				};
				const route = '?mod=ndgc&ac=fb_sc';
				const url  = apiPrefix + route;
				const resp = await http.request(url, params);
				if(resp.status == 1) {
					if(this.ask.sfsc == 1) {
						this.isCollect = true;
					} else if(this.ask.sfsc == 0){
						this.isCollect = false;
					}
					this.ask.sfsc = 1 - this.ask.sfsc;
					this.ask.fbsccs = resp.fbsccs;
				}
				console.log('this.ask.sfsc', this.ask.sfsc);
				const t = parseInt(new Date().getTime()/1000);
				eMap[t] = 1;
			},
			reply() {
				if (!this.uid) {
					uni.showToast({
						icon:'none',
						title:'请先登录',
						complete() {
							uni.navigateTo({
								url:'/pages/user/login_v2'
							});
						}
					});
					return;
				}
				this.publicReply();
			},
			lower() {
				// 滑动到最下面时候触发
				let _self = this;
				console.log('page',nowpage, 'totalpage', totalpage);
				if(nowpage>=totalpage) {
					clearTimeout(interval);
					return;
				}
				interval = setTimeout(function() {
					nowpage++;
					console.log('page....',nowpage);
					_self.getQuestionReplyList(nid, nowpage, 1);
				}, 500);
			},
			publish() {
				if(!this.uid) {
					uni.showToast({
						icon:'none',
						title:'请先登录',
						complete() {
							uni.navigateTo({
								url:'/pages/user/login_v2'
							});
						}
					});
					return;
				}
				// 将回复信息发送到后台,同时更新回复数目
				if(this.content) {
					
				}
			},
			getColor(index) {
				let color = '';
				console.log('this.answerList', this.answerList);
				if (this.answerList[index].isCollect) {
					color = '#FF3300';
				} else { 
					color = '#A6A6A6';
				}
				return color;
			},
			delMap() {
				const keys = Object.keys(eMap);
				const n    = keys.length;
				// 只保留最后两个元素
				for( let m = 0;m<n-2;m++) {
					delete eMap[keys[m]];
				}
			},
			// 这里其实是收藏
			async collectAnswer(index) {
				// 只保留最后两个元素
				this.delMap();
				const t1 = parseInt(new Date().getTime()/1000);
				// 不允许连续点击两次或者更多次...
				if(eMap[t1]) {
					return;
				}
				if(!this.uid) {
					uni.showToast({
						icon:'none',
						title:'请先登录',
						complete() {
							uni.navigateTo({
								url:'/pages/user/login_v2'
							});
						}
					});
					return;
				}
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let type = this.answerList[index].hfsc;
				const typeStr = 1 -type;
				const params = {
					nid:nid,
					uid: this.uid,
					hid:this.answerList[index].hid,
					type: typeStr,
					auth: auth,
					filterData: true
				};
				const route = '?mod=ndgc&ac=hf_sc';
				const url  = apiPrefix + route;
				const resp = await http.request(url, params);
				if(resp.status == 1) {
					if(typeStr == 1) {
						this.answerList[index].isCollect = true;
					} else if(typeStr == 0){
						this.answerList[index].isCollect = false;
					}
					this.answerList[index].hfsc = 1 - this.answerList[index].hfsc;
					this.answerList[index].hfsccs = resp.hfsccs;
				}
				// this.color = '#FF3300';
				// 这里需要将问题ID,当前用户,收藏,还是取消收藏,传递给后台
				// 表示已经点赞过...
				
				const t = parseInt(new Date().getTime()/1000);
				eMap[t] = 1;
			},
		}
	}
</script>

<style lang="scss">
#root-view {
	
	#mind-ask-view {
		margin-top:39rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid  #F2F2F2;
		padding-bottom: 27rpx;
		
		.mind-title {
			display: block;
			margin-left:46rpx;
			font-size: 24px;
			font-weight: 400;
			color: #323232;
			font-family: "Microsoft YaHei";	
			#mind-title-mzshuo {
				height: 60rpx;
				display: block;
				width: 160rpx;
				/*justify-content: center;
				align-items: center;*/
				text-align: center;
				line-height: 60rpx;
				float: left;
				background: #F3F3F3;
				border-radius: 30rpx;
				margin-right: 24rpx;
				/*padding-left:29rpx;
				padding-right:27rpx;*/
				/*margin-right: 24rpx;*/
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #A88FEF;
			}
			#mind-title-firstline {
				
				width:450rpx;
				display: block;
				float: left;
				margin-top:0rpx;
				padding-top:0rpx;
				height: 60rpx;
				line-height: 60rpx;
				overflow: hidden;
				text-overflow:ellipsis; 
				white-space: nowrap;
				
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333232;
			}
		}
		
		.mind-content {
			display: block;
			margin-left:55rpx;
			margin-right:61rpx;
			margin-top:29rpx;
			margin-bottom: 27rpx;
			word-break: break-all;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
		}
		
		.mind-interact {
			display: flex;
			color:#CDCDCD;
			margin-left:55rpx;
			margin-right:55rpx;
			width:640rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9A9A9A;
			
			.mind-interact-left {
				width:70%;
				
				display: flex;
				.mind-nickName {
					display: flex;
					/*margin-right:50rpx;*/
					width:40%;
				}
				.mind-pubdate {
					display: flex;
					width:60%;
				}
			}
			.mind-interact-right {
				width:30%;
				.praise-view {
					margin-right:20rpx;
				}
				.reply-view {
					
				}
				display: flex;
				justify-content: flex-end;
			}
		}
	}

	#answer-view {
		display: flex;
		margin-left:55rpx;
		margin-right: 55rpx;
		flex-direction: column;
		#anser-title {
			font-weight: bolder;
			font-family: "Microsoft YaHei";
			font-size:24px;
			margin-top:70rpx;
			margin-bottom:50rpx;
		}
		#answer-list-box {
			.answer-item{
				display: flex;
				padding-bottom:30px;
				
				.left-icon {
					.left-avatar {
						width:76rpx;
						height: 76rpx;
						border-radius: 50%;
					}
					margin-right:25rpx;
				}
				.right-answer-view {
					display: flex;
					flex-direction: column;
					width: 535rpx;
					.answer-first-line {
						display: flex;
						height: 27px;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						justify-content: space-between;
						.first-line-before {
							display: flex;
							align-items: center;
							color:#A9A9A9;
							width:80%;
							.first-line-nickName {
								color: #A88FEF;
								width:33%;
								display: flex;
							}
							view {
								width:67%;
								display: flex;
								font-size:28rpx;
							}
						}
						.first-line-after {
							height: 27px;
							display: flex;
							justify-content: flex-end;
							width:20%;
							align-items: center;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #9A9A9A;
						}
					}
					.answer-second-line  {
						display: flex;
						margin-top:29rpx;
						flex-wrap: wrap;
						word-break: break-all;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
					}
				}
			}
		}
	}	
}

#bottom-view {
	display: flex;
	position: fixed;
	z-index: 10001;
	margin:0rpx 0rpx;
	padding:20rpx 46rpx;

	/*bottom: 30rpx;*/
	background: #F2F2F2;
	/*height: 120rpx;*/
	#left-reply-icon {
		display: flex;
		align-items: flex-end;
		.reply-css {
			width: 60rpx;
			height: 60rpx;
		}
	}
	#replay-text-view {
		display: flex;
		width: 420rpx;
		/*height: 120rpx;
		max-height: 120rpx;*/
		padding-left:20rpx;
		align-items: center;
		margin-left: 27rpx;
		margin-right: 34rpx;
		/*height: 120rpx;*/
		background-color: #FFFFFF;
		border-radius: 30rpx;
		textarea {
			height: auto;
			word-wrap : break-word;
		}
	}
	#reply-btn-view {
		display: flex;
		align-items: flex-end;
		#publish-btn-view {
			display: flex;
			width:120rpx;
			height: 60rpx;
			background-color: #C3AEFF;
			color: #FFFFFF;
			border-radius: 30rpx;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
		}
	}
}
	

.replay-placeholder {
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #CCCCCC;
}
</style>
