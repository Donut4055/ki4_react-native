import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';

const generateImageUrls = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    uri: `https://picsum.photos/400/400?random=${index}`,
    width: 400,
    height: 400,
  }));
};

const ImageGalleryScreen = () => {
  const images = generateImageUrls(30); 
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 16 - (numColumns - 1) * 8) / numColumns; 

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Thư viện ảnh</ThemedText>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {images.map((image) => (
            <TouchableOpacity 
              key={image.id} 
              style={[styles.imageContainer, { width: imageSize, height: imageSize }]}
              activeOpacity={0.7}
              onPress={() => {
                console.log('Pressed image:', image.id);
              }}
            >
              <Image 
                source={{ uri: image.uri }} 
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  scrollContainer: {
    paddingHorizontal: 8, 
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginBottom: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageGalleryScreen;
