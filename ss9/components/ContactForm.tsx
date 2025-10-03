import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Contact, ContactFormData } from '@/types/contact';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface ContactFormProps {
  initialData?: Partial<Contact>;
  onSubmit: (data: Omit<Contact, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
  });

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        avatar: initialData.avatar || '',
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Phone number is required');
      return;
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    onSubmit({
      ...formData,
      isFavorite: initialData?.isFavorite || false,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Name *</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.card, 
              color: colors.text,
              borderColor: colors.border 
            },
          ]}
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
          placeholder="Full Name"
          placeholderTextColor={colors.secondaryText}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Phone Number *</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.card, 
              color: colors.text,
              borderColor: colors.border 
            },
          ]}
          value={formData.phone}
          onChangeText={text => handleChange('phone', text)}
          placeholder="Phone Number"
          placeholderTextColor={colors.secondaryText}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.card, 
              color: colors.text,
              borderColor: colors.border 
            },
          ]}
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
          placeholder="Email"
          placeholderTextColor={colors.secondaryText}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={handleSubmit}>
          <Text style={[styles.buttonText, { color: 'white' }]}>
            {isEditing ? 'Update Contact' : 'Add Contact'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
