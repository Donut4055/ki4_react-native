import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="bt1"
        options={{
          title: 'BT1',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="account-details" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bt2"
        options={{
          title: 'BT2',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="plus-minus" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bt3"
        options={{
          title: 'BT3',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="lightbulb" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bt4"
        options={{
          title: 'BT4',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="login" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bt5"
        options={{
          title: 'BT5',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="currency-usd" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bt6"
        options={{
          title: 'BT6',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="note-text" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bt7"
        options={{
          title: 'BT7',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="account-plus" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bt8"
        options={{
          title: 'BT8',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="cart" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bt9"
        options={{
          title: 'BT9',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="form-textbox" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
