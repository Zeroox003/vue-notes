<template>
  <v-card>
    <v-card-title class="headline">{{ title }}</v-card-title>
    <v-card-subtitle>
      <strong>Created date:</strong> {{ date | date }}
    </v-card-subtitle>

    <v-card-text>
      <div class="note-content" v-html="body"></div>
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
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            text
            class="ml-3"
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

<style lang="scss">
.v-card hr {
  border: 0.5px solid #ddd;
}

.note-content {
  white-space: pre-wrap;
  overflow: hidden;
  padding: 5px;
  h1 {
    margin: 10px 0 20px !important;
  }
  blockquote {
    border-left: 0.25em solid #dfe2e5;
    color: #6b9fff;
    padding-left: 1em;
    margin: 20px 0 !important;
  }
}
</style>
