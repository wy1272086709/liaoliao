<template>
	<view id="root-view">
		<view id="header-view" @tap="payScore">
			<view id="score_num">{{ score_num }}</view>
			<view>
				<button class="pay_score_button">购买积分</button>
			</view>
		</view>
		<view id="content-view" @click="getScoreLogList">
			<view>
				<view style="height:52rpx;line-height: 52rpx;" @tap="$emit('click')">
					<text>积分明细</text>
				</view>
				<u-icon name='arrow-right' color='#333' size='32' :customStyle="{height:'52rpx', 'line-height':'52rpx'}"></u-icon>
			</view>
		</view>
		
		<view id="footer-view">
			<view id="footer-view-title">积分任务({{current}}/{{total}})</view>
			<view v-for="item in taskList" :key="item.nid" class="footer-view-task">
				<view class="task-left-view">
					<view class="task-image">
						<image :src="item.imageSrc" class="task-image-icon"></image>
					</view>
					<view class="task-text">
						<text>{{item.title}}</text>
						<text>{{item.desc}}</text>
					</view>
				</view>
				
				<view class="task-button-view" @tap="gotoTask(item.nid, item.type)">
					<button>{{ item.statusText }}</button>
				</view>
			</view>
		</view>
		<u-modal v-model="show"  :asyncClose="true" @confirm="signUp"  ref="myModal"
		:modalStyle="modalStyle" :title-style="{'margin-top': '10px','margin-bottom':'10px'}" 
		:confirm-text="confirmMsg" :show-title="false" :title="''"  :mask-close-able="true" 
		:confirmStyle="isSign?{'background-color':'#F5F5F5','color':'#AAAAAA'}:confirmBtnStyle">
			<view class="slot-content">
				<view class="sign-view-title">已连续签到{{totalSign}}天</view>
				<view id="sign-view-content">
					<view v-for="(item,index) in signData" :key="index" class="sign-view">
						<view class="sign-view-top" :style="item.sfqd?'background-color:#FFA340':'background-color:#ACAEFF'">
							<view style="display: flex;justify-content: center;;">
								<image src="../../static/img/score/score_week_icon.png" style="width:32rpx;height: 32rpx;"></image>
							</view>
							<text style="color:white;">+{{item.jfs}}</text>
						</view>
						<view class="sign-view-bottom">
							<text>{{item.xqj}}</text>
						</view>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import http from '../../common/http.js';
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js';
	let bottomImageMenu = null;
	export default {
		data() {
			let _self = this;
			return {
				score_num: '',
				current: 0,
				total: 4,
				cnt: 7,
				bottomData: [
					{
						label: 'qq',
						icon: '/static/img/user/qq.png',
						onClick() {
							console.log('wx timeline click22222!');
							_self.shareWxOrWxTimeline('qq', 'qq');
						}
					},
					{
						label: '微信',
						icon: '/static/img/user/wx.png',
						onClick() {
							console.log('wx  click!22222');
							_self.shareWxOrWxTimeline('wx', 'weixin');
						}
					}
				],
				totalSign : 2,
				scrollHeight: '',
				//showCalendar: false,
				show: false,
				confirmMsg: '',
				isSign: 0,
				signDaysNum: 2,
				signData: [
					
				],
				value: false,
				modalStyle: {'background-color':'#898AFF'},
				confirmBtnStyle: {
					
				},
				confirmColor: '#FFFFFF',
				weekNames: ['星期一', '星期二','星期三', '星期四','星期五', '星期六', '星期日'],
				taskList: [
					{
						nid: 1,
						title: '连续签到7天',
						type: 1,//标志任务类型,1为签到型任务
						desc: '任务任务+10积分',
						imageSrc: '../../static/img/score/score_icon_active.png',
						//imageSrc: '../../static/img/score/score_icon.png',
						step: 0, // 完成进度
						step_count: 10, // 总共步骤
						statusText: '去完成',
					},
					{
						nid: 2,
						title: '任意浏览文章',
						type: 2,//标志任务类型,1为签到型任务
						desc: '任务任务+10积分',
						imageSrc: '../../static/img/score/score_icon_active.png',
						//imageSrc: '../../static/img/score/score_icon.png',
						step: 0, // 完成进度
						step_count: 10, // 总共步骤
						statusText: '去完成',
					},
					{
						nid: 3,
						title: '任意评论',
						type: 3,//标志任务类型,1为签到型任务
						desc: '任务任务+10积分',
						//imageSrc: '../../static/img/score/score_icon.png',
						imageSrc: '../../static/img/score/score_icon_active.png',
						step: 1, // 完成进度
						step_count: 5, // 总共步骤
						statusText: '1/5',
					},
					{
						nid: 4,
						title: '邀请好友',
						type: 4,//标志任务类型,1为签到型任务
						desc: '任务任务+2积分',
						//imageSrc: '../../static/img/score/score_icon.png',
						imageSrc: '../../static/img/score/score_icon_active.png',
						step: 0, // 完成进度
						step_count: 10, // 总共步骤
						statusText: '1/5',
					}
				]
			}
		},
		async onLoad(option) {
			const info = uni.getSystemInfoSync();
			const h    = info.windowHeight;
			this.scrollHeight =  h - uni.upx2px(280);
			const score = await this.getUserScore();
			this.score_num = score;
		},
		methods: {
			async querySignInfo() {
				const suffix = 'mod=user&ac=qiandao_check';
				const globalData = getApp().globalData;
				const apiPrefix = globalData.serverUri;
				const url = apiPrefix+'?'+suffix;
				const uid = this.uid;
				const params = { auth: globalData.auth, uid: uid, filterData: true };
				const resp = await http.request(url, params);
				if (resp.status == 1) {
					return {
						data: resp.data,
						lxqd: resp.lxqd,
						jtsfqd: resp.jtsfqd,
						riqi: resp.riqi
					};
				}
				return {};
			},
			shareFriends() {
				console.log('heheere');
				let menus = this.bottomData;
				bottomImageMenu = new BottomImageMenu(menus, (menu, index) => {
					console.log('menu',menu, 'index', index);
				});
				bottomImageMenu.show()
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
			payScore() {
				uni.navigateTo({
					url: '/pages/user/score_pay',
					fail(res) {
						console.log('fail res:'+JSON.stringify(res));
					},
					complete(res) {
						console.log('complete res:'+JSON.stringify(res));
					}
				})
			},
			// 获取积分列表
			getScoreLogList() {
				console.log('getScoreLogList');
				uni.navigateTo({
					url: '/pages/user/score_log_list'
				});
			},
			async gotoTask(taskId, type) {
				// 签到型任务...
				if (type == 1) {
					const data = await this.querySignInfo();
					console.log('data'+JSON.stringify(data));
					// 连续签到天使
					this.totalSign = data.lxqd;
					// 签到信息
					const signInfo = data.data;
					this.signData  = signInfo;
					this.isSign    = data.jtsfqd;
					
					if(!this.isSign) {
						console.log('1111')
						this.confirmMsg   = '签到';
					} else {
						console.log(2222);
						this.confirmMsg   = '已签到';
						this.confirmColor = '#F5F5F5';
					}
					this.show = true;
					//this.showCalendar = true;
				}
				else if(type == 2) {
					uni.navigateTo({
						url:'/pages/cases/index'
					});
				} else if(type == 3) {
					uni.switchTab({
						url:'/pages/mind_square/index'
					});
					
				} else {
					this.shareFriends();
				}
			},
			async shareStatistics() {
				const suffix = 'mod=user&ac=jf_fenxiang';
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const url = apiPrefix+suffix;
				const auth      = data.auth;
				const furl  = 'http://www.miaoyu66.com/app.html#/?uid='+this.uid;
				const params = {
					uid: this.uid,
					auth: auth,
					furl: furl
				};
				const respData = await http.request(url, params);
				if (respData.status!=1) {
					console.log('share fail'+JSON.stringify(respData));
				}
			},
			shareWxOrWxTimeline(scene, provider) {
				console.log('shareWxOrWxTimeline');
				let _self = this;
				const furl  = 'http://www.miaoyu66.com/app.html#/?uid='+this.uid;
				uni.share({
					provider: provider,
					scene: scene=='wx_timeline' ?
						'WXSenceTimeline' : "WXSceneSession",
					type: 0,
					title: '我在妙语千寻上找话术',
					summary: '拒绝尬聊，多方位开启话题助阵您不疲累不应付 妙语千寻，打开话题让约会不在尴尬',
					imageUrl: '../../static/img/user/miaoyu.png',
					// 这里是H5 注册页面地址...
					href: furl,
					success: (res) => {
						_self.shareStatistics();
						console.log("success:" + JSON.stringify(res));
					},
					fail: (e) => {
						console.log('fail', e);
						uni.showModal({
							content: '分享失败!',
							showCancel: false,
							complete() {
								if(bottomImageMenu) {
									bottomImageMenu.close();
								}
							}
						})
					}
				});
			},
			lower() {
				// 任务多的时候,可以继续往下拉...
			},
			async signUp() {
				// 已经签到，则不能再继续签到
				console.log('isSign:'+this.isSign);
				if (this.isSign) {
					//this.show = false;
					this.$refs.myModal.clearLoading();
					return;
				}
				const suffix = '?mod=user&ac=qiandao_insert'; // 签到接口
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const url = apiPrefix+suffix;
				const auth      = data.auth;
				const params = {
					uid: this.uid,
					auth: auth,
					filterData: true
				};
				const respData = await http.request(url, params);
				console.log('sign res:'+JSON.stringify(respData));
				if (respData.status == 1) {
					const jf = respData.jf_num;
					const _self = this;
					uni.showModal({
						title: '提示',
						showCancel:false,
						content: '签到成功,成功获得'+jf+'积分',
						async complete() {
							const score = await _self.getUserScore();
							_self.score_num = score;
						}
					});
					this.show = false;
				}
			}
		},
		components:{
			
		},
		computed:{
			userInfo: function() {
				// 从缓存读
				let u = this.$store.getters.userInfo;
				console.log('u', u);
				if (u.uid) {
					return u;
				}
				let type = util.cache('appLoginType', null);
				console.log('type', type);
				let uInfoStr = util.cache('app_user_info_'+type, null);
				console.log('uInfoStr', uInfoStr);
				if (uInfoStr) return JSON.parse(uInfoStr);
				return {};
			},
			uid: function() {
				const u = this.userInfo;
				if(u.uid) {
					return u.uid;
				}
				let uid = util.cache('app_userid', null);
				console.log('uid', uid);
				return uid ? uid: 0;
			},
		}
	}
</script>

<style lang="scss">
/deep/	.hairline-left {
	
}
/deep/ .u-model__footer {
	position: relative;
}
#root-view {
	display: flex;
	flex-direction: column;
	margin-left:32rpx;
	margin-right: 32rpx;
	#header-view {
		margin-top:20px;
		padding-top:20px;
		padding-bottom:20px;
		display: flex;
		align-items: center;
		padding-left:32rpx;
		padding-right: 32rpx;
		background-color: #F2F2F2;
		justify-content: space-between;
		#score_num {
			font-weight: 600;
			font-family: PingFang SC;
			font-size: 40rpx;
		}
		.pay_score_button {
			line-height: 2;
			padding-left: 10px;
			padding-right: 10px;
			font-family: PingFang SC;
			font-size: 16px;
		}
	}
	#content-view {
		/*height: 52rpx;*/
		//line-height: 52rpx;
		view {
			display: flex;
			justify-content: space-between;
		}
		font-size:40rpx;
		font-weight: 600;
		font-family: PingFang SC;
	}
	#content-view:before {
		content: '';
		margin-top:5px;
		display: block;
		width: 686rpx;
		height: 15px;
		border-top: 1px solid #F3F3F3;
	}
	
	#content-view:after {
		display: block;
		margin-top:5px;
		content: '';
		width: 686rpx;
		height: 15px;
		border-bottom: 1px solid #F3F3F3;
	}
	#footer-view {
		&-title {
			margin-top:100rpx;
			color:red;
			margin-bottom: 20px;;
		}
		.footer-view-task {
			display: flex;
			margin-top:20px;
			justify-content: space-between;
			.task-left-view {
				display: flex;
				.task-image {
					width:44px;
					height: 38px;
					&-icon {
						height: 44px;
						width: 38px;
					}
				}
				.task-text {
					display: flex;
					flex-direction: column;
					text {
						display: flex;
					}
					text:nth-child(1) {
						color:#333333;
						margin-bottom: 10px;
					}
					text:nth-child(2) {
						color:#CCD0DB;
					}
				}
			}
			.task-button-view {
				display: flex;
				align-items: center;
				button {
					display: flex;
					justify-content: center;
					line-height: 1;
					border-radius: 10px;
					padding-top:5px;
					padding-bottom: 5px;
					font-family: PingFang SC;
					color:#FFFFFF;
					font-size: 14px;
					/*padding-left:15px;
					padding-right:15px;*/
					width: 160rpx;
					background-color: #FF3333;
				}
			}
		}
		
	}
}


.slot-content {
	font-size: 28rpx;
	color: $u-content-color;
	padding-left: 30rpx;
	padding-right: 30rpx;
	.sign-view-title {
		margin-top:20px;
		margin-bottom: 10px;;
		text-align: center;
		color: #FFFFFF;
	}
	#sign-view-content {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		flex:1;
		.sign-view {
			display: flex;
			flex-direction: column;
			
			&-top {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width:70rpx;
				text-align: center;
				/*line-height: 60rpx;*/
				background-color: #FFA340;
				height: 60px;
				margin-bottom: 10px;
				border-radius: 10px;
				image {
					display: flex;
				}
				text {
					display: flex;
					justify-content: center;
				}
			}
			
			&-bottom {
				color: #FFFFFF;
				font-weight: 500;
				text-align: center;
				font-size: 18rpx;
			}
		}
	}
}
</style>
