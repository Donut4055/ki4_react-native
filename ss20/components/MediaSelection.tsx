import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface MediaSelectionProps {
  onMediaSelected: (media: { uri: string }, isVideo?: boolean) => void;
  onBack: () => void;
}

export default function MediaSelection({ onMediaSelected, onBack }: MediaSelectionProps) {
  const [isLoading, setIsLoading] = useState(false);

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Cần quyền', 'Cần quyền truy cập thư viện ảnh để chọn ảnh!');
      return false;
    }
    return true;
  };

  const openCamera = () => {
    onMediaSelected({ uri: '' }, false); // Trigger camera mode
  };

  const openImageLibrary = async () => {
    setIsLoading(true);
    
    try {
      const hasPermission = await requestMediaLibraryPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const isVideo = asset.type === 'video';
        onMediaSelected({ uri: asset.uri }, isVideo);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể mở thư viện ảnh!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Chọn phương thức</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Bạn muốn chụp ảnh mới hay chọn từ thư viện?
        </Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={openCamera}
            disabled={isLoading}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="camera" size={50} color="#2196F3" />
            </View>
            <Text style={styles.optionTitle}>Chụp ảnh</Text>
            <Text style={styles.optionDescription}>
              Sử dụng camera để chụp ảnh hoặc quay video mới
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={openImageLibrary}
            disabled={isLoading}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="images" size={50} color="#4CAF50" />
            </View>
            <Text style={styles.optionTitle}>Chọn từ Thư viện</Text>
            <Text style={styles.optionDescription}>
              Chọn ảnh hoặc video từ thư viện thiết bị
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  options: {
    gap: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
