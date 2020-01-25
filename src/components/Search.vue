<template>
  <v-text-field label="Search" @input="onInput"></v-text-field>
</template>

<script>
export default {
  name: "Search",
  methods: {
    onInput(searchTerm) {
      this.$emit("onSearchInput", searchTerm);
    }
  }
};
</script>
