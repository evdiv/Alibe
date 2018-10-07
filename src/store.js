import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

// initialization or page reload
fb.auth.onAuthStateChanged(user => {
	if (user) {

		store.commit('setCurrentUser', user)
		store.dispatch('fetchUserProfile')
		
		fb.jobsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
			let jobs = []
			querySnapshot.forEach(doc => {
					let job = doc.data()
					job.id = doc.id
					jobs.push(job)
			})
			store.commit('setJobs', jobs)
		})

	}
})

export const store = new Vuex.Store({
	state: {
		currentUser: null,
		userProfile: {},
		jobs: []
	},

	mutations: {
		addJob (state, val) {
			state.jobs.push(val)
		},
		setCurrentUser (state, val) {
			state.currentUser = val
		},
		setUserProfile (state, val) {
			state.userProfile = val
		},
		setJobs (state, val) {
			state.jobs = val
		}
	},

	actions: {

		fetchUserProfile ({ commit, state }) {
			fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
				commit('setUserProfile', res.data())
			}).catch(err => {
				console.log(err)
			})
		},
		
		clearData ({ commit }) {
			commit('setCurrentUser', null)
			commit('setUserProfile', {})
			commit('setJobs', null)
		}
	}
})
