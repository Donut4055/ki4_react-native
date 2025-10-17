import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store/store';
import { AuthProvider } from '@/contexts/AuthContext';
import { queryClient } from '@/services/queryClient';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen 
                name="cart" 
                options={{ 
                  title: 'Shopping Cart',
                  headerBackTitle: 'Back'
                }} 
              />
            </Stack>
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}