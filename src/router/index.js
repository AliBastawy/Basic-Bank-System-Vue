import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/HelloWorld.vue"),
  },
  {
    path: "/customers",
    name: "customers",
    component: () => import("../views/CustomersView.vue"),
  },
  {
    path: "/customer/:id",
    name: "customer",
    component: () => import("../components/CustomerView.vue"),
  },
  {
    path: "/transactions",
    name: "transactions",
    component: () => import("../views/TransactionsView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
