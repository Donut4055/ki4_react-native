import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ContactForm } from '@/components/ContactForm';
import { useContacts } from '@/contexts/ContactsContext';

export default function EditContactScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getContact, updateContact } = useContacts();
  const [initialData, setInitialData] = useState<any>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (id) {
      const contact = getContact(id);
      if (contact) {
        setInitialData(contact);
      } else {
        Alert.alert('Error', 'Contact not found');
        router.back();
      }
    }
  }, [id, getContact]);

  const handleSubmit = (data: any) => {
    if (id) {
      updateContact(id, data);
      router.back();
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!initialData) {
    return null; // or a loading spinner
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Edit Contact',
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <ContactForm 
            initialData={initialData} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel} 
            isEditing 
          />
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
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
  },
});
