import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '@/types/contact';

interface ContactsContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getContact: (id: string) => Contact | undefined;
}

const STORAGE_KEY = '@ContactsApp:contacts';

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Load contacts from AsyncStorage on mount
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.error('Failed to load contacts', error);
      }
    };

    loadContacts();
  }, []);

  // Save contacts to AsyncStorage whenever it changes
  const saveContacts = async (updatedContacts: Contact[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Failed to save contacts', error);
    }
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      isFavorite: false,
    };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    saveContacts(updatedContacts);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, ...updates } : contact
    );
    setContacts(updatedContacts);
    saveContacts(updatedContacts);
  };

  const deleteContact = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    saveContacts(updatedContacts);
  };

  const toggleFavorite = (id: string) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact
    );
    setContacts(updatedContacts);
    saveContacts(updatedContacts);
  };

  const getContact = (id: string) => {
    return contacts.find(contact => contact.id === id);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        toggleFavorite,
        getContact,
      }}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};
