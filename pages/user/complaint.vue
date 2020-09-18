<template>
	<view id="root-view" :style="'height:'+winHeight+';'">
		<scroll-view class="content">  
			<view class="info-content">
				<image src="../../static/img/info.png" style="max-width: 20px;max-height:20px;"></image>
				<text>您的投诉建议我们会认真对待，感谢支持</text>
			</view>
			<form @submit="onSubmit" class="form-class">  
				<view id="complaint-tel-view">
					<input name="tel" v-model="tel" placeholder="手机号码" class="complaint-input" />
				</view>
				<view id="complaint-content-view">
					<textarea name="content" v-model="content" placeholder="请输入投诉或者建议内容" class="complaint-textarea"></textarea>
				</view>
				<button form-type="submit" type="default" id="submitBtn"><text id="submitBtnText">提交</text></button>  
			</form>  
		</scroll-view>
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
					phone: this.tel,
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
								uni.navigateBack({
									url: '/pages/user/index'
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
				let isValid = this.isPoneAvailable();
				if(!isValid) {
					uni.showToast({
						title: '请输入正确的手机号码',
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
				if (!this.tel || !this.content) {
					return false;
				}
				return true;
			},
			isPoneAvailable() {
				let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(this.tel)) {
					return false;
				} else {
					return true;
				}
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN || MP-QQ
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#endif
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight+'px';
		},
		onShareAppMessage() {
			let pages = getCurrentPages(); //获取加载的页面
			let currentPage = pages[pages.length-1]; //获取当前页面的对象
			let url = currentPage.route; //当前页面url
			return {
				title: '投诉建议',
				path: url,
				success: function() {
				},
				fail: function() {
				}
			};
		}
	}
</script>

<style>
page {
	
}

#root-view {
	display: flex;
	justify-content: center;
	/*background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);*/
	background: #2369E6;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top:20px;
	width:670rpx;
}
.info-content {
	display: flex;
	height:30px;
	flex-wrap: wrap;
	width:100%;
}

.info-content>text {
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(255,255,255,1);
}

.form-class {
	width: 100%;
}

.complaint-input {
	height:44px;
	width:100%;
}

#complaint-tel-view, #complaint-content-view {
	display:flex;
	border-radius: 20rpx;
	width:100%;
	background-color: #FFFFFF;
	margin-bottom: 25px;
}

.complaint-input,.complaint-textarea {
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	padding-left:8px;
	padding-right:5px;
	color:rgba(170,170,170,1);
}

.complaint-textarea {
	height: 180px;
	width:100%;
}

#submitBtn {
	background-color: rgba(255,255,255,1);
	border-radius: 44rpx;
	height: 44px;
	width: 100%;
}


#submitBtnText {
	color:#3DB1F2;
	font-size:16px;
	font-family: PingFangSC-Semibold,PingFang SC;;
	font-weight: 600;
}
</style>
