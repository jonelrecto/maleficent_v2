<template>
  <v-dialog fullscreen v-model="openDialog" @keydown.esc="openDialog = false, resolve(false)" persistent max-width="800px">
    <!-- <template v-slot:activator="{ on }">
      <v-btn color="secondary" dark @click="openDialog = true, resolve = false">
        <v-icon mr-1>mdi-book-plus</v-icon>
        New Course
      </v-btn>
    </template> -->


    <v-card dark>
      <v-card-title v-if="!isEdit">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="openDialog = false, resolve(false)">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>New Course</v-toolbar-title>
          
        </v-toolbar>
      </v-card-title>
      
      <v-card-text>

    
          <v-layout >
            <v-flex>
              <v-form ref="form" v-model="valid">
                <v-text-field 
                  v-model="course.courseName"
                  box 
                  label="Course Name *" 
                  required
                  :rules="[v => !!v || 'Course name is required']"
                ></v-text-field>

                <v-card>
                  <v-toolbar flat dark color="accent">
                    <v-toolbar-title>Activities</v-toolbar-title>
                    <v-spacer></v-spacer>
                      <v-flex v-if="isNewActivity" text-md-center md8 ma-0 pa-0 >
                        <v-layout align-center row wrap class="pa-0 ma-0" >
                          <v-flex md6>
                            <v-text-field
                              v-model="activityName"
                              label="Activity Name"
                              type="text"
                            >
                            </v-text-field>
                          </v-flex>

                          <v-flex md6 class="pa-0 ma-0" >
                            <v-btn
                              small
                              round
                              color="info"
                              @click="addNewActivity()"
                            >
                              <v-icon>mdi-plus</v-icon>
                              Add
                            </v-btn>
                            <v-btn
                              pa-0
                              round
                              color="error"
                              small
                              @click="isNewActivity = false, resolve(false)"
                            >
                              Cancel
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      
                          
                      </v-flex>

                      <v-flex v-else class="text-md-right">
                        
                        <v-btn small round color="secondary" @click="isNewActivity = true">
                          <v-icon>mdi-plus</v-icon>
                          Add Activity
                        </v-btn>
                      </v-flex>
                    


                  </v-toolbar>
                  <v-divider></v-divider>
                  <v-list three-line>
                    <draggable 
                      class="list-group" 
                      ghost-class="ghost" 
                      :list="activities" 
                      :move="newCourseCheckMove" 
                      @start="isDragging=false" 
                      @end="isDragging=false"
                      handle=".handle">
                      <transition-group type="transition" :name="'flip-list'">
                        <div v-for="(act, index) in activities" :key="act.title">
                          <template >
                              <v-list-tile
                                avatar
                                ripple
                              >
                              <v-list-tile-action >
                                <v-icon v-if="act.title !== 'Orientation' && act.title !== 'Final Event' && act.title !== 'Payments'" class="handle">mdi-view-headline</v-icon>
                              </v-list-tile-action>

                              
                                <v-list-tile-content>
                                  <v-list-tile-title class="pb-1">{{ act.title }}</v-list-tile-title>

                                  <v-list-tile-sub-title class="mt-1">
                                    <v-layout row wrap align-center>
                                      <v-flex md5 text-md-left v-if="act.title !== 'Orientation' && act.title !== 'Final Event' && act.datePick === false">
                                        <v-btn-toggle v-model="act.dayOfWeek" v-for="(days, i) in weekOfDays" :key="i" >
                                          <v-btn  small color="info" :value="days.value">
                                            {{days.title}}
                                          </v-btn>
                                        </v-btn-toggle>
                                      </v-flex>

                                      <v-flex md v-if="act.title !== 'Orientation' && act.title !== 'Final Event'">
                                        <v-checkbox height="1" v-model="act.datePick" label="Pick Date"></v-checkbox>
                                      </v-flex>
                                    </v-layout>
                
                                  </v-list-tile-sub-title>
                                  <v-list-tile-sub-title>
                                    <v-layout row wrap>
                                      <v-flex md5  v-if="act.title !== 'Orientation' && act.title !== 'Final Event' && act.title !== 'Payments' && act.title !== 'Workshops' && act.title !== 'Workshop' && act.title !== 'Photoshoot' && act.title !== 'Photoshoots'">
                                        <v-btn-toggle v-model="act.actType">
                                          <v-btn class="text--white" small color="success" value="detailed">
                                            Time/Location/Details
                                          </v-btn>
                                          <v-btn small color="success" value="date range">
                                            Date Range
                                          </v-btn>
                                        </v-btn-toggle>
                                      </v-flex>
                                      <v-flex md3 v-if="act.actType === 'date range'">
                                      <div class="layout row">
                                        <span class="pt-3 pr-2">Duration(days): </span>
                                        <v-text-field
                                            v-model="act.duration"
                                            class="styled-input"
                                            id="styled-input"
                                            placeholder="Duration(days)"
                                            name="input-1"
                                            type="number"
                                          ></v-text-field>
                                      </div>
                                          
                                    
                                      </v-flex>
                                    </v-layout>
                                    
                                    

                                  </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                  <!-- <v-btn icon flat color="info">
                                    <v-icon>mdi-pencil</v-icon>
                                  </v-btn> -->
                                  <v-btn v-if="!act.primary" icon flat color="error" @click="removeActivity(index)">
                                    
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>


                                </v-list-tile-action>

                              </v-list-tile>


                              <v-divider
                                v-if="index + 1 < activities.length"
                                :key="index"
                              ></v-divider>
                            </template>
                        </div>
                      </transition-group>
                    </draggable>

                    
                  </v-list>
                </v-card>
              </v-form>
              
            </v-flex>
             
          </v-layout>

      </v-card-text>


      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click="openDialog = false, resolve(false)">Cancel</v-btn>
        <v-btn :loading="loadingProgress" dark class="text--black" color="secondary" round @click="saveCourse()">Save</v-btn>
      </v-card-actions>

    </v-card>
    <confirm ref="confirm"></confirm>
    <snackbar ref="prompt"></snackbar>
  </v-dialog>
</template>
<script>
import draggable from 'vuedraggable'
import Confirm from '@/components/widgets/ConfirmDialog'
import Snackbar from '@/components/widgets/Snackbar'

let id = 1;

export default {
  name: "simple",
  display: "Simple",
  order: 0,
  components: {
    draggable,
    Confirm,
    Snackbar
  },
  data: () => ({
    isEdit: false,
    resolve: null,
    reject: null,
    loadingProgress: false,
    valid: false,
    dragging: false,
    isDragging: true,
    isEditActivity: false,
    activityName: '',
    key: '',
    course: {
      courseName: '',
      activities: []
    },
    weekOfDays: [
      {title: 'M' , value: 'monday'},
      {title: 'T' , value: 'tuesday'},
      {title: 'W' , value: 'wednesday'},
      {title: 'TH' , value: 'thursday'},
      {title: 'F' , value: 'friday'},
      {title: 'SAT' , value: 'saturday'},
      {title: 'SUN' , value: 'sunday'}
    ],
    isNewActivity: false,
    openDialog: false,
    activities: [
      {
        title: 'Orientation',
        value: 'orientation',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: '',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: true
      },
      {
        title: 'Payments',
        value: 'payments',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: 'wednesday',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: true
      },
      {
        title: 'Photoshoot',
        value: 'photoshoot',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: 'saturday',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: false
      },
      {
        title: 'Photoliking',
        value: 'photoliking',
        actType: 'date range',
        datePick: false,
        day: '',
        dayOfWeek: 'friday',
        duration: '5',
        weekOfDays: false,
        dateRange: false,
        primary: false
      },
      {
        title: 'Workshops',
        value: 'workshops',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: 'saturday',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: false
      },
      {
        title: 'Final Event',
        value: 'final event',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: '',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: true
      }
    ]
  }), // end of data
  computed: {
    dragOptions() {
      return {
        animation: 150,
				ghostClass: 'ghost',
				chosenClass: 'chosen-ghost',
        group: 'label',
        disabled: this.editActivity
      }
    },
  },
  methods: {
    saveCourse () {
      if (this.isEdit) {
        // console.log('course edit')
        this.updateCourse()
      } else {
        this.addNewCourse()
      }
    },
    editCourse (course) {
      this.openDialog = true
      this.isEdit = true
      this.activities = course.activities
      this.course.courseName = course.courseName
      this.key = course['.key']
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    open() {
      this.openDialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    moved (evt) {
      // console.log(evt, 'evt')
      return true
    },
    newCourseCheckMove (evt) {
      return (evt.draggedContext.element.value !== 'orientation' &&
              evt.draggedContext.element.value !== 'payments' &&
              evt.draggedContext.futureIndex > 1 && 
							evt.draggedContext.element.value !== 'final event' &&  
							evt.draggedContext.futureIndex !== evt.relatedContext.list.length - 1
							)
		},
    capitalizeAct () {
			try {
				this.activityName = this.$store.getters['settings/titleCase'](this.activityName)
			} catch {}
    },
    addNewActivity () {
      this.activities.splice(2, 0, {
        title: this.$store.getters['settings/titleCase'](this.activityName),
        value: this.activityName.toLowerCase(),
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: '',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: false
      })
      this.isNewActivity = false
      this.activityName = ''
    },
    removeActivity (i) {
      this.activities.splice(i, 1)
    },
    updateCourse () {
      this.$refs.form.validate()  
      if (this.valid) {
        this.$refs.confirm.open('Confirm Save', 'Do you want to save?', { color: 'info' })
          .then(confirm => {
            if (confirm) {
              this.loadingProgress = true
              this.course.courseName = this.$store.getters['settings/titleCase'](this.course.courseName)
              this.course.activities = this.activities
              // console.log(this.course, 'course to update')
              this.$store.dispatch('settings/updateCourse', {key: this.key, course: this.course})
                .then(res => {
                  if (res) {
                    this.clearFields()
                    this.loadingProgress = false 
                    this.openDialog = false
                    this.resolve(res)
                  } else {
                    this.$refs.prompt.open('An error occur', { icon: 'mdi-alert', color: 'warning'})       
                    this.loadingProgress = false
                  }
                })
            }
          })
      } else {
        this.$refs.prompt.open('Please check fields', { icon: 'mdi-alert', color: 'warning'})
      }
    },
    addNewCourse () {
      // console.log(this.valid, 'valid')
      this.$refs.form.validate()  
      if (this.valid) {
         this.$refs.confirm.open('Confirm Save', 'Do you want to save?', { color: 'info' })
        .then((confirm) => {
          // console.log(confirm, 'confirm')
          if (confirm) {
            this.loadingProgress = true
            this.course.courseName = this.$store.getters['settings/titleCase'](this.course.courseName)
            this.course.activities = this.activities
            this.$store.dispatch('settings/addNewCourse', this.course)
              .then(res => {
                if (res) {
                  this.clearFields()
                  this.loadingProgress = false 
                  this.openDialog = false
                  this.resolve(res)
                } else {
                  this.$refs.prompt.open('An error occur', { icon: 'mdi-alert', color: 'warning'})       
                  this.loadingProgress = false   
                }
              })
          }
        })
      } else {
        this.$refs.prompt.open('Please check fields', { icon: 'mdi-alert', color: 'warning'})
      }
    },
    clearFields () {
      this.activityName = ''
      this.activities = [
      {
        title: 'Orientation',
        value: 'orientation',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: '',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: true
      },
      {
        title: 'Payments',
        value: 'payments',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: 'wednesday',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: true
      },
      {
        title: 'Photoshoot',
        value: 'photoshoot',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: 'saturday',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: false
      },
      {
        title: 'Photoliking',
        value: 'photoliking',
        actType: 'date range',
        datePick: false,
        day: '',
        dayOfWeek: 'friday',
        duration: '5',
        weekOfDays: false,
        dateRange: false,
        primary: false
      },
      {
        title: 'Workshops',
        value: 'workshops',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: 'saturday',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: false
      },
      {
        title: 'Final Event',
        value: 'final event',
        actType: 'detailed',
        datePick: false,
        day: '',
        dayOfWeek: '',
        duration: '',
        weekOfDays: false,
        dateRange: false,
        primary: true
      }
    ]
      
    },
    test () {}
  }
}
</script>

<style>
#styled-input {
  height: 5px;
  font-size: 12pt;
}
.styled-input label[for] {
  height: 5px;
  font-size: 8pt;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.0;
  background: #c8ebfb;
}
.chosen-ghost {
  opacity: 0.2;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
