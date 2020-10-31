<template>
  <div>
  <v-app id="inspire">
    <v-layout row justify-center>
      <v-dialog v-model="loading" persistent fullscreen transition="false" content-class="loading-dialog">
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
  </v-app>
</div>
</template>
<script>
export default {
  data: () => ({
    loading: true,
  }),// end of data
  methods: {
    onLoadingState (status) {
      this.loading = status
    }
  }
}
</script>
<style>
.loading-dialog {
  background-color: #303030
}
</style>
