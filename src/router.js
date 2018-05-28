import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddJob from './views/AddJob.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add-job',
      name: 'addJob',
      component: AddJob
    }
  ]
})
