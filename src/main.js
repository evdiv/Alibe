window.axios = require('axios');
window.Vue = require('vue');

import Buefy from 'buefy';
import VueFormWizard from 'vue-form-wizard';
import store from './store';


import 'vue-form-wizard/dist/vue-form-wizard.min.css';


Vue.use(Buefy);
Vue.use(VueFormWizard); 

Vue.component('employee', require('./components/employee.vue')); 
Vue.component('employees-table', require('./components/employees-table.vue'));
Vue.component('employer', require('./components/employer.vue'));
Vue.component('employers-table', require('./components/employers-table.vue'));
Vue.component('job', require('./components/job.vue'));
Vue.component('job-add', require('./components/job-add.vue'));
Vue.component('jobs-table', require('./components/jobs-table.vue'));

const app = new Vue({
    el: '#app',
    store
});