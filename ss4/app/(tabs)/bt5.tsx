import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CurrencyInput from '../../components/CurrencyInput';

const EXCHANGE_RATE = 25000; // 1 USD = 25,000 VND

const CurrencyConverterScreen: React.FC = () => {
  const [vnd, setVnd] = useState<string>('');
  const [usd, setUsd] = useState<string>('');
  const [lastChanged, setLastChanged] = useState<'vnd' | 'usd'>('vnd');

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (str: string): number => {
    return parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
  };

  const handleVndChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9.]/g, '');
    
    if (cleanedText === '') {
      setVnd('');
      setUsd('');
      return;
    }

    setVnd(cleanedText);
    
    const vndValue = parseNumber(cleanedText);
    const usdValue = vndValue / EXCHANGE_RATE;
    
    setUsd(usdValue.toFixed(4).replace(/\.?0+$/, ''));
    setLastChanged('vnd');
  };

  const handleUsdChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9.]/g, '');
    
    if (cleanedText === '') {
      setVnd('');
      setUsd('');
      return;
    }

    setUsd(cleanedText);
    
    const usdValue = parseNumber(cleanedText);
    const vndValue = usdValue * EXCHANGE_RATE;
    
    setVnd(formatNumber(Math.round(vndValue)));
    setLastChanged('usd');
  };

  const swapCurrencies = () => {
    if (vnd && usd) {
      if (lastChanged === 'vnd') {
        const tempVnd = vnd;
        const tempUsd = usd;
        setVnd('');
        setUsd(tempVnd);
        setLastChanged('usd');
      } else {
        const tempVnd = vnd;
        const tempUsd = usd;
        setVnd(tempUsd);
        setUsd('');
        setLastChanged('vnd');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chuyển đổi tiền tệ</Text>
      
      <View style={styles.converterContainer}>
        <CurrencyInput
          label="VND"
          value={vnd}
          onChangeText={handleVndChange}
          editable={lastChanged !== 'vnd'}
        />
        
        <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <MaterialCommunityIcons name="swap-vertical" size={28} color="#fff" />
        </TouchableOpacity>
        
        <CurrencyInput
          label="USD"
          value={usd}
          onChangeText={handleUsdChange}
          editable={lastChanged !== 'usd'}
        />
      </View>
      
      <View style={styles.rateContainer}>
        <Text style={styles.rateText}>Tỷ giá: 1 USD = {EXCHANGE_RATE.toLocaleString()} VND</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  converterContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  swapButton: {
    backgroundColor: '#3498db',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  rateContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    alignItems: 'center',
  },
  rateText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
  },
});

export default CurrencyConverterScreen;
