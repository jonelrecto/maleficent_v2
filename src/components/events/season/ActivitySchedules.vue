<template>
  <div>
    <v-container fluid fill-height grid-list-lg align-center>
      <v-layout row wrap align-content-center justify-space-around>
        <v-btn @click="test()">
          test
        </v-btn>
        <!-- orientation -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Orientation</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 ">
              <v-divider></v-divider>
              <v-form>
                  <p>Time</p>
                  <vue-timepicker
                    :minute-interval="10"
                    v-model="activities.orientation.time"
                    format="hh:mm A"
                    ></vue-timepicker>
                  
                 <v-select
                  class="pb-2"
                  v-model="activities.orientation.location"
                  :items="locations"
                  label="Location"
                  item-text="name"
                  return-object
                  :hint="activities.orientation.location.address"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat small @click="openNewLocationDialog()">

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description(optional)"
                  :value="activities.orientation.details"
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

        <!-- payment -->
        <v-flex xs12 md3 >
          <v-card class="pa-1" >
            <v-card-title>
              <span class="title">Payments</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 pr-0">
              <v-form>
                <span class="subheading font-weight-bold">Season Rate: P {{getInstallmentAmount}}</span>
                <div class="red--text">Missing Amount: P 2000</div>
                <div class="blue--text">Exceed Amount: P 2000</div>
                <v-container fluid grid-list-md >
                  <v-layout justify-space-around align-start row wrap    class="mr-0">
                    
                  <v-flex xs12 class="pb-0 pt-0 pl-0 ma-0" >
                    <v-card tile flat >
                      
                      <v-card-text class="pl-0 pb-0 pr-0 ma-0" >
                        <v-container class="pa-0 ma-0" fluid grid-list-md >
                          <v-layout   row wrap align-center class="pb-0">

                          <v-flex v-for="n in 6" :key="n" xs12 sm12  md6>
                             <v-text-field
                              :label="`Payment ${n}`"
                              type="number"
                              prefix="P"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        </v-container>
                        
                        

                       
                      </v-card-text>
                    </v-card>
                   
                  </v-flex>

                </v-layout>
                </v-container>
                
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>

        <!-- photoshoot -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Photoshoot</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-form>

                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                  <v-divider></v-divider>
                 <v-select
                  class="pb-2"
                  :items="items"
                  label="Location"
                  hint="Quezon city"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat>

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description"
                  value="The Woodman set to work at "
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

        
        <!-- workshop 2 -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Workshops</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 ">
              <v-form>
                

                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                  <v-divider></v-divider>
                 <v-select
                  class="pb-2"
                  :items="items"
                  label="Location"
                  hint="Quezon city"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat>

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description"
                  value="The Woodman set to work at "
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

        <!-- other activities -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">General Rehersal</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 ">
              <v-form>
           

                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                  <v-divider></v-divider>
                 <v-select
                  class="pb-2"
                  :items="items"
                  label="Location"
                  hint="Quezon city"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat>

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description"
                  value="The Woodman set to work at "
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

       

        <!-- final event -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Final Event</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 ">
              <v-form>
               

                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                  <v-divider></v-divider>
                 <v-select
                  class="pb-2"
                  :items="items"
                  label="Location"
                  hint="Quezon city"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat>  

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description"
                  value="The Woodman set to work at "
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>
      
        <new-location-modal ref="newLocationRef"></new-location-modal>
        <snackbar ref="prompt"></snackbar>
      </v-layout>

    </v-container>
  </div>
</template>
<script>
import VueTimepicker from 'vue2-timepicker'
import NewLocationModal from '@/components/events/season/NewLocationModal'
import Snackbar from '@/components/widgets/Snackbar'

export default {
  components: {
    VueTimepicker,
    NewLocationModal,
    Snackbar
  },
  firestore () {
    return {
      locations: this.$fs.collection('locations')
    }
  },
  data: () => ({
    orientTimeMenu: false,
    activities: {
      orientation: {
        startDate: '',
        endDate: '',
        time: {
          hh: '08',
          mm: '00',
          A: 'AM'
        },
        location: '',
        c: '',
        eventKey: '',
        id: ``,
        title: `Orientation`,
        actType: 'detailed',
        type: 'orientation',
        classes: ''
      },
      paymentsAmount: [],
      payments: {
        startDate: [],
        endDate: [],
        eventKey: [],
        id: [],
        title: [],
        actType: '',
        type: [],
        classes: [],
        amount: []
      },
      photoshoot: {
        startDate: '',
        endDate: '',
        time: "Sat Jan 12 2019 08:00:00",
        location: '',
        details: '',
        eventKey: '',
        id: ``,
        title: '',
        actType: 'detailed',
        type: 'photoshoot',
        classes: ''
      },
      photoliking: {
        startDate: '',
        endDate: '',
        time: '',
        location: '',
        details: '',
        eventKey: '',
        id: '',
        title: '',
        type: 'photoliking',
        actType: 'date range',
        classes: ''
      },
      workshops: {
        startDate: [],
        endDate: [],
        time: [],
        location: [],
        details: [],
        eventKey: [],
        id: [],
        title: [],
        actType: [],
        type: [],
        classes: []
      },
      otherActivities: {
        startDate: [],
        endDate: [],
        time: [],
        location: [],
        details: [],
        eventKey: [],
        id: [],
        title: [],
        type: [],
        actType: [],
        classes: []
      },
      finalEvent: {
        startDate: '',
        endDate: '',
        time: 'Sat Jan 12 2019 08:00:00',
        location: '',
        details: '',
        eventKey: '',
        id: '',
        title: `Final Event`,
        type: 'final event',
        actType: 'detailed',
        classes: ''
      }
    },
    date2: '',
    menu: false,
    menu2: false,
    time: '',
    items: []
  }), // end of data
  computed: {
    getInstallmentAmount () {
      return this.$store.getters['event/getInstallmentAmount']
    },
    season: {
      get () {
        return this.$store.state.event.season
      },
      set (v) {
        this.$store.state.event.season = v
      }
    }
  },
  methods: {
    openNewLocationDialog () {
      let vm = this
      vm.$refs.newLocationRef.openDialog()
        .then(res => {
          if (res) {
            vm.$refs.prompt.open('New Location Saved', { icon: 'mdi-alert', color: 'success'})       
          }
        })
    },
    test () {
      console.log(this.locations, 'loc') 
      console.log(this.activities, 'activities') 
      console.log(this.season, 'season') 
      
      
    }
   
  }
}
</script>
