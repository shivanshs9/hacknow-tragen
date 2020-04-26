<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            :value="value.firstName"
            :rules="nameRules"
            :counter="10"
            label="First name"
            @input="update('firstName', $event)"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            :value="value.lastName"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            @input="update('lastName', $event)"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            :value="value.email"
            :rules="emailRules"
            label="E-mail"
            @input="update('email', $event)"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: [
    'value'
  ],
  data() {
    return {
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
    }
  },
  methods: {
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    }
  }
})
</script>

<style lang="stylus" scoped>

</style>