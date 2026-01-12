import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import notifee from '@notifee/react-native';
import {createFGSChannel, resetFGS} from '../../notificationHelper';
import {FGSChannelId, FGSNotificationId} from '../../notificationHelper';

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [progress, setProgress] = useState(0);

  const showFGSNotification = async () => {
    await createFGSChannel();
    const status = ['Preparing', 'Cooking', 'Out for delivery', 'Arriving soon'][Math.floor(Math.random() * 4)];
    await notifee.displayNotification({
      id: FGSNotificationId,
      title: `<p style="color: #4caf50;"><b>${status}</b></p>`,
      body: `Order progress`,
      android: {
        asForegroundService: true,
        foregroundServiceTypes: [notifee.AndroidForegroundServiceType.FOREGROUND_SERVICE_TYPE_SPECIAL_USE],
        channelId: FGSChannelId,
        ongoing: false,
        autoCancel: false,
        onlyAlertOnce: true,
        progress: {max: 100, current: progress},
        pressAction: {id: 'default'},
        actions: [
          {title: '<b>Pay</b>', pressAction: {id: 'pay'}},
          {title: '<p style="color: #f44336;"><b>Change Address</b></p>', pressAction: {id: 'changeAddress'}},
        ],
      },
    });
  };

  useEffect(() => {
    NetInfo.addEventListener(state => setIsOnline(state.isConnected ?? false));
    const interval = setInterval(() => setProgress(p => (p + 10) % 100), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foreground Service Demo</Text>
      <Text>Online: {isOnline ? '✅' : '❌'}</Text>
      <Text>Progress: {progress}%</Text>
      <View style={styles.buttons}>
        <Button title="🚀 Start/Update FGS" onPress={showFGSNotification} />
        <Button title="🛑 Reset FGS" onPress={resetFGS} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  title: {fontSize: 24, textAlign: 'center', marginBottom: 20},
  buttons: {gap: 10, marginTop: 20},
});

export default HomeScreen;
