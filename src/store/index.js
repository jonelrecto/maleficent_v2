// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     isAuthenticated: false,
//     newSeasonColor: {
//       hex: '#F5AFC8'
//     },
//   },
//   mutations: {
    
//   },
//   actions: {

//   }
// })


import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// import VuexPersistence from 'vuex-persist'
import event from './event'
import schedules from './schedules'
import settings from './settings'
import model from './model'
import startUp from './startUpConfig'
import register from './register'
// import Vuefire from 'vuefire'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    event,
    schedules,
    settings,
    model,
    startUp,
    register
  },
  // plugins: [new VuexPersistence().plugin]
})

export default store
