<template>
	<view id="root-view">
		<!-- :scroll-y="true"  :show-scrollbar="false"  @scrolltolower="lower" -->
		<scroll-view :scroll-y="true"  :show-scrollbar="false" @scrolltoupper="upper"  @scrolltolower="lower"  :style="'height:'+contentHeight+'px;z-inex:1001;'">
			<view id="mind-ask-view">
				<view class="mind-title">
					<!--
					<view id="mind-title-mzshuo">
						<text>妹子说:</text>
					</view>
					-->
					
					<view class="mind-title-left">
						<view>
							<image :src="ask.tx?ask.tx:'../../static/img/user/people.png'" class="avatar-class"></image>
						</view>
						<view class="mind-nickName">{{ask.fbr}}</view>
					</view>
					<view  class="mind-title-right">
						<view class="mind-pubdate">{{ask.pubdate}}</view>
					</view>
					<!-- :class="ask.title.length<15 ? 'one-line-css': 'more-line-css'" -->
					<!--
					<u-collapse :headStyle="{lineHeight:60+'rpx', padding:'0px 0px'}" :bodyStyle="{paddingTop:'10px'}">
						<u-collapse-item :open="false" :title="ask.title" :key="ask.title" >
							<text>{{ ask.title }}</text>
						</u-collapse-item>
					</u-collapse>
					-->
					<!--
					<view id="right-view">
						<view id="mind-title-firstline" :class="{'one-line-css':isOne,'more-line-css':!isOne}" :style="isOne?'line-height: 60rpx;':'line-height:1;'">
							<text>{{ ask.title }}</text>
						</view>
						-->
						<!--
						<view id="mind-title-icon" @tap="showTitle">
							<u-icon :name="isOne?'arrow-up':'arrow-down'" size="32" color="#A6A6A6"></u-icon>
						</view>
						
					</view>
					-->
				</view>
				<view class="mind-content">
					<!--
					<u-collapse :headStyle="{lineHeight:60+'rpx', padding:'0px 0px'}">
						<u-collapse-item :open="false" :title="ask.description" :key="ask.description">
							<text>{{ask.description}}</text>
						</u-collapse-item>
					</u-collapse>
					-->
					<view id="mind-content-box">
						<view :class="{'one-line-css':isContentOne,'more-line-css':!isContentOne}" @tap="showContent">
							<text>{{ ask.description }}</text>
						</view>
						<view class="mind-title-icon" @tap="showContent">
							<u-icon :name="isContentOne?'arrow-down':'arrow-up'" size="32" color="#A6A6A6"></u-icon>
						</view>
					</view>
				</view>
				<view class="mind-interact">
					<view class="mind-interact-left">
						<!--
						<view class="mind-nickName">{{ask.fbr}}</view>
						<view class="mind-pubdate">{{ask.pubdate}}</view>
						-->
					</view>
					<view class="mind-interact-right">
						<view class="praise-view" @tap.stop="collectQuestion()">
							<!--
							<image src="../../static/img/mind_square/love.png" style="width: 28rpx;height:24rpx;margin-right:15.01rpx;"></image>
							-->
							<u-icon name="heart" size="32" :color="ask.sfsc==0?'#A6A6A6':'#FF3300'" style="margin-right:15.01rpx;"></u-icon>
							<text>{{ask.fbsccs}}</text>
						</view>
						<view class="reply-view">
							<image src="../../static/img/mind_square/message.png" style="width: 24rpx;height:24rpx;margin-right:15.01rpx;"></image>
							<text>{{ask.hfsccs}}</text>
						</view>
						<!--
						<view @tap="jubao">
							<image src="../../static/img/mind_square/jubao.png" style="width: 24rpx;height:24rpx;margin-left:15.01rpx;margin-right:15.01rpx;"></image>
							<text>举报</text>
						</view>
						-->
					</view>
				</view>
			</view>
			
			<view id="answer-view">
				<view id="anser-title">精彩回答</view>
					<view id="answer-list-box">
						<view v-for="(answer,index) in answerList" :key="answer.hid" class="answer-item">
							<view class="left-icon">
								<image :src="answer.litpic ? answer.litpic: '../../static/img/user/people.png'" class="left-avatar"></image>
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
									
									<view class="first-line-after" >
										<!--
										<image src="../../static/img/mind_square/love.png" style="width: 28rpx;height:24rpx;margin-right:15.01rpx;"></image>
										-->
										<view @tap.stop="collectAnswer(index)" style="padding-right:10rpx;">
											<u-icon name="heart" size="32" :color="answer.hfsc?'#FF3300':'#A6A6A6'" style="padding-right:15.01rpx;"></u-icon>
											<text>{{answer.hfsccs}}</text>
										</view>
										<view @tap.stop="jubaoHf(answer.hid)">
											<image src="../../static/img/mind_square/jubao.png" style="width: 24rpx;height:24rpx;padding-right:15.01rpx;"></image>
											<text>举报</text>
										</view>
									</view>
								</view>
								<view class="answer-second-line">
									<u-read-more :shadowStyle="{backgroundImage: 'linear-gradient(-180deg, rgba(255, 255,255, 0) 0%, #fff 80%)',paddingTop: '150rpx',marginTop: '-150rpx'}" :showHeight="150" :close-text="closeText" :toggle="true" textIndent="'0px'">
										<text>{{answer.content}}</text>
									</u-read-more>
								</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- var(--window-bottom) -->
		<view id="bottom-view" :style="{bottom:bottom+'px', display:bottomDisplay}">
			<!-- 回复 -->
			<view id="left-reply-icon">
				<image src="../../static/img/mind_square/reply.png" class="reply-css"></image>
			</view>
			<view id="replay-text-view">
				<textarea  @focus="areaFocus" maxlength="-1" @blur="areaBlur" :adjustPosition="false"  class="uni-textarea" :focus="isFocus" auto-height="true"  v-model.trim="content" placeholder="快来帮帮这位兄弟吧~~"  placeholder-class="replay-placeholder" />
			</view>
			<view id="reply-btn-view" @tap="reply">
				<view id="publish-btn-view">
					<label>发布</label>
				</view>
			</view>
		</view>
		
		<uni-popup id="popupDialog" ref="popupDialog" type="share" :zIndex="9999999999999">
			<uni-popup-share :bottomData="shareData" :reportData="reportData" @select="handleSelect"></uni-popup-share>
		</uni-popup>
		
		<!-- 提交信息 -->
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog" @change="changeDialogShow">
			<uni-popup-dialog mode="input" title="举报提示" placeholder="请输入举报原因" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script >
	import uIcon from '../../uview-ui/components/u-icon/u-icon.vue';
	import uReadMore from '../../uview-ui/components/u-read-more/u-read-more.vue';
	import uCollapseItem from '../../uview-ui/components/u-collapse-item/u-collapse-item.vue';
	import uCollapse from '../../uview-ui/components/u-collapse/u-collapse.vue';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	let eMap = {};
	let nid = '';
	let interval = null;
	let nowpage = 1;
	let totalpage = 1;
	let pageNo  = 1;
	// 举报的回复ID
	let rHid = '';
	let jubaoFrom = '';
	export default {
		data() {
			return {
				isOne: true,
				isContentOne: true,
				isFocus: false,
				answerList: [
					
				],
				ask: {
					
				},
				isCollect : false,
				content: '',
				contentHeight: '',
				replyTop: '',
				bottom: '',
				closeText: '查看更多',
				shareData: [
					{
						text: '朋友圈',
						icon: '/static/img/user/wx_timeline.png',
						name: 'wx_timeline'
					},
					{
						text: '微信',
						icon: '/static/img/user/wx.png',
						name: 'wx'
					},
					/*
					{
						text: 'QQ',
						icon: '/static/img/user/qq.png',
						name: 'qq'
					},*/
				],
				bottomDisplay: 'flex',
				reportData: [
					{
						text: '举报',
						icon: '/static/img/mind_square/jubao.png',
						name: 'jubao'
					}
				]
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
			uIcon,
			uReadMore,
			uCollapseItem,
			uCollapse,
			uniPopupShare,
			uniPopupDialog
		},
		onLoad(option) {
			nid = option.nid;
			this.init(option.nid);
			this.bottom = 0;
			console.log('plus.version', plus.runtime.version);
		},
		methods: {
			showTitle() {
				this.isOne = !this.isOne;
			},
			showContent() {
				this.isContentOne = !this.isContentOne;
			},
			jubao() {
				
			},
			change() {
				
			},
			upper() {
				console.log('upper!..');
				uni.showNavigationBarLoading();
				nowpage = 1;
				this.init(nid, true);
			},
			changeDialogShow(e) {
				console.log('changeDialogShow', e);
				if (e.show == false) {
					// 不显示
					this.bottomDisplay = 'flex';
				}
			},
			async dialogInputConfirm(callback, val) {
				if (typeof callback == 'function') {
					callback();
					this.bottomDisplay = 'flex';
				}
				
				console.log('val', val);
				const reason = this.reportReason;
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					nid:nid,
					uid: this.uid,
					content: val,
					filterData: true
				};
				params.auth = auth;
				if(jubaoFrom == 1) {
					params.hid = rHid;
				}
				// 举报的接口...
				const url = apiPrefix + "?mod=ndgc&ac=jubao";
				console.log('url', url);
				console.log('params:', params);
				const respData = await http.request(url, params);
				console.log('resData: jubao', respData);
				if(respData.status == 1) {
					uni.showToast({
						title:'举报成功',
						icon:'success',
						duration:1000
					});
				}
			},
			jubaoHf(hid) {
				rHid = hid;
				console.log('hid', hid);
				// 举报来自回复...
				jubaoFrom = 1;
				this.bottomDisplay = 'none';
				this.$refs.dialogInput.open();
				/*
				uni.showModal({
					title:'',
					content: '你确定要举报该内容吗?',
					showCancel:true,
					confirmText:'确定',
					success(res) {
						if(res.confirm) {
							// 点击了确定按钮
							
						} else if(res.cancel) {
							// 点击了取消按钮
							
						}
					},
					cancelText:'取消'
				});*/
				
			},
			handleSelect(item, callback) {
				console.log('item', item);
				const nameStr = item.item.name;
				// QQ 分享
				if(nameStr == 'qq') {
					this.shareMindQues('qq', 'qq');
				} else if(nameStr == 'wx') {
					this.shareMindQues('weixin', 'weixin');
				} else if(nameStr == 'wx_timeline') {
					this.shareMindQues('weixin', 'wx_timeline');
				}  else if(nameStr == 'jubao') {
					console.log('callback', callback);
					if( typeof callback == 'function') {
						callback();
						this.bottomDisplay = 'none';
					}
					jubaoFrom = 2;
					this.$refs.dialogInput.open();
				}
			},
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
				//this.isFocus = !this.isFocus;
				/*if(this.isShowRepley) {
					const d = e.detail;
					//this.replyTop = d.y + 91;
					
				}*/
			},
			shareMindQues(provider, scene) {
				console.log('shareWxOrWxTimeline');
				let _self = this;
				let sceneStr = '';
				const shareUrl = 'http://miaoyu66.com/app.html#/pages/index/ask-ques-list?nid='+nid;
				//const shareUrl = 'miaoyu://pages/index/ask-ques-list?nid='+nid;
				sceneStr = (scene=='wx_timeline') ? 'WXSenceTimeline' : "WXSceneSession"
				uni.share({
					provider: provider,
					scene: sceneStr,
					type: 0,
					title: '我在妙语千寻上找话术',
					summary: '拒绝尬聊，多方位开启话题助阵您不疲累不应付 妙语千寻，打开话题让约会不在尴尬',
					imageUrl: '../../static/img/user/miaoyu.png',
					href: shareUrl,
					success: (res) => {
						console.log("success:" + JSON.stringify(res));
					},
					fail: (e) => {
						
					}
				});
			},
			areaFocus(e) {
				console.log('areaFocus', e);
				const h = e.detail.height;
				console.log('h', h);
				const info = uni.getSystemInfoSync();
				console.log('info', info);
				const isIPhoneX = getApp().globalData.isIphoneX;
				console.log('isPhoneX', isIPhoneX);
				console.log('this.bottom', this.bottom);
				if(isIPhoneX) {
					//this.bottom = h - uni.upx2px(68);
				} else {
					//this.bottom = h;
				}
			},
			areaBlur(e) {
				this.bottom = 0;
			},
			async init(nid, stopRefresh) {
				const systemInfo = uni.getSystemInfoSync();
				this.contentHeight = systemInfo.windowHeight - uni.upx2px(80);
				await this.getQuestionReplyList(nid, 1);
				await this.getQuestionDetail(nid);
				if (stopRefresh) {
					// 隐藏下拉加载...
					setTimeout(() => {
						uni.hideNavigationBarLoading();
					}, 2000);
				}
			},
			async getQuestionDetail(nid) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					nid:nid,
					uid: this.uid
				};
				params.auth = auth;
				// 获取问题详情
				const url = apiPrefix + "?mod=ndgc&ac=read";
				const resp = await http.request(url, params);
				const infoStr = util.cache('mind_question_info', null);
				console.log('infoStr', infoStr);
				const info    = infoStr ? JSON.parse(infoStr): {};
				this.ask = {...info, ...resp};
				this.isOne = [...this.ask.title].length<=13 ? true:false;
				console.log('this.ask', this.ask);
			},
			async getQuestionReplyList(nid,pageNo,isApppend) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					nid:nid,
					uid: this.uid,
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
				/*
				if(this.content.length>500) {
					uni.showToast({
						title:"回复内容长度不超过500个字",
						duration:1000,
						icon:'none'
					});
					return;
				}*/
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
					//this.ask.hfsccs++;
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
				const keys = Object.keys(eMap);
				if(eMap[t1] || t1 - keys[0]<=1.3) {
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
				if(this.ask.uid== this.uid) {
					uni.showToast({
						icon:'none',
						title:'不能收藏自己发布的!',
						duration:2000,
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
					type: 1 - this.ask.sfsc,
					auth: auth,
					filterData: true
				};
				const route = '?mod=ndgc&ac=fb_sc';
				const url  = apiPrefix + route;
				const resp = await http.request(url, params);
				if(resp.status == 1) {
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
				const keys = Object.keys(eMap);
				console.log('keys:'+JSON.stringify(keys));
				console.log('t1:'+JSON.stringify(t1));
				// 不允许连续点击两次或者更多次...
				if(eMap[t1] || (t1 - parseInt(keys[0]))<=1.3) {
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
				if(this.answerList[index].uid== this.uid) {
					uni.showToast({
						icon:'none',
						title:'不能收藏自己发布的!',
						duration:2000,
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
					this.answerList[index].hfsc = 1 - this.answerList[index].hfsc;
					this.answerList[index].hfsccs = resp.hfsccs;
				}
				// this.color = '#FF3300';
				// 这里需要将问题ID,当前用户,收藏,还是取消收藏,传递给后台
				// 表示已经点赞过...
				
				const t = parseInt(new Date().getTime()/1000);
				eMap[t] = 1;
			},
		},
		/** 点击菜单按钮 **/
		onNavigationBarButtonTap(e) {
			this.$refs.popupDialog.open();
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
			display: flex;
			margin-left:55rpx;
			margin-right:61rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #323232;
			font-family: "Microsoft YaHei";	
			/*#mind-title-mzshuo {
				height: 60rpx;
				display: block;
				width: 160rpx;
				/*justify-content: center;
				align-items: center;*/
				/*text-align: center;
				line-height: 60rpx;
				float: left;
				background: #F3F3F3;
				border-radius: 30rpx;
				margin-right: 24rpx;
				/*padding-left:29rpx;
				padding-right:27rpx;*/
				/*margin-right: 24rpx;*/
				/*font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #A88FEF;
			}*/
			justify-content: space-between;
			.mind-title-left {
				display: flex;
				/*width: 40%;*/
				align-items: center;
				.avatar-class {
					width: 38px;
				    height: 38px;
				    border-radius: 50%; 
				}
				.mind-nickName {
					/*margin-right:47rpx;*/
					font-size: 14px;
					font-weight: 600;
					margin-left:35rpx;
				}
				
			}
			.mind-title-right {
				display: flex;	
				/*width: 60%;*/
				align-items: center;
				justify-content: flex-end;
				.mind-pubdate {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color:#A3A3A3;
				}
			}
			
			#right-view {
				display: flex;
				justify-content: space-between;
				#mind-title-firstline {
					width:500rpx;
					display: block;
					float: left;
					margin-top:0rpx;
					padding-top:0rpx;
					height: 60rpx;
				
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333232;
					
					text {
						/*line-height: 1.2;*/
					}
				}
				
				.mind-title-icon {
					
				}
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
			color:#716a6A;
			#mind-content-box {
				display: flex;
				padding-top:15px;
				justify-content: space-between;
				view {
					color:#A3A3A3;
				}
				.more-line-css {
					text {
						line-height: 1.5;
					}
				}
			}
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
				width:60%;
				
				display: flex;
				.mind-nickName {
					display: flex;
					/*margin-right:50rpx;*/
					width:50%;
				}
				.mind-pubdate {
					display: flex;
					width:50%;
				}
			}
			.mind-interact-right {
				width:40%;
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
	
		flex-direction: column;
		#anser-title {
			font-weight: bolder;
			font-family: "Microsoft YaHei";
			padding-left:55rpx;
			padding-right: 55rpx;
			font-size:24px;
			margin-top:70rpx;
			margin-bottom:50rpx;
		}
		#answer-list-box {
			.answer-item{
				display: flex;
				padding-left:55rpx;
				padding-right: 55rpx;
				padding-top:15px;
				padding-bottom:15px;
				border-bottom: 1px solid #F2F2F2;
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
						/*height: 27px;*/
						height: 76rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						justify-content: space-between;
						.first-line-before {
							display: flex;
							align-items: flex-start;
							flex-direction: column;
							justify-content: space-between;
							color:#A9A9A9;
							width:70%;
							.first-line-nickName {
								color: #A88FEF;
								/*width:50%;*/
								display: flex;
								justify-content: flex-start;
							}
							view {
								/*width:50%;*/
								display: flex;
								justify-content: center;
								font-size:28rpx;
							}
						}
						.first-line-after {
							height: 76rpx;
							display: flex;
							align-items: flex-start;
							justify-content: flex-end;
							width:30%;
							/*align-items: center;*/
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

.one-line-css {
	/*line-height: 60rpx;*/
	
	overflow: hidden;
	text-overflow:ellipsis; 
	white-space: nowrap;
}

.more-line-css {
	line-height: 1;
}
.mind-title-icon {
	display: flex;
	align-items: flex-start;
}
</style>
