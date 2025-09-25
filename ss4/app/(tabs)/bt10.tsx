import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PRODUCTS = [
  { 
    id: '1', 
    name: 'iPhone 13', 
    price: 21990000, 
    category: 'Điện thoại', 
    inStock: true,
    image: 'https://example.com/iphone13.jpg' 
  },
  { 
    id: '2', 
    name: 'Samsung Galaxy S21', 
    price: 19990000, 
    category: 'Điện thoại', 
    inStock: true,
    image: 'https://example.com/s21.jpg' 
  },
  { 
    id: '3', 
    name: 'MacBook Pro M1', 
    price: 32990000, 
    category: 'Laptop', 
    inStock: false,
    image: 'https://example.com/macbook.jpg' 
  },
  { 
    id: '4', 
    name: 'AirPods Pro', 
    price: 5990000, 
    category: 'Phụ kiện', 
    inStock: true,
    image: 'https://example.com/airpods.jpg' 
  },
  { 
    id: '5', 
    name: 'Dell XPS 15', 
    price: 45990000, 
    category: 'Laptop', 
    inStock: true,
    image: 'https://example.com/dellxps.jpg' 
  },
];

const categories = ['Tất cả', 'Điện thoại', 'Laptop', 'Phụ kiện'];

const ProductList = () => {
  const [searchText, setSearchText] = useState('');
  const [isStockOnly, setIsStockOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesStock = !isStockOnly || product.inStock;
      const matchesCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
      
      return matchesSearch && matchesStock && matchesCategory;
    });
  }, [searchText, isStockOnly, selectedCategory]);

  interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  image?: string;
}

const renderProductItem = ({ item }: { item: ProductItem }) => (
    <View style={styles.productCard}>
      <Image 
        source={{ uri: item.image || 'https://via.placeholder.com/80' }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>
          {item.price.toLocaleString('vi-VN')}₫
        </Text>
        <Text style={[styles.stockStatus, { color: item.inStock ? '#2ecc71' : '#e74c3c' }]}>
          {item.inStock ? 'Còn hàng' : 'Hết hàng'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách sản phẩm</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filterRow}>
        <View style={styles.stockFilter}>
          <Text style={styles.filterLabel}>Chỉ hiển thị còn hàng:</Text>
          <Switch
            value={isStockOnly}
            onValueChange={setIsStockOnly}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isStockOnly ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#3498db',
    borderBottomWidth: 1,
    borderBottomColor: '#2980b9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  filterContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  stockFilter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  productList: {
    padding: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 2,
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default ProductList;