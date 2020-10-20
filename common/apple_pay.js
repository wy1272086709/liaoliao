let iapChannel;  
let IAPOrders = ['miaoyu999'];  

function plusReady() { //uni-app中将此function里的代码放入vue页面的onLoad生命周期中  
	// 获取支付通道  
	let _self = this;
	console.log('plusReady');
	plus.payment.getChannels(function(channels) {  
		console.log('channels', channels);
		for (let i in channels) {  
			if (channel[i].id == 'appleiap') {  
				iapChannel = channel[i];  
				iapChannel.requestOrder(IAPOrders, function(event) {  
					console.log('events', event);
					for (let index in event) {  
						let OrderItem = event[index];  
						/*if(OrderItem.productid) {
							_self.pay(OrderItem.productid);
						}*/
						console.log("Title:" + OrderItem.title + "Price:" + OrderItem.price + "Description:" + OrderItem.description + "ProductID:" + OrderItem.productid);  
					}  
				}, function(errormsg) {  
					console.log("获取支付通道失败：" + errormsg.message);  
				});  
			}  
		}  
	}, function(e) {  
		console.log("获取支付通道失败：" + e.message);  
	});  
}  

function payReady() {
	document.addEventListener('plusready', plusReady, false); //uni-app不需要此代码  
}

function pay(id) {  
	plus.payment.request(iapChannel, {  
		"productid": id,  
		//"username": "appusername",  
		//"quantity": 1  
	}, function(result) {  
		console.log(JSON.stringify(result));  
	}, function(e) {  
		plus.nativeUI.alert("更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html", null, "支付失败：" + e.code);  
	});  
}  

export default {
	pay: pay,
	payReady: payReady,
	plusReady: plusReady
}