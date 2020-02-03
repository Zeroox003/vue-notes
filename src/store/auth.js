import firebase from "firebase/app";
import router from "../router/index";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        dispatch("setUser");
        router.push("/");
      } catch (e) {
        commit("showMessage", { content: e });
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        dispatch("setUser");
        router.push("/");
      } catch (e) {
        commit("showMessage", { content: e });
        throw e;
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut();

      commit("clearUser");
      commit("showMessage", {
        content: "You are logged out.",
        color: "success"
      });
      router.push("/login");
    }
  }
};
