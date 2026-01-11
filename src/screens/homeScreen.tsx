import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
  startForegroundService,
  stopForegroundService,
} from '../foregroundServices';

const HomeScreen = () => (
  <View style={styles.container}>
    <Button title="Start Service" onPress={startForegroundService} />
    <Button title="Stop Service" onPress={stopForegroundService} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
});

export default HomeScreen;
