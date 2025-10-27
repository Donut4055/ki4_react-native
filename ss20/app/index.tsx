import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera App Demo</Text>
      <Text style={styles.subtitle}>
        Ứng dụng camera hoàn chỉnh với React Native và Expo
      </Text>
      
      <View style={styles.features}>
        <Text style={styles.featureTitle}>Tính năng:</Text>
        <Text style={styles.feature}>• Chụp ảnh và quay video</Text>
        <Text style={styles.feature}>• Chọn từ thư viện</Text>
        <Text style={styles.feature}>• Upload lên Cloudinary</Text>
        <Text style={styles.feature}>• Nén ảnh tự động</Text>
        <Text style={styles.feature}>• Giao diện đẹp</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/camera')}
      >
        <Text style={styles.buttonText}>Mở Camera App</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Lưu ý: Cần thiết bị thật để test camera
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
  },
  features: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  feature: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});