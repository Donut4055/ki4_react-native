import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function Bt2Screen() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrease = () => {
    setCount(prevCount => Math.max(0, prevCount - 1)); // Prevent negative numbers
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.counterContainer}>
        <ThemedText type="default" style={styles.counterText}>
          {count}
        </ThemedText>
      </View>
      
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.decreaseButton]}
          onPress={decrease}
          android_ripple={{ color: '#c7a4ff' }}
        >
          <ThemedText style={styles.buttonText}>Giảm</ThemedText>
        </Pressable>
        
        <View style={styles.buttonSpacer} />
        
        <Pressable 
          style={[styles.button, styles.increaseButton]}
          onPress={increase}
          android_ripple={{ color: '#a370f7' }}
        >
          <ThemedText style={styles.buttonText}>Tăng</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 0,
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  counterText: {
    fontSize: 80,
    fontWeight: '200',
    color: '#000',
    fontFamily: 'System',
    includeFontPadding: false,
    textAlign: 'center',
    width: '100%',
    lineHeight: 100,
    marginTop: -20, 
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 60,
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  increaseButton: {
    backgroundColor: '#6200ee',
  },
  decreaseButton: {
    backgroundColor: '#3700b3',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSpacer: {
    width: 20,
  },
});
