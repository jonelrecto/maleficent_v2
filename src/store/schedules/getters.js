import Vue from 'vue'

export const removeTime = (state) => (date) => {
	let newDate = new Date(date)
	newDate.setHours(0, 0, 0, 0)
	return newDate
}

export const setTime = (state) => ({date, time}) => {
	var getHours = new Date(time).getHours()
	var getMin = new Date(time).getMinutes()
	let newDate = new Date(date)
	newDate.setHours(getHours, getMin, 0, 0)
	return newDate.toString()
}

export const setTime2 = (state) => ({date, time}) => {
	var getHours = new Date(time).getHours()
	var getMin = new Date(time).getMinutes()
	let newDate = new Date(date)
	newDate.setHours(getHours, getMin, 0, 0)
	return new Date(newDate)
}

export const formatDate = (state) => (date) => {
	let moment = Vue.prototype.$moment
	var dt = moment(new Date(date))
	return dt.format('ddd MMMM DD, YYYY')
}

export const getDatesOfWeek = (state, dispatch, commit, startUp) => ({seasonStart, seasonEnd, daysofweek}) => {
	let moment = Vue.prototype.$moment
	let mathMixin = Vue.prototype.$mathMixin
	// getting the days start here
	function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate()
	}

	var mon = new Array()
	var tue = new Array()
	var wed = new Array()
	var thu = new Array()
	var fri = new Array()
	var sat = new Array()
	var sun = new Array()
	var ctr = 1

	let startDate = new Date(seasonStart)
	let getPlainValue = startUp['startUp/getPlainValue']
	// console.log('getPlain', getPlainValue)
	do {

		
		startDate.setDate(1)
		// var getTot = daysInMonth(startDate.getMonth(),startDate.getFullYear())
		// console.log('startDate', startDate)
		let getTot = moment(startDate).daysInMonth()
		// console.log(getTot, 'getTot')
		for (var i = 0; i < getTot ; i++) {

	    var newDate = new Date(startDate.getFullYear(), startDate.getMonth(), i)
			// console.log(newDate, 'newDate')
	    switch (newDate.getDay()) {
	    	case 0:
			    var tempDate = getPlainValue(startDate)
			    var convertToDate = new Date(tempDate)
		    	convertToDate.setDate(i)
		    	var dif = mathMixin.dayDiff(new Date(seasonStart), convertToDate)
		    	var dif2 = mathMixin.dayDiff(new Date(seasonEnd), convertToDate)
			  	if (dif > 0 && dif2 < 0) {
			  		// console.log(convertToDate, 'convertToDate')
			  		sun.push(convertToDate.toString())
			  	}
			    break
			  case 1:
			    var tempDate = getPlainValue(startDate)
			    var convertToDate = new Date(tempDate)
		    	convertToDate.setDate(i)
		    	var dif = mathMixin.dayDiff(new Date(seasonStart), convertToDate)
		    	var dif2 = mathMixin.dayDiff(new Date(seasonEnd), convertToDate)
			  	if (dif > 0 && dif2 < 0) {
			  		mon.push(convertToDate.toString())
			  	}
			    break
			  case 2:
			    var tempDate = getPlainValue(startDate)
			    var convertToDate = new Date(tempDate)
		    	convertToDate.setDate(i)
		    	var dif = mathMixin.dayDiff(new Date(seasonStart), convertToDate)
		    	var dif2 = mathMixin.dayDiff(new Date(seasonEnd), convertToDate)
			  	if (dif > 0 && dif2 < 0) {
			  		tue.push(convertToDate.toString())
			  	}
			    break
			  case 3:
			    var tempDate = getPlainValue(startDate)
			    var convertToDate = new Date(tempDate)
		    	convertToDate.setDate(i)
		    	var dif = mathMixin.dayDiff(new Date(seasonStart), convertToDate)
		    	var dif2 = mathMixin.dayDiff(new Date(seasonEnd), convertToDate)

		    	// console.log('dif in wed', dif2, convertToDate)
			  	if (dif > 0 && dif2 < 0) {
			  		wed.push(convertToDate.toString())
			  	}
			    break
			  case 4:
			    var tempDate = getPlainValue(startDate)
			    var convertToDate = new Date(tempDate)
		    	convertToDate.setDate(i)
		    	var dif = mathMixin.dayDiff(new Date(seasonStart), convertToDate)
		    	var dif2 = mathMixin.dayDiff(new Date(seasonEnd), convertToDate)
			  	if (dif > 0 && dif2 < 0) {
			  		thu.push(convertToDate.toString())
			  	}
			    break
			  case 5:
			    var tempDate = getPlainValue(startDate)
			    var convertToDate = new Date(tempDate)
		    	convertToDate.setDate(i)
		    	var dif = mathMixin.dayDiff(new Date(seasonStart), convertToDate)
		    	var dif2 = mathMixin.dayDiff(new Date(seasonEnd), convertToDate)
			  	if (dif > 0 && dif2 < 0) {
			  		fri.push(convertToDate.toString())
			  	}
			    break
			  case 6:
			    var tempDate = getPlainValue(startDate)
			    var convertToDate = new Date(tempDate)
		    	convertToDate.setDate(i)
			  	var dif = mathMixin.dayDiff(new Date(seasonStart), convertToDate)
			  	var dif2 = mathMixin.dayDiff(new Date(seasonEnd), convertToDate)
			  	if (dif > 0 && dif2 < 0) {
			  		sat.push(convertToDate.toString())	
			  	}
					break
				default:
					console.log('an error occur')
					break
	    }
		}
		startDate.setDate(1)
		startDate.setMonth(startDate.getMonth()+1)
		ctr++
	} while (ctr <= 5)

	// console.log('mon', mon)
	// console.log('tue', tue)
	// console.log('wed', wed)
	// console.log('thu', thu)
	// console.log('fri', fri)
	// console.log('sat', sat)
	// console.log('sun', sun)

	// console.log('what is new start date', seasonStart)
	// var daysOfWeek = 'monday'
	switch (daysofweek) {
  	case 'monday':
	    return mon
	  case 'tuesday':
	    return tue
	  case 'wednesday':
	  	return wed
	  case 'thursday':
	    return thu
	  case 'friday':
	    return fri
	  case 'saturday':
	    return sat
	  case 'sunday':
	   	return sun 
		default:
			console.log('an error occur in returning value')
			break
  }
}
export const getColorOpt = (state) => {
	let us = this
	console.log('state in opt', us)
	return state.colorOpt
}
export const getNewBatchModal = (state) => {
	return state.newBatchModal
}
export const getActivityList = (state) => {
	return state.activityList
}

export const getActivities = (state) => {
	return state.activities
}
export const taskList = (state) => {
	if (state.activities.length <= 0) {
		return state.taskList
	}
	else {
		const tl = state.taskList
		for (var i = 0; i < state.activities.length; i++) {
			for(var j = 0; j < tl.length; j++) {
				if (tl[j].value === state.activities[i].type) {
					if (tl[j].value === 'Payment') {
						tl[j].visible = true
					}else {
						// tl[j].visible = false
					}
				}
			}
		}
		return tl
	}
}
export const taskList2 = (state) => {
	// console.log('taskList2', state.taskList2)
	if (state.activities.length <= 0) {
		return state.taskList2
	}
	else {
		let tl = state.taskList2
		for (var x = 0; x < tl.length; x++) {
			tl[x].visible = true
		}
		for (var i = 0; i < state.activities.length; i++) {
			for(var j = 0; j < tl.length; j++) {
				if (tl[j].value === state.activities[i].type) {
					if (state.amountRemaining <= 0 && tl[j].value === 'payment' ) {
						console.log('task', tl[j].value, state.amountRemaining)
						tl[j].visible = false
					}
					else if (tl[j].value != 'payment'){
						tl[j].visible = false
					}

				}
			}
		}
		// console.log('act', state.activities)
		// console.log('tl', tl)
		return tl
	}
}
export const getTotalPayments = (state)  => {
	console.log('a', state.activities)
	let total = 0
	for (var i = 0; i < state.activities.length; i++) {
		if (state.activities[i].type === 'payment') {
			total += state.activities[i].amount
		}
	}
	console.log('t', total)

	return state.amountRemaining - total
}

export const mapActivities = (state) => {
	return state.activities.map(a => {
		return {
			amount: a.amount ? a.amount : 0,
			capacity: a.capacity,
			classes: a.classes,
			endDate: a.endDate.toString(),
			eventKey: a.eventkey,
			id: a.id,
			location: a.location,
			startDate: a.startDate.toString(),
			title: a.title,
			type: a.type
		}
	})
}

export const getMinEvent = (state) => {
	let latest = state.activities.map(function (e) {
		return e.startDate
	}).sort()
	let min = new Date(Math.min.apply(null, latest))
	return min
}

export const getMaxEvent = (state) => {
	let maxEvent = state.activities.map((e) => {
		return e.startDate
	}).sort()
	let max = new Date(Math.max.apply(null, maxEvent))
	return max
}

export const isEventBatchExist = (state) => (batches) => {
	state.batches = batches
	var max = Math.max.apply(Math, batches.map(function(b) { return b.batchNumber; }))
	return max
}

export const includeSchedule = (state) => (lodash) => {
	// console.log('vuefire', this.$bindAsArray)
	if (state.batchNumber > 1) {
		let schedule = lodash.filter(state.allActivities, ac => {
			return ac.eventKey === state.event['.key']
		})
		for (var i = 0; i < schedule[0].activities.length; i++) {
			if (schedule[0].activities[i].type === 'general rehersal' || schedule[0].activities[i].type === 'final rehersal') {
				schedule[0].activities[i].title = `${state.event.eventCode}${state.batchNumber}_${schedule[0].activities[i].type}`
				schedule[0].activities[i].startDate = new Date(schedule[0].activities[i].startDate)
				schedule[0].activities[i].startDate = new Date(schedule[0].activities[i].startDate)
				schedule[0].activities[i].endDate = new Date(schedule[0].activities[i].endDate)
				delete schedule[0].activities[i].eventKey
				console.log('schedule to include', schedule[0])
				state.activities.push(schedule[0].activities[i])
			}
		}
	}
}

export const getSeeAllSchedules = (state, lodash) => {
	// console.log('mute allActivities', state.allActivities)
	// console.log('mute activities', state.activities)
	let mapActivities = state.allActivities.map(m => {
		for (var x = 0; x < m.activities.length; x++) {
			m.activities[x].batchKey = m['.key']
		}
		return m.activities
	})
	let merge = []
	let data = mapActivities.map(m => {
		// console.log(m)
		for (var i = 0; i < m.length; i++) {
			merge.push(m[i])
		}
		return m
	})

	let finalMerge = merge.map(m => {
		return {
			capacity: m.capacity,
			classes: m.classes,
			endDate: new Date(m.endDate),
			batchKey: m.batchKey,
			// id: m.id,
			location: m.location,
			startDate: new Date(m.startDate),
			title: m.title,
			type: m.type
		}
	})
	for (var j = 0; j < state.activities.length; j++) {
		finalMerge.push(state.activities[j])
	}
	// let finalMerge2 = Object.assign([], finalMerge)
	// console.log('mapActivities', mapActivities)
	// console.log('merge', merge)
	// console.log('finalmerge2', finalMerge)
	return finalMerge
}

// view all schedules getters
export const getAllActivities = (state) => {
	let mapActivities = state.allActivities.map(m => {
		// console.log('m', m)
		for (var x = 0; x < m.activities.length; x++) {
			m.activities[x].batchNumber = m.batchNumber
			m.activities[x].scheduleKey = m['.key']
		}
		return m.activities
	})
	let merge = []
	let data = mapActivities.map(m => {
		// console.log(m)
		for (var i = 0; i < m.length; i++) {
			merge.push(m[i])
		}
		return m
	})
	let finalMerge = merge.map(m => {
		return {
			batchNumber: m.batchNumber,
			scheduleKey: m.scheduleKey,
			capacity: m.capacity,
			classes: m.classes,
			endDate: new Date(m.endDate),
			eventKey: m.eventKey,
			scheduleID: m.id ? m.id : m.scheduleID,
			amount: m.amount ? m.amount : 0,
			location: m.location,
			startDate: new Date(m.startDate),
			title: m.title,
			type: m.type
		}
	})
	let finalMerge2 = Object.assign([], finalMerge)
	// console.log('merge', merge)
	// console.log('finalmerge2', finalMerge2)
	return finalMerge2
}
export const getAgendaActivities = (state, getters) => {
	let mapData = getters.getAllActivities.map(a => {
		var i = 0
		return {
			id: `${a.title}_${i++}`,
			summary: a.title,
			description: a.type,
			start: {
				dateTime: a.startDate.toISOString()
			},
			end: {
				dateTime: a.endDate.toISOString()
			}
		}
	})
	return mapData
}
// batch list getters