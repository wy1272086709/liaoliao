(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/huashu"],{"00ba":function(t,e,n){"use strict";n.r(e);var o=n("30f3"),i=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e["default"]=i.a},"30f3":function(t,e,n){"use strict";(function(t){var o;function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=function(){n.e("common/tabbar").then(function(){return resolve(n("49c3"))}.bind(null,n)).catch(n.oe)},a=(o={data:function(){return{scrollHeight:0,searchKeyword:"",navigation:{height:88,top:30,left:17,title:""},isFixHeight:!1,contentText:"加载更多",loadingType:"more",iconSize:20,page:1,articleList:[{list:[{id:1,sex:1,content:"能不能和我拍个照"},{id:2,sex:2,content:"为什么"}],title:"关于拍照"},{list:[{id:3,sex:1,content:"能不能和我拍个照"},{id:4,sex:2,content:"为什么"}],title:"关于拍照"},{list:[{id:5,sex:2,content:"能不能和我拍个照"},{id:6,sex:1,content:"为什么"}],title:"为什么呀!"},{list:[{id:7,sex:1,content:"能不能和我拍个照"},{id:8,sex:2,content:"为什么"}],title:"关于拍照"}]}},onPullDownRefresh:function(){this.getArticleList()},components:{tabBar:c}},i(o,"onPullDownRefresh",(function(){console.log("页面下拉刷新"),setTimeout((function(){t.stopPullDownRefresh()}),1e3)})),i(o,"onLoad",(function(e){console.log("option",e);var n=e.title,o=e.keyword;this.searchKeyword=o,n&&(n=decodeURIComponent(n),t.setNavigationBarTitle({title:n}));var i=t.getSystemInfoSync(),c=i.windowHeight;getApp().globalData.isIphoneX&&(c-=68);var a=c-82-50;this.scrollHeight=a,setTimeout((function(){console.log("start pulldown")}),1e3),t.startPullDownRefresh()})),i(o,"methods",{getArticleList:function(){},lower:function(){console.log("拉倒底部,加载下一页...."),this.articleList.push({list:[{id:10,sex:1,content:"能不能和我拍个照"},{id:11,sex:2,content:"为什么"}],title:"关于拍照"})},back:function(){t.navigateBack({url:"/pages/index/index"})},copyHuashu:function(e){console.log("content",e),t.setClipboardData({data:e,success:function(e){t.getClipboardData({success:function(e){t.showToast({title:"复制成功"})}})}})}}),i(o,"onReachBottom",(function(){console.log("上滑动"),t.showNavigationBarLoading(),console.log("reach");var e=this;if(e.page>3){if(console.log("page"),!e.isFixHeight){var n=t.createSelectorQuery().select("#content-view");n.boundingClientRect((function(t){e.scrollHeight=t.height+100,e.isFixHeight=!0})).exec()}e.loadingType="nomore"}else setTimeout((function(){e.articleList.push({list:[{id:10,sex:1,content:"能不能和我拍个照"},{id:11,sex:2,content:"为什么"}],title:"关于拍照"}),e.page++,t.hideNavigationBarLoading()}),500)})),o);e.default=a}).call(this,n("543d")["default"])},"481c":function(t,e,n){"use strict";var o={"uni-icons":function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"4248"))}},i=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o}))},"744f":function(t,e,n){},"937f":function(t,e,n){"use strict";n.r(e);var o=n("481c"),i=n("00ba");for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("e22d");var a,l=n("f0c5"),s=Object(l["a"])(i["default"],o["b"],o["c"],!1,null,"db59c108",null,!1,o["a"],a);e["default"]=s.exports},caee:function(t,e,n){"use strict";(function(t){n("1fff"),n("921b");o(n("66fd"));var e=o(n("937f"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e22d:function(t,e,n){"use strict";var o=n("744f"),i=n.n(o);i.a}},[["caee","common/runtime","common/vendor"]]]);