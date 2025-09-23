import React from 'react';
import { StyleSheet, View, Image, Text, ImageSourcePropType } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';

type BusinessCardProps = {
  name: string;
  description: string;
  imageSource: ImageSourcePropType;
};

export function BusinessCard({ name, description, imageSource }: BusinessCardProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={imageSource} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <ThemedText type="title" style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.description}>{description}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
});
