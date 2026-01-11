import { NativeModules, Platform } from 'react-native';

const { ForegroundService } = NativeModules;

const isAndroid = Platform.OS === 'android';

export const startForegroundService = () =>
  isAndroid ? ForegroundService?.startService() : null;

export const stopForegroundService = () =>
  isAndroid ? ForegroundService?.stopService() : null;
