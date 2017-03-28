import _ from 'underscore'

export default {
  getJobs: state => state.Jobs,
  getJobById: (state, id) => {
    return _.findWhere(state.Jobs, { id: id })
  }
}