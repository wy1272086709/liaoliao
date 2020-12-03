<template>
	<view id="root-view">
		<view id="header-view">
			<text>登录成功,请完善手机号</text>
		</view>
		<view id="login-area-view">
			<view id="tel-view">
				<view class="tel-prefix">
					<text>+86</text>
				</view>
				<input id="phone-id" type="text" ref="phoneRef" @blur="validatePhone()" name="phone" v-model.trim="phone"  placeholder="请输入手机号" placeholder-class="text-placeholder-class" />
				<view>
					<!-- :style="'height:'+sendCodeBtnHeight+'px;'" -->
					<button   @tap="sendCode()"  class="send-code-btn" :disabled="disabled">{{sendMsg}}</button>
				</view>
			</view>
			<view id="error-tel-view">
				<text>{{telErrorMsg}}</text>
			</view>
			<view id="code-view">
				<view class="tel-prefix">
					<text class="validate-code-label">短信验证码</text>
				</view>
				<input type="text" id="validate_code" ref="codeRef" @blur="validateCodeStr()" name="code" v-model.trim="validate_code"  placeholder="请输入短信验证码" placeholder-class="text-placeholder-class" />
			</view>	
			<view id="error-code-view" >
				<text>{{codeErrorMsg}}</text>
			</view>
			<!-- :style="'height:'+submitViewHeight+'px'" -->
			<view id="submit-view" @tap="savePhone">
				<button  style="border:0px solid #000000;">绑定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let isSubmitLogin = false;
	export default {
		data() {
			return {
				sendMsg:'获取验证码',
				phone: '',
				validate_code: '',
				disabled: false,
				bgViewHeight: 0,
				marginTop: 0,
				codeViewTop: 0,
				sendCodeBtnHeight: 0,
				submitViewHeight: 53,
				telErrorMsg: '',
				codeErrorMsg: '',
				isChecked: 0,
				errorBottom: '',
				platform: getApp().globalData.platform
			};
		},
		computed: {
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			}
		},
		onLoad() {
			let info = uni.getSystemInfoSync();
			this.system = info.system;
			let winWidth = info.windowWidth;
			let ratio = 750/winWidth;
			ratio = ratio.toFixed(2);
			this.lineHeight =  info.statusBarHeight * ratio +40+ 'rpx';
			this.sendCodeBtnHeight = info.windowHeight * 0.0375;
			this.submitViewHeight  = info.windowHeight * 0.0795;
			this.thirdLoginTop    = info.windowHeight * 0.0900 -50;
			this.thirdLoginBottom = info.windowHeight * 0.0410 -10;
			this.iconHeight     = info.windowHeight * 0.0502;
			this.iconWidth      = info.windowHeight * 0.0502;
			this.absoluteViewTop  = info.windowHeight * 0.1304;
			this.maxWidth         = info.windowHeight * 0.1342;
			this.errorBottom      = 20;
			this.allInfoBottom    = 20;
		},
		components:{
			
		},
		methods:{
			validateCodeStr() {
				let codeStr  = this.validate_code.trim();
				if (codeStr == '') {
					this.codeErrorMsg = '验证码不能为空!';	
					return false;
				} else {
					this.codeErrorMsg = '';
					return true;
				}
			},
			goHome() {
				// 跳转到首页
				console.log('goHome');
				uni.switchTab({
					url: '/pages/index/index',
					fail:function(res) {
						console.log('fail res:', res)
					}
				});
			},
			savePhone() {
				let phoneStr = this.phone;
				console.log('phoneStr', phoneStr);
				let flag1 = this.validatePhone();
				let flag2 = this.requireCodeStr();
				if (flag1 && flag2) {
					this.changephone();
				}
			},
			isPoneAvailable(phoneStr) {
				let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				console.log('isPoneAvailable', phoneStr);
				if (!myreg.test(phoneStr)) {
					return false;
				} else {
					return true;
				}
			},
			requireCodeStr() {
				let code = this.validate_code;
				if(!code) {
					this.codeErrorMsg = '验证码必须!';
					return false;
				} else {
					this.codeErrorMsg = '';
					return true;
				}
			},
			sendSms() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=user&ac=sendsms";
				http.request(url, {
					auth: auth,
					phone:this.phone,
					filterData: true
				}).then(resp => {
					console.log('sendsms resp', resp);
				});
			},
			// 校验手机号码
			validatePhone() {
				let phoneStr = this.phone;
				if(!this.isPoneAvailable(phoneStr)) {
					this.telErrorMsg = '请输入正确的手机号码!';
					return false;
				} else {
					this.telErrorMsg = '';
					return true;
				}
			},
			sendCode() {
				if(this.disabled) {
					return;
				}
				let flag = this.validatePhone();
				if(!flag) {
					return;
				}
				this.disabled = true;
				let n = 60;
				this.sendMsg = n+'s';
				let _self = this;
				// 这里发送请求...
				this.sendSms();
				let t = setInterval(function() {
					n--;
					//console.log('n',n);
					if(n <= 0) {
						_self.sendMsg = '重新发送验证码';
						clearInterval(t);
						_self.disabled = false;
						return;
					}  else {
						_self.sendMsg = n+'s';
					}
				}, 1000);
			},
			back() {
				console.log('back');
			},
			setUserInfo(userInfo) {
				this.$store.commit('setUserInfo', userInfo);
			},
			changephone() {
				uni.showLoading({
					title: '正在修改'
				});
				/*setTimeout(()=> {
					uni.navigateBack({
						delta:1
					});
				}, 2000);*/
				
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=phone_xg";
				const params = {
					auth: auth,
					uid: this.uid,
					code: this.validate_code,
					phone: this.phone,
					filterData: true
				};
				console.log('params', params);
				http.request(url, params).then(resp => {
					uni.hideLoading();
					console.log('resp', resp);
					let hasPhone = 0;
					if(resp.status == 1) {
						// 成功之后写缓存数据,然后再返回.
						let type = util.cache('appLoginType', null);
						let userInfoStr = util.cache('app_user_info_'+type,null);
						if(userInfoStr) {
							let uInfo = JSON.parse(userInfoStr);
							hasPhone = uInfo.phone ? 1: 0;
							uInfo.phone = this.phone;
							this.setUserInfo(uInfo);
							// 计算属性
							let uStr = JSON.stringify(uInfo);
							console.log('uStr', uStr);
							console.log('type', type);
							util.cache('app_user_info_'+type, uStr, 15*24*3600);						
						} else {
							hasPhone = 0;
						}
						if (hasPhone) {
							uni.navigateBack({
								delta:1
							});
						} else {
							// 绑定手机号后,跳转到首页
							uni.showToast({
								title:'绑定成功!',
								complete() {
									uni.switchTab({
										url: '/pages/user/user_index'
									});
								}
							});
						}
					} else {
						let msg = resp.message;
						uni.showModal({
							title:"提示",
							content:msg,
							confirmText:'确定',
							showCancel:false,
							success() {
								
							}
						})
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
	display: flex;
	flex-direction: column;
	#header-view {
		display: flex;
		margin-left:59rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
		margin-top:63rpx;
		margin-bottom: 63rpx;
	}
}

#login-area-view {
	/*background:rgba(252,252,253,1);*/
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	border: 1px solid  rbga(255,255, 255);
	flex-direction: column;
	margin-left:62rpx;
	margin-right:62rpx;
	#error-code-view {
		/*margin-left:54rpx;*/
		height:20px;
		/*color:#FF0000;*/
		margin-top:20rpx;
		margin-bottom:59rpx;
		
		padding-left:27rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: red;
	}
	.error-text{
		/*margin-left:5px;*/
		color:red;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
	}
	#code-view {
		display: flex;
		
		/*background: #F3F3F3;*/
		border-radius: 50rpx;
		align-items: center;
		height: 100rpx;
		background: #F3F3F3;
		border-radius: 50rpx;
		padding-left:27rpx;
		/*margin-bottom: 40rpx;*/
		
		#validate_code {
			display: flex;
		}
		.validate-code-label {
			margin-right:38rpx;
		}
	}
	
	
	#error-tel-view {
		height: 20px;
		/*margin-left:53rpx;*/
		/*color:#FF0000;*/
		padding-left:27rpx;
		margin-top:18rpx;
		margin-bottom:50rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: red;
	}
	#tel-view {
		display: flex;
		align-items: center;
		height: 100rpx;
		background: #F3F3F3;
		border-radius: 50rpx;
		/*background: #F3F3F3;*/
		border-radius: 50rpx;
		padding-left:27rpx;
		padding-right: 20rpx;
		/*margin-bottom: 41rpx;*/
		/*margin-bottom:62rpx;*/
		/*border-bottom: 1px solid #DCDCDC;*/
		#phone-id {
			/*margin-left:110rpx;*/
			display: flex;
			width:260rpx;
		}
		
		.send-code-btn {
			display: flex;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #343434;
			line-height: 1;
			padding-left: 0px;
			padding-right: 0px;
			align-items: center;
			justify-content: center;
			/*border: 0px solid black;*/
			
		}
		
		button::after {
			border:0px;
			background-color: transparent;
		}
	}

	#submit-view {
		display: flex;
		height:100rpx;
		button {
			display: flex;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			background-color: transparent;
			justify-content: center;
			align-items: center;
			width:100%;
			background: #C3AEFF;
			border-radius: 50rpx;
		}
		
		button::after {
			border: none;
			width:0;
			height: 0;
			-webkit-transform:scale(1);
		    transform:scale(1);
		    display: none;
		    background: transparent;
		}
	}

	#login-view {
		display: flex;
		align-items: center;
		flex-direction: column;
		.sign-in-with-apple {
			margin-top:10px;
			display: flex;
			width:130px;
			height:30px;
			justify-content: center;
			align-items: center;
			font-size:16px;
			border:1px solid black;
			border-radius: 6px;
		}
	}

	#third-login-text {
		display: flex;
		justify-content: center;
		font-size:22rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(128,128,128,1);
		/*opacity:0.5;*/
		margin-top:162rpx;
		margin-bottom:50rpx;
	}

	.text-placeholder-class {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #9A9A9A;
	}

	.login-icon {
		width:80.7px;
		height: 80.7px;
	}
}


.dialog-class {
	flex-direction: column;
}

.tel-prefix {
	display: flex;
	width:178rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #343434;
}
</style>
