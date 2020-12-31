
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/init","pages/index/index","pages/index/guide_page","pages/index/app_index","pages/user/profile","pages/user/edit_nickname","pages/index/keyword_page","pages/user/software_license","pages/user/user_agreement","pages/index/testing","pages/index/testing_result","pages/cases/index","pages/index/testing_questions","pages/mind_square/index","pages/mind_square/publish","pages/mind_square/ask-ques-list","pages/user/user_index","pages/user/one_to_one_university","pages/user/upgrade_user_vip_new","pages/user/user_asklist","pages/user/login_v2","pages/user/bind_phone_v2","pages/user/save_phone","pages/index/huashu","pages/cases/detail","pages/user/about_us","pages/user/complaint_v2","pages/index/mask","pages/user/virtual_users","pages/user/notice_list","pages/user/notice_detail","pages/user/score_list","pages/user/score_pay","pages/course/audio_detail","pages/course/article_detail","pages/course/index","pages/course/course_study_log","pages/course/video_detail","pages/user/score_log_list"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#F2F2F2","backgroundColor":"#FFFFFF","scrollIndicator":"none"},"tabBar":{"color":"#7A7E83","selectedColor":"#2985F1","borderStyle":"black","backgroundColor":"#ffffff","height":"50px","list":[{"pagePath":"pages/index/app_index","iconPath":"/static/img/tabbar/home_btn_link.png","selectedIconPath":"/static/img/tabbar/home_btn_active.png","defaultClass":"tabbar-icon-class","text":"首页"},{"pagePath":"pages/mind_square/index","iconPath":"/static/img/tabbar/brain_btn_link.png","selectedIconPath":"/static/img/tabbar/brain_btn_active.png","defaultClass":"tabbar-icon-class","text":"妙语广场"},{"pagePath":"pages/course/index","iconPath":"/static/img/tabbar/course_btn_link.png","selectedIconPath":"/static/img/tabbar/course_btn_active.png","defaultClass":"tabbar-icon-class","text":"教程"},{"pagePath":"pages/user/user_index","iconPath":"/static/img/tabbar/person_btn_link.png","selectedIconPath":"/static/img/tabbar/person_btn_active.png","defaultClass":"tabbar-icon-class","text":"个人中心"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"myapp","compilerVersion":"2.9.8","entryPagePath":"pages/index/init","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/init","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom","navigationBarBackgroundColor":"#2369E6","backgroundColor":"#FFFFFF","navigationBarTextStyle":"white"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"话术库"}},{"path":"/pages/index/guide_page","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/index/app_index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","backgroundColor":"#FFFFFF","navigationStyle":"custom","titleNView":false,"bounce":"none"}},{"path":"/pages/user/profile","meta":{},"window":{"navigationBarTitleText":"修改资料"}},{"path":"/pages/user/edit_nickname","meta":{},"window":{"navigationBarTitleText":"修改昵称","titleNView":{"buttons":[{"text":"保存","background":"#07C160","color":"black","fontSize":"16px","marginRight":"10px"}]}}},{"path":"/pages/index/keyword_page","meta":{},"window":{"navigationBarTitleText":"搜索页"}},{"path":"/pages/user/software_license","meta":{},"window":{"navigationBarTitleText":"隐私政策"}},{"path":"/pages/user/user_agreement","meta":{},"window":{"navigationBarTitleText":"用户协议"}},{"path":"/pages/index/testing","meta":{},"window":{"navigationBarTitleText":"测一测"}},{"path":"/pages/index/testing_result","meta":{},"window":{"navigationBarTitleText":"测试结果"}},{"path":"/pages/cases/index","meta":{},"window":{"navigationBarTitleText":"恋爱技巧"}},{"path":"/pages/index/testing_questions","meta":{},"window":{}},{"path":"/pages/mind_square/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/mind_square/publish","meta":{},"window":{"navigationBarTitleText":"发布"}},{"path":"/pages/mind_square/ask-ques-list","meta":{},"window":{"navigationBarTitleText":"问答详情","navigationBarBackgroundColor":"#FFFFFF","softinputMode":"adjustResize","scrollIndicator":"none","bounce":"none","titleNView":{"buttons":[{"type":"menu"}]}}},{"path":"/pages/user/user_index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#F2F2F2","navigationStyle":"custom"}},{"path":"/pages/user/one_to_one_university","meta":{},"window":{}},{"path":"/pages/user/upgrade_user_vip_new","meta":{},"window":{"navigationBarTitleText":"续费VIP"}},{"path":"/pages/user/user_asklist","meta":{},"window":{}},{"path":"/pages/user/login_v2","meta":{},"window":{"navigationBarTitleText":"登录/注册"}},{"path":"/pages/user/bind_phone_v2","meta":{},"window":{"navigationBarTitleText":"绑定新手机号"}},{"path":"/pages/user/save_phone","meta":{},"window":{"navigationBarTitleText":"完善手机号"}},{"path":"/pages/index/huashu","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black","enablePullDownRefresh":true,"onReachBottomDistance":40,"backgroundColor":"#FFFFFF"}},{"path":"/pages/cases/detail","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/about_us","meta":{},"window":{"navigationBarTitleText":"关于我们","navigationBarBackgroundColor":"#2369E6","backgroundColor":"#FFFFFF","navigationBarTextStyle":"white"}},{"path":"/pages/user/complaint_v2","meta":{},"window":{"navigationBarTitleText":"投诉建议"}},{"path":"/pages/index/mask","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/user/virtual_users","meta":{},"window":{"navigationBarTitleText":"切换用户"}},{"path":"/pages/user/notice_list","meta":{},"window":{"navigationBarTitleText":"通知"}},{"path":"/pages/user/notice_detail","meta":{},"window":{}},{"path":"/pages/user/score_list","meta":{},"window":{"navigationBarTitleText":"积分"}},{"path":"/pages/user/score_pay","meta":{},"window":{"navigationBarTitleText":"积分充值"}},{"path":"/pages/course/audio_detail","meta":{},"window":{"navigationStyle":"custom","bounce":"none"}},{"path":"/pages/course/article_detail","meta":{},"window":{}},{"path":"/pages/course/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/course/course_study_log","meta":{},"window":{"navigationBarTitleText":"课程记录","navigationStyle":"custom"}},{"path":"/pages/course/video_detail","meta":{},"window":{"enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/user/score_log_list","meta":{},"window":{"navigationBarTitleText":"积分明细"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
