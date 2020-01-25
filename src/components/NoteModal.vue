<template>
  <v-dialog
    class="dialog-fullsreen"
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on: { click } }">
      <v-tooltip top>
        <template
          v-slot:activator="{ on: { mouseenter, mouseleave, focus, blur } }"
        >
          <v-btn
            fab
            bottom
            right
            fixed
            color="primary"
            @click="click"
            @mouseenter="mouseenter"
            @mouseleave="mouseleave"
            @focus="focus"
            @blur="blur"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <span>Create new note</span>
      </v-tooltip>
    </template>
    <v-card tile>
      <v-toolbar color="primary">
        <v-btn icon color="white" @click="resetForm">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text" :class="toolbarTitleClass">
          {{ noteForEdit ? "Edit" : "Create new" }} note
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text color="white" @click="save">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="pt-6 px-6 pb-0">
        <v-form ref="form" lazy-validation>
          <v-text-field
            class="mb-4"
            v-model="localTitle"
            :rules="[v => !!v.trim() || 'Title is required']"
            label="Title"
            required
          ></v-text-field>
          <v-textarea
            v-model="localBody"
            outlined
            label="Body"
            auto-grow
            row-height="25"
            required
            :rules="[v => !!v.trim() || 'Body is required']"
            no-resize
          ></v-textarea>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NoteModal",
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    noteForEdit: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      dialog: this.showModal,
      localTitle: "",
      localBody: ""
    };
  },
  methods: {
    resetForm() {
      this.localTitle = this.localBody = "";
      this.$refs.form.resetValidation();
      this.$emit("cancel-update");
      this.dialog = false;
    },
    async save() {
      if (this.$refs.form.validate()) {
        if (this.noteForEdit) {
          await this.update();
        } else {
          await this.create();
        }
        this.resetForm();
      }
    },
    async create() {
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
    },
    async update() {
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
  },
  watch: {
    noteForEdit() {
      if (this.noteForEdit) {
        this.localTitle = this.noteForEdit.title;
        this.localBody = this.noteForEdit.body;
        this.localDate = this.noteForEdit.date;
      } else {
        this.resetForm();
      }
    },
    showModal() {
      this.dialog = this.showModal;
    }
  },
  computed: {
    toolbarTitleClass() {
      return {
        "small-font-size": this.$vuetify.breakpoint.xs
      };
    }
  }
};
</script>

<style>
.dialog-fullscreen {
  border-radius: 0;
}

.small-font-size {
  font-size: 1rem;
}
</style>
