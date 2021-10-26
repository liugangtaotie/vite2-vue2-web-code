import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/**
 * 拆分路由，分模块管理
 */
import _homeRouter from "./_homeRouter"; // 路由导航
export default new Router({
  // mode: 'history',
  routes: [
    ..._homeRouter,
    // 404 page
    {
      path: "*",
      name: "notFind",
      meta: {
        title: "404错误",
        isChecking: true,
      },
      component: () => import("@COM/404.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(savedPosition.x, savedPosition.y);
      }, 200);
    } else {
      window.scrollTo(0, 0);
    }
  },
});
