<template>
	<view id="root-view">
		<!--
		<view id="header" :style="'height:'+headerViewHeight+'rpx;'">
			<view class="status-line" :style="{height: lineHeight}"></view>
			<view id="header-view-box">
				<view id="left" @tap="back">
					<text>取消</text>
				</view>
				<view id="center">
					<text>更改昵称</text>
				</view>
				<view id="right">
					<button class="rightBtn">保存</button>
				</view>
			</view>
		</view>
		-->
		
		<view id="content-box">
			<view id="nickname-box">
				<input v-model.trim="nickName" focus id="nickName" />
			</view>
			<view id="info-nickname">
				<text>好昵称可以让你的朋友更容易记住你。</text>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	
	let uid = '';
	export default {
		data() {
			return {
				nickName: '',
				lineHeight: '',
				headerViewHeight: ''
			};
		},
		onLoad() {
			let type = util.cache('appLoginType', null);
			let userInfoStr = util.cache('app_user_info_'+type,null);
			let userInfo    = userInfoStr ? JSON.parse(userInfoStr): {};
			console.log('userInfo', userInfo);
			if(userInfo.nickName) {
				this.nickName   = userInfo.nickName;
			}
			uid        = userInfo.uid;
		},
		onNavigationBarButtonTap:function(e){
			console.log(e.text);//提交
			if (e.text == '保存') {
				let nameStr = this.nickName;
				console.log('nameStr', nameStr);
				this.changeNickName();
			}
		},
		methods:{
			setUserInfo(userInfo) {
				this.$store.commit('setUserInfo', userInfo);
			},
			getStoreUserInfo() {
				return this.$store.getters.userInfo;
			},
			back() {
				console.log('back');
			},
			changeNickName() {
				uni.showLoading({
					title: '正在修改'
				});
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=nc_xg";
				console.log('url', url, 'nickName', this.nickName);
				http.request(url, {
					auth: auth,
					uid: uid,
					name: this.nickName,
					filterData: true
				}).then(resp => {
					console.log('resp', resp);
					if(resp.status == 1) {
						// 成功之后写缓存数据,然后再返回.
						let type = util.cache('appLoginType', null);
						let userInfoStr = util.cache('app_user_info_'+type,null);
						if(userInfoStr) {
							let uInfo = JSON.parse(userInfoStr);
							uInfo.nickName = this.nickName;
							this.setUserInfo(uInfo);
							// 计算属性
							let uStr = JSON.stringify(uInfo);
							util.cache('app_user_info_'+type, uStr, 15*24*3600);						
						}
						uni.hideLoading();
						uni.navigateBack({
							delta:1
						});
					} else {
						uni.hideLoading();
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	view {
		display: flex;
	}
	#root-view {
		flex-direction: column;
	}
#header {
	display: flex;
	width: 750rpx;
	flex-direction: column;
	justify-content: space-between;
	font-size:16px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	height: 100rpx;
	align-items: center;
	border-bottom: 1px solid #D4D4D4;
}

#header-view-box {
	width:654rpx;
	flex-direction: row;
	align-items: center;
	height: 100%;
	margin-left:32rpx;
	margin-right:32rpx;
	justify-content: space-between;
}

#left {
	background-color: #E1E1E1;
	color:#B4B4B4;
}

#right {
	display: flex;
}

#center {
	display: flex;
	position: absolute;
	left:311rpx;
}

#content-box {
	margin-left:32rpx;
	margin-right:32rpx;
	flex-direction: column;
}

#nickname-box {
	border-bottom:1px solid #B2E3CF;
	height: 40px;
}

#info-nickname {
	color:#A5A5A5;
}

#nickName {
	height: 100%;
}
.rightBtn {
	background-color: #07C160;
	color: white;
	display: flex;
	height: 60rpx;
	line-height: 1;
	align-items: center;
}
</style>
