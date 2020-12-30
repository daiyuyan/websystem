import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

// 引入echarts
import axios from 'axios'
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
//axios.defaults.baseURL = '/api'
new Vue({
  router,
  store,
  axios,
  data: function(){
    return {
      doctorid: '',
    }
},
  render: h => h(App)
}).$mount("#app");
