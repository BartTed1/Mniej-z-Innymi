import { MessagePayload, onMessage } from 'firebase/messaging';
import { messaging, requestNotificationPermission, getFCMToken } from './config';

export type NotificationPayload = {
  notification: {
    title: string;
    body: string;
  };
  data?: Record<string, string>;
};

export class FCMService {
  private static messageHandler?: (payload: MessagePayload) => void;

  static async initialize(): Promise<string | null> {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.log('Notification permission denied');
      return null;
    }

    const token = await getFCMToken();
    if (token) {
      console.log('FCM Token:', token);
    }
    
    // Setup foreground message handler
    onMessage(messaging, (payload) => {
      console.log('Received foreground message:', payload);
      if (this.messageHandler) {
        this.messageHandler(payload);
      }

      // Show notification even when app is in foreground
      if (payload.notification) {
        const { title, body } = payload.notification;
        new Notification(title ?? 'New Message', {
          body: body ?? '',
          icon: '/vite.svg',
        });
      }
    });

    return token;
  }

  static setMessageHandler(handler: (payload: MessagePayload) => void) {
    this.messageHandler = handler;
  }
}

// Custom hook for notifications
export function setupNotifications(onMessage?: (payload: MessagePayload) => void) {
  FCMService.initialize().then((token) => {
    if (token && onMessage) {
      FCMService.setMessageHandler(onMessage);
    }
  });
}
