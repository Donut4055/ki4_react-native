import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  message?: string;
  icon?: string;
  onAddNew?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'Không có công việc nào',
  icon = 'assignment',
  onAddNew,
}) => {
  const content = (
    <View style={styles.container}>
      <MaterialIcons 
        name={icon as any} 
        size={64} 
        color={onAddNew ? '#2196F3' : '#e0e0e0'} 
      />
      <Text style={[styles.message, onAddNew && styles.clickableText]}>
        {message}
      </Text>
    </View>
  );

  if (onAddNew) {
    return (
      <TouchableOpacity onPress={onAddNew} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  clickableText: {
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default EmptyState;
