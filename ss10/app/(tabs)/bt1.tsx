import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const products: Product[] = [
  { id: '1', name: 'iPhone 15', price: 24990000, description: 'Điện thoại thông minh cao cấp' },
  { id: '2', name: 'Samsung Galaxy S23', price: 21990000, description: 'Điện thoại Android mạnh mẽ' },
  { id: '3', name: 'MacBook Pro M2', price: 42990000, description: 'Laptop chuyên nghiệp' },
  { id: '4', name: 'AirPods Pro', price: 5990000, description: 'Tai nghe không dây chống ồn' },
  { id: '5', name: 'iPad Pro', price: 18990000, description: 'Máy tính bảng đa năng' },
];

export default function ProductListScreen() {
  const router = useRouter();

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => router.push({
        pathname: '/details',
        params: { productId: item.id, productName: item.name }
      })}
    >
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price.toLocaleString()} VNĐ</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Danh sách sản phẩm',
          headerShown: true
        }} 
      />
      
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  productItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '500',
  },
});
