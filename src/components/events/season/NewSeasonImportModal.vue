<template>
  <v-dialog v-model="openDialog" persistent max-width="800px" fullscreen >
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" dark @click="openDialog = true">
        <v-icon class="mr-1">mdi-calendar-plus</v-icon>
        New Season (import)
      </v-btn>
    </template>

<!-- :color="newSeasonColor.hex" -->
    <v-card :color="seasonColor.hex">
      <v-card-title class="pa-0">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="openDialog = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>New Season (import)</v-toolbar-title>
          <!-- <v-btn @click="test">
            test
          </v-btn> -->
        </v-toolbar>
      </v-card-title>
      
      <v-card-text>
        
        <v-stepper v-model="stepper">
          <v-stepper-header>
            <v-stepper-step
              complete
              editable
              step="1"
            >
              Season Information
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              complete
              editable
              step="2"
            >Activity Schedule</v-stepper-step>

            <v-divider></v-divider>

            <!-- <v-stepper-step
              step="3"
            >
              Preview
            </v-stepper-step> -->
          </v-stepper-header>

          <v-stepper-content step="1">
            <season-import-info></season-import-info>
            <!-- <v-btn color="primary" @click="stepper = 2">Continue</v-btn> -->
          </v-stepper-content>

          <v-stepper-content step="2">
            <activity-schedules></activity-schedules>
            <v-btn color="primary">Continue</v-btn>
            <v-btn flat @click="stepper = 1">Back</v-btn>
          </v-stepper-content>

          <!-- <v-stepper-content step="3">
            <preview-activities></preview-activities>
            <v-btn color="secondary" @click="stepper = 3">Continue</v-btn>
            <v-btn flat @click="stepper = 2">Back</v-btn>
          </v-stepper-content> -->

        </v-stepper>

      </v-card-text>


    </v-card>
  </v-dialog>
</template>
<script>
import SeasonImportInfo from '@/components/events/season/SeasonImportInfo'
import ActivitySchedules from '@/components/events/season/ActivitySchedules'
import PreviewActivities from '@/components/events/season/PreviewActivities'

export default {
  components: {
    SeasonImportInfo,
    ActivitySchedules,
    PreviewActivities
  },
  
  data: () => ({
    colors: {
      hex: '#F5AFC8'
    },
    menu: false,
    menu2: false,
    items: [],
    date: '',
    date2: '',
    openDialog: false
  }), //end of data
  computed: {
    stepper: {
      get () {
        return this.$store.state.event.stepper
      },
      set (v) {
        this.$store.state.event.stepper = v
      }
    },
    seasonColor () {
      return this.$store.state.event.seasonColor
    }
  }, // end of computed
  methods: {
    test () {
      console.log(this.colors, 'colors')
    }
 
  } // end of methods
}
</script>
