<template>
	<view id="root-view">
		<scroll-view class="content" :style="'height:'+winHeight+';'">  
			<view class="info-content">
				<image src="../../static/img/info.jpg" style="max-width: 20px;max-height:20px;"></image>
				<text>您的投诉建议我们会认真对待，感谢支持</text>
			</view>
			<form @submit="onSubmit" class="form-class">  
				<input name="tel" v-model="tel" placeholder="手机号码" class="complaint-input" />
				<textarea name="content" v-model="content" placeholder="请输入投诉或者建议内容" class="complaint-textarea"></textarea>
				<button form-type="submit" type="default" id="submitBtn"><text id="submitBtnText">提交</text></button>  
			</form>  
		</scroll-view>
	</view>
</template>

<script>
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
			onSubmit() {
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
		},onLoad() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight+'px';
		}
	}
</script>

<style>
page {
	
}

#root-view {
	display: flex;
	justify-content: center;
	background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
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
}
.complaint-input,.complaint-textarea {
	display:flex;
	border-radius: 20rpx;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	background-color: #FFFFFF;
	margin-bottom: 25px;
	color:rgba(170,170,170,1);
	width:100%;
}

.complaint-textarea {
	height: 180px;
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
