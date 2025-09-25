import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Step1Props {
  data: {
    name: string;
    age: string;
  };
  onChange: (field: 'name' | 'age', value: string) => void;
  errors: Record<string, string>;
}

const Step1: React.FC<Step1Props> = ({ data, onChange, errors }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nhập họ và tên"
          value={data.name}
          onChangeText={(text) => onChange('name', text)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tuổi</Text>
        <TextInput
          style={[styles.input, errors.age && styles.inputError]}
          placeholder="Nhập tuổi"
          value={data.age}
          onChangeText={(text) => onChange('age', text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
        />
        {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#2c3e50',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#34495e',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 4,
  },
});

export default Step1;
