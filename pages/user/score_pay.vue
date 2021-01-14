<template>
	<view id="root-view">
		<view v-for="(item,index) in scoreList" :key="item.id" class="score-item">
			<view class="price-title-view">
				<text>¥</text>
				<text class="price-text">{{item.price}}</text>
				<text>元</text>
			</view>
			<view class="price-desc-view">
				<text>充值 {{item.price}} 元,送 {{item.score}} 积分</text>
			</view>
			<view class="pay-score-view" @tap="showPayDialog(index, 'miaoyu999')">
				<text>充值</text>
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
	//import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js';
	
	let iapChannel = null, productId = 'VIP1',
	    productIds = ['VIP1', 'VIP2', 'VIP3'];
		let money = '';
		let score = '';
	export default {
		data() {
			return {
				platform: '',
				scoreList: [
					
				],
				payData: [
					{ text:'微信支付', id:1,  icon: '../../static/img/user/wx_pay.png' },
					{ text:'支付宝支付', id:2,  icon: '../../static/img/user/alipay.png' }
				],
			};
		},
		computed: {
			userInfo: function() {
				// 从缓存读
				let u = this.$store.getters.userInfo;
				console.log('u', u);
				if (u.uid) {
					return u;
				}
				let type = util.cache('appLoginType', null);
				console.log('type', type);
				let uInfoStr = util.cache('app_user_info_'+type, null);
				console.log('uInfoStr', uInfoStr);
				if (uInfoStr) return JSON.parse(uInfoStr);
				return {};
			},
			uid: function() {
				let uid = util.cache('app_userid', null);
				console.log('uid', uid);
				return uid ? uid: 0;
			},
			// 积分充值的话,等级是不是都写1比较好...
			level: function() {
				let info = this.userInfo;
				console.log('level-info', info);
				if(!info || !info.level) return 0;
				if(info.level) {
					return info.level;
				} 
				return 0;
			}
		},
		components:{
			uniPopupSelect
		},
		async onLoad() {
			let data = getApp().globalData;
			this.platform = data.platform;
			await this.payInit();
		},
		methods:{
			async getPriceAndScore() {
				let data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth      = data.auth;
				const params    = {};
				params.auth     = auth;
				params.filterData = true;
				const url = apiPrefix+'?mod=user&ac=get_jifen_jine';
				const respData = await http.request(url, params);
				if (respData.status == 1) {
					const d = respData.data;
					this.scoreList = [ 
						{ price:d.one, score: d.one_jifen }, 
						{ price: d.two, score: d.two_jifen },
						{ price: d.three, score: d.three_jifen },
						{ price: d.four, score: d.four_jifen },
					];
					//this.scoreList[1] = { price: d.two, score: d.two_jifen };
					//this.scoreList[2] = { price: d.three, score: d.three_jifen };
					//this.scoreList[3] = { price: d.four, score: d.four_jifen };
				}
			},
			async payInit() {
				console.log('onLoad...');
				let data = getApp().globalData;
				this.platform = data.platform;
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
				await this.getPriceAndScore();
				if(this.platform == 1) {
					//this.initVipMoney();
					//await this.getPriceAndScore();
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
			},
			payScore() {
				
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
			showPayDialog(index, productIdVal) {
				console.log('payType', index);
				
				if(this.platform == 2) {
					uni.showLoading({
						title: '加载中...'
					});
				}
				//2,3,4,对应的月度,季度,年
				console.log('this.platform', this.platform);
				if (this.platform == 1) {
					money = this.scoreList[index].price;
					score = this.scoreList[index].score;
					this.$refs.popupDialog.open();
				} else if(this.platform == 2) {
					//const productId = 'miaoyu999';
					console.log('productId', productIdVal);
					this.requestPayment(productIdVal);
				}
			},
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
						this.payServerFunc(e);
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
				console.log('wx app pay!');
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
					pay_type:2,
					jifen: score,
					level: level,
					paytype: paytype,
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
							console.log(e);
						},
						complete: function(e) {
							console.log('complete:', e);
						}
					});
					
				} catch(e) {
					
				}
			},
			handleSelect(e) {
				// 支付宝支付
				console.log('e.item'+JSON.stringify(e.item));
				console.log('e.item.id:'+e.item.id);
				if(e.item.id == 2) {
					this.appAliPay();
				} else if(e.item.id == 1) {
					console.log('e'+JSON.stringify(e.item));
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
					pay_type: 2,
					jifen: score,
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
	margin-top:40px;
	margin-left: 30rpx;
	margin-right: 30rpx;
	padding-left: 41rpx;
	padding-right: 41rpx;
	padding-top: 52rpx;
	padding-bottom: 41rpx;
	display: flex;
	justify-content: space-between;
	border-radius: 20rpx;
	background-color: #FFFFFF;
	flex-wrap: wrap;
	align-content: space-between;
	.score-item {
		display: flex;
		flex-direction: column;
		width: 284rpx;
		height: 358rpx;
		justify-content: center;
		background-image: url(../../static/img/score/score_pay_item.png);
		background-repeat: no-repeat;
		background-size: 284rpx 358rpx;
		position: relative;
		.price-title-view {
			text-align: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #C3AEFF;
			
			.price-text {
				font-size: 48rpx;
				font-family: PingFang SC;
				font-weight: 800;
				font-style: italic;
			}
			.price-text:after {
				display: inline-block;
				content: ' ';
				width:5px;
			}
		}
		.price-desc-view {
			margin-left: 30rpx;
			margin-right: 29rpx;
			color:#CCC;
		}
		
		.pay-score-view {
			position: absolute;
			bottom:-30rpx;
			left:38rpx;
			width: 210rpx;
			height: 60rpx;
			background: #C3AEFF;
			border-radius: 30rpx;
			line-height: 60rpx;
			text-align:center;
			
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	.score-item:nth-child(1), .score-item:nth-child(2) {
		margin-bottom:45rpx;
	}
}
</style>
