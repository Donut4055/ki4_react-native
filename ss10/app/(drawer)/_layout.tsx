import { Tabs } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function DrawerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton />,
      }}>
      <Tabs.Screen
        name="(tabs)"  
        options={{
          title: 'Trang chủ',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Thông báo',
        }}
      />
    </Tabs>
  );
}
