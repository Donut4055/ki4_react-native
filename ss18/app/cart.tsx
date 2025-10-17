// app/(tabs)/cart.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Alert,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import { useCart } from '@/hooks/useCart';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { clearCart as clearCartApi } from '@/services/api';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';
import { getCurrentUser } from '@/utils/auth';

interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}

export default function CartScreen() {
  const { items, totalQuantity, totalAmount, updateItemQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    checkUser();
  }, []);
  
  const handleClearCart = async () => {
    Alert.alert(
      'Xoá giỏ hàng',
      'Bạn có chắc chắn muốn xoá tất cả sản phẩm khỏi giỏ hàng?',
      [
        { text: 'Huỷ', style: 'cancel' },
        { 
          text: 'Xoá', 
          onPress: async () => {
            try {
              await clearCartApi();
              dispatch(clearCart());
            } catch (error) {
              console.error('Error clearing cart:', error);
              Alert.alert('Lỗi', 'Không thể xoá giỏ hàng. Vui lòng thử lại.');
            }
          }, 
          style: 'destructive' 
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage} 
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateItemQuantity(item.id, item.quantity - 1)}
          >
            <MaterialIcons name="remove" size={16} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            <MaterialIcons name="add" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <MaterialIcons name="close" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyCart}>
        <MaterialIcons name="shopping-cart" size={80} color="#ddd" />
        <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
        <Text style={styles.emptySubtitle}>Hãy thêm sản phẩm vào giỏ hàng nhé!</Text>
        <TouchableOpacity 
          style={styles.continueShoppingButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.continueShoppingText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footer} />}
      />
      
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Tổng cộng ({totalQuantity} sản phẩm)</Text>
          <Text style={styles.totalAmount}>{totalAmount.toLocaleString()} đ</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.clearButton]}
          onPress={handleClearCart}
        >
          <Text style={styles.clearButtonText}>Xoá giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.checkoutButton]}
          onPress={() => router.push('/(tabs)/checkout')}
        >
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  listContent: ViewStyle;
  cartItem: ViewStyle;
  productImage: ImageStyle;
  itemDetails: ViewStyle;
  productName: TextStyle;
  productPrice: TextStyle;
  quantityContainer: ViewStyle;
  quantityButton: ViewStyle;
  quantityText: TextStyle;
  removeButton: ViewStyle;
  emptyCart: ViewStyle;
  emptyTitle: TextStyle;
  emptySubtitle: TextStyle;
  continueShoppingButton: ViewStyle;
  continueShoppingText: TextStyle;
  clearCartButton: ViewStyle;
  clearCartText: TextStyle;
  summary: ViewStyle;
  summaryRow: ViewStyle;
  summaryText: TextStyle;
  totalAmount: TextStyle;
  buttonContainer: ViewStyle;
  actionButton: ViewStyle;
  clearButton: ViewStyle;
  clearButtonText: TextStyle;
  checkoutButton: ViewStyle;
  checkoutButtonText: TextStyle;
  footer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  footer: {
    height: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
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
    marginRight: 16,
    backgroundColor: '#f9f9f9',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  continueShoppingButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  continueShoppingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearCartButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  clearCartText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  clearButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
