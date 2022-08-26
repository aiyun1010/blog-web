// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./app";
import router from "./router";
import ElementUI from "element-ui";
import store from "./store/index";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/icon/iconfont.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.config.productionTip = false;
Vue.use(mavonEditor); //编辑器
Vue.use(ElementUI);

Vue.prototype.getLocalStorage = function(key) {
  try {
    // console.log(JSON.parse(localStorage.getItem("aiyunBlogUserInfo"))[key]);
    return localStorage.getItem("aiyunBlogUserInfo")
      ? JSON.parse(localStorage.getItem("aiyunBlogUserInfo"))[key]
      : null;
  } catch (err) {
    return null;
  }
};
Vue.prototype.setLocalStorage = function(key, value) {
  try {
    let _localStorage = localStorage.getItem("aiyunBlogUserInfo");
    _localStorage = _localStorage ? JSON.parse(_localStorage) : {};
    _localStorage[key] = value;
    localStorage.setItem("aiyunBlogUserInfo", JSON.stringify(_localStorage));
  } catch (err) {
    localStorage.setItem("aiyunBlogUserInfo", JSON.stringify({ [key]: value }));
  }
};
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
