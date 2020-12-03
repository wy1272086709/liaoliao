<template>
	<view id="root-view" :style="'height:'+winHeight+';'">
		<scroll-view class="content">  
		<!--
			<view class="info-content">
				<!--
				<image src="../../static/img/info.png" style="max-width: 20px;max-height:20px;"></image>
				-->
				<!--
				<text>妹子说</text>
			</view>
			-->
			<form class="form-class">  
			<!--
				<view id="girlword-view">
					<input type="text" name="girlword" maxlength="30" @blur="validateWord" v-model.trim="girlword" placeholder="请输入妹子说的话" class="girlword-input" />
				</view>
				<view id="error-girlword-view">
					<text>{{errorWordMsg}}</text>
				</view>
				-->
				<view class="ques-desc">
					<text>问题描述</text>
				</view>
				<!-- :style="{height:(areaHeight-100)+'px'}" -->
				<view id="girlword-content-view" :style="{height:textAreaHeight+'px'}">
					<textarea name="content" :adjust-position="true" @focus="areaFocus"   @blur="validateContent"  maxlength="-1" v-model.trim="content" placeholder="请输入具体内容" class="girlword-textarea"></textarea>
				</view>
				<view id="bottom-view">
					<text class="submitBtn" @tap="onSubmit">
						<text class="submitBtnText">发布</text>
					</text>  
					<text  class="cancelBtn">
						<text>取消</text>
					</text>  
				</view>
			</form>  
		</scroll-view>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	export default {
		data() {
			return {
				errorWordMsg: '', // 手机号码
				content: '',
				winHeight: 0,
				areaHeight: '',
				textAreaHeight: "150",
				girlword: '',
			}
		},
		computed:{
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			}
		},
		methods: {
			validateWord() {
				
			},
			areaFocus(e) {
				const d = e.detail;
				const extraH = 54+60+60+42+20+60+35+38;
				let winHeight = uni.getSystemInfoSync().windowHeight;
				this.textAreaHeight = winHeight - uni.upx2px(extraH) - d.height;
				console.log('d', d);
			},
			validateContent() {
				
			},
			// 提交投诉
			submitGirlword() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=ndgc&ac=fb_insert";
				http.request(url, {
					title: '',
					description: this.content,
					uid: this.uid,
					auth:auth,
					filterData:true,
				}).then(resp=>{
					console.log('resp', resp);
					if(resp.status == 1) {
						uni.showToast({
							title: '发布成功!',
							fail: () => {},
							complete: () => {
								uni.switchTab({
									url: '/pages/mind_square/index'
								});
							}
						});
					}
				});
			},
			onSubmit() {
				if(!this.uid) {
					uni.showToast({
						icon:'none',
						title:'请先登录!',
						duration:1000,
						complete() {
							uni.redirectTo({
								url:'/pages/user/login_v2'
							});
							return;
						}
					});
					return;
				}
				let isValid = this.validateFunc();
				if(isValid) {
					this.submitGirlword();
				}
			},
			// 校验方法
			validateFunc() {
				let isRequired = this.isRequired();
				if(!isRequired) {
					uni.showToast({
						title: '妹子说的话和问题描述必填!',
						icon:"none",
						duration: 1000
					});
					return;
				}
				let isContentValid = this.isContentValid();
				if (!isContentValid) {
					uni.showToast({
						title: '问题描述不超过500个字',
						icon:"none",
						duration: 1000
					});
					return;
				}
				return true;
			},
			isContentValid() {
				let s = this.content.length;
				return true;
				if(s>500) {
					return false;
				}
				return true;
			},
			isRequired() {
				if ( [...this.content].length<=0 ) {
					return false;
				}
				return true;
			},
		},
		onLoad() {
			//#ifdef MP-WEIXIN || MP-QQ
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#endif
			const extraH = 54+60+60+42+20+60+35+38;
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.areaHeight = winHeight - uni.upx2px(extraH);
			this.winHeight = winHeight+'px';
		},
		
	}
</script>

<style lang="scss">


#root-view {
	display: flex;
	justify-content: center;
	/*background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);*/
	background: #FFFFFF;
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top:20px;
		width:670rpx;
		.info-content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 160rpx;
			height: 60rpx;
			background: #F3F3F3;
			border-radius: 30rpx;
		
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #A88FEF;
			
		}
	}
	
	
	
	
	.form-class {
		width: 100%;
		#girlword-view {
			margin-top:54rpx;
			display:flex;
			height: 60rpx;
			align-items: center;
			background: #F3F3F3;
			border-radius: 10rpx;
			margin-bottom: 60rpx;
			
			padding-left:24rpx;
			.girlword-input {
				height: 100%;
				width:100%;
				font-size:14px;
				font-family:Microsoft Yahei;
				font-weight:400;
				//padding-left:8px;
				background-color:#F3F3F3;
			}
		}
		
		#error-girlword-view {
			color:#FF0000;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FF0000;
		}
		
		.ques-desc {
			display: flex;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #141414;
			margin-bottom: 20rpx;
		}
		
		#girlword-content-view {
			display:flex;
			border-radius: 10rpx;
			background: #F9F9F9;
			height: 350px;
			border-radius: 10rpx;
			margin-bottom: 35rpx;
			padding-top:38rpx;
			padding-left: 24rpx;
			.girlword-textarea {
				max-height: 500px;
				width:100%;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333232;
			}
		}
		
		#bottom-view {
			display: flex;
			justify-content: flex-end;
			.submitBtn {
				display: flex;
				width: 140rpx;
				align-items: center;
				justify-content: center;
				margin-right:27rpx;
				background-color: #E93EE3;
				border-radius: 30rpx;
				height: 60rpx;
				
				color:#FFFFFF;
				font-size:16px;
				font-family: PingFangSC-Semibold,PingFang SC;;
				font-weight: 600;
				
			}
			.cancelBtn {
				display: flex;
				width: 140rpx;
				justify-content: center;
				align-items: center;
				height: 60rpx;
				
				background: #F3F3F3;
				border-radius: 30rpx;
				
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9A9A9A;
				
			}
		}
		
	}
}


</style>
