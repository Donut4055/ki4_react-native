import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, CameraPermissionResponse } from 'expo-camera';

interface CameraPermissionProps {
  onPermissionGranted: () => void;
}

export default function CameraPermission({ onPermissionGranted }: CameraPermissionProps) {
  const [permission, setPermission] = useState<CameraPermissionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    setPermission({ status } as CameraPermissionResponse);
  };

  const requestPermission = async () => {
    setIsLoading(true);
    try {
      const result = await Camera.requestCameraPermissionsAsync();
      setPermission(result);
      
      if (result.status === 'granted') {
        Alert.alert('Thành công', 'Quyền camera đã được cấp!');
        onPermissionGranted();
      } else {
        Alert.alert('Thất bại', 'Quyền camera đã bị từ chối!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi yêu cầu quyền camera!');
    } finally {
      setIsLoading(false);
    }
  };

  const getPermissionStatus = () => {
    if (!permission) return 'Chưa xác định';
    switch (permission.status) {
      case 'granted':
        return 'Đã cấp quyền';
      case 'denied':
        return 'Đã từ chối';
      case 'undetermined':
        return 'Chưa xác định';
      default:
        return 'Chưa xác định';
    }
  };

  const getStatusColor = () => {
    if (!permission) return '#666';
    switch (permission.status) {
      case 'granted':
        return '#4CAF50';
      case 'denied':
        return '#F44336';
      case 'undetermined':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yêu cầu quyền Camera</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Trạng thái quyền:</Text>
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getPermissionStatus()}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={requestPermission}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Đang xử lý...' : 'Yêu cầu quyền Camera'}
        </Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  statusContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 200,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
