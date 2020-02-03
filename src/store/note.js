import Vue from "vue";
import firebase from "firebase/app";

export default {
  state: {
    notes: []
  },
  getters: {
    getAllNotes(state) {
      return state.notes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  actions: {
    async createNote({ dispatch, commit }, note) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/notes`)
          .push(note);
        commit("addNote", note);
      } catch (e) {
        commit("showMessage", { content: e });
        throw e;
      }
    },
    async updateNote({ dispatch, commit }, note) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/notes`)
          .child(note.id)
          .update(note);
        commit("updateNote", note);
      } catch (e) {
        commit("showMessage", { content: e });
        throw e;
      }
    },
    async deleteNote({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/notes`)
          .child(id)
          .remove();
        commit("deleteNote", id);
      } catch (e) {
        commit("showMessage", { content: e });
        throw e;
      }
    },
    async fetchNotes({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const notes =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/notes`)
              .once("value")
          ).val() || {};
        commit(
          "setNotes",
          Object.keys(notes).map(key => ({ ...notes[key], id: key }))
        );
      } catch (e) {
        commit("showMessage", { content: e });
        throw e;
      }
    },
    async fetchNoteById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid");
        const note =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/notes`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...note, id };
      } catch (e) {
        commit("showMessage", { content: e });
        throw e;
      }
    }
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    addNote(state, note) {
      state.notes.unshift(note);
    },
    updateNote(state, note) {
      const id = state.notes.findIndex(n => n.id === note.id);
      Vue.set(state.notes, id, { ...state.notes[id], ...note });
    },
    deleteNote(state, id) {
      state.notes = state.notes.filter(n => n.id !== id);
    }
  }
};
