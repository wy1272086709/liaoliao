(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-test"],{"1f70":function(t,e,i){"use strict";i.r(e);var a=i("eead"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"3a34":function(t,e,i){var a=i("6592");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("493faa5c",a,!0,{sourceMap:!1,shadowMode:!1})},"3b1d":function(t,e,i){"use strict";i.r(e);var a=i("815b"),n=i("1f70");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("ea98");var r,s=i("f0c5"),c=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"fb2976e2",null,!1,a["a"],r);e["default"]=c.exports},6592:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-fb2976e2]{width:100%;height:100%}.swiper-page[data-v-fb2976e2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;\n  /*align-items: center;*/\n  /*justify-content: center;*/height:100%}.swiper-container[data-v-fb2976e2]{position:absolute;left:%?375?%}.item-common[data-v-fb2976e2]{position:absolute}.background[data-v-fb2976e2]{width:%?210?%;height:%?270?%;box-shadow:%?0?% %?0?% %?15?% rgba(0,0,0,.5)}.item-text[data-v-fb2976e2]{position:absolute;top:%?180?%;left:%?0?%;width:100%;color:#fff;font-size:%?30?%;text-align:center}.item-container[data-v-fb2976e2]{left:%?-105?%;position:absolute}.item0[data-v-fb2976e2]{left:%?-360?%;-webkit-transform:scale(.8);transform:scale(.8);opacity:0}.item1[data-v-fb2976e2]{left:%?-240?%;-webkit-transform:scale(.8);transform:scale(.8);opacity:1}.item2[data-v-fb2976e2]{left:%?-120?%;-webkit-transform:scale(.9);transform:scale(.9);opacity:1}.item3[data-v-fb2976e2]{left:%?0?%;-webkit-transform:scale(1);transform:scale(1);opacity:1}.item4[data-v-fb2976e2]{left:%?120?%;-webkit-transform:scale(.9);transform:scale(.9);opacity:1}.item5[data-v-fb2976e2]{left:%?240?%;-webkit-transform:scale(.8);transform:scale(.8);opacity:1}.item6[data-v-fb2976e2]{left:%?360?%;-webkit-transform:scale(.8);transform:scale(.8);opacity:0}",""]),t.exports=e},"815b":function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"swiper-page",on:{touchmove:function(e){arguments[0]=e=t.$handleEvent(e),t.touchmove.apply(void 0,arguments)},touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.touchstart.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.touchend.apply(void 0,arguments)}}},t._l(7,(function(e){return i("v-uni-view",{key:e,staticClass:"swiper-container"},[i("v-uni-view",{staticClass:"item-container",style:"z-index:"+t.indexArray[e]},[i("v-uni-view",{class:"item"+(e-1)+" item-common",attrs:{animation:t.animation[e],"data-text":t.textArray[e]},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tapItemFn.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"background",attrs:{src:t.imgArray[e],mode:"aspectFit"}}),i("v-uni-text",{staticClass:"item-text"},[t._v(t._s(t.textArray[e]))])],1)],1)],1)})),1)},o=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}))},ea98:function(t,e,i){"use strict";var a=i("3a34"),n=i.n(a);n.a},eead:function(t,e,i){"use strict";(function(t){i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=[-360,-240,-120,0,120,240,360],n=[.8,.8,.9,1,.9,.8,.8],o=[0,1,1,1,1,1,0],r=[1,2,3,4,3,2,1],s=[-360,-240,-120,0,120,240,360],c=[],f=[],u=[],l=0,d=!0,p=1,v=[],h={props:{swiperList:{type:Array,default:function(){return[]}}},data:function(){return{imgArray:["../../static/image1.png","../../static/image2.png","../../static/origin.png","../../static/image4.png","../../static/image5.png","../../static/image6.png","../../static/image7.png"],textArray:["页面1","页面2","页面3","页面4","页面5","页面6","页面7"],animation:[],currentIndex:7,indexArray:[1,2,3,4,3,2,1],indicatorArray:[]}},onLoad:function(e){t("log","swiper onLoad..."," at pages/index/test.vue:70"),uni.getSystemInfo({success:function(t){p=750/t.screenWidth}}),v=[];for(var i=0;i<7;i++){var a=uni.createAnimation({duration:500,timingFunction:"ease-out"});v.push(a)}},methods:{tapItemFn:function(e){t("log",e.currentTarget.dataset.text," at pages/index/test.vue:89")},touchstart:function(t){l=t.touches[0].pageX},touchmove:function(t){if(!this.isMove){var e=(t.touches[0].pageX-l)*p;e=e>60?60:e,e=e<-60?-60:e;var i=e/60;1==i?(this.isMove=!0,this.tapRight()):-1==i&&(this.isMove=!0,this.tapLeft())}},touchend:function(t){var e=this;setTimeout((function(){e.isMove=!1}),500)},tapLeft:function(){if(d){d=!1,setTimeout((function(){d=!0}),500),s=this.rollRight(a,1),c=this.rollRight(n,1),f=this.rollRight(o,1),u=this.rollRight(r,1);for(var e=0;e<7;e++)v[e].scale(c[e],c[e]).left(s[e]+"rpx").opacity(f[e]).step(),this.animation[e]=v[e].export();t("log","animation",v," at pages/index/test.vue:138");var i=0==--this.currentIndex?70:this.currentIndex;this.currentIndex=i,this.indexArray=u}},tapRight:function(){if(d){d=!1,setTimeout((function(){d=!0}),500),s=this.rollLeft(a,1),c=this.rollLeft(n,1),f=this.rollLeft(o,1),u=this.rollLeft(r,1);for(var t=0;t<7;t++)v[t].scale(c[t],c[t]).left(s[t]+"rpx").opacity(f[t]).step(),this.animation[t]=v[t].export();var e=0==--this.currentIndex?70:this.currentIndex;this.currentIndex=e,this.indexArray=u}},rollLeft:function(t,e){for(var i=0;i<e;i++){for(var a=t.length-1,n=t[0],o=0;o<a;o++)t[o]=t[o+1];t[a]=n}return t.concat()},rollRight:function(t,e){for(var i=0;i<e;i++){for(var a=t.length-1,n=t[a],o=a;o>0;o--)t[o]=t[o-1];t[0]=n}return t.concat()}}};e.default=h}).call(this,i("0de9")["log"])}}]);