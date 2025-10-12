import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../contexts/ProductContext';
import { productStatusMap } from '../models/Product';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getProductById, deleteProduct } = useProducts();
  const { id } = route.params as { id: string };
  
  const product = getProductById(id);

  React.useLayoutEffect(() => {
    if (product) {
      navigation.setOptions({
        title: 'Chi tiết sản phẩm',
        headerRight: () => (
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductForm', { productId: id })}
              style={styles.headerButton}
            >
              <Ionicons name="pencil" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete()}
              style={styles.headerButton}
            >
              <Ionicons name="trash" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }, [navigation, product]);

  const handleDelete = () => {
    if (!product) return;
    
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            deleteProduct(id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Ionicons name="alert-circle" size={60} color="#FF9500" />
        <Text style={styles.notFoundText}>Không tìm thấy sản phẩm</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const statusColor = {
    not_selling: '#FFA500',
    selling: '#4CAF50',
    stopped: '#F44336',
  }[product.status];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image" size={80} color="#E0E0E0" />
          <Text style={styles.imagePlaceholderText}>Không có hình ảnh</Text>
        </View>

        <View style={styles.detailSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tên sản phẩm</Text>
            <Text style={styles.detailValue}>{product.name}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Giá tiền</Text>
            <Text style={[styles.detailValue, styles.price]}>{product.price.toLocaleString()} VND</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Trạng thái</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.statusText}>{productStatusMap[product.status]}</Text>
            </View>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>Mô tả</Text>
            <Text style={[styles.detailValue, styles.description]}>
              {product.description || 'Không có mô tả'}
            </Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar" size={16} color="#666" />
              <Text style={styles.metaText}>
                Tạo: {new Date(product.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="refresh" size={16} color="#666" />
              <Text style={styles.metaText}>
                Cập nhật: {new Date(product.updatedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.footerButton, { backgroundColor: '#007AFF' }]}
          onPress={() => navigation.navigate('ProductForm', { productId: id })}
        >
          <Ionicons name="pencil" size={20} color="white" />
          <Text style={styles.footerButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, { backgroundColor: '#FF3B30' }]}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.footerButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingBottom: 100, // Extra space for the footer
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 16,
  },
  headerButton: {
    marginLeft: 20,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholderText: {
    color: '#999',
    marginTop: 8,
  },
  detailSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    marginTop: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailColumn: {
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  price: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    textAlign: 'left',
    marginTop: 8,
    lineHeight: 22,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  metaContainer: {
    marginTop: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  notFoundText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductDetailScreen;
