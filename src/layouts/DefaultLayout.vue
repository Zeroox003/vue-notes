<template>
  <v-content>
    <Drawer :drawer.sync="drawer" />

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Notes</v-toolbar-title>
    </v-app-bar>

    <v-container>
      <router-view />
    </v-container>
  </v-content>
</template>

<script>
import Drawer from "../components/Drawer";

export default {
  components: {
    Drawer
  },
  data: () => ({ drawer: false })
};
</script>
