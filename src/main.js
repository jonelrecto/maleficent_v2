import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import lodashPlugin from './plugins/lodash'
import firebasePlugin from './plugins/firebase'
// import vuefire from './plugins/vuefire'
import vueLocalStoragePlugin from './plugins/vuelocalstorage'
// import FirebaseAdmin from './plugins/firebaseadmin'
// import VuetifyLoader from './plugins/vuetifyloader'


Vue.config.productionTip = false

Vue.use(lodashPlugin)
Vue.use(firebasePlugin)
// Vue.use(vuefire)
Vue.use(vueLocalStoragePlugin, {
  name: 'ls',
  bind: true
})
// Vue.use(VuetifyLoader)
// Vue.use(FirebaseAdmin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
