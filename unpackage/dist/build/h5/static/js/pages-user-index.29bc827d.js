(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-index"],{"11de":function(t,e,i){"use strict";i.r(e);var n=i("68d1"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"1c13":function(t,e,i){"use strict";(function(t){i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=[{text:"微信",icon:"https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png",name:"wx"},{text:"支付宝",icon:"https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png",name:"wx"},{text:"QQ",icon:"https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png",name:"qq"},{text:"新浪",icon:"https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png",name:"sina"},{text:"百度",icon:"https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png",name:"copy"},{text:"其他",icon:"https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png",name:"more"}],a={name:"UniPopupShare",props:{title:{type:String,default:"分享到"},bottomData:{type:Array,default:function(){return n}},reportData:{type:Array,default:function(){return[]}},height:{type:[String,Number],default:""}},inject:["popup"],data:function(){return{}},created:function(){},methods:{select:function(e,i){var n=this;t("log","item",e,"index",i," at components/uni-popup/uni-popup-share.vue:96"),this.$emit("select",{item:e,index:i},(function(){n.popup.close()}))},select2:function(e,i){var n=this;t("log","item",e,"index",i," at components/uni-popup/uni-popup-share.vue:105"),this.$emit("select",{item:e,index:i},(function(){n.popup.close()}))},close:function(){this.popup.close()}}};e.default=a}).call(this,i("0de9")["log"])},2090:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.uni-popup-message[data-v-fb441b26]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;background-color:#e1f3d8;padding:10px 15px;border-color:#eee;border-style:solid;border-width:1px}.uni-popup-message-text[data-v-fb441b26]{font-size:14px;padding:0}.uni-popup__success[data-v-fb441b26]{background-color:#e1f3d8}.uni-popup__success-text[data-v-fb441b26]{color:#67c23a}.uni-popup__warn[data-v-fb441b26]{background-color:#faecd8}.uni-popup__warn-text[data-v-fb441b26]{color:#e6a23c}.uni-popup__error[data-v-fb441b26]{background-color:#fde2e2}.uni-popup__error-text[data-v-fb441b26]{color:#f56c6c}.uni-popup__info[data-v-fb441b26]{background-color:#f2f6fc}.uni-popup__info-text[data-v-fb441b26]{color:#909399}',""]),t.exports=e},"27d3":function(t,e,i){var n=i("552e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("aa9efb8a",n,!0,{sourceMap:!1,shadowMode:!1})},"282f":function(t,e,i){var n=i("6b99");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("48941817",n,!0,{sourceMap:!1,shadowMode:!1})},"2e13":function(t,e,i){"use strict";i.r(e);var n=i("1c13"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"33c0":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFUlEQVRYR+3WMUrEQBTG8f8T7BVc8AiuhY0ewANsYeF17DzG1nsHFQU7sd9TeAEL4ZOBCGGRzZvJF9Js2oT5fjNv5mWCmZ+YOZ8DoGoFJC0i4stZtjRA0hJ4A9YR8eBCpAC98PMu+NGFGARIOgK2wMXOrC2IQUAJlXQDPAOnbkQKMCUiDZgKUQXoIV6AE0c5qgFuRBPAiWgGuBCjAA6EA3AGvAOXO5vyCVhFxM++tj0KIKmEvwJX/4TfRcT30D+jGeAIL7gmgCu8CeAMrwa4w6sAU4SnAVOFpwDdheQTuG49aqP7gKR7YAMcd4OVJpM657Y+0EOUi6klPFWC/gwk3QIfmQ43NPO/902NKDt45rsDYPYV+AVhv4Ihb0i4wAAAAABJRU5ErkJggg=="},4887:function(t,e,i){t.exports=i.p+"static/img/default_avatar.2f86f88a.png"},"494a":function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"header-vip-view",style:"background-image:"+t.backgroundImage,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.payForVip()}}},[t.level<=0?[n("v-uni-button",{staticClass:"login-btn-view",attrs:{type:"primary","open-type":"getUserInfo",withCredentials:"true",lang:"zh_CN"},on:{getuserinfo:function(e){arguments[0]=e=t.$handleEvent(e),t.wxGetUserInfo.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.appLogin.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"discount-nologin-view"},[n("v-uni-text",{staticClass:"limit-time-discount"},[t._v(t._s(t.memberDiscountText))])],1),n("v-uni-view",{staticClass:"right-vip-image-nologin-view"},[n("v-uni-image",{staticClass:"vipinfo_arrow",attrs:{src:i("33c0")}})],1)],1)]:[2==t.platform?[1==t.level?[n("v-uni-view",{staticClass:"discount-view-ios"},[n("v-uni-view",{staticClass:"limit-time-discount"},[t._v(t._s(t.memberDiscountText))])],1),3==t.programNumber&&2!=t.platform?n("v-uni-view",{staticClass:"right-vip-image-view"},[n("v-uni-image",{staticClass:"vipinfo_arrow",attrs:{src:i("33c0")}})],1):t._e()]:[n("v-uni-view",{staticClass:"discount-view"},[n("v-uni-text",{staticClass:"limit-time-discount"},[t._v(t._s(t.memberDiscountText))])],1),n("v-uni-view",{staticClass:"right-vip-action"},[n("v-uni-text",{staticClass:"limit-time-discount"},[t._v(t._s(t.memberAction))])],1),n("v-uni-view",{staticClass:"right-vip-image-view"},[n("v-uni-image",{staticClass:"vipinfo_arrow",attrs:{src:i("33c0")}})],1)]]:[n("v-uni-view",{staticClass:"discount-view",style:1==t.level?"margin-left:80rpx;":""},[n("v-uni-text",{staticClass:"limit-time-discount"},[t._v(t._s(t.memberDiscountText))])],1),n("v-uni-view",{staticClass:"right-vip-action"},[n("v-uni-text",{staticClass:"limit-time-discount"},[t._v(t._s(t.memberAction))])],1),n("v-uni-view",{staticClass:"right-vip-image-view"},[n("v-uni-image",{staticClass:"vipinfo_arrow",attrs:{src:i("33c0")}})],1)]]],2)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},"4bfb":function(t,e,i){"use strict";i.r(e);var n=i("df77"),a=i("11de");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("67d3");var r,s=i("f0c5"),l=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"1279236a",null,!1,n["a"],r);e["default"]=l.exports},"552e":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.uni-popup-share[data-v-9efecd74]{background-color:#fff;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-share-title[data-v-9efecd74]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:40px}.uni-share-title-text[data-v-9efecd74]{font-size:14px;color:#666}.uni-share-content[data-v-9efecd74]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding-top:10px}.uni-share-content-box[data-v-9efecd74]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-flex-wrap:wrap;flex-wrap:wrap;width:%?750?%}.uni-share-content-item[data-v-9efecd74]{width:%?187.5?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:10px 0;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-share-content-item[data-v-9efecd74]:active{background-color:#f5f5f5}.uni-share-image[data-v-9efecd74]{width:30px;height:30px}.uni-share-text[data-v-9efecd74]{margin-top:10px;font-size:14px;color:#3b4144}.uni-share-button-box[data-v-9efecd74]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:80px;-webkit-box-align:center;-webkit-align-items:center;align-items:center;boder:1px solid #b2b2b2;padding:10px 15px}.uni-share-button[data-v-9efecd74]{-webkit-box-flex:1;-webkit-flex:1;flex:1;border-radius:10px;color:#666;font-size:16px}.uni-share-button[data-v-9efecd74]::after{border-radius:50px}',""]),t.exports=e},"5a5e":function(t,e,i){t.exports=i.p+"static/img/user_bg.b77425d5.png"},"622a":function(t,e,i){var n=i("a83f");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("29f69ac2",n,!0,{sourceMap:!1,shadowMode:!1})},6671:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-popup-message",class:"uni-popup__"+[t.type]},[i("v-uni-text",{staticClass:"uni-popup-message-text",class:"uni-popup__"+[t.type]+"-text"},[t._v(t._s(t.message))])],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},"67d3":function(t,e,i){"use strict";var n=i("282f"),a=i.n(n);a.a},"68d1":function(t,e,i){"use strict";(function(t){var n=i("ee27");i("b680"),i("38cf"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,o,r=n(i("aefd")),s=n(i("cd04")),l=n(i("bef2")),u=n(i("9d55")),c=n(i("e1e3")),d=n(i("7e3d")),p=n(i("383a")),f={data:function(){var e=this;return{contentHeight:0,platform:0,isIphoneX:!1,providerList:[],isShow:!0,bottomHeight:"",marginTop:"",phoneStr:"",configData:[],bottomData:[{label:"微信朋友圈",icon:"/static/img/user/wx_timeline.png",onClick:function(){t("log","wx timeline click22222!"," at pages/user/index.vue:199"),e.shareWxOrWxTimeline("wx_timeline","weixin")}},{label:"微信",icon:"/static/img/user/wx.png",onClick:function(){t("log","wx  click!22222"," at pages/user/index.vue:207"),e.shareWxOrWxTimeline("wx","weixin")}}]}},components:{vipInfo:r.default,uniPopupDialog:l.default,uniPopupMessage:s.default,uniPopupShare:u.default},onShow:function(){var t=getApp().globalData;1==t.isRecharge&&this.getUserInfo()},onShareAppMessage:function(){var t=getCurrentPages(),e=t[t.length-1],i=e.route;return{title:"个人中心",path:i,success:function(){},fail:function(){}}},onLoad:function(e){o=new c.default;var i=uni.getSystemInfoSync(),n=i.windowHeight,a=i.windowWidth;t("log","winHeight",n," at pages/user/index.vue:265");var r=750/a;r=r.toFixed(2),t("log","radix",r," at pages/user/index.vue:268");var s=getApp().globalData;this.isIphoneX=s.isIphoneX,this.platform=s.platform,t("log","platform",this.platform," at pages/user/index.vue:272"),this.contentHeight=n-50,t("log",n,this.contentHeight," at pages/user/index.vue:275"),t("log","onLoad....",r*n," at pages/user/index.vue:276"),this.bottomHeight=r*n-50*r-330,this.marginTop=77*r},created:function(){t("log","created...."," at pages/user/index.vue:299")},computed:{appNickName:function(){var t=this.userInfo;return t.phone?"*".repeat(7)+t.phone.substr(7,4):""},userInfo:function(){var e=this.$store.getters.userInfo;if(t("log","u",e," at pages/user/index.vue:329"),e.uid)return e;var i=p.default.cache("appLoginType",null);t("log","type",i," at pages/user/index.vue:334");var n=p.default.cache("app_user_info_"+i,null);return t("log","uInfoStr",n," at pages/user/index.vue:336"),n?JSON.parse(n):{}},appDates:function(){var e=this.userInfo;if(!e)return"";var i="";return e.start_time&&(i+=e.start_time+"~"),e.end_time&&(i+=e.end_time),t("log","dateStr",i," at pages/user/index.vue:352"),i},level:function(){var e=this.userInfo;return t("log","level-info",e," at pages/user/index.vue:358"),e&&e.level&&e.level?e.level:0},dates:function(){var e=this.userInfo;if(!e)return"";var i="";return e.start_time&&(i+=e.start_time+"~"),e.end_time&&(i+=e.end_time),t("log","dateStr",i," at pages/user/index.vue:375"),i}},methods:{confirmShare:function(){this.$refs.popupShare.open()},shareWxOrWxTimeline:function(e,i){t("log","shareWxOrWxTimeline"," at pages/user/index.vue:388"),uni.share({provider:i,scene:"wx_timeline"==e?"WXSenceTimeline":"WXSceneSession",type:0,title:"我在妙语千寻上找话术",summary:"拒绝尬聊，多方位开启话题助阵您不疲累不应付 妙语千寻，打开话题让约会不在尴尬",imageUrl:"../../static/img/user/miaoyu.png",href:"https://kuwoi.com/",success:function(e){t("log","success:"+JSON.stringify(e)," at pages/user/index.vue:399")},fail:function(e){t("log","fail",e," at pages/user/index.vue:412"),uni.showModal({content:"分享失败!",showCancel:!1,complete:function(){o&&o.close()}})}})},select:function(e,i){t("log","select ....",e," at pages/user/index.vue:429");"wx"!=e.item.name&&e.item.name,i()},getProviderList:function(){this.providerList=[{name:"分享到微信好友",id:"weixin"},{name:"分享到微信朋友圈",id:"weixin",type:"WXSenceTimeline"}]},appLogin:function(){t("log","hehe"," at pages/user/index.vue:450"),uni.navigateTo({url:"/pages/user/login"})},shareFriends:function(){t("log","heheere"," at pages/user/index.vue:457");var e=this.bottomData;o=new c.default(e,(function(e,i){t("log","menu",e,"index",i," at pages/user/index.vue:460")})),o.show()},change:function(){},editProfile:function(){this.level<1?uni.navigateTo({url:"/pages/user/login"}):uni.navigateTo({url:"/pages/user/profile"})},getUserInfo:function(){var e=this,i=getApp().globalData,n=i.serverUri,a=i.auth,o=n+"?mod=user&ac=check_app_user",r=p.default.cache("app_userid",null);t("log","check_app_user",{auth:a,uid:r,filterData:!0}," at pages/user/index.vue:486"),d.default.request(o,{auth:a,uid:r,filterData:!0}).then((function(i){if(t("log","resp",i," at pages/user/index.vue:496"),1==i.status){var n=i.data,a=e.userInfo;if(n.name&&(a.nickName=n.name),n.img&&(a.avatarUrl=n.img),n.phone&&(a.phone=n.phone),n.cid&&(a.level=n.cid),n.start_time&&(a.start_time=n.start_time),n.end_time&&(a.end_time=n.end_time),t("log","userINfo uid",a," at pages/user/index.vue:522"),a.uid){var o=p.default.cache("appLoginType",null);e.setUserInfo(a),p.default.cache("app_user_info_"+o,JSON.stringify(a),1296e3);var r=getApp().globalData;r.isRecharge=0}}}))},about_us_article:function(){uni.navigateTo({url:"/pages/user/about_us"})},personal_info:function(){uni.navigateTo({url:"/pages/user/complaint"})},handleComplaint:function(){uni.navigateTo({url:"/pages/user/complaint"})},upgrade_vip:function(){2!=this.platform&&uni.navigateTo({url:"/pages/user/upgrade_user_vip"})},copy_customer_wechat:function(){var t=this.configData["weixin"];uni.setClipboardData({data:t,success:function(t){uni.getClipboardData({success:function(t){uni.showToast({title:"复制成功"})}})}})},copy_customer_qq:function(){var t=this.configData["qq"];uni.setClipboardData({data:t,success:function(t){uni.getClipboardData({success:function(t){uni.showToast({title:"复制成功"})}})}})},setUserInfo:function(t){this.$store.commit("setUserInfo",t)},login:function(t){t||uni.showLoading({title:"登录中..."}),this.loginRequest(t)},loginRequest:function(e){var i=this,n="";uni.login({provider:n,success:function(a){var o=a.code;e||uni.hideLoading();var r=getApp().globalData,s=r.serverUri,l=r.auth,u=s+"?mod=user&ac=wx_user";uni.getUserInfo({provider:n,success:function(n){t("log","get UserInfo res:",n," at pages/user/index.vue:775");var a=n.userInfo,s={code:o,auth:l,nickname:a.nickName,avatarurl:a.avatarUrl,city:a.city,country:a.country,gender:a.gender,province:a.province};t("log","userData",s," at pages/user/index.vue:795"),uni.request({url:u,method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded"},data:s,success:function(n){if(t("log",n," at pages/user/index.vue:805"),n=n.data.data,t("log","resp",n," at pages/user/index.vue:807"),n){var o=n.id;a.uid=o,a.level=n.cid,n.start_time&&(a.start_time=n.start_time),n.end_time&&(a.end_time=n.end_time),n.openid&&(a.openid=n.openid),i.setUserInfo(a);new Date;var s=1296e3,l=JSON.stringify(a);p.default.cache("wx_userinfo",l,s),p.default.cache("wx_userid",a.uid),e&&(r.isRecharge=0)}}})},fail:function(){t("log","未授权"," at pages/user/index.vue:843")}})}})},dialogConfirm:function(t){"function"==typeof t&&t()},dialogClose:function(t){"function"==typeof t&&t()},wxGetUserInfo:function(e){t("log","get_user_info"," at pages/user/index.vue:861"),a||e.detail.userInfo?this.login():uni.showModal({title:"警告",content:"您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",showCancel:!1,confirmText:"返回授权",success:function(e){e.confirm&&t("log","用户点击了“返回授权”"," at pages/user/index.vue:873")}})}}};e.default=f}).call(this,i("0de9")["log"])},"6aeb":function(t,e,i){"use strict";i.r(e);var n=i("f87f"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"6b99":function(t,e,i){var n=i("24fb"),a=i("1de5"),o=i("5a5e");e=n(!1);var r=a(o);e.push([t.i,"uni-view[data-v-1279236a]{display:-webkit-box;display:-webkit-flex;display:flex}.uni-list[data-v-1279236a]{background:#fff!important;box-shadow:0 %?4?% %?8?% 0 rgba(0,0,0,.01)!important;border-radius:%?20?%!important;\n}.uni-list-item[data-v-1279236a]{padding-left:%?0?%!important}.uni-list-item__container[data-v-1279236a]{padding:%?10?% %?30?%!important}.uni-list-hover[data-v-1279236a]{background:#fff!important;box-shadow:0 %?4?% %?8?% 0 rgba(0,0,0,.01)!important;border-radius:%?20?%!important}.uni-popup-dialog[data-v-1279236a]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-list-item--hover[data-v-1279236a]{background:#fff!important;box-shadow:0 %?4?% %?8?% 0 rgba(0,0,0,.01)!important;border-radius:%?20?%!important}.root-view[data-v-1279236a]{display:-webkit-box;display:-webkit-flex;display:flex;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background:url("+r+");background-repeat:no-repeat;\n\t/*background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);*/background-size:%?750?% %?249.5?%}#content-view[data-v-1279236a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-top:60px;min-height:434px;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}#no-login-view[data-v-1279236a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;position:absolute;width:%?686?%;margin-left:%?32?%;margin-right:%?32?%;background:#fff;box-shadow:0 2px 4px 0 rgba(0,0,0,.01);border-radius:10px}#header-view[data-v-1279236a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%}#grant-view[data-v-1279236a]{height:58px}.login-btn-avatar[data-v-1279236a]{height:%?154.5?%;line-height:1;display:-webkit-box;display:-webkit-flex;display:flex;margin:0;position:static;border:0;background-color:initial;padding:0;overflow:auto;margin-top:%?-77.25?%}uni-button[data-v-1279236a]::after{border:none;width:0;height:0;-webkit-transform:scale(1);transform:scale(1);display:none;background:transparent}.login-btn[data-v-1279236a]{margin-top:%?20?%;background-color:initial;line-height:1;display:-webkit-box;display:-webkit-flex;display:flex;border:0 solid rgba(0,0,0,.2);padding-left:0;padding-right:0;border-radius:0;height:100%;width:100%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.login-btn[data-v-1279236a]::after{border:0 solid #007aff}.login-btn>uni-text[data-v-1279236a]{font-size:18px;font-family:PingFangSC-Medium,PingFang SC;font-weight:600;color:#333}.tx-img[data-v-1279236a]{width:%?154.5?%;height:%?154.5?%;border-radius:50%;margin-top:%?-77.25?%}.tx-img-nologin[data-v-1279236a]{width:%?154.5?%;height:%?154.5?%;border-radius:50%}.name[data-v-1279236a],.member-class[data-v-1279236a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.name[data-v-1279236a]{margin-top:%?18.4?%}.zx[data-v-1279236a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%}.member-class[data-v-1279236a]{height:%?40?%;font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#333;line-height:%?40?%;margin-top:%?20?%}.nickname[data-v-1279236a]{font-size:%?30?%;font-family:SourceHanSansSC;font-weight:400;color:#3e3e3e}.li-view[data-v-1279236a],#bottom_list[data-v-1279236a]{margin-left:%?32?%;margin-right:%?32?%;background-color:#fff}.li-view[data-v-1279236a]{display:-webkit-box;display:-webkit-flex;display:flex;width:%?686?%;margin-top:%?137.25?%;position:absolute;top:%?0?%;height:%?390?%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background:#fff;box-shadow:0 2px 4px 0 rgba(0,0,0,.01);border-radius:10px}.uni-list-item__extra-text[data-v-1279236a]{font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#3db1f2!important}.uni-dialog-cancel[data-v-1279236a]{background-color:#ededed;color:#dd463b}.uni-dialog-ok[data-v-1279236a]{background-color:#da281c;color:#fff}#bottom[data-v-1279236a]{width:%?750?%;height:%?656.1?%;margin-top:%?330?%;background:-webkit-linear-gradient(right,#2069e7,#4886ee);background:linear-gradient(270deg,#2069e7,#4886ee)}#bottom_list[data-v-1279236a]{margin-top:%?130?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;height:%?142.9?%;\n\t/*box-shadow:0px 2px 4px 0px rgba(0,0,0,0.01);*/border-radius:10px 10px 10px 10px;width:%?686?%}.bottom-version-text[data-v-1279236a]{color:#bbb}#app-bottom_list[data-v-1279236a]{margin-left:%?32?%;margin-right:%?32?%;border-radius:10px 10px 10px 10px;width:%?686?%}#app-bottom[data-v-1279236a]{background:-webkit-linear-gradient(right,#2069e7,#4886ee);background:linear-gradient(270deg,#2069e7,#4886ee);\n\t/*position: relative;*/margin-top:%?330?%;height:%?656.1?%}",""]),t.exports=e},"7b74":function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-popup-share",style:{height:t.height+"px"}},[i("v-uni-view",{staticClass:"uni-share-title"},[i("v-uni-text",{staticClass:"uni-share-title-text"},[t._v(t._s(t.title))])],1),i("v-uni-view",{staticClass:"uni-share-content",style:t.reportData.length>0?"border-bottom:1px solid #F2F2F2":""},[i("v-uni-view",{staticClass:"uni-share-content-box",style:t.reportData.length>0?"justify-content:flex-start":""},t._l(t.bottomData,(function(e,n){return i("v-uni-view",{key:n,staticClass:"uni-share-content-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.select(e,n)}}},[i("v-uni-image",{staticClass:"uni-share-image",attrs:{src:e.icon,mode:"aspectFill"}}),i("v-uni-text",{staticClass:"uni-share-text"},[t._v(t._s(e.text))])],1)})),1)],1),i("v-uni-view",{staticClass:"uni-share-content"},[i("v-uni-view",{staticClass:"uni-share-content-box",style:t.reportData.length>0?"justify-content:flex-start":""},t._l(t.reportData,(function(e,n){return i("v-uni-view",{key:n,staticClass:"uni-share-content-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.select2(e,n)}}},[i("v-uni-image",{staticClass:"uni-share-image",attrs:{src:e.icon,mode:"aspectFill"}}),i("v-uni-text",{staticClass:"uni-share-text"},[t._v(t._s(e.text))])],1)})),1)],1),i("v-uni-view",{staticClass:"uni-share-button-box"},[i("v-uni-button",{staticClass:"uni-share-button",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("取消")])],1)],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},"832a":function(t,e,i){"use strict";i.r(e);var n=i("ced6"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"9d55":function(t,e,i){"use strict";i.r(e);var n=i("7b74"),a=i("2e13");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("b4a1");var r,s=i("f0c5"),l=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"9efecd74",null,!1,n["a"],r);e["default"]=l.exports},"9da5":function(t,e,i){"use strict";var n=i("f8a2"),a=i.n(n);a.a},a83f:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".header-vip-view[data-v-0e048d68]{\n\t/*width:606rpx;*/background-size:contain;background-repeat:no-repeat;display:-webkit-box;display:-webkit-flex;display:flex;\n\t/*background-position: center center;*/width:%?654?%;height:%?175.1?%;margin-left:%?16?%;margin-right:%?16?%;\n\t/*margin-bottom: 79rpx;*/margin-top:%?20?%;padding-bottom:%?69?%;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.login-btn-view[data-v-0e048d68]{display:-webkit-box;display:-webkit-flex;display:flex;height:100%;width:100%;background-color:initial;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.vip-info-text[data-v-0e048d68]{font-size:16px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;color:#774f25}.discount-view[data-v-0e048d68]{\n\t/*margin-left: 104rpx;*/\n\t/*margin-bottom:23rpx;*/margin-bottom:%?16?%;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;margin-left:%?60?%;margin-right:%?10?%}.discount-view-ios[data-v-0e048d68]{margin-bottom:%?16?%;margin-left:%?90?%;margin-right:%?10?%}.discount-nologin-view[data-v-0e048d68]{\n\t/*margin-left: 104rpx;*/margin-top:%?100?%;margin-left:%?60?%;margin-right:%?10?%}.limit-time-discount-ios[data-v-0e048d68]{margin-bottom:%?23?%;margin-left:%?90?%;margin-right:%?10?%}.limit-time-discount[data-v-0e048d68]{font-size:%?25?%;font-family:QingYuan;font-weight:400;font-style:italic;color:#fff}\n\n/*.left-vip-image {\n\tmax-width:86rpx;\n\tmax-height: 86rpx;\n}*/.vip-right-area[data-v-0e048d68]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}\n\n/*\n.left-vip-image-view {\n\tmargin-left:38rpx;\n\t\n\tmargin-right:32rpx;\n}\n\n.right-vip-info {\n\tflex-direction: row;\n}*/.right-vip-action[data-v-0e048d68]{margin-bottom:%?16?%;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;margin-right:%?8?%}.vip-text-view[data-v-0e048d68]{margin-bottom:6px;height:22px}.vipinfo_arrow[data-v-0e048d68]{max-width:%?32?%;max-height:%?32?%}.right-vip-image-view[data-v-0e048d68]{margin-bottom:%?16?%;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.right-vip-image-nologin-view[data-v-0e048d68]{\n\t/*margin-top:100rpx;*/margin-bottom:%?15?%}.action-class[data-v-0e048d68]{font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#fff}",""]),t.exports=e},aefd:function(t,e,i){"use strict";i.r(e);var n=i("494a"),a=i("832a");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("c399");var r,s=i("f0c5"),l=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"0e048d68",null,!1,n["a"],r);e["default"]=l.exports},b4a1:function(t,e,i){"use strict";var n=i("27d3"),a=i.n(n);a.a},c399:function(t,e,i){"use strict";var n=i("622a"),a=i.n(n);a.a},cd04:function(t,e,i){"use strict";i.r(e);var n=i("6671"),a=i("6aeb");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("9da5");var r,s=i("f0c5"),l=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"fb441b26",null,!1,n["a"],r);e["default"]=l.exports},ced6:function(t,e,i){"use strict";(function(t){i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{actionMarginLeft:"",actionWidth:"",vipInfoWidth:"",marginLeft:0,rightAreaWidth:""}},props:{level:{default:0,type:[Number,String]},member_validate_dates:{default:"",type:String},platform:{default:1,type:[Number,String]},programNumber:{default:1,type:[Number,String]}},mounted:function(){this.initActionMargin()},computed:{memberAction:function(){return t("log","this.level memberAction",this.level," at common/vipinfo/vipinfo.vue:89"),t("log","hehe"," at common/vipinfo/vipinfo.vue:90"),3!=this.programNumber&&2==this.platform?"":0==this.level?(t("log","hehe1"," at common/vipinfo/vipinfo.vue:97"),""):1==this.level?(t("log","hehe2"," at common/vipinfo/vipinfo.vue:100"),3!=this.programNumber?"立即充值":""):(t("log","hehe3"," at common/vipinfo/vipinfo.vue:103"),"续费")},memberDiscountText:function(){return t("log","this.platform",this.platform," at common/vipinfo/vipinfo.vue:108"),3!=this.programNumber&&2==this.platform&&1==this.level?"联系客服,享更多功能":0==this.level?"登录/注册成为会员":1==this.level?3==this.programNumber?"立即充值":"":this.member_validate_dates},backgroundImage:function(){t("log","vipInfo,this.level:",this.level," at common/vipinfo/vipinfo.vue:129");var e=["https://imgmyqx.ofbei.com/images/no_member_left_vip_logo.png","https://imgmyqx.ofbei.com/images/month_left_vip_logo.png","https://imgmyqx.ofbei.com/images/quarter_left_vip_logo.png","https://imgmyqx.ofbei.com/images/year_left_vip_logo.png"],i=this.level;this.level>=1&&(i-=1);var n=e[i],a="url('"+n+"');";return a},backgroundColor:function(){var e="";return t("log","platform",this.platform,"memberLevel:",this.memberLevel," at common/vipinfo/vipinfo.vue:146"),1==this.platform?0==this.level?e="linear-gradient(90deg,rgba(133,133,133,1) 0%,rgba(184,184,184,1) 100%);":1==this.level?e="linear-gradient(90deg,rgba(247,178,80,1) 0%,rgba(255,210,117,1) 100%);":2==this.level?e="linear-gradient(90deg,rgba(35,109,230,1) 0%,rgba(22,184,218,1) 100%);":3==this.level?e="linear-gradient(90deg,rgba(17,182,75,1) 0%,rgba(97,240,139,1) 100%);":4==this.level&&(e="linear-gradient(90deg,rgba(255,136,79,1) 0%,rgba(255,184,134,1) 100%);"):2==this.platform&&(this.level<=1?e="linear-gradient(90deg,rgba(133,133,133,1) 0%,rgba(184,184,184,1) 100%);":2==this.level?e="linear-gradient(90deg,rgba(35,109,230,1) 0%,rgba(22,184,218,1) 100%);":3==this.level?e="linear-gradient(90deg,rgba(17,182,75,1) 0%,rgba(97,240,139,1) 100%);":4==this.level&&(e="linear-gradient(90deg,rgba(255,136,79,1) 0%,rgba(255,184,134,1) 100%);")),e}},methods:{wxGetUserInfo:function(){t("log","wxGetUserInfo...."," at common/vipinfo/vipinfo.vue:176"),this.$emit("memberLogin",!0)},appLogin:function(){t("log","appLogin"," at common/vipinfo/vipinfo.vue:180"),this.$emit("memberLogin",!0)},initActions:function(){},initActionMargin:function(){1==this.level?(this.marginLeft=100,this.rightAreaWidth=240):0==this.level?this.vipInfoWidth=394:this.rightAreaWidth=126},payForVip:function(){3!=this.programNumber?this.level>=1&&2!=this.platform&&uni.navigateTo({url:"/pages/user/upgrade_user_vip"}):this.level>=1&&(2!=this.platform?uni.navigateTo({url:"/pages/user/upgrade_user_vip"}):uni.showModal({title:"提示",content:"请联系客服!",showCancel:!1,cancelText:"",confirmText:"确定"}))}}};e.default=n}).call(this,i("0de9")["log"])},df77:function(t,e,i){"use strict";var n={uniList:i("05e0").default,uniListItem:i("b22d").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"root-view"},[n("v-uni-view",{style:"height:"+t.contentHeight+"px;",attrs:{id:"content-view"}},[t.userInfo.uid?[n("v-uni-view",{staticClass:"li-view"},[n("v-uni-view",{attrs:{id:"header-member-info"}},[n("v-uni-view",{staticClass:"zx"},[t.userInfo.avatarUrl?t._e():n("v-uni-button",{staticClass:"login-btn-avatar",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.editProfile.apply(void 0,arguments)}}},[n("v-uni-image",{staticClass:"tx-img-nologin",attrs:{src:i("4887")}})],1),t.userInfo.avatarUrl?n("v-uni-image",{staticClass:"tx-img",attrs:{src:t.userInfo.avatarUrl},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.editProfile.apply(void 0,arguments)}}}):t._e()],1)],1),n("v-uni-view",{attrs:{id:"header-view"}},[n("v-uni-view",{staticClass:"name"},[void 0!=t.userInfo.nickName?n("v-uni-text",{staticClass:"nickname"},[t._v(t._s(t.userInfo.nickName))]):t._e(),void 0==t.userInfo.nickName?n("v-uni-text",[t._v(t._s(t.appNickName))]):t._e()],1)],1),n("vip-info",{attrs:{level:t.level,member_validate_dates:t.appDates,platform:t.platform,programNumber:"3"}})],1)]:[n("v-uni-view",{staticClass:"li-view"},[n("v-uni-view",{attrs:{id:"header-member-info"}},[n("v-uni-view",{staticClass:"zx"},[n("v-uni-button",{staticClass:"login-btn-avatar",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.editProfile.apply(void 0,arguments)}}},[n("v-uni-image",{staticClass:"tx-img-nologin",attrs:{src:i("4887")}})],1)],1)],1),n("v-uni-view",{attrs:{id:"header-view"}},[n("v-uni-button",{staticClass:"login-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.appLogin.apply(void 0,arguments)}}},[n("v-uni-text",[t._v("点击登录/注册")])],1)],1),n("vip-info",{attrs:{level:t.level,member_validate_dates:t.appDates,platform:t.platform},on:{memberLogin:function(e){arguments[0]=e=t.$handleEvent(e),t.appLogin.apply(void 0,arguments)}}})],1)],n("v-uni-view",{style:"height:"+t.bottomHeight+"rpx;",attrs:{id:"app-bottom"}},[n("v-uni-view",{attrs:{id:"app-bottom_list"}},[n("uni-list",{staticStyle:{"margin-top":"140rpx",width:"686rpx",position:"absolute"}},[n("uni-list-item",{attrs:{title:"投诉建议",thumb:"/static/img/user/complaint.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleComplaint()}}}),n("uni-list-item",{attrs:{title:"关于我们",thumb:"/static/img/user/about_us.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.about_us_article()}}}),n("uni-list-item",{attrs:{thumb:"/static/img/user/contact_customer.png",title:"联系客服"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy_customer_wechat()}}}),n("uni-list-item",{attrs:{title:"清理缓存",thumb:"/static/img/user/clear_cache.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearCache()}}}),n("uni-list-item",{attrs:{title:"当前版本",thumb:"/static/img/user/cur_version.png",showArrow:!1},scopedSlots:t._u([{key:"right",fn:function(){return[n("v-uni-text",{staticClass:"bottom-version-text"},[t._v("1.0.0")])]},proxy:!0}])})],1)],1)],1)],2)],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},f87f:function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniPopupMessage",props:{type:{type:String,default:"success"},message:{type:String,default:""},duration:{type:Number,default:3e3}},inject:["popup"],data:function(){return{}},created:function(){this.popup.childrenMsg=this},methods:{open:function(){var t=this;0!==this.duration&&(clearTimeout(this.popuptimer),this.popuptimer=setTimeout((function(){t.popup.close()}),this.duration))},close:function(){clearTimeout(this.popuptimer)}}};e.default=n},f8a2:function(t,e,i){var n=i("2090");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("cbd4fb7a",n,!0,{sourceMap:!1,shadowMode:!1})}}]);