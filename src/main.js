import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import notifier from "./plugins/notifier";
import dateFilter from "@/filters/date.filter";
import VueMasonry from "vue-masonry-css";

import firebase from "firebase/app";
import firebaseSettings from "./firebaseSettings";
import "firebase/auth";
import "firebase/database";

Vue.filter("date", dateFilter);
Vue.use(VueMasonry);
Vue.use(notifier);

firebase.initializeApp(firebaseSettings);

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
