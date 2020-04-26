<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :value="value.title"
            :counter="64"
            label="Reference Title"
            @input="update('title', $event)"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            :value="value.status"
            :items="choiceStatus"
            label="Publication Status"
            @change="update('status', $event)"
            type="outline"
            required
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['value'],
  data() {
    return {
      valid: false,
      choiceStatus: ['unpublished', 'in-press', 'published']
    }
  },
  methods: {
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    }
  }
})
</script>

<style lang="stylus" scoped></style>