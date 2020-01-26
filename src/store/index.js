import Vue from "vue";
import Vuex from "vuex";
import note from "./note";
import auth from "./auth";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    note,
    auth,
    user
  }
});
