import VueLocalStorage from 'vue-localstorage'

let vueLocalStoragePlugin = {}

vueLocalStoragePlugin.install = function (Vue, options) {
  // Vue.use(VueLocalStorage, {
  //   name: 'ls',
  //   bind: true
  // })
  Vue.prototype.$localStorage = VueLocalStorage
}

export default VueLocalStorage