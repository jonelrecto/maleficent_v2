import Vue from 'vue'

export const updateEventSeasonEndDate = ({}, {eventKey, seasonNumber, seasonEnd}) => {
	return new Promise(resolve => {
		let db = Vue.prototype.$database
		console.log(eventKey, seasonNumber, seasonEnd, 'e, s, e')
		console.log(seasonNumber-1, 'season no')
		db.ref(`events/${eventKey}/seasons/${seasonNumber-1}/seasonEnd`).set(seasonEnd)
			.then(() => {
				resolve(200)
			})
	})
} 

export const updateEditBatch = ({}, batchToUpdate) => {
	return new Promise (resolve => {
		let db = Vue.prototype.$database
		let q = Vue.prototype.$q
		const key = batchToUpdate['.key']
		delete batchToUpdate['.key']
		console.log(batchToUpdate, key , 'batchToUpdate')
		db.ref('event_schedules').child(key).update(batchToUpdate)
			.then(() => {
	      q.notify({
	        message: `Batch ${batchToUpdate.batchNumber} has been updated`,
	        type: 'positive',
	        color: 'positive',
	        textColor: 'white',
	        icon: 'info'
	      })
				resolve(200)
	    })
	    .catch(err => {
	    	q.notify({
	        message: `We got an error`,
	        type: 'negative',
	        color: 'negative',
	        textColor: 'white',
	        icon: 'warning'
	      })
	      console.log('error', error)
	    })
	})
	
}

export const removeSeasonDraftAfterSave = ({}, key) => {
	let db = Vue.prototype.$database
	let q = Vue.prototype.$q

	return new Promise(resolve => {
		// console.log('remove draft key' , key)
		db.ref('seasonDraftTemplate').child(key).remove()
			.then(() => {
				// q.notify({
	   //      message: ``,
	   //      type: 'positive',
	   //      color: 'positive',
	   //      textColor: 'white',
	   //      icon: 'info'
	   //    })
	   		// console.log('season draft removed')
	      resolve(true)
	    })
	    .catch(error => {
	      q.notify({
	        message: `We got an error`,
	        type: 'negative',
	        color: 'negative',
	        textColor: 'white',
	        icon: 'warning'
	      })
	      console.log('error', error)
	    })
	})
}

export const updateAsDraft = ({}, {key, draft}) => {
	let db = Vue.prototype.$database
	let q = Vue.prototype.$q

	console.log('udpate draft' , draft)
	db.ref('seasonDraftTemplate').child(key).set(draft)
		.then(() => {
			q.notify({
        message: `Successfully saved as draft`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
    })
    .catch(error => {
      q.notify({
        message: `We got an error`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', error)
    })
}

export const saveAsDraft = ({}, draft) => {
	let db = Vue.prototype.$database
	let q = Vue.prototype.$q

	console.log('draft' , draft)
	db.ref('seasonDraftTemplate').push(draft)
		.then(() => {
			q.notify({
        message: `Successfully saved as draft`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
    })
    .catch(error => {
      q.notify({
        message: `We got an error`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', error)
    })
}

export const saveNewBatch = ({commit}, newBatch) => {
	let db = Vue.prototype.$database
	let q = Vue.prototype.$q
	console.log(newBatch, 'newBatch')

	db.ref(`event_schedules`).push(newBatch)
    .then(() => {
      q.notify({
        message: `Batch ${newBatch.batchNumber} has been added`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
    })
    .catch(err => {
    	q.notify({
        message: `We got an error`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', error)
    })
}

export const saveNewSeasonBatchActivity = ({commit}, newSeason) => {
	// let db = Vue.prototype.$database
	// let q = Vue.prototype.$q
	// console.log('new Season', newSeason)
	// return new Promise((resolve, reject) => {
	// 	db.ref('event_schedules').push(newSeason)
	// 	.then(() => {
	// 		q.notify({
 //        message: `${newSeason.seasonName} has been saved`,
 //        type: 'positive',
 //        color: 'positive',
 //        textColor: 'white',
 //        icon: 'info'
 //      })
 //      resolve()
	// 	})
	// 	.catch(err => {
	// 		q.notify({
 //        message: `An Error Occured`,
 //        type: 'negative',
 //        color: 'negative',
 //        textColor: 'white',
 //        icon: 'warning'
 //      })
	// 		console.log('an error occured')
	// 		reject(err)
	// 	})
	// })


	let $database = Vue.prototype.$database
  let $q = Vue.prototype.$q
  function removeComma (total) {
    return total.replace(',', '')
  }

  let newEventSeason = {
  	colorCode: newSeason.colorCode,
  	course: newSeason.course,
  	discount: newSeason.discount,
  	eventKey: newSeason.eventKey,
  	eventName: newSeason.eventName,
  	numberOfPayments: newSeason.numberOfPayments,
  	numberOfWorkshops: newSeason.numberOfWorkshops,
  	seasonEnd: newSeason.seasonEnd,
  	seasonName: newSeason.seasonName,
  	seasonNumber: newSeason.seasonNumber,
  	seasonStart: newSeason.seasonStart,
  	status: 'standby',
  	ticketCount: newSeason.ticketCount,
  	ticketPrice: newSeason.ticketPrice,
  	totalAmount: newSeason.totalAmount
  }
  console.log('neweventseason', newEventSeason)
  console.log('newSeason', newSeason)
  var key = newSeason.eventKey
  var seasonNumber = newSeason.seasonNumber
  seasonNumber--
  // console.log('season', state.newSeason)
  // let seasonActivities = {...state.newSeason}
  // for (var i = 0; i < state.newSeasonActivities.length; i++) {
  //   state.newSeasonActivities[i].batch = 1
  //   state.newSeasonActivities[i].startDate = state.newSeasonActivities[i].startDate.toString()
  //   state.newSeasonActivities[i].endDate = state.newSeasonActivities[i].endDate.toString()
  //   state.newSeasonActivities[i].dueDate = state.newSeasonActivities[i].dueDate ? state.newSeasonActivities[i].dueDate.toString() : ''
  //   state.newSeasonActivities[i].time = state.newSeasonActivities[i].time ? state.newSeasonActivities[i].time.toString() : ''
  //   state.newSeasonActivities[i].updated = false
  // }
  // seasonActivities.activities = state.newSeasonActivities
  // seasonActivities.batchNumber = 1
  // seasonActivities.batchStart = state.newSeasonActivities[0].startDate
  // seasonActivities.totalAmount = removeComma(state.newSeason.totalAmount)
  // state.newSeason.totalAmount = removeComma(state.newSeason.totalAmount)
  // console.log('season activities in aciton', seasonActivities)
  
  // var seasonNumber = state.newSeason.seasonNumber
  //   --seasonNumber
  // console.log('new season in aciton', state.newSeason)
  // console.log('season number', seasonNumber)



  $database.ref(`events/${key}/seasons/${seasonNumber}`).set(newEventSeason)
    .then(() => {
      $database.ref(`event_schedules`).push(newSeason)
        .then(() => {
          $q.notify({
            message: `${newSeason.seasonName} Batch 1 has been added`,
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
}

export const saveNewLocation = ({commit}, {name, location, details}) => {
	return new Promise((resolve, reject) => {
		let db = Vue.prototype.$database
		let q = Vue.prototype.$q
		let newLocationTemplate = {
			name: name,
			location: location,
			details: details
		}
		db.ref('locationTemplates').push(newLocationTemplate)
			.then(snapshot => {
				q.notify({
	        message: `Saved`,
	        type: 'positive',
	        color: 'positive',
	        textColor: 'white',
	        icon: 'info'
	      })
	      resolve(snapshot.key)
			})
			.catch(err => {
				q.notify({
	        message: `An Errro Occured`,
	        type: 'negative',
	        color: 'negative',
	        textColor: 'white',
	        icon: 'warning'
	      })
				console.log('an error occured')
				reject(err)
			})
	})
	
}

export const saveBatchSchedule = ({commit, dispatch, state, getters, mutations}, {fireb, quasu, lodash}) => {
	let db = Vue.prototype.$database
	let batchSchedule = {
		batchNumber: state.batchNumber,
		eventKey: state.event['.key'],
		eventName: state.event.eventName,
		seasonName: state.eventSeasonNumber,
		colorCode: state.activities[0].classes,
		batchStart: getters.getMinEvent.toString(),
		batchEnd: getters.getMaxEvent.toString(),
		activities: getters.mapActivities
	}
	if (batchSchedule.batchNumber > 1) {
		for(var i = 0; i < batchSchedule.activities.length; i++) {
			if (batchSchedule.activities[i].type === 'general rehersal' || batchSchedule.activities[i].type === 'final rehersal') {
				batchSchedule.activities[i].eventKey = state.event['.key']
			}
		}
	}
	console.log('getters', getters)
	// commit('mapActivities', lodash)
	console.log('event key', state.event['.key'])
	console.log('activities in store', batchSchedule)
	
	db.ref('event_schedules').push(batchSchedule)
		.then(() => {
			
			quasu.notify({
        message: `${batchSchedule.eventName} Batch ${batchSchedule.batchNumber} has been succesfully added`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
			dispatch('updateSeasonEndDate', {payload: batchSchedule, fireb: fireb, lodash: lodash, quasu: quasu})
      commit('updateIsCreateNewBatch', false)
      commit('clearActivities')
      commit('restoreTaskList')
      commit('isSeeAllSchedules', false)
		})
		.catch((err) => {
      quasu.notify({
        message: `An Error Occured`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', err)
		})
}
 
export const updateSeasonEndDate = ({commit, state, getters}, {payload, fireb, lodash, quasu}) => {
	console.log('payload', payload)
	let key = payload.eventKey
	console.log('events', state.events)
	let event = lodash.filter(state.events, e => {
		return e['.key'] === key
	})
	let season = event[0].seasons[0]
	let seasonStart = getters['getMinEvent']
	let seasonEnd = getters['getMaxEvent']
	console.log('date end', season.seasonEnd)
	if (typeof season.seasonEnd === 'undefined') {
		console.log('empty')
		season.seasonStart = seasonStart.toString()
		season.seasonEnd = seasonEnd.toString()
		console.log('season', season)
		// adding the date End of season
		fireb.ref(`events/${key}/seasons/0`).update(season)
		.then(() => {
			console.log('succesfull')
		})
		.catch((err) => {
      quasu.notify({
        message: `An Error Occured`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', err)
		})
	}
	else {
		console.log('not empty')
		let activities = lodash.filter(state.allActivities, a => {
			return a.eventKey === key
		})
		let merge = []
		let data = activities.map(m => {
			for (var i = 0; i < m.activities.length; i++) {
				merge.push(m.activities[i])
			}
			return m
		})
		let maxEvent = merge.map((e) => {
			e.startDate = new Date(e.startDate)
			return e.startDate
		}).sort()
		let min = new Date(Math.min.apply(null, maxEvent))
		let max = new Date(Math.max.apply(null, maxEvent))
		season.seasonStart = min.toString()
		season.seasonEnd = max.toString()
		fireb.ref(`events/${key}/seasons/0`).update(season)
		.then(() => {
			console.log('succesfull')
		})
		.catch((err) => {
      quasu.notify({
        message: `An Error Occured`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', err)
		})
	}
}

export const updateActivity = ({commit, state}, {payload, fireb, _, quasu}) => {
	let event = _.filter(state.allActivities, e => {
		return e['.key'] === payload.scheduleKey
	})
	var index = _.findIndex(event[0].activities, a => {
		return a.type === payload.type
	} )
	var key = payload.scheduleKey
	payload.endDate = payload.endDate.toString()
	payload.startDate = payload.startDate.toString()
	console.log('update act payload', payload)
	fireb.ref(`event_schedules/${key}/activities/${index}`).update(payload)
		.then (() => {
			quasu.notify({
        message: `${payload.title} has been updated`,
        type: 'positive',
        color: 'positive',
        textColor: 'white',
        icon: 'info'
      })
		})
		.catch((err) => {
			quasu.notify({
        message: `An Error Occured`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error', err)
		}) 
}

export const dropDateUpdate = ({commit,state}, {payload, startDate, endDate}) => {
	let DB = Vue.prototype.$firebase.database()
	let lodash = Vue.prototype.$lodash
	let quasu = Vue.prototype.$q
	var index = lodash.findIndex(activity[0].activities, i => {
		return i.type === payload.type
	})
	activity[0].activities[index].startDate = startDate.toString()
	activity[0].activities[index].endDate = endDate.toString()
	let newActivity = activity[0].activities[index]
	var key = payload.scheduleKey
	console.log('activity index', newActivity)
	console.log('index', index)
	// DB.ref(`event_schedules/${key}/activities/${index}`).update(newActivity)
	// 	.then(() => {
	// 		console.log('activity updated')
	// 	})
	// 	.catch((err) => {
 //      quasu.notify({
 //        message: `An Error Occured`,
 //        type: 'negative',
 //        color: 'negative',
 //        textColor: 'white',
 //        icon: 'warning'
 //      })
 //      console.log('error', err) 
	// 	})
	// console.log('fireb', DB)
}
export const saveChanges = ({commit,state}, schedules) => {
	let db = Vue.prototype.$database
	let q = Vue.prototype.$q
	let bindAsArray = Vue.prototype.$bindAsArray
	
	console.log('save schedules', schedules)
	for (var i = 0; i < schedules.length; i++) {
		var key = schedules[i]['.key']
		delete schedules[i]['.key']
		console.log('key', key)
		console.log('sched', schedules[i])
		db.ref(`event_schedules/${key}`).update(schedules[i])
			.then(() => {
				console.log('updated')
			})
			.catch((err) => {
				console.log('err', err)
			})
	}
	// bindAsArray('state.allActivities', db.ref('event_schedules'))
}
