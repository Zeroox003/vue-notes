<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout";
import EmptyLayout from "./layouts/EmptyLayout";

export default {
  name: "App",
  components: {
    DefaultLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    }
  },
  created() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
