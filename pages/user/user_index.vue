<template>
	<view id="root-view">
		<view v-if="isInternalUser && uid>0" id="test-account" @tap="gotoUserList">
			<text>回到用户列表</text>
		</view>
		<view id="top-view">
			<view id="avatar-view" @tap="gotoProfile">
				<image :src="headimg" class="user-avatar"></image>
			</view>
			<view id="top-mid-view">
				<view id="first-line-view">
					<text style="margin-right:20rpx;">{{ statusText }}</text>
					<!--
					<text v-if="level>=1" class="underline-text" @tap="logout">退出</text>
					-->
				</view>
				<view id="second-line-view">
					<text>{{ validPeriod }}</text>
				</view>
			</view>
			<view id="action-view" @tap="run">
				<text class="common-font">{{ actionText }}</text>
			</view>
		</view>
		<view id="user-content-view">
			<view id="middle-view">
				<view v-for="(info,index) in midList" class="mid-menu" :key="info.title" @tap="info.tap">
					<view :class="['mid-num', (index == (midList.length -1) ?' red-text':'')]">{{info.num}}</view>
					<view class="mid-title common-font">{{info.title}}</view>
					<!--
					<view v-if="index == (midList.length -1) && lastUnreadNum>0" id="last-comment">
						<text>{{lastUnreadNum}}</text>
					</view>
					-->
				</view>
			</view>
			<view id="bottom-view">
				<uni-list>
					<uni-list-item v-for="(item,index) in list" class="user-list-item" :key="item.id" :title="item.title" 
					:thumb="item.thumb" :showArrow="index!=3?true:false" hideBgc="true" @tap="item.tap" 
					:style="'height:'+height+'px;line-height:'+height+'px;'" :class="index==list.length-1?'last-item':''">
					<template v-slot:right="" v-if="index == 1|| index == 3">
						<!-- @tap="copy_customer_wechat" -->
						<view style="display: flex;align-items: center;" v-if="index == 1">
							<text class="copy-text">{{wx}} </text>
							<button class="copy-btn">复制</button>
						</view>
						<view  v-if="index == 3">
							<text class="copy-text">{{fileSizeString}}</text>
						</view>
					</template>
					
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		
		<view id="logout-view" @tap="logout" v-if="uid>0">
			<text>退出登录</text>
		</view>
		<!--
		<view id="absolute-view" :class="maskClass" v-if="isShow" @touchmove.stop.prevent="moveHandle">
			<uni-transition :show="isShow" :modeClass="['slide-top']">
				<view class="mask-view" :style="'position:absolute;top:'+oneToOneTop+'px;left:'+oneToOneLeft+'px;'">
					<text class="onetoone-mask">一对一学院</text>
					<image src="../../static/img/mask/login/arrow.png" style="width:62rpx;height: 12rpx;"></image>
					<text class="onetoone-desc">专业导师,一对一教你脱单</text>
				</view>
				<view :style="'position:absolute;top:'+nextTop+'px;left:0rpx;width:100%;z-index:999999999999999999'" id="nextBtn" @tap="gotoNext">
					<view>
						<text>我知道了</text>
					</view>
				</view>
			</uni-transition>
		</view>
		-->
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	let bottomImageMenu;
	
	export default {
		onLoad(option) {
			this.getConfig();
			// 计算页面整体高度,然后计算高度
			let sysinfo = uni.getSystemInfoSync();
			let width = sysinfo.windowWidth;
			let winHeight    = sysinfo.windowHeight;
			this.nextTop = winHeight - 60;
			let radix = 750/width; 
			let h     = radix * winHeight;
			const  n = this.list.length;
			/*let m = 50+180+31+57+22+16+26 +53+0.28*h;
			const extraH = winHeight - uni.upx2px(m);
			const b = Math.floor(extraH/n);*/
			this.height = 45;
			uni.setNavigationBarTitle({
				title:'个人中心'
			});
			/*if(this.uid) {
				this.getUserInfo();
			}*/
		},
		onShow() {
			//#ifdef APP-PLUS || H5
			let globalData = getApp().globalData;
			if(globalData.isRecharge == 1) {
				
			}
			//#endif
			if(this.uid) {
				this.getUserInfo();
				this.getUserStats();
			}
		},
		onReady() {
			
			/*const obj = uni.createSelectorQuery().select('.uni-list-item__content-title:nth-of-type(1)');
			let _self = this;
			obj.boundingClientRect(function (data) { // data - 各种参数
				if(_self.isShow) {
					// 
					console.log('data', data);
					_self.oneToOneTop = data.top+30;
					_self.oneToOneLeft = data.left;
					
				}
			}).exec();*/
		},
		components: {
			uniPopupDialog
		},
		computed:{
			isInternalUser: function() {
				console.log('isInternalUser');
				return uni.getStorageSync('isInternalUser');
			},
			wx: function() {
				if(!this.configData.weixin) {
					return '';
				}
				return this.configData.weixin;
			},
			appNickName: function() {
				let info = this.userInfo;
				console.log('info', info);
				if(info.nickName) {
					return info.nickName;
				}
				if(info.phone && info.phone!='test') {
					return '*'.repeat(7)+(info.phone.substr(7, 4));
				}
				return info.nickName;
			},
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
				let u = this.$store.getters.userInfo;
				console.log('u', u);
				if (u.uid) {
					return u.uid;
				}
				let uid = util.cache('app_userid', null);
				return uid;
			},
			level: function() {
				let info = this.userInfo;
				console.log('level-info', info);
				if(!info || !info.level) return 0;
				if(info.level) {
					return info.level;
				} 
				return 0;
			},
			appDates: function() {
				let userInfo = this.userInfo;
				if(!userInfo) return '';
				let dateStr = '';
				if(userInfo.level <=1) {
					return '';
				}
				if (userInfo.start_time) {
					dateStr+=userInfo.start_time+"~";
				}
				if (userInfo.end_time) {
					dateStr+=userInfo.end_time;
				}
				console.log('dateStr', dateStr);
				return dateStr;
			},
			headimg: function() {
				const url = '../../static/img/user/people.png';
				return this.userInfo.avatarUrl ? this.userInfo.avatarUrl: url;
			},
			actionText: function() {
				let text = '';
				console.log('this.level', this.level);
				if (this.level == 0) {
					text = '请登录/注册';
				} else {
					text = '升级/续费VIP';
				}
				return text;
			},
			statusText: function() {
				return this.level == 0 ? '尚未登录': this.appNickName;
			},
			validPeriod: function() {
				console.log('this.appDates', this.appDates);
				return this.level == 0 ? '----': this.appDates;
			},
			fileSizeString: function() {
				//#ifdef APP-PLUS
				return this.formatSize();
				//#endif
			}
		},
		data() {
			let _self = this;
			let midList = [
				{
					num: 0,
					title: '我发布的',
					tap() {
						uni.navigateTo({
							url:'/pages/user/user_asklist?tab=0'
						});
					}
				},
				{
					num: 0,
					title: '收藏文章',
					tap() {
						uni.navigateTo({
							url:'/pages/user/user_asklist?tab=1'
						});
					}
				},
				{
					num: 0,
					title: '收藏问答',
					tap() {
						uni.navigateTo({
							url:'/pages/user/user_asklist?tab=2'
						});
					}
				},
				{
					num: 0,
					title: '收到评论',
					tap() {
						uni.navigateTo({
							url:'/pages/user/user_asklist?tab=3'
						})
					}
				}
			];
			// 增加tap 按钮事件
			return {
				configData: {},
				lastUnreadNum:0,
				midList: midList,
				list: _self.getUserConfigList(),
				height: '',
				
				bottomData: [
					{
						label: '微信朋友圈',
						icon: '/static/img/user/wx_timeline.png',
						onClick() {
							console.log('wx timeline click22222!');
							_self.shareWxOrWxTimeline('wx_timeline', 'weixin');
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
				]
			}
		},
		methods: {
			copy_customer_wechat() {
				//let weichat = '';
				let weichat = this.configData['weixin'];
				uni.setClipboardData({
					data: weichat,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								});
							}
						});
					}
				});
			},
			moveHandle() {
				
			},
			gotoProfile() {
				if(!this.uid) {
					return;
				}
				uni.navigateTo({
					url:'/pages/user/profile'
				});
			},
			logout() {
				// 清楚用户缓存信息
				let type = util.cache('appLoginType', null);
				this.setUserInfo({});
				uni.removeStorageSync('app_user_info_'+type);
				console.log('logout...');
				uni.removeStorageSync('app_userid');
				this.midList[0].num = 0;
				this.midList[1].num = 0;
				this.midList[2].num = 0;
				this.midList[3].num = 0;
			},
			gotoNext() {
				util.setVersionValue();
				uni.switchTab({
					url:'/pages/index/app_index'
				});
			},
			moveHandle() {
				
			},
			dialogConfirm(e) {
				
			},
			dialogClose(e) {
				
			},
			formatSize() {  
				let that = this;  
				let  fileSizeString = '';
				plus.cache.calculate(function(size) {  
					let sizeCache = parseInt(size);  
					if (sizeCache == 0) {  
						fileSizeString = "0B";  
					} else if (sizeCache < 1024) {  
						fileSizeString = sizeCache + "B";  
					} else if (sizeCache < 1048576) {  
						fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";  
					} else if (sizeCache < 1073741824) {  
						fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";  
					} else {  
						fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";  
					}  
				});  
				return fileSizeString;
			},
			 clearCache() {  
				let that = this;  
				let os = plus.os.name;  
				if (os == 'Android') {  
					let main = plus.android.runtimeMainActivity();  
					let sdRoot = main.getCacheDir();  
					let files = plus.android.invoke(sdRoot, "listFiles");  
					let len = files.length;  
					for (let i = 0; i < len; i++) {  
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {  
							if (entry.isDirectory) {  
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({  
										title: '缓存清理完成',  
										duration: 2000  
									});  
									that.formatSize(); // 重新计算缓存  
								}, function(e) {  
									console.log(e.message)  
								});  
							} else {  
								entry.remove();  
							}  
						}, function(e) {  
							console.log('文件路径读取失败')  
						});  
					}  
				} else { // ios  
					plus.cache.clear(function() {  
						uni.showToast({  
							title: '缓存清理完成',  
							duration: 2000  
						});  
						that.formatSize();  
					});  
				}  
			},
			setUserInfo(userInfo) {
				console.log('userInfo', userInfo);
				this.$store.commit('setUserInfo', userInfo);
			},
			setIsShowMaskObj(isShow) {
				this.$store.commit('setVersionIsShowMask', isShow);
			},
			getUserInfo() {
				// 获取的用户头像昵称,绑定手机号等
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=check_app_user";
				const uid = this.uid;
				console.log('check_app_user', {
					auth: auth,
					uid: uid,
					filterData: true
				});
				http.request(url, {
					auth: auth,
					uid: uid,
					filterData: true
				}).then(resp => {
					console.log('resp', resp);
					if(resp.status == 1) {
						// 成功之后写缓存数据,然后再返回.
						let data = resp.data;
						let userInfo = this.userInfo;
						if(data.name) {
							//let nameStr = '*'.repeat(7)+(data.name.substr(7, 4));
							userInfo.nickName = data.name;
							//this.nickName     = data.name;
						}
						if(data.img) {
							userInfo.avatarUrl = data.img;
							//this.avatarUrl     = data.img;
						}
						if(data.phone) {
							userInfo.phone     = data.phone;
						}
						if(data.cid) {
							userInfo.level = data.cid;
						}
						if (data.start_time) {
							userInfo.start_time = data.start_time;
						}
						if (data.end_time) {
							userInfo.end_time = data.end_time;
						}
						if (data.uid) {
							userInfo.uid = data.uid;
						}
						console.log('userINfo uid', userInfo);
						if(userInfo.uid) {
							const type = util.cache('appLoginType', null);
							console.log('type', type);
							this.setUserInfo(userInfo);
							console.log('this', this);
							util.cache('app_user_info_'+type, JSON.stringify(userInfo), 15*24*3600);
							let globalData = getApp().globalData;
							globalData.isRecharge = 0;
						}
					}
				});
			},
			async getConfig() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=system_set";
				const respData = await http.request(url, {
					auth: auth
				});
				this.configData = respData;
			},
			shareWxOrWxTimeline(scene, provider) {
				console.log('shareWxOrWxTimeline');
				let _self = this;
				uni.share({
					provider: provider,
					scene: scene=='wx_timeline' ?
						'WXSenceTimeline' : "WXSceneSession",
					type: 0,
					title: '我在妙语千寻上找话术',
					summary: '拒绝尬聊，多方位开启话题助阵您不疲累不应付 妙语千寻，打开话题让约会不在尴尬',
					imageUrl: '../../static/img/user/miaoyu.png',
					href: "https://kuwoi.com/",
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
			run() {
				if(this.level == 0) {
					uni.navigateTo({
						url:'/pages/user/login_v2'
					});
				} else {
					uni.navigateTo({
						url:'/pages/user/upgrade_user_vip_new'
					});
				}
			},
			getUserConfigList() {
				let _self = this;
				let dsOneToOne = {
					id: 1,
					title: '一对一学院',
					thumb: '../../static/img/user/onetoone_xueyuan.png',
					tap() {
						if(!_self.level) {
							uni.navigateTo({
								url: '/pages/user/login_v2'
							});
							return;
						}
						// 已登录,跳转到一对一
						uni.navigateTo({
							url:'/pages/user/one_to_one_university'
						});
					}
				};
				let config = [
					//dsOneToOne,
					{
						id: 2,
						title: '升级VIP',
						thumb: '../../static/img/user/user_upgrade_vip.png',
						tap() {
							if(!_self.level) {
								uni.navigateTo({
									url: '/pages/user/login_v2'
								});
								return;
							}
							uni.navigateTo({
								url:'/pages/user/upgrade_user_vip_new'
							});
							return;
						}
					},
					{
						id: 3,
						title: '投诉建议',
						thumb: '../../static/img/user/complaint_new.png',
						tap() {
							if(_self.level==0) {
								uni.navigateTo({
									url:'/pages/user/login_v2'
								});
								return;
							}
							uni.navigateTo({
								url:'/pages/user/complaint_v2'
							});
							return;
						}
					},
					{
						id: 4,
						title: '微信客服',
						thumb: '../../static/img/user/wx_customer.png',
						tap() {
							//let qq = '3342315151';
							const wx = _self.configData['weixin'];
							uni.setClipboardData({
								data: wx,
								success: function(res) {
									uni.getClipboardData({
										success: function(res) {
											uni.showToast({
												title: '复制成功'
											});
										}
									});
								}
							});	
						}
					},
					{
						id: 5,
						title: '分享好友',
						thumb: '../../static/img/user/share_wx_friends.png',
						tap() {
							_self.shareFriends();
						}
					},
					{
						id: 6,
						title: '缓存清理',
						thumb: '../../static/img/user/cache_clear.png',
						tap() {
							
						}
					},
				];
				if(this.level == 0)
				return config;
				config.splice(0, 1);
				return config;
			},
			// 获取用户发布的,收藏的文章和问答,收到的评论总数
			async getUserStats() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=ndgc&ac=center_num";
				const respData = await http.request(url, {
					auth: auth,
					uid: this.uid,
					
				});
				//lastUnreadNum
				if(respData) {
					this.midList[0].num = respData.wfbd_num;
					this.midList[1].num = respData.scwz_num;
					this.midList[2].num = respData.scwt_num;
					this.midList[3].num = respData.mywd_num;
				}
			},
			// 分享统计代码
			shareStatistics() {
				if(!this.uid) {
					return;
				}
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + '?mod=user&ac=fenxiang';
				http.request(url, {
					auth: auth,
					uid: this.uid,
					furl: 'https://kuwoi.com/'
				})
			},
			shareFriends() {
				console.log('heheere');
				let menus = this.bottomData;
				bottomImageMenu = new BottomImageMenu(menus, (menu, index) => {
					console.log('menu',menu, 'index', index);
				});
				bottomImageMenu.show()
			},
			gotoUserList() {
				uni.navigateTo({
					url: '/pages/user/virtual_users'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
#root-view {
	/*margin-left:30rpx;
	margin-right:30rpx;*/
	display: flex;
	z-index: 0;
	
	flex-direction: column;
	#top-view {
		margin-left:30rpx;
		margin-right:30rpx;
		height: 180rpx;
		margin-top:50rpx;
		display: flex;
		padding-left:27rpx;
		padding-right: 27rpx;
		background: linear-gradient(45deg, #534D5A 0%, #7C7385 100%);
		border-radius: 20rpx;
		align-items: center;
		justify-content: space-between;
		#avatar-view {
			.user-avatar {
				width:93rpx;
				height: 93rpx;
				border-radius: 50%;
			}
		}
		#top-mid-view {
			#first-line-view {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #E8D099;
			}
			#second-line-view {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #E8D099;
			}
		}
		#action-view {
			width:240rpx;
			height:60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: url(../../static/img/user/con_vip_active.png);
			background-size:240rpx 60rpx;
		}
	}
	#user-content-view {
		background: #FFFFFF;
		margin-left:30rpx;
		margin-right:30rpx;
		border-radius: 20rpx;
		margin-top:31rpx;
		#middle-view {
			display: flex;
			position: relative;
			padding-top:57rpx;
			.mid-menu {
				height: 94rpx;
				flex-shrink: 1;
				flex-basis: 171.5rpx;
				display: flex;
				align-items: center;
				flex-direction: column;
			}
			#last-comment {
				position: absolute;
				width: 30rpx;
				height: 30rpx;
				background: #E63522;
				border-radius: 50%;
				top: 0rpx;
				right: 30rpx;
			
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		#bottom-view {
			margin-top:73rpx;
			/*border-bottom: 1px solid #F2F2F2;*/
		}
	}
	/**
	#absolute-view {
		
		display: flex;
		flex-direction: column;
		.mask-view {
			display: flex;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			.onetoone-mask {
				width:160rpx;
			}
			.onetoone-desc {
				width:337rpx;
			}
		}
	}*/
}
.uni-list ::v-deep  .uni-list-item__icon {
	display: flex;
}
.uni-list ::v-deep .uni-list-item__content-title {
	font-size: 28rpx !important;
	font-family: PingFang SC !important;
	font-weight: 500 !important;
	color: #333333 !important;
}

.uni-list ::v-deep .uni-list-item {
	line-height: 95rpx;
	height: 95rpx;
	padding-left: 0rpx;
	border-bottom:1px solid #F2F2F2;
}

.uni-list {
	margin-left:30rpx !important;
}

.last-item {
	border-bottom:1px solid #F2F2F2;
}
.uni-list ::v-deep .uni-list-item__container {
	border-top-width: 0px;
}

.uni-list ::v-deep .uni-list-item__container:after {
	background-color: transparent;
	height: 0px;
}

.uni-list ::v-deep .uni-list-item__icon-img {
	width: 32rpx;
	height: 32rpx;
}

.uni-list ::v-deep .uni-list-item__extra {
	/*padding-right: 37rpx;*/
	height: 28rpx;
}

.common-font {
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #343434;
}

.copy-text {
	font-size: 12px;
	color:#717171;
}
.copy-btn {
	font-size: 12px;
	color:#8613D0;
	border: 1px solid #8613D0;
	border-radius: 10rpx;
	line-height: 1.5;
	padding-left: 10px;
	padding-right: 10px;
	margin-right:5px;
	margin-left:5px;
}


.underline-text {
	text-decoration: underline;
	color: white;
}

.red-text {
	color:red;
}

#logout-view {
	display:flex;
	width:690rpx;
	height: 45px;
	margin-left:30rpx;
	margin-right:30rpx;
	margin-top:20rpx;
	justify-content: center;
	background-color: #FFFFFF;
	align-items: center;
	color:red;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 400;
}
#test-account {
	margin-left:30rpx;
	margin-right: 30rpx;
}
</style>
