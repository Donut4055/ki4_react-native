import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ProductItem from '../../components/ProductItem';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const ShopScreen: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: 'iPhone 13 Pro', price: 24990000 },
    { id: 2, name: 'Samsung Galaxy S21', price: 19990000 },
    { id: 3, name: 'Xiaomi 12', price: 17990000 },
    { id: 4, name: 'OPPO Find X5', price: 21990000 },
    { id: 5, name: 'Google Pixel 6', price: 15990000 },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          return [...prevCart, { ...product, quantity: 1 }];
        }
        return prevCart;
      }
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductItem
      id={item.id}
      name={item.name}
      price={item.price}
      onAddToCart={addToCart}
    />
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <MaterialIcons name="remove-shopping-cart" size={48} color="#bdc3c7" />
      <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
    </View>
  );

  const renderCartSummary = () => (
    <View style={styles.cartSummary}>
      <View style={styles.cartSummaryContent}>
        <MaterialIcons name="shopping-cart" size={24} color="#2c3e50" />
        <Text style={styles.cartSummaryText}>
          Số mặt hàng trong giỏ: <Text style={styles.cartCount}>{getTotalItems()}</Text>
        </Text>
      </View>
      {cart.length > 0 && (
        <TouchableOpacity 
          style={styles.viewCartButton}
          onPress={() => {
            console.log('View cart:', cart);
          }}
        >
          <Text style={styles.viewCartButtonText}>Xem giỏ hàng</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderCartSummary()}
      
      {cart.length === 0 && renderEmptyCart()}
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  cartSummary: {
    backgroundColor: '#ecf0f1',
    padding: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
  },
  cartSummaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartSummaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 8,
  },
  cartCount: {
    color: '#e74c3c',
    fontSize: 18,
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    opacity: 0.6,
  },
  emptyCartText: {
    marginTop: 12,
    color: '#7f8c8d',
    fontSize: 16,
  },
  viewCartButton: {
    marginTop: 12,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ShopScreen;
