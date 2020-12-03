export default {
	//将用户信息作为
	state: {
		userInfo: {},
		isInternalUser: 0
	},
	getters: {
		userInfo:state => {
			return state.userInfo;
		},
		isInternalUser:state => {
			return state.isInternalUser;
		}
	},
	mutations: {
		// commit 事件触发的操作,只能同步
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setInternalUser(state, isInternalUser) {
			console.log('isInternalUser', isInternalUser);
			state.isInternalUser = isInternalUser;
		}
	},
	actions: {
		// dispatch 事件触发的操作,只能异步
		setUserInfo(commit, userInfo) {
			commit('setUserInfo', userInfo);
		},
		setInternalUser(commit, isInternalUser) {
			commit('setInternalUser', isInternalUser);
		}
	}
}