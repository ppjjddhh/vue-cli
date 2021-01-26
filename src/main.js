import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    primordialFun
} from 'base'
import App from './App'
//require('./lib/mainFun.js');
import router from './routes/'
import store from './store/'
import components from './components/' //加载公共组件
import filter from './filter/'
import axios from 'axios';
const config = require('../config/');
import {
    Loadmore,
    InfiniteScroll,
    Popup,
    Picker,
} from 'mint-ui';
//import 'swiper/dist/css/swiper.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'mint-ui/lib/style.css';
import fastClick from 'fastclick'
import directives from './directives/index.js'
// import vueTap from 'v-tap' // 引入插件
// Vue.use(vueTap) // 全局注册
// Vue.por
// let ver = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
import 'url-search-params-polyfill';
// ios click时间延迟过大
(function() {
    let str = navigator.userAgent.toLowerCase();
    let ver = str.match(/cpu iphone os (.*?) like mac os/);
    fastClick.prototype.focus = function(targetElement) {
        targetElement.focus();
    };
    if (ver && parseInt(ver[1]) >= 11) {
        return //不必引入fastclick文件
    }
    fastClick.attach(document.body);
})()

require('./assets/css/base.css');
import VueLazyload from 'vue-lazyload';
import 'ltivew/src/styles/index.scss'
import ltivew from 'ltivew'
Vue.use(ltivew);
Vue.use(VueLazyload);
Vue.use(VueRouter);
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.use(Vant);
Object.keys(directives).forEach((key) => { //绑定自定义指令
    // var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.directive(`${key}`, directives[key])
})
Object.keys(components).forEach((key) => { //绑定组件
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})
Object.keys(filter).forEach((key) => { //绑定过滤器
    Vue.filter(key, filter[key]);
});


window.reloadview = function() { //刷新当前页面
    store.commit("setLoaderIf", true);
    sessionStorage.setItem('reloadview', '1');
    location.reload(true);

};
router.pushs = router.push;
router.push = function(location, onComplete, onAbort) { //重新定义router.push方法
    store.commit('setPushIf', true) //判断是否调用push方法
    //store.state.push = true;
    router.pushs(location, onComplete, onAbort);

};

router.replaces = router.replace;
router.replace = function(location, onComplete, onAbort) { //重新定义router.replace方法
    store.commit('setReplaceIf', true) //判断是否调用replace方法
    router.replaces(location, onComplete, onAbort);
};
store.dispatch('setSetting');
store.dispatch('setUser');
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function(el) {
        // 聚焦
        el.focus();
        setTimeout(function() {
            document.body.scrollTop = 0;
        }, 0);
    }
});

/**
 * 路由拦截器 可对路由动作进行自定义操作
 *
 **/

router.beforeEach((to, from, next) => {

    if(to.query && to.query.user){
      let user={}
      user=JSON.parse(to.query.user)
      store.dispatch('setUser', user, {
        root: true
      });
    }

    next();
})
Vue.config.ignoredElements = [
  'wx-open-launch-weapp',
];

new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
