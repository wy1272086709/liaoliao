<template>
	<view>
		<view id="user-list">
			<view v-for="u in userList" class="u-list" @tap="switchUser(u.uid)">
				<text>{{u.ename}} {{u.uid == uid ? '(当前用户)':''}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	export default {
		data() {
			return {
				userList: [
					
				]
			}
		},
		computed:{
			uid: function() {
				let u = this.$store.getters.userInfo;
				console.log('u', u);
				if (u.uid) {
					return u.uid;
				}
				let uid = util.cache('app_userid', null);
				return uid;
			}
		},
		async onLoad() {
			const info = this.getUserList();
			
		},
		methods: {
			setInternalUser(isInternalUser) {
				console.log('isInternalUser11111-----', isInternalUser);
				this.$store.commit('setInternalUser', isInternalUser);
			},
			async getUserList() {
				const modStr = '?mod=user&ac=test_user_list';
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix+modStr;
				try {
					const r = await http.request(url, {
						auth: auth
					});
					console.log('info', r);
					this.userList = r;
				} catch(e) {
					console.log('e', e);
				}
			},
			switchUser(uid) {
				// 切换用户,
				this.setUserInfo({});
				uni.removeStorageSync('app_user_info_1');
				this.setInternalUser(1);
				console.log('logout...');
				uni.removeStorageSync('app_userid');	
				util.cache('app_userid', uid);			
				uni.switchTab({
					url:'/pages/user/user_index'
				});
			},
			setUserInfo(userInfo) {
				this.$store.commit('setUserInfo', userInfo);
			}
		}
	}
</script>

<style>
#title {
	display: flex;
	justify-content: center;
	font-weight: bolder;
	margin-bottom: 60px;
}

#user-list {
	margin-top:60px;
	padding:20rpx 20rpx;
	margin-left: 32rpx;
	margin-right: 32rpx;
	background-color: #F2F2F2;
}

.u-list {
	margin-bottom: 30rpx;
	padding-bottom: 10px;
	border-bottom: 1px solid #333333;
}
</style>
