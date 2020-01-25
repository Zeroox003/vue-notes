<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-btn @click.prevent="logout">
          Logout
        </v-btn>

        <NoteForm :note-for-edit="noteForEdit" @cancel-update="cancelUpdate" />

        <Search @onSearchInput="onSearchInput" />

        <masonry :cols="{ default: 3, 800: 2, 500: 1 }" :gutter="20">
          <Note
            class="mb-5"
            v-for="note in getAllNotes"
            :key="note.id"
            :id="note.id"
            :title="note.title"
            :body="note.body"
            :date="note.date"
            @updateNote="updateNote"
          />
        </masonry>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Note from "../components/Note";
import NoteForm from "../components/NoteForm";
import Search from "../components/Search";

export default {
  name: "notes",
  components: {
    Note,
    NoteForm,
    Search
  },
  data: () => ({
    noteForEdit: null,
    searchTerm: "",
    notes: []
  }),
  computed: {
    getAllNotes() {
      const toLower = value => value.toLocaleLowerCase();
      const searchTerm = toLower(this.searchTerm);
      return this.$store.getters.getAllNotes.filter(
        n =>
          (n.body && toLower(n.body).includes(searchTerm)) ||
          (n.tody && toLower(n.title).includes(searchTerm))
      );
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchNotes");
  },
  methods: {
    updateNote(id) {
      this.noteForEdit = this.getAllNotes.find(n => n.id === id);
    },
    cancelUpdate() {
      this.noteForEdit = null;
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    onSearchInput(searchTerm) {
      this.searchTerm = searchTerm;
    }
  }
};
</script>
