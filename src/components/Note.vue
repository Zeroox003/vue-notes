<template>
  <v-hover v-slot="{ hover: cardHover }" :close-delay="hoveringCloseDelay">
    <v-card hover :color="noteModel.cardColor" @click.prevent="editNote">
      <v-dialog v-model="noteDeletionModal" persistent max-width="310">
        <template v-slot:activator="{ on: { click } }">
          <v-tooltip bottom>
            <template
              v-slot:activator="{ on: { mouseenter, mouseleave, focus, blur } }"
            >
              <v-fab-transition>
                <v-btn
                  v-show="cardHover"
                  class="btn-delete"
                  fab
                  top
                  right
                  absolute
                  x-small
                  dark
                  depressed
                  color="red accent-2"
                  @click.prevent.stop="click"
                  @mouseenter="mouseenter"
                  @mouseleave="mouseleave"
                  @focus="focus"
                  @blur="blur"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title>Confirmation modal</v-card-title>
          <v-card-text>Are you sure you want to delete the note?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click.prevent="deleteNote(noteModel.id)">
              Yes
            </v-btn>
            <v-btn
              color="red accent-2"
              text
              @click.prevent="noteDeletionModal = false"
            >
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card-title class="headline mb-3">{{ noteModel.title }}</v-card-title>
      <v-card-subtitle class="pb-2">{{
        noteModel.date | date
      }}</v-card-subtitle>

      <v-card-text>
        <div class="note-content" v-html="noteModel.body"></div>
      </v-card-text>

      <v-card-actions v-if="cardHover || colorPickerMenu.isActive">
        <v-menu
          :close-on-content-click="false"
          :open-on-hover="true"
          :open-on-click="false"
          :close-delay="hoveringCloseDelay"
          offset-x
        >
          <template #activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" icon text>
              <v-icon>mdi-format-color-fill</v-icon>
            </v-btn>
          </template>
          <v-color-picker
            @mouseenter.native="toggleColorPickerMenuState(true)"
            @mouseleave.native="toggleColorPickerMenuState(false)"
            v-model="noteModel.cardColor"
            dot-size="25"
            hide-inputs
            hide-mode-switch
            hide-sliders
            mode="hexa"
            @input="changeCardColor"
          ></v-color-picker>
        </v-menu>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "note",
  props: {
    noteModel: {
      type: Object
    }
  },
  data: () => ({
    noteDeletionModal: false,
    colorPickerMenu: {
      isActive: false,
      stateChangerDebounceId: null
    },
    changeCardColorDebounceId: null,
    hoveringCloseDelay: 200
  }),
  methods: {
    deleteNote(id) {
      try {
        this.$store.dispatch("deleteNote", id);
        this.$showMessage({
          content: "Note has been deleted.",
          color: "success"
        });
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    editNote() {
      try {
        this.$emit("editNote", this.noteModel.id);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    changeCardColor() {
      clearTimeout(this.changeCardColorDebounceId);
      this.changeCardColorDebounceId = setTimeout(async () => {
        await this.$store.dispatch("updateNote", this.noteModel);
      }, 600);
    },
    toggleColorPickerMenuState(isActive) {
      clearTimeout(this.colorPickerMenu.stateChangerDebounceId);
      if (isActive) this.colorPickerMenu.isActive = true;
      else {
        /* Made a workaround because the card actions rerender is too 
          fast and the color picker disappears */
        this.colorPickerMenu.stateChangerDebounceId = setTimeout(
          () => (this.colorPickerMenu.isActive = isActive),
          this.hoveringCloseDelay
        );
      }
    }
  }
};
</script>

<style lang="scss">
.v-card {
  .btn-delete {
    top: -7px !important;
    right: -7px !important;
  }
}

.note-content {
  white-space: pre-wrap;
  overflow: hidden;
  padding: 5px;
  margin-bottom: -10px;
  h1,
  h2,
  h3 {
    margin: 5px 0 15px !important;
  }
  p {
    margin-bottom: 10px;
  }
  blockquote {
    border-left: 0.25em solid #dfe2e5;
    color: #6b9fff;
    padding-left: 1em;
    margin: 20px 0 !important;
  }
  img {
    width: 100%;
  }
}
</style>
