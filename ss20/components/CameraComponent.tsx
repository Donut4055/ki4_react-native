import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

interface CameraComponentProps {
  onPhotoTaken: (photo: { uri: string }) => void;
  onBack: () => void;
}

export default function CameraComponent({ onPhotoTaken, onBack }: CameraComponentProps) {
  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off);
  const [isVideoMode, setIsVideoMode] = useState(false);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      onPhotoTaken(photo);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chụp ảnh!');
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current) return;

    try {
      setIsRecording(true);
      await cameraRef.current.recordAsync({
        quality: Camera.Constants.VideoQuality['720p'],
      });
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể bắt đầu quay video!');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!cameraRef.current) return;

    try {
      const video = await cameraRef.current.stopRecording();
      setIsRecording(false);
      onPhotoTaken(video);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể dừng quay video!');
      setIsRecording(false);
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => 
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlash = () => {
    setFlashMode(current => {
      switch (current) {
        case FlashMode.off:
          return FlashMode.on;
        case FlashMode.on:
          return FlashMode.auto;
        case FlashMode.auto:
          return FlashMode.off;
        default:
          return FlashMode.off;
      }
    });
  };

  const toggleMode = () => {
    setIsVideoMode(current => !current);
  };

  const getFlashIcon = () => {
    switch (flashMode) {
      case FlashMode.on:
        return 'flash';
      case FlashMode.auto:
        return 'flash-outline';
      case FlashMode.off:
      default:
        return 'flash-off';
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
      >
        {/* Header Controls */}
        <View style={styles.headerControls}>
          <TouchableOpacity style={styles.controlButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={toggleMode}>
            <Ionicons 
              name={isVideoMode ? "camera" : "videocam"} 
              size={30} 
              color="white" 
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <View style={styles.leftControls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
              <Ionicons name={getFlashIcon()} size={30} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
              <Ionicons name="camera-reverse" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.centerControls}>
            <TouchableOpacity
              style={[styles.captureButton, isRecording && styles.recordingButton]}
              onPress={isVideoMode ? (isRecording ? stopRecording : startRecording) : takePicture}
            >
              <View style={[styles.captureButtonInner, isRecording && styles.recordingButtonInner]} />
            </TouchableOpacity>
          </View>

          <View style={styles.rightControls}>
            <Text style={styles.modeText}>
              {isVideoMode ? (isRecording ? 'Đang quay...' : 'Video') : 'Ảnh'}
            </Text>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  headerControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  leftControls: {
    flexDirection: 'row',
    gap: 20,
  },
  centerControls: {
    flex: 1,
    alignItems: 'center',
  },
  rightControls: {
    alignItems: 'center',
    minWidth: 80,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  recordingButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  recordingButtonInner: {
    borderRadius: 8,
  },
  modeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
