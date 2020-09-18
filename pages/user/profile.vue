<template>
	<view>
		<view id="list">
			<uni-list>
				<uni-list-item title="头像" @tap="switchImage">
					<template v-slot:right="">
						<image id="image-size" :src="avatarUrl"></image>
					</template>
				</uni-list-item>
				<uni-list-item title="昵称" @tap="editNickname">
					<template v-slot:right="">
						<text class="bottom-version-text">{{nickName}}</text>
					</template>
				</uni-list-item>
				<uni-list-item title="绑定手机" @tap="bindPhone">
					<template v-slot:right="">
						<text class="bottom-version-text">{{phone}}</text>
					</template>
				</uni-list-item>
			</uni-list>
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
				return u.avatarUrl ? u.avatarUrl: '../../static/img/user/default_avatar.png';
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
			}
		},
		onLoad() {
			let type = util.cache('appLoginType', null);
			let userInfoStr = util.cache('app_user_info_'+type,null);
			let userInfo    = userInfoStr ? JSON.parse(userInfoStr): {};
			uid        = userInfo.uid;
			console.log('uid', uid, 'userInfo', userInfo);
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
					url:'/pages/user/bind_phone'
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

<style lang="less" scoped>
/deep/ .uni-list-item__content-title {
	font-size:20px !important;
	font-family:Microsoft YaHei !important;
	font-weight:bolder !important;
	line-height: 65px;
	height:65px !important;
}
#image-size {
	width:80px;
	height: 80px;
	border-radius: 50%;
}
.bottom-version-text {
	margin-right:10px;
	font-weight: 400;
}
</style>
