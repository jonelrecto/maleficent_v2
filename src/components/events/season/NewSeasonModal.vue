<template>
  <v-dialog v-model="openDialog" persistent max-width="800px" fullscreen >
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" dark @click="openDialog = true">
        <v-icon class="mr-1">mdi-calendar-plus</v-icon>
        New Season
      </v-btn>
    </template>


    <v-card color="secondary">
      <v-card-title class="pa-0">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="openDialog = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>New Season</v-toolbar-title>
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

            <v-stepper-step
              step="3"
            >
              Preview
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-content step="1">
            <season-info></season-info>  
            <v-btn color="primary" @click="stepper = 2">Continue</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <activity-schedules></activity-schedules>
            <v-btn color="primary" @click="stepper = 3">Continue</v-btn>
            <v-btn flat @click="stepper = 1">Back</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <preview-activities></preview-activities>
            <v-btn color="secondary" @click="stepper = 3">Continue</v-btn>
            <v-btn flat @click="stepper = 2">Back</v-btn>
          </v-stepper-content>

        </v-stepper>

      </v-card-text>


  

    </v-card>
  </v-dialog>
</template>
<script>
import { Slider } from 'vue-color'
import SeasonInfo from '@/components/events/season/SeasonInfo'
import ActivitySchedules from '@/components/events/season/ActivitySchedules'
import PreviewActivities from '@/components/events/season/PreviewActivities'

export default {
  components: {
    SeasonInfo,
    ActivitySchedules,
    PreviewActivities,
    'slider-picker': Slider
  },
  
  data: () => ({
    colors: {
       hex: '#F5AFC8'
    },
    stepper: 1,
    menu: false,
    menu2: false,
    items: [],
    date: '',
    date2: '',
    openDialog: false
  }), //end of data
  computed: {
    seasonColor () {
      return this.$store.state.event.seasonColor
    }
  },
  methods: {
    test () {
      console.log(this.colors, 'colors')
    }
 
  } // end of methods
}
</script>
