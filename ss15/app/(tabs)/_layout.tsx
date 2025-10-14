import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff7300ff",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon({ color }) {
            return <FontAwesome name="home" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="employees"
        options={{
          title: "Nhân viên",
          headerShown: false,
          tabBarIcon({ color }) {
            return <FontAwesome name="users" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Tài khoản",
          tabBarIcon({ color }) {
            return <FontAwesome name="user" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
