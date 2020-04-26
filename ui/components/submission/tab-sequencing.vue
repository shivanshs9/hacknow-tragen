<template>
  <v-form v-model="valid">
    <v-container>
      <v-card-title class="headline">
        Sequencing Technology
      </v-card-title>
      <v-row>
        <v-col cols="12">
          <v-combobox
            :value="value.sequencingTech"
            :items="choiceSequencingTech"
            label="What methods were used to obtain these sequences?"
            hint="This information is required if you are submitting over 500 sequences or if your sequences were generated using next-generation sequencing technology."
            @change="update('sequencingTech', $event)"
            type="outline"
            multiple
            required
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>

      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['value'],
  data() {
    return {
      valid: false,
      choiceSequencingTech: [
        'Sanger dideoxy sequencing',
        '454',
        'Helicos',
        'Illumina',
        'PacBio',
        'SOLiD',
        'IonTorrent'
      ]
    }
  },
  methods: {
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    }
  }
})
</script>