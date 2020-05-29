import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import storeObj from './store/store.js'
Vue.use(Vuex)
const store = new Vuex.Store(storeObj)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
