import Vue from 'vue'

export const addNewLocation = ({commit, state}, location) => {
  return new Promise(resolve => {
    var fs = Vue.prototype.$fs
    fs.collection('locations').add(location)
      .then(() => {
        resolve(true)
      })
      .catch(err => {
        resolve(null)
      })
  })
}

export const removeCourse = ({commit, state}, key) => {
  return new Promise (resolve => {
    var fs = Vue.prototype.$fs
    fs.collection('courses').doc(key).delete()
      .then(() => {
        resolve(true)
      })
      .catch(err => {
        resolve(null)
      })
  }) 
}

export const updateCourse = ({commit, state}, {key, course}) => {
  return new Promise (resolve => {
    console.log(key, course, 'to update')
    delete course['.key']
    var fs = Vue.prototype.$fs
    fs.collection('courses').doc(key).update(course)
      .then(() => {
        course['.key'] = key
        resolve(course)
      })
      .catch(err => {
        resolve(null)
      })
  }) 
}

export const addNewCourse = ({commit, state}, course) => {
  return new Promise (resolve => {
    var fs = Vue.prototype.$fs
    fs.collection('courses').add(course)
      .then(() => {
        resolve(true)
      })
      .catch(err => {
        resolve(false)
      })
  }) 
  
}

// export const updateCourse = ({commit, state}, course) => {
//   new Promise ((resolve, reject) => {
//     const db = Vue.prototype.$database
//     const quasu = Vue.prototype.$q
//     state.activityLoading = true
//     var key = course['.key']
//     delete course['.key']
//     console.log('course', course)
//     // console.log('payload in action', payload)
//     db.ref(`settings/courses`).child(key).update(course)
//       .then(() => {
//         quasu.notify({
//           message: `${course.courseName} has been succesfully updated`,
//           type: 'positive',
//           color: 'positive',
//           textColor: 'white',
//           icon: 'info'
//         })
//         state.activityLoading = false
//         course['.key'] = key
//         resolve(course)
//       })
//       .catch((err) => {
//         quasu.notify({
//           message: `An Error Occured`,
//           type: 'negative',
//           color: 'negative',
//           textColor: 'white',
//           icon: 'warning'
//         })
//         state.activityLoading = false
//         reject()
//         console.log('error', error)
//       })
//   })
// }

export const saveNewCourse2 = ({commit, state}, payload) => {
  return new Promise(resolve => {
    const db = Vue.prototype.$database
    const quasu = Vue.prototype.$q
    state.activityLoading = true
    console.log('payload in action', payload)
    db.ref(`settings/courses`).push(payload)
      .then((result) => {
        quasu.notify({
          message: `${payload.courseName} has been succesfully added`,
          type: 'positive',
          color: 'positive',
          textColor: 'white',
          icon: 'info'
        })
        state.activityLoading = false
        state.newCourseModal = false
        resolve(result.key)
      })
      .catch((err) => {
        quasu.notify({
          message: `An Error Occured`,
          type: 'negative',
          color: 'negative',
          textColor: 'white',
          icon: 'warning'
        })
        state.activityLoading = false
        state.newCourseModal = false
        console.log('error', error)
      })
  })
  
}


// export const addNewCourse = ({commit, state}, {payload, fireb, quasu}) => {
//   state.activityLoading = true
//   let newCourse = {
//     courseName: payload,
//     courseValue: payload.toLowerCase(),
//     activities: [
//       {
//         dayAfter: {
//           dateNumber: '0',
//           dateType: 'days'
//         },
//         label: 'Orientation',
//         details: false,
//         dueDate: false,
//         eventType: payload.toLowerCase(),
//         location: true,
//         time: true,
//         value: 'orientation',
//         visible: true
//       },
//       {
//         dayAfter: {
//           dateNumber: '1',
//           dateType: 'weeks'
//         },
//         label: 'Payment',
//         details: false,
//         dueDate: false,
//         eventType: payload.toLowerCase(),
//         location: false,
//         time: false,
//         value: 'payment',
//         visible: true
//       },
//       {
//         label: 'Photoshoot',
//         dayAfter: {
//           dateNumber: '3',
//           dateType: 'days'
//         },
//         details: false,
//         dueDate: false,
//         eventType: payload.toLowerCase(),
//         location: true,
//         time: true,
//         value: 'photoshoot',
//         visible: true
//       },
//       {
//         label: 'Photoliking',
//         dayAfter: {
//           dateNumber: '2',
//           dateType: 'days'
//         },
//         details: false,
//         dueDate: true,
//         eventType: payload.toLowerCase(),
//         location: false,
//         time: false,
//         value: 'photoliking',
//         visible: true
//       },
//       {
//         dayAfter: {
//           dateNumber: '0',
//           dateType: 'days'
//         },
//         label: 'Workshop',
//         details: true,
//         dueDate: false,
//         eventType: payload.toLowerCase(),
//         location: true,
//         time: true,
//         value: 'workshop',
//         visible: true
//       },
//       {
//         dayAfter: {
//           dateNumber: '0',
//           dateType: 'days'
//         },
//         label: 'General Rehersal',
//         details: false,
//         dueDate: false,
//         eventType: payload.toLowerCase(),
//         location: true,
//         time: true,
//         value: 'general rehersal',
//         visible: true
//       },
//       {
//         dayAfter: {
//           dateNumber: '0',
//           dateType: 'days'
//         },
//         label: 'Final Event',
//         details: false,
//         dueDate: false,
//         eventType: payload.toLowerCase(),
//         location: true,
//         time: true,
//         value: 'final event',
//         visible: true
//       },
//     ]
//   }
//   // console.log('newcourse', newCourse)
//   fireb.ref(`settings/courses`).push(newCourse)
//     .then(() => {
//       quasu.notify({
//         message: `${payload} has been succesfully added`,
//         type: 'positive',
//         color: 'positive',
//         textColor: 'white',
//         icon: 'info'
//       })
//       state.activityLoading = false
//       state.newCourseModal = false
//     })
//     .catch((err) => {
//       quasu.notify({
//         message: `An Error Occured`,
//         type: 'negative',
//         color: 'negative',
//         textColor: 'white',
//         icon: 'warning'
//       })
//       state.activityLoading = false
//       state.newActivityModal = false
//       console.log('error', error)
//     })
// }

// export const removeCourse = ({commit, state}, {payload, fireb, quasu}) => {
//   console.log('payload', payload)
//   let key = payload['.key']
//   fireb.ref(`settings/courses/${key}`).remove()
//     .then(() => {
//       quasu.notify({
//         message: `${payload.courseName} hs been removed`,
//         type: 'info',
//         color: 'info',
//         textColor: 'white',
//         icon: 'info'
//       })
//     })
//     .catch(err => {
//       quasu.notify({
//         message: `An Error occur`,
//         type: 'info',
//         color: 'info',
//         textColor: 'white',
//         icon: 'info'
//       })
//       console.log('err', err)
//     })
// }

export const addActivities = ({state, getters}, {activity, dayAfter, status, course}) => {
  let fireb = Vue.prototype.$database
  let q = Vue.prototype.$q
  let newActivity = {
    dayAfter: dayAfter,
    label: getters['titleCase'](activity),
    value: activity.toLowerCase(),
    // order: course.activities.length + 1,
    details: status.details,
    dueDate: status.dueDate,
    location: status.location,
    time: status.time,
    visible: true
  }
  course.activities.splice(5, 0, newActivity);
  // course.activities.push(newActivity)
  let key = course['.key']
  delete course['.key']
  console.log('new', course)
  fireb.ref('settings/courses').child(key).update(course)
    .then(() => {
      q.notify({
        message: `${activity} hs been added`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
      state.activitiesModal = false
    })
    .catch(err => {
      q.notify({
        message: `An Error occur`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
      console.log('err', err)
      state.activitiesModal = false
    })
}
// export const removeActivities = ({state}, {payload, fireb, quasu}) => {
//   console.log('payload', payload)
//   let key = payload['.key']
//   fireb.ref(`settings/activityList/${key}`).remove()
//     .then(() => {
//       quasu.notify({
//         message: `${payload.label} hs been removed`,
//         type: 'info',
//         color: 'info',
//         textColor: 'white',
//         icon: 'info'
//       })
//     })
//     .catch(err => {
//       quasu.notify({
//         message: `An Error occur`,
//         type: 'info',
//         color: 'info',
//         textColor: 'white',
//         icon: 'info'
//       })
//       console.log('err', err)
//     })
// }

export const addNewEventActivity = ({commit,state}, {payload, fireb, quasu}) => {
	state.activityLoading = true
	// let eventType = payload.eventType
  let key = payload['.key']
  delete payload['.key']
  delete payload.courseName
  delete payload.courseValue
  console.log('activity', payload)
  console.log(`settings/courses/${key}`)
	fireb.ref(`settings/courses/${key}`).update(payload)
		.then(() => {
			quasu.notify({
        message: `${payload.courseName} has been succesfully updated`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
      state.activityLoading = false
      state.newActivityModal = false
		})
		.catch((err) => {
      quasu.notify({
        message: `An Error Occured`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      state.activityLoading = false
      state.newActivityModal = false
      console.log('error', error)
		})
}

// kids fashion actions
export const editActivity = ({getters, state}, {course, activity, index, dayAfter, status}) => {
  state.activityLoading = true
  let fireb = Vue.prototype.$database
  let q = Vue.prototype.$q
  let _ = Vue.prototype.$lodash
  let updatedActivity = {
    dayAfter: dayAfter,
    // label: getters['titleCase'](activity),
    // value: activity.toLowerCase(),
    details: status.details,
    dueDate: status.dueDate,
    location: status.location,
    time: status.time,
    visible: true
  }
  let key = course['.key']
  // console.log('index', index)
	fireb.ref(`settings/courses/${key}/activities/${index}`).set(updatedActivity)
		.then(() => {
			q.notify({
        message: `${activity} has been updated`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
      state.activityLoading = false
      state.activitiesModal = false
		})
		.catch((err) => {
      q.notify({
        message: `An Error Occured`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      state.activityLoading = false
      state.activitiesModal = false
      console.log('error', err)
		})
}

export const removeActivity = ({state}, {course, activity}) => {
  let fireb = Vue.prototype.$database
  let q = Vue.prototype.$q
  let _ = Vue.prototype.$lodash
  let key = course['.key']
  var i = _.findIndex(course.activities, a => {
    return a.label === activity.label || a.value === activity.value
  })
  course.activities.splice(i,1)
  let updatedActivity = course.activities
  // console.log('upa', updatedActivity)
	fireb.ref(`settings/courses/${key}/activities`).set(updatedActivity)
    .then(() => {
      q.notify({
        message: `${activity.label} hs been deleted`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
    })
    .catch(err => {
      q.notify({
        message: `An Error occur`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
      console.log('err', err)
    })
}

export const saveArrangement = ({state}, course) => {
  let fireb = Vue.prototype.$database
  let q = Vue.prototype.$q
  let activities = {...course.activities}
  let key = course['.key']
  console.log('act', activities)
  fireb.ref(`settings/courses/${key}/activities`).set(activities)
    .then(() => {
      q.notify({
        message: `${course.courseName} hs been updated`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
      state.arrangeModal = false
    })
    .catch(err => {
      q.notify({
        message: `An Error occur`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
      console.log('err', err)
      state.arrangeModal = false
    })
}
