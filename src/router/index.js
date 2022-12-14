import Vue from "vue";
import Router from "vue-router";
import routes from "./config";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: Object.values(routes)
});
