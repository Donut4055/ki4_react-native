import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Calculator } from '@/components/Calculator';

export default function CalculatorScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Calculator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
