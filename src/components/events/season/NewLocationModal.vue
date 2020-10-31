<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title >
        <h3>New Location</h3>
        
      </v-card-title>
      <v-card-text class="pt-0">
    
        <v-form ref="form" v-model="isValid">
           <v-text-field
              v-model="newLocation.name"
              label="Name"
              required
              :rules="[v => !!v || 'Location name is required']"
            ></v-text-field>

            <v-textarea
              label="Address"
              v-model="newLocation.address"
              required
              :rules="[v => !!v || 'Address is required']"
            ></v-textarea>
        </v-form>
       

      </v-card-text>
      <v-card-actions>
        <v-btn :loading="loading" color="success" flat @click="saveLocation()">Save</v-btn>
        <v-btn color="primary" flat @click="dialog=false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
    <confirm ref="confirm"></confirm>
    
  </v-dialog>
</template>
<script>
import Confirm from '@/components/widgets/ConfirmDialog'

export default {
  components: {
    Confirm
  },
  data: () => ({
    loading: false,
    isValid: false,
    newLocation: {
      name: '',
      address: ''
    },
    dialog: false,
    resolve: null,
    reject: null,
    select: []
  }),
  methods: {
    saveLocation () {
      let vm = this
      vm.$refs.form.validate()
      if (vm.isValid) {
        vm.$refs.confirm.open('Confirm Save', 'Do you want to save?', { color: 'info' })
          .then(confirm => {
            if (confirm) {
              vm.loading = true
              vm.$store.dispatch('settings/addNewLocation', vm.newLocation)
                .then(res => {
                  if (res) {
                    vm.clearFields()
                    vm.loading = false
                    vm.resolve(res)
                    vm.dialog = false
                  }
                })
            }
          })
      } 
    },
    openDialog () {
      this.dialog = true
      this.resolve = false
      this.$refs.form.reset()
      return new Promise((resolve, reject) => {
       this.resolve = resolve
        this.reject = reject
      })
    },
    clearFields () {
      this.newLocation = {
        name: '',
        address: ''
      }
    }
  }
}
</script>

