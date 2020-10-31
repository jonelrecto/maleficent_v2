<template>
  <v-dialog v-model="openDialog" fullscreen persistent>
    <snackbar ref="prompt"></snackbar>
    <!-- <template v-slot:activator="{ on }">
      <v-btn color="secondary" dark @click="openDialog = true">
        <v-icon mr-1>mdi-calendar-plus</v-icon>
        New Event
      </v-btn>
    </template> -->
    <!-- <v-btn @click="test">
      test
    </v-btn> -->

    <v-card>
      <v-card-title>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="openDialog = false" :disabled="loading">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>New Event</v-toolbar-title>
          
        </v-toolbar>
      </v-card-title>
      
      <v-card-text>
        <v-container fluid fill-height grid-list-md text-xs-center >
          <v-layout row wrap>
            <v-flex class="text-md-center " align-self-center xs6 sm6 md5 >
              <div class="text-center p-2">
                <label for="avatar">

                  <img 
                  v-if="files.length"
                  :src="files.length ? files[0].url : 'http://fajrpolymers.com/wp-content/uploads/2018/02/dummy.png'"  
                  height="200px"
                  weight="200px" />
                  
                  <img 
                  v-else
                  :src="event.pagePhotos ? event.pagePhotos.eventLogoUrl : 'http://fajrpolymers.com/wp-content/uploads/2018/02/dummy.png'"
                  height="200px"
                  weight="200px" />
                </label>
              </div>
              <v-btn color="secondary">
                <v-icon class="mr-1">mdi-anchor</v-icon>
                <file-upload
                  :maximum="maxFile"
                  extensions="gif,jpg,jpeg,png,webp"
                  accept="image/png,image/gif,image/jpeg,image/webp"
                  name="avatar"
                  class="btn btn-primary"
                  post-action="/upload/post"
                  :drop="!edit"
                  v-model="files"
                  @input-filter="inputFilter"
                  @input-file="inputFile"
                  ref="upload">
                  Upload Image
                </file-upload>
              </v-btn>
            </v-flex>


            <v-flex xs12 sm12 md6>
              <v-form ref="form" v-model="isValid">
                <v-text-field
                  v-model="event.eventName"
                  :rules="$store.getters['startUp/nameRules']('Event name required')"
                  label="Event Name *"
                  required
                  @input="generateEventCode"
                ></v-text-field>

                <v-layout wrap pb-0 mb-0>
                  <v-flex xs12 sm12 md12 class="pa-0 ma-0">
                    <v-text-field
                      v-model="event.eventCode"
                      :disabled="!isCustomEventCode"
                      :rules="$store.getters['startUp/nameRules']('Event code required')"
                      label="Event Code *"
                      >
                    </v-text-field>
                    <v-switch
                      v-model="isCustomEventCode"
                      class="pt-0 mt-0"
                      label="Custom Event Code"
                    ></v-switch>
                  </v-flex>
                  
                  <v-divider></v-divider>

                  <div class="layout fill-height">
                    <span class="subheading">Age Range *</span>
                  <v-switch
                    v-model="event.ageRange.infant"
                    class="pl-2 pt-0 mt-0"
                    label="Below 4 yrs old"
                  ></v-switch>
                  <v-layout >
                    <div class="layout row wrap pt-0" v-if="event.ageRange.infant">
                      <v-radio-group v-model="event.ageRange.type" column>
                        <v-radio
                          value="infant"
                        >
                          <template v-slot:label>
                            <div><strong>Infant</strong>
                              <p>7 months - 1yr.4month</p>
                            </div>
                          </template>
                        </v-radio> 
                        <v-radio
                          value="todler"
                        >
                          <template v-slot:label>
                            <div><strong>Todler</strong>
                              <p>1yr.5months - 3yr.11month</p>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio
                          value="infant and todler"
                        >
                          <template v-slot:label>
                            <div><strong>Infant &amp; Todler</strong>
                              <p>7 months - 3yr.11month</p>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </div>
                    <div class="layout row wrap" v-else>
                      <v-flex xs12 md6 class="px-1">
                        <v-text-field
                          :rules="$store.getters['startUp/ageRules']({minVal: event.ageRange.min, maxVal: event.ageRange.max, message: 'Minimum of 4 yrs old', type: 'min'})"
                          :min="4"
                          v-model="event.ageRange.min"
                          label="From"
                          type="number"
                          required
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 md6 class="px-1">
                        <v-text-field
                          :rules="$store.getters['startUp/ageRules']({minVal: event.ageRange.min, maxVal: event.ageRange.max, message: 'Maximum 60 yrs old', type: 'max'})"
                          :max="60"
                          v-model="event.ageRange.max"
                          label="To"
                          type="number"
                          required
                        >
                        </v-text-field> 
                      </v-flex>
                    </div>
                    
                  </v-layout>

                  </div>
                  
                  <v-flex>
                    <v-select
                      v-model="event.genderRestriction"
                      :items="genderOpt"
                      label="Gender Restriction *"
                      required
                      :rules="$store.getters['startUp/nameRules']('Gender required')"
                    ></v-select>
                  </v-flex>
                  
                </v-layout>
              
              </v-form>
                  
            </v-flex>
          
          </v-layout>
          
        </v-container>
        

      
      </v-card-text>


      <v-card-actions class="pa-3">
        
        <v-spacer></v-spacer>
        <span>* indicates required</span>
        <v-btn color="black" flat dark  @click.stop="openDialog = false, resolve(false)">Cancel</v-btn>
        <v-btn :loading="loading" color="secondary" round @click.prevent="saveEvent()">Save</v-btn>    
        
      </v-card-actions>
    </v-card>
    
    <confirm ref="confirm"></confirm>
  </v-dialog>
</template>
<script>
import FileUpload from 'vue-upload-component'
import Confirm from '@/components/widgets/ConfirmDialog'
import Snackbar from '@/components/widgets/Snackbar'


export default {
  components: {
    FileUpload,
    Confirm,
    Snackbar
  },
  data: () => ({
    isEdit: false,
    loading: false,
    isCustomEventCode: false,
    event: {
      eventImageUrl: '',
      eventName: '',
      eventCode: '',
      ageRange: {
        infant: false,
        min: 4,
        max: 60,
        type: ''
      },
      genderRestriction: ''
    },
    genderOpt: [
      'Male', 'Female', 'None(Male/Female)'
    ],
    isValid: false,
    files: [],
    maxFile: 2,
    multiple: false,
    edit: false,
    openDialog: false,
    resolve: null,
    reject: null,
  }), //end of data
  computed: {
  },
  methods: {
    clearFields () {
      this.event = {
        eventImageUrl: '',
        eventName: '',
        eventCode: '',
        ageRange: {
          infant: false,
          min: 4,
          max: 60,
          type: ''
        },
        genderRestriction: ''
      },
      this.files = []
      this.isEdit = false
      this.loading = false
    },
    saveEvent () {
      this.checkIfBelow4yrsOld()
      this.$refs.form.validate()
      if (this.isEdit) {
        if (this.isValid) {
          // console.log('update')
          this.updateEvent()
        } else {
          this.$refs.prompt.open('Please check fields', { icon: 'mdi-alert', color: 'warning'})
        }
      } else {
         if (this.isValid && this.files.length) {
          this.addNewEvent()
        } else {
          this.$refs.prompt.open('Please check fields', { icon: 'mdi-alert', color: 'warning'})
        }
      }
    },
    updateEvent () {
      let vm = this
      vm.$refs.confirm.open('Confirm Save', 'Do you want to save?', { color: 'info' })
        .then(confirm => {
          vm.loading = true
          if (confirm) {
            let data = vm.$store.getters['startUp/getPlainValue'](vm.event)
            let key = data['.key']
            delete data['.key']
            vm.$store.dispatch('event/updateEvent', {key: key, event: data, eventLogo: vm.files[0]})
              .then(id => {
                if (id) {
                  vm.loading = false
                  vm.openDialog = false
                  vm.resolve(true)
                }
              })
              .catch(err => {
                console.log(err, 'err')
                vm.loading = false
                vm.$refs.prompt.open('An error occur', { icon: 'mdi-alert', color: 'error'})
              })
          }
        })
      
    },
    addNewEvent () {
      let vm = this
      if (vm.isValid && vm.files.length) {
        vm.$refs.confirm.open('Confirm Save', 'Do you want to save?', { color: 'info' })
          .then(confirm => {
            vm.loading = true
            if (confirm) {
              vm.$store.dispatch('event/addNewEvent', {event: vm.event, eventLogo: vm.files[0]})
                .then(id => {
                  if (id) {
                    // console.log(id, 'id')
                    vm.$router.push(`/events/${id}/seasons`)
                    vm.loading = false
                    vm.$forceUpdate()
                  }
                })
                .catch(err => {
                  vm.loading = false
                  vm.$refs.prompt.open('An error occur', { icon: 'mdi-alert', color: 'error'})
                })
            }
          })
      } else {
        vm.$refs.prompt.open('Please check fields', { icon: 'mdi-alert', color: 'warning'})
      }
    },
    clearAgeRange () {
      this.event.ageRange.min = 4
      this.event.ageRange.max = 60
    },
    checkIfBelow4yrsOld () {
      let event = this.event
      if (event.ageRange.infant) {
        if (event.ageRange.type === 'infant') {
          event.ageRange.min = '7 months'
          event.ageRange.max = '1 yr. 4 months'
        } else if (event.ageRange.type === 'todler') {
          event.ageRange.min = '1 yr. 5 months'
          event.ageRange.max = '3 yr. 11 months'
        } else {
          event.ageRange.min = '7 months'
          event.ageRange.max = '3 yr. 11 months'
        }
      }
    },
    editEvent (event) {
      console.log(event, 'edit event')
      this.openDialog = true
      this.isEdit = true
      this.event = event
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    open() {
      this.$refs.form.resetValidation()
      this.openDialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    generateEventCode () {
      try {
        this.capitalize()
        let eventName = this.event.eventName
        var matches = eventName.match(/\b(\w)/g)
        var acronym = matches.join('')
        this.event.eventCode = acronym.toUpperCase()
      } catch (err) {}
     
    },
    capitalize () {
      this.event.eventName = this.$store.getters['settings/titleCase'](this.event.eventName)
    },
    inputFile(newFile, oldFile, prevent) {
      //  console.log(newFile, 'inputFile')
     
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      // console.log(newFile, 'inputFilter')
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    },
    test () {
      this.$router.push('/events/5078P7kgyN3ArDA3BLxJ/seasons')
    }
  } // end of methods
}
</script>
