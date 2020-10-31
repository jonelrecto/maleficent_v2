<template>
  <div id="page-seasons">
    <!-- <v-layout row class="align-center layout px-4 pt-0 ">
      <div class="page-header-left">
        <span class="title pt-5">Event Name here</span>
      </div>
    </v-layout> -->
    
    <v-container fluid align-content-center class="ml-0 pt-0" layout-padding>
      <v-layout row wrap>
        <v-card color="info">
          <v-toolbar
            card  
            color="accent"
            dark
          >
            <v-toolbar-title>{{event.eventName}}</v-toolbar-title>

            <v-btn @click="test">
              test
            </v-btn>

            <v-spacer></v-spacer>
            <!-- <new-season-modal></new-season-modal> -->
            <new-season-import-modal></new-season-import-modal>
          </v-toolbar>

          <v-card-text >
            <v-container fill-height grid-list-md text-xs-center>
              <v-layout row wrap align-end justify-center>
                <v-flex xs8 sm12 md4 lg4 class="py-2" v-for="n in 10" :key="n" >
                  <v-card width="300px" class="mb-1 pb-5" dark>
                    <v-responsive class="pb-3 ">
                      <v-layout column justify-space-between class="ma-0">
                        <v-flex xs2 class="text-sm-left">
                          
                        </v-flex>
                        <v-flex xs2 class="text-sm-right">
                          <v-btn icon small>
                            <v-icon color="info">mdi-pencil</v-icon>  
                          </v-btn>
                          <v-btn icon small>
                            <v-icon color="error">mdi-delete</v-icon>  
                          </v-btn>
                        </v-flex>
                        
                      </v-layout>
                      <div class="layout ma-0 align-center column" >
                        <span class="display-1">Season {{n}}</span>
                        <!-- <span class="display-1">1</span> -->
                        
                        <div>
                        
                          
                        </div>
                      </div>
                    </v-responsive>
                    <v-card-title class="pt-0 mb-0 pb-0">
                      
                    </v-card-title>
                    <v-card-text class="pt-0 pb-1 ">
                      <v-layout row wrap class="text-sm-left ">
                        <v-flex xs12 md6 class="pa-0">
                          <p><strong>Start:</strong> Apr 7, 2019</p>
                       
                       
                        
                        </v-flex>
                        <v-flex xs12 md6 class="pa-0">
                           <p><strong>End: </strong> Aug 24, 2019</p>
                        </v-flex>
                        <v-flex xs12 md12 class="pa-0">
                           <p><strong>No. of Models: </strong> 200</p>
                        </v-flex>
                        <v-flex xs12 md12 class="pa-0">
                          <p><strong>Status: </strong> <v-avatar color="error" :size="15"></v-avatar></p>
                        </v-flex>
                        
                      </v-layout>
                    </v-card-text>
                
                  
                  <!-- <v-divider></v-divider> -->
                  
                   <v-bottom-nav
                      :active.sync="activeBtn"
                      :value="true"
                      absolute
                      color="transparent"
                    >
                    <v-btn flat color="success"  value="recent" >
                      <v-icon class="pr-1">mdi-launch</v-icon>
                      <span>Launch</span>   
                    </v-btn>
                    <v-btn flat color="secondary"  value="Batches" @click="$router.push('/events/seasons/batches')"> 
                      <v-icon>mdi-calendar-multiselect</v-icon>
                      <span>Batches</span>
                    </v-btn>
                    <v-btn flat color="info"  value="Reports">
                      <v-icon>mdi-file-chart</v-icon>
                      <span>Details</span>
                    </v-btn>
                    </v-bottom-nav>
                  </v-card>
              
                </v-flex>
                
              </v-layout>
            </v-container>
            

                 

          </v-card-text>

      </v-card>

    </v-layout>

  </v-container>
  </div>
  
</template>
<script>
import NewSeasonModal from '@/components/events/season/NewSeasonModal'
import NewSeasonImportModal from '@/components/events/season/NewSeasonImportModal'

export default {
  components: {
    NewSeasonModal,
    NewSeasonImportModal
  },
  created () {
    this.eventKey = this.$route.params.eventKey
  },
  mounted () {
    this.$binding('event', this.$fs.collection('events').doc(this.eventKey))
      .then((users) => {
        console.log(users) // => __ob__: Observer
      })
  },
  data: () => ({
    event: {},
    eventKey: '',
    activeBtn: 1,
    items: [
      {
        text: 'Home',
        disabled: false,
        href: '/dashboard'
      },
      {
        text: 'Events',
        disabled: false,
        href: 'events'
      }
    ],
  }), // end of data
  methods: {
    test () {
      console.log(this.event, 'key')
    }
  }
}
</script>
