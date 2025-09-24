import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

type ProfileCardProps = {
  name: string;
  role: string;
  avatarUrl?: ImageSourcePropType | string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  avatarUrl = 'https://i.pravatar.cc/150',
}) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: typeof avatarUrl === 'string' ? avatarUrl : '' }} 
        style={styles.avatar} 
        defaultSource={require('../assets/images/default-avatar.png')}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  role: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ProfileCard;
