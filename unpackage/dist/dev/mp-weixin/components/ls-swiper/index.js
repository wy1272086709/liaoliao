(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/ls-swiper/index"],{131:
/*!**********************************************************!*\
  !*** D:/uniapptest/myapp/components/ls-swiper/index.vue ***!
  \**********************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! ./index.vue?vue&type=template&id=06a33bd4&scoped=true& */132),u=n(/*! ./index.vue?vue&type=script&lang=js& */134);for(var i in u)"default"!==i&&function(e){n.d(t,e,(function(){return u[e]}))}(i);n(/*! ./index.vue?vue&type=style&index=0&id=06a33bd4&lang=scss&scoped=true& */136);var a,o=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */15),d=Object(o["default"])(u["default"],r["render"],r["staticRenderFns"],!1,null,"06a33bd4",null,!1,r["components"],a);d.options.__file="components/ls-swiper/index.vue",t["default"]=d.exports},132:
/*!*****************************************************************************************************!*\
  !*** D:/uniapptest/myapp/components/ls-swiper/index.vue?vue&type=template&id=06a33bd4&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=06a33bd4&scoped=true& */133);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},133:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/uniapptest/myapp/components/ls-swiper/index.vue?vue&type=template&id=06a33bd4&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return u})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));var u=function(){var e=this,t=e.$createElement;e._self._c},i=!1,a=[];u._withStripped=!0},134:
/*!***********************************************************************************!*\
  !*** D:/uniapptest/myapp/components/ls-swiper/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */135),u=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=u.a},135:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/uniapptest/myapp/components/ls-swiper/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={props:{list:{type:Array,default:function(){return[]}},imgKey:{type:String,required:!0},height:{type:Number,default:200},imgRadius:{type:Number,default:0},imgShadow:{type:Boolean,default:!1},previousMargin:{type:Number,default:0},nextMargin:{type:Number,default:0},imgWidth:{type:String,default:"100%"},loop:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!1},interval:{type:Number,default:2e3},duration:{type:Number,default:1200},dots:{type:Boolean,default:!1},bottom:{type:Number,default:10},crown:{type:Boolean,default:!1}},data:function(){return{current:0,slots:!1}},watch:{list:{handler:function(e){e.length>0&&this.$slots.default&&(this.slots=!0)},immediate:!0}},methods:{change:function(e){var t=e.detail.current;this.current=t,this.$emit("change",this.list[t])}}};t.default=r},136:
/*!********************************************************************************************************************!*\
  !*** D:/uniapptest/myapp/components/ls-swiper/index.vue?vue&type=style&index=0&id=06a33bd4&lang=scss&scoped=true& ***!
  \********************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&id=06a33bd4&lang=scss&scoped=true& */137),u=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=u.a},137:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/uniapptest/myapp/components/ls-swiper/index.vue?vue&type=style&index=0&id=06a33bd4&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/ls-swiper/index.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/ls-swiper/index-create-component',
    {
        'components/ls-swiper/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(131))
        })
    },
    [['components/ls-swiper/index-create-component']]
]);
