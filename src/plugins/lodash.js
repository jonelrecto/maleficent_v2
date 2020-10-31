import _ from 'lodash'

let lodashPlugin = {}

lodashPlugin.install = function (Vue, options) {
  Vue.prototype.$_ = _
} 

export default lodashPlugin