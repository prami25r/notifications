import notifee from '@notifee/react-native';

// ✅ EXPORT THESE CONSTANTS
export const FGSChannelId = 'foodOrderTracking';
export const FGSChannelName = 'Food Order Tracking';
export const FGSNotificationId = 'FGSNotificationId';  // ← ADD THIS LINE

export const createFGSChannel = async () => {
  const isCreated = await notifee.isChannelCreated(FGSChannelId);
  if (!isCreated) {
    await notifee.createChannel({
      id: FGSChannelId,
      name: FGSChannelName,
      importance: 3,
    });
  }
};

export const resetFGS = async () => {
  await notifee.cancelNotification(FGSNotificationId);  // Now works
  await notifee.stopForegroundService();
};
