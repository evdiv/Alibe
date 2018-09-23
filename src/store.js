import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUserProfile', doc.data())
    })
    

    fb.jobsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
      let createdByCurrentUser
      if (querySnapshot.docs.length) {
          createdByCurrentUser = store.state.currentUser.uid == querySnapshot.docChanges[0].doc.data().userId ? true : false
      }
      
      if (querySnapshot.docChanges.length !== querySnapshot.docs.length
        && querySnapshot.docChanges[0].type == 'added' && !createdByCurrentUser) {

        let job = querySnapshot.docChanges[0].doc.data()
        job.id = querySnapshot.docChanges[0].doc.id

        store.commit('setHiddenJobs', post)
      } else {
        let jobsArray = []

        querySnapshot.forEach(doc => {
            let post = doc.data()
            job.id = doc.id
            jobsArray.push(post)
        })

        store.commit('setJobs', jobsArray)
      }
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
		setJobs(state, val) {
			state.jobs = val
		}
	},

	actions: {
		fetchUserProfile ({ commit, state }) {
			fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
				console.log(state.currentUser.uid);
				console.log(res);
				commit('setUserProfile', res.data())
			}).catch(err => {
				console.log(err)
			})
		},
		clearData ({commit}) {
			commit('setCurrentUser', null)
			commit('setUserProfile', {})
			commit('setJobs', null)
		},
		updateProfile({ commit, state }, data) {
			let name = data.name
			let title = data.title
	
			fb.usersCollection.doc(state.currentUser.uid).update({ name, title }).then(user => {
				// update all posts by user to reflect new name
				fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
					docs.forEach(doc => {
						fb.postsCollection.doc(doc.id).update({
							userName: name
						})
					})
				})
				// update all comments by user to reflect new name
				fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
					docs.forEach(doc => {
						fb.commentsCollection.doc(doc.id).update({
							userName: name
						})
					})
				})
			}).catch(err => {
				console.log(err)
			})
		}
	}
})
