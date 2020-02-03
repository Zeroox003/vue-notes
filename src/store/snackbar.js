export default {
  state: {
    content: "",
    color: ""
  },
  mutations: {
    showMessage(state, { content, color = "error" }) {
      state.content = content;
      state.color = color;
    }
  }
};
