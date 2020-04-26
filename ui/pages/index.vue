<template>
  <v-layout column justify-center align-center>
    <v-container fluid fill-height class="tragenhome">
      <v-layout justify-center align-center column pa-5>
        <div class="display-2 font-weight-black white--text text-xs-center">
          Global Collabration Research Platform
        </div>
        <div class="display-2 font-weight-black white--text text-xs-center">
          for transaparent
        </div>
        <div class="display-1 font-weight-bold white--text text-xs-center mb-5">
          genomics data Sharing
        </div>
        <div class="text-center mb-3">
          <nuxt-link to="/submit">
            <v-btn rounded color="primary" dark>Try for free</v-btn>
          </nuxt-link>
        </div>
        <div class="text-center">
          <v-btn rounded color="primary" dark>Demo</v-btn>
        </div>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'AppNavigation'
}
</script>

<style scoped>
.tragenhome {
  background: url('~@/assets/bimg.png');
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
