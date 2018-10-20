import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'


import JobsTable from './components/jobs-table.vue'
import JobDetails from './components/job-details.vue'
import JobCreate 	from './components/job-create.vue'
import UserLogin from './components/user-login.vue'
import UserRegister from './components/user-register.vue'
import UserSettings from './components/user-settings.vue'
import UserDetails from './components/user-details.vue'

Vue.use(Router)

const router = new Router({
  	mode: 'history',
  	routes: [
    	{
      		path: '*',
      		redirect: '/jobs'
    	},
		{
			path: '/login',
			name: 'login',
			component: UserLogin
		},
		{
			path: '/register',
			name: 'register',
			component: UserRegister
		},		
		{
			path: '/jobs',
			name: 'jobs',
			component: JobsTable,
		},
		{
			path: '/jobs/:id',
			name: 'job-details',
			component: JobDetails,
		},
		{
			path: '/job-create',
			name: 'job-create',
			component: JobCreate,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/users/:id',
			name: 'user-details',
			component: UserDetails,
		},
		{
			path: '/settings',
			name: 'settings',
			component: UserSettings,
			meta: {
				requiresAuth: true
			}
		}
  	]
})

router.beforeEach((to, from, next) => {
  	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  	const currentUser = firebase.auth().currentUser

  	if (requiresAuth && !currentUser) {
    	next('/login')
  	} else if (requiresAuth && currentUser) {
    	next()
  	} else {
    	next()
  	}
})

export default router
