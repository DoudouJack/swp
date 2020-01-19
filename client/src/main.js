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

console.log('main loaded')

firebase.initializeApp(configOptions)

const messaging = firebase.messaging()
messaging.usePublicVapidKey('BHo53akU7BDm4ZE0JavJ6ZbPAUtFF7rfRNnn_WeVevidoTx8aZpC-aoanKCm7UnE4roUgY67MNhsuyixOO97vSI')

messaging.requestPermission().then(() => {
  console.log('Notification permission granted!')

  // GET TOKEN
  messaging.getToken().then((token) => {
    console.log(token)
  })
}).catch((err) => {
  console.log('Unable to get permission to notify.', err)
})

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.')
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    messaging.setTokenSentToServer(false)
    // Send Instance ID token to app server.
    messaging.sendTokenToServer(refreshedToken)
    // ...
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err)
    messaging.showToken('Unable to retrieve refreshed token ', err)
  })
})

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
