// app/(tabs)/_layout.tsx
import { Redirect, Tabs, useRouter } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '@/hooks/useCart';
import { TouchableOpacity, View, Text } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth();
  const { items: cartItems } = useCart();
  const router = useRouter();
  const cartItemCount = cartItems.reduce((total: number, item) => total + item.quantity, 0);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        headerRight: () => (
          <View style={{ marginRight: 16 }}>
            <TouchableOpacity
              onPress={() => router.push('/cart')}
              style={{
                padding: 8,
                borderRadius: 20,
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <MaterialIcons name="shopping-cart" size={20} color="#fff" />
              {cartItemCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 4,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                    {cartItemCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}