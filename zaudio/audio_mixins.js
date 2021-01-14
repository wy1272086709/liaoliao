import { mapMutations, mapGetters } from 'vuex';
import http from '../common/http.js';
import util from '../common/util.js';
export default  {
	name: 'audio_mixins',
	computed:{
		...mapGetters(['playinfo', 'userInfo']),
		uid: function() {
			const u = this.userInfo;
			if(u.uid) {
				return u.uid;
			}
			let uid = util.cache('app_userid', null);
			console.log('uid', uid);
			return uid ? uid: 0;
		},
	},
	methods: {
		...mapMutations(['set_playinfo', 'set_pause', 'set_n_pause']),
		initAudioEvents() {
			console.log('this.format'+this.format);
			this.$audio.onCanplay(() => {});
			this.$audio.onPlay(() => {
				console.log('this.audio:'+JSON.stringify(this.$audio));
				// #ifdef APP-PLUS || H5
				this.set_playinfo({
					duration: this.format(this.$audio.duration),
					duration_value: this.$audio.duration
				});
				console.log('audio minxins:'+JSON.stringify(this.playinfo));
				const { src, duration_value, current_value, fromLog } = this.playinfo;
				console.log('src'+src+','+this.$audio.src);
				if((fromLog && current_value!=duration_value)) {
					this.$audio.startTime = parseFloat(current_value);
					this.$audio.seek(parseFloat(current_value));
					console.log('current_value:'+current_value+',parseFloat(current_value)'+parseFloat(current_value));
					
				}
				// #endif
				console.log('this.$audio.duration', this.$audio.duration);
				this.set_pause(false);
				this.set_n_pause(false);
			});
			this.$audio.onPause(() => {
				console.log('pause');
				this.set_pause(true);
				const current_value = this.playinfo.current_value;
				const duration_value= this.playinfo.duration_value;
				if (!this.$audio.paused) {
					this.updatePlayProgress(current_value, duration_value)
				}
			});
			this.$audio.onStop(() => {
				console.log('stop');
				this.set_pause(true);
				const current_value = this.playinfo.current_value;
				const duration_value= this.playinfo.duration_value;
				this.updatePlayProgress(current_value, duration_value);
			});
			this.$audio.onEnded(() => {
				this.set_pause(true);
				this.$audio.startTime = 0;
				console.log('ended');
				this.set_playinfo({
					current: this.format('0'),
					current_value: '0'
				});
				this.$audio.startTime = 0;
				this.$audio.seek(0);
				
				const current_value = 0;
				const duration_value= this.playinfo.duration_value;
				this.updatePlayProgress(current_value, duration_value)
				//续播
				if (this.continue) {
					//this.changeplay(1);
				}
			});
			this.$audio.onTimeUpdate(() => {
				console.log('this.$audio.currentTime:'+this.$audio.currentTime);
				this.set_playinfo({
					current: this.format(this.$audio.currentTime),
					current_value: this.$audio.currentTime
				});
				// #ifndef APP-PLUS
				if (this.$audio.duration != this.playinfo.duration_value) {
					this.set_playinfo({
						duration: this.format(this.$audio.duration),
						duration_value: this.$audio.duration
					});
				}
				// #endif
			});
			this.$audio.onWaiting(()=> {
				console.log('waiting...');
			});
			this.$audio.onError(() => {
				this.set_pause(true);
				uni.showToast({
					title: '音频播放错误',
					duration: 1500,
					mask: false,
					icon: 'none',
					position: 'center'
				});
				this.set_playinfo({
					current: 0,
					current_value: 0,
					duration: 0,
					duration_value: 0,
					title: '',
					src: ''
				});
				this.updatePlayProgress(0, this.playinfo.duration_value);
			});
		
			this.appCheckReplay(this.$audio, this.store);
		},
		
		//app端判断电话来电后, 音频意外中断之后的继续播放
		appCheckReplay(audioctx, store) {
			// #ifdef APP-PLUS
			try {
				if (uni.getSystemInfoSync().platform == 'android') {
					var main = plus.android.runtimeMainActivity();
					var Context = plus.android.importClass("android.content.Context");
					var telephonyManager = plus.android.importClass("android.telephony.TelephonyManager");
					var telManager = plus.android.runtimeMainActivity().getSystemService(Context.TELEPHONY_SERVICE);
					var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
						onReceive: function(context, intent) { //实现onReceiver回调函数  
							plus.android.importClass(intent);							
							var phonetype = telManager.getCallState();
							var phoneNumber = intent.getStringExtra(telephonyManager.EXTRA_INCOMING_NUMBER);
							console.log('phoneNumber:'+getPhoneNumber);
							// 电话状态 0->空闲状态 1->振铃状态 2->通话存在
							switch (phonetype) {
								case 0:
								console.log('hehehe');
								console.log('aaa')
								break;
								case 1:
								console.log('bbb')
								break;
								case 2:
								console.log('ccc')
								break;
							}
							if (phonetype == 0 && !store.state.n_pause) {
								audioctx.play()
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
					center.setCallEventr(function(ctCall) {
						callstatus = !callstatus
						if (!callstatus && !store.state.n_pause) {
							audioctx.play()
						} else {
							audioctx.pause()
						}
					})
				}
			} catch (err) {
				console.log(err)
			}
			// #endif
		},
		
		// 更新播放进度
		async updatePlayProgress(current_value, duration_value) {
			const data = getApp().globalData;
			const apiPrefix = data.serverUri;
			const auth      = data.auth;
			const url       = data.serverUri+'?mod=product&ac=jd_log'
			const params = {
				auth: auth,
				nid: this.playinfo.id,
				uid: this.uid,
				cid: 2,
				jdsc: current_value,
				zsc:  duration_value,
				version: 'v2',
				filterData: true
			};
			const resp = await http.request(url, params);
			console.log('params:'+JSON.stringify(params));
			console.log('resp:'+JSON.stringify(resp));
		}
	}
}