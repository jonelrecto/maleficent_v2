import VueFire from 'vuefire'

let vuefirePlugin = {}

vuefirePlugin.install = function (Vue, options) {
  const bindAsObject = Vue.prototype.$bindAsObject
  Vue.prototype.$bindAsObject = async function bindAsObject(key, ref, cancelCallback) {
    return new Promise(resolve => {
      bindAsObject(key, ref, cancelCallback, resolve)
    })
  }
}

export default VueFire