<template>
  <v-container>
    <template>
      <v-card-title class="headline">
        Sequence Authors
      </v-card-title>
      <ItemAuthor
        v-for="(author, i) in value.authors"
        :key="i"
        :value="author"
        @input="editAuthor(i, $event)"
        @addMore="addAuthor" />
      <v-btn class="mx-2" fab dark color="indigo" @click="addAuthor">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ItemAuthor from './item-author'

export default Vue.extend({
  components: {
    ItemAuthor
  },
  props: [
    'value'
  ],
  data() {
    return {
      valid: false
    }
  },
  methods: {
    addAuthor() {
      const authors = [...this.value.authors]
      authors.push({ firstName: '', lastName: '' })
      this.update('authors', authors)
    },
    editAuthor(i, author) {
      const authors = [...this.value.authors]
      authors[i] = author
      this.update('authors', authors)
    },
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    }
  }
})
</script>

<style lang="stylus" scoped>

</style>