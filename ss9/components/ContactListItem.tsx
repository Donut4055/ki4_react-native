import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Contact } from '@/types/contact';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface ContactListItemProps {
  contact: Contact;
  onFavoriteToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
type RootStackParamList = {
    'contact-detail': { id: string };
  };


export const ContactListItem: React.FC<ContactListItemProps> = ({
  contact,
  onFavoriteToggle,
  onDelete,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    navigation.navigate('contact-detail', { id: contact.id });
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={handlePress}>
      {contact.avatar ? (
        <Image source={{ uri: contact.avatar }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
          <Text style={styles.avatarText}>
            {contact.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{contact.name}</Text>
        {contact.phone ? (
          <Text style={[styles.phone, { color: colors.secondaryText }]}>
            {contact.phone}
          </Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onFavoriteToggle(contact.id)}
          style={styles.favoriteButton}>
          <Ionicons
            name={contact.isFavorite ? 'star' : 'star-outline'}
            size={24}
            color={contact.isFavorite ? colors.tint : colors.secondaryText}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
  },
});
