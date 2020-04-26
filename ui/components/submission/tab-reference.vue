<template>
  <v-container>
    <template>
      <v-card-title class="headline">Sequence Authors</v-card-title>
      <ItemAuthor
        v-for="(author, i) in value.authors"
        :key="`aut-${i}`"
        :value="author"
        @input="editAuthor(i, $event)"
      />
      <v-btn class="mx-2" fab dark color="indigo" @click="addAuthor">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template>
      <v-card-title class="headline">Publication Status</v-card-title>
      <ItemReference
        v-for="(reference, i) in value.references"
        :key="`ref-${i}`"
        :value="reference"
        @input="editReference(i, $event)"
      />
      <v-btn class="mx-2" fab dark color="indigo" @click="addReference">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-container>
</template>

<script>
import Vue from 'vue'
import ItemAuthor from './item-author'
import ItemReference from './item-reference'

export default Vue.extend({
  components: {
    ItemAuthor,
    ItemReference
  },
  props: ['value'],
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
    addReference() {
      const references = [...this.value.references]
      references.push({ title: '', status: null })
      this.update('references', references)
    },
    editReference(i, reference) {
      const references = [...this.value.references]
      references[i] = reference
      this.update('references', references)
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

<style lang="stylus" scoped></style>