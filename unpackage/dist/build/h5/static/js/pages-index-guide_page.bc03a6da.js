(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-guide_page"],{"220a":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,"#root-view[data-v-56a51d84]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}uni-page-body[data-v-56a51d84],.content[data-v-56a51d84]{width:100%;height:100%;background-size:100% auto ;padding:0}.swiper[data-v-56a51d84]{width:100%;height:100%;background:#fff}.swiper-item[data-v-56a51d84]{width:100%;height:100%;text-align:center;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;\r\n\t/* justify-content: center; */-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;flex-direction:column-reverse}.swiper-item-img[data-v-56a51d84]{width:100%;height:100%;margin:0 auto}.swiper-item-img uni-image[data-v-56a51d84]{width:95%}#next-btn[data-v-56a51d84]{position:absolute;z-index:100000000001;display:-webkit-box;display:-webkit-flex;display:flex;width:100%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;bottom:50px;left:0;font-size:%?40?%;font-family:PingFang SC;font-weight:800;color:#333}.login-entry-btn[data-v-56a51d84]{margin-right:%?60?%}body.?%PAGE?%[data-v-56a51d84]{background-size:100% auto\n}",""]),e.exports=t},"27be":function(e,t,i){"use strict";(function(e){var n=i("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("383a")),o={data:function(){return{curIndex:0,autoplay:!1,duration:500,jumpover:"",text:"注册/登录",imgHeight:"",guideImages:["../../static/img/index/guide_page/page_01.png","../../static/img/index/guide_page/page_02.png","../../static/img/index/guide_page/page_03.png","../../static/img/index/guide_page/page_04.png"]}},computed:{showMenu:function(){return this.curIndex==this.guideImages.length-1}},onLoad:function(t){e("log","hehehe"," at pages/index/guide_page.vue:46");var i=uni.getSystemInfoSync(),n=i.windowHeight;i.windowWidth;this.imgHeight=n},methods:{login:function(){uni.navigateTo({url:"/pages/user/login_v2",fail:function(t){e("log","to login fail:",t," at pages/index/guide_page.vue:57")}})},nextPage:function(){this.curIndex++},launchFlag:function(){var e=a.default.getVersionValue();e?uni.switchTab({url:"/pages/index/app_index"}):uni.redirectTo({url:"/pages/index/mask"})},change:function(t){e("log","e change",t," at pages/index/guide_page.vue:78"),this.curIndex=t.detail.current,t.detail.current==this.guideImages.length-1&&(this.jumpover="进入首页")},transition:function(t){e("log","e transition",t," at pages/index/guide_page.vue:88")}}};t.default=o}).call(this,i("0de9")["log"])},"5d81":function(e,t,i){"use strict";i.r(t);var n=i("97ee"),a=i("c9d3");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("e3bd");var d,u=i("f0c5"),r=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,"56a51d84",null,!1,n["a"],d);t["default"]=r.exports},6771:function(e,t,i){var n=i("220a");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("3a340d1d",n,!0,{sourceMap:!1,shadowMode:!1})},"97ee":function(e,t,i){"use strict";var n,a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content",style:{height:e.imgHeight+"px"}},[i("v-uni-swiper",{staticClass:"swiper",attrs:{autoplay:e.autoplay,duration:e.duration,"indicator-dots":!0},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.change.apply(void 0,arguments)},transition:function(t){arguments[0]=t=e.$handleEvent(t),e.transition.apply(void 0,arguments)}}},e._l(e.guideImages,(function(t,n){return i("v-uni-swiper-item",{style:{height:e.imgHeight+"px"}},[i("v-uni-view",{staticClass:"swiper-item"},[i("v-uni-view",{staticClass:"swiper-item-img"},[i("v-uni-image",{style:{height:e.imgHeight+"px"},attrs:{src:t,mode:"aspectFit"}})],1)],1)],1)})),1),e.showMenu?i("v-uni-view",{attrs:{id:"next-btn"}},[i("v-uni-view",{staticClass:"jump-over login-entry-btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.login()}}},[e._v(e._s(e.text))]),i("v-uni-view",{staticClass:"jump-over",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.launchFlag()}}},[e._v(e._s(e.jumpover))])],1):e._e()],1)},o=[];i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return n}))},c9d3:function(e,t,i){"use strict";i.r(t);var n=i("27be"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},e3bd:function(e,t,i){"use strict";var n=i("6771"),a=i.n(n);a.a}}]);