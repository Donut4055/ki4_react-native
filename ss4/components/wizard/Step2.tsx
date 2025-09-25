import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Step2Props {
  data: {
    phone: string;
    address: string;
  };
  onChange: (field: 'phone' | 'address', value: string) => void;
  errors: Record<string, string>;
}

const Step2: React.FC<Step2Props> = ({ data, onChange, errors }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin liên hệ</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="Nhập số điện thoại"
          value={data.phone}
          onChangeText={(text) => onChange('phone', text.replace(/[^0-9]/g, ''))}
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={[styles.input, styles.multilineInput, errors.address && styles.inputError]}
          placeholder="Nhập địa chỉ"
          value={data.address}
          onChangeText={(text) => onChange('address', text)}
          multiline
          numberOfLines={3}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
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
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
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

export default Step2;
