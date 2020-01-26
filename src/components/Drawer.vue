<template>
  <v-navigation-drawer v-model="localDrawer" app>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-icon>person</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.email }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list dense>
      <v-list-item link @click.prevent="$store.dispatch('logout')">
        <v-list-item-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Drawer",
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localDrawer: this.drawer
    };
  },
  watch: {
    drawer() {
      this.localDrawer = this.drawer;
    },
    localDrawer() {
      this.$emit("update:drawer", this.localDrawer);
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    if (!this.user) {
      try {
        this.$store.dispatch("setUser");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  }
};
</script>
