<template>
  <v-layout column justify-center align-center>
    <div class="display-2">Submit Genomic data</div>
    <v-flex xs12 sm8 md6>
      <v-tabs v-model="currentTab">
        <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${i}`">{{
          tab.title
        }}</v-tab>
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

import { createHash } from 'crypto'

import { newContractTxn } from '~/assets/js/web3'
import { transcode } from 'buffer'

const _hash = createHash('sha256')
const getHash = (data) => {
  return _hash.update(JSON.stringify(data)).digest('hex')
}

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
            valid: false,
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
            valid: false,
            definition: null,
            sequencingTech: []
          }
        },
        {
          title: 'Nucleotide',
          component: () => import('~/components/submission/tab-nucleotide.vue'),
          data: {
            valid: false,
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
    async submit() {
      this.loading = true
      if (!this.tabs[0].data.valid) console.error('Fill Contact Info')
      else if (!this.tabs[2].data.valid)
        console.error('Fill Sequencing Technology Info')
      else if (!this.tabs[3].data.valid) console.error('Fill Nucleotide Info')
      else {
        const metadata = {
          ...this.tabs[0].data,
          ...this.tabs[1].data,
          ...this.tabs[2].data,
          ...this.tabs[3].data,
          ...this.tabs[4].data
        }
        const { visibility, fastaFile, modifierTableFile } = metadata
        ;['valid', 'visibility', 'fastaFile', 'modifierTableFile'].forEach(
          (e) => delete metadata[e]
        )
        let fastaUrl, modifierUrl
        if (!!fastaFile)
          fastaUrl = await this.uploadFile(fastaFile, fastaFile.name)
        if (!!modifierTableFile)
          modifierUrl = await this.uploadFile(
            modifierTableFile,
            modifierTableFile.name
          )

        const txnMetadata = await this.createSequenceMetadata(metadata)
        const txnSubmitted = await this.submitSequenceBlk(
          txnMetadata,
          process.env.ADDRESS_CONTRACT_ROLE_CONTROL
        )
        const dbRecord = {
          ...metadata,
          txnMetadata: txnMetadata._address,
          txnSubmitted: txnSubmitted._address
        }
        this.addToDB(dbRecord)
      }
      this.loading = false
    },
    async uploadFile(fileObj, fileName) {
      if (!process.client) return
      var fileRef = this.$fireStorageObj()
        .ref()
        .child(fileName)
      await fileRef.put(fileObj)
      console.log('File uploaded successfully')
      return fileRef.fullPath
    },
    async addToDB(transactionObj) {
      if (!process.client) return
      console.log(this)
      transactionObj.verified = false
      var transactionsRef = this.$fireDbObj().ref('sequences/')
      const newTransactionRef = transactionsRef.push()
      newTransactionRef.set(transactionObj)
      return newTransactionRef.key
    },
    async createSequenceMetadata(metadata) {
      const hash = getHash(metadata)
      const contract = this.$web3.contractSequenceMetadata
      try {
        return await newContractTxn(contract, [`0x${hash}`])
      } catch (error) {
        console.log(`Failed sending deploying sequence metadata`)
        console.error(error)
      }
    },
    async submitSequenceBlk(metadataTxn, roleControlAdd) {
      const contract = this.$web3.contractSubmittedSequence
      try {
        return await newContractTxn(contract, [
          metadataTxn._address,
          roleControlAdd
        ])
      } catch (error) {
        console.log(`Failed sending submitting sequence!`)
        console.error(error)
      }
    }
  }
})
</script>

<style lang="stylus" scoped></style>
