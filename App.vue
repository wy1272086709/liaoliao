<script>
import http from './common/http.js';
import util from './common/util.js';
let debug = true;

export default {
	onLaunch: function() {
		let s1 = new Date();
		console.log('Launch start1:', s1.getTime());
		//#ifdef APP-PLUS
		plus.screen.lockOrientation('portrait'); //锁死屏幕方向为竖屏  
		let global = {};
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			global.version = inf.version;
			console.log('global'+global.version);
		});
		console.log('version:'+plus.runtime.version+',code:'+plus.runtime.versionCode);
		console.log('global:'+JSON.stringify(global));
		//#endif
	
		let _self = this;
		console.log('on Launch!');
		const res = uni.getSystemInfoSync();	      
		console.log('res', res);
		let modelmes = res.model;
		let platform = res.platform.toLowerCase();
		
		//android: 安卓, ios: IOS, devtools:PC
		if (platform == 'android' || platform == 'devtools' ) {
			_self.globalData.platform = 1;	
		} else if(platform == 'ios'){
			_self.globalData.platform = 2;
		}
		if (modelmes.search('iPhone X') != -1 || modelmes.search('iPhoneX')!=-1) {
		  _self.globalData.isIphoneX = true;
		}
		 
		 //#ifdef APP-PLUS
		switch (platform) {
			case 'android':
				//console.log('运行Android上') 
				plus.navigator.closeSplashscreen();
				break;
			case 'ios':
				//console.log('运行iOS上') 
				plus.navigator.closeSplashscreen();
				break;
			default:
				//console.log('运行在开发者工具上') 
				break;
		}
		//#endif
		
		//#ifdef APP-PLUS
		plus.globalEvent.addEventListener('newintent', (e)=>{    
		    let args= plus.runtime.arguments;    
			console.log('args:'+JSON.stringify(args));
		});
		this.checkAppUpdate();
		//#endif
		
		uni.setStorageSync('modelmes', modelmes);
	},
	methods:{
		async checkAppUpdate() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, async (widgetInfo) => {
				const p = this.globalData.platform;
				const url = this.globalData.serverUri;
				const auth = this.globalData.auth;
				const suffix = '?';
				/*const res = await http.request(  
					url+suffix,
					{  
						auth: auth,
						version:  widgetInfo.version, // 应用版本号 （资源包版本）                
						platform: p
					}   
				);  */
				console.log('result');
				this.downloadApp();
			});   
			// #endif
		},
		downloadApp(res) {
			//const data = res.data;
			const data = {
				isUpdate: true,
				path:     'http://kuxou.com/upload1/20210113/__UNI__AC0B737.wgt'
			};
			const _self = this;
			uni.showModal({
				title: '提示',
				content:'检测到最新包,是否升级到最新版本?',
				complete() {
					_self.confirmDownload(data);
				}
			});
		},
		confirmDownload(data) {
			const p = this.globalData.platform;
			// 更新包
			if (data.isUpdate) {
				if (p == 1) {
					console.log('data.data.path',data.path)
					uni.downloadFile({ // 下载资源包
						url: data.path,  
						success: (downloadResult) => { 
							console.log('downloadResult',downloadResult)
							if (downloadResult.statusCode === 200) {  
								plus.runtime.install(downloadResult.tempFilePath, { // 安装资源包 
									force: false  
								}, () => {  
									console.log('install success...');  
									plus.runtime.restart(); // 重启APP  
								}, (e) => {  
									console.error('install fail...');  
								});  
							}  
						}  
					}); 
				} else {
					// IOS 包,跳转到应用市场
					plus.runtime.openURL(data.path);
				}
			}
		}
	},
	onShow: function() {
		//#ifdef APP-PLUS
		let args= plus.runtime.arguments;  
		console.log('args:'+JSON.stringify(args));
		this.checkAppUpdate();
		if (args.pathName!='') {  
			if (args.pathName == 'pages/mind_square/ask-ques-list') {
				// 处理args参数，如直达到某新页面等  
				const nidStr = args.nid;
				const url = '/pages/mind_square/ask-ques-list?nid='+nidStr;
				uni.navigateTo({
					url:  url
				});
			}
		}
		//#endif
	},
	onHide: function() {
		console.log('App Hide');
		// 退出的时候,将课程学习进度信息,进行持久化
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

<style lang="scss">
@import "uview-ui/index.scss";

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */



</style>
