import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraPermission from '../components/CameraPermission';
import MediaSelection from '../components/MediaSelection';
import CameraComponent from '../components/CameraComponent';
import MediaPreview from '../components/MediaPreview';

type ScreenState = 'permission' | 'selection' | 'camera' | 'preview';

export default function CameraApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('permission');
  const [capturedMedia, setCapturedMedia] = useState<{ uri: string } | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  const handlePermissionGranted = () => {
    setCurrentScreen('selection');
  };

  const handleMediaSelected = (media: { uri: string }, videoMode?: boolean) => {
    if (media.uri === '') {
      // Camera mode
      setCurrentScreen('camera');
      setIsVideo(false);
    } else {
      // Library mode
      setCapturedMedia(media);
      setIsVideo(videoMode || false);
      setCurrentScreen('preview');
    }
  };

  const handlePhotoTaken = (media: { uri: string }) => {
    setCapturedMedia(media);
    setCurrentScreen('preview');
  };

  const handleRetake = () => {
    setCapturedMedia(null);
    setCurrentScreen('camera');
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'selection':
        setCurrentScreen('permission');
        break;
      case 'camera':
        setCurrentScreen('selection');
        break;
      case 'preview':
        setCurrentScreen('selection');
        break;
      default:
        break;
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'permission':
        return (
          <CameraPermission onPermissionGranted={handlePermissionGranted} />
        );
      
      case 'selection':
        return (
          <MediaSelection
            onMediaSelected={handleMediaSelected}
            onBack={handleBack}
          />
        );
      
      case 'camera':
        return (
          <CameraComponent
            onPhotoTaken={handlePhotoTaken}
            onBack={handleBack}
          />
        );
      
      case 'preview':
        return capturedMedia ? (
          <MediaPreview
            media={capturedMedia}
            onRetake={handleRetake}
            onBack={handleBack}
            isVideo={isVideo}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
