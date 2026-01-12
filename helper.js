import { Platform, Alert } from 'react-native';
import { navigationRef, getNavigationRef, navigate } from './src/appNavigation';
import { notificationInfo } from './global';
import notifee from '@notifee/react-native';

const FGSNotificationId = 'FGSNotificationId';

export const handleNotificationClick = detail => {
  if (
    Platform.OS === 'android' &&
    detail?.notification?.id === FGSNotificationId
  ) {
    const navRef = getNavigationRef();
    if (navRef) {
      navigate('OrderInfo');
    } else {
      notificationInfo.notificationPressed = true;
      notificationInfo.notificationAction = 'navigateToOrderInfo';
    }
  }
};

export const handleActionButtonClick = detail => {
  if (
    Platform.OS === 'android' &&
    detail?.notification?.id === FGSNotificationId
  ) {
    const pressAction = detail.pressAction?.id;
    switch (pressAction) {
      case 'pay':
        Alert.alert('Pay clicked!');
        break;
      case 'changeAddress':
        const navRef = getNavigationRef();
        if (navRef) {
          navigate('ChangeAddress');
        } else {
          notificationInfo.notificationPressed = true;
          notificationInfo.notificationAction = 'navigateToChangeAddress';
        }
        break;
    }
  }
};
