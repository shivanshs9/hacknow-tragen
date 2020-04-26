<template>
  <v-form v-model="valid">
    <v-container>
      <v-card-title class="headline">
        Submission Release Date
      </v-card-title>
      <v-row>
        <v-col cols="12">
          <v-text-field
            :value="value.releaseDate"
            :rules="dateRules"
            label="When may we release your sequence record?"
            @input="update('releaseDate', $event)"
            hint="Date format is 'DD-Mon-YYYY' (example: 20-Feb-2004).
Release date must be after 6 months from today and before 10 years from today.
Keep it empty if you want to release Immediately After Processing."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card-title class="headline">
        Sequence(s)
      </v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            :value="value.moleculeType"
            :items="choiceMoleculeType"
            label="Molecule Type"
            hint="Select the type of molecule that was isolated and sequenced."
            @change="update('moleculeType', $event)"
            type="outline"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            :value="value.topology"
            :items="choiceTopology"
            label="Topology"
            @change="update('topology', $event)"
            type="outline"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-alert
        border="top"
        colored-border
        type="info"
        elevation="2"
      >
        FASTA sequences (not an alignment, most common data format) - <a href="https://www.ncbi.nlm.nih.gov/WebSub/html/help/fasta.html">HELP</a>
        <pre>
  For example:
  >Seq1 [organism=genus species] Definition Line for Seq1
  aaccgatatagagagagga.... 
  >Seq2 [organism=genus species] Definition Line for Seq2
  atctgaatagagattattt.... 
        </pre>
        <a href="https://www.ncbi.nlm.nih.gov/WebSub/html/help/defline.html">Definition Lines</a> which are used to describe each sequence, should be included with your sequence data.
      </v-alert>
      <v-row>
        <v-col cols="12">
          <v-file-input accept="text/*" label="Upload Sequence(s) Data"></v-file-input>
        </v-col>
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
      dateRules: [
        v => !v || (/\d\d-\w\w\w-\d\d\d\d/.test(v) || 'Date must be valid - Date format is \'DD-Mon-YYYY\' (example: 20-Feb-2004).'),
      ],
      choiceMoleculeType: [
        'Genomic DNA',
        'mRNA (cDNA)',
        'genomic RNA',
        'precursor RNA',
        'tRNA',
        'cRNA',
        'rRNA',
        'Transcribed RNA',
        'Other Genetic: RNA',
        'Other Genetic: DNA'
      ],
      choiceTopology: [
        'Linear',
        'Circular'
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