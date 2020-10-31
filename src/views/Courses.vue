<template>
  <div id="page-course">
    <v-layout row class="align-center layout px-4 pt-3 app--page-header">
        <div>
          <h2 class="pr-3">Courses</h2>
        </div>

      <v-icon>mdi-home-outline</v-icon>
      <v-breadcrumbs large :items="items" divider=">"></v-breadcrumbs>

      <v-spacer></v-spacer>
      <!-- <v-btn @click="test()">
        test
      </v-btn> -->

      <v-btn color="secondary" dark @click="openNewCourseDialog">
        <v-icon mr-1>mdi-book-plus</v-icon>
        New Course
        <new-course-modal ref="newCourseModalRef" :openDialog="newCourseDialog"></new-course-modal>
      </v-btn>

      
    </v-layout>
  
    <v-container grid-list-xl fluid>
      <v-layout>
        <v-flex xs12 sm12 md3 >
          <v-card class="mb-4">
            <v-toolbar color="accent" dark flat dense cad>
              <v-toolbar-title class="subheading">Course List</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>

              <v-list>
                <template v-for="(course, index) in courses">
                  <v-list-tile
                    :key="course.title"
                    ripple
                    @click="onSelectCourse(course)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ course.courseName }}</v-list-tile-title>
                    </v-list-tile-content>

                  </v-list-tile>

                    <v-divider
                      v-if="index + 1 < courses.length"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list>


            </v-card-text>       
          </v-card>
        </v-flex>

        <v-flex grow>
          <course-activities :course="selectedCourse" @update-course="onUpdateCourse"></course-activities>
        </v-flex>
        <on-page-loading ref="loading"></on-page-loading>
        
        <snackbar ref="prompt"></snackbar>
      </v-layout>
    </v-container>
     

  </div>


</template>

<script>
import CourseActivities from '@/components/courses/CourseActivityPanel'
import NewCourseModal from '@/components/courses/NewCourseModal'
import Snackbar from '@/components/widgets/Snackbar'
import OnPageLoading from '@/components/widgets/OnPageLoading'

export default {
  components: {
    CourseActivities,
    NewCourseModal,
    Snackbar,
    OnPageLoading
  },
  firestore () {
    return {
      courses: 
      {
        ref: this.$fs.collection('courses').orderBy('courseName', 'asc'),
        object: true,
        resolve: (data) => {
          // console.log(data, 'resolve data')
          this.loadCourse(data)
          this.$refs.loading.onLoadingState(false)
        },
        reject: (err) => {
          this.$refs.prompt.open(`An error occur - ${err}`, { icon: 'mdi-alert', color: 'warning'})
        }
      }
    }
  },
  data: () => ({
    selectedCourse: {},
    newCourseDialog: false,
    items: [
      {
        text: 'Home',
        disabled: false,
        to: '/dashboard',
        exact: true
      },
      {
        text: 'Courses',
        disabled: false,
        to: '/courses',
        exact: true
      }
    ],
    selected: [2],
  }), // end of data
  methods: {
    onUpdateCourse (course) {
      this.selectedCourse = course
    },
    openNewCourseDialog () {
      this.$refs.newCourseModalRef.open()
        .then(res => {
          if (res) {
            this.$refs.prompt.open('Course Saved', { icon: 'mdi-information', color: 'success'})
          }
        })
    },
    loadCourse (course) {
      this.selectedCourse = course[0]
    },
    onSelectCourse (course) {
      console.log(this.selectedCourse, 'course')
      this.selectedCourse = course
    },
    test () {
      console.log(this.$refs.loading, 'loading')

    }
  }// end of methods
}
</script>

