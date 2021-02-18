<template>
  <div>
    <Search @onSearchInput="onSearchInput" />

    <div v-if="notesLoading || !getAllNotes.length" class="text-center mt-12">
      <v-progress-circular
        v-if="notesLoading"
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <h2 v-else>Not found</h2>
    </div>

    <masonry v-else :cols="{ default: 3, 800: 2, 500: 1 }" :gutter="20">
      <Note
        v-for="note in getAllNotes"
        class="mb-5"
        :key="note.id"
        :noteModel="note"
        @editNote="openEditNoteModal"
      />
    </masonry>

    <NoteModal
      :show-modal="showModal"
      :note-for-edit="noteForEdit"
      @cancel-update="cancelUpdate"
    />
  </div>
</template>

<script>
import Note from "../components/Note";
import Search from "../components/Search";
import NoteModal from "../components/NoteModal";

export default {
  name: "notes",
  components: {
    Note,
    Search,
    NoteModal
  },
  data: () => ({
    noteForEdit: null,
    showModal: false,

    searchTerm: "",
    notesLoading: false,

    notes: []
  }),
  computed: {
    getAllNotes() {
      const toLower = value => value.toLocaleLowerCase();
      const searchTerm = toLower(this.searchTerm);
      return this.$store.getters.getAllNotes.filter(
        n =>
          (n.body && toLower(n.body).includes(searchTerm)) ||
          (n.title && toLower(n.title).includes(searchTerm))
      );
    }
  },
  async mounted() {
    try {
      this.notesLoading = true;
      await this.$store.dispatch("fetchNotes");
      // eslint-disable-next-line no-empty
    } catch (e) {}

    this.notesLoading = false;
  },
  methods: {
    openEditNoteModal(id) {
      this.noteForEdit = this.getAllNotes.find(n => n.id === id);
      this.showModal = true;
    },
    cancelUpdate() {
      this.noteForEdit = null;
      this.showModal = false;
    },
    onSearchInput(searchTerm) {
      this.searchTerm = searchTerm;
    }
  }
};
</script>
