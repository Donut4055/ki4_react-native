import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onEdit: (task: any) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <MaterialIcons
          name={task.completed ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={task.completed ? '#4CAF50' : '#757575'}
        />
      </TouchableOpacity>
      <Text 
        style={[styles.taskText, task.completed && styles.completedTask]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {task.title}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          onPress={() => onEdit(task)} 
          style={styles.actionButton}
        >
          <MaterialIcons name="edit" size={20} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onDelete(task.id)} 
          style={styles.actionButton}
        >
          <MaterialIcons name="delete" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#212121',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 15,
    padding: 5,
  },
});

export default TaskItem;
