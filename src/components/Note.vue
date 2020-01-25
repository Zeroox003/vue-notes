<template>
  <v-card>
    <v-card-title class="headline">{{ title }}</v-card-title>
    <v-card-subtitle>
      <strong>Created date:</strong> {{ date | date }}
    </v-card-subtitle>

    <v-card-text>
      <pre class="text-body">{{ body }}</pre>
    </v-card-text>

    <hr />
    <v-card-actions>
      <v-btn
        icon
        text
        class="mx-2"
        color="orange accent-2"
        @click.prevent="updateNote"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        text
        class="mx-2"
        color="red accent-2"
        @click.prevent="deleteNote(id)"
      >
        <v-icon>delete</v-icon>
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
.v-card hr {
  border: 0.5px solid #ddd;
}

.text-body {
  white-space: pre-wrap;
}
</style>
