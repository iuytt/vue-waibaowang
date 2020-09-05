// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Bus from './util/Bus'
// import 'jquery'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

Vue.prototype.$bus = Bus; // 挂载 Bus

axios.defaults.baseURL = '/api';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some (m => m.meta.checkLogin)){  // 判断该路由是否需要登录权限

    if (sessionStorage.getItem('loginInfo') != null) {  // 判断当前用户的登录信息 loginInfo 是否存在
      next();
    } else {
      next({
        path: '/login',
        // query: {redirect: to.fullPath}
      })
    }
  }else {
    next();
  }

});
