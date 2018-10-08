import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'


import JobsTable from './components/jobs-table.vue'
import AddJob 	from './components/add-job.vue'
import UserLogin from './components/user-login.vue'
import UserRegister from './components/user-register.vue'
import UserSettings from './components/user-settings.vue'

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
			path: '/add-job',
			name: 'add-job',
			component: AddJob,
			meta: {
				requiresAuth: true
			}
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
