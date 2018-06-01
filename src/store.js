import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobs: [],
    employees: []
  },
  mutations: {
    addJob (state, jobTitle) {
      this.state.jobs.push({title: jobTitle})
    }
  },

  actions: {
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
