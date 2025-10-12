import { View, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PositionsList from '../components/PositionsList';

export default function TodoScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Ionicons name="list" size={24} color="#333" style={styles.headerIcon} />
        <Ionicons name="search" size={24} color="#333" style={styles.headerIcon} />
      </View>
      <PositionsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerIcon: {
    padding: 8,
  },
});