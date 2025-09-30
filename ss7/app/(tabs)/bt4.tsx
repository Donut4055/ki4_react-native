import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, useColorScheme } from 'react-native';
import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';

export default function Bt4Screen() {
  const [netInfo, setNetInfo] = useState<{
    isConnected: boolean | null;
    type: NetInfoStateType | null;
    details: any;
  }>({
    isConnected: null,
    type: null,
    details: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setNetInfo({
        isConnected: state.isConnected,
        type: state.type,
        details: state.details,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getConnectionTypeText = (type: NetInfoStateType | null): string => {
    const typeMap: Record<NetInfoStateType, string> = {
      none: 'Không có kết nối',
      unknown: 'Không xác định',
      wifi: 'Wi-Fi',
      cellular: 'Di động',
      ethernet: 'Cáp mạng',
      wimax: 'WiMAX',
      vpn: 'VPN',
      other: 'Khác',
      bluetooth: 'Bluetooth',
    };

    return type ? typeMap[type] || 'Không xác định' : 'Đang kiểm tra...';
  };

  const getWifiStrength = (strength: number | null | undefined): string => {
    if (strength === null || strength === undefined) return 'Không xác định';
    return `${strength}%`;
  };

  return (
    <View style={styles.container}>
      {netInfo.isConnected === false && (
        <View style={styles.offlineBar}>
          <Text style={styles.offlineText}>Không có kết nối mạng</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Trạng thái mạng</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Trạng thái:</Text>
            <Text 
              style={[
                styles.value,
                { color: netInfo.isConnected ? '#4CAF50' : '#F44336' }
              ]}
            >
              {netInfo.isConnected ? 'Đã kết nối' : 'Mất kết nối'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Loại kết nối:</Text>
            <Text style={styles.value}>{getConnectionTypeText(netInfo.type)}</Text>
          </View>

          {netInfo.details && (
            <>
              {netInfo.type === 'wifi' && netInfo.details.strength !== undefined && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Cường độ tín hiệu:</Text>
                  <Text style={styles.value}>
                    {getWifiStrength(netInfo.details.strength)}
                  </Text>
                </View>
              )}
              
              {netInfo.details.isConnectionExpensive !== undefined && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Kết nối tốn phí:</Text>
                  <Text style={styles.value}>
                    {netInfo.details.isConnectionExpensive ? 'Có' : 'Không'}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  offlineBar: {
    backgroundColor: '#F44336',
    padding: 10,
    alignItems: 'center',
  },
  offlineText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
