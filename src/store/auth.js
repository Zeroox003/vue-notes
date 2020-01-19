import firebase from "firebase/app";

export default {
  actions: {
    async login(_, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },
    async register(_, { email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },
    async logout() {
      await firebase.auth().signOut();
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  }
};
