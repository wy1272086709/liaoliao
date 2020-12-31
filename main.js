import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import storeObj from './store/store.js'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);


//组件引用方式
import { ZAudio } from 'zaudio/index.js'

// npm引用方式
// import { ZAudio } from 'uniapp-zaudio/zaudio/index.js'
Vue.use(ZAudio)

// i18n部分的配置
Vue.use(Vuex)
const store = new Vuex.Store(storeObj)
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
