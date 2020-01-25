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
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            text
            color="orange accent-2"
            @click.prevent="updateNote"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
        <span>Edit</span>
      </v-tooltip>

      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            text
            color="red accent-2"
            @click.prevent="deleteNote(id)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
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
