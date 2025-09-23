import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt1"
        options={{
          title: 'Bài 1',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt2"
        options={{
          title: 'Bài 2',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plusminus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt3"
        options={{
          title: 'Bài 3',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="textformat.abc" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt4"
        options={{
          title: 'Bài 4',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt5"
        options={{
          title: 'Bài 5',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt6"
        options={{
          title: 'Bài 6',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt7"
        options={{
          title: 'Bài 7',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="message" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt8"
        options={{
          title: 'Bài 8',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.and.arrow.up" color={color} />,
        }}
      />
      <Tabs.Screen
        name="product-detail"
        options={{
          title: 'Chi tiết SP',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tshirt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="image-gallery"
        options={{
          title: 'Bài 9',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="photo.on.rectangle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register-form"
        options={{
          // title: 'Bài 10',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.badge.plus" color={color} />,
        }}
      />
    </Tabs>
  );
}
