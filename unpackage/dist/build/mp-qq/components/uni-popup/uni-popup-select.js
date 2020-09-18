(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-select"],{"0f54":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniPopupSelect",props:{bottomData:{default:function(){return[{text:"更换头像",id:1},{text:"拍照",id:2},{text:"从相册获取",id:3},{text:"取消",id:4}]},type:Array},indexStyle:{type:String,default:"font-weight:bolder;color:#333333;"}},inject:["popup"],data:function(){return{}},created:function(){},methods:{select:function(t,e){var n=this;this.$emit("select",{item:t,index:e},(function(){console.log("close"),n.popup.close()}))},close:function(){this.popup.close()}}};e.default=u},"1c96":function(t,e,n){"use strict";var u=n("8bfb"),c=n.n(u);c.a},"3c41":function(t,e,n){"use strict";n.r(e);var u=n("0f54"),c=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);e["default"]=c.a},"3d9d":function(t,e,n){"use strict";n.r(e);var u=n("f4c5"),c=n("3c41");for(var o in c)"default"!==o&&function(t){n.d(e,t,(function(){return c[t]}))}(o);n("1c96");var i,r=n("f0c5"),f=Object(r["a"])(c["default"],u["b"],u["c"],!1,null,"7f18e6e8",null,!1,u["a"],i);e["default"]=f.exports},"8bfb":function(t,e,n){},f4c5:function(t,e,n){"use strict";var u,c=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return u}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-select-create-component',
    {
        'components/uni-popup/uni-popup-select-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('a821')['createComponent'](__webpack_require__("3d9d"))
        })
    },
    [['components/uni-popup/uni-popup-select-create-component']]
]);
