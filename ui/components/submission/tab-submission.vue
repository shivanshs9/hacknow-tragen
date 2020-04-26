<template>
  <v-container>
    <v-card-title class="headline">
      Submission Category
    </v-card-title>
    <v-row>
      <v-col cols="12" md="6">
        <v-radio-group
          row
          :value="value.category"
          @change="update('category', $event)"
          required
        >
          <v-radio value="original" label="Directly sequenced by submitter."></v-radio>
          <v-radio value="third" label="Derived from other primary sequence data."></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-card-title class="headline">
      Source Modifiers
    </v-card-title>
    <v-alert
        border="top"
        colored-border
        type="info"
        elevation="2"
      >
      <ul>
        <li>For multiple sequences: use only a table file that contains all the source modifiers you want to add.</li>
        <li>Do not add source modifiers using both a table file and the source modifier menus below.</li>
        <li>A reloaded source modifier table file will overwrite a previously loaded table file.</li>
        <li>How do I create a <a href="https://www.ncbi.nlm.nih.gov/WebSub/html/help/genbank-source-table.html">source modifiers table</a> file?</li>
      </ul>
    </v-alert>
    <v-row>
      <v-col cols="12" md="6">
        <v-file-input 
          accept="text/*" 
          label="Upload Source Modifiers Table file"
          @change="update('modifierTableFile', $event)"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-card-title class="headline">
      Visibility
    </v-card-title>
    <v-alert
        border="top"
        colored-border
        type="info"
        elevation="2"
      >
      <ul>
        <li>Public means both research metadata and data is freely available to further use on the platform.</li>
        <li>Private means that the research metadata can be discovered by searching, however the sequence data will be encrypted to prevent use of the research without direct consent of the publisher.</li>
      </ul>
    </v-alert>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          :value="value.visibility"
          :items="['Public', 'Private']"
          label="Visibility of Submission"
          @change="update('visibility', $event)"
          type="outline"
          required
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['value'],
  data() {
    return {
      
    }
  },
  methods: {
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    }
  }
})
</script>