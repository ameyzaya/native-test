import Vue from "vue";
import App from "./App";
import router from "@/router";
import "ant-design-vue/dist/antd.css";
import "@/utils/antd_components";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
