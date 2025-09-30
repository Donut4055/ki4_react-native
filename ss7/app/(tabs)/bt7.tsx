import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function Bt7Screen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.indicator, isLandscape ? styles.landscape : styles.portrait]}>
          <Text style={styles.indicatorText}>
            {isLandscape ? 'Màn hình ngang' : 'Màn hình dọc'}
          </Text>
        </View>
        <Text style={styles.dimensions}>
          {width.toFixed(0)} x {height.toFixed(0)} pixels
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  indicator: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  portrait: {
    backgroundColor: '#4CAF50',
  },
  landscape: {
    backgroundColor: '#2196F3',
  },
  indicatorText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dimensions: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
