import VueFirestore from 'vue-firestore'
import Firebase from 'firebase'

import 'firebase/auth'
import 'firebase/database'
// import 'firebase/firebase-storage'
import 'firebase/firestore'


var config = {
  apiKey: "AIzaSyA4h0owV593lIvITEE-EEEFbs_0JJSwfGk",
  authDomain: "maleficentdatabase.firebaseapp.com",
  databaseURL: "https://maleficentdatabase.firebaseio.com",
  projectId: "maleficentdatabase",
  storageBucket: "maleficentdatabase.appspot.com",
  messagingSenderId: "99797226126"
}

export var firebase = Firebase.initializeApp(config)
export var firebase2 = Firebase.initializeApp(config, 'firebase2')

export var fs = firebase.firestore()

export var AUTH = firebase.auth()
export var AUTH2 = firebase2.auth()

export var DB = firebase.database()

AUTH.usersRef = DB.ref('users')

let firebasePlugin = {}


// lodashPlugin.install = function (Vue, options) {
//   Vue.prototype.$_ = _
// } 
firebasePlugin.install = function (Vue, options) {
  
  Vue.use(VueFirestore)
  

  Vue.prototype.$fs = fs
  Vue.prototype.$auth = AUTH
  Vue.prototype.$auth2 = AUTH2
  Vue.prototype.$database = DB
  Vue.prototype.$firebase = firebase
}

export default firebasePlugin