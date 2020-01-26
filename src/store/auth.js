import firebase from "firebase/app";
import router from "../router/index";

export default {
  actions: {
    async login(_, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        router.push("/");
      } catch (e) {
        throw e;
      }
    },
    async register(_, { email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        router.push("/");
      } catch (e) {
        throw e;
      }
    },
    async logout() {
      await firebase.auth().signOut();
      router.push("/login");
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  }
};
