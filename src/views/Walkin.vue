<template>
  <div id="walkin-page">
    <v-container fluid-xs grid-list-md>
      <v-layout>
        <v-flex>
          <v-card class="mb-0" >
            <v-toolbar color="accent" dark flat dense cad>
              <v-toolbar-title class="subheading">Walk in Applicant</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <v-form v-model="valid">
                <v-subheader class="pa-0">Event</v-subheader>
                <div class="layout ma-0 row">
                  <v-select
                    v-model="walkin.event"
                    :items="events ? events : []"
                    item-text="eventName"
                    item-value=".key"
                    return-object
                    @change="walkin.age = ''"
                    box
                    required
                    persistent-hint
                    hint="Season and Batch Number"
                    no-data-text="No Event Available"
                  ></v-select>
                </div>
                <v-layout>
                  <v-flex xs12 md6 mx-2>
                    <v-subheader class="pa-0">Model Information</v-subheader>

                    <v-text-field
                      v-model="walkin.firstname"
                      :rules="nameRules"
                      label="First name"
                      required  
                    ></v-text-field>
            

                  
                      <v-text-field
                        v-model="walkin.lastname"
                        :rules="nameRules"
                        label="Last name"
                        required
                      ></v-text-field>
                  

                 
                      <v-text-field
                        v-model="walkin.middleInitial"
                        label="Middle Initial"
                      ></v-text-field>
               
                 
                      <v-select
                        v-if="walkin.event.ageRange ? walkin.event.ageRange.infant : false"
                        :items="below4AgeOpt"
                        item-label="text"
                        item-value="itemValue"
                        v-model="walkin.age"
                        :label="`Age below ${walkin.event.ageRange ? walkin.event.ageRange.max : ''}`"
                        required
                      ></v-select>
                      <v-text-field
                        v-else
                        v-model="walkin.age"
                        :label="`Age (${walkin.event.ageRange ? walkin.event.ageRange.min : ''} - ${walkin.event.ageRange ? walkin.event.ageRange.max : ''})`"
                        required
                        :rules="[v => !!v || 'Age is required']"
                        type="number"
                      ></v-text-field>
            

                 
                      <v-select
                        v-model="walkin.gender"
                        :items="genderRestriction"
                        :rules="[v => !!v || 'Gender is required']"
                        item-label="text"
                        item-value="value"
                        label="Gender"
                      ></v-select>
              
                  </v-flex>

                  <v-flex mx-3 xs12 md6>
                    <v-subheader class="pa-0">Contact Details</v-subheader>

                     <v-text-field
                        v-model="walkin.email"
                        :rules="emailRules"
                        label="Email"
                        required
                      ></v-text-field>

                       <v-text-field
                        v-model="walkin.telNo"
                        label="Telephone Number"
                        :mask="'###-####'"
                      ></v-text-field>

                       <v-text-field
                        v-model="walkin.mobileNo"
                        :rules="numberRules"
                        label="Mobile Number"
                        mask="####-#######"
                        required
                      ></v-text-field>

                       <v-textarea
                        solo
                        name="input-7-4"
                        label="Complete Address"
                        v-model="walkin.address"
                        :rules="[v => !!v || 'Address is required']"
                      ></v-textarea>
                  </v-flex>
                </v-layout>
                
                <v-layout>
                  
                  <v-flex xs12 md12 >
                  <v-subheader class="pa-0">More About You</v-subheader>  
                   <v-textarea
                      solo
                      name="input-7-4"
                      label="Past Modeling Experience"
                      v-model="walkin.pastExperience"
                    ></v-textarea>

                  </v-flex>                  
                </v-layout>
                <v-subheader class="pa-0">Upload 2 Best Photo</v-subheader>  
                   <v-container fill-height> 
                    <v-layout row wrap align-center>
                      <v-flex xs6 sm4 md6 >
                        <v-img 
                        contain
                        :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"
                        style="max-width: 40vh; max-height:40vh"
                        >
                          <v-btn 
                          @click="removePhoto(0)"
                          v-if="files[0]"
                          icon>
                            <v-icon >mdi-close</v-icon>
                          </v-btn>
                        </v-img>
                      </v-flex>

                      <v-flex xs6 sm4 md6>
                        
                        <v-img 
                        contain
                        :src="files[1] ? files[1].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"
                        style="max-width: 40vh; max-height:40vh">
                          <v-btn 
                          @click="removePhoto(1)"
                          v-if="files[1]"
                          icon>
                            <v-icon >mdi-close</v-icon>
                          </v-btn>
                        </v-img>
                      </v-flex>

                      
                    </v-layout>
                  </v-container>

                <v-layout grid-list fluid>
                  <v-flex xs12 md12 class="text-md-center">
                    <br>
                    <v-btn color="secondary" v-if="files.length != 2">
                      <v-icon class="mr-1">mdi-anchor</v-icon>
                      <file-upload
                        :maximum="maxFile"
                        :multiple="multiple"
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
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="info"
                flat
                @click="test">
                Clear
              </v-btn>
              <v-btn
                color="info"
                text
                @click="test">
                Save
              </v-btn>
            </v-card-actions> 
          </v-card>
        </v-flex>           
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'

export default {
  components: {
    FileUpload
  },
  mounted () {
    this.$bindAsArray('events', this.$database.ref('events'))
    this.$bindAsArray('schedules', this.$database.ref('event_schedules'))
    this.$bindAsArray('models', this.$database.ref('models'))
    this.storageRef = this.$firebase.storage().ref()
  },
  data () {
    return {
      events: [],
      ageWordsBabyOpt: this.getDateWords(1, 17),
      ageWordsTodlerYrOpt: this.getDateWords(17, 48),
      storageRef: [],
      maxFile: 2,
      multiple: true,
      edit: false,
      files: [],
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      numberRules: [
        v => !!v || 'Mobile Number is required'
      ],
      valid: true,
      walkin: {
        event: '',
        lastName: '',
        firstName: '',
        middleInitial: '',
        age: '',
        gender: '',
        email: '',
        telNo: '',
        mobileNo: '',
        address: '',
        pastExperience: '',
        photo1: '',
        photo2: '',
      }
    };
  },
  computed: {
    eventOpt () {
      return this.$_.map(this.events, e => {
        console.log(e, 'e')
        return { label: e.eventName, value: e['.key']}
      })
    },
    below4AgeOpt () {
      try {
        if (this.walkin.event.ageRange.type === 'infant') {
          return this.ageWordsBabyOpt
        } else {
          return this.ageWordsTodlerYrOpt
        }
      } catch (err) {
        return []
      }
      
    },
    genderRestriction () {
      if (this.walkin.event.genderRestriction || this.walkin.event.genderRestriction === 'none(male/female)') {
        return [
          { text: 'Male', value: 'male'},
          { text: 'Female', value: 'female'}
        ]
      } else if (this.walkin.event.genderRestriction === 'male') {
        return [ {text: 'Male', value: 'male'} ]
      } else {
        return [ {text: 'Female', value: 'female'} ]
      }
    }
  },  
  methods: {
    removePhoto (index) {
      this.files.splice(index, 1)
    },
    editSave() {
      this.edit = false
      let oldFile = this.files[0]
      let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
      let arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type })
      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true,
      })
    },

    alert(message) {
      alert(message)
    },

    inputFile(newFile, oldFile, prevent) {
       console.log(newFile, 'inputFile')
     
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
      console.log(newFile, 'inputFilter')
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
    getWords (monthCount) {
      function getPlural (number, word) {
        return number === 1 && word.one || word.other
      }
      var months = { one: 'month', other: 'months' },
        years = { one: 'yr', other: 'yrs' },
        m = monthCount % 12,
        y = Math.floor(monthCount / 12),
        result = []

      y && result.push(y + ' ' + getPlural(y, years))
      m && result.push(m + ' ' + getPlural(m, months))
      return result.join(' & ')
    },
    getDateWords (to, from) {
      let ageWords = []
      for (var i = to; i < from; i++) {
        // console.log(this.getWords(i))
        ageWords.push({text: this.getWords(i), itemValue: this.getWords(i)})
      }
      // console.log('getwords', ageWords)
      return ageWords
    },
    test () {
      console.log(this.walkin, 'walkin')
    }
  }// end of methods
};
</script>