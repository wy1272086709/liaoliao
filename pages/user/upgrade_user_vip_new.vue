<template>
	<view id="root-view">
		<view id="top-view-box">
			<view id="first-line" class="common-line-font">
				<view id="first-line-left">
					<image src="../../static/img/user/pay_vip/crown.png" style="width:37rpx;height:32rpx;margin-right:14rpx;"></image>
					<text>妙语千寻聊天话术VIP</text>
				</view>
				<view id="first-line-right">
					<text>尊享三大特权</text>
				</view>
			</view>
			<view id="vip-info-box">
				<view style="height:57rpx;">
					
				</view>
				<view id="second-line">
					<view id="second-line-left">
						<view class="second-line-start">
							
						</view>
						<view class="vip-privilege">
							<text>VIP特权</text>
						</view>
					</view>
					<view id="second-line-right">
						<text>更多特权,敬请期待</text>
					</view>
				</view>
				<view id="third-line">
					<view v-for="(info,index) in vipInfoList" :key="info.id" class="vip-privilege-info">
						<image :src="info.src" :style="{width: (index==0?'48rpx':(index == 1?'56rpx':'52rpx')),
						height:(index==0?'60rpx':(index==1?'56rpx':'60rpx')) }"></image>
						<text style="margin-top:17rpx;">{{info.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<view id="bottom-view-box">
			<view id="info-vip">
				<view class="second-line-start">
					
				</view>
				<view>
					<text class="vip-privilege">开通方式</text>
				</view>
			</view>
			<view id="pay-view-box">
				<view id="pay-box-left">
					<!--
					<view class="pay-box-method">
						<text>直接购买</text>
					</view>
					-->
					<view id="pay-box-combo">
						<view class="pay-box-combo-css" @tap="showPayDialog(2, 'VIP1')">
							<text>{{yuedu_money}}/月</text>
							<text>,充值送 {{yuedu_jifen}} 积分</text>
						</view>
						<view class="pay-box-combo-css" @tap="showPayDialog(3, 'VIP2')">
							<text>{{jidu_money}}/季</text>
							<text>,充值送 {{jidu_jifen}} 积分</text>
						</view>
						<view class="pay-box-combo-css" @tap="showPayDialog(4, 'VIP3')">
							<text>{{niandu_money}}/年</text>
							<text>,充值送 {{niandu_jifen}} 积分</text>
						</view>
					</view>
				</view>
				<!--
				<view id="pay-box-right">
					<!--
					<view class="pay-box-method">
						<text>分享获得</text>
					</view>
					-->
					<!--
					<view class="common-line-font pay-box-share-line1">
						<text style="color: #272727;">分享好友自动开通</text>
					</view>
					<view class="common-line-font pay-box-share-line2">
						<text style="color: #272727;">分享3位好友</text>
					</view>
					<view @tap="share">
						<view class="pay-box-share">
							<text>立即分享</text>
						</view>
					</view>
				</view>
				-->
			</view>
		</view>
		<uni-popup id="popupDialog" ref="popupDialog" type="select">
			<uni-popup-select :bottomData="payData" @select="handleSelect"></uni-popup-select>
		</uni-popup>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import uniPopupSelect from '../../components/uni-popup/uni-popup-select.vue';
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js';
	let bottomImageMenu;
	let money =  '';
	let iapChannel = null, productId = 'VIP1',
        productIds = ['VIP1', 'VIP2', 'VIP3'];
	export default {
		data() {
			let _self = this;
			return {
				vipInfoList: [
					{
						id: 1,
						src: '../../static/img/user/pay_vip/lock.png',
						text: '话术全解锁'
					},
					{
						id: 2,
						src: '../../static/img/user/pay_vip/tutorial.png',
						text: '全方位教程'
					},
					{
						id: 3,
						src: '../../static/img/user/pay_vip/mentor.png',
						text: '导师教学'
					}
				],
				yuedu_money: '',
				jidu_money: '',
				niandu_money: '',
				loading: false,
				//money = 0.01;
				level: 0,
				platform: '',
				payData: [
					{ text:'微信支付', id:1,  icon: '../../static/img/user/wx_pay.png' },
					{ text:'支付宝支付', id:2,  icon: '../../static/img/user/alipay.png' }
				],
				bottomData: [
					{
						label: '微信朋友圈',
						icon: '/static/img/user/wx_timeline.png',
						onClick() {
							console.log('wx timeline click22222!');
							_self.shareWxOrWxTimeline('wx_timeline', 'weixin');
						}
					},
					{
						label: '微信',
						icon: '/static/img/user/wx.png',
						onClick() {
							console.log('wx  click!22222');
							_self.shareWxOrWxTimeline('wx', 'weixin');
						}
					}
				],
				yuedu_jifen: '',
				niandu_jifen: '',
				jidu_jifen: '',
			}
		},
		components:{
			uniPopupSelect
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
		async onLoad() {
			console.log('onLoad...');
			let data = getApp().globalData;
			this.platform = data.platform;
			await this.initVipMoney();
			if(this.platform == 1) {
				
			} else {
				this.yuedu_money = 12;
				this.jidu_money  = 25;
				this.niandu_money = 73;
				
				//#ifdef APP-PLUS
				plus.payment.getChannels((channels) => {
					console.log("获取到channel" + JSON.stringify(channels))
					for (var i in channels) {
						var channel = channels[i];
						if (channel.id === 'appleiap') {
							iapChannel = channel;
							this.requestOrder();
						}
					}
					if(!iapChannel){
						this.errorMsg()
					}
				}, (error) => {
					this.errorMsg()
				});
				
				// #endif
			}

			// ios
			if(data.platform == 2) {
				this.payData = [
					{ 
						//text:'支付宝支付', id:2,  icon: '../../static/img/user/alipay.png',
						text:'苹果支付', id:3,  icon: '../../static/img/user/white-logo-masked-circular.png'
					}
				];
				// android
			} else if(data.platform == 1) {
				this.payData = [
					{ text:'微信支付', id:1,  icon: '../../static/img/user/wx_pay.png' },
					{ text:'支付宝支付', id:2,  icon: '../../static/img/user/alipay.png' }
				];
			}
		},
		methods: {
			requestOrder() {
				iapChannel.requestOrder(productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
					console.log('requestOrder success666: ' + JSON.stringify(orderList));
				}, (e) => {
					console.log('requestOrder failed: ' + JSON.stringify(e));
					this.errorMsg()
				});
			},
			requestPayment(productId) {
				console.log('requestPayment', productId);				
				uni.requestPayment({
					provider: 'appleiap',
					orderInfo: {
						productid: productId
					},
					success: (e) => {
						console.log('e', e);
						//this.loading = true;
						this.payServerFunc(e);
						/*uni.showModal({
							content: "感谢您的赞助",
							showCancel: false
						});*/
					},
					fail: (e) => {
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						});
					},
					complete: () => {
						uni.hideLoading();
						console.log("payment结束")
						//this.loading = false;
					}
				});
			},
			errorMsg(){
				uni.showModal({
					content: "暂不支持苹果 iap 支付",
					showCancel: false
				})
			},
			payServerFunc(e) {
				console.log('payServerFunc', e);
				let params = {
					apple_result: JSON.stringify(e)
				};
				if (e.transactionState == 1 && e.errMsg == 'requestPayment:ok') {
					params.uid = this.uid;
					params.cid = this.level;
					params.money = money;
				} else {
					return;
				}
				
				let data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				params.auth     = auth;
				params.filterData = true;
				let url = apiPrefix+'?mod=apple_pay&ac=pay';
				console.log('url', url, 'params:', params);
				http.request(url, params).then(resp => {
					console.log('pay resp:', resp);
					if(resp.status != 1) {
						uni.showModal({
							title:'校验失败:'+resp.message
						});
					}  else {
						// 跳转到个人中心
						let globalData = getApp().globalData;
						globalData.isRecharge = 1;
						uni.showToast({
							title: '支付成功',
							duration:1000,
							complete() {
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/user/user_index'
									})
								}, 1000);
							}
						});
					}
				});
			},
			share() {
				let menus = this.bottomData;
				bottomImageMenu = new BottomImageMenu(menus, (menu, index) => {
					console.log('menu',menu, 'index', index);
				});
				bottomImageMenu.show();
			},
			shareRequest() {
				let data = getApp().globalData
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				let url = apiPrefix+'?mod=user&ac=fenxiang';
				http.request(url, {
					auth:auth,
					filterData:true,
					uid:this.uid,
					furl:'https://kuwoi.com/',
				});
			},
			shareWxOrWxTimeline(scene, provider) {
				console.log('shareWxOrWxTimeline');
				let _self = this;
				uni.share({
					provider: provider,
					scene: scene=='wx_timeline' ?
						'WXSenceTimeline' : "WXSceneSession",
					type: 0,
					title: '我在妙语千寻上找话术',
					summary: '拒绝尬聊，多方位开启话题助阵您不疲累不应付 妙语千寻，打开话题让约会不在尴尬',
					imageUrl: '../../static/img/user/miaoyu.png',
					href: "https://kuwoi.com/",
					success: (res) => {
						console.log("success:" + JSON.stringify(res));
						_self.shareRequest();
					},
					fail: (e) => {
						console.log('fail', e);
						uni.showModal({
							content: '分享失败!',
							showCancel: false,
							complete() {
								if(bottomImageMenu) {
									bottomImageMenu.close();
								}
							}
						})
					}
				});
			},
			showPayDialog(payType, productIdVal) {
				/*if (!this.loading) {
					return;
				}*/
				this.level = payType;
				console.log('payType', payType);
				if(this.platform == 2) {
					uni.showLoading({
						title: '加载中...'
					});
				}
				//2,3,4,对应的月度,季度,年度
				if (payType == 2) {
					money = this.yuedu_money;
				} else if(payType == 3) {
					money = this.jidu_money;
				} else if(payType == 4) {
					money = this.niandu_money;
				}
				console.log('this.platform', this.platform);
				if (this.platform == 1) {
					this.$refs.popupDialog.open();
				} else if(this.platform == 2){
					//const productId = 'miaoyu999';
					console.log('productId', productIdVal);
					this.requestPayment(productIdVal);
				}
			},
			// 获取VIP 金额列表...
			initVipMoney() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=get_vip_jine";
				http.request(url, {
					auth: auth,
				}).then(resp=>{
					this.yuedu_money = resp.yue;
					this.yuedu_jifen   = resp.yue_jifen;
					this.jidu_money  = resp.ji;
					this.jidu_jifen   = resp.ji_jifen;
					this.niandu_money = resp.nian;	
					this.niandu_jifen    = resp.nian_jifen;
				});
			},
			checkIsInstallWx(){
				if(!plus.runtime.isApplicationExist({pname:'com.tencent.mm',action:'weixin://'})){
					// 提示用户
					uni.showModal({
						title:"提示",
						content:"检测到未安装微信,请先安装微信!",
						showCancel:false,
						confirmText: '确定',
						success() {
							uni.switchTab({
								url:'/pages/user/user_index'
							});
						}
					});
					return;
				}
			},
			async appWxPay() {
				this.checkIsInstallWx();
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=wxpay_app";
				console.log('url',url);
				let level = this.level;
				const paytype = 'wx_app';
				const params = {
					auth: auth,
					money: money,
					uid: this.uid,
					level: level,
					paytype: paytype,
					pay_type: 1,
					filterData: true
				};
				console.log('wxpay params:', params);
				try {
					let resp = await http.request(url, params);
					console.log('wxAppPay resp', resp);
					let orderInfo = {
						appid: resp.appid,
						noncestr: resp.nonce_str,
						package: "Sign=WXPay",
						partnerid: resp.mch_id,
						prepayid: resp.prepay_id,
						timestamp: resp.timeStamp,
						sign: resp.paySign2
					};
					console.log('orderInfo', orderInfo);
					uni.requestPayment({
						provider:  'wxpay',
						orderInfo: orderInfo,
						success: function(e) {
							console.log('pay success', e);
							let globalData = getApp().globalData;
							globalData.isRecharge = 1;
							uni.showToast({
								title: '支付成功',
								duration:1000,
								complete() {
									setTimeout(()=>{
										uni.switchTab({
											url:'/pages/user/user_index'
										})
									}, 1000);
								}
							});
						},
						fail: function(e) {
							console.log('fail:'+JSON.stringify(e));
						},
						complete: function(e) {
							console.log('complete:'+JSON.stringify(e));
						}
					});
					
				} catch(e) {
					
				}
			},
			handleSelect(e) {
				// 支付宝支付
				if(e.item.id == 2) {
					this.appAliPay();
				} else if(e.item.id == 1) {
					// 微信支付
					this.appWxPay();
				} else if(e.item.id == 3) {
					
				}
				console.log('e handleSelect:', e);
			},
			appAliPay() {
				//服务提供商（从服务供应商中获取，是否包含支付宝支付）
				//调取后台接口，获取支付宝支付的订单号
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				const url = apiPrefix + "?mod=user&ac=alipay";
				const params = { auth: auth,
					money: money,
					uid: this.uid,
					level: this.level,
					pay_type: 1,
					filterData: true,
					alipay_order: 1
				};
				console.log('params', params);
				console.log('url', url);
				http.request(url,params
					//你要传给后台的参数（具体看后台要什么参数）
				).then(res=>{
					console.log('支付宝订单号',res)
					let orderInfo = res;//从后台返回的支付宝订单数据
					//统一各平台的客户端支付API
					uni.requestPayment({
						provider: 'alipay',	//服务提供商（支付宝）（服务提供商，通过uni.getProvider获取）
						orderInfo: orderInfo, //后台返回的支付宝订单数据
						success(res2) {
							console.log('success:' + JSON.stringify(res2));
							if (res2.errMsg == 'requestPayment:ok') {
								let globalData = getApp().globalData;
								globalData.isRecharge = 1;
								uni.showModal({
									title: '提示',
									content: '付款成功!',
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success() {
										uni.switchTab({
											url:'/pages/user/user_index'
										})
									}
								});
							} else {
								uni.showModal({
									title: '提示',
									content: '付款失败!',
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
								});
							}
						},
						fail(err){
							console.log('fail:' + JSON.stringify(err));
							uni.showModal({
								title: '提示',
								content: '付款失败!',
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
							});
						}
					});
				}).catch(err=>{
					console.log('aplipay res:'+JSON.stringify(err));
				});	
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
#root-view {
	display: flex;
	flex-direction: column;
	width:690rpx;
	margin-left: 30rpx;
	margin-right: 30rpx;
	#top-view-box {
		width: 690rpx;
		margin-top:50rpx;
		/*height: 360rpx;*/
		display: flex;
		margin-top:50rpx;
		flex-direction: column;
		#first-line {
			display: flex;
			box-sizing: border-box;
			background: linear-gradient(45deg, #1F1D21 0%, #534A5C 100%);
			border-radius: 20rpx;
			height: 127rpx;
			padding-top:37rpx;
			padding-bottom: 39rpx;
			padding-left:18rpx;
			padding-right: 32rpx;
			justify-content: space-between;
			align-items: center;
			#first-line-left {
				display: flex;
				height: 100%;
				/*align-items: center;*/
			}
			#first-line-right {
				display: flex;
				height: 100%;
				/*align-items: center;*/
			}
		}
		#vip-info-box {
			width: 690rpx;
			/*height: 300rpx;*/
			display: flex;
			flex-direction: column;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-top:-20rpx;
			
			padding-bottom: 54rpx;
			#second-line {
				display: flex;
				justify-content: space-between;
				/*padding-top:57rpx;*/
				padding-left:27rpx;
				padding-right:31rpx;
				#second-line-left {
					display: flex;
					align-items: center;
					/*.second-line-start {
						width: 8rpx;
						height: 36rpx;
						background: #A88FEF;
						border-radius: 2rpx;
						margin-right: 21rpx;
					}*/
					
				}
				#second-line-right {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #A6A6A6;
				}
			}
			#third-line {
				display: flex;
				margin-top:52rpx;
				.vip-privilege-info {
					display: flex;
					align-items: center;
					flex-direction: column;
					flex-shrink: 1;
					flex-basis: 230rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #343434;
				}
			}
		}
	}
	
	#bottom-view-box {
		margin-top:60rpx;
		background-color: #FFFFFF;
		padding-top:57rpx;
		padding-bottom: 42rpx;
		#info-vip {
			padding-left: 27rpx;
			display: flex;
			align-items: center;
		}
		
		#pay-view-box {
			margin-top:49rpx;
			display: flex;
			padding-left:43rpx;
			padding-right:41rpx;
			justify-content: space-between;
			#pay-box-left {
				display: flex;
				flex-direction: column;
				//width: 284rpx;
				width: 608rpx;
				height:358rpx;
				background-image: url(../../static/img/user/pay_vip/method1.png);
				background-size: 608rpx 358rpx;
				background-repeat: no-repeat;
				/*border:1px solid red;*/
				/*.pay-box-method {
					display: flex;
					justify-content: flex-end;
					text {
						display: flex;
						align-items: center;
						justify-content: center;
						width:142rpx;
						height:60rpx;
						color:#FFFFFF;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						background-color: #419FFF;
						border-top-right-radius: 10rpx;
						border-bottom-left-radius: 40rpx;
					}
				}*/
				#pay-box-combo {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-top:98rpx;
					.pay-box-combo-css {
						margin-bottom:19rpx;
						//width:210rpx;
						/*width: 608rpx;*/
						padding-left:20px;
						padding-right: 20px;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #BC8500;
						border-radius:30rpx;
						background: #F8E0A8;
					}
				}
			}
			#pay-box-right {
				display: flex;
				flex-direction: column;
				width: 284rpx;
				height:358rpx;
				background-image: url(../../static/img/user/pay_vip/method2.png);
				background-size: 284rpx 358rpx;
				background-repeat: no-repeat;
				padding-top:110rpx;
				/*border:1px solid red;*/
				/*.pay-box-method {
					display: flex;
					justify-content: flex-end;
					text {
						display: flex;
						align-items: center;
						justify-content: center;
						width:142rpx;
						height:60rpx;
						color:#FFFFFF;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						background-color: #E93EE3;
						border-top-right-radius: 10rpx;
						border-bottom-left-radius: 40rpx;
					}
				}*/
				.pay-box-share-line1 {
					display: flex;
					justify-content: center;
					
					margin-bottom: 34rpx;
				}
				view {
					width: 100%;
					display: flex;
					justify-content: center;
					.pay-box-share {
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #BC8500;
						border-radius:30rpx;
						background: #F8E0A8;
						width:210rpx;
						height: 60rpx;
					}
				}
				.pay-box-share-line2 {
					display: flex;
					justify-content: center;
					margin-bottom: 34rpx;
				}
				
				.pay-box-combo-css {
					margin-bottom:19rpx;
					width:210rpx;
					height: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #BC8500;
					border-radius:30rpx;
					background: #F8E0A8;
				}
			}
		}
	}
}

.common-line-font {
	
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #FFFFFF;
}
.second-line-start {
	width: 8rpx;
	height: 36rpx;
	background: #A88FEF;
	border-radius: 2rpx;
	margin-right: 21rpx;
}

.vip-privilege {
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #272727;
}
</style>
