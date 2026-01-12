import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ChangeAddressScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Change Address Screen</Text>
    <Text>Navigated from FGS action button!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 24},
});

export default ChangeAddressScreen;