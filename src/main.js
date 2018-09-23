import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
const fb = require('./firebaseConfig.js')

Vue.config.productionTip = false

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
