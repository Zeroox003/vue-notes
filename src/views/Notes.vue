<template>
  <div>
    <Search @onSearchInput="onSearchInput" />

    <masonry
      v-if="getAllNotes.length"
      :cols="{ default: 3, 800: 2, 500: 1 }"
      :gutter="20"
    >
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
    <div v-else class="text-center mt-12">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

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
      await this.$store.dispatch("fetchNotes");
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  methods: {
    updateNote(id) {
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
