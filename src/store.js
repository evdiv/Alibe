import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

// initialization or page reload
fb.auth.onAuthStateChanged(user => {
	if (user) {
		store.commit('setCurrentUser', user)
		store.dispatch('fetchUserProfile')
	}
})

export const store = new Vuex.Store({
	state: {
		currentUser: null,
		userProfile: {},
		jobs: [],
		offers: [],
		comments: []
	},

	mutations: {
		addJob (state, val) {
			state.jobs.push(val)
		},
		addOffer (state, val) {
			state.offers.push(val)
		},
		addComment() {
			state.comments.push(val)
		},
		setCurrentUser (state, val) {
			state.currentUser = val
		},
		setUserProfile (state, val) {
			state.userProfile = val
		},
		setJobs (state, val) {
			state.jobs = val
		},
		setOffers (state, val) {
			state.offers = val
		},
		setComments (state, val) {
			state.comments = val
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
