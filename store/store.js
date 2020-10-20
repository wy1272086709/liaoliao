export default {
	//将用户信息作为
	state: {
		userInfo: {},
		isShowMaskObj: {
			
		}
	},
	getters: {
		userInfo:state => {
			return state.userInfo;
		},
		isShowMaskObj:state => {
			return state.isShowMaskObj;
		}
	},
	mutations: {
		// commit 事件触发的操作,只能同步
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setVersionIsShowMask(state, isShowMask) {
			let v = '100';   //版本号
			let k = 'app_version_'+v;
			// 设置缓存值...
			console.log('k', k, 'isShow',isShowMask);
			state.isShowMaskObj.k = isShowMask;
		}
	},
	actions: {
		// dispatch 事件触发的操作,只能异步
		setUserInfo(commit, userInfo) {
			commit('setUserInfo', userInfo);
		},
		setIsShowMaskObj(commit, isShowMask) {
			commit('setVersionIsShowMask', isShowMask);
		}
	}
}