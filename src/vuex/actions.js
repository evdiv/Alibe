import { POPULATE_JOB_LISTS, ADD_JOB_LIST, DELETE_JOB_LIST } from './mutation_types'
import api from '../api'
import getters from './getters'

export default {
  populateJobLists: ({ commit }) => {
    return api.fetchJobLists().then(response => {
      commit(POPULATE_JOB_LISTS, response.data)
    })
  },
  changeTitle: (store, data) => {
    store.commit(CHANGE_TITLE, data)
    return store.dispatch('updateList', data.id)
  },
  updateList: (store, id) => {
    let JobList = getters.getListById(store.state, id)

    return api.updateJobList(JobList)
  },
  createJobList: (store, Joblist) => {
    return api.addNewJobList(Joblist).then(() => {
      store.dispatch('populateJobLists')
    }, () => {
      store.commit(ADD_JOB_LIST, Joblist)
    })
  },
  deleteJobList: (store, id) => {
    return api.deleteJobList(id).then(() => {
      store.dispatch('populateJobLists')
    }, () => {
      store.commit(DELETE_JOB_LIST, id)
    })
  }
}