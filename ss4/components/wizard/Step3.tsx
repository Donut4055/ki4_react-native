import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FormData {
  name: string;
  age: string;
  phone: string;
  address: string;
}

interface Step3Props {
  data: FormData;
}

const Step3: React.FC<Step3Props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="check-circle" size={48} color="#2ecc71" />
        <Text style={styles.title}>Xác nhận thông tin</Text>
        <Text style={styles.subtitle}>Vui lòng kiểm tra kỹ thông tin trước khi hoàn tất</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Họ và tên:</Text>
          <Text style={styles.value}>{data.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tuổi:</Text>
          <Text style={styles.value}>{data.age}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>{data.phone}</Text>
        </View>
        <View style={[styles.infoRow, styles.addressRow]}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={[styles.value, styles.addressText]}>{data.address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  addressRow: {
    alignItems: 'flex-start',
  },
  label: {
    width: 120,
    fontSize: 15,
    color: '#7f8c8d',
  },
  value: {
    flex: 1,
    fontSize: 15,
    color: '#2c3e50',
    fontWeight: '500',
  },
  addressText: {
    flex: 1,
    textAlign: 'left',
  },
});

export default Step3;
