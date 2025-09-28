import React from 'react';
import { View } from 'react-native';
import { BusinessCard } from '@/components/BusinessCard';

const defaultAvatar = require('@/assets/images/avatar-placeholder.png');

export default function BusinessCardScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BusinessCard 
        avatarUrl={defaultAvatar}
        name="John Doe"
        jobTitle="Lập trình viên React Native"
        contactInfo="john.doe@example.com | +84 123 456 789"
      />
    </View>
  );
}
