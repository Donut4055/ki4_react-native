import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ContactForm } from '@/components/ContactForm';
import { useContacts } from '@/contexts/ContactsContext';

export default function AddContactScreen() {
  const { addContact } = useContacts();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSubmit = (data: any) => {
    addContact(data);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Add New Contact',
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <ContactForm onSubmit={handleSubmit} onCancel={handleCancel} />
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
