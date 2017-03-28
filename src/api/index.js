import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const JobListsResource = Vue.resource('api/' + 'joblists{/id}');

export default {
  fetchJobLists: () => {
    return JobListsResource.get();
  },
  addNewJobList: (data) => {
    return JobListsResource.save(data);
  },
  updateJobList: (data) => {
    return JobListsResource.update({ id: data.id }, data);
  },
  deleteJobList: (id) => {
    return JobListsResource.remove({ id: id });
  }
}
