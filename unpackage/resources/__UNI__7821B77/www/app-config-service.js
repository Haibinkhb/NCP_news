
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/map/map","pages/news/news"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"NCP_news","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"list":[{"pagePath":"pages/index/index","text":"首页"},{"pagePath":"pages/map/map","text":"地图"},{"pagePath":"pages/news/news","text":"新闻"}]},"networkTimeout":{"request":1000000,"connectSocket":6000,"uploadFile":6000,"downloadFile":6000},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"NCP_news","compilerVersion":"2.5.1","entryPagePath":"pages/index/index"};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"疫情实时动态"}},{"path":"/pages/map/map","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"疫情地图"}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"疫情新闻"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});
