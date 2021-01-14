/**
 * options参数
 * @param store         <Object>   vuex实例化的store
 * @param defaultCover  <String>   音频默认海报
 * @param continuePlay  <Boolean>  继续播放
 * @param autoPlay      <Boolean>  自动播放
 */

/**
 * @method onError       错误播放时回调
 * @method onPlaying     播放时回调
 * @method onCanplay     可以播放回调
 * @method onPlay        开始播放回调
 * @method onPause       暂停回调
 * @method onStop        暂停回调
 * @method onEnded       结束回调
 * @method setRender     指定音频, 渲染到zaudio组件
 * @method syncRender    同步并渲染当前的播放状态
 * @method operate       播放或暂停指定索引的音频
 * @method setAudio		 覆盖设置音频列表
 * @method updateAudio   添加音频列表
 * @method stop          暂停当前播放音频
 * **/
import {
	formatSeconds as format
} from './util.js';



export default class ZAudio {
	constructor(options) {
		let {
			defaultCover = '',
				store = null,
				autoPlay = false,
				continuePlay = true,
				onError = null,
				onPlaying = null,
				onPlay = null,
				onCanplay = null,
				onPause = null,
				onStop = null,
				onEnded = null
		} = options;


		if (!store) {
			throw Error('请先配置store')
			return
		}
		if (this.audioCtx) return

		this.store = store;
		this.defaultCover = defaultCover;
		this.autoPlay = autoPlay;
		this.continuePlay = continuePlay;

		this.onPlaying = onPlaying;
		this.onCanplay = onCanplay;
		this.onPlay = onPlay;
		this.onPause = onPause;
		this.onStop = onStop;
		this.onEnded = onEnded;
		this.onError = onError;

		this.init();


	}
	init() {

		// #ifndef H5
		var audioCtx = uni.getBackgroundAudioManager()
		// #endif

		// #ifdef H5
		var audioCtx = uni.createInnerAudioContext()
		audioCtx.autoplay = this.autoPlay
		// #endif

		this.audioCtx = audioCtx;
	
		this.audioCtx.onCanplay(this.onCanplayHandle.bind(this))
		this.audioCtx.onPlay(this.onPlayHandle.bind(this))
		this.audioCtx.onPause(this.onPauseHandle.bind(this))
		this.audioCtx.onStop(this.onStopHandle.bind(this))
		this.audioCtx.onEnded(this.onEndedHandle.bind(this))
		this.audioCtx.onTimeUpdate(this.onTimeUpdateHandle.bind(this))
		this.audioCtx.onError(this.onErrorHandle.bind(this))

		// #ifndef H5
		/*setTimeout(()=>{
			const info = this.store.getters.playinfo;
			console.log('start:'+JSON.stringify(info));
			if (info.isContinue) {
				this.stepPlay(0);
			} 
			if (info.fromLog) {
				this.logPlay();
			}
			else if (this.autoPlay || !info.isContinue) {
				this.operate();
			}
		}, 500)*/
		// #endif
		

		this.appCheckReplay(this.audioCtx, this.store)
	}

	onCanplayHandle() {
		typeof this.onCanplay === 'function' && this.onCanplay();
	}
	onPlayHandle() {
		const info = this.store.getters.playinfo;
		uni.setStorageSync('audio_play_id', info.id);
		const {
			src: renderSrc,
			title: renderTitle,
			singer: renderSinger,
			coverImgUrl: renderCoverImgUrl
		} = info;

		// #ifdef APP-PLUS
		this.commitStore("set_playinfo", {
			duration: format(this.audioCtx.duration),
			duration_value: this.audioCtx.duration
		});
		// #endif
		this.commitStore("set_pause", false)
		this.commitStore("set_n_pause", false)

	}
	onPauseHandle() {
		this.commitStore("set_pause", true)
		typeof this.onPause === 'function' && this.onPause();
	}
	onStopHandle() {
		this.tore.commit("set_pause", true)
		typeof this.onStop === 'function' && this.onStop();
	}
	onEndedHandle() {
		this.commitStore("set_pause", true);
		this.audioCtx.startTime = 0;
		this.commitStore("set_playinfo", {
			current: format('0'),
			current_value: '0'
		})

		typeof this.onEnded === 'function' && this.onEnded();

		//续播
		if (this.continuePlay) {
			//this.changeplay(1);
		}

	}
	onTimeUpdateHandle() {
		let {
			
			playinfo
		} = this.store.getters;
		// 理解为上一次的播放url 与这次播放url 是否相同
		const curPlayId = uni.getStorageSync('audio_play_id');
		// 不同,则重新播放
		const renderIsPlay = playinfo.id == curPlayId;
		if (renderIsPlay) {
			this.commitStore("set_playinfo", {
				current: format(this.audioCtx.currentTime),
				current_value: this.audioCtx.currentTime
			})

			// #ifndef APP-PLUS
			if (this.audioCtx.duration != playinfo.duration_value) {

				this.commitStore("set_playinfo", {
					duration: format(this.audioCtx.duration),
					duration_value: this.audioCtx.duration
				})
			}
			// #endif
		}

		typeof this.onPlaying === 'function' && this.onPlaying(playinfo);

	}
	onErrorHandle() {
		this.commitStore("set_pause", true)

		/*this.commitStore("set_render", {
			src: '',
			title: '',
			singer: '',
			coverImgUrl: ''
		})*/
		this.commitStore("set_playinfo", {
			current: 0,
			current_value: 0,
			duration: 0,
			duration_value: 0,
			title: '',
			src: ''
		});
		typeof this.onError === 'function' && this.onError();
	}
	//设置store
	commitStore(action, data) {
		this.store.commit(action, data)
	}


	//快进
	seek(value) {
		this.audioCtx.seek(value)
		this.audioCtx.startTime = parseFloat(value);
	}

	//快进,退
	stepPlay(value) {
		let {
			playinfo
		} = this.store.getters;
		const curPlayId = uni.getStorageSync('audio_play_id');
		// 不同,则重新播放
		const renderIsPlay = playinfo.id == curPlayId;
		const v = value || 0;
		if (renderIsPlay) {
			const pos = playinfo.current_value + v;
			this.seek(pos);
			this.audioCtx.play();
		}
	}
	
	//暂停播放
	stop() {
		
		this.audioCtx.pause();
		this.commitStore('set_pause', true)
		this.commitStore('set_n_pause', true)
		return
	}
	
	controlPlay(status) {
		if (status) {
			let {
				playinfo
			} = this.store.getters;
			this.audioCtx.src = playinfo.src;
			const pos = playinfo.current_value;
			this.audioCtx.play();
			this.seek(pos);
		} else {
			this.stop();
		}
	}
	
	// 从日志中进来的,总是从指定的位置播放
	logPlay() {
		const { fromLog,  current_value, src } = this.store.getters.playinfo;
		if (fromLog) {
			this.audioCtx.src = src;
			this.audioCtx.play();
			this.audioCtx.startTime = parseFloat(current_value);
			this.audioCtx.seek(parseFloat(current_value));
			this.commitStore('set_pause', false)
		}
	}
	
	//播放,暂停事件判断, 
	//播放数据与渲染数据相同时: 播放->暂停, 暂停->播放
	//播放数据与渲染数据不相同时: 播放渲染音频
	operation() {
		console.log('getters;'+JSON.stringify(this.store.getters));
		const {
			id,
			duration,
			current,
			duration_value,
			current_value,
			singer,
			coverImgUrl,
			src,
			fromLog,
			isContinue,
			title
		} = this.store.getters.playinfo;
		if (!src) {
			return;
		}
		const {
			paused
		} = this.store.getters;
		
		// 理解为上一次的播放url 与这次播放url 是否相同
		const curPlayId = uni.getStorageSync('audio_play_id');
		// 不同,则重新播放
		const renderIsPlay = id == curPlayId;
		if (!renderIsPlay) { //渲染与播放地址 不同

				this.audioCtx.src = src;
				this.audioCtx.title = title;
				this.audioCtx.singer = singer;
				this.audioCtx.coverImgUrl = coverImgUrl || this.defaultCover;

				this.audioCtx.startTime = 0;
				this.audioCtx.seek(0);

				this.audioCtx.play();
				this.commitStore('set_pause', false)

				this.commitStore("set_playinfo", {
					src: src,
					title: title,
					singer: singer,
					coverImgUrl: coverImgUrl
				});
	
		} 
		if (renderIsPlay) {
			
			if (paused) { //渲染与播放地址相同
				this.audioCtx.play();

				this.audioCtx.startTime = parseFloat(current_value);
				this.audioCtx.seek(parseFloat(current_value));
				this.commitStore('set_pause', false)


				this.commitStore("set_playinfo", {
					src: src,
					title: title,
					singer: singer,
					coverImgUrl: coverImgUrl
				});
			} else {
				this.audioCtx.pause();
				this.commitStore('set_pause', true)
				this.commitStore('set_n_pause', true)
			}
		}
	}
	
	operate(status) {
		//key !== undefined && this.commitStore("set_render", key);
		this.operation(status);
	}

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
						//var telephonyManager = plus.android.importClass("android.telephony.TelephonyManager");
						//var telephonyManager = plus.android.runtimeMainActivity().getSystemService(Context.TELEPHONY_SERVICE);
						var phonetype = telManager.getCallState();
						var phoneNumber = intent.getStringExtra(telephonyManager.EXTRA_INCOMING_NUMBER);

						console.log('phonetype:'+phonetype);
						if (phonetype == 0 && !store.state.n_pause) {
							audioctx.play()
						} else  {
							audioCtx.pause()
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
	}

	
	get audiolist() {
		return this.store.getters.audiolist
	}
	get playIndex() {
		return this.store.getters.playIndex
	}
	get playinfo() {
		return this.store.getters.playinfo
	}
	get paused() {
		return this.store.getters.paused
	}

}
