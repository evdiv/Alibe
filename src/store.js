import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    jobs: [],
    employees: []
  },
  mutations: {
    addJob (state, jobTitle) {
      this.state.jobs.push({title: jobTitle})
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
        state.userProfile = val
    }
  },

  actions: {
    fetchUserProfile({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
          commit('setUserProfile', res.data())
      }).catch(err => {
          console.log(err)
      })
    },
    getActiveJobs () {
      // Axios.get('api/jobs')
      this.state.jobs = [{ title: 'First Job' }, { title: 'Second Job' }, { title: 'Third Job' }]
    },
    postJob (job) {
      // Axios.post('api/job', this.state.newJob)
      this.state.jobs.push(job)
    },
    postEmployee () {
      Axios.post('api/employee', this.state.newEmployee)
    }

  }
})
