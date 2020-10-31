<template>
   <v-container>
      <v-layout>
        <v-card width="100%">
          <v-toolbar
            card  
            color="accent"
            dark
          >
            <v-toolbar-title>Event List</v-toolbar-title>
            <!-- <v-btn @click="test">
              test
            </v-btn> -->
            <v-spacer></v-spacer>
            <v-btn color="secondary" dark @click="openEventModal">
              <v-icon mr-1>mdi-calendar-plus</v-icon> 
              New Event
              <new-event-modal ref="newEventModalRef"></new-event-modal>
            </v-btn>
            
          </v-toolbar>
          <!-- container -->
          <v-card-text>
            <!-- <div class="layout justify-center align-center fill-height">
              <v-progress-circular :size="80" :width="5" indeterminate color="primary"></v-progress-circular>
            </div> -->
            <!-- <LoadingOverlay /> -->
            <v-container fluid grid-list-md class="pr-0 mr-0">
              <v-layout fill-height wrap align-center justify-center >
                <v-flex class="ma-1" v-for="(event,index) in events" :key="index" >
                  <v-card width="300px" class="clickable">

                    <!-- <img class="" :src="event.pagePhotos.eventLogoUrl" alt="Image not set" width="100px" height="100px"> -->
                    <v-img
                    aspect-ratio="1"
                      :src="event.pagePhotos.eventLogoUrl"
                      @error="onErrorImageLoad"
                    >
                     <v-btn small icon color="info" @click="editEvent(event)">
                        <v-icon small>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn small icon color="error" @click="removeEvent(event)">
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                    </v-img>

                    <v-list two-line>
                      <v-list-tile >

                        <v-list-tile-content>
                          <v-list-tile-title>{{event.eventName}} ({{event.eventCode}})</v-list-tile-title>
                          <v-list-tile-sub-title>{{event.genderRestriction}}</v-list-tile-sub-title>
                          <v-list-tile-sub-title v-if="event.ageRange.infant">{{event.ageRange.min}} - {{event.ageRange.max}}</v-list-tile-sub-title>
                          <v-list-tile-sub-title v-else>{{event.ageRange.min}}yrs old - {{event.ageRange.max}}yrs old</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action >
                          
                          <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon color="primary" dark v-on="on">mdi-arrow-right</v-icon>
                            </template>
                            <span>View Season</span>
                          </v-tooltip> -->

                        </v-list-tile-action>
                      </v-list-tile>


                      
                    </v-list>
                    <v-divider></v-divider>
                    <v-card-actions >
                      <v-layout row  >
                        <v-flex xs12 md6 class="pt-1 pb-0 ml-1">
                          <v-btn small block color="info" @click.native="$router.push(`/events/${event['.key']}/seasons`)">
                            View Season
                          </v-btn>
                          
                        </v-flex>
                        <v-flex xs12 md6 class="pt-1 pb-0 mr-1 ">
                          <v-btn small block color="success">
                            View Schedules
                          </v-btn>
                        </v-flex>
                      </v-layout>
                      
                    </v-card-actions>
                  </v-card>
                </v-flex>

                
                
              </v-layout>

            </v-container>

          </v-card-text>

        </v-card>
      </v-layout>
      <snackbar ref="prompt"></snackbar>
      <confirm ref="confirm"></confirm>
    </v-container>
</template>
<script>
import NewEventModal from '@/components/events/event/NewEventModal.vue'
import Snackbar from '@/components/widgets/Snackbar'
import Confirm from '@/components/widgets/ConfirmDialog'
import LoadingOverlay from '@/components/widgets/LoadingOverlay'

export default {
  components: {
    NewEventModal,
    Snackbar,
    Confirm,
    LoadingOverlay
  },
  firestore () {
    return {
      events: this.$fs.collection('events')
    }
  },
  data: () => ({

  }),// end of data
  computed: {
    onErrorImageLoad () {
      return '@/assets/empty_image.png'
    }
  },// end of computed
  methods: {
    removeEvent (evnt) {
      this.$refs.confirm.open('Remove', `Do you want to remove ${evnt.eventName}?`, { color: 'error' })
        .then(confirm => {
          if (confirm) {
            this.$store.dispatch('event/removeEvent', {event: evnt, collection: 'events'})
              .then(() =>{
                this.$refs.prompt.open('Event Removed', { icon: 'mdi-alert', color: 'info'})
              })
          }
        })
    },
    editEvent (evnt) {
      this.$refs.newEventModalRef.editEvent(evnt)
        .then(res => {
          if (res) {
            this.$refs.prompt.open('Event Updated', { icon: 'mdi-alert', color: 'info'})
          } else {
            this.$refs.newEventModalRef.clearFields()
          }
        })
    },
    getImage (evnt) {
      console.log(evnt, 'evnt')
      return evnt.pagePhotos.eventLogoUrl ? evnt.pagePhotos.eventLogoUrl : ''
    },
    openEventModal () {
      this.$refs.newEventModalRef.open()
    },
    test () {
      console.log(this.events, 'events')
    }
  }// end of methods
}
</script>
<style>
.clickable {
  cursor: pointer;
}
</style>
