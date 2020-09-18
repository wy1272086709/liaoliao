<template>
	<view class="root-view">
			<view id="content-view" :style="'height:'+contentHeight+'px;'">
				<!-- 如果用微信登录，获取微信相关用户信息 -->
				<template v-if="!userInfo.uid">
					<view class="li-view">
						<view id="header-member-info">
							<view class="zx">
								<!-- #ifdef MP-WEIXIN || MP-QQ -->
								<button  class="login-btn-avatar" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
									<image class="tx-img-nologin" src="../../static/img/user/default_avatar.png"></image>
								</button>
								<!-- #endif -->
								<!-- #ifdef APP-PLUS || H5 -->
								<button  class="login-btn-avatar" @tap="editProfile">
									<image class="tx-img-nologin" src="../../static/img/user/default_avatar.png"></image>
								</button>
								<!-- #endif -->
							</view>
						</view>
						<view id="header-view">
							<!-- #ifdef MP-WEIXIN || MP-QQ -->
							<button class="login-btn" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
								<text>点击登录/注册</text>
							</button>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS || H5 -->
							<button class="login-btn" @tap="appLogin">
								<text>点击登录/注册</text>
							</button>
							<!-- #endif -->
						</view>
						<!-- #ifdef MP-WEIXIN || MP-QQ -->
						<vip-info :level="level" :member_validate_dates="dates" @memberLogin="login(false)" :platform="platform"></vip-info>
						<!-- #endif -->
						
						<!-- #ifdef APP-PLUS || H5 -->
						<vip-info :level="level" :member_validate_dates="appDates" @memberLogin="appLogin" :platform="platform"></vip-info>
						<!-- #endif -->
						
					</view>
				</template>
				<template v-else>
					<view class="li-view">
						<view id="header-member-info">
							<view class="zx">
								<!-- #ifdef MP-WEIXIN || MP-QQ -->
								<image class="tx-img" :src="userInfo.avatarUrl"></image>
								<!-- #endif -->
								<!-- #ifdef APP-PLUS || H5 -->
								<button  class="login-btn-avatar" @tap="editProfile" v-if="!userInfo.avatarUrl">
									<image class="tx-img-nologin" src="../../static/img/user/default_avatar.png"></image>
								</button>
								
								<image class="tx-img" :src="userInfo.avatarUrl" @tap="editProfile" v-if="userInfo.avatarUrl"></image>
								<!-- #endif -->
								
							</view>
						</view>
						<view id="header-view">
							<view class="name">
								<text class="nickname" v-if="userInfo.nickName != undefined">
									{{userInfo.nickName}}
								</text>
								<text v-if="userInfo.nickName == undefined">{{appNickName}}</text>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN || MP-QQ -->
						<vip-info :level="level" :member_validate_dates="dates" :platform="platform"></vip-info>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS || H5 -->
						<vip-info :level="level" :member_validate_dates="appDates" :platform="platform" programNumber="3"></vip-info>
						<!-- #endif -->
					</view>
				</template>
				<!-- #ifdef MP-WEIXIN || MP-QQ -->
				<view id="bottom" :style="'height:'+bottomHeight+'rpx;'">
					<view id="bottom_list">
						<uni-list>
							<uni-list-item title="投诉建议" thumb="/static/img/user/complaint.png"  @tap="handleComplaint()"></uni-list-item>
							<uni-list-item title="关于我们" thumb="/static/img/user/about_us.png"  @tap="about_us_article()"></uni-list-item>
							<!-- #ifdef MP-WEIXIN -->
							<uni-list-item isShowButtonTitle  thumbSrc="/static/img/user/contact_customer.png"  title="联系客服">
							</uni-list-item>
							<!-- #endif -->
							<!-- #ifdef MP-QQ -->
							<uni-list-item  thumb="/static/img/user/contact_customer.png"  title="联系客服" @tap="copy_customer_qq()">
							</uni-list-item>
							<!-- #endif -->
							<uni-list-item title="当前版本" thumb="/static/img/user/cur_version.png" :showArrow="false">
								<template v-slot:right="">
									<text class="bottom-version-text">1.0.0</text>
								</template>
							</uni-list-item>
							<template v-if="phoneStr">
								<uni-list-item title="绑定手机号"  thumb="/static/img/user/bind_phone.png"  :showArrow="false">
									<template v-slot:right="">
										<text class="bottom-version-text">{{phoneStr}}</text>
									</template>
								</uni-list-item>
							</template>
							<!-- #ifdef MP-WEIXIN -->
							<template v-else>
								<uni-list-item title="绑定手机号"  isShowPhoneButtonTitle phoneThumbSrc="/static/img/user/bind_phone.png" @showPhoneNumberModal="showPhoneNumberModal">									
								</uni-list-item>
							</template>
							<!-- #endif -->
						</uni-list>
					</view>
				</view>
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS || H5 --> 
				<view id="app-bottom" :style="'height:'+(bottomHeight)+'rpx;'">
					<view id="app-bottom_list">
						<uni-list style="margin-top:140rpx;width:686rpx;position: absolute;">
							<uni-list-item title="投诉建议" thumb="/static/img/user/complaint.png"  @tap="handleComplaint()"></uni-list-item>
							<uni-list-item title="关于我们" thumb="/static/img/user/about_us.png"  @tap="about_us_article()"></uni-list-item>
							<!-- #ifdef APP-PLUS -->
							<uni-list-item  thumb="/static/img/user/share.png"  title="分享好友" @tap="shareFriends()">
							</uni-list-item>
							<!-- #endif -->
							<uni-list-item  thumb="/static/img/user/contact_customer.png"  title="联系客服" @tap="copy_customer_wechat()">
							</uni-list-item>
							<uni-list-item title="清理缓存" thumb="/static/img/user/clear_cache.png" @tap="clearCache()"></uni-list-item>
							<uni-list-item title="当前版本" thumb="/static/img/user/cur_version.png" :showArrow="false">
								<template v-slot:right="">
									<text class="bottom-version-text">1.0.0</text>
								</template>
							</uni-list-item>
						</uni-list>
					</view>
				</view>
				<!-- #endif -->
				
				
				<!-- #ifdef MP-WEIXIN  -->
				<view>
					<uni-popup ref="popupDialog" type="dialog" style="height:500px;width:750rpx;">
						<uni-popup-dialog  isHideTitle isGetPhoneButton :type="'dialog'" content="为了您的账号安全,请绑定手机号码" okText="立即绑定手机号" cancelText="暂不绑定手机号"
						:before-close="true" @confirm="dialogConfirm" @close="dialogClose" @getPhoneNumber="bindPhoneNumber"></uni-popup-dialog>
					</uni-popup>
				</view>
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS || H5 -->
				<!--
				<view>
					<uni-popup id="popupShare" ref="popupShare" type="share" @change="change">
						<uni-popup-share title="" @select="select" :bottomData="bottomData" :height="375"></uni-popup-share>
					</uni-popup>
				</view>
				-->
				<!-- #endif -->
			</view>
			<!-- #ifdef MP-WEIXIN || MP-QQ  -->
			<!--
			<tabBar :current="2" :position="'relative'"></tabBar>
			-->
			<!-- #endif -->
	</view>
	
</template>


<script>
	//import tabbar from '../../common/tabbar.vue';
	import vipInfo from '../../common/vipinfo/vipinfo.vue';
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	//#ifdef APP-PLUS || H5
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js';
	//#endif
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let isAuth;
	let codeStr = '';
	let weichat = 'wangquietforyou';
	let bottomImageMenu;
	export default {
		data() {
			let _self = this;
			return {
				contentHeight: 0,
				platform: 0,
				isIphoneX: false,
				providerList: [],
				isShow: true,
				bottomHeight: '',
				marginTop: '',
				phoneStr: '',
				configData: [],
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
		components:{
			//tabBar:tabbar,
			vipInfo,
			uniPopupDialog,
			uniPopupMessage,
			uniPopupShare
		},
		onShow() {
			//#ifdef MP-WEIXIN || MP-QQ
			if(this.platform == 1) {
				let globalData = getApp().globalData;
				if(globalData.isRecharge == 1) {
					console.log('loginRequest....');
					this.loginRequest(true);
				}
			}
			//#endif
			//#ifdef APP-PLUS || H5
			let globalData = getApp().globalData;
			if(globalData.isRecharge == 1) {
				this.getUserInfo();
			}
			//#endif
		},
		onShareAppMessage() {
			let pages = getCurrentPages(); //获取加载的页面
			let currentPage = pages[pages.length-1]; //获取当前页面的对象
			let url = currentPage.route; //当前页面url
			return {
				title: '个人中心',
				path: url,
				success: function() {
				},
				fail: function() {
				}
			};
		},
		onLoad(option) {
			//this.login();
			//#ifdef MP-WEIXIN
			this.getUserIsAuth();
			//#endif
			
			//#ifdef APP-PLUS || H5
			//this.getProviderList();
			bottomImageMenu = new BottomImageMenu();
			//#endif
			
			let info           = uni.getSystemInfoSync();
			let winHeight      = info.windowHeight;
			let winWidth       = info.windowWidth;
			console.log('winHeight', winHeight);
			let radix = 750/winWidth;
			radix = radix.toFixed(2);
			console.log('radix', radix);
			let globalData = getApp().globalData;
			this.isIphoneX = globalData.isIphoneX;
			this.platform = globalData.platform;
			console.log('platform', this.platform);
			// 设计稿731 高度
			this.contentHeight = winHeight - 50;
			console.log(winHeight, this.contentHeight);
			console.log('onLoad....', radix*winHeight);
			this.bottomHeight = radix*winHeight -50*radix- 330;
			this.marginTop    = radix*77;
			//#ifdef MP-WEIXIN || MP-QQ
			// 判断缓存里面，是否有用户信息,有就自动登录
			let userInfo = util.getUserInfoFromStorage();
			console.log('userInfo', userInfo);
			if(userInfo.uid) {
				this.login(false);
			}
			//#endif
			
			//#ifdef MP-QQ || APP-PLUS
			//获取参数配置信息...
			this.configData = this.getConfig();
			//#endif
		},
		created() {
			//#ifdef MP-WEIXIN || MP-QQ
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#endif
			console.log('created....');
		},
		computed: {
			//#ifdef APP-PLUS || H5
			appNickName: function() {
				let info = this.userInfo;
				if(info.phone) {
					return '*'.repeat(7)+(info.phone.substr(7, 4));
				} 
				return '';
			},
			//#endif
			userInfo: function() {
				// 从缓存读取
				//#ifdef MP-WEIXIN || MP-QQ
				let u = this.$store.getters.userInfo;
				console.log('u', u);
				if (u.nickName) {
					return u;
				}
				let userInfo = util.getUserInfoFromStorage();
				console.log('userInfo', userInfo);
				if(userInfo) {
					return userInfo;
				}
				return {};
				//#endif
				
				//#ifdef APP-PLUS || H5
				let u = this.$store.getters.userInfo;
				if (u.uid) {
					return u;
				}
				let type = util.cache('appLoginType', null);
				let uInfoStr = util.cache('app_user_info_'+type, null);
				console.log('uInfoStr', uInfoStr);
				if (uInfoStr) return JSON.parse(uInfoStr);
				return {};
				//#endif
			},
			//#ifdef APP-PLUS || H5
			appDates: function() {
				let userInfo = this.userInfo;
				if(!userInfo) return '';
				let dateStr = '';
				if (userInfo.start_time) {
					dateStr+=userInfo.start_time+"~";
				}
				if (userInfo.end_time) {
					dateStr+=userInfo.end_time;
				}
				console.log('dateStr', dateStr);
				return dateStr;
			},
			//#endif
			level: function() {
				let info = this.userInfo;
				console.log('level-info', info);
				if(!info || !info.level) return 0;
				if(info.level) {
					return info.level;
				} 
				return 0;
			},
			dates: function() {
				let userInfo = this.userInfo;
				if(!userInfo) return '';
				let dateStr = '';
				if (userInfo.start_time) {
					dateStr+=userInfo.start_time+"~";
				}
				if (userInfo.end_time) {
					dateStr+=userInfo.end_time;
				}
				console.log('dateStr', dateStr);
				return dateStr;
			}
		},
		methods: {
			//#ifdef APP-PLUS || H5
			/**
			 * 分享模版
			 */
			confirmShare() {
				this.$refs.popupShare.open()
			},
			shareWxOrWxTimeline(scene, provider) {
				console.log('shareWxOrWxTimeline');
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
						console.log("success:" + JSON.stringify(res));
						// 隐藏分享弹框
						/*uni.showToast({
							title:'分享成功!',
							duration:500,
							complete() {
								if(bottomImageMenu) {
									bottomImageMenu.close();
								}
							}
						})*/
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
			/**
			 * 选择内容
			 */
			select(e, done) {
				console.log('select ....', e);
				let provider = '';
				if(e.item.name=='wx' || e.item.name=='wx_timeline') {
					provider = 'weixin';
				} 
				done();
			},
			getProviderList() {
				this.providerList = [
					{
						name: '分享到微信好友',
						id: 'weixin'
					},
					{
						name: '分享到微信朋友圈',
						id: 'weixin',
						type: 'WXSenceTimeline'
					},
				];
			},
			appLogin() {
				console.log('hehe');
				uni.navigateTo({
					url:'/pages/user/login'
				});
			},
			// 分享好友
			shareFriends() {
				console.log('heheere');
				let menus = this.bottomData;
				bottomImageMenu = new BottomImageMenu(menus, (menu, index) => {
					console.log('menu',menu, 'index', index);
				});
				bottomImageMenu.show()
			},
			change() {
				
			},
			editProfile() {
				// 判断用户是否已经登录
				if(this.level < 1) {
					uni.navigateTo({
						url:'/pages/user/login'
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/user/profile'
				});
			},
			getUserInfo() {
				// 获取的用户头像昵称,绑定手机号等
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=check_app_user";
				let uid = util.cache('app_userid', null);
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
						console.log('userINfo uid', userInfo);
						if(userInfo.uid) {
							let type = util.cache('appLoginType', null);
							this.setUserInfo(userInfo);
							util.cache('app_user_info_'+type, JSON.stringify(userInfo), 15*24*3600);
							let globalData = getApp().globalData;
							globalData.isRecharge = 0;
						}
					}
				});
			},
			//#endif
			//#ifdef MP-WEIXIN 
			showPhoneNumberModal(e) {
				console.log('showPhoneNumberModal e');
				let userInfo = util.getUserInfoFromStorage();
				if(userInfo) {
					this.$refs.popupDialog.open();
				}
			},
			getUserBindPhone(uid) {
				let globalData = getApp().globalData;
				const apiPrefix = globalData.serverUri;
				const auth = globalData.auth;
				//绑定手机号的逻辑
				const url = apiPrefix + "?mod=user&ac=getphone";
				http.request(url, {
					uid: uid,
					auth:auth,
					filterData: true
				}).then(resp => {
					console.log('resp', resp);
					this.phoneStr = resp.phone;
					// 这里将绑定手机号弹框显示出来,当用户没有授权的时候,同时没有绑定手机号的时候.
					if(!isAuth && !resp.phone) {
						//#ifdef MP-WEIXIN 
						_this.$refs.popupDialog.open();
						//#endif
					}
				});
			},
			bindPhoneNumber(data) {
				console.log('getPhoneNumber', data);
				let globalData = getApp().globalData;
				const apiPrefix = globalData.serverUri;
				const auth = globalData.auth;
				//绑定手机号的逻辑
				const url = apiPrefix + "?mod=user&ac=phone";
				// 从缓存里面获取uid
				let uid = util.cache('wx_userid',null);
				console.log('getPhoneNumber uid',uid, url);
				let bind_type = '';
				//#ifdef MP-WEIXIN
				bind_type = 'wx';
				//#endif
				// 这里获取用户的
				http.request(url, {
					encryptedData:data.encryptedData,
					iv:data.iv,
					uid: uid,
					auth:auth,
					bind_type:bind_type,
					filterData: true
				}).then(resp => {
					console.log('bind resp:', resp);
					if(resp.status == 1) {
						this.phoneStr = resp.phone;
						uni.showToast({
							title:"绑定成功!"
						});
					}
				});
			},
			getUserIsAuth() {
				let _self = this;
				console.log('getUserIsAuth');
				uni.getSetting({
					success(res) {
						console.log('res', res);
						if(res.authSetting['scope.userInfo']) {
							isAuth = true;
						} else {
							isAuth = false;
						}
						console.log('isAuth', isAuth);
					}
				});
			},
			confirm(e) {
				this.$refs.popupDialog.close('center');
				console.log('confirm e', e);
			},
			close(e) {
				console.log('close e', e);
				this.$refs.popupDialog.close('center');
			},
			//#endif
			//#ifdef APP-PLUS
			formatSize() {  
			  	let that = this;  
			  	plus.cache.calculate(function(size) {  
			 	 let sizeCache = parseInt(size);  
			 	 if (sizeCache == 0) {  
			    	 that.fileSizeString = "0B";  
			  	} else if (sizeCache < 1024) {  
			   	  that.fileSizeString = sizeCache + "B";  
			  	} else if (sizeCache < 1048576) {  
			   	  that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";  
			 	 } else if (sizeCache < 1073741824) {  
			    	 that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";  
			 	 } else {  
			    	 that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";  
			 	 }  
				});  
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
			//#endif
			// 关于我们
			about_us_article() {
				uni.navigateTo({
					url:'/pages/user/about_us'
				});
			},
			// 填写个人信息
			personal_info() {
				uni.navigateTo({
					url:'/pages/user/complaint'
				});
			},
			handleComplaint() {
				//this.getUserInfoFromWeixin();
				uni.navigateTo({
					url:'/pages/user/complaint'
				});
			},
			upgrade_vip() {
				uni.navigateTo({
					url:'/pages/user/upgrade_user_vip'
				});
			},
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
			copy_customer_qq() {
				//let qq = '3342315151';
				let qq = this.configData['qq'];
				uni.setClipboardData({
					data: qq,
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
			setUserInfo(userInfo) {
				this.$store.commit('setUserInfo', userInfo);
			},
			login(hideLoading) {
				// 这里需要做登录授权的判断
				if (!hideLoading) {
					uni.showLoading({
						title: '登录中...'
					});
				}
			   // 1.wx获取登录用户code
				this.loginRequest(hideLoading);
			},
			loginRequest(hideLoading) {
				let _this = this;
				let provider = '';
				
				//#ifdef MP-WEIXIN
				provider = 'weixin';
				//#endif
				
				//#ifdef MP-QQ
				provider = 'qq';
				//#endif
				
				uni.login({
					provider: provider,
					success: function(loginRes) {
						let code = loginRes.code;
						//console.log(loginRes);
						if(!hideLoading) {
							uni.hideLoading();
						}
						//非第一次授权获取用户信息
						let data = getApp().globalData;
						const apiPrefix = data.serverUri;
						const auth = data.auth;
						const url = apiPrefix + "?mod=user&ac=wx_user";
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.getUserInfo({
							provider:provider,
							success: (res) => {
								console.log('get UserInfo res:', res);
								let userInfo = res.userInfo;
								//console.log(userInfo);
								let userData = {
										code: code,
										auth: auth,
										nickname: userInfo.nickName,
										avatarurl: userInfo.avatarUrl,
										city: userInfo.city,
										country: userInfo.country,
										gender: userInfo.gender,
										province: userInfo.province
								};
								//#ifdef MP-WEIXIN
								userData.logintype = 'wx';
								//#endif
								
								//#ifdef MP-QQ
								userData.logintype = 'qq';
								//#endif
								console.log('userData', userData);
								uni.request({
									url:url,
									method: 'POST',
									header: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									data:userData,
									success: (resp) => { 
										//openId、或SessionKdy存储//隐藏loading
										console.log(resp);
										resp = resp.data.data;
										console.log('resp', resp);
										if(!resp) {
											return;
										}
										let uid = resp.id;
										userInfo.uid = uid;
										userInfo.level = resp.cid;
										if(resp.start_time) {
											userInfo.start_time = resp.start_time;
										}
										if(resp.end_time) {
											userInfo.end_time = resp.end_time;
										}
										if(resp.openid) {
											userInfo.openid = resp.openid;
										}
										//_this.dates = userInfo.start_time + "~" + userInfo.end_time;
										//console.log('userInfo:', userInfo);
										_this.setUserInfo(userInfo);
										let t = new Date;
										let minutes = 15*3600*24;
										let userInfoStr = JSON.stringify(userInfo);
										util.cache('wx_userinfo', userInfoStr, minutes);
										util.cache('wx_userid', userInfo.uid);
										// 获取用户绑定的手机号码
										//#ifdef MP-WEIXIN
										_this.getUserBindPhone(userInfo.uid);
										//#endif
										
										if(hideLoading) {
											data.isRecharge = 0;
										}
									},
								});
							},
							fail: () => {
								console.log("未授权");
							}
						});
					}
				});
			},
			dialogConfirm(callback) {
				if (typeof callback == 'function') {
					callback();
				}
			},
			dialogClose(callback) {
				if (typeof callback == 'function') {
					callback();
				}
			},
			// 手动授权方法,授权登录的时候,只调用一次
			wxGetUserInfo(e) {
				console.log('get_user_info');
				// 用户未授权
				if(!isAuth) {
					if(!e.detail.userInfo) {
						uni.showModal({
					        title: '警告',
					        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
					        showCancel: false,
					        confirmText: '返回授权',
					        success: function(res) {
					          // 用户没有授权成功，不需要改变 isHide 的值
					          if (res.confirm) {
					            console.log('用户点击了“返回授权”');
					          }
					        }
						});
						return;
					}
				} 
				this.login();
			},
			//#ifdef MP-QQ || APP-PLUS
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
			//#endif
		}
	}
	
</script>

<style>
	
	view {
		display: flex;
	}
	.uni-list {	
		background:rgba(255,255,255,1) !important;
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.01) !important;
		border-radius:20rpx !important;
		/* #ifdef MP-WEIXIN || MP-QQ */
		/*max-height: 360rpx !important;*/
		height: auto;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: auto;
		/*max-height: 432rpx !important;*/
		/* #endif */
	}
	
	
	.uni-list-item {
		padding-left:0rpx  !important;
	}
	
	.uni-list-item__container {
		padding: 10rpx 30rpx !important;
	}
	
	.uni-list-hover {
		background:rgba(255,255,255,1) !important;
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.01) !important;
		border-radius:20rpx !important;
	}
	.uni-popup-dialog {
		flex-direction: column;
	}
	.uni-list-item--hover {
		background:rgba(255,255,255,1) !important;
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.01) !important;
		border-radius:20rpx !important;
	}
	
	.root-view {
		display: flex;
		height: 100%;
		flex-direction: column;
		background: url(../../static/img/index/user_bg.png);
		background-repeat: no-repeat;
		/*background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);*/
		background-size: 750rpx 249.5rpx;
	}
	
	#content-view {
		display: flex;
		flex-direction: column;
		flex-wrap:wrap;
		margin-top:60px;
		min-height:434px;
		justify-content: flex-start;
	}

	#no-login-view {
		display: flex;
		flex-direction: column;
		position: absolute;
		width:686rpx;
		margin-left:32rpx;
		margin-right: 32rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);
		border-radius:10px;
	}

	#header-view {
		display: flex;
		justify-content: center;
		width:100%;
	}
	
	#grant-view {
		height:58px;
	}
	
	.login-btn-avatar {
		height:154.5rpx;
		line-height: 1;
		display: flex;
		margin: 0;
		position: static;
		border: 0;
		background-color:transparent;
		padding:0;
		overflow: auto;
		margin-top:-77.25rpx;
	}
	
	button::after {
		border: none;
		width:0;
		height: 0;
		-webkit-transform:scale(1);
	    transform:scale(1);
	    display: none;
	    background: transparent;
	}

	.login-btn {
		margin-top:20rpx;
		background-color: transparent;
		line-height: 1;
		display: flex;
		border: 0px solid rgba(0,0,0,.2);
		padding-left:0px;
		padding-right:0px;
		border-radius: 0px;
		height:100%;
		width:100%;
		justify-content: center;
		align-items: flex-end;
	}
	
	
	.login-btn::after{
		border: 0px solid #007AFF;
	}
	
	.login-btn>text {
		font-size:18px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	
	.tx-img {
		width:154.5rpx;
		height:154.5rpx;
		border-radius: 50%;
		margin-top:-77.25rpx;
	}
	
	.tx-img-nologin {
		width:154.5rpx;
		height:154.5rpx;
		border-radius: 50%;
	}

	.name,.member-class {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	.name {
		margin-top:18.4rpx;
	}
	.zx {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width:100%;
	}
	
	.member-class {
		height:40rpx;
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:40rpx;
		margin-top:20rpx;
	}
	
	.nickname {
		font-size:30rpx;
		font-family:SourceHanSansSC;
		font-weight:400;
		color:rgba(62,62,62,1);
	}
	
	.li-view,#bottom_list {
		margin-left: 32rpx;
		margin-right: 32rpx;
		background-color: #FFFFFF;
	}
	
	.li-view {
		display:flex;
		width: 686rpx;
		margin-top:137.25rpx;
		position: absolute;
		top:0rpx;
		height:390rpx;
		flex-direction: column;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);
		border-radius:10px;
	}
	
	
	.uni-list-item__extra-text {
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(61,177,242,1) !important;
	}
	
	.uni-dialog-cancel {
		background-color: #EDEDED;
		color: #DD463B;
	}
	
	.uni-dialog-ok {
		background-color: #DA281C;
		color:  #FFFFFF;
	}
	
	#bottom {
		width:750rpx;
		height:656.1rpx;
		margin-top:330rpx;
		background:linear-gradient(270deg,rgba(32,105,231,1) 0%,rgba(72,134,238,1) 100%);
	}
	
	#bottom_list {
		margin-top: 130rpx;
		display:flex;
		flex-direction: column;
		height:142.9rpx;
		/*box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);*/
		border-radius:10px 10px 10px 10px;
		width:686rpx;
	}	
	
	.bottom-version-text {
		color:  #bbb;
	}
	
	#app-bottom_list {
		margin-left: 32rpx;
		margin-right: 32rpx;
		border-radius: 10px 10px 10px 10px;
		width: 686rpx;
	}
	
	#app-bottom {
		background: linear-gradient(270deg,rgba(32,105,231,1) 0%,rgba(72,134,238,1) 100%);
		/*position: relative;*/
		margin-top:330rpx;
		height: 656.1rpx;
	}
</style>
