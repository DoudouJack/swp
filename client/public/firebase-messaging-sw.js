// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyDcOHnZTrCMPx-3kcwk140NaywVGzIKqlM',
  authDomain: 'sw-project-9335a.firebaseapp.com',
  databaseURL: 'https://sw-project-9335a.firebaseio.com',
  projectId: 'sw-project-9335a',
  storageBucket: 'sw-project-9335a.appspot.com',
  messagingSenderId: '13309377258',
  appId: '1:13309377258:web:1b164f8045263958887593'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

messaging.setBackgroundMessageHandler( function(payload) {
  return self.registration.showNotification()
})