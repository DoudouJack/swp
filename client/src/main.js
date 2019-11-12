import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as firebase from 'firebase'

const configOptions = {
  apiKey: 'AIzaSyDcOHnZTrCMPx-3kcwk140NaywVGzIKqlM',
  authDomain: 'sw-project-9335a.firebaseapp.com',
  databaseURL: 'https://sw-project-9335a.firebaseio.com',
  projectId: 'sw-project-9335a',
  storageBucket: 'sw-project-9335a.appspot.com',
  messagingSenderId: '13309377258',
  appId: '1:13309377258:web:1b164f8045263958887593'
}

firebase.initializeApp(configOptions)

/* get the currently signed-in user. */

firebase.auth().signOut().then(function () {
  // Sign-out successful.
  console.log('success')
}, function (error) {
  // An error happened.
  console.log(error)
})

firebase.auth().onAuthStateChanged(user => {
  firebase.auth().currentUser.getIdToken(true).then(token => {
    console.log(token)
  })
  console.log(firebase.auth().currentUser.uid)
  // store.dispatch('fetchUser', user)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
