import { Colors } from '@/constants/theme';
import { useContacts } from '@/contexts/ContactsContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ContactDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getContact, deleteContact, toggleFavorite } = useContacts();
  const contact = getContact(id!);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isEditing, setIsEditing] = useState(false);

  if (!contact) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.text }]}>
          Contact not found
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteContact(contact.id);
            router.back();
          },
        },
      ]
    );
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(contact.id);
  };

  const handleEdit = () => {
    router.push({
      pathname: '/edit-contact',
      params: { id: contact.id }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Contact Details',
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleFavoriteToggle} style={styles.headerButton}>
                <Ionicons
                  name={contact.isFavorite ? 'star' : 'star-outline'}
                  size={24}
                  color={contact.isFavorite ? colors.tint : colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEdit} style={styles.headerButton}>
                <Ionicons name="pencil" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          {contact.avatar ? (
            <Image source={{ uri: contact.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.tint }]}>
              <Text style={styles.avatarText}>
                {contact.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={[styles.name, { color: colors.text }]}>{contact.name}</Text>
          {contact.isFavorite && (
            <View style={styles.favoriteBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
            </View>
          )}
        </View>

        <View style={[styles.detailsContainer, { backgroundColor: colors.card }]}>
          {contact.phone && (
            <View style={styles.detailItem}>
              <Ionicons name="call" size={24} color={colors.tint} />
              <View style={styles.detailTextContainer}>
                <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>
                  Phone
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {contact.phone}
                </Text>
              </View>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="call" size={24} color={colors.tint} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble" size={24} color={colors.tint} />
              </TouchableOpacity>
            </View>
          )}

          {contact.email && (
            <View style={styles.detailItem}>
              <Ionicons name="mail" size={24} color={colors.tint} />
              <View style={styles.detailTextContainer}>
                <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>
                  Email
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {contact.email}
                </Text>
              </View>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="mail" size={24} color={colors.tint} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.deleteButton, { borderColor: colors.border }]}
            onPress={handleDelete}>
            <Ionicons name="trash" size={20} color="#ff3b30" />
            <Text style={[styles.deleteButtonText, { color: '#ff3b30' }]}>
              Delete Contact
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
    marginRight: 16,
  },
  headerButton: {
    marginLeft: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 24,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 100,
    right: '40%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  detailsContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  deleteButtonText: {
    marginLeft: 8,
    fontWeight: '600',
  },
  notFoundText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});
