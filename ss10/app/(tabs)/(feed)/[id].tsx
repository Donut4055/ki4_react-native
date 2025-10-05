import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type FeedItem = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
};

const FEED_ITEMS: Record<string, FeedItem> = {
  '1': {
    id: '1',
    title: 'React Native 1.0 đã ra mắt!',
    content: 'React Native 1.0 mang đến nhiều cải tiến đáng kể về hiệu năng, bao gồm cơ chế render mới, cải thiện khả năng tương thích với các thiết bị mới, và nhiều API mới giúp phát triển ứng dụng di động trở nên dễ dàng hơn bao giờ hết. Đây là bước tiến lớn trong việc phát triển ứng dụng đa nền tảng.',
    author: 'Facebook Team',
    date: '05/10/2025',
  },
  '2': {
    id: '2',
    title: 'Giới thiệu Expo SDK 50',
    content: 'Expo SDK 50 đi kèm với nhiều tính năng mới như hỗ trợ React 19, cải thiện hiệu suất, thêm nhiều module mới và cập nhật các thư viện phụ thuộc. Với Expo SDK 50, việc phát triển ứng dụng React Native trở nên mạnh mẽ và tiện lợi hơn bao giờ hết.',
    author: 'Expo Team',
    date: '04/10/2025',
  },
  '3': {
    id: '3',
    title: 'TypeScript 5.0: Những điều cần biết',
    content: 'TypeScript 5.0 mang đến nhiều cải tiến về hiệu suất, giảm đáng kể thời gian biên dịch và sử dụng bộ nhớ. Các tính năng mới như const type parameters, extends constraints cho type parameters, và nhiều cải tiến khác giúp phát triển ứng dụng TypeScript hiệu quả hơn.',
    author: 'Microsoft',
    date: '03/10/2025',
  },
};

export default function FeedDetailScreen() {
  const { id } = useLocalSearchParams();
  const post = FEED_ITEMS[id as string];

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy bài viết</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{post.date}</Text>
        <Text style={styles.author}>Tác giả: {post.author}</Text>
      </View>
      
      <Text style={styles.title}>{post.title}</Text>
      
      <Text style={styles.content}>
        {post.content}
      </Text>
      
      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Bình luận</Text>
      <View style={styles.comment}>
        <Text style={styles.commentAuthor}>Người dùng 1</Text>
        <Text style={styles.commentText}>Bài viết rất hữu ích, cảm ơn tác giả!</Text>
      </View>
      <View style={styles.comment}>
        <Text style={styles.commentAuthor}>Người dùng 2</Text>
        <Text style={styles.commentText}>Tôi đã thử và thấy rất hiệu quả.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 24,
  },
  author: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  comment: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  commentAuthor: {
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 4,
  },
  commentText: {
    color: '#2c3e50',
  },
});
