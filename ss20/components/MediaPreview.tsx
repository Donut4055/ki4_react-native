import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';

interface MediaPreviewProps {
  media: { uri: string };
  onRetake: () => void;
  onBack: () => void;
  isVideo?: boolean;
}

const CLOUD_NAME = 'your-cloud-name'; // Thay thế bằng cloud name của bạn
const UPLOAD_PRESET = 'your-upload-preset'; // Thay thế bằng upload preset của bạn

export default function MediaPreview({ media, onRetake, onBack, isVideo = false }: MediaPreviewProps) {
  const [isUploading, setIsUploading] = useState(false);

  const compressImage = async (uri: string) => {
    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return result.uri;
    } catch (error) {
      console.log('Lỗi khi nén ảnh:', error);
      return uri; // Trả về uri gốc nếu có lỗi
    }
  };

  const uploadToCloudinary = async () => {
    setIsUploading(true);
    
    try {
      let mediaUri = media.uri;
      
      // Nén ảnh nếu không phải video
      if (!isVideo) {
        mediaUri = await compressImage(media.uri);
      }

      const formData = new FormData();
      
      // Xác định type của file
      const fileType = isVideo ? 'video/mp4' : 'image/jpeg';
      
      formData.append('file', {
        uri: mediaUri,
        type: fileType,
        name: isVideo ? 'video.mp4' : 'photo.jpg',
      } as any);
      
      formData.append('upload_preset', UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${isVideo ? 'video' : 'image'}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Upload thành công!', response.data.secure_url);
      Alert.alert('Thành công', 'Upload thành công!', [
        { text: 'OK', onPress: onBack }
      ]);

    } catch (error) {
      console.error('Lỗi upload:', error);
      Alert.alert('Thất bại', 'Upload thất bại! Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Media Display */}
      <View style={styles.mediaContainer}>
        {isVideo ? (
          <Video
            source={{ uri: media.uri }}
            style={styles.media}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            isLooping
          />
        ) : (
          <Image source={{ uri: media.uri }} style={styles.media} />
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.retakeButton]}
          onPress={onRetake}
          disabled={isUploading}
        >
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>Chụp lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.uploadButton]}
          onPress={uploadToCloudinary}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Ionicons name="cloud-upload" size={24} color="white" />
          )}
          <Text style={styles.buttonText}>
            {isUploading ? 'Đang upload...' : 'Tiếp tục'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    justifyContent: 'center',
  },
  retakeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
