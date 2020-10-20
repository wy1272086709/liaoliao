<template>
	<view>
		<view id="back-icon-view" :style="'top:'+lineHeight+'rpx;'" @tap="back">
			<uni-icons type="back" size="32" :color="'#FFFFFF'" style="margin-left: 8px;"></uni-icons>
		</view>
		<view id="absolute-view" :style="'top:'+absoluteViewTop+'px;'">
			<view id="login-img" :style="'width:'+maxWidth+'px;height:'+maxWidth+'px;'">
				<image src="../../static/img/user/app_login_img.png" class="login-logo"></image>
			</view>
			<view id="login-title">
				<text>开启美好生活记录之旅</text>
			</view>
		</view>
		<view id="bg-view" :style="'height:'+bgViewHeight+'px'">
			<image src="../../static/img/user/app_login_bg.png" class="app_login_image"></image>
		</view>
		<view id="login-area-view" :style="'top:'+loginViewTop+'px'">
			<view id="tel-view" :style="'margin-top:'+marginTop+'px;'">
				<text class="tel-prefix">+86</text>
				<input id="phone-id" type="text" ref="phoneRef" @blur="validatePhone()" name="phone" v-model="phone"  placeholder="请输入手机号" placeholder-class="text-placeholder-class" />
			</view>
			<view id="error-tel-view">
				<text>{{telErrorMsg}}</text>
			</view>
			<view id="code-view" :style="'margin-top:'+codeViewTop+'px;'">
				<input type="text" id="validate_code" ref="codeRef" @blur="validateCodeStr()" name="code" v-model="validate_code"  placeholder="请输入短信验证码" placeholder-class="text-placeholder-class" />
				<button   @tap="sendCode()" :style="'height:'+sendCodeBtnHeight+'px;'" class="send-code-btn" :disabled="disabled">{{sendMsg}}</button>
			</view>	
			<view id="error-code-view" :style="'margin-bottom:'+errorBottom+'px;'">
				<text>{{codeErrorMsg}}</text>
			</view>
			<view id="user-allow-info" :style="'margin-bottom:'+allInfoBottom+'px;'">
				<checkbox-group @change="checkboxChange" style="display:flex;flex-direction: row;align-items: center;">
					<checkbox  name="isChecked" value="1" />
					<view>
						<view>登录即代表同意
							<navigator url="/pages/user/user_agreement" tap="gotoUserAllowPage" class="underline-text">用户许可</navigator> 和
							<navigator tap="gotoUserLicensePage" class="underline-text" url="/pages/user/software_license">用户协议</navigator>
						</view>
					</view>
					<text class="error-text">{{allowInfoErrorMsg}}</text>
				</checkbox-group>
				
			</view>
			<view id="submit-view" :style="'height:'+submitViewHeight+'px'">
				<button  form-type="submit" @tap="login()" style="border:0px solid #000000;">登录</button>
			</view>
			
			<view id="third-login-text" :style="'margin-top:'+thirdLoginTop+'px;margin-bottom:'+thirdLoginBottom+'px;'">第三方登录</view>
			<view id="login-view">
				<!--
				<view style="margin-right:73rpx;">
					<image src="../../static/img/user/qq.png" class="login-icon" :style="'height:'+iconHeight+'px;width:'+iconHeight+'px;'"></image>
				</view>
				-->
				<view @tap="thirdLoginByWx">
					<image src="../../static/img/user/weichat.png" class="login-icon" :style="'height:'+iconHeight+'px;width:'+iconWidth+'px;'"></image>
				</view>
				<view @tap="thirdLoginByApple">
					<view class="sign-in-with-apple" v-if="system >= 13 && platform==2">通过Apple登录</view>
				</view>
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
				system: '',
				validate_code: '',
				disabled: false,
				message: '',
				bgViewHeight: 0,
				marginTop: 0,
				codeViewTop: 0,
				sendCodeBtnHeight: 0,
				submitViewHeight: 53,
				thirdLoginTop: 81,
				thirdLoginBottom: '',
				absoluteViewTop:87,
				maxWidth:79,
				telErrorMsg: '',
				codeErrorMsg: '',
				iconHeight: '',
				iconWidth: '',
				isChecked: 0,
				errorBottom: '',
				allInfoBottom: '',
				allowInfoErrorMsg: '',
				lineHeight: '',
				platform: getApp().globalData.platform
			};
		},
		onLoad() {
			let info = uni.getSystemInfoSync();
			this.system = info.system;
			let winWidth = info.windowWidth;
			let ratio = 750/winWidth;
			ratio = ratio.toFixed(2);
			this.lineHeight =  info.statusBarHeight * ratio +40+ 'rpx';
			this.bgViewHeight = info.windowHeight * 0.3673;
			this.marginTop    = info.windowHeight * 0.0359;
			this.loginViewTop = this.bgViewHeight - 20;
			this.codeViewTop  = info.windowHeight * 0.0592;
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
			setUserInfo(userInfo) {
				console.log('setUserInfo', userInfo);
				this.$store.commit('setUserInfo', userInfo);
			},
			getStoreUserInfo() {
				return this.$store.getters.userInfo;
			},
			gotoUserAllowPage() {
				console.log('gotoUserAllowPage');
				uni.navigateTo({
					url: '/pages/user/user_agreement'
				});
			},
			gotoUserLicensePage() {
				console.log('gotoUserLicensePage');
				uni.navigateTo({
					url: '/pages/user/software_license'
				});
			},
			checkboxChange(e) {
				let valueArr = e.detail.value;
				if(valueArr.length>0) {
					this.isChecked = 1;
					this.allowInfoErrorMsg = '';
				} else {
					this.isChecked = 0;
					this.allowInfoErrorMsg = '请先勾选用户许可!';
				}
			},
			dialogConfirm(callback) {
				typeof callback == 'function' && callback();
			},
			dialogClose(callback) {
				typeof callback == 'function' && callback();
			},
			change(e) {
				
			},
			isPoneAvailable() {
				let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if(this.phone == 'test') {
					return true;
				}
				if (!myreg.test(this.phone)) {
					return false;
				} else {
					return true;
				}
			},
			validatePhone() {
				let phoneStr = this.phone.trim();
				if (phoneStr == '') {
					this.telErrorMsg = '手机号不能为空!';
					return false;
				} else {
					this.telErrorMsg = '';
				}
				if (!this.isPoneAvailable()) {
					this.telErrorMsg = '输入手机号码的格式不正确!';
					return false;
				} else {
					this.telErrorMsg  = '';
				}
				return true;
			},
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
			thirdLoginByApple() {
				console.log('thirdLoginByApple');
				let _self = this;
				uni.login({
				    provider: 'apple',
				    success: function (loginRes) {
				        // 登录成功
				        uni.getUserInfo({
				            provider: 'apple',
				            success(res) {
				                // 获取用户信息成功
								console.log('res', res);
								let  u = res.userInfo;
								const params = {
									nickName: '',
									avatarUrl: '',
									openId: u.openId,
									logintype: 'app_apple',
									filterData: true
								};
								_self.insertAppleLoginUserInfo(params);
				            }
				        });
				    },
				    fail: function (err) {
				        // 登录失败
						console.log('fail', err);
				    }
				});
			},
			// 校验用户是否勾选用户许可
			validateUserAllow() {
				// 如果已经
				if (this.isChecked == 1) {
					return true;
				}
				this.allowInfoErrorMsg = '请先勾选用户许可!';
				return false;
			},
			validateLogin() {
				let flag1 = this.validatePhone();
				let flag2 = this.validateCodeStr();
				let flag3 = this.validateUserAllow();
				return flag1 && flag2 && flag3;
			},
			async insertAppleLoginUserInfo(params) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=user&ac=apple_user";
				const resp = await http.request(url, params);
				console.log('login apple resp', resp);
				if (resp.status == 1) {
					// 3 表示apple 登录
					let userInfoStr = util.cache('app_user_info_3', null);
					let userInfoObj = {};
					if(userInfoStr) {
						userInfoObj = JSON.parse(userInfoStr);
					} else {
						userInfoObj   =  {};
						userInfoObj.avatarUrl = params.avatarUrl;
						userInfoObj.phone = "";
						userInfoObj.nickName = params.nickName;
						userInfoObj.uid   = resp.data.uid;
						// 首次登录之后level 为1,如果用户没有充值,后期再改...
						userInfoObj.level = 1;
					}
					console.log('insertAppleLoginUserInfo', userInfoObj);
					this.loginFunc(userInfoObj, 3);
				}
			},
			async login() {
				let isSuccess = this.validateLogin();
				if (!isSuccess) {
					// 不要登录
					return;
				}
				if(this.phone == 'test' && this.validate_code == 'test') {
					let userInfoStr = util.cache('app_user_info_1', null);
					let userInfoObj = {};
					if(userInfoStr) {
						userInfoObj = JSON.parse(userInfoStr);
					} else {
						userInfoObj.avatarUrl = '';
						userInfoObj.phone = this.phone;
						userInfoObj.nickName = 'test';
						userInfoObj.uid   = 258;
						// 首次登录之后level 为1,如果用户没有充值,后期再改...
						userInfoObj.level = 1;
						this.loginFunc(userInfoObj, 1);
					}
					return;
				}
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=user&ac=phonelogin";
				// 不允许点击一次,发送两次请求
				const resp = await http.request(url, {
					auth: auth,
					phone:this.phone,
					code: this.validate_code,
					platform: data.platform,
					filterData: true
				});
				console.log('login resp', resp);
				if(resp.status == 1) {
					// 保存token
					console.log('', resp);
					let userInfoStr = util.cache('app_user_info_1', null);
					let userInfoObj = {};
					if(userInfoStr) {
						userInfoObj = JSON.parse(userInfoStr);
					} else {
						userInfoObj   =  {};
						userInfoObj.avatarUrl = '';
						userInfoObj.phone = this.phone;
						userInfoObj.nickName = '*'.repeat(7)+(this.phone.substr(7, 4));;
						userInfoObj.uid   = resp.data.uid;
						// 首次登录之后level 为1,如果用户没有充值,后期再改...
						userInfoObj.level = 1;
					}
					//getApp().globalData.appLoginType = 1;
					this.loginFunc(userInfoObj, 1, resp.data.token);
				} else {
					this.codeErrorMsg = resp.message;
				}
			},
			loginFunc(userInfoObj, type, token) {
				util.cache('appLoginType', type);
				console.log('data', userInfoObj);
				if(token) {
					util.cache('app_token', token, 15*24*3600);
				}
				console.log('data', userInfoObj);
				util.cache('app_userid', userInfoObj.uid, 15*24*3600);
				util.cache('app_user_info_'+type, JSON.stringify(userInfoObj), 15*24*3600);
				console.log('data', userInfoObj);
				this.$store.commit('setUserInfo', userInfoObj);
				console.log('cache go here!');
				// 跳转到个人中心,后续逻辑..
				uni.showToast({
					title:"登录成功!",
					duration:1000,
					complete() {
						uni.switchTab({
							url:'/pages/user/index'
						});
					}
				});
			},
			thirdLoginByQQ() {
				
			},
			thirdLoginByWx() {
				let flag3 = this.validateUserAllow();
				if(!flag3) {
					return;
				}
				console.log("App微信拉起授权")
				var that=this;
				uni.getProvider({
				    service: 'oauth',
				    success: function(res) {
				        console.log(res.provider);
				        //支持微信、qq和微博等
				        if (~res.provider.indexOf('weixin')) {
				            uni.login({
					            provider: 'weixin',
					            success: function (loginRes) {
									  console.log("App微信获取用户信息成功",loginRes);
					                  //that.getApploginData(loginRes)  //请求登录接口方法
									  let data = loginRes;
									  uni.request({
										  url: "https://api.weixin.qq.com/sns/userinfo?access_token="+
										  data.authResult.access_token+"&openid="+data.authResult.openid,
										  method: 'GET',
										  dataType: 'json',
										  header: {
										    'content-type': 'application/x-www-form-urlencoded' // 默认值
										  },
										  success(res) {
											console.log('【登录回调啾啾啾】',res);
											const data = getApp().globalData;
											const apiPrefix = data.serverUri;
											const auth = data.auth;
											const url = apiPrefix + "?mod=user&ac=wx_user";
											const resData = res.data;
											let userForm = {
												code: resData.openid,
												nickname:  resData.nickname,
												avatarurl: resData.headimgurl,
												gender: resData.sex,
												country: resData.country,
												province: resData.province,
												city: resData.city,
												logintype: 'wx_app',
												auth: auth,
												filterData: true
											};
											console.log('params', userForm);
											console.log('url', url);
											http.request(url, userForm).then(resp => {
												//登录成功
												console.log('resp', resp);
												if (resp.status == 1) {
													//getApp().globalData.appLoginType = 2;
													util.cache('appLoginType', 2);
													let userInfoStr = util.cache('app_user_info_2', null);
													let userInfoObj = {};
													if(userInfoStr) {
														userInfoObj = JSON.parse(userInfoStr);
													} else {
														userInfoObj   = { nickName: resData.nickname, avatarUrl: resData.headimgurl, 
														uid: resp.data.id, level:1,phone: '' };
													}
													console.log('userInfoObj', userInfoObj);
													/*let u = this.getStoreUserInfo();
													console.log('u', u);
													console.log('userInfoObj', userInfoObj);
													this.setUserInfo(userInfoObj);*/
													console.log('resp.data', resp.data);
													util.cache('app_userid', resp.data.id, 15*24*3600);
													util.cache('app_user_info_2', JSON.stringify(userInfoObj), 15*24*3600);
													console.log('data', userInfoObj);
													console.log('hehe');
													that.setUserInfo(userInfoObj);
													// 判断用户手机号是否有绑定过.
													if(!userInfoObj.phone) {
														// 跳转到绑定手机号界面
														uni.showToast({
															title:"登录成功!",
															duration:1000,
															complete() {
																uni.redirectTo({
																	url:'/pages/user/bind_phone'
																});
															}
														});
														return;
													}
													// 已经绑定手机号的,跳转到首页...
													uni.showToast({
														title:"登录成功!",
														duration:1000,
														complete() {
															uni.switchTab({
																url:'/pages/index/index'
															});
														}
													});
												}
											});
										  }
									  });
								},
					            fail:function(res){
					              console.log("App微信获取用户信息失败",res);
				              	}
				            });
						}
				     }
				});
			},
			back() {
				uni.navigateBack({
					delta:1
				});
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
			sendCode() {
				if(!this.isPoneAvailable()) {
					this.telErrorMsg = '请输入正确的手机号码';
					return;
				}
				if(this.disabled) {
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
			}
		}
	}
</script>

<style lang="scss">
view {
	display: flex;
}
#back-icon-view {
	display: flex;
	position: absolute;
	top: 30px;
	width:700rpx;
	z-index:10000001;
}
#bg-view {
	height:470rpx;
	.app_login_image {
		width:750rpx;
		height: 100%;
	}
}
#absolute-view {
	display: flex;
	flex-direction: column;
	align-items: center;
	width:750rpx;
	position: absolute;
	z-index:1000001;
	top:174rpx;
	left:0rpx;
	#login-title{
		justify-content: center;
		display: flex;
		font-size:39rpx;
		font-family:HeitiCSEG;
		font-weight:normal;
		color:rgba(255,255,255,1);
	}
	#login-img {
		justify-content: center;
		.login-logo {
			max-width:100%;
			max-height: 100%;
		}
	}
}
#login-area-view {
	position:absolute;
	top:500rpx;
	background:rgba(252,252,253,1);
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	border: 1px solid  rbga(255,255, 255);
	flex-direction: column;
	#error-code-view {
		margin-left:54rpx;
		height:20px;
		color:#FF0000;
		margin-bottom: 103rpx;
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		opacity: 0.5;
	}
	.error-text{
		margin-left:5px;
		color:#FF0000;
		font-size:26rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
	}
	#code-view {
		display: flex;
		margin-top:79rpx;
		margin-left:54rpx;
		margin-right:52rpx;
		padding-bottom: 20px;
		border-bottom: 1px solid #DCDCDC;
		#validate_code {
			display: flex;
		}
		.send-code-btn {
			display: flex;
			width:273rpx;
			height: 50rpx;
			font-size:29rpx;
			align-items: center;
			justify-content: center;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(254,254,254,1);
			border: 0px solid black;
			background: url(../../static/img/user/login_send_code.png);
			background-size: 273rpx 100%;
		}
		.send-code-btn::after {
			border: 0px;
		}
	}
	
	#user-allow-info {
		margin-left: 54rpx;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		opacity: 0.5;
		.underline-text {
			text-decoration: underline;
			color: blue;
		}
	}
	
	#error-tel-view {
		height: 20px;
		margin-left:53rpx;
		color:#FF0000;
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		opacity: 0.5;
	}
	#tel-view {
		display: flex;
		margin-left:53rpx;
		margin-right:52rpx;
		margin-top:48rpx;
		padding-bottom: 20px;
		border-bottom: 1px solid #DCDCDC;
		#phone-id {
			margin-left:86rpx;
			display: flex;
		}
		.tel-prefix {
			display: flex;
			font-size:37rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(29,167,232,1);
		}
	}

	#submit-view {
		display: flex;
		width:643rpx;
		height:106rpx;
		margin-left:54rpx;
		margin-right:53rpx;
		button {
			display: flex;
			font-size:40rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(254,254,254,1);
			border: 0px;
			background-color: transparent;
			justify-content: center;
			align-items: center;
			width:100%;
			border-radius: 53rpx;
			background:linear-gradient(270deg,rgba(27,162,232,1),rgba(54,234,232,1));
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
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(128,128,128,1);
		opacity: 0.5;
	}

	.login-icon {
		width:80.7px;
		height: 80.7px;
	}
}

.dialog-class {
	flex-direction: column;
}
</style>
