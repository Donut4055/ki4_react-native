import React, { useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string;
};

const initialData: Product[] = [
  {
    id: "1",
    name: "iPhone 13",
    price: 799,
    description: "Điện thoại thông minh Apple iPhone 13.",
    details: "Màn hình 6.1 inch, camera 12MP, bộ nhớ 128GB.",
  },
  {
    id: "2",
    name: "Samsung Galaxy S21",
    price: 999,
    description: "Điện thoại cao cấp Samsung Galaxy S21.",
    details: "Màn hình 6.2 inch, camera 64MP, bộ nhớ 128GB.",
  },
  {
    id: "3",
    name: "MacBook Pro",
    price: 1299,
    description: "Máy tính xách tay Apple MacBook Pro.",
    details: "Màn hình Retina 13 inch, vi xử lý M1, 256GB SSD.",
  },
  {
    id: "4",
    name: "Dell XPS 13",
    price: 1099,
    description: "Laptop Dell XPS 13 với thiết kế mỏng nhẹ.",
    details: "Màn hình 13 inch, vi xử lý Intel Core i7, 512GB SSD.",
  },
  {
    id: "5",
    name: "Sony WH-1000XM4",
    price: 349,
    description: "Tai nghe Sony WH-1000XM4 chống ồn.",
    details: "Chống ồn chủ động, thời gian sử dụng lên đến 30 giờ.",
  },
  {
    id: "6",
    name: "Apple Watch Series 7",
    price: 399,
    description: "Đồng hồ thông minh Apple Watch Series 7.",
    details: "Màn hình 1.7 inch, GPS, theo dõi sức khoẻ.",
  },
  {
    id: "7",
    name: "iPad Pro",
    price: 799,
    description: "Máy tính bảng Apple iPad Pro.",
    details: "Màn hình 11 inch, chip M1, bộ nhớ 128GB.",
  },
];

const newData: Product[] = [
  {
    id: "8",
    name: "Google Pixel 6",
    price: 599,
    description: "Điện thoại Google Pixel 6.",
    details: "Màn hình 6.4 inch, camera 50MP, bộ nhớ 128GB.",
  },
  {
    id: "9",
    name: "OnePlus 9 Pro",
    price: 1069,
    description: "Điện thoại OnePlus 9 Pro.",
    details: "Màn hình 6.7 inch, camera 48MP, bộ nhớ 256GB.",
  },
  {
    id: "10",
    name: "Apple AirPods Pro",
    price: 249,
    description: "Tai nghe không dây Apple AirPods Pro.",
    details: "Chống ồn chủ động, thời gian sử dụng lên đến 24 giờ.",
  },
];

const fetchProducts = async (page: number, limit: number = 3): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (page === 1) {
    return initialData.slice(0, limit);
  } else if (page === 2) {
    return initialData.slice(limit, limit * 2);
  } else if (page === 3) {
    return initialData.slice(limit * 2);
  } else if (page === 4) {
    return newData.slice(0, 2);
  } else {
    return newData.slice(2);
  }
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const listRef = useRef<FlatList>(null);

  const loadProducts = useCallback(async (pageNum: number, isRefreshing: boolean = false) => {
    if (loading) return;

    try {
      setLoading(true);
      const newProducts = await fetchProducts(pageNum);
      
      if (isRefreshing) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    loadProducts(1, true);
  }, [loadProducts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(nextPage);
    }
  }, [loading, hasMore, page, loadProducts]);

  React.useEffect(() => {
    loadProducts(1);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImage}>
        <Text style={styles.productImageText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.productDetails} numberOfLines={2}>
          {item.details}
        </Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
      <Text style={styles.productCount}>{products.length} sản phẩm</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text style={styles.loadingText}>Đang tải thêm sản phẩm...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.emptyText}>Không có sản phẩm nào</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <FlatList
        ref={listRef}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        }
      />
      
      <TouchableOpacity
        style={styles.scrollTopButton}
        onPress={() => {
          listRef.current?.scrollToOffset({ offset: 0, animated: true });
        }}
      >
        <Text style={styles.scrollTopText}>↑</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  headerContainer: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 14,
    color: '#666',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productDetails: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 4,
    backgroundColor: '#FFEBEE',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#ff9800',
  },
  footerContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollTopText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -4,
  },
});

export default ProductList;
