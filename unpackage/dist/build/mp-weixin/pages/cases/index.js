(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cases/index"],{"0e48":function(t,e,i){"use strict";var l=i("4021"),a=i.n(l);a.a},4021:function(t,e,i){},"819a":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=function(){i.e("common/tabbar").then(function(){return resolve(i("49c3"))}.bind(null,i)).catch(i.oe)},a=[{id:1,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:2,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:3,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:4,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:5,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:6,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:7,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:8,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:9,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"},{id:10,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法，全程高能",readTime:"4.28 18:00",readNum:"2.77万"}],s={data:function(){return{tabName:"last_update",last_update_class:"last_update border-active",love_skills_class:"love_skills",girl_area_class:"girl_area",list:a,page:1,interval:null,isIphoneX:!1,scrollHeight:0,bottom:0,winHeight:0}},onLoad:function(){var e=t.getSystemInfoSync().windowHeight,i=getApp().globalData.isIphoneX;this.isIphoneX=i,this.bottom=82,i&&(this.winHeight=e-34,this.bottom=this.bottom+34),this.scrollHeight=this.winHeight-82-50},mounted:function(){},components:{tabBar:l},beforeDestroy:function(){this.interval||clearTimeout(this.interval)},onReachBottom:function(){console.log("reach bottom!");var e=this;if(this.page>3){if(clearTimeout(this.interval),!e.isFixHeight){var i=t.createSelectorQuery().select("#content-view");i.boundingClientRect((function(t){console.log("data:",t),e.scrollHeight=t.height+20,e.isFixHeight=!0})).exec()}}else this.interval=setTimeout((function(){e.list.push({id:11,thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法22222",readTime:"4.28 18:00",readNum:"2.77万"}),e.page++}),500)},methods:{lower:function(){this.list.push({thumbUrl:"/static/img/love_skills/thumb.png",title:"套路女朋友的多种方法22222",readTime:"4.28 18:00",readNum:"2.77万"})},getArticleView:function(e){console.log("getArticleView...."),t.navigateTo({url:"/pages/cases/detail"})},switchTab:function(t){"last_update"==t?(this.last_update_class="last_update border-active",this.love_skills_class="love_skills",this.girl_area_class="girl_area"):"love_skills"==t?(this.last_update_class="last_update",this.love_skills_class="love_skills border-active",this.girl_area_class="girl_area"):"girl_area"==t&&(this.last_update_class="last_update",this.love_skills_class="love_skills",this.girl_area_class="girl_area border-active")}}};e.default=s}).call(this,i("543d")["default"])},"98ec":function(t,e,i){"use strict";var l,a=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return l}))},a9a8:function(t,e,i){"use strict";i.r(e);var l=i("819a"),a=i.n(l);for(var s in l)"default"!==s&&function(t){i.d(e,t,(function(){return l[t]}))}(s);e["default"]=a.a},c162:function(t,e,i){"use strict";i.r(e);var l=i("98ec"),a=i("a9a8");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("0e48");var r,n=i("f0c5"),o=Object(n["a"])(a["default"],l["b"],l["c"],!1,null,null,null,!1,l["a"],r);e["default"]=o.exports},f7ba:function(t,e,i){"use strict";(function(t){i("1fff"),i("921b");l(i("66fd"));var e=l(i("c162"));function l(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["f7ba","common/runtime","common/vendor"]]]);