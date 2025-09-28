import { LikeButton } from '@/components/LikeButton';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function LikeButtonScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <LikeButton style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: 150,
  },
  noteContainer: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  noteText: {
    color: '#6c757d',
    textAlign: 'center',
    fontSize: 14,
  },
});
