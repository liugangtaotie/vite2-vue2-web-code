export default [
  {
    path: "/",
    name: "home",
    meta: {
      title: "路由导航",
    },
    component: () => import("@VIE/home/home.vue"),
  },
  
];
