<template>
	<view class="upgrade-page">
		<view class="status-line" :style="{height: lineHeight}"></view>
		<view id="user_header" :style="'height:'+headerHeight+'rpx;'" @tap="back">
			<view id="header"  :style="'height:'+headerHeight+'rpx;'">
				<uni-icons type="back" size="32" color="rgba(255,255,255,1)" class="back-icon" ></uni-icons>
				<view id="upgrade_vip_title">
					<text>升级VIP</text>
				</view>
			</view>
		</view>
		<view id="upgrade-content">
			<view id="activity-title" :style="'margin-top:'+titleTop+'px;height:'+titleHeight+'px;'+'font-size:'+fontSize+'px;'">
				<text>首充仅1元</text>
			</view>
			<view id="activity-desc" :style="'margin-top:'+descTop+'px;margin-bottom:'+descbottom+'px;'">
				<text>联系客服即可享优惠</text>
			</view>
			<view id="activity-member" :style="'height:'+memberHeight+'px'">
				
			</view>
			<view id="combo-info" :style="'height:'+infoMarginTop+'px;'">
				<text id="combo-text">请先选择VIP套餐</text>
			</view>
			<view id="combo-desc" :style="'margin-top:'+comboDescTop+'px;'">
				<text id="combo-text">不错过任何一个你默默想要了解的人</text>
			</view>
			
			<view id="combo-view" :style="'margin-top:'+comboViewTop+'px;'">
				<view :class="comboClass1" @tap="selectCombo()" :style="'height:'+comboHeight+'px'">
					<view class="right-view">
						<view class="first-line one-first-line" :style="level==2 ? 'color:#2177E7':'color:#282828'">
							<text class="number-month">1</text>
							<text>个月</text>
						</view>
						<view class="second-line" :style="level==2 ? 'color:#2177E7':'color:#666666'">
							<text>¥{{yuedu_money}}</text>
						</view>
					</view>
				</view>
				<view :class="comboClass2" @tap="selectCombo2()" :style="'height:'+comboHeight+'px'">
					<view class="right-view">
						<view class="discount-info">
							<text>限时{{jiduDiscount}} 折</text>
						</view>
						<view class="first-line" :style="level==3 ? 'color:#2177E7':'color:#282828'">
							<text class="number-month">3</text>
							<text>个月</text>
						</view>
						<view class="second-line" :style="level==3 ? 'color:#2177E7':'color:#666666'">
							<text>¥{{jidu_money}}</text>
						</view>
						<view class="third-line">
							<text class="permonth-text">¥{{jidu_permonth_money}}/月</text>
						</view>
					</view>
				</view>
				<view :class="comboClass3" @tap.prevent="selectCombo3()" :style="'margin-right:0rpx;'+'height:'+comboHeight+'px;'">
					<view class="right-view">
						<view class="discount-info">
							<text>限时{{nianduDiscount}}折</text>
						</view>
						<view class="first-line" :style="level==4 ? 'color:#2177E7':'color:#282828'">
							<text class="number-month">12</text>
							<text>个月</text>
						</view>
						<view class="second-line" :style="level==4 ? 'color:#2177E7':'color:#666666'">
							<text>¥{{niandu_money}}</text>
						</view>
						<view class="third-line">
							<text class="permonth-text">¥{{niandu_permonth_money}}/月</text>
						</view>
					</view>
				</view>
			</view>
			<view id="combo-submit-view" :style="'margin-top:'+comboSubmitTop+'px;height:'+comboSubmitHeight+'px;'">
				<button @tap="wxPay()">
					<text>升级VIP会员 成为聊天达人</text>
				</button>
			</view>
			
			<uni-popup id="popupDialog" ref="popupDialog" type="select">
				<uni-popup-select :bottomData="payData" @select="handleSelect"></uni-popup-select>
			</uni-popup>
		</view>
	</view>
</template>




<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	import uniPopupSelect from '../../components/uni-popup/uni-popup-select.vue';
	let money = 0;
	export default {
		components:{
			uniPopupSelect
		},
		data() {
			return {
				comboClass1: "combo",
				comboClass2: "combo",
				comboClass3: "combo",
				jidu_permonth_money: 0.00,
				niandu_permonth_money: 0.00,
				level: 0,
				titleTop: '',
				descTop: '',
				descbottom:'',
				memberHeight: '',
				infoMarginTop: '',
				jiduDiscount: '',
				nianduDiscount: '',
				lineHeight: '',
				comboDescTop: '',
				comboViewTop: '',
				comboSubmitTop: '',
				comboSubmitHeight: '',
				headerHeight: '',
				//scrollHeight: 0,
				comboHeight: 0,
				yuedu_money: 0,
				jidu_money: 0,
				niandu_money: 0,
				titleHeight: '',
				fontSize: '',
				payData: [
					{ text:'微信支付', id:1,  icon: '../../static/img/user/wx_pay.png' },
					{ text:'支付宝支付', id:2,  icon: '../../static/img/user/alipay.png' }
				]
			}
		},
		computed: {
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				//#ifdef APP-PLUS || H5
				uid =  util.cache('app_userid', null);
				console.log('uid', uid);
				//#endif
				
				//#ifdef MP-WEIXIN || MP-QQ
				uid = util.cache('wx_userid', null);
				//#endif
				if (uid) {
					return uid;
				}
				return 0;
			},
		},
		onShareAppMessage() {
			let pages = getCurrentPages() //获取加载的页面
			let currentPage = pages[pages.length-1] //获取当前页面的对象
			let url = currentPage.route //当前页面url
			return {
				title: '升级VIP',
				path: url,
				success: function() {
				},
				fail: function() {
				}
			};
		},
		onLoad() {
			//#ifdef MP-WEIXIN || MP-QQ
			uni.showShareMenu({
			    withShareTicket: true
			});
			//#endif
			this.initVipMoney();
			let scrollHeight = uni.getSystemInfoSync().windowHeight;
			const systemInfo = uni.getSystemInfoSync();
			let winWidth     = systemInfo.windowWidth;
			let winHeight    = systemInfo.windowHeight;
			let data = getApp().globalData;
			// ios
			if(data.platform == 2) {
				this.payData = [
					{ text:'支付宝支付', id:2,  icon: '../../static/img/user/alipay.png' }
				];
				// android
			} else if(data.platform == 1) {
				this.payData = [
					{ text:'微信支付', id:1,  icon: '../../static/img/user/wx_pay.png' },
					{ text:'支付宝支付', id:2,  icon: '../../static/img/user/alipay.png' }
				];
			}
			// px转换到rpx的比例
			let ratio = 750/winWidth;
			ratio = ratio.toFixed(2);
			this.lineHeight =  systemInfo.statusBarHeight * ratio + 'rpx';
			this.headerHeight = 44 * ratio;
			let h = 0.030 * winHeight;
			this.titleTop = h.toFixed(2);
			this.descbottom = 0.0266*winHeight.toFixed(2);
			this.descTop    = 0.0205*winHeight.toFixed(2);
			this.memberHeight = 0.2510*winHeight.toFixed(2);
			this.infoMarginTop = 0.0226*winHeight.toFixed(2);
			this.comboDescTop = 0.0217*winHeight.toFixed(2);
			this.comboViewTop = 0.0409*winHeight.toFixed(2);
			this.comboHeight  = 0.1600*winHeight.toFixed(2)+2;
			this.comboSubmitTop = 0.0300*winHeight.toFixed(2);
			this.comboSubmitHeight = 0.0574*winHeight.toFixed(2);
			this.titleHeight       = 0.0831*winHeight.toFixed(2);
			let fontWidth = (609.3/ratio).toFixed(2);
			this.fontSize          = fontWidth/10;
			//this.selectCombo();
		},
		mounted() {
			
		},
		methods: {
			handleSelect(e) {
				// 支付宝支付
				if(e.item.id == 2) {
					this.appPay(2);
				} else if(e.item.id == 1) {
					// 微信支付
					this.wxAppPay();
				}
				console.log('e handleSelect:', e);
			},
			change(e) {
				console.log('e change:', e);
			},
			back() {
				console.log('hehe');
				uni.switchTab({
					url:'/pages/user/index'
				});
			},
			initVipMoney() {
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
					let t1 = resp.nian/12;
					let t2 = resp.ji/3;
					t1 = t1.toFixed(2);
					t2 = t2.toFixed(2);
					let jiduDiscount = resp.ji/(resp.yue * 3) * 10;
					jiduDiscount = jiduDiscount.toFixed(1);
					let nianduDiscount = resp.nian/(resp.yue * 12) * 10;
					nianduDiscount = nianduDiscount.toFixed(1);
					this.niandu_permonth_money = t2;
					this.jiduDiscount = jiduDiscount;
					this.nianduDiscount = nianduDiscount;
					this.jidu_permonth_money = t1;
					this.selectCombo();
				});
			},
			selectCombo() {
				//money = 0.01;
				this.comboClass1 = 'combo combo-active';
				this.comboClass2 = 'combo';
				this.comboClass3 = 'combo';
				money = this.yuedu_money;
				this.level = 2;
				//this.comboPay();
			},
			selectCombo2() {
				this.comboClass1 = 'combo';
				this.comboClass2 = 'combo combo-active';
				this.comboClass3 = 'combo';
				money = this.jidu_money;
				//money = 0.01;
				this.level = 3;
				//this.comboPay();
			},
			selectCombo3() {
				this.comboClass1 = 'combo';
				this.comboClass2 = 'combo';
				this.comboClass3 = 'combo combo-active';
				money = this.niandu_money;
				//money = 0.01;
				this.level = 4;
				//this.comboPay();
			},
			wxPay() {
				console.log('go here! wxpay!');
				//#ifdef MP-WEIXIN 
				this.comboPay();
				//#endif
				
				//#ifdef MP-QQ
				this.qqComboPay();
				//#endif
				
				//#ifdef APP-PLUS || H5
				this.$refs.popupDialog.open();
				//#endif
			},
			appPay(paytype) {
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
					filterData: true,
					alipay_order: 1
				};
				console.log('params', params);
				console.log('url', url);
				http.request(url,params
					//你要传给后台的参数（具体看后台要什么参数）
				).then(res=>{
					console.log('支付宝订单号',res)
					//从后台获取的宝支付的订单号
					//let orderData = res.data.orderNumber;
					//调取后台接口，获取支付宝支付的订单数据
					/*http.request('/pay/GroupPay',{
						//把订单号与支付方式传给后台（具体看后台要什么参数）
					},{}).then(res=>{*/
						let orderInfo = res;	//从后台返回的支付宝订单数据
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
											uni.navigateBack({
												delta:1
											});
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
			generateSign(obj) {
				const data = getApp().globalData;
				const key = data.key;
				let str = "appId="+obj.appId+"&nonceStr="+obj.nonceStr+"&package="+obj.package+
				"&signType="+obj.signType+'&timeStamp='+obj.timeStamp+'&key='+key;
				return md5(str).toUpperCase();
			},
			//#ifdef APP-PLUS
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
								url:'/pages/user/index'
							});
						}
					});
					return;
				}
			},
			checkIsInstallAlipay() {
				if(!plus.runtime.isApplicationExist({pname:'com.eg.android.AlipayGphone',action:'alipay://'})){
					// 提示用户
					uni.showModal({
						title:"提示",
						content:"检测到未安装支付宝,请先安装支付宝!",
						showCancel:false,
						confirmText: '确定',
						success() {
							uni.switchTab({
								url:'/pages/user/index'
							});
						}
					});
					return;
				}
			},
			async wxAppPay() {
				this.checkIsInstallWx();
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=wxpay_app";
				let level = this.level;
				const paytype = 'wx_app';
				const params = {
					auth: auth,
					money: money,
					uid: this.uid,
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
											url:'/pages/user/index'
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
			//#endif
			qqComboPay() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const url = apiPrefix + "?mod=user&ac=qqpay";
				let level = this.level;
				const paytype = 'qq';
				http.request(url, {
					auth: auth,
					money: money,
					uid: this.uid,
					level: level,
					paytype: paytype,
					filterData: true
				}).then(resp => {
					console.log(resp);
					wx.requestWxPayment({
					  url: resp.qq_xd,
					  referer: resp.referer,
					  success(res) { 
						  console.log('pay callback');
						  console.log(res);
						  const msg = '充值成功!';
						  getApp().globalData.isRecharge = 1;
						  uni.switchTab({
						  	url: '/pages/user/index'
						  });
						  /*uni.showModal({
						  	title: '提示',
						  	content: msg,
						  	showCancel: false,
						  	cancelText: '',
						  	confirmText: '确定',
						  	success: res2 => {
						  		if(res2.confirm) {
						  		}
						  	}
						  });*/
						  console.log('wx pay', res);
					  },
					  fail(res) {
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
					  complete(res) {
						  console.log('complete res');
						  console.log(res);
					  }
					});
				});
			},
			comboPay() {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let url = apiPrefix + "?mod=user&ac=wxpay";
				let level = this.level;
				let paytype = '';
				//#ifdef MP-WEIXIN
				paytype = 'wx';
				//#endif
				
				http.request(url, {
					auth: auth,
					money: money,
					uid: this.uid,
					level: level,
					paytype: paytype,
					filterData: true
				}).then(resp => {
					console.log('resp', resp);
					//#ifdef MP-WEIXIN
					uni.requestPayment({
						appId: resp.appid,
						timeStamp: resp.timeStamp,
						nonceStr: resp.nonce_str,
						package: resp.prepay_id,
						signType: 'MD5',
						paySign: resp.paySign2,
						success: function(res) {
							//console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							//console.log('fail:' + JSON.stringify(err));
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
					//#endif
				});
				
				
			}
		}
	}
</script>

<style>
	
page {
	background-color: rgba(255,255,255,1);
}
view {
	box-sizing: border-box;
}
.combo {
	
}
.upgrade-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	background: url(https://imgmyqx.ofbei.com/images/upgrade_vip_bg.png);
	background-size: 750rpx 630rpx;
	background-repeat: no-repeat;
}


view,scroll-view {
	display:flex;
	/*box-sizing: border-box;*/
}
.upgrade-header {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	height: 40px;
	width:670rpx;
}

#upgrade-content {
	display: flex;
	flex-direction: column;
}

#activity-title {
	margin-top:40rpx;
	margin-left:75.48rpx;
	margin-right:65.22rpx;
	justify-content: center;
	background:radial-gradient(rgba(251,252,253,1) 0%, rgba(188,199,233,1) 100%);
	-webkit-background-clip:text;
	-webkit-text-fill-color:transparent;
	font-family:BDZYJT;
	font-weight:normal;
	color:rgba(254,254,254,1);
	font-size: 120rpx;
}

#activity-desc {
	margin-top:10rpx;
	margin-bottom:25rpx;
	justify-content: center;
	font-size:30rpx;
	font-family:SimHei;
	font-weight:400;
	color:rgba(255,255,255,1);
}


#user_header {
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.back-icon {
	position: absolute;
	left: 2px;
}
#header {
	width:750rpx;
	justify-content: center;
	align-items: center;
}
#upgrade_vip_title >text {
	color:rgba(255,255,255, 1);
}

#combo-info {
	margin-top:31.32rpx;
	justify-content: center;
	font-size:35rpx;
	font-family:Microsoft YaHei;
	font-weight:bold;
	color:rgba(40,40,40,1);
}

#combo-desc {
	margin-top:30.12rpx;
	justify-content: center;
	font-size:25.9rpx;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(186,186,186,1);
}

#combo-view {
	margin-top:50rpx;
	justify-content: center;
	margin-left:81.57rpx;
	margin-right:81.57rpx;
}

#activity-member {
	justify-content: center;
	background-image: url(https://imgmyqx.ofbei.com/images/upgrade_vip_member.png);
	background-repeat: no-repeat;
	background-size: contain;
	width:579.7rpx;
	height:348.12rpx;
	margin-left:85.15rpx;
	margin-right:85.15rpx;
}

#combo-submit-view {
	/*width:585.5rpx;*/
	margin-left:85.15rpx;
	margin-right:85.15rpx;
	justify-content: center;
	background:linear-gradient(-90deg,rgba(0,74,225,1),rgba(3,174,255,1));
	border-radius:60px;
	margin-top:45rpx;
}
#combo-submit-view>button {
	display: flex;
	background-color: transparent;
	padding-left:0px;
	padding-right:0px;
}

button::after {
	border: 0px solid rgba(0,0,0,.2);
	border-radius: 0px;
}
#combo-submit-view text {
	font-size:32rpx;
	font-family:Microsoft YaHei;
	font-weight:bold;
	color:rgba(253,251,251,1);
}

#combo-submit-desc {
	margin-top:36.74rpx;
	font-size: 19.32rpx;
	justify-content: center;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(188,188,188,1);
}

.combo {
	display: flex;
	flex-direction: row;
	width:179.5rpx;
	height:199.98rpx;
	margin-right:23.5rpx;
	justify-content: center;
	border:4px solid rgba(255,255,255,1);
	box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.16);
	border-radius:20px;
}

.right-view {
	flex-direction: column;
}

.second-line {
	margin-top: 13rpx;
	margin-bottom: 10rpx;
	font-size:32rpx;
	font-family:楷体;
	font-weight:400;
	color:rgba(102,102,102,1);
}

.permonth-text {
	font-size:25rpx;
	font-family:楷体;
	font-weight:400;
	color:rgba(188,188,188,1);
}

.discount-info {
	margin-left:70.8rpx;
	height:37.34rpx;
	width:99.7rpx;
	justify-content: center;
	align-items: center;
	border-bottom-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	background-color: #FE80C5;
	font-size:15rpx;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(255,255,255,1);
}

.first-line,.second-line,.third-line {
	justify-content: center;
	align-items: center;
}

.first-line {
	margin-top:10rpx;
	font-size:40.45rpx;
	font-family:Arial;
	font-weight:400;
	color:rgba(40,40,40,1);
}

.one-first-line {
	margin-top:40rpx;
}

.number-month {
	font-size:40rpx;
}

#combo-text {
	font-weight: bold;
	
}

.combo-active {
	border:4px solid rgba(33,119,231,1);
	box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.16);
	border-radius:20px;
}

.money-active {
	color:rgba(33,119,231,1);
}


.combo-text::before {
	width:10px;
}

</style>
