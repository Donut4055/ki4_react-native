import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useDebounce } from '@/hooks/useDebounce';

const searchProducts = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!query.trim()) return [];
  
  const mockProducts = [
    { id: 1, name: `Kết quả cho "${query}" 1` },
    { id: 2, name: `Kết quả cho "${query}" 2` },
    { id: 3, name: `Kết quả cho "${query}" 3` },
  ];
  
  return mockProducts;
};

export default function Bt8Screen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{id: number; name: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const search = async () => {
      if (!debouncedSearchTerm) {
        setResults([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const searchResults = await searchProducts(debouncedSearchTerm);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tìm kiếm sản phẩm</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoFocus
        />
        {isSearching && (
          <ActivityIndicator style={styles.loader} size="small" color="#6200ee" />
        )}
      </View>

      <View style={styles.resultsContainer}>
        {!debouncedSearchTerm ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Nhập từ khóa để bắt đầu tìm kiếm
            </Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              {isSearching ? 'Đang tìm kiếm...' : 'Không tìm thấy kết quả'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text style={styles.resultText}>{item.name}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Đang tìm kiếm: {debouncedSearchTerm || 'Chưa có từ khóa'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#6200ee',
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    padding: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loader: {
    position: 'absolute',
    right: 30,
    top: 28,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  resultItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
  },
});
