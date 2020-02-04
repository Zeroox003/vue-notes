<template>
  <v-card hover @mouseenter="cardHover = true" @mouseleave="cardHover = false">
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
          <v-btn
            color="red accent-2"
            text
            @click.prevent="noteDeletionModal = false"
          >
            No
          </v-btn>
          <v-btn color="green" text @click.prevent="deleteNote(id)">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-title class="headline mb-3">{{ title }}</v-card-title>
    <v-card-subtitle class="pb-2">{{ date | date }}</v-card-subtitle>
    <hr :style="hrStyle" />

    <v-card-text>
      <div class="note-content" v-html="body"></div>
    </v-card-text>

    <hr :style="hrStyle" />
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
  data: () => ({
    noteDeletionModal: false,
    cardHover: false
  }),
  methods: {
    fS(val) {
      // eslint-disable-next-line no-console
      console.log(val);
    },
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
    updateNote() {
      try {
        this.$emit("updateNote", this.id);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  },
  computed: {
    hrStyle: s =>
      s.$vuetify.theme.dark ? { borderColor: "#222" } : { borderColor: "#ddd" }
  }
};
</script>

<style lang="scss">
.v-card {
  .btn-delete {
    top: -7px !important;
    right: -7px !important;
  }
  & hr {
    border-width: 0.5px;
    border-style: solid;
  }
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
