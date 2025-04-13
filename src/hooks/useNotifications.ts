import { useState, useEffect } from 'react';
import { MessagePayload } from 'firebase/messaging';
import { FCMService, NotificationPayload } from '../firebase/messaging';

export function useNotifications() {
	const [fcmToken, setFcmToken] = useState<string | null>(null);
	const [lastMessage, setLastMessage] = useState<NotificationPayload | null>(null);

	useEffect(() => {
		const handleMessage = (payload: MessagePayload) => {
			setLastMessage(payload as NotificationPayload);
		};

		FCMService.initialize().then(token => {
			setFcmToken(token);
			if (token) {
				FCMService.setMessageHandler(handleMessage);
			}
		});
	}, []);

	return { fcmToken, lastMessage };
}
