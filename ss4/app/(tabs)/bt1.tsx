import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import UserInfoCard from '../../components/UserInfoCard';

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

export default function BT1Screen() {
  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {users.map((user) => (
          <UserInfoCard
            key={user.id}
            name={user.name}
            email={user.email}
            avatarUrl={user.avatarUrl}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingVertical: 16,
  },
});
