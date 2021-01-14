import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import storeObj from './store/store.js'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);


import {
	ZAudio
} from '@/zaudio'

import util from '@/common/util.js';
import http from '@/common/http.js';
const store = new Vuex.Store(storeObj);
// npm引用方式
// import { ZAudio } from 'uniapp-zaudio'
// 更新播放进度
async function updatePlayProgress(current_value, duration_value) {
	const data = getApp().globalData;
	const apiPrefix = data.serverUri;
	const auth      = data.auth;
	const url       = data.serverUri+'?mod=product&ac=jd_log'
	let {
		playinfo
	} = store.getters;
	
	const uid = util.cache('app_userid', null);
	
	const params = {
		auth: auth,
		nid: playinfo.id,
		uid: uid,
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


let zaudio = new ZAudio({
	store: store, //此处的store必须为实例化vuex的store
	continuePlay: true, //续播
	autoPlay: true, //自动播放 部分浏览器不支持

	onError() {
		uni.showToast({
			title: '音频播放错误',
			duration: 1500,
			mask: false,
			icon: 'none',
			position: 'center'
		})
	},
	onCanplay() { //点击开始触发
		console.log('onCanplay-------')
	},

	onPlaying(playinfo) { //播放中
		console.log('onPlaying---------', playinfo)
	},

	onPause() { //暂停
		console.log('onPause---------')
		const { current_value, duration_value } = this.store.getters.playinfo;
		const curr = Math.round(current_value, 3);
		const duration = Math.round(duration_value, 4);
		updatePlayProgress(curr, duration);
	},
	
	onEnded() { //结束
		console.log('onEnded---------')
		const { current_value, duration_value } = this.store.getters.playinfo;
		const curr = Math.round(current_value, 3);
		const duration = Math.round(duration_value, 4);
		updatePlayProgress(curr, duration);
	}
})
 
Vue.prototype.$audio = zaudio


// i18n部分的配置
Vue.use(Vuex)
//const store = new Vuex.Store(storeObj)
Vue.config.productionTip = false

//重写console.log方法，判断是否开启日志调试模式，否则就不输出
console.log = (function(oriLogFunc){
  let debug = true;
  return function(str){
    if (debug){//判断配置文件是否开启日志调试
		let args = arguments;
		for(let i = 0;i<args.length;i++) {
			oriLogFunc.call(console, args[i]);
		}
    }
  }
})(console.log);

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
