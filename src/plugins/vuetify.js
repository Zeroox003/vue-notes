import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import "vuetify/dist/vuetify.min.css";

import "material-design-icons-iconfont/dist/material-design-icons.css";

const vuetify = new Vuetify();
Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi"
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        background: colors.blueGrey.lighten5
      }
    }
  },
  icons: {
    iconfont: "md"
  }
});
