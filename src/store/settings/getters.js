import Vue from 'vue'

export const isExistCourses = (state) => (course) =>{
	// let courses = [...state.courses]
	try {
		let _ = Vue.prototype.$lodash
		// console.log(state.courses, 'courses')
		var i = _.findIndex(state.courses, c => {
			return c.courseValue.toLowerCase() === course.toLowerCase()
		})
		if (i != -1) {
			return true
		}
		else {
			return false
		}
	} catch {}

}

export const isExistActivity = (state) => ({activities, activity}) =>{
  let _ = Vue.prototype.$lodash
  // console.log('a', activities)
  // console.log('act', activity)
  var index = _.findIndex(activities, a => {
  	return a.label === activity || a.value === activity
  })
  // console.log('i', index)
  if (index != -1) {
    return true
  } else {
    return false
  }
}

export const titleCase = state => str => {
	var splitStr = str.toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
  	splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

export const parseActivities = (state) => {
	let courses = [...state.courses]
	let _ = Vue.prototype.$lodash
	let activities = []
	for (var i = 0; i < courses.length; i++) {
		activities.push(courses[i].activities)
	}
	let mergeResult = _.spread(_.union)(activities)
	let filterResult = _.uniqBy(mergeResult, 'value')
	console.log('courses state', filterResult)
	return filterResult.map(r => {
		return {
			label: r.label,
			value: r.value
		}
	})
}
