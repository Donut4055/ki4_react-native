import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SectionList, 
  TextInput, 
  TouchableOpacity, 
  Keyboard,
  SafeAreaView,
  StatusBar
} from 'react-native';

type Item = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type Section = {
  title: string;
  data: Item[];
};

const ProductCatalog = () => {
  const initialSections: Section[] = [
    {
      title: 'Thực phẩm',
      data: [
        { id: '1', name: 'Gạo ST25', price: 45000, description: 'Gạo ngon hạt dài, thơm ngon' },
        { id: '2', name: 'Thịt bò Mỹ', price: 350000, description: 'Thịt bò nhập khẩu từ Mỹ' },
        { id: '3', name: 'Cá hồi phi lê', price: 280000, description: 'Cá hồi tươi ngon' },
      ],
    },
    {
      title: 'Điện tử',
      data: [
        { id: '4', name: 'iPhone 14 Pro', price: 24990000, description: 'Điện thoại thông minh' },
        { id: '5', name: 'MacBook Air M2', price: 28990000, description: 'Laptop mỏng nhẹ' },
        { id: '6', name: 'AirPods Pro', price: 5990000, description: 'Tai nghe không dây' },
      ],
    },
    {
      title: 'Thời trang',
      data: [
        { id: '7', name: 'Áo thun nam', price: 150000, description: 'Chất liệu cotton mềm mại' },
        { id: '8', name: 'Quần jean nữ', price: 450000, description: 'Form dáng ôm vừa vặn' },
        { id: '9', name: 'Giày thể thao', price: 1200000, description: 'Đế êm chống sốc' },
      ],
    },
    {
      title: 'Sách',
      data: [
        { id: '10', name: 'Đắc nhân tâm', price: 120000, description: 'Sách kỹ năng sống' },
        { id: '11', name: 'Nhà giả kim', price: 95000, description: 'Tiểu thuyết nổi tiếng' },
        { id: '12', name: 'Tuổi trẻ đáng giá bao nhiêu', price: 110000, description: 'Sách phát triển bản thân' },
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [sections, setSections] = useState<Section[]>(initialSections);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSections(initialSections);
      return;
    }

    const filteredSections = initialSections
      .map(section => ({
        ...section,
        data: section.data.filter(
          item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter(section => section.data.length > 0); 

    setSections(filteredSections);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
      </View>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
      <Text style={styles.itemCount}>{section.data.length} mục</Text>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery
          ? `Không tìm thấy kết quả cho "${searchQuery}"`
          : 'Không có dữ liệu'}
      </Text>
      {searchQuery && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setSearchQuery('');
            setSections(initialSections);
            Keyboard.dismiss();
          }}>
          <Text style={styles.clearButtonText}>Xóa tìm kiếm</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Danh mục sản phẩm</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={handleSearch}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
    textAlign: 'center',
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  clearButtonText: {
    color: '#333',
    fontWeight: '500',
  },
});

export default ProductCatalog;
