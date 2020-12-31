import Vue from 'vue'
import Vuex from 'vuex'

// npm引用方式
// import { ZAudio } from 'uniapp-zaudio/zaudio/index.js'
const copyData = (articleInfo, k) => {
	const keys = Object.keys(articleInfo);
	const len  = keys.length;
	
	const m = k || [ 'classname', 'id', 'title', 'cid' ];
	const article = {};
	for(let h = 0;h<len;h++) {
		const key = keys[h];
		if(Array.isArray(m) && m.includes(key) &&articleInfo.hasOwnProperty(key)) {
			article[key] = articleInfo[key];
		}
	}
	return article;
};

//组件引用方式
import {
	ZAudioStore
} from "@/zaudio/index.js";


Vue.use(Vuex)

//将用户信息作为
const oldStore = {
	namespaced: false,
	state: {
		userInfo: {},
		isInternalUser: 0,
		articleLogList: [],
		videoInfo: {},
		videoPaused: false,
		videoLogList: {
			
		}
	},
	getters: {
		userInfo:state => {
			return state.userInfo;
		},
		isInternalUser:state => {
			return state.isInternalUser;
		},
		articleLogList:state=> {
			return state.articleLogList;
		},
		videoInfo:state => {
			return state.videoInfo;
		},
		videoLogList:state=> {
			return state.videoLogList;
		},
		videoPaused: state => {
			return state.videoPaused;
		}
	},
	mutations: {
		setVideoPaused(state, paused) {
			state.videoPaused = paused;
		},
		// commit 事件触发的操作,只能同步
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setUserInfoVals(state, obj) {
			const keys = Object.keys(obj);
			const len  = keys.length;
			for(let i = 0;i<len;i++) {
				const k = keys[i];
				state.userInfo[k] = obj[k];
			}
		},
		setInternalUser(state, isInternalUser) {
			console.log('isInternalUser', isInternalUser);
			state.isInternalUser = isInternalUser;
		},
		setArticleLogList(state, articleInfo) {
			const id = articleInfo.id;
			// 文章里面，需要
			const article = copyData(articleInfo);
			console.log('article'+JSON.stringify(article));
			state.articleLogList.push(article);
		},
		setVideoLogList(state, videoInfo) {
			// id 值
			const idStr = videoInfo.id;
			const video = copyData(videoInfo, ['id','title', 'coverImgUrl','current_value', 'videoUrl', 'current_time', 'duration', 'fromLog']);
			state.videoLogList[idStr] = video;
		},
		setVideoInfo(state, info) {
			// title, 标题
			// coverImgUrl, 封面图
			// src, 来源
			// current_time, 播放的位置信息...,
			// 还需要保存什么信息,
			const videoInfo = copyData(info, ['id','title', 'coverImgUrl', 'videoUrl', 'current_value','current_time','duration', 'fromLog' ]);
			console.log('videoInfo',videoInfo);
			const keys = Object.keys(videoInfo);
			keys.forEach((key)=> {
				state.videoInfo[key] = videoInfo[key];
			});
		}
	},
	actions: {
		// dispatch 事件触发的操作,只能异步
		setUserInfo(commit, userInfo) {
			commit('setUserInfo', userInfo);
		},
		setVideoPaused(commit, paused) {
			commit('setVideoPaused', paused);
		},
		setInternalUser(commit, isInternalUser) {
			commit('setInternalUser', isInternalUser);
		},
		setArticleLog(commit, articleInfo) {
			commit('setArticleLogList', articleInfo);
		},
		setVideoInfo(commit, videoInfo) {
			commit('setVideoInfo', videoInfo);
		},
		setVideoLogList(commit, videoInfo) {
			commit('setVideoLogList', videoInfo);
		}
	},
}
export default {
	modules: {
		oldStore: oldStore,
		ZAudioStore: ZAudioStore,
	}
}