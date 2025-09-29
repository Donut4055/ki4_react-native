import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

const generatePosts = (startIndex: number, count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    title: `Bài viết số ${startIndex + i}`,
    content: `Đây là nội dung của bài viết thứ ${startIndex + i} trong danh sách.`,
    author: `Tác giả ${String.fromCharCode(97 + Math.floor(Math.random() * 26)).toUpperCase()}`,
  }));
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const ITEMS_PER_PAGE = 5;

  React.useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    setTimeout(() => {
      const newPosts = generatePosts((page - 1) * ITEMS_PER_PAGE + 1, ITEMS_PER_PAGE);
      
      if (page >= 3) {  
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }

      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setLoading(false);
    }, 1000);
  }, [page, loading, hasMore]);

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postAuthor}>- {item.author}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Danh sách bài viết</Text>
      <Text style={styles.headerSubtitle}>Có tổng cộng {posts.length} bài viết</Text>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Đã tải hết dữ liệu</Text>
        </View>
      );
    }

    return (
      <View style={styles.footerContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#4CAF50" />
        ) : (
          <TouchableOpacity 
            style={styles.loadMoreButton} 
            onPress={loadMoreData}
            disabled={loading}
          >
            <Text style={styles.loadMoreText}>Tải thêm</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Đang tải dữ liệu...</Text>
          </View>
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  postItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  postAuthor: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  footerContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 160,
    alignItems: 'center',
    elevation: 2,
  },
  loadMoreText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    color: '#666',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default PostList;
