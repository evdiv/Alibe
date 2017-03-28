import * as types from './mutation_types'
import getters from './getters'
import _ from 'underscore'

export default {
  [types.POPULATE_JOB_LISTS] (state, lists) {
    state.joblists = lists
  },
  [types.ADD_JOB_LIST] (state, newList) {
    if (_.isObject(newList)) {
      state.joblists.push(newList)
    }
  },
  [types.DELETE_JOB_LIST] (state, id) {
    state.joblists = _.reject(state.joblists, (list) => {
      return job.id === id
    })
  }
}