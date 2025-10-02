import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Alert,
  useColorScheme
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const products: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro',
    price: 24990000,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009278896',
    description: 'iPhone 15 Pro với chip A17 Pro, camera 48MP và thiết kế titan cao cấp.'
  },
  {
    id: 'p2',
    name: 'MacBook Air M2',
    price: 26990000,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1654122880566',
    description: 'MacBook Air siêu mỏng nhẹ với chip M2, màn hình Liquid Retina 13.6 inch.'
  },
  {
    id: 'p3',
    name: 'Apple Watch Series 9',
    price: 10990000,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MP0X3_VW_34FR+watch-45-alum-midnight-cell-8s_VW_34FR_WF_CO?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1693594621914%2C1661477066524',
    description: 'Đồng hồ thông minh mạnh mẽ với màn hình Always-On Retina.'
  },
  {
    id: 'p4',
    name: 'AirPods Pro (2nd Gen)',
    price: 6490000,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1660803972361',
    description: 'Tai nghe không dây chống ồn chủ động với chất âm sống động.'
  },
  {
    id: 'p5',
    name: 'iPad Pro 12.9" M2',
    price: 27990000,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202210_FMT_WHH?wid=1280&hei=720&fmt=jpeg&qlt=90&.v=1666985512365',
    description: 'iPad Pro mạnh mẽ với chip M2, màn hình Liquid Retina XDR 12.9 inch.'
  },
  {
    id: 'p6',
    name: 'iMac 24" M1',
    price: 27990000,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1617912402000',
    description: 'iMac đa sắc màu với chip M1, màn hình Retina 4.5K 24 inch.'
  },
];

export default function Bt7Screen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        updateCartCount(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      Alert.alert('Lỗi', 'Không thể tải giỏ hàng');
    }
  };

  const saveCart = async (updatedCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
      updateCartCount(updatedCart);
    } catch (error) {
      console.error('Error saving cart:', error);
      Alert.alert('Lỗi', 'Không thể lưu giỏ hàng');
    }
  };

  const updateCartCount = (cartItems: CartItem[]) => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(count);
  };

  const addToCart = async (product: Product) => {
    try {
      const existingItemIndex = cart.findIndex(item => item.productId === product.id);
      let updatedCart = [...cart];

      if (existingItemIndex > -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        const newCartItem: CartItem = {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        };
        updatedCart = [...updatedCart, newCartItem];
      }

      await saveCart(updatedCart);
      
      Alert.alert(
        'Thêm vào giỏ hàng',
        `Đã thêm ${product.name} vào giỏ hàng`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng');
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={[styles.productCard, isDarkMode && styles.darkProductCard]}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, isDarkMode && styles.darkText]}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {item.price.toLocaleString('vi-VN')} ₫
        </Text>
        <Text 
          style={[styles.productDescription, isDarkMode && styles.darkText]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => addToCart(item)}
        >
          <Ionicons name="cart-outline" size={18} color="#fff" style={styles.cartIcon} />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>Cửa hàng</Text>
        <View style={styles.cartContainer}>
          <Ionicons name="cart" size={24} color={isDarkMode ? '#fff' : '#000'} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkHeader: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  cartContainer: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  darkProductCard: {
    backgroundColor: '#1e1e1e',
  },
  productImage: {
    width: 120,
    height: 120,
    backgroundColor: '#f9f9f9',
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  cartIcon: {
    marginRight: 6,
  },
});
