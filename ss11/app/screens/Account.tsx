import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../contexts/ProductContext';

type RootStackParamList = {
  Account: undefined;
  // Add other screen params as needed
};

type AccountScreenNavigationProp = NavigationProp<RootStackParamList, 'Account'>;

const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { products } = useProducts();

  const stats = [
    { label: 'Tổng số sản phẩm', value: products.length, icon: 'cube-outline' as const },
    { 
      label: 'Đang bán', 
      value: products.filter(p => p.status === 'selling').length, 
      icon: 'cash-outline' as const 
    },
    { 
      label: 'Chưa bán', 
      value: products.filter(p => p.status === 'not_selling').length, 
      icon: 'time-outline' as const 
    },
    { 
      label: 'Ngừng bán', 
      value: products.filter(p => p.status === 'stopped').length, 
      icon: 'stop-circle-outline' as const 
    },
  ];

  const menuItems = [
    { 
      title: 'Cài đặt', 
      icon: 'settings-outline' as const,
      onPress: () => Alert.alert('Thông báo', 'Tính năng đang phát triển')
    },
    { 
      title: 'Trợ giúp', 
      icon: 'help-circle-outline' as const,
      onPress: () => Alert.alert('Trợ giúp', 'Liên hệ hỗ trợ: support@example.com')
    },
    { 
      title: 'Về ứng dụng', 
      icon: 'information-circle-outline' as const,
      onPress: () => Alert.alert('Về ứng dụng', 'Quản lý sản phẩm v1.0.0')
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#666" />
        </View>
        <Text style={styles.userName}>Người dùng</Text>
        <Text style={styles.userEmail}>user@example.com</Text>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name={stat.icon} size={24} color="#007AFF" />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color="#333" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 16,
    margin: '1%',
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
});

export default AccountScreen;
