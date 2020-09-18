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
			<view id="phone-box">
				<input v-model.trim="phone" id="phone"  @blur="validatePhone()" focus ref="phoneRef" placeholder="请输入手机号码" placeholder-class="place-holder-class" />
			</view>
			<view id="error-tel-view">
				<text>{{telErrorMsg}}</text>
			</view>
			
			<view id="code-box">
				<input v-model.trim="codeStr" @blur="requireCodeStr" id="codeStr" placeholder="请输入验证码" placeholder-class="place-holder-class" /> 
				<button   @tap="sendCode()"  class="send-code-btn" :disabled="disabled">{{sendMsg}}</button>
			</view>
			<view id="error-tel-view">
				<text>{{codeErrorMsg}}</text>
			</view>
			<view id="submit-view">
				<button type="default" size="mini" @tap="goHome()" style="border:0px solid #000000;" v-if="isBind">暂不绑定</button>
				<button type="primary" size="mini" @tap="savePhone()" style="border:0px solid #000000;">{{saveText}}</button>
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
				phone: '',
				lineHeight: '',
				headerViewHeight: '',
				telErrorMsg: '',
				codeErrorMsg: '',
				codeStr: '',
				isBind: 1,
				saveText: '',
				disabled: false,
				sendMsg: '获取验证码',
			};
		},
		onLoad() {
			let type = util.cache('appLoginType', null);
			let userInfoStr = util.cache('app_user_info_'+type,null);
			let userInfo    = userInfoStr ? JSON.parse(userInfoStr): {};
			uid        = userInfo.uid;
			console.log('userInfo', userInfo);
			let title = '';
			if(userInfo.phone) {
				this.phone = userInfo.phone;
				this.isBind = 0;
				this.saveText = '保存';
				title = '修改手机号';
			} else {
				this.isBind = 1;
				this.saveText = '绑定';
				title = '绑定手机号';
			}
			uni.setNavigationBarTitle({
				title: title
			});
		},
		methods:{
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
				let code = this.codeStr;
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
					uid: uid,
					code: this.codeStr,
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
										url: '/pages/index/index'
									});
								}
							})
							
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

#phone-box {
	padding-top:20px;
	border-bottom:1px solid #B2E3CF;
	padding-bottom: 20px;
	display: flex;
	align-items: center;
	/*height: 40px;*/
}

#error-tel-view {
	height: 20px;
	color:#FF0000;
	font-size:32rpx;
	font-family:Microsoft YaHei;
	font-weight:400;
	opacity: 0.5;
}

#code-box {
	display: flex;
	align-items: center;
	color:#A5A5A5;
	border-bottom:1px solid #B2E3CF;
	padding-top:20px;
	padding-bottom:20px;
	.send-code-btn {
		margin-left:20px;
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

#submit-view {
	margin-top:20px;
	button {
		
	}
}


#phone {
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
