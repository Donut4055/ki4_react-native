import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView, TouchableOpacity } from 'react-native';

type Item = {
  id: string;
  title: string;
  description: string;
};

const EmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Không có dữ liệu</Text>
    <Text style={styles.emptySubtext}>Hãy thêm mục mới bằng nút bên dưới</Text>
  </View>
);

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addNewItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      title: `Mục ${items.length + 1}`,
      description: `Mô tả cho mục ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  };

  const clearAllItems = () => {
    setItems([]);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách mục</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addNewItem}>
          <Text style={styles.buttonText}>Thêm mục mới</Text>
        </TouchableOpacity>
        
        {items.length > 0 && (
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearAllItems}>
            <Text style={styles.buttonText}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={EmptyList} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  clearButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ItemList;
