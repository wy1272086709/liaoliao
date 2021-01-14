//import zaudio from './zaudio.vue';
//import store from './store.js';
export default {
	install(Vue) {
		// #ifndef H5
		//var ZAudioCtx = uni.getBackgroundAudioManager()
		// #endif
		// #ifdef H5
		//Vue.component('zaudio', zaudio)
		//var ZAudioCtx = uni.createInnerAudioContext()
		// #endif
		
		
		//Vue.prototype.$audio = ZAudioCtx;

		/*if (!store) {
			return
		}*/
		
		//////////////////此处为app端 判断电话来电后, 音频意外中断之后的继续播放
		// #ifdef APP-PLUS
		/*try {
			if (uni.getSystemInfoSync().platform == 'android') {

				var main = plus.android.runtimeMainActivity();
				var Context = plus.android.importClass("android.content.Context");

				var telephonyManager = plus.android.importClass("android.telephony.TelephonyManager");

				var telephonyManager = plus.android.runtimeMainActivity().getSystemService(Context.TELEPHONY_SERVICE);
				
				var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
					onReceive: function(context, intent) { //实现onReceiver回调函数  
						plus.android.importClass(intent);
						console.log(intent.getAction());
						//var telephonyManager = plus.android.importClass("android.telephony.TelephonyManager");
						console.log('1111');
						var telephonyManager = plus.android.runtimeMainActivity().getSystemService(Context.TELEPHONY_SERVICE);
						var phonetype = telephonyManager.getCallState();
						console.log('2222');
						var phoneNumber = intent.getStringExtra(telephonyManager.EXTRA_INCOMING_NUMBER);
						console.log('gaudioctx'+JSON.stringify(gaudioctx));
						console.log("phonetype:" + phonetype);
						console.log("phoneNumber:" + phoneNumber);
						if (phonetype == 0 && !store.state.n_pause) {
							// 停止音频播放
							ZAudioCtx.pause();
							//gaudioctx.pause();
							store.state.n_pause = true;
						}
						else if (phonetype == 0 && store.state.n_pause) {
							store.state.n_pause = false;
							ZAudioCtx.play();							
							//gaudioctx.play();
						}
					}
				});
				var IntentFilter = plus.android.importClass('android.content.IntentFilter');
				var filter = new IntentFilter();
				filter.addAction(telephonyManager.ACTION_PHONE_STATE_CHANGED); //监听开关  
				main.registerReceiver(receiver, filter); //注册监听 

			} else if (uni.getSystemInfoSync().platform == 'ios') {
				var callstatus = false
				var CTCall = plus.ios.importClass('CTCall');
				var CTCallCenter = plus.ios.importClass('CTCallCenter');
				var center = new CTCallCenter();
				center.init()
				center.setCallEventHandler(function(ctCall) {
					console.log('=============', ctCall)
					callstatus = !callstatus
					if (!callstatus && !store.state.n_pause) {
						gaudioctx.play()
					} else {
						gaudioctx.pause()
					}
				})
			}
			
			//this.initAudioEvents();
		} catch (err) {
			console.log(err)
		}*/

		// #endif
	}
}
