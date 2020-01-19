<template>
  <v-card color="grey darken-2">
    <v-card-title class="headline">{{ title }}</v-card-title>
    <v-card-subtitle>
      <strong>Created date:</strong> {{ date | date }}
    </v-card-subtitle>

    <v-card-text>
      <pre class="text-body">{{ body }}</pre>
    </v-card-text>

    <v-card-actions>
      <v-btn class="mx-2" text @click.prevent="updateNote">
        Edit
      </v-btn>
      <v-btn class="mx-2" text color="red" @click.prevent="deleteNote(id)">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "note",
  props: {
    id: String,
    title: String,
    body: String,
    date: String
  },
  methods: {
    deleteNote(id) {
      this.$store.dispatch("deleteNote", id);
    },
    updateNote() {
      this.$emit("updateNote", this.id);
    }
  }
};
</script>

<style>
.text-body {
  white-space: pre-wrap;
}
</style>
