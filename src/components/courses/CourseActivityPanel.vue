<template>
  <v-card dark>
    <v-toolbar color="blue-grey" dark flat dense cad>
      <v-toolbar-title class="subheading">{{course ? course.courseName : '' }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn @click="test()">
        test
      </v-btn> -->


       <v-btn 
        color="success"
        depressed
        small
        round 
        @click="editCourseDialog">
        <v-icon mr-1>mdi-pencil</v-icon>
        Edit
        <edit-course-modal ref="editCourseModal"></edit-course-modal>
      </v-btn>

      <v-btn
        color="error"
        depressed
        small
        round
        @click="removeCourse"
      >
        <v-icon mr-1>mdi-delete</v-icon>
        Remove
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-list three-line>
        <template v-for="(act, index) in course.activities">
          <v-list-tile
            :key="act.title"
            ripple
            @click="test"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ act.title }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-layout row wrap align-center>
                  <v-flex md5 text-md-left v-if="act.title !== 'Orientation' && act.title !== 'Final Event' && act.datePick === false">
                    <v-btn-toggle v-model="act.dayOfWeek" v-for="(days, i) in weekOfDays" :key="i" >
                      <v-btn disabled small color="info" :value="days.value">
                        {{days.title}}
                      </v-btn>
                    </v-btn-toggle>
                  </v-flex>

                  <v-flex md v-if="act.title !== 'Orientation' && act.title !== 'Final Event'">
                    <v-checkbox v-if="act.datePick" disabled height="1" v-model="act.datePick" label="Pick Date"></v-checkbox>
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

          </v-list-tile>
            <v-divider
              v-if="index + 1 < course.activities.length"
              :key="index"
            ></v-divider>
          </template>


        </v-list>
    </v-card-text>

    <v-divider></v-divider>
    <snackbar ref="prompt"></snackbar>
    <confirm ref="confirm"></confirm>
  </v-card>
</template>
<script>
import EditCourseModal from '@/components/courses/NewCourseModal'
import Snackbar from '@/components/widgets/Snackbar'
import Confirm from '@/components/widgets/ConfirmDialog'

export default {
  props: {
    course: {
      type: Object,
      default: {}
    }
  },
  firestore () {
    return {
      courses: this.$fs.collection('courses')
    }
  },
  components: {
    EditCourseModal,
    Snackbar,
    Confirm
  },
  data: () => ({
    selected: [2],
    weekOfDays: [
      {title: 'M' , value: 'monday'},
      {title: 'T' , value: 'tuesday'},
      {title: 'W' , value: 'wednesday'},
      {title: 'TH' , value: 'thursday'},
      {title: 'F' , value: 'friday'},
      {title: 'SAT' , value: 'saturday'},
      {title: 'SUN' , value: 'sunday'}
    ],
  }),// end of data
  methods: {
    editCourseDialog () {
      this.$refs.editCourseModal.editCourse(this.course)
        .then(res => {
          if (res) {
            // console.log(res, 'res')
            // this.course = res
            this.$emit('update-course', res)
            this.$refs.prompt.open('Course Saved', { icon: 'mdi-information', color: 'success'})
          }
        })
    },
    removeCourse () {
      this.$refs.confirm.open('Remove', `Do you want to remove ${this.course.courseName}`, { color: 'error' })
        .then(confirm => {
          if (confirm) {
            this.$store.dispatch('settings/removeCourse', this.course['.key'])
              .then(res => {
                  this.$emit('update-course', this.$_.head(this.courses))
                  this.$refs.prompt.open('Course Removed', { icon: 'mdi-information', color: 'success'})
              })
          }
        })
    },
    test () {
      console.log(this.courses, 'courssd es')
    }
  } // end of method
}
</script>
