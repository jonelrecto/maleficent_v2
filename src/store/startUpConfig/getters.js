import Vue from 'vue'

export const ageRules = (state) => ({minVal, maxVal, type, message}) => {
	// console.log(minVal, maxVal, 'sn')
	if (type === 'min') {
		return [
			v => !!v || '',
			v => parseInt(v) <= maxVal || 'Invalid min age',
			v => parseInt(v) > 3 || message,
		]
	} else {
		return [
			v => !!v || '',
			v => parseInt(v) < 61 || message,
			v => parseInt(v) >= minVal || 'Invalid max age',
		]
	}
		
}

export const nameRules = (state) => (message)  => {
	return [v => !!v || message]
}

export const emailRules = (state) => {
	return [
		v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
	]
} 

export const getUserAccess = (state) => {
	return state.userLoggedIn.userAccess
}

export const getEvent = (state) => (eventKey) => {
	let lodash = Vue.prototype.$lodash

	var i = lodash.findIndex(state.events, e => {
		return e['.key'] === eventKey
	})
	return state.events[i]
}

export const getSeason = (state) => ({eventKey, seasonNumber}) => {
	let lodash = Vue.prototype.$lodash
	var i = lodash.findIndex(state.events, e => {
		return e['.key'] === eventKey
	})
	let event = state.events[i]
	// console.log('season num', this.seasonNumber)
	let seasonIndex = lodash.findIndex(event.seasons, s => {
		// console.log('s', s)
		return s.seasonNumber === parseInt(seasonNumber)
	})
	// console.log('event', seasonIndex)
	return event.seasons[seasonIndex]
	// event.seasons[seasonIndex]
}
export const getCourse = (state) => (courseKey) => {
	let lodash = Vue.prototype.$lodash
	var i = lodash.findIndex(state.courses, c => {
		return c['.key'] === courseKey	
		})
	return state.courses[i]
}

export const getPlainValue = (state) => (dataObject) => {
	var obj = JSON.parse(JSON.stringify(dataObject));
	Object.keys(obj).reduce(function (obj, key) {
	  if (obj["_" +  key] === obj[key]) {
	    delete obj["_" +  key]
	  }
	  return obj
	}, obj)
	return obj
}

export const isValidDate = () => (d) => {
  return d instanceof Date && !isNaN(d)
}

export const parseLocations = (state) => {
	let scheds = [...state.schedules]
	let _ = Vue.prototype.$lodash

	let mergeAct = []
	scheds.forEach((el) => {
		mergeAct.push(el.activities)
	  console.log(el)
	})
	let mergeResult = _.spread(_.union)(mergeAct)
	let filterResult = _.uniqBy(mergeResult, 'location')
	let result = filterResult.map(r => {
		if (typeof r.location !== 'undefined' && r.location !== '' && r.location !== null) {
			if (r.location.constructor === Array || typeof r.location !== 'undefined') {
				return {
					label: Array(r.location).join(),
					value: Array(r.location).join()
				}
			} else {
				return {
					label: Array(r.location).join(),
					value: Array(r.location).join()
				}
			}
			
		}
	})
	var newArray = new Array();

  for (var i = 0; i < result.length; i++) {
    if (result[i]) {
      newArray.push(result[i]);
    }
  }
  
  console.log('parse location', newArray)
	return newArray
}

export const parseLocations2 = (state) => {
	// let scheds = [...this.$store.state.startUp.schedules]
	let scheds = state.schedules
	let _ = Vue.prototype.$lodash

	let mergeAct = []
	scheds.forEach((el) => {
		mergeAct.push(el.activities)
		// console.log(el)
	})
	let mergeResult = _.spread(_.union)(mergeAct)
	let filterResult = _.uniqBy(mergeResult, 'location')
	console.log('filterResult', filterResult)
	let result = new Array()
	for (var i = 0; i < filterResult.length; i++) {
		if (filterResult[i].location) {
			result.push({
				label: Array(filterResult[i].location).join(),
				value: Array(filterResult[i].location).join()
			})
		}
	} 
	let result2 = _.uniqBy(result, 'label')
	console.log('result', result2)
	return result2
}

export const parseDetails = (state) => {
	let scheds = [...state.schedules]
	let _ = Vue.prototype.$lodash

	let mergeAct = []
	scheds.forEach((el) => {
		mergeAct.push(el.activities)
	  console.log(el)
	})
	let mergeResult = _.spread(_.union)(mergeAct)
	let filterResult = _.uniqBy(mergeResult, 'details')
	let result = filterResult.map(r => {
		if (typeof r.details !== 'undefined' && r.details !== '' && r.details !== null) {
			if (r.details.constructor === Array && typeof r.details !== 'undefined') {
				return {
					label: Array(r.details).join(),
					value: r.details
				}
			} else {
				return {
					label: r.details,
					value: r.details
				}
			}
			
		}
	})
	var newArray = new Array();
  for (var i = 0; i < result.length; i++) {
    if (result[i]) {
      newArray.push(result[i]);
    }
  }
  console.log('parse details', newArray)
	return newArray
}

export const getUpcomingSundays = () => {
	let $mathMixin = Vue.prototype.$mathMixin
	let latestSundays = new Array()
	var d = new Date()
	var getTot = daysInMonth(d.getMonth(),d.getFullYear());
	// console.log(daysInMonth(d.getMonth(),d.getFullYear()))
	function daysInMonth(month,year) {
	    return new Date(year, month, 0).getDate();
	}
	var sat = new Array()
	var sun = new Array()
	// console.log('gettot')
	// dpat makukuha lng na date na suggested ung pasok sa date ngaun
	// pati ung pang next month na sundays makukuha

	for(var i=1;i<=getTot;i++){
    var newDate = new Date(d.getFullYear(),d.getMonth(),i)
    // console.log(i+"-"+newDate.getDay());
    if(newDate.getDay()==0){
        sun.push(i)
    }
    if(newDate.getDay()==6){
        sat.push(i)
    }
	}
	// console.log('sundays',sun)
	var len = sun.length
	let sun3 = new Array()
	let sun2 = [...sun]
	for (var j = 0; j < len; j++) {
		var d2 = new Date()
		d2.setDate(sun2[j])
		// console.log('d2', d2)
		var diff = $mathMixin.dayDiff(new Date(), d2)
		// console.log('diff', diff)
		if (diff >= 0) {
			sun3.push(sun2[j])
		}
		diff = 0
	}
	// console.log('sundays',sun3)
	for(var x = 0; x < sun3.length; x++) {
		let now = new Date()
		now.setDate(sun3[x])
		latestSundays.push(now)
	}
	var d3 = new Date()
	let nextMonth = $mathMixin.addDays(d3, 30)
	// console.log('nextM', nextMonth)
	let sun4 = new Array()
	var getTot2 = daysInMonth(nextMonth.getMonth(),nextMonth.getFullYear());
	// console.log(daysInMonth(nextMonth.getMonth(),nextMonth.getFullYear()))
	
	for(var k=1;k<=getTot2;k++){
    var newDate2 = new Date(nextMonth.getFullYear(),nextMonth.getMonth(),k)
    // console.log(i+"-"+newDate.getDay())
    if(newDate2.getDay()==0){
        sun4.push(k)
    }
    if(newDate2.getDay()==6){
        sat.push(k)
    }
	}
	// console.log('sundays',sun3)
	for (var l = 0; l < sun4.length; l++) {
		let d4 = new Date()
		d4.setDate(sun4[l])
		let nextMonth = $mathMixin.addDays(d4, 30)
		latestSundays.push(nextMonth)
	}

	var date5 = new Date()
	let anotherMonth = $mathMixin.addDays(date5, 60)
	// console.log('nextM', anotherMonth)
	let sun5 = new Array()
	var getTot5 = daysInMonth(anotherMonth.getMonth(),anotherMonth.getFullYear());
	console.log(daysInMonth(anotherMonth.getMonth(),anotherMonth.getFullYear()))
	
	for(var x=1;x<=getTot5;x++){
    var newDate3 = new Date(anotherMonth.getFullYear(),anotherMonth.getMonth(),x)
    // console.log(x+"-"+newDate.getDay())
    if(newDate3.getDay()==0){
        sun5.push(x)
    }
    if(newDate3.getDay()==6){
        sat.push(x)
    }
	}
	// console.log('sundays',sun5)
	for (var y = 0; y < sun5.length; y++) {
		let anotherDate = new Date()
		let anotherNextMonth = $mathMixin.addDays(new Date(anotherDate), 60)
		anotherNextMonth.setDate(sun5[y])
		latestSundays.push(anotherNextMonth)
	}
	// console.log('latestSundays', latestSundays)
	return latestSundays
}

export const getUpcomingSundays2 = () => (startDate) => {
	let $mathMixin = Vue.prototype.$mathMixin
	let latestSundays = new Array()
	function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate()
	}
	// let startDate = new Date('Wed Dec 05 2018 08:00:00 GMT+0800 (Taipei Standard Time)')
	console.log('startDate in test', startDate)
	
	var d = new Date(startDate)
	
	var getTot = daysInMonth(startDate.getMonth(),startDate.getFullYear())
	
	
	var sat = new Array()
	var sun = new Array()

	for(var i=1;i<=getTot;i++){
    var newDate = new Date(startDate.getFullYear(),startDate.getMonth(),i)
    if(newDate.getDay()==0){
        sun.push(i)
    }
	}
	let sundaysToDate = new Array()
	for (var j = 0; j < sun.length; j++) {
		var startDateConvert = startDate
		startDateConvert.setDate(sun[j])
		latestSundays.push(startDateConvert.toString())
	}
	// 2nd batch of sundays
	let startDate2 = $mathMixin.addDays(startDate, 30)
	let getTot2 = daysInMonth(startDate2.getMonth(),startDate2.getFullYear())
	sun = new Array()
	for(var i = 1; i <= getTot2; i++){
    var newDate = new Date(startDate2.getFullYear(),startDate2.getMonth(),i)
    if(newDate.getDay()==0){
        sun.push(i)
    }
	}
	for (var j = 0; j < sun.length; j++) {
		var startDateConvert = startDate2
		startDateConvert.setDate(sun[j])
		latestSundays.push(startDateConvert.toString())
	}

	// console.log('sun2', sun)
	// console.log('latest sundays', latestSundays)
	return latestSundays
}

export const getUpcomingWeekEnds = () => ({startDate, weekEnd}) => {
	let $lodash  = Vue.prototype.$lodash
	let $mathMixin = Vue.prototype.$mathMixin
	let latestSaturdays = new Array()
	let latestSundays = new Array()
	function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate()
	}
	// let startDate = new Date('Wed Dec 05 2018 08:00:00 GMT+0800 (Taipei Standard Time)')
	console.log('startDate in test', startDate)
	
	var d = new Date(startDate)
	
	var getTot = daysInMonth(startDate.getMonth(),startDate.getFullYear())
	
	
	var sat = new Array()
	var sun = new Array()

	for(var i=1;i<=getTot;i++){
    var newDate = new Date(startDate.getFullYear(),startDate.getMonth(),i)
    if(newDate.getDay()==6){
        sat.push(i)
    }
    if(newDate.getDay()==0){
        sun.push(i)
    }
	}
	// let sundaysToDate = new Array()
	for (var j = 0; j < sun.length; j++) {
		var startDateConvert = startDate
		startDateConvert.setDate(sun[j])
		latestSundays.push(startDateConvert.toString())
	}
	// push to sat
	for (var j = 0; j < sat.length; j++) {
		var startDateConvert = startDate
		startDateConvert.setDate(sat[j])
		latestSaturdays.push(startDateConvert.toString())
	}

	// 2nd batch of saturdays
	let startDate2 = $mathMixin.addDays(startDate, 30)
	let getTot2 = daysInMonth(startDate2.getMonth(),startDate2.getFullYear())
	sat = new Array()
	sun = new Array()
	for(var i = 1; i <= getTot2; i++){
    var newDate = new Date(startDate2.getFullYear(),startDate2.getMonth(),i)
    if(newDate.getDay()==6){
        sat.push(i)
    }
    if(newDate.getDay()==0){
        sun.push(i)
    }
	}
	for (var j = 0; j < sun.length; j++) {
		var startDateConvert = startDate2
		startDateConvert.setDate(sun[j])
		latestSundays.push(startDateConvert.toString())
	}
	for (var j = 0; j < sat.length; j++) {
		var startDateConvert = startDate2
		startDateConvert.setDate(sat[j])
		latestSaturdays.push(startDateConvert.toString())
	}
	// 3rd batch of saturdays
	let startDate3 = $mathMixin.addDays(startDate, 60)
	let getTot3 = daysInMonth(startDate3.getMonth(),startDate3.getFullYear())
	sat = new Array()
	sun = new Array()
	for(var i = 1; i <= getTot3; i++){
    var newDate = new Date(startDate3.getFullYear(),startDate3.getMonth(),i)
    if(newDate.getDay()==6){
        sat.push(i)
    }
    if(newDate.getDay()==0){
        sun.push(i)
    }
	}
	for (var j = 0; j < sun.length; j++) {
		var startDateConvert = startDate3
		startDateConvert.setDate(sun[j])
		latestSundays.push(startDateConvert.toString())
	}
	for (var j = 0; j < sat.length; j++) {
		var startDateConvert = startDate3
		startDateConvert.setDate(sat[j])
		latestSaturdays.push(startDateConvert.toString())
	}

	// console.log('sun2', sun)
	// console.log('latest sundays', latestSundays)
	// console.log('latest sundays', latestSaturdays)
	if (weekEnd === 'sundays') {
		return $lodash.uniq(latestSundays)
	}
	return $lodash.uniq(latestSaturdays)
}

export const getUpcomingWeekEnds2 = () => ({startDate, weekEnd}) => {
	let $lodash  = Vue.prototype.$lodash
	let $mathMixin = Vue.prototype.$mathMixin
	let latestSaturdays = new Array()
	let latestSundays = new Array()
	function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate()
	}
	// let startDate = new Date('Wed Dec 05 2018 08:00:00 GMT+0800 (Taipei Standard Time)')
	console.log('startDate in test', startDate)
	
	var d = new Date(startDate)
	
	var getTot = daysInMonth(startDate.getMonth(),startDate.getFullYear())
	
	
	var sat = new Array()
	var sun = new Array()

	for(var i=1;i<=getTot;i++){
    var newDate = new Date(startDate.getFullYear(),startDate.getMonth(),i)
    if(newDate.getDay()==6){
        sat.push(i)
    }
    if(newDate.getDay()==0){
        sun.push(i)
    }
	}
	// let sundaysToDate = new Array()
	for (var j = 0; j < sun.length; j++) {
		var startDateConvert = startDate
		startDateConvert.setDate(sun[j])
		latestSundays.push(startDateConvert.toString())
	}
	// push to sat
	for (var j = 0; j < sat.length; j++) {
		var startDateConvert = startDate
		startDateConvert.setDate(sat[j])
		latestSaturdays.push(startDateConvert.toString())
	}

	// 2nd batch of saturdays
	let startDate2 = $mathMixin.addDays(startDate, -30)
	let getTot2 = daysInMonth(startDate2.getMonth(),startDate2.getFullYear())
	sat = new Array()
	sun = new Array()
	for(var i = 1; i <= getTot2; i++){
    var newDate = new Date(startDate2.getFullYear(),startDate2.getMonth(),i)
    if(newDate.getDay()==6){
        sat.push(i)
    }
    if(newDate.getDay()==0){
        sun.push(i)
    }
	}
	for (var j = 0; j < sun.length; j++) {
		var startDateConvert = startDate2
		startDateConvert.setDate(sun[j])
		latestSundays.push(startDateConvert.toString())
	}
	for (var j = 0; j < sat.length; j++) {
		var startDateConvert = startDate2
		startDateConvert.setDate(sat[j])
		latestSaturdays.push(startDateConvert.toString())
	}
	// 3rd batch of saturdays
	let startDate3 = $mathMixin.addDays(startDate, -60)
	let getTot3 = daysInMonth(startDate3.getMonth(),startDate3.getFullYear())
	sat = new Array()
	sun = new Array()
	for(var i = 1; i <= getTot3; i++){
    var newDate = new Date(startDate3.getFullYear(),startDate3.getMonth(),i)
    if(newDate.getDay()==6){
        sat.push(i)
    }
    if(newDate.getDay()==0){
        sun.push(i)
    }
	}
	for (var j = 0; j < sun.length; j++) {
		var startDateConvert = startDate3
		startDateConvert.setDate(sun[j])
		latestSundays.push(startDateConvert.toString())
	}
	for (var j = 0; j < sat.length; j++) {
		var startDateConvert = startDate3
		startDateConvert.setDate(sat[j])
		latestSaturdays.push(startDateConvert.toString())
	}

	// console.log('sun2', sun)
	// console.log('latest sundays', latestSundays)
	// console.log('latest sundays', latestSaturdays)
	if (weekEnd === 'sundays') {
		return $lodash.uniq(latestSundays)
	}
	return $lodash.uniq(latestSaturdays)
}

export const get3rdAfterUnderline = (state) => (id) =>{
	var batch = /^(?:[^_]+_){2}([^_ ]+)/
	let word3rd = id.match(batch)
	return word3rd[1]
}

export const get2ndAfterUnderline = (state) => (id) =>{
	var batch = /^(?:[^_]+_){1}([^_ ]+)/
	let word2nd = id.match(batch)
	return word2nd[1]
}

export const hasNumber = () => (str) => {
  return /\d/.test(str)
}

export const extractNumber = () => (str) => {
	return str.match(/\d+/g).map(Number);
}

export const titleCase = (state) => (str) => {
	var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
  	splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}