import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

type FeedItem = {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
};

const FEED_ITEMS: FeedItem[] = [
  {
    id: '1',
    title: 'React Native 1.0 đã ra mắt!',
    summary: 'Phiên bản mới nhất của React Native mang đến nhiều cải tiến về hiệu năng...',
    author: 'Facebook Team',
    date: '05/10/2025',
  },
  {
    id: '2',
    title: 'Giới thiệu Expo SDK 50',
    summary: 'Khám phá những tính năng mới trong Expo SDK 50...',
    author: 'Expo Team',
    date: '04/10/2025',
  },
  {
    id: '3',
    title: 'TypeScript 5.0: Những điều cần biết',
    summary: 'Cập nhật mới nhất của TypeScript mang đến nhiều cải tiến đáng chú ý...',
    author: 'Microsoft',
    date: '03/10/2025',
  },
];

export default function FeedListScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: FeedItem }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/(tabs)/(feed)/${item.id}`)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
      <View style={styles.footer}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={FEED_ITEMS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2c3e50',
  },
  summary: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#95a5a6',
  },
});
