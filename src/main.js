import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import { store } from './store'
import './filters'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const fb = require('./firebaseConfig.js')

Vue.config.productionTip = false
Vue.use(BootstrapVue)

let app

// When a user refreshes a page Firebase initializes before the app 
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})
