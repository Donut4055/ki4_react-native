import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Bt1Screen() {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [isNameSaved, setIsNameSaved] = useState(false);

  useEffect(() => {
    loadSavedName();
  }, []);

  const loadSavedName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName !== null) {
        setSavedName(storedName);
        setIsNameSaved(true);
      }
    } catch (error) {
      console.error('Error loading name:', error);
      Alert.alert('Lỗi', 'Không thể tải tên đã lưu');
    }
  };

  const saveName = async () => {
    if (name.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập tên của bạn');
      return;
    }

    try {
      await AsyncStorage.setItem('userName', name);
      setSavedName(name);
      setIsNameSaved(true);
      Alert.alert('Thành công', 'Tên đã được lưu thành công!');
    } catch (error) {
      console.error('Error saving name:', error);
      Alert.alert('Lỗi', 'Không thể lưu tên');
    }
  };

  const resetName = () => {
    setName('');
    setSavedName('');
    setIsNameSaved(false);
  };

  return (
    <View style={styles.container}>
      {isNameSaved ? (
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Chào mừng trở lại, {savedName}!
          </Text>
          <Button title="Đổi tên" onPress={resetName} />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên của bạn"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <Button title="Lưu" onPress={saveName} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 300,
  },
  greetingContainer: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  greetingText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
