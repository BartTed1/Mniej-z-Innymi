import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyALI1nH6zxXGTktDO2QuzEnXwnu3pHUkP0",
  authDomain: "mniej-z-innymi.firebaseapp.com",
  projectId: "mniej-z-innymi",
  storageBucket: "mniej-z-innymi.firebasestorage.app",
  messagingSenderId: "860373214730",
  appId: "1:860373214730:web:b306103d6381ecdf45a1f3",
  measurementId: "G-1QSQZJF1MX"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const VAPID_KEY = "BC9nczIDnqXD3I5qXJpQZ2b9RGinOfG2mQp5W9aSQD1CCnsYmE9kfPQ8Ww-0BKlENGC1ki5A7nMauYXCaP6uWNc";

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

export async function getFCMToken() {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      return currentToken;
    }
    console.log('No registration token available.');
    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}
