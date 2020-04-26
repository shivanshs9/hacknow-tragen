<template>
  <v-layout column justify-center align-center>
    <div class="display-2">Submit Genomic data</div>
    <v-flex xs12 sm8 md6>
      <v-tabs v-model="currentTab">
        <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${i}`">{{ tab.title }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="currentTab">
        <v-tab-item v-for="(tab, i) in tabs" :key="i" :value="`tab-${i}`">
          <v-card>
            <keep-alive>
              <component :is="tab.component" v-model="tab.data"></component>
            </keep-alive>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
    <v-btn :loading="loading" class="ma-2" color="primary" dark @click="submit">
      Submit
      <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      loading: false,
      currentTab: null,
      tabs: [
        {
          title: 'Contact',
          component: () => import('~/components/submission/tab-contact.vue'),
          data: {
            firstName: '',
            lastName: '',
            email: ''
          }
        },
        {
          title: 'Reference',
          component: () => import('~/components/submission/tab-reference.vue'),
          data: {
            authors: [
              {
                firstName: '',
                lastName: ''
              }
            ],
            references: [
              {
                title: '',
                status: null
              }
            ]
          }
        },
        {
          title: 'Sequencing Technology',
          component: () => import('~/components/submission/tab-sequencing.vue'),
          data: {
            sequencingTech: []
          }
        },
        {
          title: 'Nucleotide',
          component: () => import('~/components/submission/tab-nucleotide.vue'),
          data: {
            releaseDate: null,
            moleculeType: null,
            topology: null,
            fastaFile: null
          }
        },
        {
          title: 'Submission Category',
          component: () => import('~/components/submission/tab-submission.vue'),
          data: {
            category: null,
            visibility: 'Public',
            modifierTableFile: null
          }
        }
      ]
    }
  },
  methods: {
    submit() {
      const file = this.tabs[3].data.fastaFile
      if (!!file) this.uploadFile(file, file.name)
    },
    uploadFile(fileObj, fileName) {
      if (!process.client) return
      var fileRef = this.$fireStorageObj()
        .ref()
        .child(fileName)
      fileRef.put(fileObj).then(function(snapshot) {
        console.log('File uploaded successfully')
      })
      return fileRef.fullPath
    },
    addToDB(transactionObj) {
      if (!process.client) return
      transactionObj.verified = false
      var transactionsRef = this.$fireDbObj().ref('sequences/')
      var newTransactionRef = transactionsRef.push()
      newTransactionRef.set(transactionObj)
      return newTransactionRef.key
    }
  }
})
</script>

<style lang="stylus" scoped></style>
