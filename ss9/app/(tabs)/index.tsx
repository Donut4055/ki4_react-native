import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useContacts } from '@/contexts/ContactsContext';
import { ContactListItem } from '@/components/ContactListItem';

export default function ContactsScreen() {
  const { contacts, deleteContact, toggleFavorite } = useContacts();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const filteredContacts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return contacts
      .filter(contact => {
        if (!query) return true;
        return (
          contact.name.toLowerCase().includes(query) ||
          contact.phone.includes(query) ||
          (contact.email && contact.email.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [contacts, searchQuery]);

  const handleAddContact = () => {
    router.push('/add-contact');
  };

  const handleContactPress = (id: string) => {
    router.push(`/contact-detail?id=${id}`);
  };

  const handleDeleteContact = (id: string) => {
    deleteContact(id);
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Contacts',
          headerRight: () => (
            <TouchableOpacity onPress={handleAddContact} style={styles.addButton}>
              <Ionicons name="add" size={24} color={colors.tint} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Ionicons
          name="search"
          size={20}
          color={colors.secondaryText}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search contacts..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>

      {filteredContacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="people-outline"
            size={64}
            color={colors.secondaryText}
            style={styles.emptyIcon}
          />
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            {searchQuery ? 'No matching contacts' : 'No contacts yet'}
          </Text>
          {!searchQuery && (
            <TouchableOpacity
              style={[styles.addFirstButton, { backgroundColor: colors.tint }]}
              onPress={handleAddContact}>
              <Text style={styles.addFirstButtonText}>Add Your First Contact</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ContactListItem
              contact={item}
              onFavoriteToggle={handleToggleFavorite}
              onDelete={handleDeleteContact}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {filteredContacts.length > 0 && (
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.tint }]}
          onPress={handleAddContact}>
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    paddingBottom: 80, // Extra padding for FAB
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    opacity: 0.5,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  addFirstButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addFirstButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButton: {
    marginRight: 16,
  },
});
