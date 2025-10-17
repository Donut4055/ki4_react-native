import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useProduct } from '@/hooks/useProducts';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading, error } = useProduct(Number(id));
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    
    addToCart({
      productId: product.id,
      quantity: 1,
    });
    
    alert(`${product.productName} added to cart!`);
  }, [product, addToCart]);

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error || !product) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText type="subtitle" style={styles.errorText}>
          Product not found or error loading product details.
        </ThemedText>
        <Button onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.buttonText}>Go Back</ThemedText>
        </Button>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.images[0]?.url || 'https://via.placeholder.com/300' }} 
        style={styles.image} 
        resizeMode="contain"
      />
      
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {product.productName}
          </ThemedText>
          <ThemedText type="title" style={styles.price}>
            {product.priceFull}
          </ThemedText>
        </View>
        
        <View style={styles.metaContainer}>
          <ThemedText style={styles.metaText}>
            Category: {product.category.categoryName}
          </ThemedText>
          <ThemedText style={styles.metaText}>
            SKU: {product.productCode}
          </ThemedText>
          <ThemedText style={styles.metaText}>
            Status: {product.productStatus}
          </ThemedText>
        </View>
        
        <ThemedText style={styles.description}>
          {product.description}
        </ThemedText>
        
        <Button 
          onPress={handleAddToCart}
          style={styles.addToCartButton}
        >
          <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
        </Button>
        
        <Button 
          onPress={() => router.push('/cart')} 
          variant="outline"
          style={styles.viewCartButton}
        >
          <ThemedText style={styles.viewCartButtonText}>View Cart</ThemedText>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f8f8f8',
  },
  detailsContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  metaContainer: {
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 24,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: '#AEAEB2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  viewCartButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
