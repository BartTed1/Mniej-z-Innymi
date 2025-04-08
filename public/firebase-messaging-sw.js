importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyALI1nH6zxXGTktDO2QuzEnXwnu3pHUkP0",
  authDomain: "mniej-z-innymi.firebaseapp.com",
  projectId: "mniej-z-innymi",
  storageBucket: "mniej-z-innymi.firebasestorage.app",
  messagingSenderId: "860373214730",
  appId: "1:860373214730:web:b306103d6381ecdf45a1f3",
  measurementId: "G-1QSQZJF1MX"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg', // Using the default Vite icon
    badge: '/vite.svg',
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
