import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './appNavigation'; // Self-ref
import { notificationInfo } from '../global';
import HomeScreen from './screens/HomeScreen';
import OrderInfoScreen from './screens/OrderInfoScreen';
import ChangeAddressScreen from './screens/ChangeAddressScreen';

const Stack = createStackNavigator();

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const getNavigationRef = () => navigationRef.current;

export default function AppNavigation() {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // Article Step 6: Handle quit-state navigation
        if (
          notificationInfo.notificationPressed &&
          notificationInfo.notificationAction
        ) {
          switch (notificationInfo.notificationAction) {
            case 'navigateToOrderInfo':
              navigate('OrderInfo');
              break;
            case 'navigateToChangeAddress':
              navigate('ChangeAddress');
              break;
          }
          notificationInfo.notificationPressed = false;
          notificationInfo.notificationAction = '';
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OrderInfo" component={OrderInfoScreen} />
        <Stack.Screen name="ChangeAddress" component={ChangeAddressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
