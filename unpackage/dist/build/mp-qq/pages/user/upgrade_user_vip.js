(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/upgrade_user_vip"],{"0f30":function(e,t,o){"use strict";o.r(t);var n=o("650f"),i=o("4200");for(var a in i)"default"!==a&&function(e){o.d(t,e,(function(){return i[e]}))}(a);o("16c9");var c,s=o("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);t["default"]=u.exports},"16c9":function(e,t,o){"use strict";var n=o("86e8"),i=o.n(n);i.a},4200:function(e,t,o){"use strict";o.r(t);var n=o("c8f4"),i=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=i.a},"55f9":function(e,t,o){"use strict";(function(e){o("1fff");n(o("66fd"));var t=n(o("0f30"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("a821")["createPage"])},"650f":function(e,t,o){"use strict";var n={uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-icons/uni-icons")]).then(o.bind(null,"4248"))},uniPopup:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(o.bind(null,"7c56"))}},i=function(){var e=this,t=e.$createElement;e._self._c},a=[];o.d(t,"b",(function(){return i})),o.d(t,"c",(function(){return a})),o.d(t,"a",(function(){return n}))},"86e8":function(e,t,o){},c8f4:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(o("edc3")),i=a(o("efb5"));function a(e){return e&&e.__esModule?e:{default:e}}var c=function(){o.e("components/uni-popup/uni-popup-select").then(function(){return resolve(o("3d9d"))}.bind(null,o)).catch(o.oe)},s=0,u={components:{uniPopupSelect:c},data:function(){return{comboClass1:"combo",comboClass2:"combo",comboClass3:"combo",jidu_permonth_money:0,niandu_permonth_money:0,level:0,titleTop:"",descTop:"",descbottom:"",memberHeight:"",infoMarginTop:"",jiduDiscount:"",nianduDiscount:"",lineHeight:"",comboDescTop:"",comboViewTop:"",comboSubmitTop:"",comboSubmitHeight:"",headerHeight:"",comboHeight:0,yuedu_money:0,jidu_money:0,niandu_money:0,titleHeight:"",fontSize:"",payData:[{text:"微信支付",id:1,icon:"../../static/img/user/wx_pay.png"},{text:"支付宝支付",id:2,icon:"../../static/img/user/alipay.png"}]}},computed:{uid:function(){if(this.$store.getters.userInfo.uid)return this.$store.getters.userInfo.uid;var e=null;return e=i.default.cache("wx_userid",null),e||0}},onShareAppMessage:function(){var e=getCurrentPages(),t=e[e.length-1],o=t.route;return{title:"升级VIP",path:o,success:function(){},fail:function(){}}},onLoad:function(){e.showShareMenu({withShareTicket:!0}),this.initVipMoney();e.getSystemInfoSync().windowHeight;var t=e.getSystemInfoSync(),o=t.windowWidth,n=t.windowHeight,i=getApp().globalData;2==i.platform?this.payData=[{text:"支付宝支付",id:2,icon:"../../static/img/user/alipay.png"}]:1==i.platform&&(this.payData=[{text:"微信支付",id:1,icon:"../../static/img/user/wx_pay.png"},{text:"支付宝支付",id:2,icon:"../../static/img/user/alipay.png"}]);var a=750/o;a=a.toFixed(2),this.lineHeight=t.statusBarHeight*a+"rpx",this.headerHeight=44*a;var c=.03*n;this.titleTop=c.toFixed(2),this.descbottom=.0266*n.toFixed(2),this.descTop=.0205*n.toFixed(2),this.memberHeight=.251*n.toFixed(2),this.infoMarginTop=.0226*n.toFixed(2),this.comboDescTop=.0217*n.toFixed(2),this.comboViewTop=.0409*n.toFixed(2),this.comboHeight=.16*n.toFixed(2)+2,this.comboSubmitTop=.03*n.toFixed(2),this.comboSubmitHeight=.0574*n.toFixed(2),this.titleHeight=.0831*n.toFixed(2);var s=(609.3/a).toFixed(2);this.fontSize=s/10},mounted:function(){},methods:{handleSelect:function(e){2==e.item.id?this.appPay(2):1==e.item.id&&this.wxAppPay(),console.log("e handleSelect:",e)},change:function(e){console.log("e change:",e)},back:function(){console.log("hehe"),e.switchTab({url:"/pages/user/index"})},initVipMoney:function(){var e=this,t=getApp().globalData,o=t.serverUri,i=t.auth,a=o+"?mod=user&ac=get_vip_jine";n.default.request(a,{auth:i}).then((function(t){e.yuedu_money=t.yue,e.jidu_money=t.ji,e.niandu_money=t.nian;var o=t.nian/12,n=t.ji/3;o=o.toFixed(2),n=n.toFixed(2);var i=t.ji/(3*t.yue)*10;i=i.toFixed(1);var a=t.nian/(12*t.yue)*10;a=a.toFixed(1),e.niandu_permonth_money=n,e.jiduDiscount=i,e.nianduDiscount=a,e.jidu_permonth_money=o,e.selectCombo()}))},selectCombo:function(){this.comboClass1="combo combo-active",this.comboClass2="combo",this.comboClass3="combo",s=this.yuedu_money,this.level=2},selectCombo2:function(){this.comboClass1="combo",this.comboClass2="combo combo-active",this.comboClass3="combo",s=this.jidu_money,this.level=3},selectCombo3:function(){this.comboClass1="combo",this.comboClass2="combo",this.comboClass3="combo combo-active",s=this.niandu_money,this.level=4},wxPay:function(){console.log("go here! wxpay!"),this.qqComboPay()},appPay:function(t){var o=getApp().globalData,i=o.serverUri,a=o.auth,c=i+"?mod=user&ac=alipay",u={auth:a,money:s,uid:this.uid,level:this.level,filterData:!0,alipay_order:1};console.log("params",u),console.log("url",c),n.default.request(c,u).then((function(t){console.log("支付宝订单号",t);var o=t;e.requestPayment({provider:"alipay",orderInfo:o,success:function(t){if(console.log("success:"+JSON.stringify(t)),"requestPayment:ok"==t.errMsg){var o=getApp().globalData;o.isRecharge=1,e.showModal({title:"提示",content:"付款成功!",showCancel:!1,cancelText:"",confirmText:"确定",success:function(){e.navigateBack({delta:1})}})}else e.showModal({title:"提示",content:"付款失败!",showCancel:!1,cancelText:"",confirmText:"确定"})},fail:function(t){console.log("fail:"+JSON.stringify(t)),e.showModal({title:"提示",content:"付款失败!",showCancel:!1,cancelText:"",confirmText:"确定"})}})}))},generateSign:function(e){var t=getApp().globalData,o=t.key,n="appId="+e.appId+"&nonceStr="+e.nonceStr+"&package="+e.package+"&signType="+e.signType+"&timeStamp="+e.timeStamp+"&key="+o;return md5(n).toUpperCase()},qqComboPay:function(){var t=getApp().globalData,o=t.serverUri,i=t.auth,a=o+"?mod=user&ac=qqpay",c=this.level,u="qq";n.default.request(a,{auth:i,money:s,uid:this.uid,level:c,paytype:u,filterData:!0}).then((function(t){console.log(t),wx.requestWxPayment({url:t.qq_xd,referer:t.referer,success:function(t){console.log("pay callback"),console.log(t);getApp().globalData.isRecharge=1,e.switchTab({url:"/pages/user/index"}),console.log("wx pay",t)},fail:function(t){e.showModal({title:"提示",content:"充值失败!",showCancel:!1,cancelText:"",confirmText:"确定",success:function(e){}})},complete:function(e){console.log("complete res"),console.log(e)}})}))},comboPay:function(){var e=getApp().globalData,t=e.serverUri,o=e.auth,i=t+"?mod=user&ac=wxpay",a=this.level,c="";n.default.request(i,{auth:o,money:s,uid:this.uid,level:a,paytype:c,filterData:!0}).then((function(e){console.log("resp",e)}))}}};t.default=u}).call(this,o("a821")["default"])}},[["55f9","common/runtime","common/vendor"]]]);