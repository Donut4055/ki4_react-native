import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LightBulbScreen: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const toggleLight = () => {
    setIsOn(prevState => !prevState);
  };

  return (
    <View style={[styles.container, isOn ? styles.lightOn : styles.lightOff]}>
      <View style={styles.bulbContainer}>
        <MaterialCommunityIcons 
          name={isOn ? 'lightbulb-on' : 'lightbulb-off'} 
          size={150} 
          color={isOn ? '#FFD700' : '#666'} 
        />
        <Text style={styles.statusText}>
          {isOn ? 'Đèn đang BẬT' : 'Đèn đang TẮT'}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, isOn ? styles.buttonOn : styles.buttonOff]}
        onPress={toggleLight}
      >
        <Text style={styles.buttonText}>BẬT/TẮT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lightOn: {
    backgroundColor: '#FFF9C4',
  },
  lightOff: {
    backgroundColor: '#E0E0E0',
  },
  bulbContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonOn: {
    backgroundColor: '#FFD700',
  },
  buttonOff: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LightBulbScreen;
