import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import voicedata from "./views/voicedata.vue";
import Login from "./views/Login.vue";
import HomePage from "./components/HomePage.vue";
import detail from "./views/detail.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home,
      children: [
        {
          path: "HomePage",
          name: "HomePage",
          component: HomePage
        },
      ]
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/detail",
      name: "detail",
      component: detail
    },
    {
      path: "/voicedata",
      name: "voicedata",
      component: voicedata
    }
  ]
});
