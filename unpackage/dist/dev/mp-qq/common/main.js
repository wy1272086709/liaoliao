(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],[
/*!***********************************!*\
  !*** D:/uniapptest/myapp/main.js ***!
  \***********************************/
/*! no static exports found */function(e,t,o){"use strict";(function(e){o(/*! uni-pages */4);var t=u(o(/*! vue */2)),n=u(o(/*! ./App */5)),r=u(o(/*! vuex */16)),a=u(o(/*! ./store/store.js */17));function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?c(Object(o),!0).forEach((function(t){f(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function f(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}t.default.use(r.default);var i=new r.default.Store(a.default);t.default.config.productionTip=!1,console.log=function(e){var t=!0;return function(o){if(t)for(var n=arguments,r=0;r<n.length;r++)e.call(console,n[r])}}(console.log),n.default.mpType="app";var s=new t.default(l({store:i},n.default));e(s).$mount()}).call(this,o(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */1)["createApp"])},,,,
/*!***********************************!*\
  !*** D:/uniapptest/myapp/App.vue ***!
  \***********************************/
/*! no static exports found */,function(e,t,o){"use strict";o.r(t);var n=o(/*! ./App.vue?vue&type=script&lang=js& */6);for(var r in n)"default"!==r&&function(e){o.d(t,e,(function(){return n[e]}))}(r);o(/*! ./App.vue?vue&type=style&index=0&lang=css& */13);var a,u,c,l,f=o(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */15),i=Object(f["default"])(n["default"],a,u,!1,null,null,null,!1,c,l);i.options.__file="App.vue",t["default"]=i.exports},
/*!************************************************************!*\
  !*** D:/uniapptest/myapp/App.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! no static exports found */function(e,t,o){"use strict";o.r(t);var n=o(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */7),r=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=r.a},
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/uniapptest/myapp/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;r(o(/*! ./common/http.js */8));var n=r(o(/*! ./common/util.js */12));function r(e){return e&&e.__esModule?e:{default:e}}var a={onLaunch:function(){var t=this;console.log("on Launch!"),e.getSystemInfo({success:function(o){console.log("res",o);var n=o.model,r=o.platform.toLowerCase();"android"==r||"devtools"==r?t.globalData.platform=1:"ios"==r&&(t.globalData.platform=2),-1!=n.search("iPhone X")&&(t.globalData.isIphoneX=!0),e.setStorageSync("modelmes",n)}})},methods:{},onShow:function(){var e=n.default.cache("wx_userinfo"),t=1296e3;n.default.cache("wx_userinfo",e,t),console.log("App Show")},onHide:function(){console.log("App Hide")},globalData:{serverUri:"https://kuxou.com/index.php",hostUrl:"https://kuxou.com",isRecharge:0,auth:"376b66f9bedd4622522dce742adaaebc",platform:0,appLoginType:1}};t.default=a}).call(this,o(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */1)["default"])},,,,,
/*!********************************************************************!*\
  !*** D:/uniapptest/myapp/App.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************/
/*! no static exports found */,function(e,t,o){"use strict";o.r(t);var n=o(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */14),r=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=r.a},
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/uniapptest/myapp/App.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,o){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vbWFpbi5qcyIsbnVsbCwid2VicGFjazovLy9EOi91bmlhcHB0ZXN0L215YXBwL0FwcC52dWU/ZTBiMSIsInVuaS1hcHA6Ly8vQXBwLnZ1ZSIsIndlYnBhY2s6Ly8vRDovdW5pYXBwdGVzdC9teWFwcC9BcHAudnVlPzAyZDQiXSwibmFtZXMiOlsiVnVlIiwidXNlIiwiVnVleCIsInN0b3JlIiwiU3RvcmUiLCJzdG9yZU9iaiIsImNvbmZpZyIsInByb2R1Y3Rpb25UaXAiLCJjb25zb2xlIiwibG9nIiwib3JpTG9nRnVuYyIsImRlYnVnIiwic3RyIiwiYXJncyIsImFyZ3VtZW50cyIsImkiLCJsZW5ndGgiLCJjYWxsIiwiQXBwIiwibXBUeXBlIiwiYXBwIiwiJG1vdW50IiwicmVuZGVyIiwic3RhdGljUmVuZGVyRm5zIiwiY29tcG9uZW50cyIsInJlbmRlcmpzIiwiY29tcG9uZW50Iiwib3B0aW9ucyIsIl9fZmlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozt3RUFBQSxxQkFBbUIsd0JBQ25CLHNCQUNBLHNCQUNBLGtDLDB1QkFFQUEsVUFBSUMsSUFBSUMsV0FDUixJQUFNQyxFQUFRLElBQUlELFVBQUtFLE1BQU1DLFdBQzdCTCxVQUFJTSxPQUFPQyxlQUFnQixFQUczQkMsUUFBUUMsSUFBTyxTQUFTQyxHQUN0QixJQUFJQyxHQUFRLEVBQ1osT0FBTyxTQUFTQyxHQUNkLEdBQUlELEVBRU4sSUFEQSxJQUFJRSxFQUFPQyxVQUNIQyxFQUFJLEVBQUVBLEVBQUVGLEVBQUtHLE9BQU9ELElBQzNCTCxFQUFXTyxLQUFLVCxRQUFTSyxFQUFLRSxLQU5sQixDQVVaUCxRQUFRQyxLQUVYUyxVQUFJQyxPQUFTLE1BRWIsSUFBTUMsRUFBTSxJQUFJcEIsVUFBSixHQUNYRyxTQUNHZSxZQUVKLEVBQUFFLEdBQUlDLFc7Ozs7NERDNUJKLHVNQUFJQyxFQUFRQyxFQUFtQ0MsRUFDM0NDLEVBREosaUhBU0lDLEVBQVkscUJBQ2QsYUFDQUosRUFDQUMsR0FDQSxFQUNBLEtBQ0EsS0FDQSxNQUNBLEVBQ0FDLEVBQ0FDLEdBR0ZDLEVBQVVDLFFBQVFDLE9BQVMsVUFDWixhQUFBRixFOzs7OzJEQ3ZCZixrZUFBb3ZCLGVBQUc7Ozs7MElDQ3Z2QixtQ0FDQSxrQyxtREFDQSxJLEVBRUEsQ0FDQSxvQkFDQSxXQUNBLDBCQUNBLGlCQUNBLG9CQUNBLHFCQUNBLGNBQ0EsMkJBRUEsNEJBQ0Esd0JBQ0EsV0FDQSwwQkFFQSwwQkFDQSwyQkFFQSxtQ0FJQSxXQUdBLGtCQUNBLHFDQUNBLFNBQ0EsbUNBQ0EseUJBRUEsa0JBQ0EseUJBRUEsWUFDQSx3Q0FDQSw0QkFDQSxhQUNBLHdDQUNBLFdBR0EsaUI7Ozs7NERDL0NBLHdxQkFBNGpDLGVBQUciLCJmaWxlIjoiY29tbW9uL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3VuaS1wYWdlcyc7aW1wb3J0IFZ1ZSBmcm9tICd2dWUnXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnXHJcbmltcG9ydCBWdWV4IGZyb20gJ3Z1ZXgnXHJcbmltcG9ydCBzdG9yZU9iaiBmcm9tICcuL3N0b3JlL3N0b3JlLmpzJ1xyXG5cclxuVnVlLnVzZShWdWV4KVxyXG5jb25zdCBzdG9yZSA9IG5ldyBWdWV4LlN0b3JlKHN0b3JlT2JqKVxyXG5WdWUuY29uZmlnLnByb2R1Y3Rpb25UaXAgPSBmYWxzZVxyXG5cclxuLy/ph43lhpljb25zb2xlLmxvZ+aWueazle+8jOWIpOaWreaYr+WQpuW8gOWQr+aXpeW/l+iwg+ivleaooeW8j++8jOWQpuWImeWwseS4jei+k+WHulxyXG5jb25zb2xlLmxvZyA9IChmdW5jdGlvbihvcmlMb2dGdW5jKXtcclxuICBsZXQgZGVidWcgPSB0cnVlO1xyXG4gIHJldHVybiBmdW5jdGlvbihzdHIpe1xyXG4gICAgaWYgKGRlYnVnKXsvL+WIpOaWremFjee9ruaWh+S7tuaYr+WQpuW8gOWQr+aXpeW/l+iwg+ivlVxyXG5cdFx0bGV0IGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0XHRmb3IobGV0IGkgPSAwO2k8YXJncy5sZW5ndGg7aSsrKSB7XHJcblx0XHRcdG9yaUxvZ0Z1bmMuY2FsbChjb25zb2xlLCBhcmdzW2ldKTtcclxuXHRcdH1cclxuICAgIH1cclxuICB9XHJcbn0pKGNvbnNvbGUubG9nKTtcclxuXHJcbkFwcC5tcFR5cGUgPSAnYXBwJ1xyXG5cclxuY29uc3QgYXBwID0gbmV3IFZ1ZSh7XHJcblx0c3RvcmUsXHJcblx0Li4uQXBwXHJcbn0pXHJcbmFwcC4kbW91bnQoKSIsInZhciByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50c1xudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiFFOlxcXFxIQnVpbGRlclguMi42LjE2LjIwMjAwNDI0XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxccnVudGltZVxcXFxjb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgZmFsc2UsXG4gIGNvbXBvbmVudHMsXG4gIHJlbmRlcmpzXG4pXG5cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiQXBwLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzIUU6XFxcXEhCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjRcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTEyLTEhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzY3JpcHQuanMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzIUU6XFxcXEhCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjRcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTEyLTEhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzY3JpcHQuanMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCI8c2NyaXB0PlxyXG5pbXBvcnQgaHR0cCBmcm9tICcuL2NvbW1vbi9odHRwLmpzJztcclxuaW1wb3J0IHV0aWwgZnJvbSAnLi9jb21tb24vdXRpbC5qcyc7XHJcbmxldCBkZWJ1ZyA9IHRydWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0b25MYXVuY2g6IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IF9zZWxmID0gdGhpcztcclxuXHRcdGNvbnNvbGUubG9nKCdvbiBMYXVuY2ghJyk7XHJcblx0XHR1bmkuZ2V0U3lzdGVtSW5mbyh7XHJcblx0XHQgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdyZXMnLCByZXMpO1xyXG5cdFx0ICAgICAgICBsZXQgbW9kZWxtZXMgPSByZXMubW9kZWw7XHJcblx0XHRcdFx0bGV0IHBsYXRmb3JtID0gcmVzLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0Ly9hbmRyb2lkOiDlronljZMsIGlvczogSU9TLCBkZXZ0b29sczpQQ1xyXG5cdFx0XHRcdGlmIChwbGF0Zm9ybSA9PSAnYW5kcm9pZCcgIHx8IHBsYXRmb3JtID09ICdkZXZ0b29scycpIHtcclxuXHRcdFx0XHRcdF9zZWxmLmdsb2JhbERhdGEucGxhdGZvcm0gPSAxO1x0XHJcblx0XHRcdFx0fSBlbHNlIGlmKHBsYXRmb3JtID09ICdpb3MnICl7XHJcblx0XHRcdFx0XHRfc2VsZi5nbG9iYWxEYXRhLnBsYXRmb3JtID0gMjtcclxuXHRcdFx0XHR9XHJcblx0XHQgICAgICAgIGlmIChtb2RlbG1lcy5zZWFyY2goJ2lQaG9uZSBYJykgIT0gLTEpIHtcclxuXHRcdCAgICAgICAgICBfc2VsZi5nbG9iYWxEYXRhLmlzSXBob25lWCA9IHRydWU7XHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICAgICAgdW5pLnNldFN0b3JhZ2VTeW5jKCdtb2RlbG1lcycsIG1vZGVsbWVzKVxyXG5cdFx0ICAgICAgfVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRtZXRob2RzOntcclxuXHRcdFxyXG5cdH0sXHJcblx0b25TaG93OiBmdW5jdGlvbigpIHtcclxuXHRcdGxldCB1c2VySW5mb1N0ciA9IHV0aWwuY2FjaGUoJ3d4X3VzZXJpbmZvJyk7XHJcblx0XHRsZXQgbWludXRlcyA9IDE1KjI0KjM2MDA7XHJcblx0XHR1dGlsLmNhY2hlKCd3eF91c2VyaW5mbycsIHVzZXJJbmZvU3RyLCBtaW51dGVzKTtcclxuXHRcdGNvbnNvbGUubG9nKCdBcHAgU2hvdycpO1xyXG5cdH0sXHJcblx0b25IaWRlOiBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdBcHAgSGlkZScpO1xyXG5cdH0sXHJcblx0Z2xvYmFsRGF0YToge1xyXG5cdFx0c2VydmVyVXJpOiBcImh0dHBzOi8va3V4b3UuY29tL2luZGV4LnBocFwiLFxyXG5cdFx0aG9zdFVybDogJ2h0dHBzOi8va3V4b3UuY29tJyxcclxuXHRcdGlzUmVjaGFyZ2U6IDAsIC8vIOaYr+WQpumAmui/h+WFheWAvOi/lOWbnuS4quS6uuS4reW/gy4uLlxyXG5cdFx0YXV0aDogJzM3NmI2NmY5YmVkZDQ2MjI1MjJkY2U3NDJhZGFhZWJjJyxcclxuXHRcdHBsYXRmb3JtOiAwLFxyXG5cdFx0Ly8gQVBQIOaJi+acuuWPt+eZu+W9lem7mOiupOS4ujEsXHJcblx0XHQvLyBBUFAg5b6u5L+h55m75b2V6buY6K6k5Li6MixRUeeZu+W9lem7mOiupOS4ujNcclxuXHRcdGFwcExvZ2luVHlwZTogMVxyXG5cdH1cclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcbi8qIOino+WGs+WktOadoeWwj+eoi+W6j+e7hOS7tuWGheW8leWFpeWtl+S9k+S4jeeUn+aViOeahOmXrumimCAqL1xyXG4vKiAjaWZkZWYgTVAtVE9VVElBTyAqL1xyXG5AZm9udC1mYWNlIHtcclxuXHRmb250LWZhbWlseTogdW5paWNvbnM7XHJcblx0c3JjOiB1cmwoJy9zdGF0aWMvdW5pLnR0ZicpO1xyXG59XHJcbi8qICNlbmRpZiAqL1xyXG48L3N0eWxlPlxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSFFOlxcXFxIQnVpbGRlclguMi42LjE2LjIwMjAwNDI0XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXFxcXGRpc3RcXFxcbG9hZGVyLmpzPz9yZWYtLTYtb25lT2YtMS0wIUU6XFxcXEhCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjRcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxkaXN0XFxcXGNqcy5qcz8/cmVmLS02LW9uZU9mLTEtMSFFOlxcXFxIQnVpbGRlclguMi42LjE2LjIwMjAwNDI0XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcbG9hZGVyc1xcXFxzdHlsZVBvc3RMb2FkZXIuanMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTIhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxwb3N0Y3NzLWxvYWRlclxcXFxzcmNcXFxcaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSFFOlxcXFxIQnVpbGRlclguMi42LjE2LjIwMjAwNDI0XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXFxcXGRpc3RcXFxcbG9hZGVyLmpzPz9yZWYtLTYtb25lT2YtMS0wIUU6XFxcXEhCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjRcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxkaXN0XFxcXGNqcy5qcz8/cmVmLS02LW9uZU9mLTEtMSFFOlxcXFxIQnVpbGRlclguMi42LjE2LjIwMjAwNDI0XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcbG9hZGVyc1xcXFxzdHlsZVBvc3RMb2FkZXIuanMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTIhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxwb3N0Y3NzLWxvYWRlclxcXFxzcmNcXFxcaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhRTpcXFxcSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIiJdLCJzb3VyY2VSb290IjoiIn0=