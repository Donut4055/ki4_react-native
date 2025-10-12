import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProductProvider } from './app/contexts/ProductContext';
import AppNavigator from './app/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </ProductProvider>
    </SafeAreaProvider>
  );
}
