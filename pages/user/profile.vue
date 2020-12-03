<template>
	<view>
		<view id="list">
			<uni-list>
				<uni-list-item title="头像" @tap="switchImage" isBottomEvery="1">
					<template v-slot:right="">
						<image id="image-size" :src="avatarUrl"></image>
					</template>
				</uni-list-item>
				<uni-list-item title="昵称" @tap="editNickname" isBottomEvery="1">
					<template v-slot:right="">
						<text class="bottom-version-text">{{nickName}}</text>
					</template>
				</uni-list-item>
				<uni-list-item title="绑定手机" @tap="bindPhone" isBottomEvery="1">
					<template v-slot:right="">
						<text class="bottom-version-text">{{phone}}</text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		
		<view id="bottom-view" :style="{top: bottom+'px'}">
			<view class="login-info-text">
				<navigator url="/pages/user/user_agreement" tap="gotoUserAllowPage" class="underline-text">《用户许可》</navigator>
				<text>和</text>
				<navigator url="/pages/user/software_license" tap="gotoUserLicensePage" class="underline-text">《隐私协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import http from '../../common/http.js';
	import permision from "../../components/js_sdk/wa-permission/permission.js";
	
	let uid = '';
	export default {
		components: {
		
		},
		computed:{
			userInfo: function() {
				let uInfo = this.getStoreUserInfo();
				if(uInfo.nickName) {
					return uInfo;
				}
				let type = util.cache('appLoginType', null);
				let userInfoStr = util.cache('app_user_info_'+type,null);
				let userInfo    = userInfoStr ? JSON.parse(userInfoStr): {};
				return userInfo;
			},
			phone: function() {
				let u = this.userInfo;
				return u.phone;
			},
			avatarUrl: function() {
				let u = this.userInfo;
				console.log('u.avatarUrl', u.avatarUrl);
				return u.avatarUrl ? u.avatarUrl: '../../static/img/user/people.png';
			},
			nickName: function() {
				let u = this.userInfo;
				return u.nickName;
			}
		},
		data() {
			return {
				/*phone: '',
				avatarUrl: '',
				nickName: ''*/
				bottom: '',
			}
		},
		onLoad() {
			let type = util.cache('appLoginType', null);
			let userInfoStr = util.cache('app_user_info_'+type,null);
			let userInfo    = userInfoStr ? JSON.parse(userInfoStr): {};
			uid        = userInfo.uid;
			console.log('uid', uid, 'userInfo', userInfo);
			const info = uni.getSystemInfoSync();
			this.bottom = info.windowHeight - 60;
			this.getUserInfo();
		},
		methods: {
			// 是否有摄像机权限
			isHasCameraPermission(platForm) {
				// 1 是安卓
				if(platForm == 1) {
					return this.requestAndroidPermission('android.permission.CAMERA');
				// 2 是IOS 
				} else if(platForm == 2) {
					return this.judgeIosPermission('camera');
				}
			},
			// 是否有相册权限
			isHasPhotoPermission(platForm) {
				// 1 是安卓
				if(platForm == 1) {
					const readPermission = this.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE');
					const writePermission= this.requestAndroidPermission('android.permission.WRITE_EXTERNAL_STORAGE');
					let read = readPermission == 0 ? false: (readPermission == 1 ?  true: false);
					let write= writePermission == 0 ? false: (writePermission == 1 ?  true: false)
					return readPermission && writePermission;
				} else if(platForm == 2) {
					// 2 是IOS 
					return this.judgeIosPermission('photoLibrary');
				}
			},
			judgeIosPermission(permisionID) {
				const result = permision.judgeIosPermission(permisionID);
				return result;
			},
			async requestAndroidPermission(permisionID) {
				const result = await permision.requestAndroidPermission(permisionID);
				return result;
			},
			bindPickerChange(e) {
				console.log('e');
			},
			getUserInfo() {
				// 获取的用户头像昵称,绑定手机号等
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=check_app_user";
				console.log('check_app_user', {
					auth: auth,
					uid: uid,
					filterData: true
				});
				http.request(url, {
					auth: auth,
					uid: uid,
					filterData: true
				}).then(resp => {
					console.log('resp', resp);
					if(resp.status == 1) {
						// 成功之后写缓存数据,然后再返回.
						let data = resp.data;
						let userInfo = this.userInfo;
						if(data.name) {
							//let nameStr = '*'.repeat(7)+(data.name.substr(7, 4));
							userInfo.nickName = data.name;
							//this.nickName     = data.name;
						}
						if(data.img) {
							userInfo.avatarUrl = data.img;
							//this.avatarUrl     = data.img;
						}
						if(data.phone) {
							userInfo.phone     = data.phone;
						}
						if(data.uid) {
							userInfo.uid = data.uid;
						}
						console.log('userINfo uid', userInfo);
						if(userInfo.uid) {
							let type = util.cache('appLoginType', null);
							this.setUserInfo(userInfo);
							util.cache('app_user_info_'+type, JSON.stringify(userInfo), 15*24*3600);
						}
					}
				});
			},
			setUserInfo(userInfo) {
				this.$store.commit('setUserInfo', userInfo);
			},
			getStoreUserInfo() {
				return this.$store.getters.userInfo;
			},
			switchImage(obj) {
				console.log('switch image!!!!');
				let _self = this;
				let platForm = getApp().globalData.platform;
				let hasCameraPermission = this.isHasCameraPermission(platForm);
				let hasPhotoPermission  = this.isHasPhotoPermission(platForm);
				// 安卓端判断
				if(platForm == 1) {
					if (!hasCameraPermission || !hasPhotoPermission) {
						uni.showModal({
							title:'提示',
							content:'请先开启摄像头和相册权限后,再去上传头像!',
							showCancel:false,
							success() {
								
							}
						});
						return;
					}
				}
				uni.chooseImage({
					count: 1, //默认9
					//'compressed'
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择、摄像头
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						// 文件上传发送http 请求到服务端..
						console.log('res', res);
						//_self.defaultSrc = res.tempFilePaths[0];
						const data = getApp().globalData;
						const apiPrefix = data.serverUri;
						const auth = data.auth;
						let formData = {
							'auth':auth,
							'uid': uid
						};
						const uploadTask = uni.uploadFile({
							 url : apiPrefix +'?mod=user&ac=img_xg',
							 filePath: res.tempFilePaths[0],
							 name: 'file',
							 formData: formData,
							 success: function (uploadFileRes) {
								    console.log(uploadFileRes);
									// "data": "{\"status\":1,\"message\":\"success\",\"data\":{\"uid\":\"207\",\"img\":\"https:\\/\\/kuxou.com\\/upload1\\/5f464a78d164d.jpg\"}}",
									let dataStr = uploadFileRes.data
									let dataObj = JSON.parse(dataStr);
									if(dataObj.status == 1) {
										console.log('dataObj', dataObj);
										let imgSrc = dataObj.data.img;
										console.log('imgSec', imgSrc);
										let uInfo  = _self.getStoreUserInfo();
										uInfo.avatarUrl =  imgSrc;
										console.log('uInfo', uInfo);
										_self.setUserInfo(uInfo);
										let type = util.cache('appLoginType', null);
										let userInfoStr = util.cache('app_user_info_'+type,null);
										if(userInfoStr) {
											let uInfo = JSON.parse(userInfoStr);
											uInfo.avatarUrl = imgSrc;
											// 计算属性
											let uStr = JSON.stringify(uInfo);
											util.cache('app_user_info_'+type, uStr, 15*24*3600);						
										}
									} else {
										uni.showToast({
											icon:"none",
											title:dataObj.message,
											duration:2000
										});
									}
							  }
						});
					}
				});
			},
			bindPhone() {
				uni.navigateTo({
					url:'/pages/user/bind_phone_v2'
				});
			},
			editNickname() {
				uni.navigateTo({
					url:'/pages/user/edit_nickname'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
	#list {
		margin-top:58rpx;
		margin-left:30rpx;
		margin-right:30rpx;
		width: 690rpx;
		
		background: #FFFFFF;
		border-radius: 20rpx;
	}
	.uni-list-item:last-child {
		margin-bottom: 5px;
	}
/deep/ .uni-list-item__content-title {
	font-size: 28rpx !important;
	font-family: PingFang SC !important;
	font-weight: 500 !important;
	color: #333333 !important;
	line-height: 120rpx;
	height:120rpx !important;
}

/deep/ .uni-list-item__extra {
	margin-right: 37rpx;
}

#image-size {
	width:64rpx;
	height: 64rpx;
	border-radius: 50%;
	margin-right:34rpx;
}
.bottom-version-text {
	margin-right:34rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(153, 153, 153, 1);
}
#bottom-view {
	margin-left:30rpx;
	margin-right:30rpx;
	display: flex;
	width:690rpx;
	box-sizing: border-box;
	padding:20rpx;
	justify-content: center;
	position: absolute;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #9A9A9A;
	.login-info-text {
		display: flex;
		white-space: nowrap;
	}
}
.underline-text {
	color: #000000;
	text-decoration: underline;
}
</style>
