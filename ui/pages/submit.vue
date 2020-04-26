<template>
  <v-layout column justify-center align-center>
    <div class="display-2">Submit Genomic data</div>
    <v-flex xs12 sm8 md6>
      <v-tabs v-model="currentTab">
        <v-tab
          v-for="(tab, i) in tabs"
          :key="i"
          :href="`#tab-${i}`"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="currentTab">
        <v-tab-item
          v-for="(tab, i) in tabs"
          :key="i"
          :value="`tab-${i}`">
          <v-card>
            <keep-alive>
              <component :is="tab.component" v-model="tab.data"></component>
            </keep-alive>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
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
            ]
          }
        }
      ]
    }
  },
  watch: {
    currentTab(newVal, oldVal) {
      console.log(this.$data.tabs)
    }
  }
})
</script>

<style lang="stylus" scoped>

</style>