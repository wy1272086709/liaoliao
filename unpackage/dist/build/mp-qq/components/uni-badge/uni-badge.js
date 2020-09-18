(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-badge/uni-badge"],{"0384":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{badgeStyle:""}},watch:{text:function(){this.setStyle()}},mounted:function(){this.setStyle()},methods:{setStyle:function(){this.badgeStyle="width: ".concat(8*String(this.text).length+12,"px")},onClick:function(){this.$emit("click")}}};e.default=u},"3c10":function(t,e,n){"use strict";n.r(e);var u=n("412e"),i=n("d42c");for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("bc50");var a,f=n("f0c5"),r=Object(f["a"])(i["default"],u["b"],u["c"],!1,null,"967f4f64",null,!1,u["a"],a);e["default"]=r.exports},"412e":function(t,e,n){"use strict";var u,i=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return u}))},bc50:function(t,e,n){"use strict";var u=n("fbfd"),i=n.n(u);i.a},d42c:function(t,e,n){"use strict";n.r(e);var u=n("0384"),i=n.n(u);for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);e["default"]=i.a},fbfd:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-badge/uni-badge-create-component',
    {
        'components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('a821')['createComponent'](__webpack_require__("3c10"))
        })
    },
    [['components/uni-badge/uni-badge-create-component']]
]);
