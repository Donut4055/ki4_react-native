import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function Bt3Screen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Họ và tên:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ và tên..."
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Email:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nhập email của bạn..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Số điện thoại:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại..."
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginTop: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
});
