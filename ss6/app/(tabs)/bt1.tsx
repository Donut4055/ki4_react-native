import React from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView } from 'react-native';

type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
};

const EmployeeList = () => {
  const employees: Employee[] = [
    { id: '1', name: 'Nguyễn Văn A', position: 'Developer', department: 'IT' },
    { id: '2', name: 'Trần Thị B', position: 'Designer', department: 'Design' },
    { id: '3', name: 'Lê Văn C', position: 'Manager', department: 'HR' },
    { id: '4', name: 'Phạm Thị D', position: 'Tester', department: 'QA' },
    { id: '5', name: 'Hoàng Văn E', position: 'DevOps', department: 'IT' },
    { id: '6', name: 'Vũ Thị F', position: 'Analyst', department: 'Business' },
    { id: '7', name: 'Đặng Văn G', position: 'Developer', department: 'IT' },
    { id: '8', name: 'Bùi Thị H', position: 'Designer', department: 'Design' },
    { id: '9', name: 'Đỗ Văn I', position: 'Manager', department: 'Sales' },
    { id: '10', name: 'Hồ Thị K', position: 'Marketer', department: 'Marketing' },
  ];

  const renderItem = ({ item }: { item: Employee }) => (
    <View style={styles.item}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.position}>{item.position}</Text>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách nhân viên</Text>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    margin: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
    width: '100%',
  },
  position: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    width: '100%',
  },
});

export default EmployeeList;
