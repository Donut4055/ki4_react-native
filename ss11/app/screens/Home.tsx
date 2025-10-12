import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../contexts/ProductContext';
import { ProductStatus } from '../models/Product';

type RootStackParamList = {
  Home: undefined;
  ProductForm: undefined;
  Products: undefined;
  ProductDetail: { id: string };
};


const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { products } = useProducts();

  const getStatusCount = (status: ProductStatus) => {
    return products.filter(product => product.status === status).length;
  };

  const statusCards = [
    { status: 'not_selling' as const, title: 'Chưa bán', color: '#FFA500', icon: 'time-outline' as const },
    { status: 'selling' as const, title: 'Đang bán', color: '#4CAF50', icon: 'cash-outline' as const },
    { status: 'stopped' as const, title: 'Ngừng bán', color: '#F44336', icon: 'stop-circle-outline' as const },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tổng quan</Text>
      
      <View style={styles.statsContainer}>
        {statusCards.map((card, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: card.color }]}>
            <Ionicons name={card.icon} size={32} color="white" />
            <Text style={styles.statCount}>{getStatusCount(card.status)}</Text>
            <Text style={styles.statLabel}>{card.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ProductForm')}
          >
            <Ionicons name="add-circle" size={40} color="#007AFF" />
            <Text style={styles.actionButtonText}>Thêm sản phẩm</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Ionicons name="list" size={40} color="#007AFF" />
            <Text style={styles.actionButtonText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recentProducts}>
        <Text style={styles.sectionTitle}>Sản phẩm gần đây</Text>
        {products.length > 0 ? (
          <View style={styles.productList}>
            {products.slice(0, 3).map((product) => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.productItem}
                onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
              >
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPrice}>
                    {product.price.toLocaleString()} VND
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge, 
                  { 
                    backgroundColor: statusCards.find(card => card.status === product.status)?.color || '#CCCCCC',
                    opacity: 0.8
                  }
                ]}>
                  <Text style={styles.statusText}>
                    {statusCards.find(card => card.status === product.status)?.title || 'N/A'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={50} color="#CCCCCC" />
            <Text style={styles.emptyStateText}>Chưa có sản phẩm nào</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('ProductForm')}
            >
              <Text style={styles.addButtonText}>Thêm sản phẩm mới</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
  },
  statLabel: {
    color: 'white',
    fontWeight: '500',
  },
  quickActions: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    marginTop: 8,
    color: '#333',
    textAlign: 'center',
  },
  recentProducts: {
    marginBottom: 20,
  },
  productList: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyStateText: {
    marginTop: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default HomeScreen;
