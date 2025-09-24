import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  Image, 
  FlatList,
  useWindowDimensions,
  Platform
} from 'react-native';

// Sample product data
const products = Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: `Sản phẩm ${index + 1}`,
  price: Math.floor(Math.random() * 1000000).toLocaleString() + ' đ',
  image: `https://picsum.photos/300/300?random=${index}`,
  rating: (Math.random() * 5).toFixed(1),
}));

const getNumColumns = (width: number) => {
  if (Platform.OS === 'web' || (Platform.OS === 'ios' && Platform.isPad)) {
    return 4; 
  }
  return width > 500 ? 3 : 2; 
};

const ProductCard = ({ item, cardWidth }: { item: any, cardWidth: number }) => (
  <View style={[styles.card, { width: cardWidth }]}>
    <Image 
      source={{ uri: item.image }} 
      style={styles.image} 
      resizeMode="cover"
    />
    <View style={styles.cardContent}>
      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.price}>{item.price}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>★ {item.rating}</Text>
      </View>
    </View>
  </View>
);

const ProductGrid = () => {
  const { width } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(getNumColumns(width));
  const cardWidth = (width - 32 - (numColumns - 1) * 8) / numColumns;

  useEffect(() => {
    const updateLayout = () => {
      setNumColumns(getNumColumns(Dimensions.get('window').width));
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} cardWidth={cardWidth} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 8,
  },
  grid: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#f39c12',
    fontWeight: 'bold',
  },
});

export default ProductGrid;
