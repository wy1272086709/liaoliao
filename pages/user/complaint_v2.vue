<template>
	<view id="root-view">
		<form @submit="submitComplaint">
		<view id="complaint-content-view">
			<textarea name="content" maxlength="300" v-model="content" placeholder="请留下您的宝贵意见！" class="complaint-textarea" placeholder-class="placeholder-text"></textarea>
		</view>
		
		<view id="submit-view" >
			<button  form-type="submit"  style="border:0px solid #000000;">提交</button>
		</view>
		</form>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	export default {
		data() {
			return {
				tel: '', // 手机号码
				content: '',
				title: '投诉建议',
				winHeight: 0
			}
		},
		methods: {
			// 提交投诉
			submitComplaint() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=lyb&ac=lyb_add";
				http.request(url, {
					phone: '13888888888',
					content: this.content,
					auth:auth,
					filterData:true,
				}).then(resp=>{
					if(resp.status == 1) {
						//console.log('resp', resp);
						uni.showModal({
							title: '提示',
							content: '感谢你提交的投诉和建议',
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {
								uni.switchTab({
									url: '/pages/user/user_index'
								});
							},
							fail: () => {},
							complete: () => {
								
							}
						});
					}
				});
			},
			onSubmit() {
				let isValid = this.validateFunc();
				if(isValid) {
					this.submitComplaint();
				}
			},
			// 校验方法
			validateFunc() {
				let isRequired = this.isRequired();
				if(!isRequired) {
					uni.showToast({
						title: '手机号码和建议内容必填!',
						icon:"none",
						duration: 2000
					});
					return;
				}
				
				let isContentValid = this.isContentValid();
				if (!isContentValid) {
					uni.showToast({
						title: '建议内容不超过300个字',
						icon:"none",
						duration: 2000
					});
					return;
				}
				return true;
			},
			isContentValid() {
				let s = this.content.length;
				if(s>300) {
					return false;
				}
				return true;
			},
			isRequired() {
				if (!this.content) {
					return false;
				}
				return true;
			}
		},
		onLoad() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight+'px';
		}
	}
</script>

<style>
	page {
		background-color: #F2F2F2;
	}
	
#root-view {
	display: flex;
	flex-direction: column;
	margin-left:45rpx;
	margin-right:45rpx;
	margin-top:62rpx;
	margin-bottom:95rpx;
	justify-content: center;
}
#complaint-content-view {
	display: flex;
	justify-content: center;
	padding-left: 24rpx;
	padding-right: 24rpx;
	padding-top: 37rpx;
	/*width: 660rpx;*/
	
	height: 520rpx;
	background: #FFFFFF;
	border-radius: 10rpx;
}
#complaint-content-view>textarea {
	width: 636rpx;
	height: 100%;
	
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #323232;
}

.placeholder-text {
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #B2B2B2;
}

#submit-view {
	display: flex;
	height:100rpx;
	margin-top: 95rpx;
}

#submit-view >button {
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
	
#submit-view > button::after {
	border: none;
	width:0;
	height: 0;
	-webkit-transform:scale(1);
	transform:scale(1);
	display: none;
	background: transparent;
}
</style>
