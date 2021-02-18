<template>
  <v-dialog
    class="dialog-fullsreen"
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="scale-transition"
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
      <v-toolbar color="primary" dark>
        <v-btn icon @click="resetForm">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title :class="toolbarTitleClass">
          {{ noteForEdit ? "Edit" : "Create new" }} note
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text :loading="saveLoading" @click="save">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="pt-6">
        <v-form @submit.prevent="save" ref="form" lazy-validation>
          <v-text-field
            class="mb-4"
            v-model="localTitle"
            :rules="[v => !!v.trim() || 'Title is required']"
            label="Title"
            required
          ></v-text-field>
          <tiptap-vuetify
            :toolbar-attributes="tiptapAttrs"
            v-model="localBody"
            placeholder="Write something..."
            :extensions="extensions"
            @keydown="bodyInputIsDirty = true"
          >
            <div
              v-if="checkShowBodyRequired"
              slot="footer"
              style="color: #ff5252; padding: 5px; text-align: center;"
            >
              <strong>Body of note is required</strong>
            </div>
          </tiptap-vuetify>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  CodeBlock,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image
} from "tiptap-vuetify";

export default {
  name: "NoteModal",
  components: {
    TiptapVuetify
  },
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
      localBody: "",
      bodyInputIsDirty: false,
      saveLoading: false,
      extensions: [
        Code,
        CodeBlock,
        HorizontalRule,
        Paragraph,
        History,
        HardBreak, // позволяет переносить через Shift + Ctrl + Enter
        Underline,
        Strike,
        Italic,
        ListItem, // если нужно использовать список (BulletList, OrderedList)
        BulletList,
        OrderedList,
        Link,
        Blockquote,
        Image,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold
      ]
    };
  },
  methods: {
    resetForm() {
      this.localTitle = this.localBody = "";
      this.$refs.form.resetValidation();
      this.$emit("cancel-update");
      this.dialog = false;
      this.bodyInputIsDirty = false;
    },
    async save() {
      if (this.$refs.form.validate()) {
        if (this.noteForEdit) {
          await this.update();
        } else {
          await this.create();
        }
        this.resetForm();
      } else if (this.checkHTMLStringIsEmty(this.localBody)) {
        this.bodyInputIsDirty = true;
      }
    },
    async create() {
      try {
        this.saveLoading = true;
        await this.$store.dispatch("createNote", {
          title: this.localTitle.trim(),
          body: this.localBody.trim(),
          cardColor: "#ffffff",
          date: new Date().toJSON()
        });
        this.resetForm();
        this.$showMessage({
          content: "Note has been created.",
          color: "success"
        });
        // eslint-disable-next-line no-empty
      } catch (e) {}

      this.saveLoading = false;
    },
    async update() {
      try {
        const updatedNote = {
          id: this.noteForEdit.id,
          title: this.localTitle.trim(),
          body: this.localBody.trim(),
          date: this.noteForEdit.date
        };
        this.saveLoading = true;
        await this.$store.dispatch("updateNote", updatedNote);
        this.resetForm();
        this.$showMessage({
          content: "Note has been updated.",
          color: "success"
        });
        // eslint-disable-next-line no-empty
      } catch (e) {}

      this.saveLoading = false;
    },
    checkHTMLStringIsEmty(html) {
      const div = document.createElement("div");
      div.innerHTML = html;
      if (!div.firstElementChild) return true;
      return !div.firstElementChild.textContent;
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
    },
    tiptapAttrs() {
      if (!this.$vuetify.theme.dark) {
        return { color: this.$vuetify.theme.themes["light"].background };
      }

      return { color: "#303030" };
    },
    checkShowBodyRequired() {
      return (
        this.bodyInputIsDirty && this.checkHTMLStringIsEmty(this.localBody)
      );
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

.ProseMirror {
  min-height: 200px;
}
</style>
