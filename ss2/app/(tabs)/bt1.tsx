import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { BusinessCard } from '@/components/BusinessCard';

// You can replace this with your actual image
const PROFILE_IMAGE = require('@/assets/images/avatar.jpg');

export default function Bt1Screen() {
  return (
    <ThemedView style={styles.container}>
      <BusinessCard 
        name="Nguyễn Văn A"
        description="Lập trình viên React Native với 3 năm kinh nghiệm. Đam mê tạo ra những ứng dụng di động đẹp mắt và hiệu quả."
        imageSource={PROFILE_IMAGE}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
