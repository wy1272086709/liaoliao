(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/complaint"],{"078d":function(t,n,e){"use strict";e.r(n);var i=e("c6e1"),o=e("f161");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("e70d");var a,c=e("f0c5"),r=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);n["default"]=r.exports},"9db0":function(t,n,e){"use strict";(function(t){e("1fff"),e("921b");i(e("66fd"));var n=i(e("078d"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},c6e1:function(t,n,e){"use strict";var i,o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}))},e70d:function(t,n,e){"use strict";var i=e("f4dc"),o=e.n(i);o.a},f161:function(t,n,e){"use strict";e.r(n);var i=e("fa39"),o=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=o.a},f4dc:function(t,n,e){},fa39:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{tel:"",content:"",title:"投诉建议",winHeight:0}},methods:{onSubmit:function(){var n=this.validateFunc();n&&t.showModal({title:"提示",content:"感谢你提交的投诉和建议",showCancel:!1,cancelText:"",confirmText:"确定",success:function(n){t.navigateBack({url:"/pages/user/index"})},fail:function(){},complete:function(){}})},validateFunc:function(){var n=this.isRequired();if(n){var e=this.isPoneAvailable();if(e){var i=this.isContentValid();if(i)return!0;t.showToast({title:"建议内容不超过300个字",icon:"none",duration:2e3})}else t.showToast({title:"请输入正确的手机号码",icon:"none",duration:2e3})}else t.showToast({title:"手机号码和建议内容必填!",icon:"none",duration:2e3})},isContentValid:function(){var t=this.content.length;return!(t>300)},isRequired:function(){return!(!this.tel||!this.content)},isPoneAvailable:function(){var t=/^[1][3,4,5,7,8][0-9]{9}$/;return!!t.test(this.tel)}},onLoad:function(){var n=t.getSystemInfoSync().windowHeight;this.winHeight=n+"px"}};n.default=e}).call(this,e("543d")["default"])}},[["9db0","common/runtime","common/vendor"]]]);