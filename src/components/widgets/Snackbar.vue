<template>

  <v-snackbar
    v-model="snackbar"
    :color="options.color"
    :multi-line="mode === 'multi-line'"
    :timeout="timeout"
    :vertical="mode === 'vertical'"
  >
    <v-icon class="pr-2" dark>{{options.icon}}</v-icon>
    {{ text }}
    <v-btn
      small
      dark
      icon
      @click="snackbar = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
export default {
  data () {
    return {
      snackbar: false,
      mode: '',
      timeout: 3000,
      text: 'Hello, I\'m a snackbar',
      options: {
        color: '',
        icon: ''
      }
    }
  },// end of data
  methods: {
    open(message, options) {
      this.snackbar = true
      this.text = message
      this.options = Object.assign(this.options, options)
    },
  }
}
</script>

