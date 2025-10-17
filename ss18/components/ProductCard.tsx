import { Image } from 'expo-image';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Product } from '@/types/product';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.productName,
      price: product.price,
      image: product.images?.[0]?.url || '',
    });
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.card}>
        <View style={styles.imageContainer}>
          {product.images && product.images.length > 0 && (
            <Image
              source={{ uri: product.images[0].url }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          )}
        </View>
        <View style={styles.details}>
          <ThemedText type="subtitle" numberOfLines={1} style={styles.title}>
            {product.productName}
          </ThemedText>
          <ThemedText numberOfLines={2} style={styles.description}>
            {product.description}
          </ThemedText>
          <View style={styles.footer}>
            <ThemedText type="defaultSemiBold" style={styles.price}>
              ${product.price.toFixed(2)}
            </ThemedText>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
              activeOpacity={0.7}
            >
              <MaterialIcons name="add-shopping-cart" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    height: 260, 
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '100%',
    height: 140, 
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    minHeight: 20,
  },
  description: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
    minHeight: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  }
});
