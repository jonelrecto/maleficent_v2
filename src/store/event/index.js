import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import firebase from 'firebase'
import startUpState from '../settings/state'

var config = {
    apiKey: "AIzaSyCgfOV9v4njUxW8uk36lp9TT9yLi5W5tGU",
    authDomain: "the-maleficent.firebaseapp.com",
    databaseURL: "https://the-maleficent.firebaseio.com",
    projectId: "the-maleficent",
    storageBucket: "the-maleficent.appspot.com",
    messagingSenderId: "763060552688"
 }

export var firebase3 = firebase.initializeApp(config, 'firebase3')
export var DB3 = firebase3.database()

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  DB3,
  startUpState
}
