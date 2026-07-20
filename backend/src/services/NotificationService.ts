import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

// Initialize Firebase Admin (Assumes FIREBASE_SERVICE_ACCOUNT_KEY env var)
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    initializeApp({
      credential: cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
  }
} else {
  console.warn('FIREBASE_SERVICE_ACCOUNT_KEY not found. Push notifications are disabled.');
}

export class NotificationService {
  /**
   * Sends a push notification to a specific device token.
   */
  static async sendPushNotification(token: string, title: string, body: string, data?: any) {
    if (!getApps().length) {
      console.warn('Firebase Admin not initialized. Cannot send notification.');
      return;
    }

    try {
      const message = {
        notification: {
          title,
          body,
        },
        data: data || {},
        token,
      };

      const response = await getMessaging().send(message);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Sends a push notification to multiple device tokens.
   */
  static async sendMulticast(tokens: string[], title: string, body: string, data?: any) {
    if (!getApps().length) return;

    try {
      const message = {
        notification: { title, body },
        data: data || {},
        tokens,
      };
      
      const response = await getMessaging().sendEachForMulticast(message);
      console.log(`${response.successCount} messages sent successfully.`);
      return response;
    } catch (error) {
      console.error('Error sending multicast message:', error);
      throw error;
    }
  }
}
