import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserDataV1 = {
  name: string;
};

type UserDataV2 = {
  user: {
    firstName: string;
    lastName: string;
  };
  version: number;
};

const migrateV1ToV2 = async (): Promise<boolean> => {
  try {
    const v2Data = await AsyncStorage.getItem('userData_v2');
    if (v2Data) return true;

    const v1Data = await AsyncStorage.getItem('userData');
    if (!v1Data) return false;

    const userDataV1: UserDataV1 = JSON.parse(v1Data);
    
    const [firstName, ...lastNameParts] = userDataV1.name.split(' ');
    const lastName = lastNameParts.join(' ') || 'Doe';

    const userDataV2: UserDataV2 = {
      user: {
        firstName,
        lastName,
      },
      version: 2
    };

    await AsyncStorage.setItem('userData_v2', JSON.stringify(userDataV2));
    
    await AsyncStorage.removeItem('userData');
    
    console.log('Migration from V1 to V2 completed successfully');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
};

export default function Bt8Screen() {
  const [userData, setUserData] = useState<UserDataV2 | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [migrationStatus, setMigrationStatus] = useState<string>('Checking...');
  useEffect(() => {
    const checkAndMigrate = async () => {
      try {
        const v2Data = await AsyncStorage.getItem('userData_v2');
        
        if (v2Data) {
          setUserData(JSON.parse(v2Data));
          setMigrationStatus('Using existing V2 data');
        } else {
          const success = await migrateV1ToV2();
          
          if (success) {
            const newV2Data = await AsyncStorage.getItem('userData_v2');
            setUserData(newV2Data ? JSON.parse(newV2Data) : null);
            setMigrationStatus('Successfully migrated from V1 to V2');
          } else {
            setMigrationStatus('No migration needed or migration failed');
          }
        }
      } catch (error) {
        console.error('Error during migration check:', error);
        setMigrationStatus('Error during migration');
      } finally {
        setIsLoading(false);
      }
    };

    checkAndMigrate();
  }, []);

  const createV1Data = async () => {
    const v1Data: UserDataV1 = { name: 'John Doe' };
    await AsyncStorage.setItem('userData', JSON.stringify(v1Data));
    await AsyncStorage.removeItem('userData_v2');
    setUserData(null);
    setMigrationStatus('Created V1 data. Restart the app to trigger migration.');
    Alert.alert('Success', 'V1 data created. Restart the app to trigger migration.');
  };

  const clearAllData = async () => {
    await AsyncStorage.multiRemove(['userData', 'userData_v2']);
    setUserData(null);
    setMigrationStatus('All data cleared');
    Alert.alert('Success', 'All user data has been cleared');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Migration Demo</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={styles.statusText}>{migrationStatus}</Text>
      </View>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : userData ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Current User Data (V2):</Text>
          <Text>First Name: {userData.user.firstName}</Text>
          <Text>Last Name: {userData.user.lastName}</Text>
          <Text>Data Version: {userData.version}</Text>
        </View>
      ) : (
        <Text>No user data found</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.v1Button]} 
          onPress={createV1Data}
        >
          <Text style={styles.buttonText}>Create V1 Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={clearAllData}
        >
          <Text style={styles.buttonText}>Clear All Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>How to test:</Text>
        <Text>1. Click "Create V1 Data" to simulate old data</Text>
        <Text>2. Restart the app to trigger migration</Text>
        <Text>3. The app will automatically migrate to V2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  statusContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  statusLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1976d2',
  },
  statusText: {
    color: '#333',
  },
  dataContainer: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  dataTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  v1Button: {
    backgroundColor: '#ffcc80',
  },
  clearButton: {
    backgroundColor: '#ef9a9a',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  instructions: {
    backgroundColor: '#e1f5fe',
    padding: 15,
    borderRadius: 8,
  },
  instructionsTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0288d1',
  },
});
