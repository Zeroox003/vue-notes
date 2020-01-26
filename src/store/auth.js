import firebase from "firebase/app";
import router from "../router/index";

export default {
  actions: {
    async login({ dispatch }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        dispatch("setUser");
        router.push("/");
      } catch (e) {
        throw e;
      }
    },
    async register({ dispatch }, { email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        dispatch("setUser");
        router.push("/");
      } catch (e) {
        throw e;
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut();

      commit("clearUser");
      router.push("/login");
    }
  }
};
