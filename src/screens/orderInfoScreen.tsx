import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OrderInfoScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Order Info Screen</Text>
    <Text>Navigated from FGS notification click!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 24},
});

export default OrderInfoScreen;