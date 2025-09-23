import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Heart, ShoppingCart, ShoppingBag } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const [selectedSize, setSelectedSize] = useState('M');
  const [isFavorite, setIsFavorite] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL'];
  
  // Mock product data
  const product = {
    name: 'Áo thun cổ tròn',
    rating: 4.9,
    reviewCount: 86,
    price: 299000,
    originalPrice: 499000,
    description: 'Áo thun cổ tròn chất liệu cotton mềm mại, thoáng mát, thấm hút mồ hôi tốt. Thiết kế đơn giản, dễ phối đồ, phù hợp cho mọi hoạt động hàng ngày.'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Product Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://i.pinimg.com/1200x/41/a9/82/41a9827c63847e1c902b8abab8c43b4d.jpg' }} 
            style={styles.productImage}
            resizeMode="cover"
          />
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          
          {/* Favorite Button */}
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              size={24} 
              color={isFavorite ? '#ff4444' : '#fff'}
              fill={isFavorite ? '#ff4444' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Product Info Section */}
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <ThemedText style={styles.productName}>{product.name}</ThemedText>
            <View style={styles.ratingContainer}>
              <ThemedText style={styles.ratingText}>
                ⭐ {product.rating} | {product.reviewCount} Đánh giá
              </ThemedText>
            </View>
            <View style={styles.priceContainer}>
              <ThemedText style={styles.price}>
                {product.price.toLocaleString()}đ
              </ThemedText>
              <ThemedText style={styles.originalPrice}>
                {product.originalPrice.toLocaleString()}đ
              </ThemedText>
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Chọn Kích thước</ThemedText>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonSelected
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <ThemedText 
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextSelected
                    ]}
                  >
                    {size}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Product Description */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Mô tả sản phẩm</ThemedText>
            <ThemedText style={styles.description}>
              {product.description}
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <ShoppingCart size={20} color="#000" style={styles.buttonIcon} />
          <ThemedText style={styles.addToCartText}>Thêm vào giỏ</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <ShoppingBag size={20} color="#fff" style={styles.buttonIcon} />
          <ThemedText style={styles.buyNowText}>Mua ngay</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: width * 1.1, // Slightly taller than square
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    color: '#666',
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4757',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  sizeButtonSelected: {
    borderColor: '#000',
    backgroundColor: '#f8f8f8',
  },
  sizeText: {
    fontSize: 16,
    color: '#333',
  },
  sizeTextSelected: {
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
});

export default ProductDetailScreen;
