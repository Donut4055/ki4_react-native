import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const LIGHT_SIZE = width * 0.25;
const LIGHT_MARGIN = 15;

type LightColor = 'red' | 'yellow' | 'green';

const TrafficLight: React.FC = () => {
  const [activeLight, setActiveLight] = useState<LightColor>('red');

  const getNextLight = (current: LightColor): LightColor => {
    switch (current) {
      case 'red':
        return 'green';
      case 'green':
        return 'yellow';
      case 'yellow':
        return 'red';
      default:
        return 'red';
    }
  };

  const handlePress = () => {
    setActiveLight(getNextLight(activeLight));
  };

  const getLightStyle = (color: LightColor) => ({
    ...styles.light,
    backgroundColor: color,
    opacity: activeLight === color ? 1 : 0.3,
  });

  const getLightLabel = (color: LightColor) => {
    switch (color) {
      case 'red':
        return 'Dừng';
      case 'yellow':
        return 'Chuẩn bị';
      case 'green':
        return 'Đi';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.trafficLightContainer}>
        <View style={styles.lightWrapper}>
          <View style={getLightStyle('red')} />
          <Text style={styles.label}>{getLightLabel('red')}</Text>
        </View>
        <View style={styles.lightWrapper}>
          <View style={getLightStyle('yellow')} />
          <Text style={styles.label}>{getLightLabel('yellow')}</Text>
        </View>
        <View style={styles.lightWrapper}>
          <View style={getLightStyle('green')} />
          <Text style={styles.label}>{getLightLabel('green')}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Chuyển Đèn</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  trafficLightContainer: {
    backgroundColor: '#333',
    borderRadius: 40,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
    width: LIGHT_SIZE * 1.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  lightWrapper: {
    alignItems: 'center',
    marginVertical: LIGHT_MARGIN / 2,
  },
  light: {
    width: LIGHT_SIZE,
    height: LIGHT_SIZE,
    borderRadius: LIGHT_SIZE / 2,
    margin: LIGHT_MARGIN / 2,
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  label: {
    color: '#333',
    fontWeight: '600',
    marginTop: 4,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: '#4a90e2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  statusContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    color: '#555',
  },
  statusValue: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TrafficLight;
