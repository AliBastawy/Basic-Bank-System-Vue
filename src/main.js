import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVueIcons);
Vue.use(BootstrapVue);

import vSelect from "vue-select";

Vue.component("v-select", vSelect);

import Ripple from "vue-ripple-directive";
Ripple.color = "rgba(255, 255, 255, 0.35)";
Ripple.zIndex = 55;
Vue.directive("ripple", Ripple);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
