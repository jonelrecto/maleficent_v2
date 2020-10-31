<template>
  <v-dialog value="true" transition="false" hide-overlay width="300">
    <v-card color="rgba(255,255,255,0.7)">
      <v-layout justify-center align-center fill-height>
        <v-progress-circular :size="80" :width="5" indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoadingOverlay"
};
</script>