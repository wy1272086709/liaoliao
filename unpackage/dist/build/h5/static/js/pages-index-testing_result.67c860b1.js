(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-testing_result"],{"1b7b":function(t,e,n){"use strict";var i=n("ddca"),r=n.n(i);r.a},"2ca2":function(t,e,n){"use strict";n.r(e);var i=n("4bb2"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},"2cae":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-cdd8319c]{background-color:#f2f2f2}#root-view[data-v-cdd8319c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;margin-left:%?30?%;margin-right:%?30?%;background:#fff;margin-top:%?60?%;padding-left:%?31?%;padding-right:%?31?%}#root-view #result-box[data-v-cdd8319c]{border-radius:%?20?%;word-break:break-all;width:%?628?%}#root-view #result-box #result[data-v-cdd8319c]{display:-webkit-box;display:-webkit-flex;display:flex;margin-top:%?51?%;margin-bottom:%?47?%;font-size:%?32?%;font-family:PingFang SC;font-weight:800;color:#343434}#root-view #result-box #detail[data-v-cdd8319c]{font-size:%?28?%;font-family:PingFang SC;font-weight:400;color:#343434}#root-view #bottom[data-v-cdd8319c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?58?%;margin-bottom:%?54?%}#root-view #bottom .testing-stat-button[data-v-cdd8319c]{display:-webkit-box;display:-webkit-flex;display:flex;width:%?180?%;height:%?60?%;border:1px solid #a88fef;border-radius:%?30?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-left:0;padding-right:0}.common-font[data-v-cdd8319c]{font-size:%?28?%;font-family:PingFang SC;font-weight:400;color:#a88fef}body.?%PAGE?%[data-v-cdd8319c]{background-color:#f2f2f2}',""]),t.exports=e},"4bb2":function(t,e,n){"use strict";var i=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var r=i(n("c964")),a=i(n("383a")),o=i(n("7e3d")),s="",d={data:function(){return{result:"",detail:""}},computed:{uid:function(){if(this.$store.getters.userInfo.uid)return this.$store.getters.userInfo.uid;var t=null;return t=a.default.cache("app_userid",null),t||0}},onLoad:function(t){s=t.nid,this.getQuestionResult(s)},methods:{getQuestionResult:function(t){var e=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var i,r,s,d,c,u,l,f;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=a.default.cache("testing_select_answer",null),r=getApp().globalData,s=r.serverUri,d=r.auth,c={auth:d,uid:e.uid,nid:t,filterData:!0},i&&(c.zuhe=i),u="?mod=cyc&ac=cs_tj",l=s+u,n.next=10,o.default.request(l,c);case 10:f=n.sent,1==f.status&&(e.result=f.data.answer_title,e.detail=f.data.answer_content);case 12:case"end":return n.stop()}}),n)})))()},gotoTesting:function(){uni.redirectTo({url:"/pages/index/testing_questions?nid="+s})},gotoTestingList:function(){uni.redirectTo({url:"/pages/index/testing"})}}};e.default=d},ac62:function(t,e,n){"use strict";n.r(e);var i=n("e6b5"),r=n("2ca2");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("1b7b");var o,s=n("f0c5"),d=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,"cdd8319c",null,!1,i["a"],o);e["default"]=d.exports},ddca:function(t,e,n){var i=n("2cae");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("ad058608",i,!0,{sourceMap:!1,shadowMode:!1})},e6b5:function(t,e,n){"use strict";var i,r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{attrs:{id:"root-view"}},[n("v-uni-view",{attrs:{id:"result-box"}},[n("v-uni-view",{attrs:{id:"result"}},[n("v-uni-text",[t._v(t._s(t.result))])],1),n("v-uni-view",{attrs:{id:"detail"}},[n("v-uni-text",[t._v(t._s(t.detail))])],1)],1),n("v-uni-view",{attrs:{id:"bottom"}},[n("v-uni-view",{staticClass:"testing-stat-button common-font",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoTestingList.apply(void 0,arguments)}}},[n("v-uni-view",[t._v("测一测列表")])],1),n("v-uni-view",{staticClass:"testing-stat-button common-font",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoTesting.apply(void 0,arguments)}}},[n("v-uni-view",[t._v("重新测试")])],1)],1)],1)},a=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))}}]);