import Vue from 'vue'
// import VueRouter from 'vue-router'

export const removeEvent = ({}, {event, collection}) => {
  return new Promise((resolve, reject) => {
    var fs = Vue.prototype.$fs
    let storageRef = Vue.prototype.$firebase.storage().ref()
    let key = event['.key']
    let imagePath = `pagePhotos/${event.eventCode}_${event.eventName}`
    
    console.log(key, imagePath, 'to remove')

    storageRef.child(imagePath).delete()
      .then(() => {
         fs.collection(collection).doc(key).delete()
          .then(() => {
            resolve(true)
          })
          .catch(err => {
            resolve(err)
          })
      })
      .catch(err => {
        console.log(err, 'err')
        resolve(null)
      })

   
  })
}

export const updateEvent = ({state}, {key, event, eventLogo}) => {
  return new Promise(function (resolve, reject) {
    let fs = Vue.prototype.$fs
    let storageRef = Vue.prototype.$firebase.storage().ref()

    // console.log(event, eventLogo, 'event')
    if (eventLogo) {
      let uploadTask = storageRef.child(`pagePhotos/${event.eventCode}_${event.eventName}`).put(eventLogo.file)
      uploadTask.on('state_changed', function(snapshot){
        var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, function (error) {
        console.log('error occur', error)
        reject(error)
      }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          event.pagePhotos.eventLogoUrl = downloadURL
          fs.collection('events').doc(key).update(event)
            .then(snapshot => { 
              resolve(true)
            })
            .catch(err => {
              console.log(err, 'an error occur')
              reject(err)
            })
        })
      })
    } else {
      fs.collection('events').doc(key).update(event)
        .then(() => { 
          resolve(true)
        })
        .catch(err => {
          console.log(err, 'an error occur')
          reject(err)
        })
    }
  })
}

export const addNewEvent = ({state}, {event, eventLogo}) => {
  return new Promise(function (resolve, reject) {
    let fs = Vue.prototype.$fs
    let storageRef = Vue.prototype.$firebase.storage().ref()

    
    event.pagePhotos = {}
    event.pagePhotos.eventLogoUrl = ''
    // console.log(event, eventLogo, 'new event')
    let uploadTask = storageRef.child(`pagePhotos/${event.eventCode}_${event.eventName}`).put(eventLogo.file)
    uploadTask.on('state_changed', function(snapshot){
      var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, function (error) {
      console.log('error occur', error)
      reject(error)
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        // console.log(downloadURL, 'url')
        event.pagePhotos.eventLogoUrl = downloadURL
        fs.collection('events').add(event)
          .then(snapshot => { 
            // console.log(snapshot, 'snap')
            resolve(snapshot.id)
          })
          .catch(err => {
            console.log(err, 'an error occur')
            reject(err)
          })
      })
    })
  })
}

export const setupEvents = ({commit}, payload) => {
	commit('setEvents', payload)
}
export const openEventPageModal = ({commit}) => {
	commit('updateEventPageModal', true)
}
export const updatePages = ({commit}, payload) => {
	commit('updatePages', payload)
}

export const addEventPage = ({commit}, {payload, pageData, whatThis, quasu}) => {
	commit('updateEventPageLoading', true)
	let DB3 = whatThis
  let event = Object.assign({}, payload)
  var key = event['.key']
  delete event['.key']
  event.page = pageData

  console.log('DB3', DB3)
  console.log('event in action', event)
  DB3.ref('events').child(key).update(event)
    .then(() => {
      commit('updateEventPageLoading', false)
      commit('updateEventPageModal', false)
      quasu.notify({
        message: `${event.eventName} has been succesfully updated`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
    })
    .catch(error => {
      commit('updateEventPageLoading', false)
      commit('updateEventPageModal', false)
      quasu.notify({
        message: `An Error Occured`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', error)
    })
}

export const updateEventPhotos = ({commit}, {payload, whatThis, quasu}) => {
  let DB3 = whatThis
  let event = Object.assign({}, payload)
  var key = event['.key']
  delete event['.key']
  console.log('key in action', key)
  console.log('event in action', event)
  setTimeout(() => {
    Vue.prototype.$database.ref(`events/${key}`).update(event)
      .then(() => {
        commit('updateEventPageLoading', false)
        commit('updateEventPagePhotosModal', false)
        quasu.notify({
          message: `${event.eventName} has been succesfully updated`,
          type: 'positive',
          color: 'positive',
          textColor: 'white',
          icon: 'info'
        })
      })
      .catch(error => {
        commit('updateEventPageLoading', false)
        commit('updateEventPagePhotosModal', false)
        quasu.notify({
          message: `An Error Occured`,
          type: 'negative',
          color: 'negative',
          textColor: 'white',
          icon: 'warning'
        })
        console.log('error', error)
      })  
  }, 3000)
  
}
// event pages photos
export const updatePagePhotos = ({commit}, payload) => {
  commit('updatePagePhotos', payload)
}

// export const updateEvent = ({commit}, payload) => {
//   commit('updateEvent', payload)
// }

// season actions
export const updateSeasonModal = ({commit}, payload) => {
  commit('seasonModal', payload)
}
export const addNewSeason = ({state}) => {
  // if season is only 1
  let $database = Vue.prototype.$database
  let $q = Vue.prototype.$q
  function removeComma (total) {
    return total.replace(',', '')
  }
  var key = state.newSeason.eventKey
  // console.log('season', state.newSeason)
  let seasonActivities = {...state.newSeason}
  for (var i = 0; i < state.newSeasonActivities.length; i++) {
    state.newSeasonActivities[i].batch = 1
    state.newSeasonActivities[i].startDate = state.newSeasonActivities[i].startDate.toString()
    state.newSeasonActivities[i].endDate = state.newSeasonActivities[i].endDate.toString()
    state.newSeasonActivities[i].dueDate = state.newSeasonActivities[i].dueDate ? state.newSeasonActivities[i].dueDate.toString() : ''
    state.newSeasonActivities[i].time = state.newSeasonActivities[i].time ? state.newSeasonActivities[i].time.toString() : ''
    state.newSeasonActivities[i].updated = false
  }
  seasonActivities.activities = state.newSeasonActivities
  seasonActivities.batchNumber = 1
  seasonActivities.batchStart = state.newSeasonActivities[0].startDate
  seasonActivities.totalAmount = removeComma(state.newSeason.totalAmount)
  state.newSeason.totalAmount = removeComma(state.newSeason.totalAmount)
  console.log('season activities in aciton', seasonActivities)
  
  var seasonNumber = state.newSeason.seasonNumber
    --seasonNumber
  console.log('new season in aciton', state.newSeason)
  console.log('season number', seasonNumber)
  $database.ref(`events/${key}/seasons/${seasonNumber}`).set(state.newSeason)
    .then(() => {
      $database.ref(`event_schedules`).push(seasonActivities)
        .then(() => {
          $q.notify({
            message: `${state.newSeason.seasonName} Batch 1 has been added`,
            type: 'positive',
            color: 'positive',
            textColor: 'white',
            icon: 'info'
          })
        })
    })
    .catch(error => {
      $q.notify({
        message: `We got an error`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', error)
    })
  state.isNewSeasonActivities = false
}

export const updateSeason = ({commit}, {payload,seasonNumber,fireb, quasu}) => {
  // commit('seasonLoading', true)
  let season = Object.assign({}, payload)
  var key = season.eventKey
  // delete season.__index
  console.log('season to update', season)
  console.log('season in action', `event/${key}/seasons/${seasonNumber}`)
  fireb.ref(`events/${key}/seasons/${seasonNumber}`).update(season)
    .then(() => {
      commit('seasonLoading', false)
      commit('seasonModal', false)
      quasu.notify({
        message: `${season.eventName} has been succesfully updated`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
    })
    .catch(error => {
      commit('seasonLoading', false)
      commit('seasonModal', false)
      quasu.notify({
        message: `An Error Occured`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', error)
    })
}

export const deleteSeason = ({commit}, {payload, key, index, fireb, quasu}) => {
  quasu.dialog({
    title: 'Delete Confirmation',
    message: `Do you want to delete ${payload.seasonName}?`,
    ok: 'Yes',
    cancel: 'No'
  }).then(() => {
      fireb.ref(`events/${key}/seasons/${index}`).remove()
        .then(() => {
          quasu.notify({
            message: `${payload.eventName} deleted`,
            type: 'info',
            color: 'info',
            textColor: 'white',
            icon: 'info'
          })
        })
        .catch(err => {
          quasu.notify({
            message: `An Error occur`,
            type: 'info',
            color: 'info',
            textColor: 'white',
            icon: 'info'
          })
          console.log('err', err)
        })
    }).catch(() => {})
}

export const deleteSeason2 = (state, {eventKey, seasonNo}) => {
 let db = Vue.prototype.$database
 let q = Vue.prototype.$q
 console.log('eventkey', eventKey)
 console.log('seas', seasonNo)
 db.ref(`events/${eventKey}/seasons/${seasonNo-1}`).remove()
  .then(() => {
    q.notify({
      message: `Season ${seasonNo} has been removed`,
      type: 'info',
      color: 'info',
      textColor: 'white',
      icon: 'info'
    })
  })
  .catch(err => {
    q.notify({
      message: `An Error occur`,
      type: 'negative',
      color: 'negative',
      textColor: 'white',
      icon: 'info'
    })
    console.log('err', err)
  })
}

export const finishedSeason = ({commit}, {payload, fireb, quasu}) => {
  fireb.ref('finished_season').push(payload)
    .then(() => {
      quasu.notify({
        message: `${payload.eventName} Season ${payload.seasonNumber} has been finished`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
    })
    .catch(err => {
      quasu.notify({
        message: `An Error occur`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
      console.log('err', err)
    })
  fireb.ref('events')
}

export const addNewBatch = (state, batch) => {
  let $database = Vue.prototype.$database
  let $q = Vue.prototype.$q
  delete batch['.key']
  console.log('batch in action', batch)
  $database.ref('event_schedules').push(batch)
    .then(() => {
      $q.notify({
        message: `Batch ${batch.batchNumber} has been created`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
      state.newSeasonActivities = []
    })
    .catch(err => {
      quasu.notify({
        message: `An Error occur`,
        type: 'info',
        color: 'info',
        textColor: 'white',
        icon: 'info'
      })
      console.log('err', err)
    })
}

export const launchSeason = (state, season) => {
  let db = Vue.prototype.$database
  let q = Vue.prototype.$q
  console.log('season to launch', season)
  db.ref(`events/${season.eventKey}/seasons/${season.seasonNumber-1}/status`).set('open')
    .then(() => {
      q.notify({
        message: `Season ${season.seasonNumber} has been launched`,
        type: 'positive',
        color: 'positive',
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

export const standBySeason = (state, season) => {
  let db = Vue.prototype.$database
  let q = Vue.prototype.$q
  db.ref(`events/${season.eventKey}/seasons/${season.seasonNumber-1}/status`).set('standby')
    .then(() => {
      q.notify({
        message: `Season ${season.seasonNumber} has been cancelled`,
        type: 'positive',
        color: 'positive',
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

export const updateSeasonBatches = (state, batches) => {
  console.log('batches in actions', batches)
  let db = Vue.prototype.$database
  console.log('database', db)
  for (var i = 0; i < batches.length; i++) {
    var batchKey = batches[i]['.key']
    console('batchkey', batchKey)
    let activities = batches[i].activities
    for (var j = 0; j < activities.length; j++) {
      activities[j].startDate = activities[j].startDate.toString()
      activities[j].endDate = activities[j].endDate.toString()
      activities[j].dueDate = activities[j].dueDate ? activities[j].dueDate.toString() : ''
      activities[j].time = activities[j].time ? activities[j].time.toString() : ''
    }
    console.log('act', activities)
    setTimeout(() => {
      db.ref(`event_schedules/${batchKey}/activities`).update(activities)
      .then(() => {
        console.log('success')
      })
      .catch((err) => {
        console.log('error', err)
        return
      })
    }, 1000)
  }
}

