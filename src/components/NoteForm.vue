<template>
  <v-card class="elevation-12 mb-8">
    <v-toolbar flat>
      <v-toolbar-title>
        {{ noteForEdit ? "Edit" : "Create new" }} note
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          class="mb-4"
          ref="titleInput"
          v-model="localTitle"
          :rules="[v => !!v.trim() || 'Title is required']"
          label="Title"
          required
        ></v-text-field>
        <v-textarea
          class="body-input"
          v-model="localBody"
          outlined
          label="Body"
          auto-grow
          rows="1"
          row-height="15"
          required
          :rules="[v => !!v.trim() || 'Body is required']"
          no-resize
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <template v-if="noteForEdit">
        <v-btn @click.prevent="resetForm">
          Cancel update
        </v-btn>
        <v-btn @click.prevent="update">
          Apply changes
        </v-btn>
      </template>
      <v-btn v-else @click.prevent="create">
        Create
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NoteForm",
  props: {
    noteForEdit: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      localTitle: "",
      localBody: ""
    };
  },
  methods: {
    resetForm() {
      this.localTitle = this.localBody = "";
      this.$refs.form.resetValidation();
      this.$emit("cancel-update");
    },
    async create() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch("createNote", {
            title: this.localTitle.trim(),
            body: this.localBody.trim(),
            date: new Date().toJSON()
          });
          this.resetForm();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    },
    async update() {
      if (this.$refs.form.validate() && this.noteForEdit) {
        try {
          const updatedNote = {
            id: this.noteForEdit.id,
            title: this.localTitle.trim(),
            body: this.localBody.trim(),
            date: this.noteForEdit.date
          };
          await this.$store.dispatch("updateNote", updatedNote);
          this.resetForm();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    }
  },
  watch: {
    noteForEdit() {
      if (this.noteForEdit) {
        this.$refs.titleInput.focus();
        this.localTitle = this.noteForEdit.title;
        this.localBody = this.noteForEdit.body;
        this.localDate = this.noteForEdit.date;
      } else {
        this.resetForm();
      }
    }
  }
};
</script>

<style>
.body-input textarea::-webkit-scrollbar {
  width: 0.4em;
}

.body-input textarea::-webkit-scrollbar-track {
  background: rgb(135, 112, 138);
}

.body-input textarea::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
