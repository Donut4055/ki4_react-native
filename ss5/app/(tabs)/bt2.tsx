import React from 'react';
import { View, ScrollView } from 'react-native';
import { BusinessCard } from '@/components/BusinessCard';

const avatar1 = require('@/assets/images/avatar1.jpg');
const avatar2 = require('@/assets/images/avatar2.jpg');

export default function BusinessCardScreen() {
  const businessCards = [
    {
      id: 1,
      avatarUrl: avatar1,
      name: 'John Doe',
      jobTitle: 'Senior React Native Developer',
      contactInfo: 'john.doe@example.com | +84 123 456 789'
    },
    {
      id: 2,
      avatarUrl: avatar2,
      name: 'Jane Smith',
      jobTitle: 'Mobile App Designer',
      contactInfo: 'jane.smith@example.com | +84 987 654 321'
    },
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {businessCards.map((card) => (
        <View key={card.id} style={{ marginBottom: 20 }}>
          <BusinessCard
            avatarUrl={card.avatarUrl}
            name={card.name}
            jobTitle={card.jobTitle}
            contactInfo={card.contactInfo}
          />
        </View>
      ))}
    </ScrollView>
  );
}
