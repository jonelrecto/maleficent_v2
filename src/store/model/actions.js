import Vue from 'vue'

export const markModelContract = ({commit,state}, payload) => {
	let data = {...payload}
	let db = Vue.prototype.$database
	let q = Vue.prototype.$q
	data.contractSign = true
	let key = data['.key']
	delete data['.key']
	delete data.__index
	console.log('model in action', data)
	db.ref('contractSigned').child(key).set(data)
		.then(() => {
			db.ref(`showUpModels`).child(key).remove()
				.then(() => {
					q.notify({
		        message: `User has been successfully added`,
		        type: 'positive',
		        color: 'positive',
		        textColor: 'white',
		        icon: 'info'
		      })
		      state.signedModal = false
				})
			})
		.catch((err) => {
			console.log(err)
			state.signedModal = false
		})
}