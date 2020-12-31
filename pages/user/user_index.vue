<template>
	<view id="root-view">
		<u-navbar :is-back="false" :titleSize="32"  title="个人中心" :borderBottom="true" :isFixed="true"  :zIndex="10000000000000001">			
			<template v-slot:right="">
				<view class="slot-wrap" @tap="getNoticeList">
					<u-icon name="email" size="40"></u-icon>
					<u-badge :count="notice_num" size="mini" :offset="[11, 11]"></u-badge>
					<!--
					<view class="notice-num">99+</view>
					-->
				</view>
			</template>
		</u-navbar>
		
		<!-- 正式发布的时候。注释掉这段 -->
		<view v-if="(isInternalUser && uid>0) || (uid == 215)" id="test-account" @tap="gotoUserList">
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
						<template v-slot:right="" v-if="index == 4|| index == 6">
							<!-- @tap="copy_customer_wechat" -->
							
							<view style="display: flex;align-items: center;" v-if="index == 4">
								<text class="copy-text">{{wx}} </text>
								<button class="copy-btn">复制</button>
							</view>
							<view  v-if="index == 6">
								<text class="copy-text">{{fileSizeString}}</text>
							</view>
						</template>					
					</uni-list-item>
				</uni-list>
			</view>
			<view>
				<u-modal v-model="showCopyModal" confirm-text="确定" :show-title="false" :mask-close-able="true" :showCancelButton="false"  :zIndex="100001">
					<view id="modal-img">
						<image src="../../static/img/user/customer.png" style="width:50px;height:50px;"></image>
					</view>
					<view class="slot-content">
						<text>已复制客服微信,请前往微信添加</text>
					</view>
				</u-modal>
			</view>
		</view>
		
		<view id="logout-view" @tap="logout" v-if="uid">
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
		<u-no-network></u-no-network>
		
	</view>
</template>

<script>
	
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	
	let bottomImageMenu;
	
	export default {
		onLoad(option) {
			this.getConfig();
			console.log('onLoad...');
			// 计算页面整体高度,然后计算高度
			let sysinfo = uni.getSystemInfoSync();
			let width = sysinfo.windowWidth;
			let winHeight    = sysinfo.windowHeight;
			//this.nextTop = winHeight - 60;
			/*let radix = 750/width; 
			let h     = radix * winHeight;*/
			const  n = this.list.length;
			console.log('n'+n);
			this.fileSizeString = this.formatSize();
			let m = 180+50+31+57+94+73+20;
			const p = getApp().globalData.platform;
			const extraH = winHeight - uni.upx2px(m) -45-30-sysinfo.statusBarHeight - (p == 1? 58: 54);
			const b = Math.floor(extraH/n);
			this.height = b;
			//this.height = 45;
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
			if(globalData.isRecharge == 1 && this.uid) {
				this.getUserInfo();
			}
			//#endif
			if(this.uid) {
				//this.getUserInfo();
				this.getUserStats();
			}
			if ((this.isInternalUser && this.uid>0) || (this.uid == 215)) {
				this.getUserInfo();
			}
			console.log('onShow...');
			this.getNoticeInfo();
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
			uniPopupDialog,
		},
		computed:{
			isInternalUser: function() {
				let u = this.$store.getters.isInternalUser;
				return u;
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
				const u = this.userInfo;
				if(u.uid) {
					return u.uid;
				}
				let uid = util.cache('app_userid', null);
				console.log('uid', uid);
				return uid ? uid: 0;
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
				console.log('appDates: userInfo', userInfo);
				if(!userInfo) return '';
				let dateStr = '';
				if(userInfo.level ==1) {
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
			}
		},
		data() {
			let _self = this;
			let midList = [
				{
					num: 0,
					title: '我发布的',
					tap() {
						const flag = _self.requireLogin();
						if(!flag) {
							return;
						}
						uni.navigateTo({
							url:'/pages/user/user_asklist?tab=0'
						});
					}
				},
				{
					num: 0,
					title: '收藏文章',
					tap() {
						const flag = _self.requireLogin();
						if(!flag) {
							return;
						}
						uni.navigateTo({
							url:'/pages/user/user_asklist?tab=1'
						});
					}
				},
				{
					num: 0,
					title: '收藏问答',
					tap() {
						const flag = _self.requireLogin();
						if(!flag) {
							return;
						}
						uni.navigateTo({
							url:'/pages/user/user_asklist?tab=2'
						});
					}
				},
				{
					num: 0,
					title: '未读评论',
					tap() {
						const flag = _self.requireLogin();
						if(!flag) {
							return;
						}
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
				fileSizeString: '',
				notice_num: '',
				isFixed: true,
				showCopyModal: false,
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
			async getNoticeInfo() {
				// 从接口中获取的通知列表...
				let data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const url = apiPrefix+'?mod=tz&ac=list';
				const s = 1;
				const t  = util.cache('notice_list_nid', null);
				const res= await http.request(url, {
					auth: auth,
					nid: t?t:0,
					filterData: true
				});
				console.log('res', res);
				if (res.status == 1) {
					// 缓存最后一次的时间
					util.cache('notice_list_nid', res.next_nid);
					//缓存列表相关数据
					// 对list 数据,进行append操作...
					// 更改list 数据中的isRead 值...
					let list = res.data;
					list = this.setIsReadValue(list);
					let noticeList = util.cache('notice_list', null);
					if(noticeList) {
						noticeList = noticeList ? JSON.parse(noticeList): [];
						list = list.concat(noticeList);						
					} else {
						
					}
					util.cache('notice_list', JSON.stringify(list));
					console.log('notice_list', list);
					//缓存数目,进行增减
					let unreadCnt = util.cache('notice_unread_cnt', null);
					let unreadStr = '';
					if (unreadCnt) {
						unreadCnt = parseInt(unreadCnt) + parseInt(res.total);
						if ( unreadCnt>99 ) {
							unreadStr = '99+';
						} else {
							unreadStr = unreadCnt;
						}
					} else {
						unreadCnt = unreadStr = parseInt(res.total);
					}
					util.cache('notice_unread_cnt', unreadCnt);
					console.log('unreadStr', unreadStr);
					this.notice_num = unreadStr;
				} else {
					let unreadCnt = util.cache('notice_unread_cnt', null);
					this.notice_num = unreadCnt;	
				}
			},
			setIsReadValue(noticeList) {
				const len = noticeList.length;
				for(let s = 0;s<len;s++) {
					// 设置未读
					noticeList[s].isRead = 0;
				}
				return noticeList;
			},
			setInternalUser(isInternalUser) {
				console.log('isInternalUser11111-----', isInternalUser);
				this.$store.commit('setInternalUser', isInternalUser);
			},
			copy_customer_wechat() {
				//let weichat = '';
				let weichat = this.configData['weixin'];
				console.log('this.configData', this.configData);
				console.log('weichat:'+weichat);
				const _self  = this;
				weichat = weichat.split('微信')[1];
				console.log('weichat', weichat);
				uni.setClipboardData({
					data: weichat,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								console.log('res', res);
								_self.showCopyModal = true;
							}
						});
					}
				});
			},
			getNoticeList() {
				// 获取通知列表
				uni.navigateTo({
					url: '/pages/user/notice_list'
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
				console.log('type'+type);
				uni.removeStorageSync('app_user_info_'+type);
				console.log('logout...');
				uni.removeStorageSync('app_userid');
				// 清除缓存中的值
				this.setInternalUser(0);
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
				uni.getStorageInfo({
					success(res) {
						//console.log(res.keys);
						//console.log(res.limitSize);
						let size = res.currentSize;
						if (size < 1024) {
							fileSizeString = size + ' B';
						} else if (size/1024>=1 && size/1024/1024<1) {
							fileSizeString = Math.floor(size/1024*100)/100 + ' KB';
						} else if (size/1024/1024>=1) {
							fileSizeString = Math.floor(size/1024/1024*100)/100 + ' M';
						}
					}
				})
				return fileSizeString;
			},
			clearCache() {  
				let that = this;  
				uni.showModal({
					title:'提示',
					content:'确定清除缓存吗?',
					confirmText:'立即清除',
					success(res) {
						if(res.confirm){
							uni.clearStorageSync();
							//重新获取并显示清除后的缓存大小
							//that.getStorageSize();
							that.fileSizeString = that.formatSize();
							uni.showToast({
								title:'清除成功'
							})
						}
					}
				});
			},
			requireLogin() {
				console.log('requireLogin...');
				if(!this.uid) {
					uni.showToast({
						title:'请先登录',
						icon:'none',
						duration:1000,
						complete() {
							uni.navigateTo({
								url:'/pages/user/login_v2'
							});
						}
					})
					return false;
				}
				return true;
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
							//console.log('this', this);
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
				const payScore = {
					id: 2,
					title: '积分管理',
					thumb: '../../static/img/score/score_week_icon.png',
					tap() {
						if(!_self.level) {
							uni.navigateTo({
								url: '/pages/user/login_v2'
							});
							return;
						}
						// 已登录,跳转到一对一
						uni.navigateTo({
							url:'/pages/user/score_list'
						});
					}
					
				};
				const courseStudyLog = {
					id: 3,
					title: '课程记录',
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
							url:'/pages/course/course_study_log'
						});
					}
				};
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
					payScore,
					courseStudyLog,
					{
						id: 4,
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
						id: 5,
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
						id: 6,
						title: '微信客服',
						thumb: '../../static/img/user/wx_customer.png',
						tap() {
							_self.copyWx();
						}
					},
					{
						id: 7,
						title: '分享好友',
						thumb: '../../static/img/user/share_wx_friends.png',
						tap() {
							_self.shareFriends();
						}
					},
					{
						id: 8,
						title: '缓存清理',
						thumb: '../../static/img/user/cache_clear.png',
						tap() {
							_self.clearCache();
						}
					},
				];
				if(this.level == 0) {
					config.splice(0, 3);
					return config;
				} else {
					return config;
				}
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
			},
			copyWx() {
				//let qq = '3342315151';
				if(!this.configData.weixin) {
					return;
				}
				let _self = this;
				console.log('this.configData', this.configData);
				const wx = this.configData['weixin'];
				const weichat = wx.split('微信')[1];
				console.log('weichat', weichat);
				uni.setClipboardData({
					data: weichat,
					success: (res) => {
						uni.hideToast();
						//console.log('hehe soga!', res);
						uni.getClipboardData({
							success: (res2) => {
								_self.showCopyModal = true;
							}
						});
					}
				});	
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	/deep/ .u-line-1 {
		font-weight: 800 !important;
	}
	.slot-wrap {
		padding-right: 32rpx !important;
		padding-left: 80rpx;
		display: flex;
	}
	
	.page-title {
		text-align: center;
		font-weight: bolder;
	}
	
	.notice-num {
		margin-top:-10px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background-color: red;
		line-height: 13px;
		font-size: 6px;
		color:#FFFFFF;
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
			background: url(../../static/img/user/con_vip_link.png);
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

.slot-content {
	display:flex;justify-content: center;
	padding-top:20px;
	padding-bottom:20px;
}
#modal-img {
	display:flex;justify-content: center;
	padding-top:20px;
}
</style>
