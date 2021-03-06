import Vue from "vue";
import Vuex from "vuex";
import note from "./note";
import auth from "./auth";
import user from "./user";
import snackbar from "./snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    note,
    auth,
    user,
    snackbar
  }
});
