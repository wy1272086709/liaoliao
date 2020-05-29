export default {
	//将用户信息作为
	state: {
		userInfo: {}
	},
	getters: {
		userInfo:state => {
			return state.userInfo;
		}
	},
	mutations: {
		// commit 事件触发的操作,只能同步
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		}
	},
	actions: {
		// dispatch 事件触发的操作,只能异步
		setUserInfo(commit, userInfo) {
			commit('setUserInfo', userInfo);
		}
	}
}