import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import * as startUp from '../../store/startUpConfig/getters'

export default {
  namespaced: true,
  startUp,
  state,
  getters,
  mutations,
  actions
}
