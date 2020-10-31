import Vue from 'vue'

export const getInstallmentAmount = (state) => {
	try {
		let amount = (parseFloat(state.season.ticketCount) * parseFloat(state.season.ticketPrice)) + parseFloat(state.season.discount)
		let isNan = parseInt(amount) || 0
		// console.log('isnan', isNan)
		return isNan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	} catch (err) { return 0 }
}

export const doneTodos = (state) => {
  return state.todos.filter(todo => todo.done)
}

export const getUserTypes = (state) => {
	return state.userTypes
}

export const getEvents = (state) => {
	return state.events
}
export const getEvent = (state) => {
	return state.event
}
// event page
export const getEventPageModal = (state) => {
	return state.eventPageModal
}

export const getEventPageLoading = (state) => {
	return state.eventPageLoading
}

export const getPages = (state) => {
	return state.pages
}
//event page photos
// season
export const getSeasonModal = (state) => {
	return state.seasonModal
}

export const uploadPhoto = (state) => ({key, name, photo}) => {
	new Promise(function (resolve, reject) {
		let $firebase = Vue.prototype.$firebase
	  let $q = Vue.prototype.$q
	  let storageRef = $firebase.storage().ref()

	  console.log('name', name)
	  console.log('key', key)
	  console.log('up', photo)
	  let uploadTask = storageRef.child(`pagePhotos/${key}_${name}`).put(photo)

	  uploadTask.on('state_changed', function(snapshot){
	    var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
	    // console.log('Upload is ' + prog + '% done')
	  }, function (error) {
	    // Handle unsuccessful uploads
	    $q.notify({
	      message: `An error occur`,
	      type: 'negative',
	      color: 'negative',
	      textColor: 'white',
	      icon: 'warning'
	    })
	    console.log('error occur', error)
	    return ''
	  }, function () {
	    // Handle successful uploads on complete
	    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
	    	console.log('downloadurl', downloadURL)
	    	resolve(downloadURL)
	      // console.log('url photo', vm.pagePhotos)
	    })
	  })
	})
	
}

export const getAcronym = (state) => (string) => {
  var matches = string.match(/\b(\w)/g)
  var acronym = matches.join('')
  // this.eventCode = acronym
  return acronym
}

export const convertToDays = () => ({dateType, dateNumber}) => {
	if (dateType === 'days') {
		return parseInt(dateNumber)
	} else if (dateType === 'weeks') {
		return parseInt(dateNumber) * 7
	} else {
		return parseInt(dateNumber) * 30
	}
}

export const getLastOf3Payment = () => (activities) => {
	let $lodash = Vue.prototype.$lodash
	var filterPayments = $lodash.filter(activities, a => {
		return a.type === 'payment'
	})
	var last3Payments = new Array()
	for (var k = 0; k < filterPayments.length; k++) {
		if (k <= 3) {
			last3Payments.push(filterPayments[k])
		}
	}
	var lastPaymentDue = last3Payments[last3Payments.length-1]
	return lastPaymentDue
}

export const getSeasonBatches = (state, getters, store) => ({eventKey, seasonNumber}) => {
	let _ = Vue.prototype.$lodash
	console.log('schedules', store.startUp.schedules)
	console.log('eventKey', eventKey)
	console.log('eventKey', seasonNumber)
	let sched = [...store.startUp.schedules]
	let batches = _.filter(sched, s => {
		return s.eventKey === eventKey && s.seasonNumber === parseInt(seasonNumber)
	})
	return batches
}

export const getUpcomingBatch = () => (batches) => {
	let mathMixin = Vue.prototype.$mathMixin
	for (var i = 0; i < batches.length; i++) {
		var today = new Date('2018-10-08')
		console.log('today date', today)
		let dif = mathMixin.dayDiff(today, new Date(batches[i].activities[0].startDate))
		console.log('dif', dif)
		
		if (dif >= 0) {
			return batches[i]
		}
	}
}

export const uploadEventLogo = () => (e, eL) => {
	let $firebase = Vue.prototype.$firebase
  let storageRef = $firebase.storage().ref()
  let $q = Vue.prototype.$q
	let event = e
  return new Promise(resolve => {
  	// console.log('event', event.e)
  	// console.log('logo', event.eL)
  	// console.log('stora', storageRef)
  	let uploadTask = storageRef.child(`pagePhotos/${event.e.eventCode}_${event.e.eventName}`).put(event.eL)
    uploadTask.on('state_changed', function (snapshot) {
    }, function (error) {
      $q.notify({
        message: `An error occur`,
        type: 'negative',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      })
      console.log('error occur', error)
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      	// console.log('downloadURL', downloadURL)
        resolve(downloadURL)
      })
    })	
  })
  
}