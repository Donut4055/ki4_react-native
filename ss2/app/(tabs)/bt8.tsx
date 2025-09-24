import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import CustomButton from '@/components/CustomButton';

const ButtonShowcase = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = (buttonName: string) => {
    Alert.alert('Thông báo', `Bạn đã nhấn vào nút ${buttonName}`);
  };

  const handleLongPress = (buttonName: string) => {
    Alert.alert('Thông báo', `Bạn đã nhấn giữ nút ${buttonName}`);
  };

  const simulateAsyncAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Thành công', 'Tác vụ đã hoàn thành!');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedText style={styles.title}>Thư viện nút bấm</ThemedText>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Nút chính (Primary)</ThemedText>
        <View style={styles.buttonGroup}>
          <CustomButton 
            title="Nút chính" 
            variant="primary" 
            onPress={() => handlePress('chính')}
            style={styles.button}
          />
          <CustomButton 
            title="Đang tải..." 
            variant="primary" 
            onPress={simulateAsyncAction}
            style={styles.button}
            disabled={isLoading}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Nút phụ (Secondary)</ThemedText>
        <View style={styles.buttonGroup}>
          <CustomButton 
            title="Nút phụ" 
            variant="secondary" 
            onPress={() => handlePress('phụ')}
            style={styles.button}
          />
          <CustomButton 
            title="Nhấn giữ tôi" 
            variant="secondary" 
            onLongPress={() => handleLongPress('phụ')}
            style={styles.button}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Nút nguy hiểm (Danger)</ThemedText>
        <View style={styles.buttonGroup}>
          <CustomButton 
            title="Xóa tài khoản" 
            variant="danger" 
            onPress={() => handlePress('nguy hiểm')}
            style={[styles.button, { flex: 1 }]}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Nút bị vô hiệu hóa</ThemedText>
        <View style={styles.buttonGroup}>
          <CustomButton 
            title="Nút vô hiệu hóa" 
            variant="disabled" 
            style={[styles.button, { flex: 1 }]}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Nút tùy chỉnh</ThemedText>
        <View style={styles.buttonGroup}>
          <CustomButton 
            title="Nút tròn" 
            variant="primary" 
            onPress={() => handlePress('tròn')}
            style={[styles.button, { borderRadius: 25, paddingVertical: 8 }]}
            textStyle={{ fontSize: 14 }}
          />
          <CustomButton 
            title="Nút rộng" 
            variant="secondary" 
            onPress={() => handlePress('rộng')}
            style={[styles.button, { flex: 1 }]}
          />
        </View>
        <View style={[styles.buttonGroup, { marginTop: 12 }]}>
          <CustomButton 
            title="Nút nhỏ" 
            variant="primary" 
            onPress={() => handlePress('nhỏ')}
            style={[styles.button, { paddingVertical: 6, paddingHorizontal: 12 }]}
            textStyle={{ fontSize: 12 }}
          />
          <CustomButton 
            title="Nút lớn" 
            variant="primary" 
            onPress={() => handlePress('lớn')}
            style={[styles.button, { paddingVertical: 16 }]}
            textStyle={{ fontSize: 18 }}
          />
        </View>
      </View>

      <View style={[styles.section, { marginBottom: 40 }]}>
        <ThemedText style={styles.sectionTitle}>Nút full chiều rộng</ThemedText>
        <CustomButton 
          title="Nút toàn màn hình" 
          variant="primary" 
          fullWidth 
          onPress={() => handlePress('toàn màn hình')}
          style={{ marginTop: 8 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

export default function Bt8Screen() {
  return <ButtonShowcase />;
}
