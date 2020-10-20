<script>
import http from './common/http.js';
import util from './common/util.js';
let debug = true;

export default {
	onLaunch: function() {
		// #ifdef APP-PLUS
		plus.screen.lockOrientation = 'portrait-primary';
		// #endif
		let _self = this;
		console.log('on Launch!');
		uni.getSystemInfo({
		      success: res => {
				console.log('res', res);
		        let modelmes = res.model;
				let platform = res.platform.toLowerCase();
				//android: 安卓, ios: IOS, devtools:PC
				if (platform == 'android'  || platform == 'devtools') {
					_self.globalData.platform = 1;	
				} else if(platform == 'ios' ){
					_self.globalData.platform = 2;
				}
		        if (modelmes.search('iPhone X') != -1) {
		          _self.globalData.isIphoneX = true;
		        }
				
		        uni.setStorageSync('modelmes', modelmes)
		      }
		});
	},
	methods:{
		checkAppUpdate() {
			// #ifdef APP-PLUS
			let global = {};
			plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				global.version = inf.version;
			});
			// 锁定屏幕方向
			// plus.screen.lockOrientation('portrait-primary'); //锁定
			// 检测升级
			let self = this;
			uni.getSystemInfo({
				success: function(res) {
					self.platform = res.platform;
									// 获取系统平台 ios 安卓  以后可能有鸿蒙系统
				}
			});
			let data = {
				// 系统版本
				version: global.version,
				// 系统平台
				os: this.platform
			};
			let url = global.host + '/api/update/checkversion';
			uni.request({
				url: url, //检查更新的服务器地址
				// dataType:"GET",
				data: data,
				success: res => {
					if (res.data.code == 1 && res.data.isUpdate) {
						// 提醒用户更新
						uni.showModal({
							content: res.data.note ? res.data.note : '是否更新',
							success: showResult => {
								if (showResult.confirm) {
									plus.runtime.openURL(res.data.data.url);
								}
							}
						});
					}
				}
			});
			// #endif
		},
		/**
		  * 下载小程序新版本并重启应用
		  */
		downLoadAndUpdate(updateManager) {
		    uni.showLoading();
		    //静默下载更新小程序新版本
		    updateManager.onUpdateReady(function () {
		      uni.hideLoading();
		      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		      updateManager.applyUpdate();
		    });
		    updateManager.onUpdateFailed(function () {
		      // 新的版本下载失败
		      uni.showModal({
		        title: '已经有新版本了哟~',
		        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
		      });
		    });
		},
		updateVersion() {
			let manager = uni.canIUse('getUpdateManager');
			if (manager) {
				console.log('updateVersion');
				const updateManager = uni.getUpdateManager();    // 获取更新管理器对象
				let _self = this;
				updateManager.onCheckForUpdate(function(res){
					console.log('updateVersion res', res);
					if(res.hasUpdate) {
						updateManager.onUpdateReady(function(){
							uni.showModal({
								title:'更新提示',
								content:'新版本已经准备好，点击确定重新启动',
								showCancel:false,
								success:res=>{
									if(res.confirm){
										_self.downLoadAndUpdate(updateManager);
									} else if(res.cancel) {
										//#ifdef MP-WEIXIN
										uni.showModal({
										  title: '温馨提示~',
										  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
										  showCancel:false,//隐藏取消按钮
										  confirmText:"确定更新",//只保留确定更新按钮
										  success: function(res) {
											if (res.confirm) {
											  //下载新版本，并重新应用
											  _self.downLoadAndUpdate(updateManager)
											}
										  }
										});
										//#endif
									}
								}
							})
						});
						updateManager.onUpdateFailed(function(){
							uni.showModal({
								title:'提示',
								content:'检查到有新版本，但是下载失败，请检查网络设置',
								showCancel:false
							});
						});
					}
				});
			}
		}
	},
	onShow: function() {
		//#ifdef MP-WEIXIN || MP-QQ
		let userInfoStr = util.cache('wx_userinfo');
		let minutes = 15*24*3600;
		util.cache('wx_userinfo', userInfoStr, minutes);
		console.log('App Show');
		
		//#endif
		
		
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData: {
		//serverUri: "https://www.kuwoi.com/index.php",
		serverUri: "https://kuxou.com/index.php",
		hostUrl: 'https://kuxou.com',
		isRecharge: 0, // 是否通过充值返回个人中心...
		auth: '376b66f9bedd4622522dce742adaaebc',
		platform: 0,
		// APP 手机号登录默认为1,
		// APP 微信登录默认为2,QQ登录默认为3
		appLoginType: 1
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
