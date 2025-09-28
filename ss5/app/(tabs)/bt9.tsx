import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import TrafficLight from '@/components/TrafficLight';

export default function TrafficLightScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Text style={styles.title}>Đèn Giao Thông</Text>
      <Text style={styles.subtitle}>Nhấn nút để chuyển đèn</Text>
      <TrafficLight />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
});
