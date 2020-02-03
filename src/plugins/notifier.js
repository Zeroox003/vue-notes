/* eslint-disable prettier/prettier */
export default {
  install(Vue) {
    Vue.prototype.$showMessage = function ({ content = "", color = "" }) {
      this.$store.commit("showMessage", { content, color });
    };
  }
};
