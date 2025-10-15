import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#3182CE" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="positions"
        options={{
          headerShown: false,
          title: "Vị trí",
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
