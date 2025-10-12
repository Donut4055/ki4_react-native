import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Position } from './PositionsList';

interface PositionItemProps {
  position: Position;
  onToggleStatus: (id: string) => void;
  onEdit: (position: Position) => void;
  onDelete: (id: string) => void;
}

const PositionItem: React.FC<PositionItemProps> = ({ 
  position, 
  onToggleStatus, 
  onEdit, 
  onDelete 
}) => {
  if (!position.id) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{position.positionName}</Text>
        {position.location && position.salaryRange && (
          <Text style={styles.subtitle}>{position.location} • {position.salaryRange}</Text>
        )}
        <Text style={styles.status} numberOfLines={1}>
          Trạng thái: {position.positionStatus === 'ACTIVE' ? 'Đang tuyển' : 'Ngừng tuyển'}
        </Text>
        {position.description && (
          <Text style={styles.description} numberOfLines={2}>
            {position.description}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          onPress={() => onToggleStatus(position.id!)} 
          style={[styles.actionButton, position.positionStatus === 'ACTIVE' ? styles.activeButton : styles.inactiveButton]}
        >
          <MaterialIcons 
            name={position.positionStatus === 'ACTIVE' ? 'toggle-on' : 'toggle-off'} 
            size={28} 
            color={position.positionStatus === 'ACTIVE' ? '#4CAF50' : '#9E9E9E'} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onEdit(position)} 
          style={[styles.actionButton, styles.editButton]}
        >
          <MaterialIcons name="edit" size={20} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onDelete(position.id!)} 
          style={[styles.actionButton, styles.deleteButton]}
        >
          <MaterialIcons name="delete" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 4,
  },
  status: {
    fontSize: 13,
    color: '#757575',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#424242',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    padding: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  activeButton: {
    backgroundColor: '#E8F5E9',
  },
  inactiveButton: {
    backgroundColor: '#F5F5F5',
  },
  editButton: {
    backgroundColor: '#E3F2FD',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
});

export default PositionItem;