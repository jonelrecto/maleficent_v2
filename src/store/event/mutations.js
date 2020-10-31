import Vue from 'vue'

export const setCourses = (state) => {
	console.log('setcourse', )
	let courses = []
	Vue.prototype.$bindAsArray('courses', Vue.prototype.$database.ref('settings/courses'))
	console.log('courses', courses)
	state.courses = courses
}

export const updateDrawerState = (state, opened) => {
	state.drawerState = opened
	console.log('drawerState', state.drawerState)
}

export const updateIsEventEmpty = (state, status) => {
	state.isEventEmpty = status
}

export const setEvents = (state, events) => {
	state.events = events
}
// event page mutation
export const updateEventPageModal = (state, opened) => {
	state.eventPageModal = opened
}
export const updateEventPageLoading = (state, opened) => {
	state.eventPageLoading = opened
}
export const updatePages = (state, data) => {
	state.pages = data
}
//event page photos
export const updateEventPagePhotosModal = (state, opened) => {
	state.eventPagePhotoModal = opened
}
export const updatePagePhotos = (state, data) => {
	state.pagePhotos = data
}
export const updateEvent = (state, data) => {
	state.event = data
}
// seasons
export const seasonModal = (state, opened) => {
	state.seasonModal = opened
}
export const seasonLoading = (state, opened) => {
	state.seasonLoading = opened
}