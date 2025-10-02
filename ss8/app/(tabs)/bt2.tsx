import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet, Text, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Bt2Screen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    loadDarkModePreference();
  }, []);

  const loadDarkModePreference = async () => {
    try {
      const savedPreference = await AsyncStorage.getItem('darkMode');
      if (savedPreference !== null) {
        setIsEnabled(JSON.parse(savedPreference));
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  const toggleSwitch = async () => {
    try {
      const newValue = !isEnabled;
      setIsEnabled(newValue);
      await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Chế độ ban đêm</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text style={[styles.hint, isDarkMode && styles.darkText]}>
        {isEnabled ? 'Chế độ ban đêm đang bật' : 'Chế độ ban đêm đang tắt'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkText: {
    color: '#fff',
  },
  settingText: {
    fontSize: 16,
    color: '#000',
  },
  hint: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
