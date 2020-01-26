import firebase from "firebase/app";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      // can get more data
      const { email } = { ...user };
      state.user = { email };
    },
    clearUser(state) {
      state.user = null;
    }
  },
  actions: {
    setUser({ commit }) {
      const user = firebase.auth().currentUser;
      commit("setUser", user);
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  },
  getters: {
    user: s => s.user
  }
};
