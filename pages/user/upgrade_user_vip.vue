<template>
	<view class="upgrade-page">
		<view class="upgrade-header">
			<text id="combo-text">请先选择VIP套餐</text>
		</view>
		<view class="upgrade-content" :style="'height:'+scrollHeight+'px'" scroll-y="false" scroll-x="false">
			<view class="combo" @tap="selectCombo()" :style="'border:'+borderStyle+'px;'+'height:'+comboHeight+'px;'">
				<view class="left-image">
					<image class="image-vip-info" src="../../static/img/yuedu.png"></image>
				</view>
				<view class="right-view" :style="'margin-top:'+rightViewTop+'px;margin-bottom:'+rightViewBottom+'px;'">
					<view class="first-line">
						<text>月度会员套餐(30天)</text>
						<text class="price-text">¥{{yuedu_money}}</text>
					</view>
					<view class="second-line">
						<text>10万恋爱话术、搜索功能、AI聊天、无广告、搜索、表情包、装逼图</text>
					</view>
				</view>
			</view>
			<view class="combo" @tap="selectCombo2()" :style="'border:'+borderSecondStyle+'px;'+'height:'+comboHeight+'px;'">
				<view class="left-image">
					<image class="image-vip-info" src="../../static/img/jidu.png"></image>
				</view>
				<view class="right-view" :style="'margin-top:'+rightViewTop+'px;margin-bottom:'+rightViewBottom+'px;'">
					<view class="first-line">
						<text>季度会员套餐(90天)</text>
						<text class="price-text">¥{{jidu_money}}</text>
					</view>
					<view class="second-line" :style="'margin-top:'+secondLineMarginTop+'px;'">
						<text>10万恋爱话术、搜索功能、AI聊天、无广告、搜索、表情包、装逼图</text>
					</view>
				</view>
			</view>
			<view class="combo" @tap="selectCombo3()" :style="'border:'+borderThirdStyle+'px;'+'height:'+comboHeight+'px;'">
				<view class="left-image">
					<image class="image-vip-info" src="../../static/img/niandu.png"></image>
				</view>
				<view class="right-view" :style="'margin-top:'+rightViewTop+'px;margin-bottom:'+rightViewBottom+'px;'">
					<view class="first-line">
						<text class="combo-member-text">年度会员套餐(365天)</text>
						<text class="price-text">¥{{niandu_money}}</text>
					</view>
					<view class="second-line">
						<text class="combo-desc">10万恋爱话术、搜索功能、AI聊天、无广告、搜索、表情包、装逼图</text>
					</view>
				</view>
			</view>
		</view>
		<view class="upgrade-bottom">
			<button @click="wxPay()">购买</button>
		</view>
	</view>
</template>




<script>
	import http from '../../common/http.js';
	let money = 0;
	let level = 0;
	export default {
		data() {
			return {
				borderStyle: "",
				borderSecondStyle: "",
				borderThirdStyle: "",
				scrollHeight: 0,
				comboHeight: 0,
				rightViewTop: 0,
				rightViewBottom: 0,
				secondLineMarginTop: 0,
				yuedu_money: 0,
				jidu_money: 0,
				niandu_money: 0,
			}
		},
		computed: {
			userInfo: function() {
				return this.$store.getters.userInfo;
			}
		},
		onLoad() {
			let scrollHeight  = uni.getSystemInfoSync().windowHeight;
			let winWidth = uni.getSystemInfoSync().windowWidth;
			console.log(scrollHeight);
			let ratio = 375/winWidth;
			ratio = ratio.toFixed(2);
			this.scrollHeight = 145*3*ratio+20; 
			this.comboHeight  = 120*ratio;
			this.rightViewTop = 25*ratio;
			this.rightViewBottom = 28*ratio;
			this.secondLineMarginTop = 9*ratio;
			console.log('comboHeight', this.comboHeight);
		},
		mounted() {
			this.initVipMoney();
		},
		methods: {
			initVipMoney() {
				let userInfo = this.userInfo;
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=get_vip_jine";
				http.request(url, {
					auth: auth,
				}).then(resp=>{
					this.yuedu_money = resp.yue;
					this.jidu_money  = resp.ji;
					this.niandu_money = resp.nian;
					this.selectCombo();
				});
			},
			selectCombo() {
				this.borderStyle = "2px solid rgba(249,177,127,1);";
				this.borderSecondStyle = "";
				this.borderThirdStyle  = "";
				//money = 0.01;
				money = this.yuedu_money;
				level = 2;
			},
			selectCombo2() {
				this.borderStyle = "";
				this.borderSecondStyle = "2px solid rgba(249,177,127,1);";
				this.borderThirdStyle  = "";
				money = this.jidu_money;
				//money = 0.01;
				level = 3;
			},
			selectCombo3() {
				this.borderStyle = "";
				this.borderSecondStyle = "";
				this.borderThirdStyle  = "2px solid rgba(249,177,127,1);";
				money = this.niandu_money;
				//money = 0.01;
				level = 4;
			},
			wxPay() {
				this.comboPay();
			},
			generateSign(obj) {
				const data = getApp().globalData;
				const key = data.key;
				let str = "appId="+obj.appId+"&nonceStr="+obj.nonceStr+"&package="+obj.package+
				"&signType="+obj.signType+'&timeStamp='+obj.timeStamp+'&key='+key;
				return md5(str).toUpperCase();
			},
			comboPay() {
				let userInfo = this.userInfo;
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=unifiedorder";
				http.request(url, {
					auth: auth,
					money: money,
					uid: userInfo.uid,
					level: level,
					filterData: true
				}).then(resp => {
					console.log('resp', resp);
					uni.requestPayment({
						appId: resp.appid,
						timeStamp: resp.timeStamp,
						nonceStr: resp.nonce_str,
						package: resp.prepay_id,
						signType: 'MD5',
						paySign: resp.paySign2,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
							uni.showModal({
								title: '提示',
								content: '充值失败!',
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res2 => {
									
								}
							});
						},
						complete: (res) => {
							let msg = '';
							if(res.errMsg == 'requestPayment:ok') {
								msg = '充值成功!';
								uni.showModal({
									title: '提示',
									content: msg,
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res2 => {
										if(res2.confirm) {
											getApp().globalData.isRecharge = 1;
											uni.switchTab({
												url: '/pages/user/index'
											});
										}
									}
								});
							}
						}
					});
				});
				
				
			}
		}
	}
</script>

<style>
	
page {
	background-color: #2369E6;
}

view,scroll-view {
	display:flex;
	box-sizing: border-box;
}
.upgrade-header {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	height: 40px;
	width:670rpx;
}

.upgrade-content {
	display: flex;
	flex-direction: column;
	width:670rpx;
}


.combo {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 25px;
	background:rgba(255,255,255,1);
	border-radius:10px;
	height: 120px;
}

.right-view {
	flex-direction: column;
	width:468rpx;
	margin-left:40rpx;
	margin-right:40rpx;
}

.second-line {
	margin-top: 9px;
}

.left-image {
	display: flex;
	justify-content: center;
	align-items: center;
	width:100px;
	box-sizing: border-box;
	background:linear-gradient(90deg,rgba(244,245,246,1) 0%,rgba(255,247,209,1) 100%);
	border-radius:20rpx 0rpx 0rpx 20rpx;
}


.upgrade-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
	height: 100%;
}

.image-vip-info {
	display: flex;
	height:60px;
	width: 60px;
}

.second-line>text {
	font-size:24rpx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(102,102,102,1);
}

.first-line {
	justify-content: space-between;
}
#combo-text {
	font-weight: bold;
	
}

.first-line:first-child {
	font-size:32rpx;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(51,51,51,1);
}

.combo-text::before {
	width:10px;
}

.price-text {
	font-size:36rpx;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(249,177,127,1);
}

.upgrade-bottom {
	margin-top:20px;
	display: flex;
	flex-direction: column;
	width: 670rpx;
	height: 50px;
	position: relative;
}

.upgrade-bottom>button {
	width:100%;
	border: 1px solid #007AFF;
	border-radius: 100px;
	background-color: #3DB1F2;
}
</style>
