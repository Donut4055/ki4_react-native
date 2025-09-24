import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import Header from '../../components/Header';

const HeaderDemo = () => {
  return (
    <View style={styles.container}>
      <Header title="Tiêu đề ứng dụng" />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nội dung chính</Text>
          <Text style={styles.text}>
            Đây là nội dung chính của ứng dụng. Bạn có thể thêm bất kỳ thành phần nào vào đây.
            Header phía trên sẽ thay đổi giao diện tùy theo nền tảng (iOS/Android).
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin thêm</Text>
          <Text style={styles.text}>
            Trên iOS: Header có nền trắng, chữ đen, tiêu đề căn giữa.
            Trên Android: Header có nền xanh dương, chữ trắng, tiêu đề căn trái.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});

export default HeaderDemo;
