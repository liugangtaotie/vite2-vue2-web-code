import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import SvgIcon from 'vue-svgicon'
import ElementUI from "element-ui";
import NProgress from "nprogress";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import "nprogress/nprogress.css";
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/flex.css";
import "./assets/css/reset.css";
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
import "vue-photo-preview/dist/vue-photo-preview";
import * as filters from "./assets/js/filters";

import cfg from "./api/appConfig";

import Moment from 'moment';

const options = {
  fullscreenEl: false,
};
Vue.use(ElementUI);
Vue.use(preview, options);
Vue.config.productionTip = false;
Vue.component("treeSelect", TreeSelect);
Vue.prototype.$cfg = cfg;
Vue.prototype.$moment = Moment;

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// Navigator Check
router.beforeEach((to, from, next) => {
  NProgress.start();
  Object.keys(filters).forEach((v) => Vue.filter(v, filters[v]));

  return next();

});

router.afterEach(() => {
  NProgress.done();
});

// 全局方法 this. 的调用方式
declare module 'vue/types/vue' {
  // eslint-disable-next-line prettier/prettier
  interface Vue {
    $cfg: any
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
