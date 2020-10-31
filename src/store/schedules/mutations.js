// activity components mutations
export const commitClearActivityComponentState = (state) => {
	state.workshops = {
    startDate: [],
    endDate: [],
    time: [],
    location: [],
    details: [],
    eventKey: [],
    id: [],
    title: [],
    actType: [],
    type: [],
    classes: []
  }
  state.otherActivities = {
    startDate: [],
    endDate: [],
    time: [],
    location: [],
    details: [],
    eventKey: [],
    id: [],
    title: [],
    type: [],
    actType: [],
    classes: []
  }
}


export const commitActivityComponentState = (state, {seasonStart, seasonEnd, eventKey, eventCode, seasonNumber, classes}) => {
 	state.orientation.startDate = seasonStart
 	state.orientation.endDate = seasonStart
 	state.orientation.eventKey = eventKey
 	state.orientation.id = `${eventCode}(${seasonNumber})_batch(1)_orientation`
 	state.orientation.classes = classes
 	state.photoshoot.eventKey = eventKey
 	state.photoshoot.classes = classes
 	state.photoliking.eventKey = eventKey
 	state.photoliking.classes = classes
 	state.finalEvent.startDate = seasonEnd
 	state.finalEvent.endDate = seasonEnd
 	state.finalEvent.eventKey = eventKey
 	state.finalEvent.id = `${eventCode}(${seasonNumber})_batch(1)_finalevent`,
 	state.finalEvent.classes = classes
}

// create new batch mutations
export const updateNewBatchModal = (state, opened) => {
	state.newBatchModal = opened
}
 
export const updateIsCreateNewBatch = (state, isTrue) => {
	state.isCreateNewBatch = isTrue
}

export const updateEvents = (state, events) => {
	state.events = events
}
export const updateEvent = (state,event) => {
	state.event = event
}
export const updateBatchNumber = (state, number) => {
	state.batchNumber = number
}
export const updateTaskList2 = (state, data) => {
	state.taskList2 = data
}
export const updateEventSeason = (state, seasonNumber) => {
	state.eventSeasonNumber = seasonNumber
}
export const updateEventSeasonName = (state, seasonName) => {
	state.eventSeasonName = seasonName
}
export const addNewActivity = (state, activities) => {
	state.activities.push(activities)
}

export const removeActivity = (state, index) => {
	state.activities.splice(index, 1)
}

export const clearActivities = (state) => {
	state.activities = []
}
export const updateTaskList = (state, status) => {
	for (var i = 0; i < state.taskList.length; i++) {
		if (state.taskList[i].value === status) {
			state.taskList[i].visible = true
		}
	}
}
export const restoreTaskList = (state) => {
	for (var i = 0; i < state.taskList2.length; i++) {
		state.taskList2[i].visible = true
	}
}
export const isSeeAllSchedules = (state, status) => {
	state.isViewAllSched = status
}


// all schedules mutations
export const updateAllActivities = (state, data) => {
	state.allActivities = data
}
