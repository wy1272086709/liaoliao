(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-app_index"],{"04c8":function(t,e,i){"use strict";var a=i("a499"),n=i.n(a);n.a},"17f3":function(t,e,i){"use strict";i.r(e);var a=i("6908"),n=i("9872");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("04c8");var o,s=i("f0c5"),l=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"88f5b2f4",null,!1,a["a"],o);e["default"]=l.exports},2603:function(t,e,i){"use strict";i.r(e);var a=i("3e55"),n=i("c4e3");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("a477");var o,s=i("f0c5"),l=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"cb799a6a",null,!1,a["a"],o);e["default"]=l.exports},"3e55":function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"wrap"},[i("v-uni-swiper",{staticClass:"swiper",style:{height:2*t.height+"rpx"},attrs:{autoplay:t.autoplay,interval:t.interval,duration:t.duration,circular:t.loop,"previous-margin":t.previousMargin+"rpx","next-margin":t.nextMargin+"rpx"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)}}},t._l(t.list,(function(e,a){return i("v-uni-swiper-item",{key:a,on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.$emit("clickItem",e)}}},[t.list&&t.list.length>0?i("v-uni-view",{staticClass:"item",class:[t.crown?t.current==a?"crown-active":"crown":""]},[!t.hasSlots&&e[t.imgKey]?i("v-uni-image",{staticClass:"item-img",class:[t.imgShadow?"imgShadow":""],style:{borderRadius:t.imgRadius+"px",width:t.imgWidth},attrs:{"lazy-load":!0,src:e[t.imgKey]},on:{load:function(i){arguments[0]=i=t.$handleEvent(i),t.loadAdsImg(e[t.imgKey])}}}):t._t("default")],2):t._e()],1)})),1),t.dots?i("v-uni-view",{staticClass:"dots flex",style:{bottom:2*t.bottom+"rpx"}},t._l(t.list,(function(e,a){return i("v-uni-view",{key:a,staticClass:"dot",class:[t.current==a?"curr-dot":""]})})),1):t._e()],1)},r=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}))},"626f":function(t,e,i){"use strict";(function(t){i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{list:{type:Array,default:function(){return[]}},imgKey:{type:String,required:!0},height:{type:Number,default:200},imgRadius:{type:Number,default:0},imgShadow:{type:Boolean,default:!1},previousMargin:{type:Number,default:0},nextMargin:{type:Number,default:0},imgWidth:{type:String,default:"100%"},loop:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!1},interval:{type:Number,default:2e3},duration:{type:Number,default:1200},dots:{type:Boolean,default:!1},bottom:{type:Number,default:10},crown:{type:Boolean,default:!1}},data:function(){return{current:0,hasSlots:!1}},watch:{},methods:{change:function(t){var e=t.detail.current;this.current=e,this.$emit("change",this.list[e])},loadAdsImg:function(e){var i=new Date;t("log","ads img:img src:"+e+" time:"+i.getTime()," at components/ls-swiper/index.vue:125")}}};e.default=a}).call(this,i("0de9")["log"])},"63cf":function(t,e,i){"use strict";(function(t){var a=i("ee27");i("4160"),i("dca8"),i("b64b"),i("e25e"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var n=a(i("c964")),r=a(i("7e3d")),o=(a(i("383a")),a(i("2603"))),s={data:function(){return{base_lsit:[],appNavList:[],swiperList:[],navHeight:"",towerStart:0,direction:"",scrollHeight:"",casesNavList:[]}},components:{lsSwiper:o.default},onShow:function(){},onLoad:function(){var e=new Date;t("log","app index onLoad time:"+e.getTime()+"ms"," at pages/index/app_index.vue:176");var i=uni.getSystemInfoSync();this.platform=getApp().globalData.platform,this.navHeight=2==this.platform?54:58,this.scrollHeight=i.windowHeight-(2==this.platform?54:58)-i.statusBarHeight,this.getSwiperList(),this.getCategoryArr(),this.getAdsInfo(),this.getNavList()},onNavigationBarSearchInputChanged:function(e){t("log","onNavigationBarSearchInputChanged",e," at pages/index/app_index.vue:192"),uni.navigateTo({url:"/pages/index/keyword_page",complete:function(e){t("log","navigateTo",e," at pages/index/app_index.vue:197")}})},onReady:function(){},methods:{load1:function(e){t("log","index",e," at pages/index/app_index.vue:205")},loadHuashuImg:function(t){},loadTest:function(t){},loadItemPic:function(t){},clickItem:function(e){t("log","item:",e," at pages/index/app_index.vue:225");var i=e.ad_content;uni.navigateTo({url:i})},lower:function(){},gotoTop:function(){uni.pageScrollTo({scrollTop:0})},moveHandle:function(){},gotoKeywordPage:function(){uni.navigateTo({url:"/pages/index/keyword_page"})},gotoNext:function(){uni.navigateTo({url:"/pages/index/index"})},gotoTesting:function(){uni.navigateTo({url:"/pages/index/testing_questions"})},enter_huashu:function(t,e){uni.navigateTo({url:"/pages/index/huashu?title="+encodeURIComponent(t)+"&navId="+e})},gotoHome:function(){uni.navigateTo({url:"/pages/index/index"})},goTesting:function(e,i){uni.navigateTo({url:"/pages/index/testing_questions?nid="+e+"&title="+i}),t("log","goTesting..."," at pages/index/app_index.vue:272")},gotoTestList:function(){uni.navigateTo({url:"/pages/index/testing"})},gotoCaseList:function(e){uni.navigateTo({url:"/pages/cases/index?app_cid="+e,fail:function(e){t("log","fail",e," at pages/index/app_index.vue:284")}})},getArticleView:function(e,i,a){t("log","getArticleView....",e,i,a," at pages/index/app_index.vue:289"),uni.navigateTo({url:"/pages/cases/detail?id="+e+"&cid="+i+"&title="+a})},getCategoryArr:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function i(){var a,n,o,s,l,c,d;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a=new Date,t("log","getCategoryArr--start",a.getTime()," at pages/index/app_index.vue:297"),n=getApp().globalData,o=n.serverUri,s=n.auth,e,l=o+"?mod=news&ac=indextj",i.next=9,r.default.request(l,{auth:s,cid:[69,68,1,2]});case 9:c=i.sent,e.casesNavList=c,d=new Date,t("log","getCategoryArr--end",d.getTime()," at pages/index/app_index.vue:309"),t("log","getCategoryArr cost "+(d.getTime()-a.getTime())+"ms"," at pages/index/app_index.vue:310"),t("log","respData",c," at pages/index/app_index.vue:311");case 15:case"end":return i.stop()}}),i)})))()},getNavList:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function i(){var a,n,o,s,l,c,d,u,f,p,g;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a=new Date,t("log","getNavList--start",a.getTime()," at pages/index/app_index.vue:315"),n=getApp().globalData,o=n.serverUri,s=n.auth,e,l=o+"?mod=loveword&ac=get_all_cid",i.next=9,r.default.request(l,{auth:s});case 9:for(c=i.sent,d=c.length,u=[],f=0;f<d;f++)p={title:c[f].firstNav.title,navId:c[f].firstNav.navId,litpic:c[f].firstNav.litpic},u.push(p);t("log","appNavList",u," at pages/index/app_index.vue:334"),e.appNavList=Object.freeze(u),g=new Date,t("log","getNavList--end",g.getTime()," at pages/index/app_index.vue:337"),t("log","getCategoryArr cost "+(g.getTime()-a.getTime())+"ms"," at pages/index/app_index.vue:338");case 18:case"end":return i.stop()}}),i)})))()},getAdsInfo:function(){var e=this,i=new Date;t("log","getAdsInfo--start",i.getTime()," at pages/index/app_index.vue:342");var a=getApp().globalData,n=a.serverUri,o=a.auth,s=n+"?mod=ad&ac=get_ad";r.default.request(s,{auth:o,filterData:!0,cid:6}).then((function(a){1==a.status&&(e.base_lsit=Object.freeze(a.data)),t("log","adsArr:",e.adsArr," at pages/index/app_index.vue:357");var n=new Date;t("log","getAdsInfo--end",n.getTime()," at pages/index/app_index.vue:359"),t("log","getAdsInfo cost "+(n.getTime()-i.getTime())+"ms"," at pages/index/app_index.vue:360")}))},getSwiperList:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function i(){var a,n,o,s,l,c,d,u;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a=new Date,t("log","getSwiperList--start",a.getTime()," at pages/index/app_index.vue:365"),n=getApp().globalData,o=n.serverUri,s=n.auth,e,l=o+"?mod=cyc&ac=indextj",i.next=9,r.default.request(l,{auth:s,filterData:!0,num:7});case 9:c=i.sent,d=[],1==c.status&&(t("log","resp.data",c.data," at pages/index/app_index.vue:378"),d=c.data),e.TowerSwiper(d),u=new Date,t("log","getSwiperList--end",u.getTime()," at pages/index/app_index.vue:386"),t("log","getSwiperList cost "+(u.getTime()-a.getTime())+"ms"," at pages/index/app_index.vue:387");case 16:case"end":return i.stop()}}),i)})))()},TowerSwiper:function(e){for(var i=0;i<e.length;i++)e[i].zIndex=parseInt(e.length/2)+1-Math.abs(i-parseInt(e.length/2)),e[i].mLeft=i-parseInt(e.length/2);t("log","list",e," at pages/index/app_index.vue:395"),this.swiperList=Object.freeze(e)},TowerStart:function(t){this.towerStart=t.touches[0].pageX},TowerMove:function(t){this.direction=t.touches[0].pageX-this.towerStart>0?"right":"left"},TowerEnd:function(){var t=this.direction,e=this.swiperList;if(!(e.length<=0)){if("right"==t){for(var i=e[0].mLeft,a=e[0].zIndex,n=1;n<e.length;n++)e[n-1].mLeft=e[n].mLeft,e[n-1].zIndex=e[n].zIndex;e[e.length-1].mLeft=i,e[e.length-1].zIndex=a}else{for(var r=e[e.length-1].mLeft,o=e[e.length-1].zIndex,s=e.length-1;s>0;s--)e[s].mLeft=e[s-1].mLeft,e[s].zIndex=e[s-1].zIndex;e[0].mLeft=r,e[0].zIndex=o}this.direction="",this.swiperList=Object.freeze(e)}},constantize:function(t){var e=this;Object.freeze(t),Object.keys(t).forEach((function(i,a){"object"===typeof t[i]&&e.constantize(t[i])}))}}};e.default=s}).call(this,i("0de9")["log"])},"665c":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADM0lEQVRIS6WVTYgcRRTH/6+6d2RcRSNRQdSTjrgHA+L6AUECRowiISLO7tQbd/aiB1fUgwfBy9ySo+hBFpUFd7umaTSyEFQMQfyI4mWDgl9rclAXXCNx8Quxp7v+UnFGlsDOTiYFDd3Ue/9fvap6/xYMOZxzB0geEpGC5EFVTYZJlWGCsiy7sizLHwF8QfJvAHcDeMxa++p2+UMBFhcX90RR9L73fnez2TzunFsWkb15nl/farXODIIMBUjT9BHvfWaMuWl6eno1y7IbiqL4juTTqvriBQOSJHkZwPTY2NjOer1eBkHn3CmSx1V15oIAWZZdURTF9yLyVqPR+F/MOfc5yZOq+vDIgHa7HddqtTcB7MvzfGJ2dvZUX8w5dxLAx9ba2W0BS0tL9xtjJkVEvPddkkfjOM7LsnxFRCZJtlT19b7QwsLC5ZVK5bSIHBORIyHHGBPic2PMr8aYtampqS9FhOKcew7AQZLdoA8gAhADCO+/kHxCVQ9vXmWn07EkFwCESyIkTVhc77sfesJ7vz8A1kTkkyiKWuvr6358fLxSrVaPkryYZLiWv5+7BfPz82OVSiXK89xUq1XpdkMBJgpPHMeXRFE04b1/DcBKAJwmmanqk32hJEneBrBDVe/arpG2mk+S5CURmQqAnwG8Ya2d23SA75C8VFV3jwpwznUATG4JADBurQ2WMNJwzr0HYOcgQNVau2ck9f8acYXkT4MAFWvtPaMA2u22qdVqZ0SkMwgQW2vvHQXQ6XSuI/mDiDw+6JCNqt43IuAhkodF5NZBAKrqA6MAkiR5QUQejeP4qkFbVFprHxwFEJwWwGfWWjuogq6q7j9fQJqmd3rvPyV5QFWXtwSIyB+NRqN+vgDn3BKAvaurq9e22+0iAIKhJar6zKZOPgIg9MAHAD4SkQ+jKDpRr9fD/3jLkabprrIsV0TkeWvtoRAYAO+SvE1ElklSRIKT1kl+KyLBWSd6DhvEvwGwBuA3kv8YY87CvPfo5e0DwI2NjRvn5ub+PAvo3dng+zcH/Z5NHyuK4qmZmZm/nHNXi8gdJG8HcAuAa0heJiIXnVNKSfJrks82m82v+nP/ApRj0PAc4MhrAAAAAElFTkSuQmCC"},6908:function(t,e,i){"use strict";var a={uNavbar:i("938b").default,uniIcons:i("97fd").default,uNoNetwork:i("261f").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("u-navbar",{attrs:{"is-back":!1,title:"",borderBottom:!0,isFixed:!0,zIndex:1e16,height:t.navHeight},scopedSlots:t._u([{key:"default",fn:function(){return[a("v-uni-view",{staticClass:"slot-wrap"},[a("v-uni-view",{attrs:{id:"slot-img"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoTop.apply(void 0,arguments)}}},[a("v-uni-image",{attrs:{"lazy-load":!0,src:i("d559")}})],1),a("v-uni-view",{attrs:{id:"slot-input"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoKeywordPage.apply(void 0,arguments)}}},[a("uni-icons",{attrs:{type:"search",id:"search-icon",color:"#CCCCCC"}}),a("v-uni-input",{attrs:{placeholder:"大家都在搜",disabled:"true","placeholder-class":"search-holder",id:"search-input"}})],1)],1)]},proxy:!0}])}),a("v-uni-scroll-view",{style:"height:"+t.scrollHeight+"px;",attrs:{"scroll-y":!0},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.lower.apply(void 0,arguments)}}},[a("v-uni-view",{attrs:{id:"root-view"}},[a("v-uni-view",{attrs:{id:"ads-view"}},[a("ls-swiper",{attrs:{list:t.base_lsit,imgKey:"ad_img",crown:!0,loop:!0,shadow:!0,height:160,previousMargin:60,nextMargin:60,imgRadius:5,autoplay:!0,interval:6e3},on:{clickItem:function(e){arguments[0]=e=t.$handleEvent(e),t.clickItem.apply(void 0,arguments)}}})],1),a("v-uni-view",{attrs:{id:"margin-area-view"}},[a("v-uni-view",{staticClass:"padding-css",attrs:{id:"huashu-view-box"}},[a("v-uni-view",{staticClass:"huashu-first-line",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoHome.apply(void 0,arguments)}}},[a("v-uni-view",[a("v-uni-image",{staticClass:"title-icon",attrs:{"lazy-load":!0,src:i("f22a")}}),a("v-uni-text",{staticClass:"font-css"},[t._v("话术教学")])],1),a("v-uni-text",{staticClass:"more-text"},[t._v("更多话术>")])],1),a("v-uni-view",{staticClass:"huashu-second-line"},t._l(t.appNavList,(function(e,i){return a("v-uni-view",{key:e.navId,class:["second-nav-three-row",i>=3?"bottom-nav-row":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.enter_huashu(e.title,e.navId)}}},[e.litpic?a("v-uni-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.litpic},on:{load:function(e){arguments[0]=e=t.$handleEvent(e),t.loadHuashuImg(i)}}}):t._e(),a("v-uni-text",{staticStyle:{position:"absolute"}},[t._v(t._s(e.title))])],1)})),1)],1),a("v-uni-view",{staticClass:"padding-css",attrs:{id:"miaoyu-test"}},[a("v-uni-view",{staticClass:"huashu-first-line"},[a("v-uni-view",[a("v-uni-image",{staticClass:"title-icon",attrs:{"lazy-load":!0,src:i("f22a")}}),a("v-uni-text",{staticClass:"font-css",attrs:{id:"test-title"}},[t._v("测一测")])],1),a("v-uni-text",{staticClass:"more-text",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoTestList.apply(void 0,arguments)}}},[t._v("更多测试>")])],1),a("v-uni-view",{staticClass:"swiperTest"},[a("v-uni-view",{staticClass:"tower-swiper",on:{touchmove:function(e){arguments[0]=e=t.$handleEvent(e),t.TowerMove.apply(void 0,arguments)},touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.TowerStart.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.TowerEnd.apply(void 0,arguments)}}},t._l(t.swiperList,(function(e,i){return a("v-uni-view",{key:e.nid,staticClass:"tower-item",class:1==e.zIndex?"none":"",style:[{"--index":e.zIndex,"--left":e.mLeft}],attrs:{"data-direction":t.direction},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goTesting(e.nid,e.title)}}},[a("v-uni-view",{staticClass:"swiper-item"},[e.thumbUrl_tj?a("v-uni-image",{attrs:{"lazy-load":!0,src:e.thumbUrl_tj,mode:"aspectFill"},on:{load:function(i){arguments[0]=i=t.$handleEvent(i),t.loadTest(e.thumbUrl_tj)}}}):t._e(),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"white"}},[t._v(t._s(e.title))])],1)],1)],1)})),1)],1)],1),a("v-uni-view",{attrs:{id:"cases-content"}},t._l(t.casesNavList,(function(e,n,r){return a("v-uni-view",{key:n,staticClass:"cview padding-css"},[a("v-uni-view",{staticClass:"huashu-first-line",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.gotoCaseList(e[0].cid)}}},[a("v-uni-view",[a("v-uni-image",{staticClass:"title-icon",attrs:{"lazy-load":!0,src:i("f22a")}}),a("v-uni-text",{staticClass:"font-css"},[t._v(t._s(e[0]?e[0].classname:""))])],1),a("v-uni-text",{staticClass:"more-text"},[t._v("查看更多 >")])],1),a("v-uni-view",{staticClass:"content-view"},t._l(e,(function(n,o){return a("v-uni-view",{key:n.id,staticClass:"content-root-view",style:r%2==0?"flex-direction:row":"flex-direction:row-reverse",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getArticleView(n.id,n.cid,e[0]?e[0].classname:"")}}},[a("v-uni-view",{staticClass:"content-img-view"},[n.thumbUrl?a("v-uni-image",{staticClass:"thumb-class",attrs:{"lazy-load":!0,src:n.thumbUrl},on:{load:function(e){arguments[0]=e=t.$handleEvent(e),t.loadItemPic(n.thumbUrl)}}}):t._e()],1),a("v-uni-view",{staticClass:"content-titleinfo-view"},[a("v-uni-view",{staticClass:"content-title-view"},[a("v-uni-text",[t._v(t._s(n.title))])],1),a("v-uni-view",{staticClass:"content-desc-view"},[a("v-uni-text",[t._v(t._s(n.description))])],1),a("v-uni-view",{staticClass:"content-stats-view"},[a("v-uni-view",{staticClass:"content-stats-view-readnum"},[a("v-uni-image",{staticClass:"view-icon-class",attrs:{"lazy-load":!0,src:i("e6a6")}}),a("v-uni-text",[t._v(t._s(n.readNum))])],1),a("v-uni-view",{staticClass:"content-stats-view-praisenum"},[a("v-uni-image",{staticClass:"praise-icon-class",attrs:{"lazy-load":!0,src:i("665c")}}),a("v-uni-text",[t._v(t._s(n.wzsccs))])],1)],1)],1)],1)})),1)],1)})),1)],1)],1)],1),a("u-no-network")],1)},r=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}))},9872:function(t,e,i){"use strict";i.r(e);var a=i("63cf"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},a477:function(t,e,i){"use strict";var a=i("b627"),n=i.n(a);n.a},a499:function(t,e,i){var a=i("c0b2");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("926f0fd0",a,!0,{sourceMap:!1,shadowMode:!1})},acb4:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.wrap[data-v-cb799a6a]{position:relative}.wrap .crown[data-v-cb799a6a]{-webkit-transform:scale(.93,.85);transform:scale(.93,.85)}.wrap .item[data-v-cb799a6a]{height:100%;-webkit-transition:1.2s;transition:1.2s}.wrap .item-img[data-v-cb799a6a]{width:100%;height:100%}.wrap .imgShadow[data-v-cb799a6a]{height:calc(100% - 10px);margin-bottom:10px;box-shadow:0 6px 6px rgba(0,0,0,.15)}.wrap .crown-active[data-v-cb799a6a]{-webkit-transform:scale(1);transform:scale(1)}.wrap .dots[data-v-cb799a6a]{display:-webkit-box;display:-webkit-flex;display:flex;position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.wrap .dots .dot[data-v-cb799a6a]{width:%?6?%;height:%?6?%;border-radius:50%;background-color:#d6d6d6;margin-right:%?8?%}.wrap .dots .curr-dot[data-v-cb799a6a]{height:%?6?%;width:%?22?%;border-radius:%?6?%;background-color:#fff}',""]),t.exports=e},b627:function(t,e,i){var a=i("acb4");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("320e79f5",a,!0,{sourceMap:!1,shadowMode:!1})},bb2f:function(t,e,i){var a=i("d039");t.exports=!a((function(){return Object.isExtensible(Object.preventExtensions({}))}))},c0b2:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*\r\n\t@import "../../colorui/main.css";\r\n\t*/.tower-swiper[data-v-88f5b2f4]{height:%?420?%;position:relative;max-width:%?750?%;overflow:hidden}.tower-swiper .tower-item[data-v-88f5b2f4]{position:absolute;width:%?300?%;height:%?380?%;top:0;bottom:0;left:50%;margin:auto;-webkit-transition:all .2s ease-in 0s;transition:all .2s ease-in 0s;opacity:1}.tower-swiper .tower-item.none[data-v-88f5b2f4]{opacity:0}.tower-swiper .tower-item .swiper-item[data-v-88f5b2f4]{width:100%;height:100%;border-radius:%?6?%;overflow:hidden}body[data-v-88f5b2f4]{background:#fff;font-size:%?28?%;color:#333}uni-image[data-v-88f5b2f4]{will-change:transform}#root-view[data-v-88f5b2f4]{background:#f2f2f2}.title-icon[data-v-88f5b2f4]{width:%?8?%;\r\n  /*height: 36rpx;*/display:block;float:left;height:%?40?%;line-height:1;margin-right:%?22?%}.slot-wrap[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-top:%?35?%;padding-left:%?34?%;padding-right:%?35?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-bottom:%?11?%;padding-bottom:%?20?%}.slot-wrap #slot-img[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.slot-wrap #slot-img uni-image[data-v-88f5b2f4]{width:%?191?%;height:%?45?%}.slot-wrap #slot-input[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;width:%?400?%;height:%?60?%;border-radius:%?30?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#f2f2f2}.slot-wrap #slot-input #search-icon[data-v-88f5b2f4]{margin-left:%?21?%;margin-right:%?19?%}#ads-view[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;margin-left:%?30?%;margin-right:%?30?%;width:%?690?%;\r\n  /*background-color: #FFFFFF;*/padding-top:%?24?%;padding-bottom:%?30?%;height:%?320?%}.wrap[data-v-88f5b2f4]{width:%?690?%}.padding-css[data-v-88f5b2f4]{padding-left:%?25?%;padding-right:%?28?%}#margin-area-view[data-v-88f5b2f4]{margin-left:%?30?%;margin-right:%?30?%;margin-top:%?54?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:%?690?%}#margin-area-view .huashu-first-line[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}#margin-area-view .huashu-first-line uni-view[data-v-88f5b2f4]{display:block;height:%?40?%;line-height:1}#margin-area-view .huashu-first-line .font-css[data-v-88f5b2f4]{display:block;float:left;height:%?40?%;line-height:1;font-size:%?36?%;font-family:PingFang SC;font-weight:800;color:#272727}#margin-area-view .huashu-first-line .more-text[data-v-88f5b2f4]{font-size:%?28?%;font-family:PingFang SC;font-weight:400;color:#a6a6a6}#margin-area-view #huashu-view-box[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding-top:%?37?%;padding-bottom:%?40?%;margin-bottom:%?30.01?%;background:#fff;border-radius:%?20?%}#margin-area-view #huashu-view-box .huashu-first-line > uni-text[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex}#margin-area-view #huashu-view-box .huashu-second-line[data-v-88f5b2f4]{margin-top:%?37?%;\r\n  /*margin-bottom:40px;*/display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap;\r\n  /*height: 500rpx;*/-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:space-between;-webkit-align-items:space-between;align-items:space-between}#margin-area-view #huashu-view-box .huashu-second-line .second-nav-three-row[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?190?%;height:%?120?%;color:#fff;background-size:contain;background-repeat:no-repeat;font-size:%?20?%;font-family:PingFang SC;font-weight:400}#margin-area-view #huashu-view-box .huashu-second-line .second-nav-three-row uni-text[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;border-radius:%?10?%;padding:%?5?% %?5?%;background-color:rgba(0,0,0,.5)}#margin-area-view #huashu-view-box .huashu-second-line .bottom-nav-row[data-v-88f5b2f4]{position:relative;margin-top:%?32?%}#margin-area-view #miaoyu-test[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%;\r\n  /*max-height:500px;*/padding-top:%?36?%;padding-bottom:%?39?%;background:#fff;border-radius:%?20?%;margin-bottom:%?30.01?%}#margin-area-view #miaoyu-test .swiperTest[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%\r\n  /*height: 200px;*/}#margin-area-view #miaoyu-test .swiperTest .tower-swiper[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%}#margin-area-view #miaoyu-test .swiperTest .tower-swiper .tower-item[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-transform:scale(calc(.5 + var(--index) / 10));transform:scale(calc(.5 + var(--index) / 10));margin-left:calc(var(--left) * %?100?% - %?150?%);z-index:var(--index)}#margin-area-view #miaoyu-test .swiperTest .tower-swiper .tower-item .swiper-item[data-v-88f5b2f4]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}#margin-area-view #miaoyu-test .swiperTest .tower-swiper .tower-item .swiper-item uni-view[data-v-88f5b2f4]{position:absolute;padding:%?0?% %?10?%;border-radius:10px;background-color:rgba(0,0,0,.5);top:%?180?%;color:#fff}#margin-area-view #cases-content[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}#margin-area-view #cases-content .cview[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background:#fff;border-radius:%?20?%;margin-bottom:%?30.01?%;padding-top:%?38?%;padding-bottom:%?34?%}#margin-area-view #cases-content .content-root-view[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;margin-top:%?38?%}#margin-area-view #cases-content .content-root-view .content-img-view[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;margin-right:%?22?%}#margin-area-view #cases-content .content-root-view .content-img-view .thumb-class[data-v-88f5b2f4]{width:%?120?%;height:%?120?%}#margin-area-view #cases-content .content-root-view .content-titleinfo-view[data-v-88f5b2f4]{display:-webkit-box;display:-webkit-flex;display:flex;width:%?496?%;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}#margin-area-view #cases-content .content-root-view .content-title-view[data-v-88f5b2f4]{width:100%;display:block;overflow:hidden;text-overflow:ellipsis;\r\n  /*display: -webkit-box;\r\n\t\t\t\tword-break: break-all;\r\n\t\t\t\t-webkit-line-clamp: 1;\r\n\t\t\t\t-webkit-box-orient: vertical;*/-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;margin-top:%?0?%}#margin-area-view #cases-content .content-root-view .content-title-view uni-text[data-v-88f5b2f4]{font-size:%?32?%;font-family:PingFang SC;font-weight:500;color:#333232}#margin-area-view #cases-content .content-root-view .content-desc-view[data-v-88f5b2f4]{width:%?492?%;display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;word-break:break-all;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:%?24?%;font-family:PingFang SC;font-weight:400;color:#a6a6a6}#margin-area-view #cases-content .content-root-view .content-stats-view[data-v-88f5b2f4]{width:%?492?%;height:%?50?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;font-size:%?20?%;font-family:PingFang SC;font-weight:400;color:#9a9a9a}#margin-area-view #cases-content .content-root-view .content-stats-view .content-stats-view-readnum[data-v-88f5b2f4]{margin-right:%?46?%}.view-icon-class[data-v-88f5b2f4]{width:%?32?%;height:%?20?%;margin-right:%?13?%}.praise-icon-class[data-v-88f5b2f4]{width:%?24?%;height:%?24?%;margin-right:%?15?%}',""]),t.exports=e},c4e3:function(t,e,i){"use strict";i.r(e);var a=i("626f"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},d559:function(t,e,i){t.exports=i.p+"static/img/app_logo.3ad41b4f.png"},dca8:function(t,e,i){var a=i("23e7"),n=i("bb2f"),r=i("d039"),o=i("861d"),s=i("f183").onFreeze,l=Object.freeze,c=r((function(){l(1)}));a({target:"Object",stat:!0,forced:c,sham:!n},{freeze:function(t){return l&&o(t)?l(s(t)):t}})},e6a6:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAC50lEQVRIS8VWW0sVURT+vhm1OFGZ0kP1EmhREFEPFfRUBD0coqxIz95zVEQqukDXn2E3oaRSRDgz+1iQIIEFXR56ieghgii6QE8FRVlEUurMim3HmHROHolyPwwze9b69rfXXutbm5jGCIJgtYjsILlJRGoAVBXcP5J8JSJ3SfZrrR+XCssSDBkEwR4AJwCst/Yi8oXkSxF5b79JLgRgCc0r4D0AcEprfdWa/2mNPxLo7e3dHIbhWQCrAXwUkRzJa5WVlffT6fT3OHB7e/us6urqDQB2A/BIVgN47Lru0YaGhrvFSCQS6O7unl1RUdFG8hCAzwBOl5WVnauvr7fvU46urq65qVTqiIicBDBfRM4PDw+fbGlp+TbReRIBY8xSEekDsAbAFZLHlFJvElalMWaRnVdKvU0KtTFmsYicAVAP4BHJnUqp13Gs3wgYY9aKyE2Sc8IwPJrNZi8nLRwEwXEA+wEsK/x/AeCi1vp0EpFcLrfXdd2zIvKVZFop9XAc9xcBY8yWKIr6HMcZFJG01vpJUqx938+TbADQD+BawWYXgO0ictXzPLvbSSOfz6+KomgAwAIRqfM879ZYAtuH7/tpkjbsz8Mw3NrY2GhDOmnYnTiOc0lEDnqe1xE38H3/AMkLURQdzmaz55P8e3p6lpSXl98AsNxxnLpMJjPAXC63znXdeyLyfGRkZHNzc/OHYlkWBMEzAC+11tuSbIIguA6gVmu9ohhGZ2dnVSqVugNgRRiGG22N26T4NDo6urWpqeldMUff9xeQtIKzTymVlBswxuwVERuhKs/zBqfAum2FbOYJTPMIngJ4NcUR1GitV5Z8BNNJwliIiyYhycNKqdKTcJzpjJZhjEQpQgQrRCQPiEjtWC3/bEwdBSFKLN8phShGoiQpFhHm8/kxKc5kMm9JTup605bicRITmxHJtqGhoXOtra1fiiVXfP6vmlEcKN6ORcQKlP9f2vGEXc7chWRiuP/FlewHXWzw/lq8GRMAAAAASUVORK5CYII="},f183:function(t,e,i){var a=i("d012"),n=i("861d"),r=i("5135"),o=i("9bf2").f,s=i("90e3"),l=i("bb2f"),c=s("meta"),d=0,u=Object.isExtensible||function(){return!0},f=function(t){o(t,c,{value:{objectID:"O"+ ++d,weakData:{}}})},p=function(t,e){if(!n(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!r(t,c)){if(!u(t))return"F";if(!e)return"E";f(t)}return t[c].objectID},g=function(t,e){if(!r(t,c)){if(!u(t))return!0;if(!e)return!1;f(t)}return t[c].weakData},v=function(t){return l&&w.REQUIRED&&u(t)&&!r(t,c)&&f(t),t},w=t.exports={REQUIRED:!1,fastKey:p,getWeakData:g,onFreeze:v};a[c]=!0},f22a:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAkCAYAAAC0YXvGAAAAVklEQVQ4T2NcPuGTH+O/PzMZGBklGJDB//8v/jOxpDOu6Hv3HEMSpvA/4wvGFf3v/6PoROOMKoAEyGg4jIYDctYYMemBYAHS996fgeH/DGxFEAMDYwYAxAN/ymfshKkAAAAASUVORK5CYII="}}]);