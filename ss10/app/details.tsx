import { View, Text, StyleSheet, Button } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const PRODUCTS = {
  '1': { id: '1', name: 'iPhone 15', price: 24990000, description: 'Điện thoại thông minh cao cấp' },
  '2': { id: '2', name: 'Samsung Galaxy S23', price: 21990000, description: 'Điện thoại Android mạnh mẽ' },
  '3': { id: '3', name: 'MacBook Pro M2', price: 42990000, description: 'Laptop chuyên nghiệp' },
  '4': { id: '4', name: 'AirPods Pro', price: 5990000, description: 'Tai nghe không dây chống ồn' },
  '5': { id: '5', name: 'iPad Pro', price: 18990000, description: 'Máy tính bảng đa năng' },
};

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  
  const product = PRODUCTS[productId as string];

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy sản phẩm</Text>
        <Button title="Quay lại" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Chi tiết sản phẩm',
          headerShown: true
        }} 
      />
      
      <View style={styles.card}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price.toLocaleString()} VNĐ</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Quay lại" 
            onPress={() => router.back()}
            color="#3498db"
          />
          <Button 
            title="Mua ngay" 
            onPress={() => alert('Đã thêm vào giỏ hàng: ' + product.name)}
            color="#2ecc71"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  productPrice: {
    fontSize: 20,
    color: '#e74c3c',
    fontWeight: '600',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});