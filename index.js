import {AppRegistry} from 'react-native';
import notifee, {AndroidForegroundServiceType, EventType} from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo';
import {Platform, AppState} from 'react-native';
import App from './App';
import './global'; // Global notification state
import {handleNotificationClick, handleActionButtonClick} from './helpers';

notifee.registerForegroundService(async (notification) => {
  // Article Step 4: Background/quit state FGS updates
  let prevAppState = AppState.currentState;
  let unsubscribeNetwork = null;
  
  const FGSNotificationId = 'FGSNotificationId';
  const FGSChannelId = 'foodOrderTracking';
  
  AppState.addEventListener('change', (nextAppState) => {
    if (prevAppState.match(/inactive|background/) && nextAppState === 'active') {
      // App to foreground - cleanup
      unsubscribeNetwork?.();
    } else if (prevAppState.match(/active/) && (nextAppState === 'inactive' || nextAppState === 'background')) {
      // App to background/quit
      unsubscribeNetwork = NetInfo.addEventListener(state => {
        if (state.isConnected ?? false) {
          // Simulate server data update
          updateFGSNotification('Order at Restaurant', 75);
        } else {
          // No internet
          notifee.displayNotification({
            id: FGSNotificationId,
            title: '<p style="color: #4caf50;"><b>No Internet</b></p>',
            body: 'Please connect to get latest updates',
            android: {
              asForegroundService: true,
              foregroundServiceTypes: [AndroidForegroundServiceType.FOREGROUND_SERVICE_TYPE_SPECIAL_USE],
              channelId: FGSChannelId,
              pressAction: {id: 'default'},
            },
          });
        }
      });
    }
    prevAppState = nextAppState;
  });

  const updateFGSNotification = async (status, progress) => {
    await notifee.displayNotification({
      id: FGSNotificationId,
      title: `<p style="color: #4caf50;"><b>${status}</b></p>`,
      body: `Progress: ${progress}%`,
      android: {
        asForegroundService: true,
        foregroundServiceTypes: [AndroidForegroundServiceType.FOREGROUND_SERVICE_TYPE_SPECIAL_USE],
        channelId: FGSChannelId,
        ongoing: false,
        autoCancel: false,
        onlyAlertOnce: true,
        progress: {max: 100, current: progress},
        smallIcon: 'ic_launcher',
        pressAction: {id: 'default'},
        actions: [
          {title: '<b>Pay</b>', pressAction: {id: 'pay'}},
          {
            title: '<p style="color: #f44336;"><b>Change Address</b></p>',
            pressAction: {id: 'changeAddress', launchActivity: 'default', launchActivityFlags: ['singleTop']},
          },
        ],
      },
    });
  };
});

// Article Step 6/7: Background event handling
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (Platform.OS === 'android' && detail?.notification?.id === 'FGSNotificationId') {
    switch (type) {
      case EventType.PRESS:
        handleNotificationClick(detail);
        break;
      case EventType.ACTION_PRESS:
        handleActionButtonClick(detail);
        break;
      case EventType.DISMISSED:
        await notifee.cancelNotification('FGSNotificationId');
        await notifee.stopForegroundService();
        break;
    }
  }
});

AppRegistry.registerComponent('LiveNotificationApp', () => App);
