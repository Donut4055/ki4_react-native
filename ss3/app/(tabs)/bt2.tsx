import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface BoxProps {
  name: string;
  color: string;
  width: number;
  height: number;
}

const Box = ({ name, color, width, height }: BoxProps) => (
  <View style={[styles.box, { backgroundColor: color, width, height }]}>
    <Text style={styles.boxText}>{name}</Text>
  </View>
);

export default function Bai2Screen() {
  const [layoutMode, setLayoutMode] = useState(1);

  const boxes = [
    { id: 1, name: 'box1', color: '#EF4444', width: 100, height: 40 },
    { id: 2, name: 'box2', color: '#F97316', width: 80, height: 50 },
    { id: 3, name: 'box3', color: '#22C55E', width: 120, height: 60 },
    { id: 4, name: 'box4', color: '#3B82F6', width: 90, height: 30 },
    { id: 5, name: 'box5', color: '#8B5CF6', width: 110, height: 55 },
  ];

  const renderBoxes = () => {
    switch (layoutMode) {
      case 1:
        return (
          <View style={styles.verticalContainer}>
            {boxes.map((box) => (
              <Box key={box.id} {...box} />
            ))}
          </View>
        );
      case 2:
        return (
          <View style={styles.horizontalContainer}>
            {boxes.map((box) => (
              <Box key={box.id} {...box} />
            ))}
          </View>
        );
      case 3:
        return (
          <View style={styles.gridContainer}>
            <View style={styles.gridRow}>
              {boxes.slice(0, 3).map((box) => (
                <Box key={box.id} {...box} />
              ))}
            </View>
            <View style={styles.gridRow}>
              {boxes.slice(3).map((box) => (
                <Box key={box.id} {...box} />
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 2: Bố cục với Flexbox</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, layoutMode === 1 && styles.activeButton]} 
          onPress={() => setLayoutMode(1)}
        >
          <Text style={styles.buttonText}>Bố cục dọc</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, layoutMode === 2 && styles.activeButton]} 
          onPress={() => setLayoutMode(2)}
        >
          <Text style={styles.buttonText}>Bố cục ngang</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, layoutMode === 3 && styles.activeButton]} 
          onPress={() => setLayoutMode(3)}
        >
          <Text style={styles.buttonText}>Bố cục lưới</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderBoxes()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  verticalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  box: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
