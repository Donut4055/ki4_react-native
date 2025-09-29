import React from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, SafeAreaView } from 'react-native';

type Product = {
  id: string;
  name: string;
  price: number;
};

type SectionData = {
  title: string;
  data: Product[];
};

const ProductList = () => {
  const [sections, setSections] = React.useState<SectionData[]>([
    {
      title: 'Điện thoại',
      data: [
        { id: '1', name: 'iPhone 13 Pro Max', price: 24990000 },
        { id: '2', name: 'Samsung Galaxy S22 Ultra', price: 26990000 },
        { id: '3', name: 'Xiaomi 12 Pro', price: 19990000 },
      ],
    },
    {
      title: 'Laptop',
      data: [
        { id: '4', name: 'MacBook Pro M1', price: 39990000 },
        { id: '5', name: 'Dell XPS 13', price: 32990000 },
        { id: '6', name: 'Asus Zenbook 14', price: 24990000 },
        { id: '7', name: 'HP Spectre x360', price: 35990000 },
      ],
    },
    {
      title: 'Máy tính bảng',
      data: [
        { id: '8', name: 'iPad Pro 12.9"', price: 27990000 },
        { id: '9', name: 'Samsung Galaxy Tab S8 Ultra', price: 23990000 },
        { id: '10', name: 'Xiaomi Pad 5', price: 9990000 },
      ],
    },
    {
      title: 'Phụ kiện',
      data: [
        { id: '11', name: 'Tai nghe AirPods Pro', price: 5990000 },
        { id: '12', name: 'Chuột không dây Logitech MX Master 3', price: 2490000 },
        { id: '13', name: 'Bàn phím cơ Keychron K2', price: 2200000 },
        { id: '14', name: 'Ổ cứng di động SSD 1TB', price: 3490000 },
      ],
    },
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const renderItem = ({ item, section }: { item: Product; section: SectionData }) => (
    <TouchableOpacity 
      style={[styles.item, { 
        backgroundColor: sections.indexOf(section) % 2 === 0 ? '#ffffff' : '#f9f9f9' 
      }]}
      onPress={() => {
        console.log('Đã chọn:', item.name);
      }}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }: { section: SectionData }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderItemSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh mục sản phẩm</Text>
      
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={renderItemSeparator}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>Không có sản phẩm nào</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#1a1a1a',
  },
  listContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1976D2',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ProductList;
