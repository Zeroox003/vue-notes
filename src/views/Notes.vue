<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-btn @click.prevent="logout">
          Logout
        </v-btn>

        <NoteForm :note-for-edit="noteForEdit" @cancel-update="cancelUpdate" />

        ПОИСК
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
import { mapGetters } from "vuex";
import Note from "../components/Note";
import NoteForm from "../components/NoteForm";

export default {
  name: "notes",
  components: {
    Note,
    NoteForm
  },
  data: () => ({
    noteForEdit: null,
    notes: []
  }),
  computed: {
    ...mapGetters(["getAllNotes"])
  },
  async mounted() {
    await this.$store.dispatch("fetchNotes");
  },
  methods: {
    async updateNote(id) {
      this.noteForEdit = await this.$store.dispatch("fetchNoteById", id);
    },
    cancelUpdate() {
      this.noteForEdit = null;
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>
