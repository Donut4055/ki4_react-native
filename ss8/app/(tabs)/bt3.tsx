import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Bt3Screen() {
  const [count, setCount] = useState(0);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    loadSavedCount();
  }, []);

  const loadSavedCount = async () => {
    try {
      const savedCount = await AsyncStorage.getItem('counter');
      if (savedCount !== null) {
        setCount(Number(savedCount));
      }
    } catch (error) {
      console.error('Error loading count:', error);
    }
  };

  const saveCount = async (newCount: number) => {
    try {
      await AsyncStorage.setItem('counter', newCount.toString());
    } catch (error) {
      console.error('Error saving count:', error);
    }
  };

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    saveCount(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    saveCount(newCount);
  };

  const reset = () => {
    setCount(0);
    saveCount(0);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.counterText, isDarkMode && styles.darkText]}>
        {count}
      </Text>
      
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Tăng"
            onPress={increment}
            color="#4CAF50"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Giảm"
            onPress={decrement}
            color="#F44336"
          />
        </View>
      </View>
      
      <View style={styles.resetButton}>
        <Button
          title="Đặt lại"
          onPress={reset}
          color="#9E9E9E"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  counterText: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  buttonWrapper: {
    marginHorizontal: 10,
    minWidth: 100,
  },
  resetButton: {
    width: '80%',
    marginTop: 20,
  },
});
