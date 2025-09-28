import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, ImageSourcePropType } from 'react-native';
import { Colors } from '@/constants/theme';

type BusinessCardProps = {
  avatarUrl: ImageSourcePropType;
  name: string;
  jobTitle: string;
  contactInfo: string;
};

export const BusinessCard = ({
  avatarUrl,
  name,
  jobTitle,
  contactInfo,
}: BusinessCardProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.card}>
        <Image 
          source={avatarUrl} 
          style={styles.avatar} 
          resizeMode="cover"
        />
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.title, { color: colors.tint }]}>{jobTitle}</Text>
        <Text style={[styles.contact, { color: colors.text }]}>{contactInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#4a90e2',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  contact: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
