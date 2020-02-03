<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <Snackbar></Snackbar>

    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import Snackbar from "./components/Snackbar";

export default {
  name: "App",
  components: {
    DefaultLayout,
    EmptyLayout,
    Snackbar
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  created() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
