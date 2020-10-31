
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

// console.log('vue in store', Vuexfire)
// var eventsRef = Vue.prototype.$firebase.database.ref('events')

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
