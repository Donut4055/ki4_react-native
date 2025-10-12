import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Alert,
  ActivityIndicator,
  Text
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { axiosWithEnvToken } from '../../services/apiWithEnvToken';
import PositionItem from './PositionItem';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import PositionForm from './PositionForm';

export interface Position {
  id: string;
  positionName: string;
  positionStatus: 'ACTIVE' | 'INACTIVE';
  description: string;
  location: string;
  salaryRange: string;
}

const PositionsList: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Partial<Position> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const response = await axiosWithEnvToken.get('/positions');
      const responseData = response.data?.data || response.data; 
      const positionsData = Array.isArray(responseData) ? responseData : [responseData];
      
      setPositions(positionsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching positions:', error);
      setError('Không thể tải danh sách vị trí. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const toggleStatus = async (id: string) => {
    try {
      const position = positions.find(p => p.id === id);
      if (position) {
        await axiosWithEnvToken.patch(`/positions/${id}`, {
          positionStatus: position.positionStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        });
        fetchPositions();
      }
    } catch (error) {
      console.error('Error updating position status:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái vị trí');
    }
  };

  const addPosition = async (positionData: { positionName: string; description: string; positionStatus: 'ACTIVE' | 'INACTIVE' }) => {
    try {
      console.log(positionData);
      await axiosWithEnvToken.post('/positions', positionData);
      setModalVisible(false);
      await fetchPositions();
    } catch (error) {
      console.error('Error adding position:', error);
      Alert.alert('Lỗi', 'Không thể thêm vị trí mới');
    }
  };

  const updatePosition = async (positionData: { positionName: string; description: string; positionStatus: 'ACTIVE' | 'INACTIVE' }) => {
    if (!currentPosition?.id) return;
    
    try {
      await axiosWithEnvToken.put(`/positions/${currentPosition.id}`, positionData);
      setModalVisible(false);
      await fetchPositions();
    } catch (error) {
      console.error('Error updating position:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật vị trí');
    }
  };

  const handleEdit = (position: Position) => {
    setCurrentPosition(position);
    setModalVisible(true);
  };

  const handleSubmit = (data: { positionName: string; description: string; positionStatus: 'ACTIVE' | 'INACTIVE' }) => {
    if (currentPosition?.id) {
      updatePosition(data);
    } else {
      addPosition(data);
    }
  };

  const handleAddNew = () => {
    setCurrentPosition(null);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchPositions} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {positions.length === 0 ? (
        <EmptyState onAddNew={handleAddNew} />
      ) : (
        <>
          <FlatList
            data={positions}
            keyExtractor={(item) => item.id || ''}
            renderItem={({ item }) => (
              <PositionItem
                position={item}
                onToggleStatus={() => item.id && toggleStatus(item.id)}
                onEdit={() => handleEdit(item)}
                onDelete={() => {}}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddNew}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>Thêm vị trí mới</Text>
          </TouchableOpacity>
        </>
      )}

      <PositionForm
        visible={modalVisible}
        position={currentPosition}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        isEditing={!!currentPosition?.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default PositionsList;